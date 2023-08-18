import React, { FC, useState } from 'react'
import { Input } from '@@/common/Form'
import Button from '@@/common/Button'
import FundIcon from '@@/common/FundIcon'
import Wait from '@@/common/Status/Wait'
import ComingSoon from '@@/common/Dialog/ComingSoon'
import Toasts from './Toasts'

const Test: FC = () => {
  const [name, setName] = useState('')
  const [show, setShow] = useState(false)
  return (
    <div className="web-home">
      <Toasts />

      <Input type="number" value={name} onChange={(val) => setName(val)} right></Input>
      <Button disabled>222</Button>
      <Button onClick={() => setShow(!show)}>Open Wait Modal</Button>
      <Button text>222</Button>
      <ComingSoon show={show} onClose={() => setShow(false)} />
      <FundIcon name="A" />
      <FundIcon name="B" round />
      <FundIcon name="C" size="mini" />
      <FundIcon name="D" size="large" />
      <FundIcon name="E" size="medium" />
      <FundIcon name="f" />
      <FundIcon name="g" />
      <FundIcon name="h" />
      <FundIcon name="i" />
      <FundIcon name="j" />
      <FundIcon name="k" />
      <FundIcon name="l" />
      <FundIcon name="m" />
      <FundIcon name="n" />
      <FundIcon name="o" />
      <FundIcon name="p" />
      <FundIcon name="q" />
      <FundIcon name="r" />
      <FundIcon name="s" />
      <FundIcon name="t" />
      <FundIcon name="u" />
      <FundIcon name="v" />
      <FundIcon name="w" />
      <FundIcon name="x" />
      <FundIcon name="y" />
      <FundIcon name="z" />
      <FundIcon name="0" />
      <FundIcon name="1" />
      <FundIcon name="2" />
      <FundIcon name="3" />
      <FundIcon name="4" />
      <FundIcon name="5" />
      <FundIcon name="6" />
      <FundIcon name="7" />
      <FundIcon name="8" />
      <FundIcon name="9" />
    </div>
  )
}

export default Test
