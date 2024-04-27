import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
  SwiperPaginationWrapper,
  SliderBanner,
  SwiperArrow,
  LinkOne,
  LinkTwo,
  LinkThree,
  SliderContainer,
} from './Slider.styles.tsx';

const Slider = () => {
  return (
    <SliderContainer>
      <SliderBanner>
        <SwiperArrow className="swiper-button-prev">
          <ArrowBackIosNewIcon
            style={{ width: '16px', height: '16px' }}
            color="primary"
          />
        </SwiperArrow>
        <Swiper
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          slidesPerView={1}
          scrollbar={{ el: '.swiper-scrollbar', draggable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          <SwiperSlide>
            <LinkOne to="/phones" />
          </SwiperSlide>
          <SwiperSlide>
            <LinkTwo to="/accessories" />
          </SwiperSlide>
          <SwiperSlide>
            <LinkThree to="/tablets" />
          </SwiperSlide>
        </Swiper>
        <SwiperArrow className="swiper-button-next">
          <ArrowBackIosNewIcon
            color="primary"
            style={{ rotate: '180deg', width: '16px', height: '16px' }}
          />
        </SwiperArrow>
      </SliderBanner>
      <SwiperPaginationWrapper className="swiper-pagination" />
    </SliderContainer>
  );
};

export default Slider;
