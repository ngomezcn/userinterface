import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, BreadcrumbItem } from "reactstrap";

const Breadcrumb = (props: any) => {
  const breadcrumbText = props.customRoute || props.breadcrumbItem;

  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0 font-size-18">{props.breadcrumbItem}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                <Link to="#">{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to="#">{breadcrumbText}</Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Breadcrumb;
