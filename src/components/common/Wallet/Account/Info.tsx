import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import QuestionPopover from '@/components/common/QuestionPopover'

import BalanceShow from '../BalanceShow'
import { BASE_TOKEN_SYMBOL } from '@/config/tokens'

interface Props {
  size?: string
}

const AccountInfo: FC<Props> = ({ size = 'default' }) => {
  const { t } = useTranslation()

  return (
    <>
      <dl>
        <dt>
          {t('Nav.Account.MarginBalance', 'Margin Balance')}{' '}
          <QuestionPopover size={size} text={t('Nav.Account.MarginBalanceTip', 'Margin Balance')} />
        </dt>
        <dd></dd>
      </dl>
      <dl>
        <dt>
          {t('Nav.Account.AvaliableMarginBalance', 'Available Margin Balance')}{' '}
          <QuestionPopover
            size={size}
            text={t('Nav.Account.AvaliableMarginBalanceTip', 'Available Margin Balance')}
          />
        </dt>
        <dd></dd>
      </dl>
    </>
  )
}

AccountInfo.defaultProps = {}

export default AccountInfo
