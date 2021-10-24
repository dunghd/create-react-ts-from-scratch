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
  const selectedDate = field.value ? new Date(field.value) : new Date();

  return (
    <div className="form-group">
      <label htmlFor={props.name} className="mb-1">
        {props.label}
      </label>
      <DatePicker
        selected={selectedDate}
        onSelect={(e) => setFieldValue(props.name, e)}
        onChange={(e) => setFieldValue(props.name, e)}
        className="form-control"
      />
    </div>
  );
};

export default FormikDatePicker;
