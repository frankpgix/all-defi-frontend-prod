import { FC } from 'react'

import { VaultBaseInfoProps } from '@/types/vault'
import { AddressType } from '@/types/base'

import { userVaultPositionDetail } from '@/hooks/useVaultPositionDetail'

import Tokens from './Tokens'
import UniLP from './UniLP'
import AAVE from './AAVE'
// import GMXEarn from './GMXEarn'
// import GMXTrade from './GMXTrade'

interface Props {
  fundAddress: AddressType
  base: VaultBaseInfoProps
}

const Portfolio: FC<Props> = ({ fundAddress, base }) => {
  const {
    data: { uniDetail, avveDetail },
    isLoading
  } = userVaultPositionDetail(fundAddress, base.underlyingToken)
  return (
    <>
      <section className="web-fund-detail-portfolio">
        <h2>Portfolio</h2>
        <Tokens {...{ fundAddress, base }} />
        <UniLP data={uniDetail} underlyingToken={base.underlyingToken} loading={isLoading} />
        <AAVE data={avveDetail} underlyingToken={base.underlyingToken} loading={isLoading} />
        {/* <GMXEarn {...{ fundAddress, base }} />
        <GMXTrade {...{ fundAddress, base }} /> */}
      </section>
    </>
  )
}

export default Portfolio
