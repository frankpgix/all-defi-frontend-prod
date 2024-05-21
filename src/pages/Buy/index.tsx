import { FC } from 'react'

import Bench from './c/Bench'
// import ContributionManagement from './c/ContributionManagement'
import OnceYouBuy from './c/OnceYouBuy'

const BuyAcToken: FC = () => {
  return (
    <div className="web-buy">
      <OnceYouBuy />
      <Bench />
      {/* <ContributionManagement /> */}
    </div>
  )
}

export default BuyAcToken
