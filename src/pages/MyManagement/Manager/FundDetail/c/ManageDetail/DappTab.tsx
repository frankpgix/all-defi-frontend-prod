import { FC, useMemo, useState } from 'react'
import { hexToString } from 'viem'
import { compact } from 'lodash'

import { copyText, sleep } from '@/utils/tools'

import { derivativesConfig, DerivativesInfoType } from '@/config/derivatives'
import Image from '@@/common/Image'
import Button from '@@/common/Button'

const DappTab: FC<{ fundAddress: string; derivatives: `0x${string}`[] }> = ({
  fundAddress,
  derivatives
}) => {
  const list = useMemo(
    () =>
      compact(
        derivatives.map((item) => {
          const name: string = hexToString(item, { size: 32 })
          // let url = ''
          if (derivativesConfig[name]) {
            // url = derivativesConfig[name].url
            return { ...derivativesConfig[name], code: name }
          }
          // return { name, value: item, url }
        })
      ),
    [derivatives]
  )

  return (
    <div className="web-dapp-tab">
      {list.map((item, index) => (
        <DappCard data={item} key={index} fundAddress={fundAddress} />
      ))}
    </div>
  )
}

export default DappTab

interface DappCardDataType extends DerivativesInfoType {
  code: string
}
interface DappCardType {
  data: DappCardDataType
  fundAddress: string
}

const DappCard: FC<DappCardType> = ({ data, fundAddress }) => {
  const [showCopy, setShowCopy] = useState(false)

  const onCopyAddress = async () => {
    copyText(data.url)
    setShowCopy(true)
    await sleep(800)
    setShowCopy(false)
  }
  return (
    <div className="web-dapp-card">
      <div className="web-dapp-card-base">
        <Image className="web-dapp-card-icon" src={`products/${data.code}.png`} alt={data.name} />
        <div className="web-dapp-card-control">
          <div className="web-dapp-card-control-copy" onClick={onCopyAddress}>
            <i></i>
            {showCopy && <p>✔️ Address copied.</p>}
          </div>
        </div>
        <div className="web-dapp-card-info">
          <h4>{data.name}</h4>
          <p>{data.info}</p>
        </div>
        <div className="web-dapp-card-tags">
          {data.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <footer className="web-dapp-card-btns">
        <Button size="mini" outline>
          info
        </Button>
        <Button size="mini" to={`/manage/manager/dapp/${fundAddress}?dapp=${data.url}`}>
          connect
        </Button>
      </footer>
    </div>
  )
}
