import commonEn from '@/shared/assets/locale/common/en.json'
import commonRu from '@/shared/assets/locale/common/ru.json'
import { createI18n, type VueMessageType } from 'vue-i18n'

export default createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  modifiers: {
    customCapitalize: (str: VueMessageType) =>
      str.toString().charAt(0).toUpperCase() + str.toString().slice(1),
  },
  messages: {
    ru: {
      common: commonRu,
    },
    en: {
      common: commonEn,
    },
  },
})
