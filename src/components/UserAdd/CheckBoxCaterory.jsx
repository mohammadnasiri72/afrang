import { Checkbox, FormControlLabel } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function CheckBoxCaterory({ category, categoryChecked, setCategoryChecked }) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // بررسی اینکه آیا این category در URL موجود است
  useEffect(() => {
    const categoryParams = searchParams.getAll("category");
    const isInUrl = categoryParams.includes(category.id.toString());
    setChecked(isInUrl);
  }, [searchParams, category.id]);

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
              if (
                categoryChecked.length > 0 &&
                categoryChecked.filter((e) => e.id === category.id).length > 0
              ) {
                setCategoryChecked(
                  categoryChecked.filter((e) => e.id !== category.id)
                );
                params.delete("page");
                params.delete("category");
                searchParams.getAll("category").forEach((cat) => {
                  if (cat !== String(category.id)) {
                    params.append("category", cat);
                  }
                });
                router.push(`${window.location.pathname}?${params.toString()}`);
              } else {
                setCategoryChecked([...categoryChecked, category]);
                params.delete("page");
                params.append("category", category.id);
                router.push(`${window.location.pathname}?${params.toString()}`);
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
