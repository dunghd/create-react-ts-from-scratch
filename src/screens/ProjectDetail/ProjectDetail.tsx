import { Form, Formik } from "formik";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import CommonSpinner from "../../common/components/CommonSpinner";
import FormikDatePicker from "../../common/components/controls/FormikDatePicker";
import FormikTextInput from "../../common/components/controls/FormikTextInput";
import { IUrlParams } from "../../common/interfaces/IUrlParams";
import { GET_PROJECT_BY_ID_KEY } from "../../common/QueryKeys";
import useAddProject from "../../hooks/useAddProject";
import useDeleteProject from "../../hooks/useDeleteProject";
import useProjectById from "../../hooks/useProjectById";
import useUpdateProject from "../../hooks/useUpdateProject";
import ProjectValidationSchema from "./ProjectValidationSchema";

const ProjectDetail = () => {
  const { id: prjId } = useParams<IUrlParams>();

  const { data, isLoading } = useProjectById(prjId);

  const addPrjMutation = useAddProject();
  const updatePrjMutation = useUpdateProject();
  const deletePrjMutation = useDeleteProject();

  console.log(data);

  return (
    <Container>
      <h3 className="mb-3">{prjId ? "Update Project" : "New Project"}</h3>
      {isLoading ||
      addPrjMutation.isLoading ||
      updatePrjMutation.isLoading ||
      deletePrjMutation.isLoading ? (
        <CommonSpinner />
      ) : (
        <Formik
          initialValues={data}
          enableReinitialize
          validationSchema={ProjectValidationSchema}
          onSubmit={(values) => {
            if (prjId) {
              updatePrjMutation.mutateAsync(values);
            } else {
              addPrjMutation.mutateAsync(values);
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
              <FormikTextInput id="customer" label="	Customer" name="customer" />
            </Row>
            <Row className="mb-3">
              <FormikDatePicker name="startDate" label="Start Date" />
            </Row>
            <Row className="mb-3">
              <FormikDatePicker name="endDate" label="End Date" />
            </Row>
            <Row className="mb-3">
              <Col></Col>
              <Button className="col" type="submit">
                Submit
              </Button>
              {prjId && (
                <>
                  <Col></Col>
                  <Button
                    className="col"
                    onClick={() => deletePrjMutation.mutate(prjId)}
                  >
                    Delete
                  </Button>
                </>
              )}
              <Col></Col>
            </Row>
          </Form>
        </Formik>
      )}
    </Container>
  );
};

export default ProjectDetail;
