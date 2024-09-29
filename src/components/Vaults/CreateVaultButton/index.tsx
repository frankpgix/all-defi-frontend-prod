import { FC } from 'react'
import ContentLoader from 'react-content-loader'

import { useToggle } from 'ahooks'

import { useProfile } from '@/hooks/useProfile'
import { useGetManageVaultList, useManageVaultListHook } from '@/hooks/useVaultList'

import Cache from '@/utils/cache'
import { sleep } from '@/utils/tools'
import Button from '@@/common/Button'
import Popper from '@@/common/Popper'
import Modal from '@@/core/Modal'

import Create from './c/Main'

interface Props {
  large?: boolean
}
const CreateVaultButton: FC<Props> = ({ large }) => {
  useGetManageVaultList()
  const { loading, manageVaultList } = useManageVaultListHook()
  const { maxFundLimit } = useProfile()
  const [show, { setLeft, setRight }] = useToggle()

  const isCacheCreate =
    Cache.get('CreateFundStep1Temp') ||
    Cache.get('CreateFundStep2Temp') ||
    Cache.get('CreateFundStep3Temp')

  const onConfirm = async () => {
    await sleep(1000)
    setLeft()
    window.location.reload()
  }
  if (loading) {
    return (
      <ContentLoader
        width={160}
        height={40}
        viewBox="0 0 160 40"
        backgroundColor="#eaeced"
        foregroundColor="#ffffff"
      >
        <rect x="0" y="0" rx="20" ry="20" width="160" height="40" />
      </ContentLoader>
    )
  }

  if (maxFundLimit === manageVaultList?.length) {
    return (
      <Button to="/manage/manager/create" size="mini" disabled>
        <Popper content="The number of vaults you have created has reached the maximum limit">
          Create Vaults
        </Popper>
      </Button>
    )
  }
  return (
    <>
      <Button onClick={setRight} size={large ? 'default' : 'mini'}>
        {isCacheCreate ? 'Unfinished Edits' : large ? 'Create a Vault now' : 'Create Vaults'}
      </Button>
      <Modal show={show} onClose={setLeft} title="Create Vault">
        <Create onConfirm={onConfirm} />
      </Modal>
    </>
  )
}

export default CreateVaultButton