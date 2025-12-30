import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className={"container"}>
          <hr />
          <div className="content">
            <div>
              <img src="/logo.png" alt="logo" className="logo-img"/>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li>Web Development</li>
                <li>Mobile Application Development</li>
                <li>Search Engine Optimization</li>
                <li>Custom Software Development</li>
                <li>Microsoft Dynamics</li>
              </ul>
            </div>
            <div>
              <h4>Community</h4>
              <ul>
                <li>Our Product</li>
                <li>Certifications</li>
                <li>Testimonials</li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li>What We Do?</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 – Dataman Computer Systems Pvt Ltd. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
