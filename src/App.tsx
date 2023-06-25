import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'rc-dialog/assets/index.css'
import 'rc-table/assets/index.css'
import 'animate.css'
import '@/style/style.scss'
import Header from '@@/web/Header'
import Footer from '@@/web/Footer'
import Global from '@/pages/Updaters/Global'

const Test = lazy(() => import('@/pages/Test'))
const Buy = lazy(() => import('@/pages/Buy'))
const Home = lazy(() => import('@/pages/Home'))
const Manage = lazy(() => import('@/pages/Manage'))
const FundMarket = lazy(() => import('@/pages/FundMarket'))

function App() {
  return (
    <>
      <div className="web-main">
        <Header />
        <Global />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/manage/*" element={<Manage />} />
            <Route path="/fund-market/*" element={<FundMarket />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <ToastContainer pauseOnFocusLoss={true} pauseOnHover={true} />
    </>
  )
}

export default App
