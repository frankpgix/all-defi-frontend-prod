import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import Detail from './Detail'
import List from './List'

const FundMarket: FC = () => {
  return (
    <Routes>
      <Route path="detail/:fundAddress" element={<Detail />} />
      <Route path="" element={<List />} />
    </Routes>
  )
}

export default FundMarket
