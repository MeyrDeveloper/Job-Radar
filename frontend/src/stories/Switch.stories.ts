import Switch from '@/shared/ui/components/Switch.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const SwitchDefault: Story = {
  args: {
    modelValue: true,
  },
}
