import { ErrorMessage, useField } from "formik";
import React from "react";

type FormikTextInputProps = {
  id: string;
  name: string;
  label: string;
};

const FormikTextInput = ({ label, ...props }: FormikTextInputProps) => {
  const [field] = useField(props);

  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name} className="mb-1">
        {label}
      </label>
      <input
        className="form-control"
        {...field}
        {...props}
        value={field.value || ""}
      />
      <ErrorMessage name={props.name} component="div" className="text-danger" />
    </div>
  );
};

export default FormikTextInput;
