import React from 'react';
import Hero from '../../components/common/Hero/Hero';
import Testimonials from '../../components/common/Testimonials/Testimonials';
import Newsletter from '../../components/common/Newsletter/Newsletter';
import HeroSlider from '../../components/specific/HeroSlider/HeroSlider';
import PopularToys from '../PopularToys/PopularToys';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <Hero></Hero>
            <PopularToys></PopularToys>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;