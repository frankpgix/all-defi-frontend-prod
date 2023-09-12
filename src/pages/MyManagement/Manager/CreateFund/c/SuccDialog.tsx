import React, { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Dialog from '@/components/common/Dialog'
import FundIcon from '@@/common/FundIcon'
import ALink from '@@/common/ALink'
import Button from '@@/common/Button'
import Image from '@@/common/Image'
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  onConfirm: () => void
  show: boolean
  data: Record<string, any>
}

const SuccDialog: FC<Props> = ({ onConfirm, show, data }) => {
  const docUrl = 'https://pythagoras-group.gitbook.io/alldefi-whitepaper/'
  const formUrl = 'https://pythagoras-group.gitbook.io/alldefi-whitepaper/'
  const termsUrl = 'https://pythagoras-group.gitbook.io/alldefi-whitepaper/'
  return (
    <Dialog show={show} width="800px">
      <div className="web-manage-create-dialog">
        <main>
          {/* <header>
            <FundIcon name={data.name} size="large" />
            <h4>{data.name}</h4>
            <p>{data.managerName}</p>
          </header> */}
          <header>
            <FundIcon name="NaNa" size="large" />
            <h4>NaNa</h4>
            <p>FungLeo</p>
          </header>
          <section>
            <h4>Congratulations！</h4>
            <p>
              The fund has been successfully established <br /> You can get more information by
              reading the
              <ALink to={docUrl}> Doc</ALink> to learn more about AllDeFi in detail
            </p>
            <h4>Better promotion</h4>
            <p>
              <ALink to={formUrl}>Click here</ALink> you can upload more historical data, so that
              investors can better understand your past performance
            </p>
          </section>
          <footer>
            <aside>
              <input type="checkbox" />
              <p>
                I have read and understood all <ALink to={termsUrl}>the terms</ALink>
              </p>
            </aside>
            <Button>Enter the fund</Button>
          </footer>
        </main>
        <div className="web-manage-create-dialog-swiper">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div className="web-manage-create-dialog-swiper-item">
                <Image src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg" />
                <h4>About the review</h4>
                <p>
                  All funds will be officially listed on the fund supermarket after being reviewed
                  by AllDeFi Although it may take longer to review, we still strongly recommend that
                  you upload more historical data, which you can do at any time on the Strategy
                  Management page before the fund is listed.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="web-manage-create-dialog-swiper-item">
                <Image src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg" />
                <h4>About MAX AUM Limit</h4>
                <p>
                  Please pay attention to your fund's <strong>AUM</strong>
                  and <strong>MAX AUM</strong> Limit at all times, to ensure maximum returns Please
                  Stake one Epoch in advance to ensure enough ALL, because the ALL supplemented in
                  this round will only increase the available balance for subscription in time, and
                  will not change the distribution of Fee until the next round
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="web-manage-create-dialog-swiper-item">
                <Image src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg" />
                <h4>About the settlement</h4>
                <p>
                  Each epoch has four stages. Please prepare enough cash in the Pre-Settlement
                  Period to complete the redemption requests of users, and click Settle in the
                  Settlement Period to complete the settlement and start the next epoch.
                </p>
                <p className="fall">Violations will result in penalties！</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Dialog>
  )
}

export default SuccDialog
