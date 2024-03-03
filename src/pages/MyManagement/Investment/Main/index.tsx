import { FC } from 'react'
import ContentLoader from 'react-content-loader'

// import { FundUserListDataProps } from '@/class/help'
import Button from '@@/common/Button'

import { VaultUserListDataProps } from '@/types/vault'

// import Loading from '@@/common/Loading'

// import Dashboard from './c/Dashboard'
// import Count from './c/Count'
import FundDetails from './c/FundDetails'
// import ContributionManagement from '@/pages/Buy/c/ContributionManagement'

interface Props {
  loading: boolean
  getData: () => void
  data: VaultUserListDataProps[]
}

const Main: FC<Props> = ({ loading, getData, data }) => {
  // if (loading) return <CountLoading />
  // console.log(data, 2222)
  return (
    <div className="web-manage">
      {/* <Count /> */}

      {loading ? <CountLoading /> : <FundDetails data={data} callback={getData} />}
    </div>
  )
}

export default Main
// <Dashboard data={data} />

const CountLoading = () => {
  return (
    <div className="web-manage-investment-fund">
      <h2>
        Vault Details
        <Button text to="/manage/investment/history">
          view transaction history
        </Button>
      </h2>
      <ContentLoader
        width={1200}
        height={200}
        viewBox="0 0 1200 200"
        backgroundColor="#eaeced"
        foregroundColor="#ffffff"
      >
        <rect x="0" y="0" rx="4" ry="4" width="1200" height="40" />
        <rect x="0" y="60" rx="4" ry="4" width="1200" height="40" />
      </ContentLoader>
    </div>
  )
}
