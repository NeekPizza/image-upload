import React, { Dispatch, SetStateAction } from 'react';
import { Image } from 'types/image';
import './button.css';

interface Button {
  images: Image[] | undefined;
  setImages: Dispatch<SetStateAction<Image[] | undefined>>;
}

const Button = ({ images, setImages }: Button) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;
    const formData = new FormData();
    formData.append('photo', event.target.files[0]);
    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((success) => {
        setImages(
          images
            ? [
                ...images,
                {
                  _id: success.filename,
                  name: success.originalname,
                  path: `http://localhost:4000/uploads/${success.filename}`,
                },
              ]
            : [
                {
                  _id: success.filename,
                  name: success.originalname,
                  path: `http://localhost:4000/uploads/${success.filename}`,
                },
              ]
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <input
        type="file"
        className="file-upload"
        id="file"
        accept="image/*"
        onChange={handleChange}
      />
      <label className="upload-button" htmlFor="file">
        Upload
      </label>
    </>
  );
};

export default Button;
