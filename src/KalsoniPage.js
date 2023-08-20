import React, { useEffect, useState } from 'react';
import ImageSelector from './ImageSelector';
import './Kalsoni.css';
import './AboutPage.css';

function KalsoniPage() {
  const [media, setMedia] = useState({
    videoIds: [
      '64dd2ecb599b69898a4764ec',
      '64dd30ce599b69898a4764f2'
    ],
    imageIds: [
      '64dd53b5603504f2e8beb91e',
      '64dd53bc603504f2e8beb920'
    ],
    videos: [],
    images: [],
  });

  const [allImages, setAllImages] = useState([]);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const updatedMedia = {
        videos: [],
        images: [],
      };

      for (const videoId of media.videoIds) {
        try {
          const response = await fetch(`http://localhost:5001/files/${videoId}`);
          const videoFile = await response.json();
          updatedMedia.videos.push(videoFile && videoFile.path ? `http://localhost:5001/${videoFile.path}` : null);
        } catch (error) {
          console.error(`Error fetching video with ID ${videoId}:`, error);
        }
      }

      for (const imageId of media.imageIds) {
        try {
          const response = await fetch(`http://localhost:5001/files/${imageId}`);
          const imageFile = await response.json();
          updatedMedia.images.push(imageFile && imageFile.path ? `http://localhost:5001/${imageFile.path}` : null);
        } catch (error) {
          console.error(`Error fetching image with ID ${imageId}:`, error);
        }
      }

      setMedia(prevMedia => ({
        ...prevMedia,
        videos: updatedMedia.videos,
        images: updatedMedia.images,
      }));

     // Fetch all images from the thumbnail folder
     try {
      const response = await fetch(`http://localhost:5001/files/images`);
      const imageFiles = await response.json();
      setAllImages(imageFiles.map(img => `http://localhost:5001/uploads/images/${img.filename}`)); // Update paths to point to the thumbnail folder
    } catch (error) {
      console.error(`Error fetching all images:`, error);
    }
  };

    fetchMedia();
  }, [media.imageIds, media.videoIds]);

  const handleImageChange = (newImagePath) => {
    const newImages = [...media.images];
    newImages[selectedImageIndex] = newImagePath;

    setMedia(prevMedia => ({
      ...prevMedia,
      images: newImages,
    }));

    // Close the image selector after updating the image
    setShowImageSelector(false);
  };

  return (
    <main>
      <div className="heading">
        <h2>Kalsoni</h2>
      </div>

      <section id="projects">
        <div className="project-grid">
          {/* ... Same for videos ... */}

          <div className="project">
            <div className="image-wrapper">
              <img 
                src={media.images[0]} 
                alt="Project 3"
              />
              <button 
                className="edit-button"
                onClick={() => {
                  setSelectedImageIndex(0);
                  setShowImageSelector(true);
                }}
              >
                Edit
              </button>
            </div>
            <div className="project-info">
              <h2>Project 3</h2>
              <p>Description of Project 3.</p>
            </div>
          </div>

          <div className="project">
            <div className="image-wrapper">
              <img 
                src={media.images[1]} 
                alt="Project 4"
              />
              <button 
                className="edit-button"
                onClick={() => {
                  setSelectedImageIndex(1);
                  setShowImageSelector(true);
                }}
              >
                Edit
              </button>
            </div>
            <div className="project-info">
              <h2>Project 4</h2>
              <p>Description of Project 4.</p>
            </div>
          </div>
        </div>
      </section>

      {showImageSelector && (
        <ImageSelector images={allImages} onSelect={handleImageChange} />
      )}
    </main>
  );
}

export default KalsoniPage;




