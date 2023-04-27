import React , {FC} from 'react'
import { headingProps } from "../../Interface/Interface";
import "./style.css";
const Heading: FC<headingProps> = ({ title}) => {
  return (
    <div className='heading-div'>
      <h4 className='heading-text'>{title}</h4>
    </div>
  )
}

export default Heading