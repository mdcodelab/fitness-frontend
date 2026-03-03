import React, { useEffect, useState } from 'react';
import "./Home.css";
import Navbar from '../components/Navbar';
import { FaArrowsTurnRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Home() {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % 4);
        }, 4000); // schimbă imaginea la fiecare 2 secunde

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
                    <div className="content-nessage">
                        <h1>Welcome to Pulse</h1>
                        <p>
                            Discover the power of fitness with Pulse, your ultimate workout companion.
                            Whether you're a beginner or a seasoned athlete, our app offers personalized
                            workout plans, real-time tracking, and expert guidance to help you achieve
                            your fitness goals. Join our community and start your fitness journey today!
                        </p>

                        <Link to="/login" className="btn start">
                            Get Started <FaArrowsTurnRight />
                        </Link>
                    </div>
                    <div className="animated">
                    <div>Hiking</div>
                    <div>Jump Rope</div>
                    <diiv>swimming</diiv>
                    <div>Yoga</div>
                    <div>Cycling</div>
                    <div>...and Much More!</div>
                    <div>AI Responses</div>
                </div>
                </div>

            </div>
        </section>
    );
}

export default Home;