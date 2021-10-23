import { useField, useFormikContext } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type FormikDatePickerProps = {
  name: string;
  label: string;
};

const FormikDatePicker = (props: FormikDatePickerProps) => {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();

  console.log(`date 1: `, field.value);
  console.log(`date 2: `, new Date(field.value));  

  return <div className="form-group">
    <label htmlFor={props.name} className="mb-1">{props.label}</label>
    <DatePicker 
      selected={new Date(field.value)}
      onSelect={(e) => setFieldValue(props.name, e)}
      onChange={(e) => setFieldValue(props.name, e)}
      className="form-control"
    />
  </div>;
};

export default FormikDatePicker;
