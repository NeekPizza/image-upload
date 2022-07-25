import { Image } from 'types/image';
import './image.css';
interface ImageComponent {
  images: Image[] | undefined;
}

const ImageComponent = ({ images }: ImageComponent) => (
  <div className="image-container">
    <p className="image-length">{images?.length || 0} images</p>
    <div className="images-container">
      {images &&
        images.map((image) => (
          <img className="image" key={image._id} src={`${image.path}`} />
        ))}
    </div>
  </div>
);

export default ImageComponent;
