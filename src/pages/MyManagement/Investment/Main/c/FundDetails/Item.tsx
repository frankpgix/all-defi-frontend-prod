import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import BN from 'bignumber.js'
import classNames from 'classnames'

import { useCancelStake, useCancelUnstake } from '@/hooks/Contracts/useVault'
import { useProfile } from '@/hooks/useProfile'
import { useToken } from '@/hooks/useToken'

import { VaultUserListDataProps } from '@/types/vault'

import { SectionItem } from '@/pages/MyManagement/Manager/VaultDetail/c/ManageDetail/C'
import { formatNumber, sleep } from '@/utils/tools'
import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'
import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import FundIcon from '@@/common/FundIcon'
import Image from '@@/common/Image'
import RoeShow from '@@/common/RoeShow'
import TokenValue from '@@/common/TokenValue'

// import Claim from './Claim'

interface Props {
  active: boolean
  isInit: boolean
  fund: VaultUserListDataProps
  onChange: () => void
  callback: () => void
}

const VaultItem: FC<Props> = ({ active, isInit, onChange, fund, callback }) => {
  const { getTokenByAddress } = useToken()
  const { account } = useProfile()
  const { onCancelStake: onCancelAllocate } = useCancelStake(fund.detail.address)
  const { onCancelUnstake: onCancelWithholding } = useCancelUnstake(fund.detail.address)
  const ref = useRef<HTMLDivElement>(null)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const [infoStatus2, setInfoStatus2] = useState<boolean>(false)
  const currReturn = useMemo(
    // () => BN(fund.data.nav).minus(fund.data.aum).toNumber(),
    // () => BN(fund.data.roe).times(fund.data.aum).div(100).toNumber(),
    // () => BN(fund.data.roe).times(fund.data.aum).div(100).toNumber(),
    () =>
      BN(fund.detail.roe)
        .times(fund.detail.beginSharePrice)
        .times(fund.detail.shares)
        .div(100)
        .toNumber(),
    [fund.detail.roe, fund.detail.beginSharePrice, fund.detail.shares]
  )

  const goCancelAllocate = async () => {
    if (account) {
      await onCancelAllocate(account)
      callback()
    }
  }

  const goCancelcWithholding = async () => {
    if (account) {
      await onCancelWithholding(account)
      callback()
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
  // console.log(fund)
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
                <FundIcon name={fund.base.name} size="large" />
                <h4>{fund.base.managerName}</h4>
                <p>{fund.base.desc}</p>
              </article>
              <section>
                <h5>protocol allowed</h5>
                <main>
                  <p>
                    <Image src={`/products/CEFFU.png`} alt={'CEFFU'} />
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
                      !(fund.userDetail.pendingStake > 0 && [0, 1].includes(fund.detail.status))
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
                      !(fund.detail.unstakingShare > 0 && [0, 1].includes(fund.detail.status))
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
              <SectionItem label="Staking Value">
                <TokenValue
                  value={fund.detail.nav}
                  token={underlyingToken}
                  size="mini"
                  format="0,0.00"
                />
                {/*{formatNumber(fund.data.navInUSD, 2, '$0,0.00')}*/}
              </SectionItem>
              <section>
                <SectionItem
                  label="Accumulated Investment Profit"
                  popper="Historic cumulative profit and loss"
                >
                  <TokenValue
                    value={fund.detail.historicalReturn}
                    token={underlyingToken}
                    size="mini"
                    format="0,0.00"
                  />
                </SectionItem>
                <SectionItem
                  label="Claimable AC Tokens"
                  // popper="Please use redemption function to claim your AC token"
                >
                  <TokenValue
                    value={fund.detail.unclaimedUnderlying}
                    token={underlyingToken}
                    size="mini"
                    format="0,0.00"
                  />
                  {/*{formatNumber(fund.data.unclaimedACToken, 2, '$0,0.00')}*/}
                </SectionItem>
                <SectionItem label="Current Epoch return %">
                  <RoeShow value={formatNumber(fund.detail.roe, 2, '0.00')} subArrow />
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
              </section>
              <footer>
                <Button size="medium" to={`/vaults/detail/${fund.detail.address}`}>
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
