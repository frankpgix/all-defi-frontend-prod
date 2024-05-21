import { FC, useMemo, useState } from 'react'

import dayjs from 'dayjs'
import { isNumber } from 'lodash'

import { useDeposit, useIsAllowedForDeposit } from '@/hooks/Contracts/useACProtocol'
import { useProfile } from '@/hooks/useProfile'
import { useToken, useUnderlyingTokenOptions } from '@/hooks/useToken'
import { useUserBalances } from '@/hooks/useToken'

import { AddressType } from '@/types/base'

import { ACTOKEN_LOCK_TIMES } from '@/config'
import { useUserDepositData } from '@/graphql/useFundData'
import { sleep } from '@/utils/tools'
import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import { Input, Select } from '@@/common/Form'
import ButtonSelect from '@@/form/ButtonSelect'
import BlueLineSection from '@@/web/BlueLineSection'

import MyDeposit from './MyDeposit'

export const Infinite: FC<{ white?: boolean }> = ({ white }) => (
  <svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.7769 0.00058367V0.164101L20.7495 0.00058367C19.5564 0.00992751 18.2944 0.508656 17.3942 1.11717C16.0395 2.04455 15.1066 3.31473 14.2588 4.36182C14.1801 4.45935 13.4666 5.42469 12.6743 6.47412C11.8855 7.52063 11.0162 8.64948 10.6649 9.02382C10.0757 9.6557 9.62935 10.3314 9.00684 10.7443C8.39657 11.1577 7.61186 11.4176 7.26997 11.4176C7.26997 11.4176 7.25772 11.4176 7.2443 11.4176C6.0652 11.4176 5.00511 10.8721 4.22565 10.0954C3.44969 9.31581 2.97361 8.22083 2.97361 7.03475C2.9742 5.84808 3.44969 4.73908 4.22565 3.95945C5.00511 3.18275 6.06519 2.65774 7.25014 2.65774C7.25947 2.65774 7.26647 2.65774 7.27289 2.65774C7.6247 2.65774 8.21629 2.89601 8.84756 3.33342C9.74604 3.94077 10.4817 4.73266 11.211 5.61507L11.3429 5.78384L13.0109 3.54657L12.9251 3.44905C12.809 3.31531 12.9041 3.39707 12.7793 3.26042C12.0862 2.50532 11.4998 1.73445 10.5955 1.11659C9.69236 0.508071 8.44441 0.00934385 7.25189 0C3.38726 0.00175197 0.257759 3.13369 0.256592 7.00029C0.257759 10.8663 3.38726 13.9988 7.25014 14C8.44441 13.9907 9.69236 13.4919 10.5938 12.8834C11.9479 11.956 12.8744 10.6859 13.7221 9.63818C13.7997 9.54182 14.5103 8.57648 15.302 7.52647C16.0908 6.48054 16.959 5.3511 17.3108 4.97677C17.8989 4.3443 18.5622 3.70659 19.1853 3.29371C19.7967 2.88082 20.3632 2.65774 20.7051 2.65774H20.7168C21.9111 2.65774 22.9706 3.16581 23.7489 3.9431C24.526 4.72215 25.0003 5.79844 25.0009 6.98511C24.9997 8.17119 24.526 9.30822 23.7489 10.0878C22.9706 10.8651 21.9105 11.4176 20.7244 11.4176H20.7028C20.3504 11.4176 19.5406 11.142 18.9093 10.704C18.0115 10.0978 17.4315 9.22588 16.7034 8.34289L16.5698 8.16594L14.903 10.3974L14.9893 10.4931C15.1054 10.6269 15.0716 10.6047 15.1958 10.7413C15.8889 11.4958 16.4753 12.2655 17.379 12.884C18.2816 13.4925 19.5307 13.9912 20.7232 14C24.5873 13.9994 27.7424 10.8663 27.7436 7.00029C27.7424 3.13428 24.2775 0.00175165 20.7769 0.00058367Z"
      fill={white ? '#ffffff' : '#1036E6'}
    />
  </svg>
)

