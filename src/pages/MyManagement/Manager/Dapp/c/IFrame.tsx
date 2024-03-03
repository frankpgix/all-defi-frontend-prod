import type { MutableRefObject, ReactElement } from 'react'

type IFrameProps = {
  appUrl: string
  allowedFeaturesList: string
  title?: string
  iframeRef?: MutableRefObject<HTMLIFrameElement | null>
  onLoad?: () => void
}

// see sandbox mdn docs for more details https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox
const IFRAME_SANDBOX_ALLOWED_FEATURES =
  'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads allow-orientation-lock'

const Iframe = ({
  appUrl,
  allowedFeaturesList,
  iframeRef,
  onLoad,
  title
}: IFrameProps): ReactElement => {
  return (
    <div className="dapp-iframe-layout">
      <iframe
        className="dapp-iframe"
        id={`iframe-${appUrl}`}
        ref={iframeRef}
        src={appUrl}
        title={title}
        onLoad={onLoad}
        sandbox={IFRAME_SANDBOX_ALLOWED_FEATURES}
        allow={allowedFeaturesList}
      />
    </div>
  )
}

export default Iframe
