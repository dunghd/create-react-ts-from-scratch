import * as Yup from "Yup";

export default Yup.object({
  number: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required")
    .nullable(),
  name: Yup.string()
    .max(30, "Must be 20 characters or less")
    .required("Required"),
  customer: Yup.string()
    .max(30, "Must be 20 characters or less")
    .required("Required"),
});
