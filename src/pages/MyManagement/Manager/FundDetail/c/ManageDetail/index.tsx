import React, { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import BN from 'bignumber.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import { getTokenByAddress } from '@/config/tokens'
// import { lowerCase } from 'lodash'
// import { floor, isNaN } from 'lodash'
// import { floor } from 'lodash'

// import { FundBaseProps, FundDetailProps } from '@/class/Fund'
// import { FundStakeProps } from '@/class/FundManager'
import { formatNumber } from '@/utils/tools'
// import { useFundDetail } from '@/graphql/useFundData'
import { getTokenByAddress } from '@/config/tokens'

import { FundBaseProps, FundDetailProps, FundStakeProps, FundBreachDetailProps } from '@/class/help'

// import BlueLineSection from '@@/web/BlueLineSection'
// import DataItem from '@@/common/DataItem'
import Button from '@@/common/Button'
import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'
// import PercentageLine from '@@/common/PercentageLine'
// import RoeShow from '@@/common/RoeShow'
import TokenValue from '@@/common/TokenValue'
// import Blank from '@@/common/Blank'
// import Popper from '@@/common/Popper'

import FundSettleButton from '../FundSettleButton'
import Dapp from '@@/web/Dapp'

import {
  CountLayout,
  CountItem,
  SectionHeader,
  SectionLayout,
  SectionBlank,
  SectionItem,
  SectionTip,
  SectionButtons,
  SectionPercentageLine
} from './C'

interface Props {
  base: FundBaseProps
  data: FundDetailProps
  stake: FundStakeProps
  breach: FundBreachDetailProps
  fundAddress: string
  loading: boolean
  getData: () => void
}

const ManageDetail: FC<Props> = ({ base, data, stake, fundAddress, breach, getData, loading }) => {
  // const { data: currFund } = useFundDetail(fundAddress)
  // console.log('currFund', currFund)
  const percent = useMemo(
    () =>
      Number(
        formatNumber(
          Math.min(BN(data.aum).div(data.settleAUMLimit).times(100).toNumber(), 100),
          2,
          '0.00'
        )
      ),
    [data.aum, data.settleAUMLimit]
  )
  const remainPercent = useMemo(() => BN(100).minus(percent).toNumber(), [percent])
  // console.log('data', data, 'base', base)
  // const allPledgeRate = useMemo(() => {
  //   const val = BN(data.settleAUMLimit).div(data.aum).times(100).toNumber()
  //   return isNaN(val) ? 0 : floor(val, 4)
  // }, [data.settleAUMLimit, data.aum])
  // console.log(data, base, 12345, floor(-0.123456, 2), floor(0.123456, 2))

  const managerALLStakingRatio = useMemo(() => {
    if (data.settleAUMLimit >= data.aum) return '100'
    return formatNumber(BN(data.settleAUMLimit).div(data.aum).toNumber(), 2, '0.00')
  }, [data.settleAUMLimit, data.aum])
  const currmanagerALLStakingRatio = useMemo(() => {
    if (data.settleAUMLimit >= data.nav) return '100'
    return formatNumber(BN(data.settleAUMLimit).div(data.nav).toNumber(), 2, '0.00')
  }, [data.settleAUMLimit, data.nav])

  const nextRoundCash = useMemo(
    () => BN(data.redeemingShares).times(data.sharePrice).toNumber(),
    [data.redeemingShares, data.sharePrice]
  )
  const nextRoundCashNewCalc = useMemo(() => {
    const temp1 = BN(data.managerFee).plus(data.platFee)
    const temp2 = BN(nextRoundCash).div(data.nav)
    return BN(temp1).times(temp2).toNumber()
  }, [data, nextRoundCash])

  // min 0 (aum * roe) * 20%
  const currManagerFee = useMemo(
    () => Math.max(BN(data.aum).times(data.roe).times(0.2).div(100).toNumber(), 0),
    [data.aum, data.roe]
  )
  const baseToken = useMemo(() => getTokenByAddress(base.baseToken), [base.baseToken])

  const activeIndex = import.meta.env.NODE_ENV === 'development' ? 0 : 0
  // const acToken = useMemo(() => {
  //   return getTokenByAddress(base.acToken)
  // }, [base.acToken])
  return (
    <>
      <CountLayout>
        <CountItem
          label="Fund AUM"
          loading={loading}
          value={<TokenValue value={data.aum} token={baseToken} size="small" format="0,0.00" />}
        />
        <CountItem
          label="Cash Balance"
          loading={loading}
          value={
            <TokenValue value={data.unusedAsset} token={baseToken} size="small" format="0,0.00" />
          }
        />
        <CountItem
          label="Expected Cash For Next Round"
          popper="Required cash need to be prepared before this Epoch settlement"
          loading={loading}
          value={
            <TokenValue
              value={nextRoundCashNewCalc}
              token={baseToken}
              size="small"
              format="0,0.00"
            />
          }
        />
        {/* redeemingShares * sharePrice */}
        <CountItem
          label="Current Share Price"
          loading={loading}
          value={
            <TokenValue value={data.sharePrice} token={baseToken} size="small" format="0,0.00" />
          }
        />
      </CountLayout>
      {data.aum > data.realtimeAUMLimit && (
        <>
          <Alert show type="error">
            Your current fund AUM has exceeded the fund max AUM limited. please increase the fund
            max AUM limit before settlement.
          </Alert>
          <Blank />
        </>
      )}
      {data.nav > data.realtimeAUMLimit && data.aum <= data.realtimeAUMLimit && (
        <>
          <Alert show type="error">
            When the Staking Ratio of the Current Epoch is less than 100%, please stake more ALL
            Token before end of current Epoch to sure to receive 100% of the incentive fee during
            settlement.
          </Alert>
          <Blank />
        </>
      )}
      <Tabs defaultIndex={activeIndex}>
        <TabList>
          <Tab>Basic</Tab>
          {/* <Tab>Revenue</Tab> */}
          <Tab>Fees</Tab>
          <Tab>Fund</Tab>
          <Tab>Risk Control</Tab>
          <Tab>Dapp</Tab>
        </TabList>
        {/* Basic TabPanel */}
        <TabPanel>
          {/* <SectionHeader name="Basic" /> */}
          <SectionLayout col="3">
            <SectionItem
              label="Create Time"
              loading={loading}
              value={dayjs(data.subscribeEndTime).format('MMM DD, YYYY hh:mm:ss A')}
            />
            {/* <SectionItem label="当前用户数量" value="No Data" /> */}
            <SectionItem
              popper="Number of Epochs since inception"
              label=" Round Duration"
              loading={loading}
              value={data.epochIndex}
            />

            <SectionItem label="Denomination Asset" loading={loading} value={baseToken.name} />
          </SectionLayout>
          <SectionLayout col="3">
            <SectionItem
              label="Minimum Deposit Amount"
              loading={loading}
              value={
                <TokenValue
                  value={base.subscriptionMinLimit}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
            <SectionItem
              label="Maximum Deposit Amount"
              loading={loading}
              value={
                <TokenValue
                  value={base.subscriptionMaxLimit}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
            <SectionItem label="Incentive Rate" loading={loading} value="20%" />
          </SectionLayout>

          {/*          <SectionBlank /><SectionHeader name="Slippage Information" />
          <SectionLayout col="2">
            <SectionItem label="Cumulative Slippage Tolerance" value="No Data" />
            <SectionItem label="Current cumulative slippage" value="No Data" />
          </SectionLayout>*/}

          <SectionTip>
            Changing the fund policy can only be allowed during the open period. Once the change is
            confirmed, a public announcement will be made and the change will be implemented in the
            next epoch. Please note changing the fund policy might result in redemptions of the
            fund, so please proceed with caution.
          </SectionTip>
          <SectionButtons>
            <FundSettleButton
              disabled={![5, 4].includes(data.status)}
              outline
              callback={getData}
              fundAddress={fundAddress}
            >
              settle
            </FundSettleButton>
            <Button to={`/manage/manager/fund-edit/${fundAddress}`}>Reset policies</Button>
          </SectionButtons>
        </TabPanel>
        {/* Revenue TabPanel */}
        {/* <TabPanel>
          <SectionHeader name="Real-Time Returns" />
          <SectionLayout col="2">
            <SectionItem
              label="Previous Epoch Return %"
              value={<RoeShow value={formatNumber(data.lastRoe, 2, '0.00')} subArrow />}
            />
            <SectionItem
              label="Current Epoch Return %"
              value={<RoeShow value={formatNumber(data.roe, 2, '0.00')} subArrow />}
            />
          </SectionLayout>
          <SectionBlank />
          <SectionHeader name="Historical Returns" />
          <SectionLayout col="2">
            <SectionItem
              label="Average Price"
              value={
                <TokenValue value={data.costPrice} token={baseToken} size="mini" format="0,0.00" />
              }
            />
            <SectionItem
              label="Return Since Inception"
              value={
                <TokenValue
                  value={data.historyReturn}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
          </SectionLayout>
          <SectionLayout col="3">
            <SectionItem
              label="Weekly Yield"
              value={<RoeShow value={currFund?.weekReturn * 100} />}
            />
            <SectionItem
              label="Mothly Yield"
              value={<RoeShow value={currFund?.monthReturn * 100} />}
            />
            <SectionItem
              label="Yearly Yield"
              value={<RoeShow value={currFund?.yearReturn * 100} />}
            />
          </SectionLayout> */}
        {/* <SectionHeader name="Historical Returns" />
          <SectionLayout col="3">
            <SectionItem label="Mothly Yield" value="No Data" />
            <SectionItem label="Seasonal Yield" value="No Data" />
            <SectionItem label="Yearly Yield" value="No Data" />
          </SectionLayout>
          <SectionLayout col="3">
            <SectionItem label="成立至今收益" value={formatNumber(data.historyReturn, 2, '$0,0.00')} />
            <SectionItem label="最佳轮收益率" value="No Data" />
            <SectionItem label="最差轮收益率" value="No Data" />
          </SectionLayout>
          <SectionLayout col="3">
            <SectionItem label="Shares历史最高价格" value="No Data" />
            <SectionItem label="Shares历史最低价格" value="No Data" />
            <SectionItem label="Fund HWM" value={formatNumber(data.costPrice, 2, '$0.00')} />
          </SectionLayout>
          {/* <SectionBlank />
          <SectionHeader name="Risk Indicators" />
          <SectionLayout col="2">
            <SectionItem label="Fund Volatility" value="No Data" />
            <SectionItem label="Sharpe Ratio" value="No Data" />
          </SectionLayout> */}
        {/* </TabPanel> */}
        {/* Fees TabPanel */}
        <TabPanel>
          <SectionHeader name="Manager Fee" />
          <SectionLayout col="2">
            <SectionItem
              label="Current Epoch Manager Fee"
              loading={loading}
              value={
                <TokenValue value={currManagerFee} token={baseToken} size="mini" format="0,0.00" />
              }
            />
            {/* min 0 (aum * roe) * 20%  */}
            <SectionItem
              label="Unsettled Manager Fee"
              loading={loading}
              value={
                <TokenValue value={data.managerFee} token={baseToken} size="mini" format="0,0.00" />
              }
            />
          </SectionLayout>

          <SectionLayout col="2">
            <SectionItem
              label="Previous Epoch Settled Manager Fee"
              loading={loading}
              value={
                <TokenValue
                  value={data.lastManagerFee}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
            <SectionItem
              label="Average Price"
              loading={loading}
              value={
                <TokenValue value={data.costPrice} token={baseToken} size="mini" format="0,0.00" />
              }
            />
          </SectionLayout>
          <SectionBlank />
          <SectionHeader name="Platform Fee" />
          <SectionLayout col="3">
            <SectionItem
              label="Current Epoch Platform Fee"
              loading={loading}
              value={
                <TokenValue
                  value={currManagerFee / 2}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
            <SectionItem
              label="Unsettled Platform Fee"
              loading={loading}
              popper="Unsettled fee to manager can be claimed when investors redeem or after 6 Epochs"
              value={
                <TokenValue value={data.platFee} token={baseToken} size="mini" format="0,0.00" />
              }
            />
            <SectionItem
              label="Previous Epoch Settled Platform Fee"
              loading={loading}
              value={
                <TokenValue
                  value={data.lastManagerFee / 2}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
          </SectionLayout>
        </TabPanel>
        {/* Fund TabPanel */}
        <TabPanel>
          <SectionLayout col="2">
            <SectionItem
              label="PRE-Settlement Date"
              loading={loading}
              value={dayjs(data.subscribeEndTime).format('MMM DD, YYYY hh:mm:ss A')}
            />
            <SectionItem
              label="Semi-open dates"
              loading={loading}
              value={dayjs(data.subscribeRedeemEndTime).format('MMM DD, YYYY hh:mm:ss A')}
            />
          </SectionLayout>
          <SectionLayout col="3">
            <SectionItem
              label="Redeeming Amount"
              loading={loading}
              popper="Total amount of Shares under redemption"
            >
              {formatNumber(data.redeemingShares, 2, '0,0.00')} Shares ≈{' '}
              {/*formatNumber(BN(data.redeemingShares).times(data.sharePrice).toNumber(), 2, '$0,0.00')*/}
              <TokenValue
                value={BN(data.redeemingShares).times(data.sharePrice).toNumber()}
                token={baseToken}
                size="mini"
                format="0,0.00"
              />
            </SectionItem>
            <SectionItem
              label="Subscribing Amount"
              loading={loading}
              popper="Total value under subscription"
              value={
                <TokenValue
                  value={data.subscribingACToken}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
            <SectionItem loading={loading} label="Fund AUM Available for Subscribtion">
              {/*formatNumber(
                Math.max(BN(data.realtimeAUMLimit).minus(data.aum).minus(data.subscribingACToken).toNumber(), 0),
                2,
                '$0,0.00'
              )*/}
              <TokenValue
                value={Math.max(
                  BN(data.realtimeAUMLimit)
                    .minus(data.aum)
                    .minus(data.subscribingACToken)
                    .toNumber(),
                  0
                )}
                token={baseToken}
                size="mini"
                format="0,0.00"
              />
            </SectionItem>
          </SectionLayout>
          <SectionLayout col="3">
            <SectionItem
              label="ALL Token Staking Value"
              loading={loading}
              // value={formatNumber(stake.valueInUSD, 4, '$0,0.0000')}
              value={
                <TokenValue
                  value={stake.valueInUSD}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
            <SectionItem
              label="ALL Token Staking Amount"
              loading={loading}
              value={formatNumber(stake.stakeAmount, 2, '0,0.00')}
            />
            <SectionItem
              label="Max AUM Limit"
              popper="Max AUM Limit of the fund"
              loading={loading}
              value={
                <TokenValue
                  value={data.realtimeAUMLimit}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
          </SectionLayout>
          <SectionPercentageLine percent={percent} remainPercent={remainPercent} />
          <SectionButtons>
            <Button to={`/manage/manager/fund-stake/${fundAddress}/increase`} outline>
              increase fund max aum limit
            </Button>
            <Button to={`/manage/manager/fund-stake/${fundAddress}/reduce`}>
              REDUCE FUND MAX AUM LIMIT
            </Button>
          </SectionButtons>
        </TabPanel>
        {/* Risk Control TabPanel */}
        <TabPanel>
          <SectionLayout col="3">
            <SectionItem
              label="Locked From Last Epoch"
              loading={loading}
              popper="Frozen ALL tokens due to violation of rules. It will be unfreeze at next Epoch if rules are obeyed"
              value={formatNumber(breach.latestFrozenALL, 2, '0,0.00')}
            />
            <SectionItem
              label="Deducted From Last Epoch"
              loading={loading}
              popper="ALL tokens that are permanently confiscated due to continuous violation of rules"
              value={formatNumber(breach.latestConfiscatedALL, 2, '0,0.00')}
            />
            <SectionItem
              label="Manager ALL Token Staking Ratio"
              loading={loading}
              popper="Ratio of the fund's Max AUM Limit to the fund's current AUM. If such ratio is less than 100%, manager can not claim all the incentive fee. The Staking Ratio of the Last Epoch is calculated by the fund's Max AUM Limit divided by the fund's AUM in the last Epoch. This ratio decides whether manager can receive 100% of the incentive fee of last Epoch"
              value={`${managerALLStakingRatio}%`}
            />
          </SectionLayout>
          <SectionLayout col="3">
            <SectionItem
              label="Current Manager All Token Staking Ratio"
              popper="The Staking Ratio of the Current Epoch is calculated by the real-time data of the fund's Max AUM Limit divided by the fund's NAV now. Manager can decide whether to stake more ALL Token in order to get 100% of the incentive fee in the next Epoch. When the Staking Ratio of the Current Epoch is less than 100%, please stake more ALL Token before end of current Epoch to sure to receive 100% of the incentive fee during settlement."
              popperWidth="400px"
              loading={loading}
              value={`${currmanagerALLStakingRatio}%`}
            />
            <SectionItem
              label="Previous Epoch Redemption Rate"
              loading={loading}
              popper="Redemption Fulfilled Ratio of last Epoch. The ratio less than 100% means there is not enough cash to meet all the redemption requests at last settlement. Redemption Fulfilled Ratio: (Available Cash Balance - Fees) / Total Redemption Value"
              value={`${data.lastRedemptionRatio}%`}
            />
            <SectionItem
              label="Consecutive Default"
              loading={loading}
              value={breach.continuousBreachTimes}
            />
          </SectionLayout>
        </TabPanel>
        <TabPanel>
          <Dapp base={base} data={data} />
        </TabPanel>
      </Tabs>
    </>
  )
}

export default ManageDetail
