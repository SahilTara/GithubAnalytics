import React, { useState } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

interface IProps {
  options: string[];
  placeholder: string;
  className: string;
  id: string;
  onChangeHook: (key: string) => void;
}

const SelectableItems: React.FC<IProps> = (props: IProps) => {
  const { options, placeholder, id, className, onChangeHook } = props;
  const [title, setTitle] = useState(placeholder);

  const handleChange = (key: string) => {
    onChangeHook(key);
    setTitle(key);
  };

  return (
    <DropdownButton id={id} title={title} className={className}>
      {options.map((item: string) => {
        return (
          <DropdownItem key={item} eventKey={item} onSelect={handleChange}>
            {item}
          </DropdownItem>
        );
      })}
    </DropdownButton>
  );
};

export default SelectableItems;
