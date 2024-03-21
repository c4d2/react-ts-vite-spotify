import { useSelector } from "react-redux/es/hooks/useSelector";
import SongList from "../../SongList";
import { RootState } from "../../../store/store";
import { BiSolidTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { clearsonglist } from "../../../store/features/persist/SonglistSlice";
import DetailHead from "../../DetailHead";
import { Empty } from "antd";
import "./style.scss";

export default function MySongList() {
  const { list } = useSelector((state: RootState) => state.songlist);
  const dispatch = useDispatch();

  const handleClickClear = () => {
    dispatch(clearsonglist());
  };
  return (
    <>
      {list && list.length ? (
        <>
          <div
            style={{
              color: "white",
              backgroundColor: "#0c0c0c",
              zIndex: "1",
              cursor: "pointer",
            }}
          >
            <DetailHead
              image={list[0].picUrl || ""}
              name={list[0].songname || ""}
              description={list[0].albumname || ""}
            />
            <p className="delete-all" onClick={handleClickClear}>
              <BiSolidTrash />
              清除所有歌曲
            </p>

            <SongList list={list} trash={true} />
          </div>
        </>
      ) : (
        <Empty className="empty" description={"快去选首歌加入你的歌单吧"} />
      )}
    </>
  );
}
