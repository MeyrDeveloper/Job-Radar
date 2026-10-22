import i18n from '@/app/providers/i18n'
import { Grid3X3, History, Search, type LucideProps } from 'lucide-vue-next'
import type { FunctionalComponent } from 'vue'

export type NavigationItemType = {
  url: string
  label: string
  icon: FunctionalComponent<LucideProps>
}

export const NAVIGATION_LINK: NavigationItemType[] = [
  {
    url: '/',
    label: i18n.global.t('common.search'),
    icon: Search,
  },
  {
    url: '/vacancies',
    label: i18n.global.t('common.vacancy', 2),
    icon: Grid3X3,
  },
  {
    url: '/history',
    label: i18n.global.t('common.history'),
    icon: History,
  },
]