const maxInt256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
const Bench: FC = () => {
  const { getTokenByAddress } = useToken()
  const baseTokenOptions = useUnderlyingTokenOptions()
  const { onDeposit } = useDeposit()
  const { account } = useProfile()
  const { data: isAllowedForDeposit } = useIsAllowedForDeposit(account)
  const { balances, refetch: reBalance } = useUserBalances()
  const [amount, setAmount] = useState<string | number>('')
  const [lockDuration, setLockDuration] = useState<number | string>(ACTOKEN_LOCK_TIMES[0])
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const [allowedStatus, setAllowedStatus] = useState<boolean>(false)
  const [baseTokenAddress, setBaseTokenAddress] = useState<AddressType>(baseTokenOptions[0].value)
  const currBaseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])
  const { data, loading, refetch } = useUserDepositData(account ?? '')

  const lockDurationOptions = [
    { label: '1 Month', value: ACTOKEN_LOCK_TIMES[0] },
    { label: '3 Month', value: ACTOKEN_LOCK_TIMES[1] },
    { label: '6 Month', value: ACTOKEN_LOCK_TIMES[2] },
    { label: '1 Year', value: ACTOKEN_LOCK_TIMES[3] },
    {
      label: <Infinite white={lockDuration === maxInt256} />,
      value: maxInt256
    }
  ]
  const buyAndStakeFunc = async () => {
    if (account) {
      // 执行购买和质押
      await onDeposit(baseTokenAddress, Number(amount), lockDuration, account, async () => {
        reBalance()
        await sleep(2000)
        await refetch()
      })
    }
  }

  const isDisabled = useMemo(
    () => !amount || !isNumber(Number(amount) || Number(amount) === 0),
    [amount]
  )

  const maxNumber = useMemo(() => {
    return balances[currBaseToken.name]
  }, [balances, baseTokenAddress, currBaseToken.name])

  const onChangeBaseToken = (address: any) => {
    setBaseTokenAddress(address)
    setAmount('')
  }

  const DurationPre = useMemo(() => {
    if (lockDuration === maxInt256) {
      return {
        duration: <Infinite />,
        unlockOn: <Infinite />
      }
    }

    const now = +new Date()
    const time = now + Number(lockDuration) * 1000
    return {
      duration: lockDurationOptions.find((item) => item.value === lockDuration)?.label,
      unlockOn: dayjs(time).format('MMM DD YYYY HH:mm')
    }
  }, [lockDuration])

  const onConfirm = () => {
    if (isAllowedForDeposit) {
      setInfoStatus(true)
    } else {
      setAllowedStatus(true)
    }
  }
  return (
    <>
      <BlueLineSection title="Deposit" className="web-buy-bench">
        <div className="web-buy-bench-form">
          <h4>Deposit</h4>
          <div className="web-buy-bench-form-item">
            <Input
              className="web-buy-bench-input"
              type="number"
              value={amount}
              onChange={(val) => setAmount(val)}
              right
              placeholder="0"
              maxNumber={maxNumber}
              error={Number(amount) === 0 && amount !== ''}
            >
              <p>
                {currBaseToken.name} Balance: {maxNumber}
              </p>
            </Input>
            <Select
              value={baseTokenAddress}
              onChange={onChangeBaseToken}
              objOptions={baseTokenOptions}
            />
          </div>
          <h4>Select Lock Duration</h4>
          <ButtonSelect
            value={lockDuration}
            onChange={setLockDuration}
            options={lockDurationOptions}
          />
        </div>
        <div className="web-buy-bench-pre">
          <h4>You will receive</h4>
          <div className="web-buy-bench-pre-detail">
            <dl>
              <dd>{amount || 0}</dd>
              <dt>ac{currBaseToken.name}</dt>
            </dl>
            <dl>
              <dt>Token to Be locked</dt>
              <dd>{amount || 0}</dd>
            </dl>
            {/* <dl>
              <dt>Estimated ALL Return%</dt>
              <dd>20%</dd>
            </dl> */}
            <dl>
              <dt>Duration</dt>
              <dd>{DurationPre.duration}</dd>
            </dl>
            <dl>
              <dt>Unlock on</dt>
              <dd>{DurationPre.unlockOn}</dd>
            </dl>
          </div>
          <Button disabled={isDisabled} onClick={onConfirm}>
            confirm
          </Button>
        </div>
      </BlueLineSection>
      <InfoDialog
        show={infoStatus}
        type="info"
        onConfirm={buyAndStakeFunc}
        onClose={() => setInfoStatus(false)}
        title="Confirm AC Token Deposit"
        msg={`You will deposit ${amount} ac${currBaseToken.name}, for a total cost of ${amount} ${currBaseToken.name}`}
      />
      <InfoDialog
        show={allowedStatus}
        type="info"
        onConfirm={() => setAllowedStatus(false)}
        onClose={() => setAllowedStatus(false)}
        title="Restricted Permissions"
        msg={`You are not authorized for Deposit, Please contact management.`}
      />
      <MyDeposit Infinite={<Infinite />} {...{ data, loading, refetch }} />
    </>
  )
}

export default Bench
