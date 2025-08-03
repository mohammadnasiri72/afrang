import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";

function CheckBoxCaterory({ category, categoryChecked, setCategoryChecked }) {
  const [checked, setChecked] = useState(false);

  console.log(categoryChecked);

  return (
    <>
      <FormControlLabel
        sx={{
          margin: 0,
          padding: 0,
        }}
        control={
          <Checkbox
            size="small"
            color="primary"
            checked={checked}
            onChange={() => {
              setChecked((e) => !e);
              if (categoryChecked.length >0 && categoryChecked.filter((e)=> e === category).length>0) {
                setCategoryChecked(
                  categoryChecked.filter((e) => e !== category)
                );
              } else {
                setCategoryChecked([...categoryChecked, category]);
              }
            }}
          />
        }
        label={<span className="select-none text-sm">{category.title}</span>}
      />
    </>
  );
}

export default CheckBoxCaterory;
