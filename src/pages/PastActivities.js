import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./PastActivities.css";

    function PastActivities() { 
    const { user, handleLogout } = useUser();


    return (
        <section className="past-activities">
        <header>
        <div className="logo">
          <img src="/assets/logo.png" alt="Pulse Logo"></img>
          <h2>Pulse</h2>
        </div>
        <div className="buttons">
          <h2>Hello, {user}!</h2>
          <Link className="btn past-btn" to="/dashboard"><FaArrowLeftLong /> Back</Link>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

         <div className="past-container">
            <h2>Your Past Activities</h2>
            </div>

        </section>
    );



}

export default PastActivities;