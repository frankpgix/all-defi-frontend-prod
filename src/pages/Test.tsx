import { useAccount } from 'wagmi'

import { Account } from '@/wagami-demo/Account'
import { Balance } from '@/wagami-demo/Balance'
import { BlockNumber } from '@/wagami-demo/BlockNumber'
import { Connect } from '@/wagami-demo/Connect'
import { NetworkSwitcher } from '@/wagami-demo/NetworkSwitcher'
// import { ReadContract } from '@/wagami-demo/ReadContract'
// import { ReadContracts } from '@/wagami-demo/ReadContracts'
// import { ReadContractsInfinite } from '@/wagami-demo/ReadContractsInfinite'
// import { SendTransaction } from '@/wagami-demo/SendTransaction'
// import { SendTransactionPrepared } from '@/wagami-demo/SendTransactionPrepared'
// import { SignMessage } from '@/wagami-demo/SignMessage'
// import { SignTypedData } from '@/wagami-demo/SignTypedData'
// import { Token } from '@/wagami-demo/Token'
// import { WatchContractEvents } from '@/wagami-demo/WatchContractEvents'
// import { WatchPendingTransactions } from '@/wagami-demo/WatchPendingTransactions'
// import { WriteContract } from '@/wagami-demo/WriteContract'
// import { WriteContractPrepared } from '@/wagami-demo/WriteContractPrepared'

function Test() {
  const { isConnected } = useAccount()

  console.log(isConnected)

  return (
    <>
      <h1>wagmi + Vite</h1>

      <Connect />

      {isConnected && (
        <>
          <hr />
          <h2>Network</h2>
          <NetworkSwitcher />
          <br />
          <hr />
          <h2>Account</h2>
          <Account />
          <br />
          <hr />
          <h2>Balance</h2>
          <Balance />
          <br />
          <hr />
          <h2>Block Number</h2>
          <BlockNumber />
        </>
      )}
    </>
  )
}

export default Test
