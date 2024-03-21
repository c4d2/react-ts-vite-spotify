import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="LoginHeader">
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        云音乐
      </h1>
    </div>
  );
};
