import React, { FC, useState, useMemo } from 'react'
import classNames from 'classnames'
import { toLower } from 'lodash'

import FundIcon from '@@/common/FundIcon'
import Dialog from '@@/common/Dialog'
import ALink from '@@/common/ALink'
import Input from '@@/common/Form/Input'
import { FundSelectProps, PoolProps } from './types'

const FundSelect: FC<FundSelectProps> = ({ list, onSelect, unStake }) => {
  const [show, setShow] = useState(false)
  const [currFund, setCurrFund] = useState('')
  const [keyword, setKeyword] = useState('')
  const fundSymbol = useMemo(() => {
    const o = list.find((item) => item.shareToken === currFund)
    return o ? o.symbol : 'Select a Share'
  }, [list, currFund])

  const option = useMemo(
    () =>
      list.filter(
        (item) =>
          toLower(item.symbol).includes(toLower(keyword)) ||
          toLower(item.shareToken).includes(toLower(keyword))
      ),
    [list, keyword]
  )
  const onItemClick = (item: PoolProps) => {
    setCurrFund(item.shareToken)
    onSelect(item)
    setShow(false)
  }
  return (
    <>
      <div
        className={classNames('web-mining-fund-select', { show })}
        onClick={() => setShow(!show)}
      >
        <FundIcon name={fundSymbol} />
        <strong>{fundSymbol}</strong>
      </div>
      <Dialog show={show} onClose={() => setShow(false)} width="670px">
        <div className="web-mining-fund-select-dialog">
          <header>
            <h4>Select Shares</h4>

            <p>
              {unStake ? (
                <>The list below will only show the vaults you have successfully staked to.</>
              ) : (
                <>
                  The list below will show only the vaults you have successfully allocated to.
                  <ALink to="/fund-market">You haven't allocated to a vault yet?</ALink>
                </>
              )}
            </p>
          </header>
          <Input
            label="Vault name"
            value={keyword}
            onChange={setKeyword}
            placeholder="Enter Vault Name or Paste contract address"
          ></Input>
          {option.length ? (
            <section>
              {option.map((item, index) => (
                <div
                  className="web-mining-fund-select-item"
                  key={index}
                  onClick={() => onItemClick(item)}
                >
                  <FundIcon name={item.symbol} size="medium" />
                  <strong>{item.symbol}</strong>
                  <aside>
                    {unStake ? (
                      <>
                        Staked Shares: <em>{item.stakeAmount}</em>
                      </>
                    ) : (
                      <>
                        Balance: <em>{item.shareBalance}</em>
                      </>
                    )}
                  </aside>
                </div>
              ))}
            </section>
          ) : null}
        </div>
      </Dialog>
    </>
  )
}

export default FundSelect
