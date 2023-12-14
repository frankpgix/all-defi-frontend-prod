import React, { FC, useMemo, useState, useRef, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import BN from 'bignumber.js'
// import { floor } from 'lodash'

import { FundUserListDataProps } from '@/class/help'
import { formatNumber, sleep } from '@/utils/tools'
import { ProductProps } from '@/config/products'
import { getTokenByAddress } from '@/config/tokens'

import { SectionItem } from '@/pages/MyManagement/Manager/FundDetail/c/ManageDetail/C'

import Button from '@@/common/Button'
import Image from '@@/common/Image'
import RoeShow from '@@/common/RoeShow'
// import DataItem from '@@/common/DataItem'
import InfoDialog from '@@/common/Dialog/Info'
import FundIcon from '@@/common/FundIcon'
import TokenValue from '@@/common/TokenValue'
import Popper from '@@/common/Popper'

import Claim from './Claim'

interface Props {
  active: boolean
  isInit: boolean
  fund: FundUserListDataProps
  onChange: () => void
  callback: (update: boolean) => void
  onCancelRedeem: (address: string) => void
  onCancelSubscribe: (address: string) => void
  derivativeList: ProductProps[]
}

const FundItem: FC<Props> = ({
  active,
  isInit,
  onChange,
  fund,
  onCancelRedeem,
  onCancelSubscribe,
  callback,
  derivativeList
}) => {
  // console.log(fund, 22222)
  // const subscribedAmount = useMemo(() => BN(fund.data.subscribingACUSD ?? 0).toNumber(), [fund.data.subscribingACUSD])
  const ref = useRef<HTMLDivElement>(null)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const [infoStatus2, setInfoStatus2] = useState<boolean>(false)
  const currReturn = useMemo(
    () => BN(fund.data.nav).minus(fund.data.aum).toNumber(),
    // () => BN(fund.data.roe).times(fund.data.shares).toNumber(),
    [fund.data.nav, fund.data.aum]
  )

  const derivatives = useMemo(
    () =>
      fund.derivatives.map((address: string) =>
        derivativeList.find((item) => item.value === address)
      ),
    [fund.derivatives, derivativeList]
  )

  const inView = useCallback(async () => {
    await sleep(250)
    if (!isInit && active && ref.current) {
      ref.current?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [active, ref, isInit])

  const acToken = useMemo(() => getTokenByAddress(fund.acToken), [fund.acToken])

  useEffect(() => {
    void inView()
  }, [inView])

  return (
    <>
      <section className={classNames('web-manage-investment-fund-item', { active, finish: false })}>
        <div ref={ref} className="web-manage-investment-fund-item-position"></div>
        <header onClick={onChange}>
          <h3>{fund.name}</h3>
        </header>
        <div className="web-manage-investment-fund-item-detail">
          <main>
            <div className="web-manage-investment-fund-item-base">
              <article>
                <FundIcon name={fund.name} size="large" />
                <h4>{fund.managerName}</h4>
                <p>{fund.desc}</p>
              </article>
              <section>
                <h5>protocol allowed</h5>
                <main>
                  {derivatives.map((item, index) => (
                    <p key={index} title={item?.name}>
                      {item && <Image src={`products/${item?.name}.png`} alt={item?.name} />}
                    </p>
                  ))}
                </main>
              </section>
              <hr />
              <ul>
                <li>
                  <label>
                    Current Confirming Allocation
                    {/* <Popper content="Fund's value under subscription">
                      Current Confirming Allocation
                    </Popper> */}
                  </label>
                  <em>
                    <TokenValue
                      value={fund.data.subscribingACToken}
                      token={acToken}
                      size="mini"
                      format="0,0.00"
                    />
                  </em>
                  <Button
                    disabled={
                      !(fund.data.subscribingACToken > 0 && [0, 1, 2].includes(fund.data.status))
                    }
                    onClick={() => setInfoStatus(true)}
                    size="mini"
                    text
                  >
                    Cancel
                  </Button>
                  {!(fund.data.subscribingACToken > 0 && [0, 1, 2].includes(fund.data.status)) && (
                    <p>Exceeded the cancellation period</p>
                  )}
                </li>
                <li>
                  <label>
                    Current Confirming Withholding
                    {/* <Popper content="Amount of Shares under redemption">
                      Current Confirming Withholding
                    </Popper> */}
                  </label>
                  <em>
                    {formatNumber(fund.data.redeemingShares, 4, '0,0.0000')}
                    {/*<TokenValue value={fund.data.redeemingShares} token={acToken} size="mini" format="0,0.00" />*/}
                  </em>
                  <Button
                    disabled={!(fund.data.redeemingShares > 0 && fund.data.status === 1)}
                    size="mini"
                    onClick={() => setInfoStatus2(true)}
                    text
                  >
                    Cancel
                  </Button>
                  {!(fund.data.redeemingShares > 0 && fund.data.status === 1) && (
                    <p>Exceeded the cancellation period</p>
                  )}
                </li>
              </ul>
            </div>
            <div className="web-manage-investment-fund-item-data">
              <SectionItem label="Allocation Value">
                <TokenValue value={fund.data.nav} token={acToken} size="mini" format="0,0.00" />
                {/*{formatNumber(fund.data.navInUSD, 2, '$0,0.00')}*/}
              </SectionItem>
              <section>
                <SectionItem
                  label="Accumulated Investment Profit"
                  popper="Historic cumulative profit and loss"
                >
                  <TokenValue
                    value={fund.data.historyReturn}
                    token={acToken}
                    size="mini"
                    format="0,0.00"
                  />
                </SectionItem>
                <SectionItem
                  label="Claimable AC Tokens"
                  // popper="Please use redemption function to claim your AC token"
                >
                  <TokenValue
                    value={fund.data.unclaimedACToken}
                    token={acToken}
                    size="mini"
                    format="0,0.00"
                  />
                  {/*{formatNumber(fund.data.unclaimedACToken, 2, '$0,0.00')}*/}
                </SectionItem>
                <SectionItem label="Current Epoch return %">
                  <RoeShow value={formatNumber(fund.data.roe, 2, '0.00')} subArrow />
                </SectionItem>
                <SectionItem label="Current Epoch return">
                  <TokenValue value={currReturn} token={acToken} size="mini" format="0,0.00" />
                  {/*{formatNumber(currReturn, 2, '$0,0.00')}*/}
                </SectionItem>
              </section>
              <footer>
                <Button size="medium" to={`/fund-market/detail/${fund.address}`}>
                  view details
                </Button>
              </footer>
            </div>
          </main>
          <Claim
            unclaimedALL={fund.data.unclaimedALL}
            fundAddress={fund.address}
            callback={callback}
          />
        </div>
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={() => onCancelSubscribe(fund.address)}
        onClose={() => setInfoStatus(false)}
        title="Cancel Allocation"
        msg={`Cancel Allocation Request of ${formatNumber(
          fund.data.subscribingACToken,
          4,
          '0,0.0000'
        )} ${acToken.name}`}
      />
      <InfoDialog
        show={infoStatus2}
        onConfirm={() => onCancelRedeem(fund.address)}
        onClose={() => setInfoStatus2(false)}
        title="Cancel Withholding"
        msg={`Cancel Withholding Request of ${formatNumber(
          fund.data.redeemingShares,
          4,
          '0,0.0000'
        )} Vault Shares`}
      />
    </>
  )
}

export default FundItem
