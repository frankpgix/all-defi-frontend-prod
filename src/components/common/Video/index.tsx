import React, { FC, MutableRefObject, useRef, useMemo } from 'react'
import { useMount } from 'react-use'
import classnames from 'classnames'
import { VIDEO_RESOURCES_URL } from '@/config'

const Video: FC<any> = ({
  poster,
  src,
  className = '',
  loop = true,
  muted = true,
  autoPlay = true,
  onEnded,
  onLoadStart,
  onPlaying
}) => {
  const videoRef: MutableRefObject<HTMLVideoElement | null> = useRef(null)

  const memoSrc = useMemo(
    () => (/^https?:\/\//.test(src ?? '') || /^data:/.test(src ?? '') ? src : `${VIDEO_RESOURCES_URL}${src}`),
    [src]
  )

  useMount(() => {
    playVideo()
    // videoRef?.current?.play()
    // videoRef.current.controls = false
  })

  const playVideo = () => {
    if (videoRef?.current != null) {
      videoRef.current.controls = false
      videoRef.current?.play()
    }
  }

  return (
    <video
      className={classnames('video-player', className)}
      onClick={playVideo}
      ref={videoRef}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      poster={poster}
      src={memoSrc}
      controlsList="nofullscreen nodownload noremote footbar"
      onEnded={() => onEnded?.()}
      onLoadStart={() => onLoadStart?.()}
      onPlaying={() => onPlaying?.()}
    />
  )
}

export default Video
