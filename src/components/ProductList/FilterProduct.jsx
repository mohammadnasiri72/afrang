import { IoCloseOutline } from "react-icons/io5";
import SelectCategoryFilter from "./SelectCategoryFilter";

function FilterProduct() {
  return (
    <>
      <div className="lg:block hidden w-1/4 p-3">
        <div className=" bg-white rounded-lg p-3">
         
          <SelectCategoryFilter />
        </div>
        <div className="mt-5 rounded-lg">
          <img className="rounded-lg w-full" src="/images/gallery/small-banner-1.jpg" alt="" />
        </div>
        <div className="mt-5 rounded-lg">
          <img className="rounded-lg w-full" src="/images/gallery/small-banner-2.jpg" alt="" />
        </div>
      </div>
    </>
  );
}

export default FilterProduct;
