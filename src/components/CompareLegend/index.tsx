import { Card, Button, ToggleButtonGroup } from "react-bootstrap";
import { SearchableDiscreteColorLegend } from "react-vis";
import React, { useState } from "react";


const CompareLegend: React.FC<{items: any[], searchText: string}> = ({items}) => {
  const [searchText, searchChangeHandler] = useState("");

  const clickHandler = (item: any) => {
    item.disabled = !item.disabled;
  }

  return (
    <Card style={{padding: "20px", position: "fixed", textAlign: "left"}}>
      <div>Comparison type</div>
      <ToggleButtonGroup 
        type="radio" 
        name="compareType" 
        defaultValue={"Total"} 
        style={{marginBottom: "20px"}}>
        <Button value={"Total"}>Total</Button>
        <Button value={"Total"} variant="outline-primary">Daily</Button>
      </ToggleButtonGroup>
      <div>Users</div>
      <SearchableDiscreteColorLegend items={items}
        onSearchChange={searchChangeHandler}
        searchText={searchText}
        onItemClick={clickHandler}
      />
      <Button>Refresh</Button>
    </Card>
  )
}

export default CompareLegend;