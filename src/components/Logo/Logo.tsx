import React from "react";
import "./Logo.scss";
import LogoSrc from "../../Logo.svg";

export default function Logo() {
  return (
    <a className="logo" href={`${process.env.PUBLIC_URL}/`}>
      <img src={LogoSrc} alt="logo" />
    </a>
  );
}
