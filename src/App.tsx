import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'rc-dialog/assets/index.css'
import 'rc-table/assets/index.css'
import '@/style/style.scss'
import Header from '@@/web/Header'
import Footer from '@@/web/Footer'
import Global from '@/pages/Updaters/Global'

const Test = lazy(() => import('@/pages/Test'))
const Buy = lazy(() => import('@/pages/Buy'))
const Home = lazy(() => import('@/pages/Home'))

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
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  )
}

export default App
