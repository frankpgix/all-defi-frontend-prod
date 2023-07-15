// import React, { FC, useState, useMemo } from 'react'
// import { useParams } from 'react-router-dom'
//
// import Fund from '@/class/Fund'
// import { ShareCompositionProps } from '@/class/tool'
// import { sleep } from '@/utils/tools'
// import { useProfile } from '@/hooks/useProfile'
//
// import { Input } from '@@/common/Form'
// import Button from '@@/common/Button'
// import StatusFail from '@@/common/Status/Fail'
// import StatusSuccess from '@@/common/Status/Success'
// import StatusWait from '@@/common/Status/Wait'
// import InfoDialog from '@@/common/Dialog/Info'
//
// interface Props {
//   getData: () => void
//   share: ShareCompositionProps
// }
//
// const DrawShares: FC<Props> = ({ getData, share }) => {
//   const { drawShareToken } = Fund
//   const { signer } = useProfile()
//   const { fundAddress } = useParams()
//   const [status, setStatus] = useState<string>('')
//   const [infoStatus, setInfoStatus] = useState<boolean>(false)
//
//   const closeDialog = () => setStatus('')
//   const value = useMemo(() => share.reserve, [share])
//   const onClaimShares = async () => {
//     if (signer && fundAddress) {
//       setStatus('wait')
//       const status = await drawShareToken(fundAddress, signer)
//       await sleep(3000)
//       await getData()
//       setStatus(status ? 'success' : 'fail')
//     }
//   }
//   return (
//     <>
//       <section className="web-fund-detail-bench">
//         <h4>Claim Shares</h4>
//         <div className="web-fund-detail-bench-input">
//           <Input value={value} readonly onChange={() => null} type="number" suffix="Shares" right />
//         </div>
//         <div className="web-fund-detail-bench-action">
//           <Button onClick={() => setInfoStatus(true)} disabled={value <= 0}>
//             Claim
//           </Button>
//         </div>
//       </section>
//       <InfoDialog
//         show={infoStatus}
//         onConfirm={onClaimShares}
//         onClose={() => setInfoStatus(false)}
//         title="Claim Shares"
//         type="wait"
//         msg={`你将 Claim ${value} Shares 到你的钱包, 质押Shares可以获得All奖励`}
//       />
//       <StatusFail show={status === 'fail'} onClose={closeDialog} />
//       <StatusSuccess show={status === 'success'} onClose={closeDialog} />
//       <StatusWait show={status === 'wait'} />
//     </>
//   )
// }
//
// export default DrawShares
export default null
