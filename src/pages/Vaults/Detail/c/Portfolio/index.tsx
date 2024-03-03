import React, { FC, useMemo } from 'react'

// import { formatNumber } from '@/utils/tools'
import { FundBaseProps } from '@/class/help'

// import Dialog from '@/components/common/Dialog'

import Tokens from './Tokens'
import UniLP from './UniLP'
import AAVE from './AAVE'
import GMXEarn from './GMXEarn'
import GMXTrade from './GMXTrade'

interface Props {
  fundAddress: string | undefined
  base: FundBaseProps
}

const Portfolio: FC<Props> = ({ fundAddress, base }) => {
  return (
    <>
      <section className="web-fund-detail-portfolio">
        <h2>Portfolio</h2>
        <Tokens {...{ fundAddress, base }} />
        <UniLP {...{ fundAddress, baseTokenAddress: base.baseToken }} />
        <AAVE {...{ fundAddress, baseTokenAddress: base.baseToken }} />
        <GMXEarn {...{ fundAddress, baseTokenAddress: base.baseToken }} />
        <GMXTrade {...{ fundAddress, baseTokenAddress: base.baseToken }} />
      </section>
    </>
  )
}

export default Portfolio
