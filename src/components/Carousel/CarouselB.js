import React from 'react';
import { Carousel } from 'antd';
import './CarouselB.scss';
import b1 from '../../assets/banniere/banniere-1@2x.png';
import b2 from '../../assets/banniere/banniere-2@2x.png';
import b3 from '../../assets/banniere/banniere-3@2x.png';
import b4 from '../../assets/banniere/banniere-4@2x.png';
import br1 from '../../assets/banniereRes/banniere-responsive-1@2x.png';
import br2 from '../../assets/banniereRes/banniere-responsive-2@2x.png';
import br3 from '../../assets/banniereRes/banniere-responsive-3@2x.png';
import br4 from '../../assets/banniereRes/banniere-responsive-4@2x.png';
import useCurrentWitdh from '../../hooks/useCurrentWidth';

const CarouselB = () => {
  const currentWidth = useCurrentWitdh();
  return (
    <div className="carousel_wrapper">
      <Carousel autoplay autoplaySpeed={5000}>
        <div>
          <img src={currentWidth >= 500 ? b1 : br1} width="100%" alt="b1" />
        </div>
        <div>
          <img src={currentWidth >= 500 ? b2 : br2} width="100%" alt="b2" />
        </div>
        <div>
          <img src={currentWidth >= 500 ? b3 : br3} width="100%" alt="b3" />
        </div>
        <div>
          <img src={currentWidth >= 500 ? b4 : br4} width="100%" alt="b4" />
        </div>
      </Carousel>
    </div>
  );
};
export default CarouselB;
