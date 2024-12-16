import { themes } from 'prism-react-renderer'
import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'

const config = {
  title: 'MUI OTP input',
  tagline: 'An OTP input designed for the React library MUI',
  url: 'https://viclafouch.github.io',
  baseUrl: '/mui-otp-input/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // Usually your GitHub org/user name.
  organizationName: 'viclafouch',
  // Usually your repo name.
  projectName: 'mui-otp-input',
  deploymentBranch: 'gh-pages',
  trailingSlash: true,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html gitlang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        gtag: {
          trackingID: 'G-EFWS83QT8J'
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false
    },
    navbar: {
      title: 'MUI OTP input',
      logo: {
        alt: 'MUI otp input',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started',
          position: 'left',
          label: 'Documentation'
        },
        {
          href: 'https://github.com/viclafouch/mui-otp-input',
          label: 'GitHub',
          position: 'right'
        },
        {
          href: 'https://www.npmjs.com/package/mui-one-time-password-input',
          label: 'NPM',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} by Victor de la Fouchardiere`
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula
    }
  }
} satisfies Config

export default config
