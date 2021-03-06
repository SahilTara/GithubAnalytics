import { Card, Button, ToggleButtonGroup } from "react-bootstrap";
import { SearchableDiscreteColorLegend } from "react-vis";
import React, { useState, ReactElement } from "react";
import { BlockPicker } from "react-color";
import "./style.css";
import IUserColor from "../../types/IUserColor";

interface IProps {
  /**
   * A list of users and the colour + disable state associated with each.
   *
   * @type {IUserColor[]}
   * @memberof IProps
   */
  state: IUserColor[];

  /**
   * Called whenever mode is changed between total and daily
   * @memberof IProps
   * @callback
   */
  modeCallBack: (isTotal: boolean) => void;

  /**
   * Called whenever an item changes (colour or disable status).
   * @memberof IProps
   * @callback
   */
  itemCallBack: (item: IUserColor) => void;
}

/**
 * Legend component used in the compare page. Has a total and daily button.
 * Has a search bar embedded inside to search for users.
 * Has a colour picker beside each user's name
 */
const CompareLegend: React.FC<IProps> = ({
  state,
  modeCallBack,
  itemCallBack
}) => {
  const [searchText, setSearchText] = useState("");
  const [total, setTotal] = useState(true);

  const clickHandler = (item: any) => {
    const tempItem = state.find(value => value.title === item.key);
    if (tempItem) {
      tempItem.disabled = !tempItem.disabled;
      itemCallBack(tempItem);
    }
  };

  const searchChangeHandler = (text: string) => {
    setSearchText(text);
  };

  const searchFunction = (array: ReactElement[], search: string) => {
    return array.filter((item: ReactElement) => {
      if (
        item.key &&
        item.key
          .toString()
          .toLowerCase()
          .includes(search)
      ) {
        return item;
      }
    });
  };

  /**
   * Component that represents the state of every element inside the legend
   */
  const LegendElement = (value: any) => {
    const [show, showPicker] = useState(false);
    const [chosenColor, chooseColor] = useState(value.value.color);
    const { disabled } = value.value;

    /**
     * Function that toggles the color picker visibility.
     */
    const clickPicker = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      showPicker(!show);
      e.stopPropagation();
    };

    /**
     * callback for a color change.
     */
    const changeColor = (color: any) => {
      chooseColor(color);
      const updatedItem = {
        title: value.value.title,
        color: color.hex,
        disabled: value.value.disabled
      };
      itemCallBack(updatedItem);
    };

    return disabled ? (
      <div style={{ color: "grey" }}>{value.value.title}</div>
    ) : (
      <div>
        {value.value.title}
        <Button
          size="sm"
          onClick={clickPicker}
          style={{
            marginLeft: "10px",
            border: "none",
            height: "16px",
            borderRadius: "10px",
            backgroundColor: chosenColor.hex ? chosenColor.hex : chosenColor
          }}
        />
        <span onClick={e => e.stopPropagation()}>
          {show ? (
            <>
              <div style={{ zIndex: 2, position: "relative" }}>
                <BlockPicker
                  triangle={"hide"}
                  width={"120px"}
                  color={chosenColor.hex ? chosenColor.hex : chosenColor}
                  onChange={color => {
                    changeColor(color);
                  }}
                />
              </div>
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  left: "0px",
                  bottom: "0px",
                  right: "0px",
                  zIndex: 1
                }}
                onClick={() => showPicker(false)}
              />
            </>
          ) : null}
        </span>
      </div>
    );
    // );
  };

  const legendElements = state.map(value => {
    return {
      title: <LegendElement value={value} />,
      color: value.color,
      strokeWidth: 0,
      key: value.title
    };
  });

  const setTotalDailyMode = (b: boolean) => {
    setTotal(b);
    modeCallBack(b);
  };

  return (
    <Card style={{ padding: "20px", position: "fixed", textAlign: "left" }}>
      <div>Comparison type</div>
      <ToggleButtonGroup
        type="radio"
        name="compareType"
        defaultValue={"Total"}
        style={{ marginBottom: "20px" }}
      >
        {total ? (
          <>
            <Button value={"Total"}>Total</Button>
            <Button
              value={"Daily"}
              variant="outline-primary"
              onClick={() => setTotalDailyMode(false)}
            >
              Daily
            </Button>
          </>
        ) : (
          <>
            <Button
              value={"Total"}
              variant="outline-primary"
              onClick={() => setTotalDailyMode(true)}
            >
              Total
            </Button>
            <Button value={"Daily"}>Daily</Button>
          </>
        )}
      </ToggleButtonGroup>
      <div>Users</div>
      <SearchableDiscreteColorLegend
        items={legendElements}
        onSearchChange={searchChangeHandler}
        searchText={searchText}
        onItemClick={clickHandler}
        searchFn={searchFunction}
      />
    </Card>
  );
};

export default CompareLegend;
