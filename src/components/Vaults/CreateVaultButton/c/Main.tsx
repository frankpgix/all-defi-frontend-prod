import { FC, useState } from 'react'

// import { useNavigate } from 'react-router-dom'
import { useCreateVault } from '@/hooks/Contracts/useVaultFactory'
import { useProfile } from '@/hooks/useProfile'
import { useUnderlyingTokens } from '@/hooks/useToken'

import { AddressType } from '@/types/base'
import { CreateVaultStep1DataTypes, CreateVaultStep2DataTypes } from '@/types/createVault'

import { CreateVaultStep1DataDefault } from '@/data/createVault'
import Cache from '@/utils/cache'
import InfoDialog from '@@/common/Dialog/Info'

import Step0 from './Step0'
import Step1 from './Step1'
import Step2 from './Step2'
import Step4 from './Step4'
import StepLine from './StepLine'

const CreateFund: FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  const { account } = useProfile()
  // const navigate = useNavigate()
  const underlyingTokens = useUnderlyingTokens()
  const [inConfirm, setInConfirm] = useState(false)
  const { onCreateVault } = useCreateVault()
  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const [stepStatus, setStepStatus] = useState([false, false, false])
  const [stepIndex, setStepIndex] = useState(-1)
  const [step1Data, setStep1Data] = useState<CreateVaultStep1DataTypes>(CreateVaultStep1DataDefault)
  const [minAmount, setMinAmount] = useState(0)
  const [baseTokenAddress, setBaseTokenAddress] = useState<AddressType>(underlyingTokens[0].address)

  const onStep0Confirm = () => setStepIndex(0)
  const onStep1Confirm = (data: CreateVaultStep1DataTypes) => {
    setStep1Data(data)
    const statusArr = [...stepStatus]
    statusArr[0] = true
    setStepStatus(statusArr)
    setStepIndex(1)
  }

  const onStep2Confirm = (data: CreateVaultStep2DataTypes) => {
    const { minimumStake, underlying } = data
    setMinAmount(minimumStake)
    setBaseTokenAddress(underlying)
    const statusArr = [...stepStatus]
    statusArr[1] = true
    statusArr[2] = true
    setStepStatus(statusArr)
    setStepIndex(2)
  }

  const onStep4Confirm = async () => {
    if (account) {
      setInConfirm(true)
      await onCreateVault(
        {
          ...step1Data,
          minimumStake: minAmount,
          underlying: baseTokenAddress
        },
        account,
        () => {
          Cache.rm('CreateFundStep1Temp')
          Cache.rm('CreateFundStep2Temp')
          Cache.rm('CreateFundStep3Temp')
          onConfirm()
          setInConfirm(false)
          // navigate('/manage/manager')
          setInfoStatus(true)
        }
      )
    }
  }

  const onBack = () => setStepIndex(stepIndex - 1)

  return (
    <>
      {/* <button onClick={onConfirm}>222</button> */}
      <StepLine activeIndex={stepIndex} stepStatus={stepStatus} setStepIndex={setStepIndex} />
      <Step0 show={stepIndex === -1} onConfirm={onStep0Confirm} />
      <Step1 show={stepIndex === 0} onConfirm={onStep1Confirm} />
      <Step2 show={stepIndex === 1} onBack={onBack} onConfirm={onStep2Confirm} />
      <Step4
        show={stepIndex === 2}
        data={{ ...step1Data, minAmount }}
        onBack={onBack}
        onConfirm={onStep4Confirm}
        disabled={inConfirm}
        baseTokenAddress={baseTokenAddress}
        multiple={1}
      />
      <InfoDialog
        show={infoStatus}
        onConfirm={() => setInfoStatus(false)}
        onClose={() => setInfoStatus(false)}
        title="Vault creation is successful"
        msg="The vault has taken effect. Please pay attention to changes in AUM and establish strategies in time."
        type="succ"
        hideCancelButton
      />
    </>
  )
}

export default CreateFund
