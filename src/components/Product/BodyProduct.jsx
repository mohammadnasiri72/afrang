"use client";

import { Segmented } from "antd";
import { useState } from "react";
import ProductMain from "../home/ProductMain";
import AccessoriesProduct from "./AccessoriesProduct";
import CommentProduct from "./CommentProduct";
import CriticismProduct from "./CriticismProduct";
import DetailsProduct from "./DetailsProduct";
import SpecificationsProduct from "./SpecificationsProduct";
import BundleProducts from "./BundleProducts";
import ProductTabs from './ProductTabs';

function BodyProduct({ product, comments, totalCount }) {
  return <ProductTabs product={product} comments={comments} totalCount={totalCount} />;
}

export default BodyProduct;
