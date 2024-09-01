import { WHITEPAPER_URL } from '@/config'

const nav: { name: string; list: { name: string; url: string; checkManage?: boolean }[] }[] = [
  {
    name: 'users',
    list: [
      { name: 'Docs', url: WHITEPAPER_URL },
      // { name: 'Lightpaper', url: 'https://app.alldefi.finance/' },
      // { name: 'Buy AC Token', url: '/buy' },
      { name: 'Vaults', url: '/vaults' },
      { name: 'Create Vaults', url: '/manage/manager/create', checkManage: true }
    ]
  },
  {
    name: 'government',
    list: [
      { name: 'Twitter', url: 'https://twitter.com/Alldefiprotocol' },
      { name: 'Email', url: 'mailto:twitter@alldefi.finance' }
      // { name: 'Application Manager', url: '/manage' },
      // { name: 'Road Map', url: '/' }
    ]
  }
  // {
  //   name: 'DEVELOPERS',
  //   list: [
  //     { name: 'Github', url: '/' },
  //     { name: 'APIs', url: '/' }
  //   ]
  // }
]
export default nav
