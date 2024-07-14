import { FC } from 'react'

import { useTaskProfile } from '@/hooks/useTasks'

import { formatNumber } from '@/utils/tools'
import HashLink from '@@/common/HashLink'

const PointsRanking: FC = () => {
  const { dashboard } = useTaskProfile()
  return (
    <main>
      <h3>Points Ranking</h3>
      <ul>
        {(dashboard.topUsers ?? []).map((row, index) => (
          <li key={index}>
            <strong>{index + 1}</strong>
            <HashLink address={row.userAddress ?? ''} nolink />
            <em>{formatNumber(row.totalPoints, 0, '0,0')}</em>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default PointsRanking
