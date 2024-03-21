import "./style.scss";
import { Image } from "antd";

interface DetailHeadProps {
  image: string;
  name: string;
  updatetime?: string;
  description?: string;
}

export default function DetailHead({
  image,
  name,
  updatetime,
  description,
}: DetailHeadProps) {
  return (
    <div className="DetailHead">
      <div className="img" style={{ background: `url('${image}')` }} />
      <div className="head">
        <div className="head-left">
          <Image src={image} alt={name} />
        </div>
        <div className="head-right">
          <span className="title">{name}</span>
          <p className="updatetime">{updatetime}</p>
          <span className="description">{description}</span>
        </div>
      </div>
    </div>
  );
}
