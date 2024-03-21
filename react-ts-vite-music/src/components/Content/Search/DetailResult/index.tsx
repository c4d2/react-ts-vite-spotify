import { useEffect, useState } from "react";
import Song from "../../../Song";
import { AxiosRequestConfig } from "axios";
import { SearchApiDefinition } from "../../../../domains/search";
import RequestMusic from "../../../../api/RequestMusic";
import { useParams } from "react-router-dom";
import { ConfigProvider, message } from "antd";
import { BiBone } from "react-icons/bi";

export default function DetailResult() {
  const { keywords } = useParams();
  const [focus, setFocus] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [list, setList] = useState<any>([]);
  // 分页
  const [page, setPage] = useState(-1);

  const handleSetFocus = (id) => {
    setFocus(id);
  };

  useEffect(() => {
    getSearchMusic();
  }, []);

  const getSearchMusic = () => {
    const offset = (page + 1) * 15;
    setPage((num) => num + 1);
    const config: AxiosRequestConfig = {
      params: {
        keywords,
        limit: 15,
        offset,
      },
    };
    const res = RequestMusic.get(SearchApiDefinition.getSearch.url, config);
    res
      .then((value) => {
        if (!value.data.result.songs.length) {
          message.warning("没有数据了");
        } else {
          setList([...list, ...value.data.result.songs]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {list &&
        list.map((item, index) => (
          <div key={index}>
            <Song
              index={index}
              picUrl={item.al.picUrl}
              songid={item.id}
              artistid={item.ar[0].id}
              songname={item.name}
              artistname={item.ar[0].name}
              albumname={item.al.name}
              trash={false}
              dt={item.dt}
              focus={focus}
              handleSetFocus={handleSetFocus}
              fee={item.fee}
            />
          </div>
        ))}
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              /* 这里是你的组件 token */
              itemActiveBg: "#1ED760",
              itemActiveColorDisabled: "white",
              itemInputBg: "red",
            },
          },
        }}
      >
        <div className="history">
          <BiBone
            style={{ height: "1.5rem", width: "1.5rem" }}
            onClick={() => {
              getSearchMusic();
            }}
          />
        </div>
      </ConfigProvider>
    </>
  );
}
