import { FC } from 'react'

import About from './c/About'
import Banner from './c/Banner'
import Feature from './c/Feature'
import Guide from './c/Guide'

const Home: FC = () => {
  return (
    <div className="web-home">
      <Banner />
      <Feature />
      <Guide />
      <About />
    </div>
  )
}

export default Home
