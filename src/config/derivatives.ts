export interface DerivativesInfoType {
  url: string
  name: string
  info: string
  tags: string[]
}
type DerivativesType = {
  [key: string]: DerivativesInfoType
}

export const derivativesConfig: DerivativesType = {
  UNIV3: {
    name: 'UNIV3',
    info: 'UNIV3 info, need some words in here, about this dapp.',
    tags: ['DeFi', 'Dex'],
    url: encodeURIComponent(
      'https://bafybeibsiv5ydw2r7uxbe47gv2skti7s2basi5swll6pjcpnyapvab4dua.ipfs.cf-ipfs.com/#/swap'
    )
  },
  UNIV3LP: {
    name: 'UNIV3LP',
    info: 'UNIV3LP info, need some words in here, about this dapp.',
    tags: ['DeFi', 'Earn'],
    url: encodeURIComponent(
      'https://bafybeibsiv5ydw2r7uxbe47gv2skti7s2basi5swll6pjcpnyapvab4dua.ipfs.cf-ipfs.com/#/pool'
    )
  },
  AAVEV3: {
    name: 'AAVEV3',
    info: 'AAVEV3 info, need some words in here, about this dapp.',
    tags: ['DeFi', 'Lending/Borrowing'],
    url: encodeURIComponent('https://app.aave.com/')
  },
  GMXTrade: {
    name: 'GMXTrade',
    info: 'GMXTrade info, need some words in here, about this dapp.',
    tags: ['DeFi', 'Dex'],
    url: encodeURIComponent('https://app.gmx.io/#/v1')
  },
  GMXEarn: {
    name: 'GMXEarn',
    info: 'GMXEarn info, need some words in here, about this dapp.',
    tags: ['DeFi', 'Earn'],
    url: encodeURIComponent('https://app.gmx.io/#/earn')
  },
  OneInch: {
    name: '1Inch',
    info: '1Inch info, need some words in here, about this dapp.',
    tags: ['DeFi', 'Dex'],
    url: encodeURIComponent('https://app.1inch.io/')
  }
}

export default derivativesConfig
