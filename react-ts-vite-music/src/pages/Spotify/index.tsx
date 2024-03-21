import React from "react";
import { Sider } from "../../components/Sider";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Content } from "../../components/Content";
import "./style.scss";

export const Spotify: React.FC = () => {
  return (
    <div className="Spotify">
      <div className="spotify-body">
        <div className="spotify-sider">
          <Sider />
        </div>
        <div className="spotify-content">
          <div className="spotify-content-header">
            <Header />
          </div>
          <div className="content">
            <Content />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};
