import React, { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import BN from 'bignumber.js'
import { useRequest } from 'ahooks'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ContentLoader from 'react-content-loader'
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
import FundReader from '@/class/FundReader'

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
import DappTab from './DappTab'

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
  const { getFundUpdatingData } = FundReader
  const { data: upData, loading: upLoading } = useRequest(
    async () => await getFundUpdatingData(fundAddress, base.baseToken)
  )
  // console.log(upData, upLoading)
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
  // console.log('breach', breach, 'data', data, 'base', base)
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

  const nextRoundCash = useMemo(() => {
    const v = Number(
      BN(data.redeemingShares)
        .times(data.sharePrice)
        .minus(data.subscribingACToken)
        .toFixed(2, BN.ROUND_UP)
    )
    return v >= 0 ? v : 0
  }, [data.redeemingShares, data.sharePrice, data.subscribingACToken])
  // const nextRoundCashNewCalc = useMemo(() => {
  //   const temp1 = BN(data.managerFee).plus(data.platFee)
  //   const temp2 = BN(nextRoundCash).div(data.nav)
  //   return BN(temp1).times(temp2).toNumber()
  // }, [data, nextRoundCash])

  console.log('nextRoundCash', nextRoundCash)
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
          label="Last Epoch NAV"
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
          label="Expected Cash For Next Epoch"
          popper="Required cash need to be prepared before this Epoch settlement"
          loading={loading}
          value={
            <TokenValue
              value={Number(nextRoundCash)}
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
            Your current Net Asset Value has exceeded the Max AUM Limited. please increase the Max
            AUM Limit before settlement.
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
          <Tab>Vault</Tab>
          <Tab>Risk Control</Tab>
          <Tab>Dapp</Tab>
        </TabList>
        {/* Basic TabPanel */}
        <TabPanel>
          {/* <SectionHeader name="Basic" /> */}
          <SectionLayout col="3">
            <SectionItem
              label="Founded time"
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
            Reset the policy requires an audit, and it will take effect in the next Epoch after the
            audit is passed. Please note that changing the Vault policy may cause users to change
            their investment strategy and cause withholding, please modify it carefully.
          </SectionTip>
          <SectionButtons>
            {upLoading || !upData ? (
              <ContentLoader
                width={400}
                height={56}
                viewBox="0 0 400 56"
                backgroundColor="#eaeced"
                foregroundColor="#ffffff"
              >
                <rect x="0" y="0" rx="28" ry="28" width="150" height="56" />
                <rect x="170" y="0" rx="28" ry="28" width="230" height="56" />
              </ContentLoader>
            ) : (
              <>
                <FundSettleButton
                  disabled={![5, 4].includes(data.status)}
                  outline
                  callback={getData}
                  fundAddress={fundAddress}
                >
                  settle
                </FundSettleButton>
                <Button to={`/manage/manager/fund-edit/${fundAddress}`}>
                  {[-1, 2].includes(upData.verifyStatus) ? 'Reset policies' : 'UNDER REVIEW'}
                </Button>
                {/* <Button to={`/manage/manager/dapp/${fundAddress}?dapp=https://app.uniswap.com/`}>
                  dapp test
                </Button> */}
              </>
            )}
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
              popper="Unsettled fee to platform can be claimed when investors withhold or after 6 Epochs"
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
              label="Confirming Withholding Amount"
              loading={loading}
              // popper="Total amount of Shares under redemption"
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
              label="Confirming Allocation Amount"
              loading={loading}
              // popper="Total value under subscription"
              value={
                <TokenValue
                  value={data.subscribingACToken}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              }
            />
            <SectionItem loading={loading} label="Capacity Available">
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
              // popper="Max AUM Limit of the fund"
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
              INCREASE VAULT MAX AUM LIMIT
            </Button>
            <Button to={`/manage/manager/fund-stake/${fundAddress}/reduce`}>
              REDUCE VAULT MAX AUM LIMIT
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
              popper="Ratio of the vault's Max AUM Limit to the vault's current NAV. If such ratio is less than 100%, manager can not claim all the incentive fee. The Staking Ratio of the Last Epoch is calculated by the vault's Max AUM Limit divided by the vault's NAV in the last Epoch. This ratio decides whether manager can receive 100% of the incentive fee of last Epoch"
              value={`${managerALLStakingRatio}%`}
            />
          </SectionLayout>
          <SectionLayout col="3">
            <SectionItem
              label="Current Manager All Token Staking Ratio"
              popper="The Staking Ratio of the Current Epoch is calculated by the real-time data of the vault's Max AUM Limit divided by the vault's NAV now. Manager can decide whether to stake more ALL Token in order to get 100% of the incentive fee in the next Epoch. When the Staking Ratio of the Current Epoch is less than 100%, please stake more ALL Token before end of current Epoch to sure to receive 100% of the incentive fee during settlement."
              popperWidth="400px"
              loading={loading}
              value={`${currmanagerALLStakingRatio}%`}
            />
            <SectionItem
              label="Previous Epoch withholding Rate %"
              loading={loading}
              popper="Withholding Fulfilled Ratio of last Epoch. The ratio less than 100% means there is not enough cash to meet all the withholding requests at last settlement. withholding Fulfilled Ratio: (Available Cash Balance - Fees) / Total withholding Value"
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
          <DappTab fundAddress={fundAddress} derivatives={base.derivatives} />
        </TabPanel>
      </Tabs>
    </>
  )
}

export default ManageDetail
