const nav: { name: string; list: { name: string; url: string; checkManage?: boolean }[] }[] = [
  {
    name: 'users',
    list: [
      { name: 'Docs', url: 'https://pythagoras-group.gitbook.io/alldefi-whitepaper/' },
      { name: 'Lightpaper', url: 'https://app.alldefi.finance/' },
      { name: 'Buy AC Token', url: '/buy' },
      { name: 'Fund Market', url: '/fund-market' },
      { name: 'Create Fund', url: '/manage/manager/create', checkManage: true }
    ]
  },
  {
    name: 'government',
    list: [
      { name: 'Twitter', url: 'https://twitter.com/Alldefiprotocol' },
      { name: 'Email', url: 'mailto:web@alldefi.com' }
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
