import { lazy, Suspense } from 'react'
// import { Switch, Route } from '@/components/common/Route'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'animate.css'
import 'rc-dialog/assets/index.css'
import 'rc-collapse/assets/index.css'
import 'rc-table/assets/index.css'
import '@/style/style.scss'

import Header from '@@/web/Header'
import Footer from '@@/web/Footer'
import Global from '@/pages/Updaters/Global'
// import LoopData from '@@/common/LoopData'
import Notify from '@@/core/Notify'

import Home from '@/pages/Home'
import Buy from '@/pages/Buy'
import Vaults from '@/pages/Vaults'
import MyManagement from '@/pages/MyManagement'
import Mining from '@/pages/Mining'
const Test = lazy(() => import('@/pages/Test'))

function App() {
  return (
    <>
      <div className="web-main">
        <Header />
        <Global />
        {/* <LoopData /> */}
        <Suspense fallback={null}>
          <Routes>
            <Route path="/buy" element={<Buy />} />
            <Route path="/vaults/*" element={<Vaults />} />
            <Route path="/manage/*" element={<MyManagement />} />
            <Route path="/all-mining" element={<Mining />} />
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <ToastContainer pauseOnFocusLoss={true} pauseOnHover={true} />
      {Notify}
    </>
  )
}

export default App
