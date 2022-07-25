import './App.css';
import Input from 'components/input';
import Button from 'components/button';
import ImageComponent from 'components/image';
import { useEffect, useState } from 'react';
import { Image } from 'types/image';
function App() {
  const [images, setImages] = useState<Image[]>();
  const [searchStr, setSearchStr] = useState<string>();

  useEffect(() => {
    fetch('http://localhost:4000/images')
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="App">
      <div className="content-container">
        <div className="row">
          <Input setSearchStr={setSearchStr} />
          <Button images={images} setImages={setImages} />
        </div>
        <ImageComponent
          images={
            searchStr
              ? images?.filter((image) =>
                  image.name
                    .toLocaleLowerCase()
                    .includes(searchStr.toLocaleLowerCase())
                )
              : images
          }
        />
      </div>
    </div>
  );
}

export default App;
