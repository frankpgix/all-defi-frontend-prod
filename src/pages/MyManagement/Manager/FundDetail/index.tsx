import React, { FC, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

import FundPool from '@/class/FundPool'
import FundReader from '@/class/FundReader'
import AllProtocol from '@/class/AllProtocol'
import {
  FundBaseProps,
  FundBaseDefault,
  FundDetailProps,
  FundDetailDefault,
  FundStakeProps,
  FundStakeDefault,
  FundBreachDetailProps,
  FundBreachDetailDefault
} from '@/class/help'

import { useProfile } from '@/hooks/useProfile'
import Blank from '@@/common/Blank'

import ManageDetail from './c/ManageDetail'
import DataTab from './c/DataTab'
import Dashboard from './c/Dashboard'

const FundDetail: FC = () => {
  const { fundAddress = '' } = useParams()

  const { signer } = useProfile()

  const { getFundBase } = FundPool
  const { getFundDetail, getFundBreachDetail } = FundReader
  const { getFundStake } = AllProtocol

  const [loading, setLoading] = useState(true)

  const [base, setBase] = useState<FundBaseProps>(FundBaseDefault)
  const [data, setData] = useState<FundDetailProps>(FundDetailDefault)
  const [stake, setStake] = useState<FundStakeProps>(FundStakeDefault)
  const [breach, setBreach] = useState<FundBreachDetailProps>(FundBreachDetailDefault)

  const getData = useCallback(async () => {
    if (fundAddress && signer) {
      setLoading(true)
      const base = await getFundBase(fundAddress)
      if (base) setBase(base)

      const data = await getFundDetail(fundAddress)
      if (data) setData(data)
      const stake = await getFundStake(fundAddress, signer)
      if (stake) setStake(stake)

      const breach = await getFundBreachDetail(fundAddress)
      if (breach) setBreach(breach)
      setLoading(false)
      // console.log(breach, 3333)
    }
  }, [fundAddress, signer]) // eslint-disable-line

  useEffect(() => void getData(), [getData])

  // if (loading) {
  //   return <FundDetailLoading />
  // }
  return (
    <div className="web-manage">
      <h2>
        {loading ? (
          <ContentLoader
            width={200}
            height={32}
            viewBox="0 0 200 32"
            backgroundColor="#eaeced"
            foregroundColor="#ffffff"
          >
            <rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
          </ContentLoader>
        ) : (
          base.name
        )}
      </h2>
      <Dashboard fundAddress={fundAddress} data={data} base={base} />
      <Blank />
      <ManageDetail
        loading={loading}
        fundAddress={fundAddress}
        base={base}
        data={data}
        stake={stake}
        breach={breach}
        getData={getData}
      />
      <DataTab fundAddress={fundAddress} />
    </div>
  )
}

export default FundDetail

// const FundDetailLoading = () => {
//   return (
//     <div className="web">
//       <ContentLoader
// width={1200}
// height={1400}
// viewBox="0 0 1200 1400"
// backgroundColor="#eaeced"
// foregroundColor="#ffffff"
//       >
//         <rect x="0" y="0" rx="4" ry="4" width="300" height="30" />
//         <path d="M1197.84 4.09965C1198.53 3.08555 1199.08 2.26387 1199.5 1.64583V399.5H0.722511C0.754768 399.415 0.790099 399.322 0.8285 399.222C1.06864 398.592 1.42888 397.657 1.90876 396.438C2.86852 393.998 4.3068 390.419 6.2198 385.863C10.0458 376.752 15.7706 363.733 23.3638 348.109C38.5507 316.861 61.2087 275.199 91.0938 233.541C150.883 150.199 239.503 67 355 67C412.765 67 454.973 83.8701 488.975 109.19C522.994 134.523 548.814 168.324 573.785 202.234C575.502 204.566 577.215 206.898 578.927 209.228C626.961 274.625 673.712 338.274 771.996 339C822.882 339.376 875.104 318.353 924.784 286.664C974.471 254.971 1021.66 212.581 1062.49 170.159C1103.31 127.735 1137.8 85.2664 1162.07 53.4046C1174.21 37.4733 1183.79 24.1928 1190.34 14.8945C1193.62 10.2453 1196.14 6.59152 1197.84 4.09965Z" />
//         <rect x="0" y="460" rx="8" ry="8" width="285" height="100" />
//         <rect x="305" y="460" rx="8" ry="8" width="285" height="100" />
//         <rect x="610" y="460" rx="8" ry="8" width="285" height="100" />
//         <rect x="915" y="460" rx="8" ry="8" width="285" height="100" />
//         <rect x="0" y="600" rx="8" ry="8" width="800" height="40" />
//         <rect x="40" y="680" rx="8" ry="8" width="360" height="110" />
//         <rect x="420" y="680" rx="8" ry="8" width="360" height="110" />
//         <rect x="800" y="680" rx="8" ry="8" width="360" height="110" />
//         <rect x="40" y="800" rx="8" ry="8" width="360" height="110" />
//         <rect x="420" y="800" rx="8" ry="8" width="360" height="110" />
//         <rect x="800" y="800" rx="8" ry="8" width="360" height="110" />
//         <rect x="1000" y="940" rx="30" ry="30" width="160" height="60" />
//         <rect x="800" y="940" rx="30" ry="30" width="160" height="60" />

//         <rect x="0" y="1020" rx="8" ry="8" width="500" height="40" />
//         <rect x="30" y="1100" rx="4" ry="4" width="1120" height="20" />
//         <rect x="30" y="1150" rx="4" ry="4" width="1120" height="20" />
//         <rect x="30" y="1200" rx="4" ry="4" width="1120" height="20" />
//         <rect x="30" y="1250" rx="4" ry="4" width="1120" height="20" />
//         <rect x="30" y="1300" rx="4" ry="4" width="1120" height="20" />
//         <rect x="30" y="1350" rx="4" ry="4" width="1120" height="20" />
//       </ContentLoader>
//     </div>
//   )
// }
