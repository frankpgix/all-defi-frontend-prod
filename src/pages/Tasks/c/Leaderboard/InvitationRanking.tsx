import { FC } from 'react'

import { useTaskProfile } from '@/hooks/useTasks'

import { formatNumber } from '@/utils/tools'
import HashLink from '@@/common/HashLink'

const InvitationRanking: FC = () => {
  const { dashboard } = useTaskProfile()
  // console.log(dashboard)
  return (
    <main>
      <h3>Invitation Ranking</h3>
      <ul>
        {(dashboard.topReferrers ?? [])
          .filter((row) => row.inviteeCount != 0)
          .map((row, index) => (
            <li key={index}>
              <strong>{index + 1}</strong>
              <HashLink address={row.userAddress ?? ''} nolink />
              <em>{formatNumber(row.inviteeCount, 0, '0,0')}</em>
            </li>
          ))}
      </ul>
    </main>
  )
}

export default InvitationRanking
