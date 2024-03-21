import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

interface ChatSiderLink {
  to: string;
  children: any;
  className?: string;
}

export const ChatSiderLink: React.FC<ChatSiderLink> = (props) => {
  return (
    <div className="ChatSiderLink">
      <NavLink
        className={({ isActive }) => (isActive ? "chatlink link" : "link")}
        {...props}
      />
    </div>
  );
};
