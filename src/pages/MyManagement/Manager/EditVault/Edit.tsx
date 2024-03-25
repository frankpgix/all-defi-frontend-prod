import { FC, useState, useMemo, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { without } from 'lodash'
import classNames from 'classnames'

import { CONTACT_US_URL } from '@/config'

import { useVaultUpdatingData } from '@/hooks/useVaultReader'
import { useDerivativeList, useUpdateVault } from '@/hooks/Contracts/useAllProtocol'
import { useProfile } from '@/hooks/useProfile'

import { AddressType } from '@/types/base'
import { VaultBaseInfoProps, VaultDerivativesProps } from '@/types/vault'
import { UpdateVaultDataType } from '@/types/createVault'

import BlueLineSection from '@@/web/BlueLineSection'
import Loading from '@@/common/Loading'
import { TokenIcon } from '@@/common/TokenUnit'

import Button from '@@/common/Button'
import Image from '@@/common/Image'
import { Input } from '@@/common/Form'

interface Props {
  baseInfo: VaultBaseInfoProps
}

const Edit: FC<Props> = ({ baseInfo }) => {
  const navigate = useNavigate()
  const { account } = useProfile()
  const { data: derivativeList } = useDerivativeList()
  const { onUpdateVault } = useUpdateVault()
  const {
    data: updatingData,
    isLoading: loading,
    isSuccess,
    refetch: getData
  } = useVaultUpdatingData(baseInfo.acToken, baseInfo.underlyingToken)

  const [isChange, setIsChange] = useState(false)
  const [managerName, setManagerName] = useState('')
  // const [baseTokenAddress, setBaseTokenAddress] = useState<AddressType>('0x')
  const [desc, setDesc] = useState('')
  // const [oldDerivative, setOldDerivative] = useState<AddressType[]>(baseInfo.derivatives)
  const [selectDerivative, setSelectDerivative] = useState<AddressType[]>([])
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [baseDataStr, setBaseDataStr] = useState('')
  // const [minAmountNumber, setMinAmountNumber] = useState(0.0001)
  // const [decimals, setDecimals] = useState(18)
  const [verifyStatus, setVerifyStatus] = useState(2)

  const baseToken = useMemo(() => baseInfo.underlyingToken, [baseInfo.underlyingToken])
  const oldDerivative = useMemo(() => baseInfo.derivatives, [baseInfo.derivatives])

  const baseTokenName = useMemo(
    () => (baseToken.name === 'WETH' ? 'ETH' : baseToken.name),
    [baseToken.name]
  )

  const minAmountNumber = useMemo(() => {
    const zero = [...new Array(baseToken.precision - 1)].map(() => '0').join('')
    return Number(`0.${zero}1`)
  }, [baseToken.precision])

  const decimals = useMemo(() => baseToken.decimals, [baseToken.decimals])

  useEffect(() => {
    if (!loading && isSuccess) {
      if (updatingData) {
        setVerifyStatus(updatingData.verifyStatus)
      }

      if (updatingData && [0, 1].includes(updatingData.verifyStatus)) {
        setManagerName(updatingData.data.managerName)
        setDesc(updatingData.data.desc)
        setMinAmount(String(updatingData.data.allocationLimits[0]))
        setMaxAmount(String(updatingData.data.allocationLimits[1]))
        // setSelectDerivative(without(selectDerivative, ...updatingData.data.derivativesToRemove))
        setSelectDerivative(
          without(
            [...new Set([...baseInfo.derivatives, ...updatingData.data.derivativesToAdd])],
            ...updatingData.data.derivativesToRemove
          )
        )
        // [...selectDerivative, item]
      } else {
        setManagerName(baseInfo.managerName)
        setSelectDerivative(baseInfo.derivatives)
        setDesc(baseInfo.desc)
        setMinAmount(String(baseInfo.subscriptionMinLimit))
        setMaxAmount(String(baseInfo.subscriptionMaxLimit))
      }
    }
  }, [updatingData, loading, isSuccess])

  const calcConfirmData = useCallback((): UpdateVaultDataType => {
    const delDerivative = oldDerivative.filter((item) => !selectDerivative.includes(item))
    const newDerivative = selectDerivative.filter((item) => !oldDerivative.includes(item))
    // console.log(selectDerivative, delDerivative, newDerivative)
    return { desc, managerName, newDerivative, delDerivative, minAmount, maxAmount, decimals }
  }, [decimals, desc, managerName, maxAmount, minAmount, oldDerivative, selectDerivative])

  const isDisabled = useMemo(() => [0, 1].includes(verifyStatus), [verifyStatus])

  const minAmountError = useMemo(
    () => Number(minAmount) < minAmountNumber && minAmount !== '',
    [minAmount, minAmountNumber]
  )
  const maxAmountError = useMemo(
    () => Number(maxAmount) <= Number(minAmount) && maxAmount !== '',
    [minAmount, maxAmount]
  )

  const disabledConfirm = useMemo(() => {
    if (loading) return true
    if (!isChange) return true
    if (derivativeList.length === 0) return true
    if (minAmountError || minAmount === '') return true
    if (maxAmountError || maxAmount === '') return true
    return false
  }, [derivativeList, maxAmountError, minAmountError, loading, isChange, minAmount, maxAmount])

  const isLock = useMemo(() => ![-1, 2].includes(verifyStatus), [verifyStatus])
  const onSelect = (item: string) => {
    if (isLock) return
    if (!isDisabled) {
      if (selectDerivative.includes(item as AddressType)) {
        setSelectDerivative(without(selectDerivative, item) as AddressType[])
      } else {
        setSelectDerivative([...selectDerivative, item] as AddressType[])
      }
    }
    // console.log(selectDerivative)
  }
  useEffect(() => {
    // console.log('isChange', isChange)
    if (loading) return
    if (baseDataStr === '' && managerName !== '') {
      setBaseDataStr(JSON.stringify(calcConfirmData()))
      return
    }
    // console.log('isChange1', isChange)
    // console.log(JSON.stringify(calcConfirmData()), 2, baseDataStr)
    if (JSON.stringify(calcConfirmData()) !== baseDataStr) {
      setIsChange(true)
    } else {
      setIsChange(false)
    }
  }, [
    loading,
    desc,
    managerName,
    oldDerivative,
    selectDerivative,
    minAmount,
    maxAmount,
    decimals,
    isChange,
    calcConfirmData,
    baseDataStr
  ])

  const onConfirm = () => {
    if (!account) return
    const data = calcConfirmData()
    onUpdateVault(baseInfo.address, data, account, getData)
  }

  return (
    <>
      <BlueLineSection className="web-manage-create-step" title="Edit Fund Base Info">
        <div className="web-manage-create-step-3col">
          <Input
            value={managerName}
            label="manager name"
            count
            disabled={isDisabled}
            maxLength={20}
            onChange={setManagerName}
            readonly={isLock}
          />
        </div>
        <div className="web-manage-create-step-1col">
          <Input
            type="textarea"
            value={desc}
            label="manager introduction"
            count
            disabled={isDisabled}
            onChange={setDesc}
            maxLength={200}
            readonly={isLock}
          />
        </div>
        <div className="web-manage-create-step-2col">
          <Input
            type="number"
            value={minAmount}
            label="Minimum Deposit Amount"
            disabled={isDisabled}
            error={minAmountError}
            onChange={setMinAmount}
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
            readonly={isLock}
          >
            {minAmountError && (
              <p className="fall">
                Minimum deposit amount {minAmountNumber} {baseTokenName}
              </p>
            )}
          </Input>
          <Input
            type="number"
            value={maxAmount}
            label="Maximum Deposit Amount"
            error={maxAmountError}
            disabled={isDisabled}
            onChange={setMaxAmount}
            innerSuffix={<TokenIcon size="small" name={baseToken?.name} />}
            readonly={isLock}
          />
        </div>
        <h3>select protocol allowed</h3>
        <ul className="web-manage-create-step-product-list">
          {derivativeList.map((item: VaultDerivativesProps, index: number) => (
            <li
              key={index}
              onClick={() => onSelect(item.value)}
              className={classNames({ active: selectDerivative.includes(item.value) })}
            >
              <Image src={`products/${item.name}.png`} alt={item.name} />
            </li>
          ))}
        </ul>

        <footer>
          {[-1, 2].includes(verifyStatus) ? (
            <Button disabled={disabledConfirm} onClick={onConfirm}>
              confirm
            </Button>
          ) : (
            <>
              <Button outline onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button to={CONTACT_US_URL}>Contact us</Button>
            </>
          )}
        </footer>
      </BlueLineSection>
      <Loading type="fixed" show={loading} />
    </>
  )
}

export default Edit
