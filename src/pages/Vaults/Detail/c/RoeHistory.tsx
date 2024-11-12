import { FC, useMemo } from 'react'

import { useRequest } from 'ahooks'
import BN from 'bignumber.js'
import classNames from 'classnames'
import dayjs from 'dayjs'

import { VaultMonthDataType } from '@/types/graphql'

import { getFundRoeData } from '@/api'
import { useValutMonthData } from '@/graphql/useData'
import { calcDecimalsFloor } from '@/utils/tools'
import Popper from '@@/common/Popper'

interface Props {
  fundAddress: string | undefined
}

const calcBaseRoeData = () => {
  const year = dayjs().year()
  const years = [year - 2, year - 1, year]
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const baseRoe: VaultMonthDataType[] = []
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

const calcYearReturn = (arr: VaultMonthDataType[]) => {
  if (!arr.length) return null
  // const year = dayjs().year()
  // if (arr[0].year === year) {
  //   arr.length = arr.length - 1
  // }
  const res = BN.sum
    .apply(
      null,
      arr.map((dat) => BN(dat.roe.replace('%', '')))
    )
    .div(arr.length)
    // .times(12)
    .toNumber()
  return `${calcDecimalsFloor(!isNaN(res) ? res : 0, 2)}%`
}

const RoeHistory: FC<Props> = ({ fundAddress }) => {
  const { data = [], loading } = useValutMonthData(fundAddress || '')
  const { data: oldData = [], loading: oldDataLoading } = useRequest(
    async (): Promise<VaultMonthDataType[]> => await getFundRoeData(fundAddress ?? ''),
    {
      refreshDeps: [fundAddress]
    }
  )
  const { baseRoe, years } = calcBaseRoeData()
  const list = useMemo(() => {
    if (loading || oldDataLoading) return []
    const oneArr = baseRoe.map((item) => {
      const o = oldData.find((old) => old.year === item.year && old.month === item.month)
      // const oy = oldData.filter((old) => old.year === item.year)
      // console.log(oy)
      if (o) {
        item.roe = o.roe
        item.history = true
        item.isRise = !o.roe.includes('-')
        item.isFall = o.roe.includes('-')
      }
      const n = data.find((dat) => dat.year === item.year && dat.month === item.month)

      if (n) {
        // item.roe = String((Number(n.roe) * 10) / 7)
        console.log(n)
        item.roe = n.roe
        item.history = false
        item.isRise = !n.roe.includes('-')
        item.isFall = n.roe.includes('-')
      }

      if (item.month === 13) {
        const arr = [...data, ...oldData].filter((dat) => dat.year === item.year)
        console.log(1111122222, arr)
        const yearReturn = calcYearReturn(arr)
        // console.log([...data, ...oldData].filter((dat) => dat.year === item.year))
        if (yearReturn) {
          item.roe = yearReturn
          item.isRise = !yearReturn.includes('-')
          item.isFall = yearReturn.includes('-')
        }
      }
      return item
    })
    return years
      .map((year) => ({ year: year, data: oneArr.filter((item) => item.year === year) }))
      .reverse()
  }, [baseRoe, loading, oldDataLoading, oldData, data, years])

  // console.log(list, 'list')
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
        {/* <span>1 Year Return</span> */}
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
