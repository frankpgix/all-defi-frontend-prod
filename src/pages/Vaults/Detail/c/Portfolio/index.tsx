import { FC } from 'react'

import { AddressType } from '@/types/base'
import { VaultBaseInfoProps } from '@/types/vault'

// import { userVaultPositionDetail } from '@/hooks/Contracts/useVaultPositionDetail'
import Tokens from './Tokens'

// import UniLP from './UniLP'
// import AAVE from './AAVE'
// import GMXEarn from './GMXEarn'
// import GMXTrade from './GMXTrade'

interface Props {
  fundAddress: AddressType
  base: VaultBaseInfoProps
}

const Portfolio: FC<Props> = ({ fundAddress, base }) => {
  // const {
  //   data: { uniDetail, avveDetail, GMXTradeDetail, GMXEarnDetail },
  //   isLoading
  // } = userVaultPositionDetail(fundAddress, base.underlying)
  return (
    <>
      <section className="web-fund-detail-portfolio">
        <h2>Portfolio</h2>
        <Tokens {...{ fundAddress, base }} />
        {/* <UniLP data={uniDetail} underlyingToken={base.underlyingToken} loading={isLoading} />
        <AAVE data={avveDetail} underlyingToken={base.underlyingToken} loading={isLoading} />
        <GMXEarn data={GMXEarnDetail} underlyingToken={base.underlyingToken} loading={isLoading} />
        <GMXTrade
          data={GMXTradeDetail}
          underlyingToken={base.underlyingToken}
          loading={isLoading}
        /> */}
      </section>
    </>
  )
}

export default Portfolio
