import React from "react";

export const metadata = {
  title: "ورود",
  description: "ورود",
};
export default async function layoutLogin({ children }) {
  return <div>
    <h1>ورود</h1>
    {children}
    <footer>
      <p>تمامی حقوق محفوظ است.</p>
    </footer>
  </div>;
}
