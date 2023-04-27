import React, { FC, memo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./style.css";
interface ButtonComponentProps {
  label?: string;
  customStyles?: React.CSSProperties | undefined;
  menuItem?: any;
  getValue?: any;
  fieldName?: string;
  productId?: any;
  editData?: any;
  marginTop?: any;
  customWidth?: any;
  selectedValue?: any;
  isParent?: boolean;
  onHandleChange?: (e: React.FormEvent<HTMLInputElement>) => void | undefined;
}
const DropdownComponent: FC<ButtonComponentProps> = ({
  label,
  customStyles,
  menuItem,
  getValue,
  onHandleChange,
  productId,
  fieldName,
  editData,
  marginTop,
  customWidth,
  selectedValue,
  isParent,
}) => {
  const [value, setValue] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    isParent ? setValue("") : setValue(event?.target?.value);
    getValue(event.target.value);
  };
  return (
    <FormControl
      sx={{
        m: customWidth ? 0 : 0,
        minWidth: 120,
        width: customWidth ?? "auto",
        borderStyle: "none",
        border: "none",
      }}
    >
      <FormHelperText
        sx={{
          fontSize: "16px",
          color: "#111011",
          fontWeight: 400,
          margin: "2px 0px 11px",
          fontFamily: "Source Sans Pro,Regular",
        }}
      >
        {label}
      </FormHelperText>
      <Select
        sx={{
          border: "1px solid #f8d40c",
          mt: marginTop ?? 2,
          minWidth: 120,
          boxShadow: "none",
          height: "40px",
          outline: "none",
        }}
        className="Dropdown"
        value={selectedValue ?? value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">{editData ? editData : "Select Option"}</MenuItem>
        {menuItem?.map((item: any) => (
          <MenuItem value={item.id}>{fieldName && item[fieldName]}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default memo(DropdownComponent);

{
  /* <FormControl sx={{ m: 1, minWidth: 120 }}>
<FormHelperText>{label}</FormHelperText>
<Select 
placeholder="khhjghvghf"
// style={{color:"red"}}
//for default value set in
// defaultValue={value}
// label={"khhjghvghf"}
value={value}
  // id={productId}
  onChange={handleChange}
  displayEmpty
  inputProps={{ 'aria-label': 'Without label' }}
//  displayEmpty
//   inputProps={{ "aria-label": "Without label" }}
>
  {menuItem?.map((item: any) => (
   
    <MenuItem value={fieldName ? item.id : item}>
      {fieldName ? item[fieldName] : item}
    </MenuItem>
  ))}
</Select>
</FormControl> */
}
