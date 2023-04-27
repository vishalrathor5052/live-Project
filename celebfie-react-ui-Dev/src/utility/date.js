import { range } from '../utility/global';
import DatePicker from "react-datepicker";
const years = range(1945, getYear(new Date()) - 0, 1);
//const expyears = range(1945, getYear(new Date()) + 25, 1);


    


export function getYear() { return new Date().getFullYear(); }

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  export const formatDate = (date) => {
     
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();

      return date = dd + '-' + mm + '-' + yyyy;

  }


  export const DateSeleter = (props)=>
  {
      
        var Xmas = (props.date) ?  new Date(props.date) : new Date();
        var Y = Xmas.getFullYear();
        var M = Xmas.getMonth();
        let yearsdrops = (props.Year) ?  props.Year : years;
        
      

      return  <DatePicker 
      renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
          }) => (
              <div >
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}> {"<"} </button>
              <select defaultValue={Y} onChange={ (e) => {changeYear(e.target.value)}}> {yearsdrops.map((option) => (<option key={option} value={option}>{option}</option>))}</select>
              <select defaultValue={M} onChange={ (e) => {changeMonth(e.target.value)}}>{months.map((option,index) => ( <option key={option} value={index}>{option}</option> ))}</select>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}> {">"} </button>
              </div>
          )}
selected={Xmas} dateFormat="MM/dd/yyyy"  placeholderText="MM/DD/YYYY" onChange={(date) => props.onChange(date)} validations={[props.required]} />
  }