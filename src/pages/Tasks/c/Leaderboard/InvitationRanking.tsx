import { FC } from 'react'

import HashLink from '@@/common/HashLink'

const InvitationRanking: FC = () => {
  const data = [...new Array(10)].map((_, index) => ({
    rank: index + 1,
    address: '0x1234567890123456789012345678901234567890',
    total: 1234
  }))
  // console.log(1211, data)
  return (
    <main>
      <h3>Invitation Ranking</h3>
      <ul>
        {data.map((row, index) => (
          <li key={index}>
            <em>{row.rank}</em>
            <HashLink address={row.address} nolink />
            <span>{row.total}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default InvitationRanking
