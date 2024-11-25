import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import Detail from './Detail'
import Group from './Group'
import List from './List'

const FundMarket: FC = () => {
  return (
    <Routes>
      <Route path="detail/:fundAddress" element={<Detail />} />
      <Route path="" element={<List />} />
      <Route path="group" element={<Group />} />
    </Routes>
  )
}

export default FundMarket
