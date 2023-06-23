type derivativesType = {
  [key: string]: { url: string }
}

const derivativesConfig: derivativesType = {
  UNIV3: {
    url: 'https://app.uniswap.org/'
  },
  AAVEV3: {
    url: 'https://app.aave.com/'
  },
  GMXTrade: {
    url: 'https://app.gmx.io/#/trade'
  },
  GMXEarn: {
    url: 'https://app.gmx.io/#/earn'
  }
}

export default derivativesConfig
