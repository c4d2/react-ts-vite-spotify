import "./style.scss";
import { useNavigate } from "react-router-dom";

export default function SearchResult({ result, handleSetselect }) {
  const navigate = useNavigate();

  return (
    <div className="SearchResult">
      {result &&
        result.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                handleSetselect(
                  `${item.name} ${
                    item.artists && item.artists[0] ? item.artists[0].name : ""
                  }`
                );
                navigate(
                  `/search/${item.name} ${
                    item.artists && item.artists[0] ? item.artists[0].name : ""
                  }`
                );
              }}
              className="result-item"
            >
              {item.name}{" "}
              <span>
                {item.artists && item.artists[0] && item.artists[0].name}
              </span>
            </div>
          );
        })}
    </div>
  );
}
