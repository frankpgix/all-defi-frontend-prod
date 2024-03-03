import { FC, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const List = lazy(() => import('./List'))
// const Detail = lazy(() => import('./Detail'))

const FundMarket: FC = () => {
  return (
    <Routes>
      {/* <Route path="detail/:fundAddress" element={<Detail />} /> */}
      <Route path="" element={<List />} />
    </Routes>
  )
}

export default FundMarket
