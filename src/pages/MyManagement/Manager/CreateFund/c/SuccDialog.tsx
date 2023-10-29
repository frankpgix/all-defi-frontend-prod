import React, { FC, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Dialog from '@/components/common/Dialog'
import FundIcon from '@@/common/FundIcon'
import ALink from '@@/common/ALink'
import Button from '@@/common/Button'
// import Image from '@@/common/Image'
import CheckBox from '@@/common/Form/CheckBox'
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  onConfirm: () => void
  show: boolean
  data: Record<string, any>
}

const SuccDialog: FC<Props> = ({ onConfirm, show, data }) => {
  // const docUrl = 'https://pythagoras-group.gitbook.io/alldefi-whitepaper/'
  const formUrl = 'https://pythagoras-group.gitbook.io/alldefi-whitepaper/'
  const termsUrl = 'https://pythagoras-group.gitbook.io/alldefi-whitepaper/'

  const [isChecked, setIsChecked] = useState(false)
  if (!show) return null
  return (
    <Dialog
      show={show}
      className="web-manage-create-dialog-layout animate__animated animate__zoomIn"
      animation
    >
      <div className="web-manage-create-dialog">
        <main>
          <header>
            <FundIcon name={data.name} size="large" />
            <article>
              <h4>{data.name}</h4>
              <p>{data.managerName}</p>
            </article>
          </header>
          {/* <header>
            <FundIcon name="NaNa" size="large" />
            <article>
              <h4>NaNa</h4>
              <p>FungLeo</p>
            </article>
          </header> */}
          <section>
            <h3>Congratulations!</h3>
            <p>Your fund creation application has been submitted</p>
            <p>
              The platform will start to audit the fund, and the audit result will be notified by
              email and platform message as soon as possible
              {/* <ALink to={docUrl}> Doc</ALink>  */}
            </p>
          </section>
          <section>
            <h4>Better promotion</h4>
            <p>
              <ALink to={formUrl}>Click here</ALink> you can upload more historical data, so that
              investors can better understand your past performance
            </p>
          </section>
          <footer>
            <aside>
              <CheckBox value={isChecked} onChange={(val) => setIsChecked(val)}>
                <p>
                  I have read and understood <ALink to={termsUrl}> all the terms</ALink>
                </p>
              </CheckBox>
            </aside>
            <Button disabled={!isChecked} onClick={onConfirm}>
              Enter the fund
            </Button>
          </footer>
        </main>
        <div className="web-manage-create-dialog-swiper swiper-no-swiping">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="web-manage-create-dialog-swiper-item">
                <h4>About the review</h4>
                <p>
                  All funds will be officially listed on the fund supermarket after being reviewed
                </p>
                <p>
                  Although it may take longer to review, we still strongly recommend that you upload
                  more historical data.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="web-manage-create-dialog-swiper-item">
                <h4>About MAX AUM Limit</h4>
                <p>
                  ALL supplemented in this epoch will only increase the available balance for
                  subscription, and will not change the distribution of Fee until the next epoch.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="web-manage-create-dialog-swiper-item">
                <h4>About the settlement</h4>
                <p>
                  Each epoch has four stages. Please prepare enough cash in the Pre-Settlement
                  Period to complete the redemption requests of users
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Dialog>
  )
}

export default SuccDialog
