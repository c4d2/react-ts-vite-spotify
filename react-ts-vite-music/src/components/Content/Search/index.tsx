import "./style.scss";
import { useParams } from "react-router-dom";
import Commend from "./Commend";
import DetailResult from "./DetailResult";

export default function Search() {
  const { keywords } = useParams();

  return <>{keywords ? <DetailResult /> : <Commend />}</>;
}
