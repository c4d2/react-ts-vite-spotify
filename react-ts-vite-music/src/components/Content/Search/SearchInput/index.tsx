import { useCallback, useState } from "react";
import { MdSearch } from "react-icons/md";
import _ from "lodash";
import { Popover, message } from "antd";
import Request from "../../../../api/RequestMusic";
import { SearchApiDefinition } from "../../../../domains/search";
import { AxiosRequestConfig } from "axios";
import SearchResult from "../SearchResult";
import "./style.scss";
import { useNavigate } from "react-router-dom";

interface SearchInputProps {
  disabled: boolean;
}

export default function SearchInput({ disabled }: SearchInputProps) {
  const [sele, setSelect] = useState("");
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const handleSetselect = useCallback((value) => {
    setSelect(value);
  }, []);

  const onkeydown = (values) => {
    if (values.keyCode === 13) {
      if (!sele) {
        message.warning("请输入搜索值");
        return;
      }
      navigate(`/search/${sele}`);
    }
  };

  const handleSearch = (event) => {
    handleSetselect(event.target.value);
    throttledSearch(event.target.value);
  };

  // 定义一个节流函数来处理搜索
  const throttledSearch = useCallback(
    _.debounce((query) => {
      const config: AxiosRequestConfig = {
        params: {
          keywords: query,
          limit: 8,
        },
      };
      const res = Request.get(SearchApiDefinition.getSearch.url, config);
      res
        .then((response) => {
          setResult(response.data.result.songs);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 200),
    []
  ); // 1000毫秒内最多触发一次

  // const [open, setOpen] = useState(false);
  return (
    <div className={disabled ? "SearchInput" : "none"}>
      <div className="search">
        <MdSearch className="search-icons" />
        <Popover
          arrow={false}
          overlayStyle={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
          content={
            <SearchResult handleSetselect={handleSetselect} result={result} />
          }
          trigger="click"
          title="猜你想搜"
        >
          <input
            value={sele}
            onChange={handleSearch}
            onKeyDown={onkeydown}
            type="text"
          />
        </Popover>
      </div>
    </div>
  );
}
