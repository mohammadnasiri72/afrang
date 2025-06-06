import React from "react";

export const metadata = {
  title: "محصولات",
  description: "محصولات",
};

export default async function layoutProduct({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
