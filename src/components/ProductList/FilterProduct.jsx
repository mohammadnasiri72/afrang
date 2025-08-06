import BannerImg from "./BannerImg";
import SelectCategoryFilter from "./SelectCategoryFilter";

function FilterProduct({ BannerProduct , id}) {
  return (
    <div className="lg:w-1/4 w-full lg:min-w-[300px]">
      <div className="lg:block hidden p-3">
        <div className="bg-white rounded-lg p-3">
          <SelectCategoryFilter />
        </div>

        {BannerProduct &&
          BannerProduct.length > 0 &&
          BannerProduct.map((item) => <BannerImg key={item.id} item={item} id={id}/>)}
      </div>
    </div>
  );
}

export default FilterProduct;
