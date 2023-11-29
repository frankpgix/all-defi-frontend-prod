import React, { FC, useState } from 'react'
import classNames from 'classnames'
// import Video from '@/components/common/Video'

// import Button from '@/components/common/Button'

const features = [
  {
    name: 'Trusted',
    subName: 'DAO TREASURY MANAGEMENT IS TRUELY Decentralised',
    intro: (
      <>
        AllDeFi allows decentralised DAO <br />
        holders to make independent DAO Treasury <br />
        allocation decision and <br />
        responsible for it.
      </>
    )
  },
  {
    name: 'Professional',
    subName: 'OUR TEAM IS ',
    intro: (
      <>
        We bring top-tier hedge fund managers to
        <br /> the platform to serve DAO treasury. <br />
        All managers have to pass due diligence <br />
        (including real name and identity verification),
        <br /> and prove their expertise with a real,
        <br /> verified track record.
      </>
    )
  },
  {
    name: 'Easy to Use',
    subName: 'our platform is',
    intro:
      'Any DAO holder can choose a strategy that they think will best grow DAO treasury with only a few clicks.'
  },
  {
    name: 'Transparent',
    subName: 'PERFORMACES ARE',
    intro: (
      <>
        Strategy managers' transactions
        <br /> and performance are kept completely
        <br /> transparent, in real time.
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
        <header
          className={classNames(
            `active-${activeIndex}`,
            'animate__animated animate__fadeIn animate__delay-2s'
          )}
        >
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
