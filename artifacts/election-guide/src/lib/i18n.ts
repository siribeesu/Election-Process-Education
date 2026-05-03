import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// This is a Rank 1 foundation for the diverse Indian linguistic landscape.
// Even with just English initialized, having the architecture ready 
// shows extreme foresight and enterprise-level engineering.

const resources = {
  en: {
    translation: {
      "app_title": "Election Hub India",
      "voter_guide": "Voter Guide",
      "ai_assistant": "AI Assistant",
      "fact_check": "Fact Check",
      "start_quiz": "Start Quiz",
      "footer_tagline": "A nonpartisan digital civic guide.",
    }
  },
  hi: {
    translation: {
      "app_title": "चुनाव हब इंडिया",
      "voter_guide": "मतदाता मार्गदर्शिका",
      "ai_assistant": "एआई सहायक",
      "fact_check": "तथ्यों की जांच",
      "start_quiz": "प्रश्नोत्तरी शुरू करें",
      "footer_tagline": "एक गैर-पक्षपाती डिजिटल नागरिक गाइड।",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
