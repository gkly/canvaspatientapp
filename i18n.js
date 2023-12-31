import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules'
// import LanguageDetector from 'i18next-browser-languagedetector';
const resources = {
  cn : {
    translation: {
      "nav-home": "主页",
      "nav-messaging": "消息传递",
      "nav-medhistory": "病史",
      "nav-account": "帐户",
      "home-greeting": "你好",
      "home-finishonboarding": "完成入职",
      "home-scheduleappointment": "安排医疗预约",
      "home-upcomingappointments": "即将到来的医疗预约",
      "home-pastappointments": "过去的医疗预约",
      "appointment-telemedicine": "远程医疗",
      "appointment-inperson": "亲自医疗预约",
      "medhistory-overview": "概述",
      "medhistory-reports": "报告",
      "medhistory-overview-goals": "目标",
      "medhistory-overview-allergies": "过敏",
      "medhistory-overview-conditions": "状况",
      "medhistory-overview-medications": "药物",
      "medhistory-overview-immunizations": "免疫接种",
      "account-profile": "轮廓",
      "account-billing": "计费",
      "account-profile-personalinfo": "个人信息",
      "account-profile-addresses": "地址",
      "account-profile-consent": "同意",
      "account-profile-questionnaire": "问卷调查",
      "account-profile-careteam": "我的护理团队",
      "account-billing-invoices": "发票",
      "account-billing-paymentmethod": "付款方式",
      "account-billing-insurance": "保险",
      "button-loadmore": "装载更多",
      "button-loading": "加载中",
      "appointment-instructions": "与您的医疗人员找到空闲时间并预约。 各个领域都需要。",
      "appointment-reason": "访问原因",
      "appointment-date": "日期",
      "appointment-time": "时间",
      "appointment-type": "类型",
    }
  },
  en: {
    translation: {
      "nav-home": "Home",
      "nav-messaging": "Messaging",
      "nav-medhistory": "Medical History",
      "nav-account": "Account",
      "home-greeting": "Hello",
      "home-finishonboarding": "Finish onboarding",
      "home-scheduleappointment": "Schedule an Appointment",
      "home-upcomingappointments": "Upcoming Appointments",
      "home-pastappointments": "Past Appointments",
      "appointment-telemedicine": "Telemedicine",
      "appointment-inperson": "Office Visit",
      "medhistory-overview": "Overview",
      "medhistory-reports": "Reports",
      "medhistory-overview-goals": "Goals",
      "medhistory-overview-allergies": "Allergies",
      "medhistory-overview-conditions": "Conditions",
      "medhistory-overview-medications": "Medications",
      "medhistory-overview-immunizations": "Immunizations",
      "account-profile": "Profile",
      "account-billing": "Billing",
      "account-profile-personalinfo": "Personal Information",
      "account-profile-addresses": "Addresses",
      "account-profile-consent": "Consent",
      "account-profile-questionnaire": "Questionnaire",
      "account-profile-careteam": "My Care Team",
      "account-billing-invoices": "Invoices",
      "account-billing-paymentmethod": "Payment Method",
      "account-billing-insurance": "Insurance Coverage",
      "button-loading": "Loading",
      "button-loadmore": "Load More",
      "appointment-instructions": "Find an available time with your medical provider and book an appointment. All fields are required.",
      "appointment-reason": "Reason for Visit",
      "appointment-date": "Dates",
      "appointment-time": "Time",
      "appointment-type": "Type",
    }
  },
  kr : {
    translation: {
      "nav-home": "홈페이지",
      "nav-messaging": "메시징",
      "nav-medhistory": "병력",
      "nav-account": "계정",
      "home-greeting": "안녕하세요",
      "home-finishonboarding": "온보딩 완료",
      "home-scheduleappointment": "진료 약속 예약",
      "home-upcomingappointments": "다가오는 의료 약속",
      "home-pastappointments": "과거 진료 약속",
      "appointment-telemedicine": "원격의료",
      "appointment-inperson": "사무실 진료",
      "medhistory-overview": "개요",
      "medhistory-reports": "보고서",
      "medhistory-overview-goals": "목표",
      "medhistory-overview-allergies": "알레르기",
      "medhistory-overview-conditions": "정황",
      "medhistory-overview-medications": "약물",
      "medhistory-overview-immunizations": "예방접종",
      "account-profile": "프로필",
      "account-billing": "청구",
      "account-profile-personalinfo": "개인 정보",
      "account-profile-addresses": "구애",
      "account-profile-consent": "동의",
      "account-profile-questionnaire": "설문지",
      "account-profile-careteam": "나의 진료팀",
      "account-billing-invoices": "송장",
      "account-billing-paymentmethod": "결제수단",
      "account-billing-insurance": "보험",
      "button-loading": "로드 중",
      "button-loadmore": "더 로드하기",
      "appointment-instructions": "담당 의료진과 상담 가능한 시간을 찾아 약속을 예약하십시오. 모든 분야가 요구됩니다.",
      "appointment-reason": "방문 이유",
      "appointment-date": "날짜",
      "appointment-time": "시간",
      "appointment-type": "유형",
    }
  },
  es: {
    translation: {
      "nav-home": "página principal",
      "nav-messaging": "mensajería",
      "nav-medhistory": "historial médico",
      "nav-account": "cuenta",
      "home-greeting": "Hola",
      "home-finishonboarding": "Finalizar la incorporación",
      "home-scheduleappointment": "Programe una cita médica",
      "home-upcomingappointments": "Próximas citas médicas",
      "home-pastappointments": "Citas médicas pasadas",
      "appointment-telemedicine": "Telemedicina",
      "appointment-inperson": "Cita médica en persona",
      "medhistory-overview": "General",
      "medhistory-reports": "Informes",
      "medhistory-overview-goals": "Objetivos",
      "medhistory-overview-allergies": "Alergias",
      "medhistory-overview-conditions": "Condiciones",
      "medhistory-overview-medications": "Medicamentos",
      "medhistory-overview-immunizations": "Vacunas",
      "account-profile": "Perfil",
      "account-billing": "Facturación",
      "account-profile-personalinfo": "Informacion personal",
      "account-profile-addresses": "Direcciones",
      "account-profile-consent": "Consentir",
      "account-profile-questionnaire": "Cuestionario",
      "account-profile-careteam": "Mi equipo de atención",
      "account-billing-invoices": "Facturas",
      "account-billing-paymentmethod": "Método de pago",
      "account-billing-insurance": "Seguro",
      "button-loading": "Cargando",
      "button-loadmore": "Carga más",
      "appointment-instructions": "Encuentre un horario disponible con su médico/a y reserve una cita. Todos los campos son obligatorios.",
      "appointment-reason": "Razón de la visita",
      "appointment-date": "Fecha",
      "appointment-time": "Tiempo",
      "appointment-type": "Tipo",
    }
  },
};

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
