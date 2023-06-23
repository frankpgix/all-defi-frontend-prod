import React, { FC, useState } from 'react'
import classNames from 'classnames'
// import Video from '@/components/common/Video'

// import Button from '@/components/common/Button'

const features = [
  {
    name: 'Trusted',
    subName: "We don't need to be",
    intro: (
      <>
        ALLDeFi is fully decentralized.
        <br /> All asset is kept in smart contracts that allow
        <br /> people to invest without centralized <br />
        counter-party risk.
      </>
    )
  },
  {
    name: 'Professional',
    subName: 'our team is',
    intro: (
      <>
        We bring the top-tiered hedge fund <br />
        managers to the platform. All managers have <br />
        to pass due diligence with a real name and <br />
        prove their expertise with a real track record.
      </>
    )
  },
  {
    name: 'Easy to Use',
    subName: 'our platform is',
    intro: 'Anyone can choose the best fund that fits own investment profiles and invest with only a few clicks.'
  },
  {
    name: 'Transparent',
    subName: <>PERFORMACES ARE</>,
    intro: (
      <>
        Fund managers' transactions and <br />
        performance are kept completely <br />
        transparent in real time.
      </>
    )
  }
]

const Feature: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <section className="web-home-feature-layout">
      <div className="web-home-feature">
        <div className="web-home-feature-ball animate__animated animate__backInDown"></div>
        <ul className="animate__animated animate__fadeIn animate__delay-1s">
          {features.map(({ name, subName, intro }, index) => (
            <li key={index} className={classNames({ active: activeIndex === index })}>
              <strong>{subName}</strong>
              <h3>{name}</h3>
              <p>{intro}</p>
            </li>
          ))}
        </ul>
        <header className={classNames(`active-${activeIndex}`, 'animate__animated animate__fadeIn animate__delay-2s')}>
          {features.map(({ name }, index) => (
            <span
              key={name}
              onMouseEnter={() => setActiveIndex(index)}
              className={classNames({ active: activeIndex === index })}
            >
              <strong>{name}</strong>
            </span>
          ))}
        </header>
      </div>
    </section>
  )
}

export default Feature
