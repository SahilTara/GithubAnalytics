import React, { useState } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

interface IProps {
  /**
   * Selectable options inside the dropdown
   *
   * @type {string[]}
   * @memberof IProps
   */
  options: string[];

  /**
   * Title of the dropdown
   *
   * @type {string}
   * @memberof IProps
   */
  title: string;

  /**
   * CSS classname(s)
   *
   * @type {string}
   * @memberof IProps
   */
  className: string;

  /**
   * The id of the component
   *
   * @type {string}
   * @memberof IProps
   */
  id: string;

  /**
   * Hook that is called whenever an item is selected.
   *
   * @memberof IProps
   * @callback
   */
  onChangeHook: (key: string) => void;
}

/** Dropdown component */
const SelectableItems: React.FC<IProps> = ({
  options,
  title,
  id,
  className,
  onChangeHook
}) => {
  const handleChange = (key: string) => {
    onChangeHook(key);
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
