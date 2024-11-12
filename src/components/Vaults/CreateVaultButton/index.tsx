import { FC, ReactNode } from 'react'
import ContentLoader from 'react-content-loader'

import { useToggle } from 'ahooks'

import { useProfile } from '@/hooks/useProfile'
import { useGetManageVaultList, useManageVaultListHook } from '@/hooks/useVaultList'

import ALink from '@/components/common/ALink'
import Cache from '@/utils/cache'
import { sleep } from '@/utils/tools'
import Button from '@@/common/Button'
import Popper from '@@/common/Popper'
import Modal from '@@/core/Modal'

import Create from './c/Main'

interface Props {
  large?: boolean
  children?: ReactNode
  text?: boolean
}
const CreateVaultButton: FC<Props> = ({ large, children, text }) => {
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
    if (text) {
      return <ALink disabled>Create Vaults</ALink>
    }
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
    if (text) {
      return <ALink disabled>Create a Vault</ALink>
    }
    return (
      <Button size="mini" disabled>
        <Popper content="The number of vaults you have created has reached the maximum limit">
          Create a Vault
        </Popper>
      </Button>
    )
  }
  return (
    <>
      {text && <ALink onClick={setRight}>{children || 'Create a Vault'}</ALink>}
      {!text && (
        <Button onClick={setRight} size={large ? 'default' : 'mini'}>
          {children
            ? children
            : isCacheCreate
              ? 'Unfinished Edits'
              : large
                ? 'Create a Vault now'
                : 'Create a Vault'}
        </Button>
      )}
      <Modal show={show} onClose={setLeft} title="Create a Vault">
        <Create onConfirm={onConfirm} />
      </Modal>
    </>
  )
}

export default CreateVaultButton
