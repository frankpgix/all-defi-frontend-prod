import { FC } from 'react'

import { useVaultStakedALL, useCalcAUMLimit } from '@/hooks/Contracts/useAllProtocol'

import { AddressType } from '@/types/base'
import { VaultDetailProps, VaultStakeType } from '@/types/vault'

import Loading from '@@/common/Loading'
import Blank from '@@/common/Blank'

import Feature from './c/Feature'
import Stake from './c/Stake'
import Record from './c/Record'

interface Props {
  vaultAddress: AddressType
  vaultDetail: VaultDetailProps
  direction: VaultStakeType
}

const Section: FC<Props> = ({ vaultAddress, vaultDetail, direction }) => {
  const { data: stakeData, isLoading, refetch: getData } = useVaultStakedALL(vaultAddress)
  const { data: multiple } = useCalcAUMLimit(vaultDetail.underlyingToken.address)
  // console.log(vaultDetail, stakeData, multiple)

  return (
    <div className="web-manage">
      <h2>{direction} Vault Max AUM Limit</h2>
      <Feature direction={direction} />
      <Stake
        direction={direction}
        vaultDetail={vaultDetail}
        vaultAddress={vaultAddress}
        multiple={multiple}
        getData={getData}
      />
      <Blank />
      <Record
        stakeData={stakeData}
        underlyingToken={vaultDetail.underlyingToken}
        loading={isLoading}
        multiple={multiple}
      />
      <Loading type="float" show={isLoading} />
    </div>
  )
}

export default Section
