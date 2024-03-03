import { FC, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
// const Investment = lazy(() => import('./Investment'))
// const InvestmentHistory = lazy(() => import('./Investment/History'))

// const Manager = lazy(() => import('./Manager'))
// const CreateFund = lazy(() => import('./Manager/CreateFund'))
// const FundDetail = lazy(() => import('./Manager/FundDetail'))
// const FundStake = lazy(() => import('./Manager/FundStake'))
// const EditFund = lazy(() => import('./Manager/EditFund'))
// const Dapp = lazy(() => import('./Manager/Dapp'))

const MyManagement: FC = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      {/* <Route path="investment" element={<Investment />} />
      <Route path="investment/history" element={<InvestmentHistory />} />
      <Route path="manager" element={<Manager />} />
      <Route path="manager/create" element={<CreateFund />} />
      <Route path="manager/fund/:fundAddress" element={<FundDetail />} />
      <Route path="manager/fund-edit/:fundAddress" element={<EditFund />} />
      <Route path="manager/fund-stake/:fundAddress/:direction" element={<FundStake />} />
      <Route path="manager/dapp/:fundAddress" element={<Dapp />} /> */}
    </Routes>
  )
}

export default MyManagement
