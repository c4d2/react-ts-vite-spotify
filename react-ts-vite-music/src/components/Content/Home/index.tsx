/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy } from "react";
import { usePlaylisthot } from "../../../api/usePlayList";
const CardList = lazy(() => import("./CardList"));
import "./style.scss";
import Loading from "../../Loading";

export default function Home() {
  const { data, isLoading } = usePlaylisthot();

  return (
    <div className="Home">
      {isLoading ? (
        <Loading />
      ) : (
        data?.data.tags.map((item) => {
          return (
            <div key={item.createTime} className="lazy-img">
              <CardList cat={item.name} />
            </div>
          );
        })
      )}
    </div>
  );
}
