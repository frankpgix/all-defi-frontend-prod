import { VaultMonthDataType } from '@/types/graphql'

import { get } from '@/utils/http'

export const getDefiChartData = async () => {
  return [
    { time: 1661126400000, value: '52240366263.89' },
    { time: 1661212800000, value: '54439276464.11' },
    { time: 1661299200000, value: '54067121826.56' },
    { time: 1661385600000, value: '53730402391.85' },
    { time: 1661472000000, value: '53923149702.38' },
    { time: 1661558400000, value: '51034113940.20' },
    { time: 1661644800000, value: '50813424609.88' },
    { time: 1661731200000, value: '50160835370.71' },
    { time: 1661817600000, value: '51994748091.62' },
    { time: 1661904000000, value: '50327296847.70' },
    { time: 1661990400000, value: '49547546070.11' },
    { time: 1662076800000, value: '49987252566.01' },
    { time: 1662163200000, value: '50703769574.75' },
    { time: 1662249600000, value: '50019380799.22' },
    { time: 1662336000000, value: '50145522352.33' },
    { time: 1662422400000, value: '48749716497.98' },
    { time: 1662508800000, value: '48708224098.85' },
    { time: 1662595200000, value: '49596958822.00' },
    { time: 1662681600000, value: '49941702326.13' },
    { time: 1662768000000, value: '51899980130.97' },
    { time: 1662854400000, value: '51370213844.73' },
    { time: 1662940800000, value: '52003607598.97' },
    { time: 1663027200000, value: '49705092456.13' },
    { time: 1663113600000, value: '47201492491.01' },
    { time: 1663200000000, value: '47452833400.96' },
    { time: 1663286400000, value: '44634128663.18' },
    { time: 1663372800000, value: '45559215866.64' },
    { time: 1663459200000, value: '44900180014.52' },
    { time: 1663545600000, value: '43594111702.21' },
    { time: 1663632000000, value: '44377460019.52' }
  ]
}

export const getBtcIndexData = async () => {
  const res = await get(
    'https://www.binance.com/api/v3/uiKlines?limit=30&symbol=BTCUSDT&interval=1d'
  )
  const data = res.map((item: any) => ({ time: item[6] + 1000, value: Number(item[4]) }))
  return data
}
export const getEthIndexData = async () => {
  const res = await get(
    'https://www.binance.com/api/v3/uiKlines?limit=30&symbol=ETHUSDT&interval=1d'
  )
  const data = res.map((item: any) => ({ time: item[6] + 1000, value: Number(item[4]) }))
  return data
}

export const getDefiTvlData = async () => {
  try {
    // ;('https://defi-tracker.dappradar.com/api/ethereum/history/month?currency=USD')
    const { xaxis, series } = await get(
      'https://api-proxy.jimmyllee098.workers.dev/api/ethereum/history/month?currency=USD'
    )
    return xaxis
      .map((time: number, index: number) => ({
        time: time,
        value: Number(series[0].data[index])
      }))
      .filter((item: any) => item.value !== 0)
  } catch (error) {
    return await getDefiChartData()
  }
}

export const getFundRoeData = async (address: string): Promise<VaultMonthDataType[]> => {
  const res = await get(`https://all-defi-static.pages.dev/json/fund-roe/${address}.json`)
  return res.data
}
