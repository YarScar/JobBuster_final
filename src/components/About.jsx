import React from "react";

function About() {
  return (
    <div className="about-page">
  <section className="hero">
    <h1>About JobBuster</h1>
    <p>
      Helping you find verified jobs you can trust — free from scams and shady postings.
    </p>
  </section>

  <div className="info-card">
    <h2>Our Mission</h2>
    <p>
      JobBuster was created to make job hunting safe and stress-free.
      Every posting you see is checked for authenticity.
    </p>
  </div>

  <div className="info-card">
    <h2>Why It Matters</h2>
    <p>
      Too many people waste time applying for jobs that don’t exist or aren’t safe.
      We believe job seekers deserve transparency and trust in their search.
    </p>
  </div>

  <div className="info-card">
    <h2>Our Vision</h2>
    <p>
      A world where everyone can apply for jobs online without fear of being misled.
    </p>
  </div>
</div>
  );
}

export default About;