import SignClient from '@walletconnect/sign-client'
export let signClient: SignClient

export async function createSignClient() {
  signClient = await SignClient.init({
    logger: 'debug',
    projectId: '90c1c8a3dd769315f8c0e10b2ae4bd16',
    relayUrl: 'wss://relay.walletconnect.com',
    metadata: {
      name: 'AllDeFi Fund',
      description: 'AllDeFi Fund for WalletConnect',
      url: 'https://alldefi.finance/',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    }
  })

  try {
    const clientId = await signClient.core.crypto.getClientId()
    console.log('WalletConnect ClientID: ', clientId)
    localStorage.setItem('WALLETCONNECT_CLIENT_ID', clientId)
  } catch (error) {
    console.error('Failed to set WalletConnect clientId in localStorage: ', error)
  }
}
