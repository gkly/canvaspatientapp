import { Text } from 'react-native';
import ErrorText from "../../../componentLibrary/ErrorText";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
  getUrlForResource,
  loadInBrowser,
  postRequest,
} from "../../../utils/network_request_helpers";
import {CONSENT_CODE, CONSENT_STATUS_TYPES, PATIENT_ID, RESOURCES} from "../../../utils/constants"
import {formatDate, formatReferenceResource} from "../../../utils/formatters";
import Modal from "../../../componentLibrary/Modal";
import React from "react";
import Button from "../../../componentLibrary/Button";


type Props = {
  onClose: () => void,
  status: string,
}

const ConsentModal = ({ onClose, status }: Props) => {
  const queryClient = useQueryClient();
  const privacyNoticeUrl = 'https://stanfordhealthcare.org/content/dam/SHC/clinics/uha/docs/uha-notice-privacy-practice-english-12-2021.pdf';

  const submitConsent = useMutation({
    mutationFn: (accepted) =>
      postRequest(getUrlForResource(RESOURCES.CONSENT),{
        resourceType: RESOURCES.CONSENT,
        status: accepted ? "active" : "rejected",
        scope: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/consentscope",
              code: "patient-privacy"
            }
          ]
        },
        category: [
          {
            coding: [
              {
                system: "LOINC",
                code: CONSENT_CODE,
                display: "Notice of Privacy Practices"
              }
            ]
          }
        ],
        patient: {
          reference: formatReferenceResource(RESOURCES.PATIENT, PATIENT_ID)
        },
        sourceAttachment: {
          contentType: "application/pdf",
          data: "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1znv7kzJafWfxqCWEKhtvk+umQoai78n9M4nV37ft5d0YgplbmRzdHJlYW0KZW5kb2JqCgo5IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1RydWVUeXBlL0Jhc2VGb250L0JBQUFBQStMaWJlcmF0aW9uU2VyaWYKL0ZpcnN0Q2hhciAwCi9MYXN0Q2hhciA0Ci9XaWR0aHNbNzc3IDYxMCA0NDMgMzg5IDI3NyBdCi9Gb250RGVzY3JpcHRvciA3IDAgUgovVG9Vbmljb2RlIDggMCBSCj4+CmVuZG9iagoKMTAgMCBvYmoKPDwvRjEgOSAwIFIKPj4KZW5kb2JqCgoxMSAwIG9iago8PC9Gb250IDEwIDAgUgovUHJvY1NldFsvUERGL1RleHRdCj4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDQgMCBSL1Jlc291cmNlcyAxMSAwIFIvTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0dyb3VwPDwvUy9UcmFuc3BhcmVuY3kvQ1MvRGV2aWNlUkdCL0kgdHJ1ZT4+L0NvbnRlbnRzIDIgMCBSPj4KZW5kb2JqCgo0IDAgb2JqCjw8L1R5cGUvUGFnZXMKL1Jlc291cmNlcyAxMSAwIFIKL01lZGlhQm94WyAwIDAgNjEyIDc5MiBdCi9LaWRzWyAxIDAgUiBdCi9Db3VudCAxPj4KZW5kb2JqCgoxMiAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgNCAwIFIKL09wZW5BY3Rpb25bMSAwIFIgL1hZWiBudWxsIG51bGwgMF0KL0xhbmcoZW4tVVMpCj4+CmVuZG9iagoKMTMgMCBvYmoKPDwvQ3JlYXRvcjxGRUZGMDA1NzAwNzIwMDY5MDA3NDAwNjUwMDcyPgovUHJvZHVjZXI8RkVGRjAwNEMwMDY5MDA2MjAwNzIwMDY1MDA0RjAwNjYwMDY2MDA2OTAwNjMwMDY1MDAyMDAwMzcwMDJFMDAzMj4KL0NyZWF0aW9uRGF0ZShEOjIwMjIwNTIzMDczODM3LTA3JzAwJyk+PgplbmRvYmoKCnhyZWYKMCAxNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDU3MTUgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAwMTk2IDAwMDAwIG4gCjAwMDAwMDU4NTggMDAwMDAgbiAKMDAwMDAwMDIxNiAwMDAwMCBuIAowMDAwMDA0OTI4IDAwMDAwIG4gCjAwMDAwMDQ5NDkgMDAwMDAgbiAKMDAwMDAwNTE0NCAwMDAwMCBuIAowMDAwMDA1NDUzIDAwMDAwIG4gCjAwMDAwMDU2MjggMDAwMDAgbiAKMDAwMDAwNTY2MCAwMDAwMCBuIAowMDAwMDA1OTU3IDAwMDAwIG4gCjAwMDAwMDYwNTQgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDE0L1Jvb3QgMTIgMCBSCi9JbmZvIDEzIDAgUgovSUQgWyA8ODREQjY2QjEwREU5OTRGNzA1ODlCQTNCRjUzODE4RDg+Cjw4NERCNjZCMTBERTk5NEY3MDU4OUJBM0JGNTM4MThEOD4gXQovRG9jQ2hlY2tzdW0gLzg3MTVEQTJGQzEyOEM2RUY4NzlFREY4RUZGMjRBQTc0Cj4+CnN0YXJ0eHJlZgo2MjI5CiUlRU9GCg==",
          title: "UploadTest.pdf"
        },
        provision: {
          period: {
            start: formatDate(new Date()),
          }
        }
      }),
  })


  const onSubmit = (accepted) => {
    submitConsent.mutate(accepted, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [RESOURCES.CONSENT]});
        onClose();
      },
      onError: (e) => console.log('e=', e)
    })
  }

  return (
    <Modal
      isLoading={false}
      onClose={onClose}
      title='Consent'
      scrollView={true}
    >
      <Button
        text='View Notice of Privacy Practices'
        type='ghost'
        onPress={() => loadInBrowser(privacyNoticeUrl)}
      />
      {(status === CONSENT_STATUS_TYPES.REJECTED) && <Text>You declined to give consent. You can still provide consent now.</Text>}
      {(status === CONSENT_STATUS_TYPES.INACTIVE) && <Text>Your consent expired. Please provide again.</Text>}

      <Button
        text='Consent'
        type='filled'
        onPress={() => onSubmit(true)}
        disabled={submitConsent.isPending || status === CONSENT_STATUS_TYPES.ACTIVE}
      />
      <Button
        text='Reject'
        type='outline'
        onPress={() => onSubmit(false)}
        disabled={submitConsent.isPending || status === CONSENT_STATUS_TYPES.ACTIVE}
      />

      {submitConsent.error && <ErrorText message="error!"/>}
    </Modal>
  );
};


export default ConsentModal;
