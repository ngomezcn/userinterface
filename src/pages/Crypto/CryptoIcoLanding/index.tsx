import React,{useState} from "react";

//Import Components
import Navbar from "./Navbar/Navbar"
import Section from "./HeroSection/Section"
import CardsMini from "./HeroSection/cards-mini"
import AboutUs from "./AboutUs/about-us"
import Features from "./Features/features"
import RoadMap from "./RoadMap/road-map"
import OurTeam from "./Team/our-team"
import Blog from "./Blog/blog"
import FAQs from "./Faqs/FAQs"
import Footer from "./Footer/footer"

const CryptoIcoLanding = () => {
  
  //meta title
  document.title="ICO Landing | Skote - React Admin & Dashboard Template";

  const [imglight, setimglight] = useState(true);

  window.onscroll = function () {
    scrollFunction();
};

const scrollFunction = () => {
    const element = document.getElementById("back-to-top");
    if (element) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            element.style.display = "block";
            setimglight(false)
        } else {
            element.style.display = "none";
            setimglight(true)
        }
    }
};

const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

  return (
    <React.Fragment>
      {/* import navbar */}
      <Navbar imglight={imglight}/>

      {/* Hero section */}
      <Section />

      {/* mini cards */}
      <CardsMini />

      {/* aboutus */}
      <AboutUs />

      {/* features */}
      <Features />

      {/* roadmap */}
      <RoadMap />

      {/* our team */}
      <OurTeam />

      {/* blog */}
      <Blog />

      {/* faqs */}
      <FAQs />

      {/* footer */}
      <Footer />
      <button onClick={() => toTop()} className="btn btn-danger btn-icon landing-back-top" id="back-to-top">
          <i className="ri-arrow-up-line"></i>
      </button>
    </React.Fragment>
  )
}

export default CryptoIcoLanding
