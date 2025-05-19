import { mainDomainImg } from "@/utils/mainDomain";
import SelectCategoryFilter from "./SelectCategoryFilter";

function FilterProduct({ BannerProduct }) {

  const getImageUrl = (image) => {
    if (!image) return defaultImage;
    try {
      if (image.startsWith('http')) {
        return image;
      }
      return `${mainDomainImg}/${image.replace(/^(~\/|\.\.\/)/g, '')}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return defaultImage;
    }
  };

  return (
    <div className="lg:w-1/4 w-full lg:min-w-[300px]">
      <div className="lg:block hidden p-3">
        <div className="bg-white rounded-lg p-3">
          <SelectCategoryFilter />
        </div>
        {
          BannerProduct && BannerProduct.length > 0 &&
          BannerProduct.map((item) => (
            <div key={item.id} className="mt-5 rounded-lg">
              <img className="rounded-lg w-full" src={getImageUrl(item.image)} alt="" />
            </div>
          ))
        }
        {/* <div className="mt-5 rounded-lg">
          <img className="rounded-lg w-full" src="/images/gallery/small-banner-1.jpg" alt="" />
        </div>
        <div className="mt-5 rounded-lg">
          <img className="rounded-lg w-full" src="/images/gallery/small-banner-2.jpg" alt="" />
        </div> */}
      </div>
    </div>
  );
}

export default FilterProduct;
