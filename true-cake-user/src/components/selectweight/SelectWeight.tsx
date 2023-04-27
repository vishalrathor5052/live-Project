import React from 'react'
import "./style.css"

const SelectWeight = (onHandleSelectWeightHandler: any) => {
  return (
    <>
      <select className='cart-select' aria-label="Default select example" onChange={onHandleSelectWeightHandler}>
        <option selected><p>500gm</p></option>
        <option value="1">1kg</option>
        <option value="2">2kg</option>
        <option value="3">3kg</option>
      </select>
    </>
  )
}
// {
//   objectCheck?.CakeWeight?.map((elm: any) => {
//     return (
//       <div
//         key={elm?.id}
//         onClick={() => selectWeightHandler(elm)}
//       >
//         {/* <Weight
//         selectWeight={selectWeight}
//         id={elm.id}
//         kilogram={elm?.kilogram}
//       /> */}
//         <div><SelectWeight selectWeight={selectWeight} id={elm?.id} kilogram={elm?.kilogram} /></div>

//       </div>
//     );

//   })
// }
export default SelectWeight;