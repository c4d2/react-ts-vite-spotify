import { useLocation } from "react-router-dom";
import WeChatInput from "./WeChatInput";
import WeChatMessage from "./WeChatMessage";
import Welcome from "./Welcome";

export default function ChatRight() {
  const { pathname } = useLocation();
  const path = pathname.split("/");

  return (
    <div className="chatright">
      {path.length === 3 ? (
        <>
          <WeChatMessage />
          <WeChatInput />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
}
