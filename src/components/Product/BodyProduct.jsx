import { FaClipboardList } from "react-icons/fa";
import ProductTabs from "./ProductTabs";

function BodyProduct({ product }) {
  function groupByCategory(properties) {
    // فقط آیتم‌هایی که isTechnicalProperty=true دارند
    const filtered = properties.filter((prop) => prop.isTechnicalProperty);
    const groups = {};
    filtered.forEach((prop) => {
      if (!groups[prop.propertyCategoryId]) {
        groups[prop.propertyCategoryId] = {
          title: prop.propertyCategoryTitle,
          propertyCategoryId: prop.propertyCategoryId,
          propertyCategoryPriority: prop.propertyCategoryPriority ?? 0,
          items: [],
        };
      }
      groups[prop.propertyCategoryId].items.push(prop);
    });
    // مرتب‌سازی آیتم‌های هر گروه بر اساس priority (نزولی)
    Object.values(groups).forEach((group) => {
      group.items.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    });
    // مرتب‌سازی گروه‌ها بر اساس propertyCategoryPriority (نزولی)، سپس propertyCategoryId (نزولی)
    return Object.values(groups).sort((a, b) => {
      if (
        (b.propertyCategoryPriority ?? 0) !== (a.propertyCategoryPriority ?? 0)
      ) {
        return (
          (b.propertyCategoryPriority ?? 0) - (a.propertyCategoryPriority ?? 0)
        );
      }
      return (b.propertyCategoryId ?? 0) - (a.propertyCategoryId ?? 0);
    });
  }
  const grouped = groupByCategory(product.properties);

  return (
    <>
      <div className="">
        <div className="py-9 px-7">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product.product.body }}
          />
        </div>
        <div className="mt-5 w-full px-5">
          {grouped.map((group, idx) => (
            <div
              key={idx}
              className="mb-7 bg-white rounded-lg shadow border border-gray-100"
            >
              <div className="bg-[#f3f3f3] rounded-t-lg px-6 py-3 border-b border-gray-100 flex items-center">
                <FaClipboardList className="text-[#d1182b] mr-2 text-lg" />
                <span className="font-bold text-gray-800 text-base">
                  {group.title}
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {group.items.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center py-3 px-6 hover:bg-gray-50 transition"
                  >
                    <div className="w-1/2 text-gray-700 text-sm">
                      {property.title}
                    </div>
                    <div className="w-1/2 font-semibold text-gray-900 text-sm text-left">
                      {property.propertyValue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>


      </div>

      <ProductTabs product={product} />
    </>
  );
}

export default BodyProduct;
