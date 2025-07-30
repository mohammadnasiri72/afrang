import React from 'react'

function ListProductSec({ productsSec , setStepPage}) {
    console.log(productsSec);
  return (
   <>
   <div>
     {
        productsSec.length > 0 &&
        productsSec.map((pr)=>(
            <div key={pr.id}>

            </div>
        ))
     }
   </div>
   </>
  )
}

export default ListProductSec
