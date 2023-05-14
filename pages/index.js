import Head from "next/head";
import Image from "next/image";
import { Heebo, Inter } from "next/font/google";
import { motion } from "framer-motion";

import HeaderSection from "@/components/header/HeaderSection";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import PortfolioSection from "@/components/PortfolioSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="lm-animated-bg"
        style={{ backgroundImage: "url(img / main_bg.png)" }}
      ></div>

      <div className="page">
        <div className="page-content">
          <HeaderSection
            activeIndex={activeIndex}
            onSelect={(index) => setActiveIndex(index)}
          />
          <div className="lmpixels-arrows-nav">
            <div className="lmpixels-arrow-right">
              <i className="lnr lnr-chevron-right"></i>
            </div>
            <div className="lmpixels-arrow-left">
              <i className="lnr lnr-chevron-left"></i>
            </div>
          </div>

          <div className="content-area">
            <div className="animated-sections">
              <HomeSection isActive={activeIndex === 0}></HomeSection>
              <AboutSection isActive={activeIndex === 1}></AboutSection>
              <ResumeSection isActive={activeIndex === 2}></ResumeSection>
              <PortfolioSection isActive={activeIndex === 3}></PortfolioSection>
              <BlogSection isActive={activeIndex === 4}></BlogSection>
              <ContactSection isActive={activeIndex === 5}></ContactSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
