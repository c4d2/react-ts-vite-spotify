import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import "./style.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CardItemProps {
  playlistid?: string;
  url?: string;
  name: string;
  description?: string;
}

export default function CardItem({
  playlistid,
  url,
  name,
  description,
}: CardItemProps) {
  const navigate = useNavigate();

  return (
    <div className="CardItem">
      <Card
        onClick={() => {
          navigate(`/playlist/${playlistid}`);
        }}
        key={playlistid}
        className="card"
      >
        <div className="card-content">
          <LazyLoadImage src={url} />
          <p>{name}</p>
          <span>{description}</span>
        </div>
      </Card>
    </div>
  );
}
