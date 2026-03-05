import React, { useEffect, useState } from 'react';
import "./Home.css";
import Navbar from '../components/Navbar';
import { FaArrowsTurnRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  // Initialize AOS
  useEffect(() => {
  AOS.init({
    offset: 0,
    once: false,
    duration: 800,
    easing: "ease-in-out",
    startEvent: 'load',   // 👈 important
  });

  setTimeout(() => {
    AOS.refreshHard();
  }, 100);
}, []);

  // Carousel state
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 4);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section home">
      <Navbar />
      <div className="container">
        <div className="carousel">
          <div
            className={`item item-1 ${index === 0 ? "active" : ""}`}
            style={{ backgroundImage: 'url(/assets/1.png)' }}
          ></div>
          <div
            className={`item item-2 ${index === 1 ? "active" : ""}`}
            style={{ backgroundImage: 'url(/assets/2.png)' }}
          ></div>
          <div
            className={`item item-3 ${index === 2 ? "active" : ""}`}
            style={{ backgroundImage: 'url(/assets/3.png)' }}
          ></div>
          <div
            className={`item item-4 ${index === 3 ? "active" : ""}`}
            style={{ backgroundImage: 'url(/assets/4.png)' }}
          ></div>
        </div>

        <div className="content">
          {/* Fix typo: content-message */}
          <div className="content-message">
            <h1 data-aos="fade-down">Welcome to Pulse</h1>
            <p data-aos="fade-down">
              Discover the power of fitness with Pulse, your ultimate workout companion.
              Whether you're a beginner or a seasoned athlete, our app offers personalized
              workout plans, real-time tracking, and expert guidance to help you achieve
              your fitness goals. Join our community and start your fitness journey today!
            </p>

            <Link to="/login" className="btn start">
              Get Started <FaArrowsTurnRight />
            </Link>
          </div>

          <div className="content-animated">
            <div className="a-0">Hiking</div>
            <div className="a-1">Jump Rope</div>
            <div className="a-2">Swimming</div>
            <div className="a-3">Yoga</div>
            <div className="a-4">Cycling</div>
            <div className="a-5">...and Much More!</div>
            <div className="a-6">AI Recommendations</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;