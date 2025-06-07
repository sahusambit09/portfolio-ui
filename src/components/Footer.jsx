// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Sambit Kumar Sahoo. All rights reserved.</p>
      <div>
        <a href="https://github.com/sahusambit09" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/sambit-kumar-sahoo-24b843195/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://leetcode.com/u/sahusambit09/" target="_blank" rel="noreferrer" aria-label="LeetCode"><SiLeetcode /></a>
          <a href="https://www.instagram.com/sambit_sahoo007/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>

      </div>
    </footer>
  );
}
export default Footer;
