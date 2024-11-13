import { FC, useState } from 'react'

import { useRegister } from '@/hooks/useTasks'

import cache from '@/utils/cache'
import Button from '@@/common/Button'
import Input from '@@/common/Form/Input'
import InfoDialog from '@@/core/Modal'

// import CopyText from '@@/common/CopyText'
// import Popper from '@@/common/Popper'
// import BlueLineSection from '@@/web/BlueLineSection'

const Register: FC = () => {
  const referrer = cache.get('inviteCode')
  const [code, setCode] = useState(referrer ?? '')
  const { isLogin, isRegister, goRegister } = useRegister()
  return (
    <InfoDialog
      show={isLogin && !isRegister}
      title="Bind Invite Code"
      onClose={() => null}
      width={600}
    >
      <div className="p-task-bind">
        <p>你必须绑定邀请码才可以进入系统</p>
        <Input value={code} onChange={setCode} maxLength={6}></Input>
        <footer>
          <Button onClick={() => goRegister(code)}>Bind</Button>
          <Button outline>Bind Default Code</Button>
        </footer>
      </div>
    </InfoDialog>
  )
}

export default Register
