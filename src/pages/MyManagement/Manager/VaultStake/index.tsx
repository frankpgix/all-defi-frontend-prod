import { FC } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import { useVaultDetail } from '@/hooks/useVaultReader'

import { AddressType } from '@/types/base'
import { VaultStakeType } from '@/types/vault'

import Loading from '@@/common/Loading'

import Section from './Section'

const VaultStake: FC = () => {
  const { vaultAddress, direction = 'increase' } = useParams() as {
    vaultAddress: AddressType
    direction: VaultStakeType
  }

  const { data: vaultDetail, isLoading, isSuccess } = useVaultDetail(vaultAddress)

  if (isLoading) {
    return <Loading show type="section" />
  }
  if (!vaultAddress || (!isLoading && !isSuccess)) {
    return <Navigate to="/manage/manager/" />
  }
  if (!['increase', 'reduce'].includes(direction)) {
    return <Navigate to={`/manage/manager/vault/${vaultAddress}`} />
  }
  return <Section {...{ vaultAddress, vaultDetail, direction }} />
}

export default VaultStake
