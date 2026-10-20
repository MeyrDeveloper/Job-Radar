import i18n from '@/app/providers/i18n'

export type NavigationType = { url: string; label: string }

export const NAVIGATION_LINK: NavigationType[] = [
  {
    url: '/',
    label: i18n.global.t('common.search'),
  },
]
