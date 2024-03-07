import { FC } from 'react'
// import Button from '@@/common/Button'

import { DirectionProps } from '@/types/vault'

const Feature: FC<DirectionProps> = ({ direction }) => {
  return (
    <div className="web-manage-fund-stake-feature">
      <ul>
        <li>
          Each vault's Max AUM Limit is depending on the amount of ALL staked in the reserved pool.
        </li>
        <li>
          {direction === 'reduce' ? 'Reducing the ' : 'The increase '}
          MAX AUM Limit will take effect immediately
        </li>
        <li>
          The profit from capital that exceeds the AUM limit will not be shared with the manager.
        </li>
        <li>
          If the current NAV exceeds the AUM limit, the allocation will be closed for the next
          epoch.
        </li>
      </ul>
    </div>
  )
}

export default Feature
