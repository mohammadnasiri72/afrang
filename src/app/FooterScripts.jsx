"use client";
export default function FooterScripts({ propertyValue }) {
  return <div dangerouslySetInnerHTML={{ __html: propertyValue }} />;
}
