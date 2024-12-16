import type { StorybookConfig } from '@storybook/react-vite'

export default {
  stories: ['../src/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
} satisfies StorybookConfig
