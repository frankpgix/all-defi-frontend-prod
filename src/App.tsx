import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'rc-dialog/assets/index.css'
import '@/style/style.scss'
import Header from '@@/web/Header'

const Test = lazy(() => import('@/pages/Test'))
const Home = lazy(() => import('@/pages/Home'))

function App() {
  return (
    <>
      <div className="web-main">
        <Header />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
