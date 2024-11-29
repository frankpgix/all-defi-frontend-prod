import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import BN from 'bignumber.js'
import classNames from 'classnames'

import { useCancelStake, useCancelUnstake } from '@/hooks/Contracts/useVault'
import { useProfile } from '@/hooks/useProfile'

// import { useToken } from '@/hooks/useToken'
import { VaultUserListDataProps } from '@/types/vault'

import { formatNumber, sleep } from '@/utils/tools'
import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'
import Button from '@@/common/Button'
// import CopyText from '@@/common/CopyText'
import InfoDialog from '@@/common/Dialog/Info'
import Image from '@@/common/Image'
import RoeShow from '@@/common/RoeShow'
import TokenValue from '@@/common/TokenValue'
import { SectionItem } from '@@/core/Sestion'
import VaultIcon from '@@/core/VaultName'

// import Claim from './Claim'

interface Props {
  active: boolean
  isInit: boolean
  fund: VaultUserListDataProps
  onChange: () => void
  callback: () => void
}

const VaultItem: FC<Props> = ({ active, isInit, onChange, fund, callback }) => {
  // const { getTokenByAddress } = useToken()
  const { account } = useProfile()
  const { onCancelStake: onCancelAllocate } = useCancelStake(fund.detail.address)
  const { onCancelUnstake: onCancelWithholding } = useCancelUnstake(fund.detail.address)
  const ref = useRef<HTMLDivElement>(null)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const [onCancelAllocateStatus, setOnCancelAllocateStatus] = useState<boolean>(false)
  const [onCancelcWithholdingStatus, setOnCancelcWithholdingStatus] = useState<boolean>(false)
  const [infoStatus2, setInfoStatus2] = useState<boolean>(false)
  const currReturn = useMemo(
    // () => BN(fund.data.nav).minus(fund.data.aum).toNumber(),
    // () => BN(fund.data.roe).times(fund.data.aum).div(100).toNumber(),
    // () => BN(fund.data.roe).times(fund.data.aum).div(100).toNumber(),
    () =>
      BN(fund.detail.roe)
        .times(fund.detail.beginningSharePrice)
        .times(fund.userDetail.shares)
        // .div(100)
        .toNumber(),
    [fund.userDetail.roe, fund.detail.beginningSharePrice, fund.userDetail.shares]
  )

  // console.log(
  //   fund.userDetail.roe,
  //   fund.detail.beginningSharePrice,
  //   fund.userDetail.shares,
  //   'currReturn'
  // )

  const goCancelAllocate = async () => {
    if (account) {
      setOnCancelAllocateStatus(true)
      await onCancelAllocate(account, () => {
        callback()
        setOnCancelAllocateStatus(false)
      })
    }
  }

  const goCancelcWithholding = async () => {
    if (account) {
      setOnCancelcWithholdingStatus(true)
      await onCancelWithholding(account, () => {
        callback()
        setOnCancelcWithholdingStatus(false)
      })
    }
  }
  const inView = useCallback(async () => {
    await sleep(250)
    if (!isInit && active && ref.current) {
      ref.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [active, ref, isInit])

  const underlyingToken = useMemo(() => fund.base.underlying, [fund.base.underlying])
  const ivFinish = useMemo(() => fund.detail.status === 6, [fund.detail.status])
  console.log(fund, 'fund')
  useEffect(() => {
    void inView()
  }, [inView])

  return (
    <>
      <section
        className={classNames('web-manage-investment-fund-item', {
          active,
          finish: ivFinish
        })}
      >
        <div ref={ref} className="web-manage-investment-fund-item-position"></div>
        <header onClick={onChange}>
          <h3>{fund.base.name}</h3>
        </header>

        <div className="web-manage-investment-fund-item-detail">
          {ivFinish && (
            <div style={{ padding: '0 40px' }}>
              <Blank height={30} />

              <Alert show type="error">
                {fund.base.name} has submitted an exit application to the platform. If approved, the
                vault will cease operations at any time.
              </Alert>
            </div>
          )}
          <main>
            <div className="web-manage-investment-fund-item-base">
              <article>
                <VaultIcon icon={fund.base.underlying.icon} name={fund.base.name} size="large" />
                <h4>{fund.base.managerName}</h4>
                {/* <p>{fund.base.desc}</p> */}
                <p>
                  This vault will use a very safe capital preservation strategy to bring benefits to
                  users, mainly based on the BTC price to sell high and buy low strategy,welcome to
                  experience the experience.If you have any questions, please feel free to contact
                  the CCI team. Our email: cciteam@gmail.com Our Telegram: cciteam@tel
                </p>
              </article>
              <section>
                <h5>protocol allowed</h5>
                <main>
                  <p>
                    <Image src={`/products/BRINGTRADE.svg`} alt={'BRINGTRADE'} />
                  </p>
                  {/* {fund.derivativesInfo.map((item, index) => (
                    <p key={index} title={item?.name}>
                      {item && <Image src={`products/${item?.name}.png`} alt={item?.name} />}
                    </p>
                  ))} */}
                </main>
              </section>
              <hr />
              <ul>
                <li>
                  <label>
                    Current Confirming Staking
                    {/* <Popper content="Fund's value under subscription">
                      Current Confirming Allocation
                    </Popper> */}
                  </label>
                  <em>
                    <TokenValue
                      value={fund.userDetail.pendingStake}
                      token={underlyingToken}
                      size="mini"
                      format="0,0.00"
                    />
                  </em>
                  <Button
                    disabled={
                      !(fund.userDetail.pendingStake > 0 && [0, 1].includes(fund.detail.status)) ||
                      onCancelAllocateStatus
                    }
                    onClick={() => setInfoStatus(true)}
                    size="mini"
                    text
                  >
                    Cancel
                  </Button>
                  {![0, 1].includes(fund.detail.status) && <p>Exceeded the cancellation period</p>}
                </li>
                <li>
                  <label>
                    Current Confirming Unstaking
                    {/* <Popper content="Amount of Shares under redemption">
                      Current Confirming Withholding
                    </Popper> */}
                  </label>
                  <em>
                    {formatNumber(fund.detail.unstakingShare, 4, '0,0.0000')}
                    {/*<TokenValue value={fund.data.redeemingShares} token={underlyingToken} size="mini" format="0,0.00" />*/}
                  </em>
                  <Button
                    disabled={
                      !(fund.detail.unstakingShare > 0 && [0, 1].includes(fund.detail.status)) ||
                      onCancelcWithholdingStatus
                    }
                    size="mini"
                    onClick={() => setInfoStatus2(true)}
                    text
                  >
                    Cancel
                  </Button>
                  {![0, 1].includes(fund.detail.status) && <p>Exceeded the cancellation period</p>}
                </li>
              </ul>
            </div>
            <div className="web-manage-investment-fund-item-data">
              {/* <SectionItem label="Staking Value">
                <TokenValue
                  value={fund.userDetail.nav}
                  token={underlyingToken}
                  size="mini"
                  format="0,0.00"
                />
              </SectionItem> */}
              <section>
                <SectionItem label="Current Epoch return %">
                  <RoeShow value={formatNumber(fund.detail.roe * 100, 2, '0.00')} subArrow />
                </SectionItem>
                <SectionItem label="Current Epoch return">
                  <TokenValue
                    value={currReturn}
                    token={underlyingToken}
                    size="mini"
                    format="0,0.00"
                  />
                  {/*{formatNumber(currReturn, 2, '$0,0.00')}*/}
                </SectionItem>
                <SectionItem label="Historical return">
                  <TokenValue
                    value={fund.userDetail.historicalReturn}
                    token={underlyingToken}
                    size="mini"
                    format="0,0.00"
                  />
                </SectionItem>
                <SectionItem
                  label="Claimable Assets"
                  // popper="Please use redemption function to claim your AC token"
                >
                  <TokenValue
                    value={fund.userDetail.unclaimedUnderlying}
                    token={underlyingToken}
                    size="mini"
                    format="0,0.00"
                  />
                  {/*{formatNumber(fund.data.unclaimedACToken, 2, '$0,0.00')}*/}
                </SectionItem>

                <SectionItem label="Total Proprtion">
                  {/* (beginningAUM * underlyingPrice) / sum(beginningAUM * underlyingPrice)  start price */}
                  <RoeShow
                    value={formatNumber(
                      BN(fund.userDetail.aum)
                        .times(fund.underlyingPrice)
                        .div(fund.beginningAUMinUSD)
                        .times(100)
                        .toNumber(),
                      2,
                      '0.00'
                    )}
                  />
                </SectionItem>
                <SectionItem label="Current Proprtion">
                  {/* (beginningAUM * underlyingPrice) / sum(beginningAUM * underlyingPrice) curr price */}
                  <RoeShow
                    value={formatNumber(
                      BN(fund.userDetail.aum)
                        .times(fund.underlyingPrice)
                        .div(fund.currentAUMinUSD)
                        .times(100)
                        .toNumber(),
                      2,
                      '0.00'
                    )}
                  />
                </SectionItem>
              </section>
              <footer>
                <Button size="medium" to={`/vaults/group`}>
                  view details
                </Button>
              </footer>
            </div>
          </main>
          {/* <Claim
            unclaimedALL={fund.data.unclaimedALL}
            fundAddress={fund.address}
            callback={callback}
          /> */}
        </div>
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={() => goCancelAllocate()}
        onClose={() => setInfoStatus(false)}
        title="Cancel Staking"
        msg={`Cancel Staking Request of ${formatNumber(
          fund.userDetail.pendingStake,
          4,
          '0,0.0000'
        )} ${fund.base.underlying.name}`}
      />
      <InfoDialog
        show={infoStatus2}
        onConfirm={() => goCancelcWithholding()}
        onClose={() => setInfoStatus2(false)}
        title="Cancel Unstaking"
        msg={`Cancel Unstaking Request of ${formatNumber(
          fund.detail.unstakingShare,
          4,
          '0,0.0000'
        )} Vault Shares`}
      />
    </>
  )
}

export default VaultItem
