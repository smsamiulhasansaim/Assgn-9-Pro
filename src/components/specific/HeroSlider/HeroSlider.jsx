import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HeroSlider.css';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Unleash the Fun!",
      description: "Discover our amazing collection of toys that spark creativity and imagination in children of all ages.",
      buttonText: "Shop Now",
      buttonLink: "#",
      bgImage: "https://cdn.firstcry.com/education/2022/11/06094158/Toy-Names-For-Kids.jpg"
    },
    {
      id: 2,
      title: "Educational Toys",
      description: "Learning through play with our selection of STEM and educational toys that make education fun.",
      buttonText: "Explore Learning Toys",
      buttonLink: "#",
      bgImage: "https://png.pngtree.com/background/20231030/original/pngtree-d-toys-for-kids-development-on-yellow-background-with-clayzilla-picture-image_5794969.jpg"
    },
    {
      id: 3,
      title: "Creative Building Sets",
      description: "From LEGO to magnetic tiles, our building toys help develop problem-solving skills and creativity.",
      buttonText: "View Building Toys",
      buttonLink: "#",
      bgImage: "https://cdn.pixabay.com/photo/2015/10/05/17/09/minion-972908_640.jpg"
    }
  ];

  return (
    <section className="hero-slider">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiper-container"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="slide-background"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.bgImage})` }}
            >
              <div className="gradient-overlay"></div>
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <button className="slide-btn">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;