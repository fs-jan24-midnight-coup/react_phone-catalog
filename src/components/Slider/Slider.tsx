import Container from '../Container/Container';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import slideOne from '../../../public/img/Group 70.png';
import slideTwo from '../../../public/img/Group 70.png';
import slideThree from '../../../public/img/Group 70.png';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import {
  SwiperPaginationWrapper,
  Card,
  SliderArrowIcon,
  SliderBanner,
  SwiperArrow,
  OrderButton,
  SliderImage,
  SliderArrowIconRight,
} from './Slider.styles.tsx';

const Slider = () => {
  const swiperContent = [slideTwo, slideThree];
  return (
    <Container>
      <SliderBanner>
        <SwiperArrow className="swiper-button-prev">
          <SliderArrowIconRight src="img/chevron-right.svg" />
        </SwiperArrow>
        <Swiper
          cssMode={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Card>
              {/*<TestSlide backgroundTablet={slideOne} backgroundMobile={slideOne}>*/}
              <SliderImage src={slideOne} alt="" />
              <OrderButton>Order now</OrderButton>
              {/*</TestSlide>*/}
            </Card>
          </SwiperSlide>
          {swiperContent.map(content => (
            <SwiperSlide key={content}>
              <Card>
                {/*<TestSlide backgroundTablet={content.backgroundTablet}  backgroundMobile={content.backgroundTablet}/>*/}
                <SliderImage src={content} alt="" />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperArrow className="swiper-button-next">
          <SliderArrowIcon src="img/chevron-right.svg" />
        </SwiperArrow>
      </SliderBanner>
      <SwiperPaginationWrapper className="swiper-pagination" />
    </Container>
  );
};

export default Slider;
