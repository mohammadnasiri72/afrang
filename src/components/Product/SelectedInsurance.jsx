import { Checkbox } from "antd";
import CheckboxInsurance from "./CheckboxInsurance";




function SelectedInsurance({ product }) {

  return (
    <>
      <div>
        <h3 className="font-semibold text-lg">بیمه</h3>
        <div>
            {
                product?.insurance?.insuranceWays?.length >0 &&
                product?.insurance?.insuranceWays.map((e)=>(
                    <CheckboxInsurance key={e.id} insurance={e} product={product}/>

                ))
            }
        </div>
      </div>
    </>
  );
}

export default SelectedInsurance;
