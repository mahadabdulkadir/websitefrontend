import React from 'react';
import "./ImageSelector.css";

function ImageSelector({ images, onSelect }) {
    return (
      <div className="image-selector">
        {images.map((imageFile, index) => (
          <div key={index} className="image-item" onClick={() => onSelect(imageFile.path)}>
            {/* Pointing to the thumbnailPath instead of the original path */}
            <img src={`http://localhost:5001/${imageFile.thumbnailPath}`} alt={imageFile.filename} />
          </div>
        ))}
      </div>
    );
}

export default ImageSelector;


