import { FC } from 'react'

import HashLink from '@@/common/HashLink'

const PointsRanking: FC = () => {
  const data = [...new Array(10)].map((_, index) => ({
    rank: index + 1,
    address: '0x1234567890123456789012345678901234567890',
    total: 1234
  }))
  // console.log(1211, data)
  return (
    <main>
      <h3>Points Ranking</h3>
      <ul>
        {data.map((row) => (
          <li>
            <em>{row.rank}</em>
            <HashLink address={row.address} nolink />
            <span>
              {row.total}
              <small>pts</small>
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default PointsRanking
