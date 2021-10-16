import { Form, Formik, useField } from "formik";
import React from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import CommonSpinner from "../../common/components/CommonSpinner";
import FormikDatePicker from "../../common/components/controls/FormikDatePicker";
import { GET_ALL_PROJECT_KEY } from "../../common/QueryKeys";
import useProjectById from "../../hooks/useProjectById";
import useProjects from "../../hooks/useProjects";
import { IProject } from "../../models/IProject";

const MyTextInput = ({ label, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }: any) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<any>();

  const queryClient = useQueryClient();
  console.log(queryClient.getQueryData(GET_ALL_PROJECT_KEY));



  const { data = {} as IProject, isLoading } = useProjectById(id);

  console.log(data);

  return (
    <>
      {isLoading ? (
        <CommonSpinner />
      ) : (
        <Formik
          initialValues={data}
          validationSchema={Yup.object({
            number: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            name: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            customer: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            // acceptedTerms: Yup.boolean()
            //   .required("Required")
            //   .oneOf([true], "You must accept the terms and conditions."),
            // jobType: Yup.string()
            //   .oneOf(
            //     ["designer", "development", "product", "other"],
            //     "Invalid Job Type"
            //   )
            //   .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <MyTextInput
              label="Project Number"
              name="number"
              type="text"
              placeholder="123456"
            />
            <br />
            <MyTextInput
              label="Project Name"
              name="name"
              type="text"
              placeholder="MPDM"
            />
            <br />
            <MyTextInput
              label="Email Address"
              name="customer"
              type="text"
              placeholder="ICRC"
            />
            <br />
            <FormikDatePicker />
            {/* <br />
        <MySelect label="Job Type" name="jobType">
          <option value="">Select a job type</option>
          <option value="designer">Designer</option>
          <option value="development">Developer</option>
          <option value="product">Product Manager</option>
          <option value="other">Other</option>
        </MySelect>
        <br />
        <MyCheckbox name="acceptedTerms">
          I accept the terms and conditions
        </MyCheckbox> */}
            <br />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default ProjectDetail;
