import { FC } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { AddressType } from '@/types/base'
import { useBaseInfo } from '@/hooks/useVault'

import Loading from '@@/common/Loading'

import Edit from './Edit'

const EditFund: FC = () => {
  const { vaultAddress } = useParams() as { vaultAddress: AddressType }
  const { data, isLoading, isSuccess } = useBaseInfo(vaultAddress)
  // const navigate = useNavigate()
  console.log(vaultAddress, data, '/manage/manager')
  if (isLoading) {
    return <Loading show type="section" />
  }
  if (!isSuccess) {
    return <Navigate to="/manage/manager" />
  }
  return <Edit baseInfo={data} />
}

export default EditFund
