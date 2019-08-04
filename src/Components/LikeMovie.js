import React from "react";
import saveIcon from "../images/save.png";

export default function LikeMovie(props) {
  return (
    <img src={saveIcon} alt="save" onClick={() => props.likeMovie("add")} />
  );
}
