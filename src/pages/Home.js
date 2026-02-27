import React from 'react';
import "./Home.css";
import Navbar from '../components/Navbar';

function Home() {
  return (
    <section className="section home">
      <Navbar />
      <div className="container">
        <div className="carousel">
          <div className="item item-1" style={{ backgroundImage: 'url(/assets/1.png)' }}></div>
          <div className="item item-2" style={{ backgroundImage: 'url(/assets/2.png)' }}></div>
          <div className="item item-3" style={{ backgroundImage: 'url(/assets/3.png)' }}></div>
          <div className="item item-4" style={{ backgroundImage: 'url(/assets/4.png)' }}    ></div>
        </div>

        <div className="content">
          <h1>Welcome to Pulse</h1>
          <p>
            Discover the power of fitness with Pulse, your ultimate workout companion.
            Whether you're a beginner or a seasoned athlete, our app offers personalized
            workout plans, real-time tracking, and expert guidance to help you achieve
            your fitness goals. Join our community and start your fitness journey today!
          </p>
          <button className="btn">Get Started</button>
        </div>
      </div>
    </section>
  );
}

export default Home;