const nav: { name: string; list: { name: string; url: string; checkManage?: boolean }[] }[] = [
  {
    name: 'users',
    list: [
      { name: 'Docs', url: 'https://pythagoras-group.gitbook.io/alldefi-whitepaper/' },
      { name: 'AllDeFi', url: '' },
      { name: 'Buy AC Token', url: '/buy' },
      { name: 'Fund Market', url: '/fund-market' },
      { name: 'Create Fund', url: '/manage/manager/create', checkManage: true }
    ]
  },
  {
    name: 'government',
    list: [
      { name: 'Twitter', url: '/' }
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
