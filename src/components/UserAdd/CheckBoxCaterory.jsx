import { Checkbox, FormControlLabel } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function CheckBoxCaterory({ category, categoryChecked, setCategoryChecked }) {
  const [checked, setChecked] = useState(false);
  const searchParams = useSearchParams();
  


  // بررسی اینکه آیا این category در URL موجود است
  useEffect(() => {
    const categoryParams = searchParams.getAll("category");
    const isInUrl = categoryParams.includes(category.id.toString());
    setChecked(isInUrl);
  }, [searchParams, category.id]);

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
              if (categoryChecked.length > 0 && categoryChecked.filter((e) => e.id === category.id).length > 0) {
                setCategoryChecked(
                  categoryChecked.filter((e) => e.id !== category.id)
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
