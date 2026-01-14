import CheckboxInsurance from "./CheckboxInsurance";

function SelectedInsurance({
  product,
}) {
  return (
    <>
      <div>
        {product?.insurance?.insuranceWays?.length > 0 &&
          product?.insurance?.insuranceWays.map((e) => (
            <CheckboxInsurance
              key={e.id}
              insurance={e}
             product={product}
             
            />
          ))}
      </div>
    </>
  );
}

export default SelectedInsurance;
