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
    url: encodeURIComponent('https://app.uniswap.org/')
  },
  UNIV3LP: {
    name: 'UNIV3LP',
    info: 'UNIV3LP info, need some words in here, about this dapp.',
    tags: ['DeFi', 'Earn'],
    url: encodeURIComponent('https://app.uniswap.org/#/pools')
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
