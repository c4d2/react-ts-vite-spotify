import React from "react";
import { NavLink } from "react-router-dom";
interface SiderLinkProps {
  to: string;
  children: any;
  className?: string;
}

export const SiderLink: React.FC<SiderLinkProps> = (props) => {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? "link sideractive" : "link")}
      {...props}
    />
  );
};
