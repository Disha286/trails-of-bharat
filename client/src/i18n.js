import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        destinations: 'Destinations',
        travelResources: 'Travel Resources',
        community: 'Community',
        about: 'About',
        groupTours: 'Group Tours',
        contactUs: 'Contact Us',
        dashboard: 'Dashboard',
        login: 'Login',
        logout: 'Logout',
        register: 'Register'
      },
      hero: {
        aiPowered: 'AI-Powered Travel Platform',
        discoverIncredible: 'Discover Incredible',
        indiaWithAi: 'India with AI',
        subtitle: 'Personalized itineraries, hidden gems, and smart recommendations for your perfect Indian adventure.',
        searchPlaceholder: 'Search destinations, experiences…',
        searchBtn: 'Search',
        startExploring: 'Start Exploring',
        planWithAi: 'Plan with AI'
      },
      cta: {
        ready: 'Ready to Explore India? 🇮🇳',
        joinText: "Join 50,000+ travelers who've discovered incredible India with AI.",
        getStarted: 'Get Started Free',
        browse: 'Browse Destinations'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        destinations: 'गंतव्य',
        travelResources: 'यात्रा संसाधन',
        community: 'समुदाय',
        about: 'हमारे बारे में',
        groupTours: 'समूह यात्रा',
        contactUs: 'संपर्क करें',
        dashboard: 'डैशबोर्ड',
        login: 'लॉग इन',
        logout: 'लॉग आउट',
        register: 'रजिस्टर'
      },
      hero: {
        aiPowered: 'एआई-संचालित यात्रा प्लेटफॉर्म',
        discoverIncredible: 'अतुल्य',
        indiaWithAi: 'भारत की खोज करें (AI के साथ)',
        subtitle: 'आपकी उत्तम भारतीय यात्रा के लिए व्यक्तिगत कार्यक्रम, छिपे हुए खजाने और स्मार्ट सुझाव।',
        searchPlaceholder: 'गंतव्य, अनुभव खोजें…',
        searchBtn: 'खोजें',
        startExploring: 'खोजना शुरू करें',
        planWithAi: 'एआई के साथ योजना बनाएं'
      },
      cta: {
        ready: 'क्या आप भारत घूमने के लिए तैयार हैं? 🇮🇳',
        joinText: '50,000+ यात्रियों से जुड़ें जिन्होंने एआई के साथ अतुल्य भारत की खोज की है।',
        getStarted: 'मुफ्त में शुरू करें',
        browse: 'गंतव्य ब्राउज़ करें'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
