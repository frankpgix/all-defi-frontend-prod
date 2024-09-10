import { FC, useEffect, useState } from 'react'

import { sleep } from '@/utils/tools'
import Button from '@@/common/Button'
import Image from '@@/common/Image'

const NoInvest: FC = () => {
  const [show, setShow] = useState(false)
  const goShow = async () => {
    await sleep(500)
    setShow(true)
  }
  useEffect(() => {
    void goShow()
  }, [])
  if (!show) return null
  return (
    <div className="web-manage-no-invest">
      <Image src="asset/investment-tip.png" />
      <h4>Opps, you haven't made an investment yet.</h4>
      <p>In the vault, choose vault to stake based on data demonstrated by AllDeFi</p>
      <Button to="/vaults">invest now</Button>
    </div>
  )
}

export default NoInvest
