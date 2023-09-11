import React, { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { useRequest } from 'ahooks'
import { useFundMonthData, FundMonthDataType } from '@/gql/useData'
import { getFundRoeData } from '@/api'
import Popper from '@@/common/Popper'

interface Props {
  fundAddress: string | undefined
}

const calcBaseRoeData = () => {
  const year = dayjs().year()
  const years = [year - 2, year - 1, year]
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const baseRoe: FundMonthDataType[] = []
  years.forEach((year) => {
    months.forEach((month) => {
      baseRoe.push({
        month,
        year,
        roe: '-'
      })
    })
  })
  return { baseRoe, years }
}

const RoeHistory: FC<Props> = ({ fundAddress }) => {
  const { data = [], loading } = useFundMonthData(fundAddress || '')
  const { data: oldData = [], loading: oldDataLoading } = useRequest(
    async (): Promise<FundMonthDataType[]> => await getFundRoeData(fundAddress ?? ''),
    {
      refreshDeps: [fundAddress]
    }
  )
  const { baseRoe, years } = calcBaseRoeData()
  const list = useMemo(() => {
    if (loading || oldDataLoading) return []
    const oneArr = baseRoe.map((item) => {
      const o = oldData.find((old) => old.year === item.year && old.month === item.month)
      if (o) {
        item.roe = o.roe
        item.history = true
        item.isRise = !o.roe.includes('-')
        item.isFall = o.roe.includes('-')
      }
      const n = data.find((old) => old.year === item.year && old.month === item.month)
      if (n) {
        item.roe = n.roe
        item.history = false
        item.isRise = !n.roe.includes('-')
        item.isFall = n.roe.includes('-')
      }
      return item
    })
    return years
      .map((year) => ({ year: year, data: oneArr.filter((item) => item.year === year) }))
      .reverse()
  }, [baseRoe, loading, oldDataLoading, oldData, data, years])
  return (
    <div className="web-fund-detail-roe-history">
      <header>
        <strong>Year</strong>
        <span>JAN</span>
        <span>FEB</span>
        <span>MAR</span>
        <span>APR</span>
        <span>MAY</span>
        <span>JUN</span>
        <span>JUL</span>
        <span>AUG</span>
        <span>SEP</span>
        <span>OCT</span>
        <span>NOV</span>
        <span>DEC</span>
      </header>

      <section>
        {list.map(({ year, data }) => (
          <main key={year}>
            <strong>{year}</strong>
            {data.map((item, index) => (
              <span
                className={classNames({
                  rise: item.isRise,
                  fall: item.isFall,
                  history: item.history
                })}
                key={index}
              >
                {item.history ? (
                  <Popper content="This is off-chain data, used to show the historical performance of the manager under the same type of strategy. All data is provided by a third-party platform and verified by Alldefi for authenticity.">
                    {item.roe}
                  </Popper>
                ) : (
                  item.roe
                )}
              </span>
            ))}
          </main>
        ))}
      </section>
    </div>
  )
}

export default RoeHistory
