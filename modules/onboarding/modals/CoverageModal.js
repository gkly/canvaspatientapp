import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { Button, Icon } from '@ui-kitten/components';
import {useMutation} from "@tanstack/react-query";
import {PATIENT_ID, RESOURCES} from "../../../utils/constants";
import {getUrlForResource, postRequest} from "../../../utils/network_request_helpers";
import {TextList} from "../../../componentLibrary/TextList";
import {useQueryClient} from "@tanstack/react-query";
import InputText from "../../../componentLibrary/InputText";
import {formatDate, formatReferenceResource} from "../../../utils/formatters";
import PayerNameSearch from "./PayerNameSearch";
import LabelWrapper from "../../../componentLibrary/LabelWrapper";
import {isTextEmpty} from "../../../utils/helpers";
import {useGetCoverage} from "../../../hooks/resourceBased/useGetCoverage";
import Modal from "../../../componentLibrary/Modal";


type Props = {
  onClose: () => void,
}

const CoverageModal = ({ onClose }: Props) => {
  const queryClient = useQueryClient();
  const { insurances, isCoverageLoading, coverageError } = useGetCoverage();
  const [payerId, setPayerId] = useState();
  const [payerName, setPayerName] = useState();
  const [subscriberId, setSubscriberId] = useState();
  const [coverageGroup, setCoverageGroup] = useState();
  const [coveragePlan, setCoveragePlan] = useState();

  const setPayer = (payer) => {
    setPayerId(payer.id);
    setPayerName(payer.name);
  }

  const resetPayer = () => {
    setPayerId(undefined);
    setPayerName(undefined);
  }

  const renderInsuranceInformationCards = () => insurances.map(i => {
    const items = [
      {
        title: i.payerName,
        description: 'Insurance name',
        isDisabled: true,
      },
      {
        title: i.subscriberId,
        description: 'ID',
        isDisabled: true,
      },
      {
        title: i.coverageGroup,
        description: 'Group',
        isDisabled: true,
      },
      {
        title: i.coveragePlan,
        description: 'Plan',
        isDisabled: true,
      },
    ]
    return <TextList items={items} resource={RESOURCES.PATIENT} />;
  })

  const submitCoverage = useMutation({
    mutationFn: ({payerName, payerId, subscriberId, coverageGroup, coveragePlan}) => {
      let payload = {
        resourceType: "Coverage",
        order: 1,
        status: "active",
        subscriber: {
          reference: formatReferenceResource(RESOURCES.PATIENT, PATIENT_ID),
          type: RESOURCES.PATIENT
        },
        subscriberId: subscriberId,
        beneficiary: {
          reference: formatReferenceResource(RESOURCES.PATIENT, PATIENT_ID),
          type: RESOURCES.PATIENT
        },
        relationship: {
          coding: [
            {
              system: "http://hl7.org/fhir/ValueSet/subscriber-relationship",
              code: "self",
              display: "Self"
            }
          ],
          text: "18"
        },
        period: {
          start: formatDate(new Date())
        },
        payor: [
          {
            reference: formatReferenceResource(RESOURCES.ORGANIZATION, payerId),
            type: RESOURCES.ORGANIZATION,
            display: payerName
          }
        ],
        class: []
      }

      if (coveragePlan) {
        payload = {
          ...payload,
          class: [{
            type: {
              coding: [{
                system: "http://hl7.org/fhir/ValueSet/coverage-class",
                code: "plan"
              }]
            },
            value: coveragePlan
          }]
        }
      }
      if (coverageGroup) {
        payload = {
          ...payload,
          class: [{
            type: {
              coding: [{
                system: "http://hl7.org/fhir/ValueSet/coverage-class",
                code: "group"
              }]
            },
            value: coverageGroup
          }]
        }
      }

      postRequest(getUrlForResource(RESOURCES.COVERAGE), payload);
    }
  })

  const onSubmit = () => {
    submitCoverage.mutate({payerName, payerId, subscriberId, coverageGroup, coveragePlan}, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [RESOURCES.COVERAGE]});
        onClose();
      },
    })
  }

  const isFormIncomplete = (payerId === undefined) || isTextEmpty(payerName) || (subscriberId === undefined);

  // TODO support if patient is subscriber
  return (insurances.length > 0) ? (
    <Modal
      onClose={onClose}
      title='Insurance information'
    >
       <ScrollView horizontal>
        {renderInsuranceInformationCards()}
      </ScrollView>
    </Modal>
  ) : (
    <Modal
      onClose={onClose}
      title='Insurance information'
    >
      {(payerId && payerName) ? (
        <>
          <LabelWrapper label='Health insurance carrier' >
            <Button
              status='basic'
              appearance='ghost'
              accessoryRight={<Icon name='close-outline' style={styles.icon} />}
              onPress={resetPayer}
            >
              {payerName}
            </Button>
          </LabelWrapper>
          <InputText
            label='ID'
            placeholder='12345'
            value={subscriberId}
            onChange={input => setSubscriberId(input)}
            inputMode='numeric'
          />
          <InputText
            label='Group (optional)'
            placeholder='Group'
            value={coverageGroup}
            onChange={input => setCoverageGroup(input)}
          />
          <InputText
            label='Plan name (optional)'
            placeholder='Plan'
            value={coveragePlan}
            onChange={input => setCoveragePlan(input)}
          />
          <Button style={styles.submitButton} onPress={onSubmit} disabled={isFormIncomplete}>
            Submit
          </Button>
        </>
      ) : (
        <PayerNameSearch setPayer={setPayer} resetPayer={resetPayer} payerName={payerName} />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 15,
    width: 15,
  },
  submitButton: {
    padding: 50, // Increased button size
  },
});

export default CoverageModal;
