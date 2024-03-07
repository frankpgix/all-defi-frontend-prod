import { FC } from 'react'

import Banner from './c/Banner'
import Feature from './c/Feature'
import Guide from './c/Guide'
import About from './c/About'

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
