import React from "react";
import { Image } from "react-bootstrap";

interface IProps {
  /**
   * Image source as string
   *
   * @type {string}
   * @memberof IProps
   */
  avatar: string;
  /**
   * Optional style for component
   *
   * @type {React.CSSProperties}
   * @memberof IProps
   */
  style?: React.CSSProperties;
  /**
   *
   * CSS class names as string.
   * @type {string}
   * @memberof IProps
   */
  className?: string;
}

/**
 * Rounded image component meant for avatars
 */
const AvatarImg: React.FC<IProps> = ({ avatar, style, className }) => {
  return <Image src={avatar} style={style} className={className} rounded />;
};

export default AvatarImg;
