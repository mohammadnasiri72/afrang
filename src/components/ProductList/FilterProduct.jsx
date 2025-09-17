import { getImageUrl } from "@/utils/mainDomain";
import SelectCategoryFilter from "./SelectCategoryFilter";

function FilterProduct({ BannerProduct, id , resultFilter}) {
  return (
    <div className="lg:w-1/4 w-full lg:min-w-[300px]">
      <div className="lg:block hidden p-3">
        <div className="bg-white rounded-lg p-3">
          <SelectCategoryFilter resultFilter={resultFilter}/>
        </div>

        {BannerProduct &&
          BannerProduct.length > 0 &&
          BannerProduct.map((item) => (
            <div key={item.id}>
              {(item?.productCats.filter((ev) => ev === id).length > 0 ||
                item?.productCats?.length <= 0) && (
                <div className="mt-5 rounded-lg">
                  <img
                    className="rounded-lg w-full"
                    src={getImageUrl(item.image)}
                    alt=""
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FilterProduct;
