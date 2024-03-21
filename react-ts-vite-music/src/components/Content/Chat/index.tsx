import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";

import "./style.scss";

export default function Chat() {
  return (
    <div className="Chat">
      <ChatLeft />
      <ChatRight />
    </div>
  );
}
