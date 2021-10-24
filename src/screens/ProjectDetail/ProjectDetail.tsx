import { ErrorMessage, Form, Formik, useField } from "formik";
import React from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import CommonSpinner from "../../common/components/CommonSpinner";
import FormikDatePicker from "../../common/components/controls/FormikDatePicker";
import FormikTextInput from "../../common/components/controls/FormikTextInput";
import { IUrlParams } from "../../common/interfaces/IUrlParams";
import useAddProject from "../../hooks/useAddProject";
import useProjectById from "../../hooks/useProjectById";
import useUpdateProject from "../../hooks/useUpdateProject";
import { IProject } from "../../models/IProject";

const MyCheckbox = ({ children, ...props }: any) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div>
      <label className="form-check-label">
        <input
          className="form-check-input"
          type="checkbox"
          {...field}
          {...props}
        />
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
  const { id: prjId } = useParams<IUrlParams>();
  let data = {} as IProject,
    isLoading = false;

  if (prjId) {
    ({ data, isLoading } = useProjectById(prjId));
  }

  const addPrjMutation = useAddProject();
  const updatePrjMutation = useUpdateProject();

  return (
    <Container>
      <h3 className="mb-3">{prjId ? "Update Project" : "New Project"}</h3>
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
              .max(30, "Must be 20 characters or less")
              .required("Required"),
            customer: Yup.string()
              .max(30, "Must be 20 characters or less")
              .required("Required"),
          })}
          onSubmit={(values) => {
            if (prjId) {
              updatePrjMutation
                .mutateAsync(values)
                .then((data) => console.log(data));
            } else {
              addPrjMutation
                .mutateAsync(values)
                .then((data) => console.log(data));
            }
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
              <FormikTextInput id="name" label="Project Name" name="name" />
            </Row>
            <Row className="mb-3">
              <FormikTextInput
                id="customer"
                label="Email Address"
                name="customer"
              />
            </Row>
            <Row className="mb-3">
              <FormikDatePicker name="startDate" label="Start Date" />
            </Row>
            <Row className="mb-3">
              <FormikDatePicker name="endDate" label="End Date" />
            </Row>
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      )}
    </Container>
  );
};

export default ProjectDetail;
