import { FC, useMemo, useState } from 'react'

import { CreateVaultStep1DataTypes } from '@/types/createVault'

import Button from '@@/common/Button'
import CheckBox from '@@/common/Form/CheckBox'
import BlueLineSection from '@@/web/BlueLineSection'

interface Props {
  onConfirm: (data: CreateVaultStep1DataTypes) => void
  show: boolean
}

const Step0: FC<Props> = ({ onConfirm, show }) => {
  const [status, setStatus] = useState<boolean[]>([false, false, false, false, false])
  const isDisabled = useMemo(() => status.includes(false), [status])
  const onSetStatus = (index: number) => {
    const newStatus = [...status]
    newStatus[index] = !newStatus[index]
    setStatus(newStatus)
  }

  return (
    <>
      <BlueLineSection
        hide={!show}
        web={false}
        className="c-create-step"
        titleIcon="icon/section-tip.svg"
        title="Before You Start"
      >
        <div className="c-create-step-tip">
          <h3>The first epoch of the vault</h3>
          <main>
            <article>
              <p>
                The length of the first epoch varies for different funds. Please check with AllDeFi
                for details.
              </p>
            </article>
            <CheckBox value={status[0]} onChange={() => onSetStatus(0)} />
          </main>
        </div>
        <div className="c-create-step-tip">
          <h3>About Investor Stake and unstake</h3>
          <main>
            <article>
              <p>
                Note that only Open Period and Semi-open Period can be staked in each round, and
                onlyOpen Period can be unstaken
              </p>
            </article>
            <CheckBox value={status[1]} onChange={() => onSetStatus(1)} />
          </main>
        </div>
        <div className="c-create-step-tip">
          <h3>About settlement and Fee</h3>
          <main>
            <article>
              <p>
                Please adjust your strategy in each Pre-Settlement Period and prepare enough cash
                tocomplete the settlement of this epoch
              </p>
            </article>
            <CheckBox value={status[2]} onChange={() => onSetStatus(2)} />
          </main>
          <main>
            <article>
              <p>Please complete the settlement before the end of the Settlement Period.</p>
            </article>
            <CheckBox value={status[3]} onChange={() => onSetStatus(3)} />
          </main>
          <main>
            <article>
              <p>All Fees will be distributed after the settlement of this epoch is completed.</p>
            </article>
            <CheckBox value={status[4]} onChange={() => onSetStatus(4)} />
          </main>
        </div>
        <footer>
          <Button disabled={isDisabled} onClick={onConfirm}>
            next
          </Button>
        </footer>
      </BlueLineSection>
    </>
  )
}

export default Step0
