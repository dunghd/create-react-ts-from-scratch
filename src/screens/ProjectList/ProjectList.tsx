import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import CommonSpinner from "../../common/components/CommonSpinner";
import useProjects from "../../hooks/useProjects";

const renderDate = (cell: any) => {
  let dateObj = cell;
  if (typeof cell !== "object") {
    dateObj = new Date(cell);
  }
  return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
    "0" +
    (dateObj.getUTCMonth() + 1)
  ).slice(-2)}/${dateObj.getUTCFullYear()}`;
};

const ProjectList = (): JSX.Element => {
  const { data, isLoading } = useProjects();
  const history = useHistory();

  const columns = [
    {
      dataField: "number",
      text: "Number",
      width: 150,
      events: {
        onClick: (
          e: any,
          column: any,
          columnIndex: any,
          row: any,
          rowIndex: any
        ) => {
          history.push(`/project-list/${row.id}`);
        },
      },
      style: {
        cursor: "pointer",
        textDecoration: "underline",
      },
    },
    {
      dataField: "name",
      text: "Name",
      width: 400,
    },
    {
      dataField: "customer",
      text: "Customer",
      width: 400,
    },
    {
      dataField: "startDate",
      text: "Start Date",
      width: 150,
      formatter: renderDate,
    },
    {
      dataField: "endDate",
      text: "End Date",
      width: 150,
      formatter: renderDate,
    },
    {
      dataField: "group",
      text: "Group",
      width: 150,
    },
    {
      dataField: "members",
      text: "Members",
      width: 300,
    },
    {
      dataField: "status",
      text: "Status",
      width: 150,
    },
  ];

  return isLoading ? (
    <CommonSpinner />
  ) : (
    <div style={{ height: "70vh", width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <BootstrapTable keyField="id" data={data || []} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
