import React, { useState, useRef } from 'react';
import '../../css/ui/ImageUploader.css';

const ImageUploader = ({ onChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      if (onChange) {
        onChange(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please drop an image file');
        return;
      }
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        if (onChange) {
          onChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="image-uploader"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {previewUrl ? (
        <div className="image-preview">
          <img src={previewUrl} alt="Preview" />
        </div>
      ) : (
        <div className="upload-placeholder">
          <div className="upload-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="#BBBBBB"/>
            </svg>
          </div>
          <p>Hier klicken um Bild hochzuladen</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;