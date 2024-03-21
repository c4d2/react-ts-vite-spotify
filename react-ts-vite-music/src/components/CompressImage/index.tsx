import { useState, useEffect } from "react";
import Pica from "pica";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Shift from "../../assets/shift.jpg";

const ImageCompressor = ({ imageUrl, targetWidth }) => {
  const [compressedImage, setCompressedImage] = useState(Shift);
  const pica = new Pica();

  useEffect(() => {
    if (imageUrl) {
      compressImage(imageUrl);
    }
  }, [imageUrl]);

  const compressImage = (url) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // 用于跨域图片处理
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const targetHeight = img.height * (targetWidth / img.width);
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      pica
        .resize(img, canvas)
        .then((result) => pica.toBlob(result, "image/jpeg", 0.9))
        .then((blob) => {
          const compressedImageURL = URL.createObjectURL(blob);
          setCompressedImage(compressedImageURL);
        })
        .catch((err) => console.error(err));
    };
  };

  return <div>{<LazyLoadImage src={compressedImage} alt="图片不见了" />}</div>;
};

export default ImageCompressor;
