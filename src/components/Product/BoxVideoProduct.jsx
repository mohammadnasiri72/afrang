"use client";
import { getListItemByIds } from "@/services/Item/item";
import { useEffect, useState } from "react";

function BoxVideoProduct({ ids }) {
    const [listVideo , setListVideo] = useState([])

    console.log(listVideo);
    
  useEffect(() => {
    if (!ids) return;
    // ids is a string, send as { ids: ids }
    const fetchData = async () => {
      try {
        const response = await getListItemByIds(ids);
        setListVideo(response);
      } catch (error) {
        console.error("Error fetching video items:", error);
      }
    };
    fetchData();
  }, [ids]);

  return <div>{/* ویدئوها اینجا نمایش داده می‌شوند */}</div>;
}

export default BoxVideoProduct;
