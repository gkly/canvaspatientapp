export const BASE_URL = 'https://fumage-kim-apiprize.canvasmedical.com';

// this patient has no  appointments
export const PATIENT_ID = '9d4a7cfceab24991a81de57384989755';
// this patient has no reports
// export const PATIENT_ID = '782b61a50b18419d8033f2e090fb1c0a';
// this patient has multiple addresses and expired consent
// export const PATIENT_ID = 'eb3ec0ec2a744d31a2c7b0db04461c89';
// this patient has a profile pic
// export const PATIENT_ID = 'baac151eb3e643499086366f5c886209';

export const PROVIDER_ID = 'abb6bc714d35412dbbc4f5e80dcb30e6';

// auditCQuestionnaireId
export const QUESTIONNAIRE_ID = '98e6a95a-5873-4255-8f8a-d7d54b22cd3e';

// privacy practice
export const CONSENT_CODE = 'P';

export const TOKEN = 'jiYF3riKosOLvxAeFvPLhXljhmf1hf';

export const RESOURCES = {
  ALLERGY: 'AllergyIntolerance',
  APPOINTMENT: 'Appointment',
  CARE_TEAM: 'CareTeam',
  CONDITION: 'Condition',
  CONSENT: 'Consent',
  COVERAGE: 'Coverage',
  DOCUMENT_REFERENCE: 'DocumentReference',
  GOAL: 'Goal',
  IMMUNIZATION: 'Immunization',
  MEDICATION: 'MedicationStatement',
  MESSAGE: 'Communication',
  OBSERVATION: 'Observation',
  ORGANIZATION: 'Organization',
  PATIENT: 'Patient',
  PROVIDER: 'Practitioner',
  QUESTIONNAIRE: 'Questionnaire',
  QUESTIONNAIRE_RESPONSE: 'QuestionnaireResponse',
  REPORT: 'DiagnosticReport',
  SLOT: 'Slot',
}

export const TELEMEDICINE_URL = 'https://meet.google.com/tky-cpww-eiw';

export const STRIPE_PAYMENT_URL = 'https://buy.stripe.com/test_dR69EbbVub21bRK000';

export const APPOINTMENT_TYPES = {
  TELEMEDICINE: 'Telemedicine',
  OFFICE: 'Office Visit',
}

export const APPOINTMENT_TEMPORAL_FILTERS = {
  UPCOMING: 'upcoming',
  PAST: 'past',
}

export const CONSENT_STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  REJECTED: 'rejected',
}

export const GOAL_STATUS_TYPES = {
  IN_PROGRESS: 'In Progress',
  IMPROVING: 'Improving',
  WORSENING: 'Worsening',
  NO_CHANGE: 'No Change',
  ACHIEVED: 'Achieved',
  SUSTAINING: 'Sustaining',
}

export const GOAL_STATUS_POSITIVE_TREND = [
  GOAL_STATUS_TYPES.IN_PROGRESS,
  GOAL_STATUS_TYPES.IMPROVING,
  GOAL_STATUS_TYPES.ACHIEVED
]

export const GOAL_STATUS_NEUTRAL_TREND = [
  GOAL_STATUS_TYPES.NO_CHANGE,
  GOAL_STATUS_TYPES.SUSTAINING,
]

export const GOAL_STATUS_NEGATIVE_TREND = [
  GOAL_STATUS_TYPES.WORSENING,
]

export const GOAL_PRIORITY_TYPES = {
  HIGH: 'High Priority',
  MEDIUM: 'Medium Priority',
  LOW: 'Low Priority',
}

export const REPORT_TYPES = {
  LABORATORY: 'Laboratory',
  RADIOLOGY: 'Radiology',
}

export const PRIMARY_COLOR = 'rgb(106,150,192)';
export const SECONDARY_COLOR = 'rgb(255,255,255)';
export const TERTIARY_COLOR = 'rgb(171,168,168)';

export const PRIMARY_COLORS = {
  BLUE: 'rgb(106,150,192)',
  WHITE: 'rgb(255,255,255)',
}

export const SECONDARY_COLORS = {
  NAVY: 'rgb(3,46,86)',
  GREY: 'rgb(171,168,168)',
}

export const COLORS = {
  BLUE: PRIMARY_COLORS.BLUE,
  NAVY: SECONDARY_COLORS.NAVY,
  GREEN: 'rgb(75,140,130)',
  GREY: SECONDARY_COLORS.GREY,
  ORANGE: 'rgb(210,153,69)',
  RED: 'rgb(161,86,99)',
  YELLOW: 'rgb(215,193,121)',
  WHITE: PRIMARY_COLORS.WHITE,
}

export const LANGUAGES_SUPPORTED = {
  ENGLISH: {
    DISPLAY: 'English',
    CODE: 'en',
  },
  SPANISH: {
    DISPLAY: 'Español',
    CODE: 'es',
  },
  KOREAN: {
    DISPLAY: '한글',
    CODE: 'kr',
  },
  CHINESE: {
    DISPLAY: '中文',
    CODE: 'cn',
  },
}

export const LANGUAGE_CODES_SUPPORTED = Object.values(LANGUAGES_SUPPORTED).map(lg => lg.CODE);
