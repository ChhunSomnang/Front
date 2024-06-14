import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const slides = [
    {
      url: "https://dslv9ilpbe7p1.cloudfront.net/zZH4ynNpuqwP_43TAWlX7g_store_banner_image.jpeg",
    },
    {
      url: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2024/SportsAndOutdoors/Spring-Refresh-24/Sports/DT/6-SeasonalStory/6-DT-Sports-01.jpg",
    },
    {
      url: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2024/SportsAndOutdoors/Spring-Refresh-24/Sports/DT/6-SeasonalStory/6-DT-Sports-02.jpg",
    },
    {
      url: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2024/SportsAndOutdoors/Summer-Refresh-24/Sports/DT/6-Seasonal/6-DT-Seasonal-03.jpg",
    },
    {
      url: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2024/SportsAndOutdoors/Spring-Refresh-24/Sports/DT/6-SeasonalStory/6-DT-Sports-04.jpg",
    },
   
  ];

  return (
    <div className="max-w-screen-lg mx-auto h-[500px] w-3/4 m-auto py-16 relative group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute top-0 left-0 w-full h-full flex items-center rounded-lg justify-center opacity-0 transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${slide.url})`, // Fixed interpolation
            zIndex: currentIndex === index ? 1 : 0,
            opacity: currentIndex === index ? 1 : 0,
          }}>
          <img
            src={slide.url}
            alt={`Slide ${index}`} // Fixed interpolation
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 left-0 text-white z-10 cursor-pointer"
        onClick={prevSlide}>
        <BsChevronCompactLeft size={30} />
      </div>
      <div
        className="absolute top-1/2 transform -translate-y-1/2 right-0 text-white z-10 cursor-pointer"
        onClick={nextSlide}>
        <BsChevronCompactRight size={30} />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full bg-white/50 cursor-pointer ${
              currentIndex === index ? "bg-white" : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
