import React, { FC } from 'react'
// import Button from '@@/common/Button'

import { DirectionProps } from './types'

const Feature: FC<DirectionProps> = ({ direction }) => {
  console.log(direction)
  return (
    <div className="web-manage-fund-stake-feature">
      {/*<header>
        <h3></h3>

        <Button text to="/">
          Read more
        </Button>
      </header>*/}
      <ul>
        <li>
          Each fund's Fund Max AUM Limit is depending on the amount of ALL staked in the reserved
          pool.
        </li>
        <li>
          {direction === 'reduce' ? 'Reducing the ' : 'The increase '}
          AUM limit will take effect immediately
        </li>
        <li>
          The profit from capital that exceeds the AUM Limit will not be shared with the fund
          manager.
        </li>
        <li>
          If the current NAV exceeds the fund's AUM limit, then subscriptions will be closed in the
          next epoch.
        </li>
      </ul>
    </div>
  )
}

export default Feature
