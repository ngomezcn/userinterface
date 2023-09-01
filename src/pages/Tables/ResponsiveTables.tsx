import React, { useMemo, useState } from "react";

import {
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "Components/Common/TableContainer";
import tableData from "common/data/responsiveTableData";
import Pagination from "Components/Common/Pagination";


const ResponsiveTables = () => {
  document.title = "Responsive Tables | Dashonic - React Admin & Dashboard Template";


  const [currentpages, setCurrentpages] = useState<any>(tableData)

  const columns = useMemo(
    () => [
      {

        Header: "Company",
        filterable: true,
        Filter: false,
        accessor: (cell: any) => {
          return (
            <>{cell.symbol}
              <span className="co-name">{cell.name}</span>
            </>
          );
        },
      },
      {
        Header: "Last Trade",
        filterable: true,
        Filter: false,
        accessor: (cell: any) => {
          return (
            <span>{cell.price}</span>
          );
        },
      },
      {
        Header: "Trade Time",
        filterable: true,
        Filter: false,
        accessor: (cell: any) => {
          return (
            <span>{cell.time}</span>
          );
        },
      },
      {
        Header: "Change",
        filterable: true,
        Filter: false,
        accessor: (cell: any) => {
          return (
            <span>{cell.change}</span>
          );
        },
      },
      {
        Header: "Prev Close",
        filterable: true,
        Filter: false,
        accessor: (cell: any) => {
          return (
            <span>{cell.prevClose}</span>
          );
        },
      },
      {
        Header: "Open",
        filterable: true,
        Filter: false,
        accessor: (cell: any) => {
          return (
            <span>{cell.open}</span>
          );
        },
      },
      {
        Header: "Bid",
        filterable: true,
        Filter: false,
        accessor: (cell: any) => {
          return (
            <span>{cell.bid}</span>
          );
        },
      },
      {
        Header: "Ask",
        filterable: true,
        Filter: false,
        accessor: (cell: any) => {
          return (
            <span>{cell.ask}</span>
          );
        },
      },
      {
        Header: "1y Target Est",
        filterable: true,
        Filter: false,
        accessor: (cell: any) => {
          return (
            <span>{cell.weekRange}</span>
          );
        },
      }
    ], []
  )
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Tables" breadcrumbItem="Responsive Table" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4 className="card-title">Example</h4>
                  <p className="card-title-desc">This is an experimental awesome solution for responsive tables with complex data.</p>
                  <TableContainer
                    columns={columns}
                    data={currentpages || []}
                    customPageSize={10}
                    tableClass="table-striped display-all"
                  />
                  <Pagination
                    perPageData={10}
                    data={tableData}
                    setCurrentpages={setCurrentpages}
                    currentpages={currentpages}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResponsiveTables;
