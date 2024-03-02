import { FC } from 'react'

import OnceYouBuy from './c/OnceYouBuy'
import Bench from './c/Bench'
import ContributionManagement from './c/ContributionManagement'

const BuyAcToken: FC = () => {
  return (
    <div className="web-buy">
      <OnceYouBuy />
      <Bench />
      <ContributionManagement />
    </div>
  )
}

export default BuyAcToken
