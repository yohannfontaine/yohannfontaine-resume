import Head from "next/head";
import Image from "next/image";
import { Heebo, Inter } from "next/font/google";
import { motion } from "framer-motion";

import HeaderSection from "@/components/header/HeaderSection";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import { useState } from "react";

import dynamic from "next/dynamic";

const DynamicPortfolioSection = dynamic(
  () => import("../components/PortfolioSection"),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Head>
        <title>Yohann Fontaine | Lead Software Engineer</title>
        <meta
          name="description"
          content="Yohann Fontaine Resume - Lead Software Engineer"
        />
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
              <i
                onClick={() =>
                  setActiveIndex(activeIndex + 1 > 5 ? 0 : activeIndex + 1)
                }
                className="lnr lnr-chevron-right"
              ></i>
            </div>
            <div className="lmpixels-arrow-left">
              <i
                onClick={() =>
                  setActiveIndex(activeIndex - 1 < 0 ? 5 : activeIndex - 1)
                }
                className="lnr lnr-chevron-left"
              ></i>
            </div>
          </div>

          <div className="content-area">
            <div className="animated-sections">
              <HomeSection isActive={activeIndex === 0}></HomeSection>
              <AboutSection isActive={activeIndex === 1}></AboutSection>
              <ResumeSection isActive={activeIndex === 2}></ResumeSection>
              <DynamicPortfolioSection
                isActive={activeIndex === 3}
              ></DynamicPortfolioSection>
              <BlogSection isActive={activeIndex === 4}></BlogSection>
              <ContactSection isActive={activeIndex === 5}></ContactSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
