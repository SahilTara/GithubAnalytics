import React from "react";
import { Image } from "react-bootstrap";

interface IProps {
  avatar: string;
  style?: React.CSSProperties;
  className?: string;
}
const AvatarImg: React.FC<IProps> = props => {
  const { avatar, style, className } = props;

  return <Image src={avatar} style={style} className={className} rounded />;
};

export default AvatarImg;
