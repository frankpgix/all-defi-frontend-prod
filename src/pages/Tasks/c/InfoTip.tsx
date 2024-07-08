import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useToggle } from 'ahooks'

import { useConnectDiscord, useConnectTwitter, useTaskProfile } from '@/hooks/useTasks'

import InfoDialog from '@@/common/Dialog/Info'

const InfoTip: FC = () => {
  const { goConnectTwitter } = useConnectTwitter()
  const { goConnectDiscord } = useConnectDiscord()
  const { isLogin } = useTaskProfile()

  const [show, { setLeft, setRight }] = useToggle(false)
  const navigate = useNavigate()
  const location = useLocation()
  const param = new URLSearchParams(location.search)
  const twitter = param.get('twitter')
  const discordAuth = param.get('discord-auth')
  // const discordJoin = param.get('discord-join')
  const message = param.get('message')
  useEffect(() => {
    console.log(discordAuth)
    if (param.size > 0) {
      setRight()
    }
  }, [])

  const onTwitterConfirm = () => {
    window.open('https://twitter.com/intent/follow?screen_name=Alldefiprotocol')
    navigate('/tasks')
  }
  const onDiscordAuthConfirm = () => {
    window.open('https://discord.gg/BQbzfRkH')
    navigate('/tasks')
  }
  // const onDiscordJoinConfirm = () => {
  //   navigate('/tasks')
  // }

  if (!isLogin) {
    return null
  }

  if (twitter === 'success') {
    return (
      <InfoDialog
        show={show}
        type="succ"
        title="Twitter 授权成功！"
        hideCancelButton
        onClose={setLeft}
        onConfirm={onTwitterConfirm}
      >
        Twitter 授权成功！请关注我们的官方 Twitter 账号，获取最新动态！
      </InfoDialog>
    )
  }

  if (twitter === 'fail') {
    return (
      <InfoDialog
        show={show}
        type="fail"
        title="Twitter 授权失败！"
        hideCancelButton
        onClose={setLeft}
        onConfirm={goConnectTwitter}
      >
        {message ? decodeURIComponent(message) : 'Twitter 授权失败！请尝试重新授权！'}
      </InfoDialog>
    )
  }

  if (discordAuth === 'success') {
    return (
      <InfoDialog
        show={show}
        type="succ"
        title="Discord 授权成功！"
        hideCancelButton
        onClose={setLeft}
        onConfirm={onDiscordAuthConfirm}
      >
        Discord 授权成功！请加入我们的官方 Discord群组，完成任务！
      </InfoDialog>
    )
  }
  if (discordAuth === 'fail') {
    return (
      <InfoDialog
        show={show}
        type="succ"
        title="Discord 授权失败！"
        hideCancelButton
        onClose={setLeft}
        onConfirm={goConnectDiscord}
      >
        {message ? decodeURIComponent(message) : 'Discord 授权失败！请尝试重新授权！'}
      </InfoDialog>
    )
  }
  // if (discordJoin === 'success') {
  //   return (
  //     <InfoDialog
  //       show={show}
  //       type="succ"
  //       title="Discord 加入群组成功！"
  //       hideCancelButton
  //       onClose={setLeft}
  //       onConfirm={onDiscordJoinConfirm}
  //     >
  //       Discord 加入群组成功！
  //     </InfoDialog>
  //   )
  // }
  // if (discordJoin === 'fail') {
  //   return (
  //     <InfoDialog
  //       show={show}
  //       type="fail"
  //       title="Discord 加入群组失败！"
  //       hideCancelButton
  //       onClose={setLeft}
  //       onConfirm={onDiscordAuthConfirm}
  //     >
  //       {message ? message : 'Discord 加入群组失败！请尝试重新加入群组！'}
  //     </InfoDialog>
  //   )
  // }

  return null
}

export default InfoTip
