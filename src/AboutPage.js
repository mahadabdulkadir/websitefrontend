import React, { useEffect, useState } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const [images, setImages] = useState([
    '64dd53c2603504f2e8beb922',
    '64de4e80b9f263e7df05a871',
    '64dd53ca603504f2e8beb924',
    '64dd53d2603504f2e8beb926'
  ]);

  const [videoSrc, setVideoSrc] = useState('');
  const [videoId, setVideoId] = useState('64dd3275599b69898a4764f7');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:5001/files/${videoId}`);
        const videoFile = await response.json();
        if (videoFile && videoFile.path) {
          setVideoSrc(`http://localhost:5001/${videoFile.path}`);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [videoId]);  // Refetch when videoId changes

  useEffect(() => {
    const fetchImages = async () => {
      const updatedImages = await Promise.all(images.map(async (id) => {
        try {
          const response = await fetch(`http://localhost:5001/files/${id}`);

          // Check if the content type is JSON before attempting to parse it
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const imageFile = await response.json();
            return imageFile && imageFile.path ? `http://localhost:5001/${imageFile.path}` : id;
          } else {
            throw new Error(`Expected JSON but received ${contentType}`);
          }

        } catch (error) {
          console.error(`Error fetching image with ID ${id}:`, error);
          return id;  // If there's an error, return the original ID so the state doesn't change for this image
        }
      }));

      setImages(updatedImages);
    };

    fetchImages();
}, []);


  const scrollToProjects = () => {
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="container">
      <main>
        <section id="home">
          <div className="video-container">
          <video key={videoSrc} className="home-video" autoPlay muted loop id="myVideo">
    <source src={videoSrc} type="video/mp4" />
    Your browser does not support the video tag.
</video>

          </div>
          <div className="home-content">
            <h1>Split Second Production</h1>
            <p>In the Business of storytelling</p>
            <button className="scroll-button" onClick={scrollToProjects}>Explore</button>
          </div>
        </section>

        <div className="portfolio-container" id="portfolio">
          <h2 className="heading">Latest <span>Projects</span></h2>
          <div className="portfolio-wrapper">
          <div className="portfolio-box">
          <img className="portfolio-image" src={images[0]} alt="Kalsoni Apparel" />
              <div className="portfolio-layer">
                <h4>Kalsoni Apparel</h4>
                <p>Blank template</p>
                <a className="portfolio-link" href="/Kalsoni">
                  <i className="portfolio-icon bx bx-link-external"></i>
                </a>
              </div>
            </div>
            <div className="portfolio-box">
            <img className="portfolio-image" src={images[1]} alt="Landscape photography" />
              <div className="portfolio-layer">
                <h4>Landscape photography</h4>
                <p>Blank template</p>
                <a className="portfolio-link" href="#">
                  <i className="portfolio-icon bx bx-link-external"></i>
                </a>
              </div>
            </div>
            <div className="portfolio-box">
            <img className="portfolio-image" src={images[2]} alt="Real estate" />
              <div className="portfolio-layer">
                <h4>Real estate</h4>
                <p>Blank template</p>
                <a className="portfolio-link" href="#">
                  <i className="portfolio-icon bx bx-link-external"></i>
                </a>
              </div>
            </div>
            <div className="portfolio-box">
            <img className="portfolio-image" src={images[3]} alt="Belongings" />
              <div className="portfolio-layer">
                <h4>Bleongings</h4>
                <p>Come get Whats yours</p>
                <a className="portfolio-link" href="">
                  <i className="portfolio-icon bx bx-link-external"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default AboutPage;

