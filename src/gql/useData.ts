import { useQuery } from '@apollo/client'
import { safeInterceptionValues } from '@/utils/tools'
import { last } from 'lodash'

export const useManageFundDatas = (gql: any) => {
  const { loading, error, data: sData } = useQuery(gql)
  const data = (sData?.managerIntervalDatas ?? [])
    .map((item: any) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(String(item.navInUSD).split('.')[0], 2, 18))
    }))
    .reverse()

  // @ts-ignore
  const count = last(data)?.value ?? 0

  return { loading, error, data, count }
}

export const useFundData = (gql: any, decimals: number, precision: number) => {
  const { loading, error, data: sData } = useQuery(gql)
  const data = (sData?.fundIntervalDatas ?? [])
    .map((item: any) => ({
      time: item.periodStartUnix * 1000,
      value: Number(safeInterceptionValues(String(item.nav).split('.')[0], precision, decimals))
    }))
    .reverse()

  return { loading, error, data }
}
