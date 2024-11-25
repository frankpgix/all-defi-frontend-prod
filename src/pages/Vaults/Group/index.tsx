import { FC, useMemo } from 'react'

import { useInterval } from 'ahooks'

import { useAssetLatestPrices } from '@/hooks/Contracts/usePriceAggregator'
import { useVaultDetails } from '@/hooks/Contracts/useVaultDetails'
import { useVaultList } from '@/hooks/Contracts/useVaultReader'
import { useProfile } from '@/hooks/useProfile'
import { useChainToken, useUnderlyingTokens } from '@/hooks/useToken'

import StakeButton from '@@/Vaults/StakeButton'
import UnStakeButton from '@@/Vaults/UnStakeButton'

import Dashboard from './c/Dashboard'
import RoeHistory from './c/RoeHistory'
import VaultStatus from './c/VaultStatus'

const Detail: FC = () => {
  const fundAddress = '0x754daE540B475dD3d6C4Bf3B3e57a83012308F0A'
  const { account } = useProfile()
  const {
    data: { baseInfo, vaultUserDetail },
    isLoading: baseLoading,
    refetch: getData
  } = useVaultDetails(fundAddress, account ?? '0x')
  const { chainToken } = useChainToken()
  const assetTokenList = useUnderlyingTokens()
  const {
    data: price,
    isLoading,
    isSuccess
  } = useAssetLatestPrices([...assetTokenList, chainToken])
  console.log(12345, isLoading, isSuccess, price)
  const { data: vaultDetails, isLoading: vaultDetailsLoading } = useVaultList()
  console.log(12345, vaultDetails, vaultDetailsLoading)

  const loading = useMemo(
    () => isLoading || vaultDetailsLoading || baseLoading,
    [isLoading, vaultDetailsLoading, baseLoading]
  )
  useInterval(() => {
    console.log('1分钟更新数据')
    // getData()
  }, 60000)
  // console.log(123, fundAddress, baseInfo, vaultDetail)
  if (!vaultDetails[0]) return null
  return (
    <>
      <Dashboard fundAddress={fundAddress} data={vaultDetails[0]} loading={loading} />
      <RoeHistory fundAddress={fundAddress} />
      <VaultStatus base={baseInfo} data={vaultDetails[0]} loading={loading}>
        <StakeButton getData={getData} data={vaultDetails} base={baseInfo} />
        <UnStakeButton getData={getData} data={vaultDetails[0]} userData={vaultUserDetail} />
      </VaultStatus>
    </>
  )
}

export default Detail
