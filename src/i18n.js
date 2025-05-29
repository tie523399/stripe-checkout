
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      email: "Email",
      card: "Card Number",
      expiry: "Expiry",
      cvc: "CVC",
      name: "Cardholder Name",
      submit: "Submit Payment",
    }
  },
  zh: {
    translation: {
      email: "電子郵件",
      card: "卡號",
      expiry: "到期日",
      cvc: "安全碼",
      name: "持卡人姓名",
      submit: "提交付款",
    }
  },
  ko: {
    translation: {
      email: "이메일",
      card: "카드 번호",
      expiry: "만료일",
      cvc: "CVC",
      name: "카드 소유자 이름",
      submit: "결제 제출",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
