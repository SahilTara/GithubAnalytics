import { Card, Button, ToggleButtonGroup, Row, Col } from "react-bootstrap";
import { SearchableDiscreteColorLegend } from "react-vis";
import React, { useState, useReducer, ReactElement, useEffect } from "react";
import { SketchPicker, BlockPicker, TwitterPicker } from "react-color";
import "./style.css";
import { string } from "prop-types";
import IUserColor from "../../types/IUserColor";

interface IProps {
  state: IUserColor[];
  modeCallBack: (isTotal: boolean) => void;
  itemCallBack: (item: IUserColor) => void;
}

const CompareLegend: React.FC<IProps> = ({
  state,
  modeCallBack,
  itemCallBack
}) => {
  const [searchText, setSearchText] = useState("");
  const [total, setTotal] = useState(true);

  const clickHandler = (item: any) => {
    item.disabled = !item.disabled;
    itemCallBack(item);
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

  const LegendElement = (value: any) => {
    const [show, showPicker] = useState(false);
    const [chosenColor, chooseColor] = useState(value.value.color);
    const [disabled, disable] = useState(false);

    const clickPicker = (e: any) => {
      showPicker(!show);
      e.stopPropagation();
    };

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
      <div
        onClick={() => {
          disable(true);
          console.log("greyed out");
          console.log(disabled);
        }}
        style={{ color: "grey" }}
      >
        {value.value.title}
      </div>
    ) : (
      <div
        onClick={() => {
          disable(true);
          console.log("ALIVE");
          console.log(disabled);
        }}
      >
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
  };

  const legendElements = state.map(value => {
    // console.log(value);
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
