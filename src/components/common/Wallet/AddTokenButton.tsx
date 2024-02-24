import { FC, useState, useRef } from 'react'
import { useClickAway } from 'ahooks'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import tokensInfo from '@/config/tokens'
import { useProfile } from '@/hooks/useProfile'
// import { PANCAKE_SWAP_URL } from '@/config'

import { getAddress } from '@/utils/addressHelpers'
import { addToken2Wallet } from '@/utils/practicalMethod'

import Button from '@/components/common/Button'

const AddTokenButton: FC = () => {
  const { t } = useTranslation()
  const { account } = useProfile()
  const ref = useRef(null)
  const [menuStatus, setMenuStatus] = useState<boolean>(false)

  useClickAway(() => {
    setMenuStatus(false)
  }, ref)

  const tokens: Record<string, any>[] = [
    { ...tokensInfo.USDT, image: '' },
    { ...tokensInfo.CHIP, image: '' }
  ]

  const addToken = (token: Record<string, any>) => {
    void addToken2Wallet(getAddress(token.address), token.symbol, token.decimals, token.image)
    setMenuStatus(false)
  }
  if (!account) return null
  return (
    <div className="web-addtoken-button" ref={ref}>
      <Button size="mini" outline onClick={() => setMenuStatus(!menuStatus)}>
        {t('Nav.Nav.AddToken', 'Add Token')}
      </Button>
      <div className={classNames('web-addtoken-menu', { show: menuStatus })}>
        <ul>
          {tokens.map((token, index) => (
            <li key={`add-${index}`} onClick={() => addToken(token)}>
              {t('Nav.AddToken.Add', 'Add Token', { token: token.symbol })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AddTokenButton
