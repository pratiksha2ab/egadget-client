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
    <div className="relative z-20">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20 " />
      {/* <div className=" backdrop-blur-sm absolute bottom-2 md:top-32  z-20 rounded-lg">
        <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800 p-2">
          Recently added products
        </p>
      </div> */}
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay
        ssr={true}
        arrows={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        renderArrowsWhenDisabled={false}
      >
        <div>
          <img
            src="/Banner1.png"
            alt="capsule-banner"
          />
        </div>
        {/* <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/odin/image/upload/v1625203631/neppharm_banners/b1_hxpw7s.jpg"
            alt="thermometer-banner"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/odin/image/upload/v1625203684/neppharm_banners/b3_kpmyzk.jpg"
            alt="kit-banner"
          />
        </div> */}
      </Carousel>
    </div>
  );
}

export default Banner;
