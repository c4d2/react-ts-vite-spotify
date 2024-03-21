import { ChatBar } from "./ChatBar";
import { useGetChatRoom } from "../../../../api/useChatRoom";

export default function ChatLeft() {
  const { data, isLoading } = useGetChatRoom();

  return (
    <div className="chatleft">
      {!isLoading && data && data.data
        ? data.data.map((item) => {
            return (
              <ChatBar
                key={item._id}
                _id={item._id}
                lastmessage={item.lastmessage}
                lastmessagetime={item.lastmessagetime}
                roomname={item.roomname}
                imagename={item.imagename}
              />
            );
          })
        : null}
    </div>
  );
}
