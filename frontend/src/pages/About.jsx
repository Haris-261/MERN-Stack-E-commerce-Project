import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Forever is your destination for modern fashion and everyday essentials. We bring together thoughtfully selected products that combine quality, comfort, and style at prices that fit your lifestyle.</p>
          <p>From new-season trends to dependable wardrobe favorites, our collection is designed to make shopping easy and inspiring. Every item is chosen with attention to detail so you can shop confidently and find pieces you will enjoy wearing.</p>
          <b className="text-gray-800 ">Our Mission</b>
          <p>Our mission is to deliver a convenient and trustworthy shopping experience, offering great products, secure checkout, dependable delivery, and helpful support from browsing to arrival.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600 ">We carefully review our products for quality, durability, and comfort so every purchase meets the standards our customers expect.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">Browse, order, and manage your cart with ease. Our straightforward checkout and flexible delivery options make shopping simple.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">Our support team is ready to help with product questions, orders, delivery updates, returns, and anything else you need.</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
