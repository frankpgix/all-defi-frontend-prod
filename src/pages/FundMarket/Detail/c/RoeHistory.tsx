import React, { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'
import { useFundMonthData, FundMonthDataType } from '@/gql/useData'
import { getFundRoeData } from '@/api'
import { spawn } from 'child_process'

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
    if (loading || oldDataLoading) return baseRoe
    return baseRoe.map((item) => {
      const o = oldData.find((old) => old.year === item.year && old.month === item.month)
      if (o) item.roe = o.roe
      const n = data.find((old) => old.year === item.year && old.month === item.month)
      if (n) item.roe = n.roe
      return item
    })
  }, [baseRoe, loading, oldDataLoading, oldData, data])

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
        <aside>
          {years.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </aside>
        <main>
          {list.map((item, index) => (
            <span key={index}>{item.roe}</span>
          ))}
        </main>
      </section>
    </div>
  )
}

export default RoeHistory
