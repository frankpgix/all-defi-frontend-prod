type derivativesType = {
  [key: string]: { url: string }
}

const derivativesConfig: derivativesType = {
  UNIV3: {
    url: 'https://app.uniswap.org/'
  },
  UNIV3LP: {
    url: 'https://app.uniswap.org/#/pools'
  },
  AAVEV3: {
    url: 'https://app.aave.com/'
  },
  GMXTrade: {
    url: 'https://app.gmx.io/#/trade'
  },
  GMXEarn: {
    url: 'https://app.gmx.io/#/earn'
  },
  OneInch: {
    url: 'https://app.1inch.io/'
  }
}

export default derivativesConfig
