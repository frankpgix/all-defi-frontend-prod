import React, { FC, useMemo } from 'react'
import ContentLoader from 'react-content-loader'

// import { useTokensData } from '@/store/tokens/hooks'
// import FundReader from '@/class/FundReader'
// import { useProfile } from '@/hooks/useProfile'
import { useManageFundList, useGetManageFundList } from '@/hooks/useFund'
// import { FundDetailProps } from '@/class/tool'
// import Loading from '@@/common/Loading'
import NoInvest from './NoInvest'
import Main from './Main'
import Button from '@@/common/Button'
import { TableLoading } from '@@/common/TableEmpty'

const Manager: FC = () => {
  // const { account: address } = useProfile()
  useGetManageFundList()
  const { loading, manageFundFist } = useManageFundList()
  // const [isInvest, setIsInvest] = useState<boolean>(false)

  const isInvest = useMemo(() => manageFundFist?.length === 0, [manageFundFist])
  return (
    <div className="web-manage">
      <h2>
        <span>Strategy Management</span>
        {!loading && (
          <Button to="/manage/manager/create" size="mini">
            create fund
          </Button>
        )}
      </h2>
      {loading ? <ManagerLoading /> : isInvest ? <NoInvest /> : <Main />}
    </div>
  )
}

export default Manager

export const ManagerLoading: FC = () => {
  return (
    <div className="web">
      <ContentLoader
        width={1200}
        height={500}
        viewBox="0 0 1200 500"
        backgroundColor="#eaeced"
        foregroundColor="#ffffff"
      >
        <path d="M1197.84 4.09965C1198.53 3.08555 1199.08 2.26387 1199.5 1.64583V399.5H0.769796C0.785802 399.464 0.802424 399.427 0.819661 399.389C1.0612 398.853 1.4236 398.056 1.90633 397.015C2.8718 394.935 4.31859 391.883 6.24252 387.997C10.0904 380.226 15.8466 369.122 23.4776 355.795C38.7401 329.142 61.499 293.606 91.4844 258.072C151.466 186.993 240.297 116 355.83 116C413.617 116 455.787 129.821 489.713 150.559C523.651 171.306 549.364 198.989 574.23 226.771C575.95 228.693 577.666 230.616 579.381 232.536C627.22 286.126 673.772 338.274 771.996 339C822.882 339.376 875.104 318.353 924.784 286.664C974.471 254.971 1021.66 212.581 1062.49 170.159C1103.31 127.735 1137.8 85.2664 1162.07 53.4046C1174.21 37.4732 1183.79 24.1928 1190.34 14.8944C1193.62 10.2452 1196.14 6.59152 1197.84 4.09965Z" />
        <rect x="0" y="440" rx="3" ry="3" width="200" height="30" />
      </ContentLoader>

      <TableLoading />
    </div>
  )
}
