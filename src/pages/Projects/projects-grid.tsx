import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import withRouter from "../../Components/Common/withRouter";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

//Import Cards
import CardProject from "./card-project";

import { getProjects as onGetProjects } from "../../slices/projects/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import Pagination from "Components/Common/Pagination";
import { createSelector } from 'reselect';

const ProjectsGrid = () => {

  //meta title
  document.title = "Projects Grid | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch<any>();

 const selectProperties = createSelector(
    (state: any) => state.projects,
    (projects) => ({
      projects: projects.projects,
    })
  );

  const { projects } = useSelector(selectProperties);

  const [currentpages, setCurrentpages] = useState<any>();

  useEffect(() => {
    dispatch(onGetProjects());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Projects" breadcrumbItem="Projects Grid" />
          <Row>
            <CardProject projects={currentpages} />
          </Row>
          <Row>
            <Col lg={12}>
              <Pagination
                perPageData={9}
                data={projects || []}
                setCurrentpages={setCurrentpages}
                currentpages={currentpages}
              />
            </Col>
          </Row>
        </Container>
      </div >
    </React.Fragment >
  );
};

export default withRouter(ProjectsGrid);
