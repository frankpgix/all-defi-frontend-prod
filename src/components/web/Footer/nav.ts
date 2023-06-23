const nav: { name: string; list: { name: string; url: string }[] }[] = [
  {
    name: 'users',
    list: [
      { name: 'Docs', url: '/' },
      { name: 'AllDeFi', url: '/' },
      { name: 'Buy AC Token', url: '/buy-ac-token' },
      { name: 'Fund Market', url: '/fund-market' },
      { name: 'Create Fund', url: '/' }
    ]
  },
  {
    name: 'government',
    list: [
      { name: 'Application Manager', url: '/manage' },
      { name: 'Road Map', url: '/' }
    ]
  },
  {
    name: 'DEVELOPERS',
    list: [
      { name: 'Github', url: '/' },
      { name: 'APIs', url: '/' }
    ]
  }
]
export default nav
