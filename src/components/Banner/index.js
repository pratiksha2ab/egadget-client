import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function Banner() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay
        ssr={true}
        arrows={false}
      >
        <div>
          <img src="./b1.jpg" alt="" />
        </div>
        <div>
          <img src="./b2.jpg" alt="" />
        </div>
        <div>
          <img src="./b3.jpg" alt="" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;