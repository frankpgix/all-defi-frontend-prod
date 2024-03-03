import { FC, useMemo } from 'react'
import { AddressType } from '@/types/base'
import { useParams } from 'react-router-dom'
// import Alert from '@@/common/Alert'
// import Blank from '@@/common/Blank'

import { useBaseInfo } from '@/hooks/useVault'
const Detail: FC = () => {
  // console.log(base, 'base')
  const { fundAddress = '0x' } = useParams() as { fundAddress: AddressType }
  const { data } = useBaseInfo(fundAddress)
  console.log(data)
  return (
    <>
      222
      {/* {!loading && data.status === 6 && (
        <div className="web">
          <Alert show type="error">
            {base.name} has submitted an exit application to the platform. If approved, the vault
            will cease operations at any time.
          </Alert>
          <Blank />
        </div>
      )} */}
    </>
  )
}

export default Detail
