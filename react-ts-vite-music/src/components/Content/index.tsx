import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// lazy只能支持默认暴露
const Home = lazy(() => import("./Home"));
const Playlist = lazy(() => import("./Playlist"));
const Search = lazy(() => import("./Search"));
const PlaylistDetail = lazy(() => import("./PlaylistDetail"));
const SongDetail = lazy(() => import("./SongDetail"));
const ArtistsDetail = lazy(() => import("./ArtistsDetail"));
const MySongList = lazy(() => import("./MySongList"));
const Chat = lazy(() => import("./Chat"));
const ChatRight = lazy(() => import("./Chat/ChatRight"));
const DetailResult = lazy(() => import("./Search/DetailResult"));

import Loading from "../Loading";

import "./style.scss";

export const Content: React.FC = () => {
  return (
    <div className="Content">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />}>
            <Route path=":keywords" element={<DetailResult />}></Route>
          </Route>
          <Route path="/chat" element={<Chat />}>
            <Route path=":id" element={<ChatRight />} />
          </Route>

          <Route path="/home/:cat" element={<Playlist />} />
          <Route path="/playlist/:id" element={<PlaylistDetail />} />
          <Route path="/song/:id" element={<SongDetail />} />
          <Route path="/artists/:id" element={<ArtistsDetail />} />
          <Route path="/mysong" element={<MySongList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};
