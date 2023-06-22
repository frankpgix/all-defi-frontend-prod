import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Test = lazy(() => import('@/pages/Test'))

function App() {
  return (
    <>
      <div className="web-main">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/test" element={<Test />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
