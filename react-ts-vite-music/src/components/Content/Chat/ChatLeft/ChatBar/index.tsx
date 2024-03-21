import { IMAGE_URL } from "../../../../../api";
import { ChatSiderLink } from "../ChatSiderLink";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ChatBarProps {
  _id: string;
  roomname: string;
  imagename: string;
  lastmessage: string;
  lastmessagetime: string;
}

export const ChatBar = ({
  _id,
  roomname,
  imagename,
  lastmessage,
  lastmessagetime,
}: ChatBarProps) => {
  return (
    <ChatSiderLink key={_id} to={_id}>
      <div className="main">
        <LazyLoadImage src={IMAGE_URL + imagename} alt="" />
        <div className="center">
          <h4>{roomname}</h4>
          <span>{lastmessage}</span>
        </div>
      </div>
      <div className="right">{lastmessagetime}</div>
    </ChatSiderLink>
  );
};

