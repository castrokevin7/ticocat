import React, { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event: any) => {
    const newImages = [...images];
    newImages.push(event.target.files[0]);
    setImages(newImages);
  }

  const handleRemoveImage = (index: any) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(image)} alt={image.name} />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
