import commonEn from '@/shared/assets/locale/common/en.json'
import commonRu from '@/shared/assets/locale/common/ru.json'
import { createI18n } from 'vue-i18n'

export default createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    ru: {
      common: commonRu,
    },
    en: {
      common: commonEn,
    },
  },
})
