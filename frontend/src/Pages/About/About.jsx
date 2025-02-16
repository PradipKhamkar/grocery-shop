import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./About.css";
// import MetaData from "../MetaData";

const About = () => {
  document.title = "About Us";
  return (
    <>
      <Header />

      <div className="about-section-container">
        <h1 className="Heading">
          About <span>Us</span>
        </h1>
        {/* <MetaData title={'About Us'} /> */}
        <div className="about-section-box">
          <div>
            <div>
              <img
                style={{
                  width: "20rem",
                  height: "20rem",
                  margin: "2rem 0",
                  borderRadius: "100%",
                }}
                src="https://media.licdn.com/dms/image/v2/D5603AQGbeRJ8DA3BBA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1676695469014?e=1745452800&v=beta&t=MkkV5cX7nKh3ARf2-Ca9cSTIyKDFT4JlIrLKzBKOr58"
                alt="Founder"
              />
              <h1>Pradip Khamkar</h1>
              <button
                onClick={() =>
                  window.open("https://khamkarpradip.netlify.app/", "_blank")
                }
              >
                Visit Website
              </button>
              <br />
              <p>
                This is a sample wesbite made by @Pradip Khamkar.
                <br />
                Only with the purpose to Learning MERN Stack
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
