import { FC, useState } from 'react'

import classNames from 'classnames'

// import Video from '@/components/common/Video'

// import Button from '@/components/common/Button'

const features = [
  {
    name: 'Secure',
    subName: 'Assets remain secure.',
    intro: (
      <>
        Staked assets are held in a <br />
        multi-signature wallet, safeguarded by <br />
        off-exchange custody solution, <br />
        ensuring top-tier security for users.
      </>
    )
  },
  {
    name: 'Professional',
    subName: 'Managers are professional.',
    intro: (
      <>
        We showcase only premier managers <br />
        who pass stringent due diligence and <br />
        validate their expertise with established, <br />
        verified track records.
      </>
    )
  },
  {
    name: 'Transparent',
    subName: 'Performance metrics are transparent.',
    intro: (
      <>
        Vault performance is updated every hour using leading exchange APIs and oracle technology.
        Vault is settled every 28 days.
      </>
    )
  },
  {
    name: 'Diversified',
    subName: 'Vaults are diversified.',
    intro: (
      <>
        The platform offers an extensive selection of managers and strategy types, accommodating all
        levels of risk tolerance.
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
