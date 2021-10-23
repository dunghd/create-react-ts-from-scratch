import { ErrorMessage, Form, Formik, useField } from "formik";
import React from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import CommonSpinner from "../../common/components/CommonSpinner";
import FormikDatePicker from "../../common/components/controls/FormikDatePicker";
import FormikTextInput from "../../common/components/controls/FormikTextInput";
import useProjectById from "../../hooks/useProjectById";
import { IProject } from "../../models/IProject";

const MyCheckbox = ({ children, ...props }: any) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div>
      <label className="form-check-label">
        <input className="form-check-input" type="checkbox" {...field} {...props} />
        {children}
      </label>
      <ErrorMessage name={props.name} component="div" className="text-danger" />
    </div>
  );
};

const MySelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      <ErrorMessage name={props.name} component="div" className="text-danger" />
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams<any>();
  const { data = {} as IProject, isLoading } = useProjectById(id);

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
          <Form className="form-group grid">
            <Row className="mb-3">
              <FormikTextInput
                id="number"
                label="Project Number"
                name="number"
              />
            </Row>
            <Row className="mb-3">
              <FormikTextInput
                id="name"
                label="Project Name"
                name="name"
              />
            </Row>
            <Row className="mb-3">
              <FormikTextInput
                id="customer"
                label="Email Address"
                name="customer"
              />
            </Row>
            <Row className="mb-3">
              <FormikDatePicker name="startDate" label="Start Date"/>
            </Row>
            <Row className="mb-3">
              <FormikDatePicker name="endDate" label="End Date"/>
            </Row>
            {
              /* <br />
              <MySelect label="Job Type" name="jobType">
                <option value="">Select a job type</option>
                <option value="designer">Designer</option>
                <option value="development">Developer</option>
                <option value="product">Product Manager</option>
                <option value="other">Other</option>
              </MySelect>
              <br />*/
            }

            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default ProjectDetail;
