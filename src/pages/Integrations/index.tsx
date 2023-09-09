import React, { useEffect, useState } from "react";
// import { Link, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import withRouter from "Components/Common/withRouter";
import { map } from "lodash";
import moment from "moment";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Component
import Breadcrumbs from "Components/Common/Breadcrumb";
import DeleteModal from "Components/Common/DeleteModal";

//Import Image
import images from "assets/images";
import companies from "assets/images/companies";

import {
  getIntegrations as onGetIntegrations,
  //getProjects as onGetProjects,
  addNewProject as onAddNewProject,
  updateProject as onUpdateProject,
  deleteProject as onDeleteProject,
} from "slices/thunk";
import { createSelector } from "reselect";

//redux
import { useSelector, useDispatch } from "react-redux";

import { useCallback, useMemo } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../../Components/Common/TableContainer";

//import components

import {
  getJobList as onGetJobList,
  addNewJobList as onAddNewJobList,
  updateJobList as onUpdateJobList,
  deleteJobList as onDeleteJobList,
} from "../../slices/jobs/thunk";

import {
  JobNo,
  JobTitle,
  CompanyName,
  Location,
  Experience,
  Position,
  Type,
  PostedDate,
  LastDate,
  Status,
} from "./JobListCol";
import JobFilter from "./JobFilter";

//redux

import { UncontrolledTooltip, Card, CardBody, CardTitle } from "reactstrap";

//flatpickr
import "flatpickr/dist/themes/material_green.css";
import Pagination from "Components/Common/Pagination";

const ProjectStatus = ({ status }: any) => {
  switch (status) {
    case "Production":
      return <Badge color="success"> {status} </Badge>;
    case "Development":
      return <Badge color="primary"> {status} </Badge>;
    default:
      return <Badge color="primary"> {status} </Badge>;
  }
};

const Integrations = () => {
  //meta title
  document.title = "Integrations";

  const dispatch = useDispatch<any>();
  const [project, setProject] = useState<any>();
  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (project && project.id) || "",
      img: (project && project.img) || "",
      name: (project && project.name) || "",
      description: (project && project.description) || "",
      status: (project && project.status) || "",
      color: (project && project.color) || "",
      dueDate: (project && project.dueDate) || "",
      team: (project && project.team) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      description: Yup.string().required("Please Enter Your Description"),
      status: Yup.string().required("Please Enter Your Status"),
      color: Yup.string().required("Please Enter Your Color"),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        const updateProject = {
          id: project.id,
          img: values.img,
          name: values.name,
          description: values.description,
          status: values.status,
          color: values.color,
          dueDate: values.dueDate,
          team: values.team,
        };

        // update project
        dispatch(onUpdateProject(updateProject));
      } else {
        const newProject = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          description: values["description"],
          status: values["status"],
          color: values["color"],
          dueDate: values["dueDate"],
          team: values["team"],
        };
        // save new project
        dispatch(onAddNewProject(newProject));
      }
      toggle();
    },
  });

  const selectProperties = createSelector(
    (state: any) => state.projects,
    (projects) => ({
      projects: projects.projects,
    })
  );

  const { projects } = useSelector(selectProperties);
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setProject(null);
    } else {
      setModal(true);
    }
  };

  const handleProjectClick = (arg: any) => {
    const project = arg;

    setProject({
      id: project.id,
      img: project.img,
      name: project.name,
      description: project.description,
      status: project.status,
      color: project.color,
      dueDate: project.dueDate,
      team: project.team,
    });

    setIsEdit(true);

    toggle();
  };

  //delete order
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onClickDelete = (project: any) => {
    setProject(project);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (project && project.id) {
      dispatch(onDeleteProject(project.id));
    }
    setDeleteModal(false);
  };

  useEffect(() => {
    dispatch(onGetIntegrations());
  }, [dispatch]);

  function cutCommit(inputString: string): string {
    if (inputString.length <= 9) {
      return inputString;
    } else {
      return inputString.slice(0, 9);
    }
  }

  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("YYYY-MM-DD");
    return date1;
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Interconnectivity"
            breadcrumbItem="Integrations"
          />
          <JobFilter />

          <Col lg={12}>
            <div>
              <div className="table-responsive">
                <Table className="project-list-table table-nowrap align-middle table-borderless">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "100px" }}>
                        #
                      </th>
                      <th scope="col">Projects</th>
                      <th scope="col">Status</th>
                      <th scope="col">Commit</th>
                      <th scope="col">Last update</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map(projects, (project: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={companies[project.img]}
                            alt=""
                            className="avatar-sm"
                          />
                        </td>

                        <td>
                          <h5 className="text-truncate font-size-14">
                            <Link
                              to={`/interconnectivity-node-editor/${project.id}`}
                              className="text-dark"
                            >
                              {project.projectName}{" "}
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">
                            {project.description}
                          </p>
                        </td>
                        <td>
                          <ProjectStatus status={project.status} />
                        </td>

                        <td>
                          <Button
                            type="button"
                            color="secondary"
                            className="btn btn-soft-secondary waves-effect waves-light btn btn-secondary"
                          >
                            {cutCommit(project.commit)}
                          </Button>
                        </td>
                        <td>{project.date}</td>
                        <td>{project.date}</td>

                        <td>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              href="#"
                              className="card-drop"
                              tag="a"
                            >
                              <i className="mdi mdi-dots-horizontal font-size-18" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem
                                href="#"
                                onClick={() => handleProjectClick(project)}
                              >
                                <i className="mdi mdi-pencil font-size-16 text-success me-1" />
                                Edit
                              </DropdownItem>

                              <DropdownItem
                                href="#"
                                onClick={() => handleProjectClick(project)}
                              >
                                <i className="bx bx-duplicate font-size-16 text-primary me-1" />
                                Duplicate
                              </DropdownItem>

                              <DropdownItem
                                href="#"
                                onClick={() => onClickDelete(project)}
                              >
                                <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle} tag="h4">
                    {!!isEdit ? "Edit Project" : "Add Project"}
                  </ModalHeader>
                  <ModalBody>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                      autoComplete="off"
                    >
                      <Row>
                        <Col xs={12}>
                          <Input
                            type="hidden"
                            value={validation.values.img || ""}
                            name="img"
                          />

                          <Input
                            type="hidden"
                            value={validation.values.team || ""}
                            name="team"
                          />
                          <div className="mb-3">
                            <Label>Name</Label>
                            <Input
                              name="name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.name || ""}
                              invalid={
                                validation.touched.name &&
                                validation.errors.name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.name &&
                            validation.errors.name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.name}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label>Description</Label>
                            <Input
                              name="description"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.description || ""}
                              invalid={
                                validation.touched.description &&
                                validation.errors.description
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.description &&
                            validation.errors.description ? (
                              <FormFeedback type="invalid">
                                {validation.errors.description}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label>Status</Label>
                            <Input
                              name="status"
                              id="status1"
                              type="select"
                              className="form-select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.status || ""}
                              invalid={
                                validation.touched.status &&
                                validation.errors.status
                                  ? true
                                  : false
                              }
                            >
                              <option>Completed</option>
                              <option>Pending</option>
                              <option>Delay</option>
                            </Input>
                            {validation.touched.status &&
                            validation.errors.status ? (
                              <FormFeedback type="invalid">
                                {validation.errors.status}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label>Color</Label>
                            <Input
                              name="color"
                              type="select"
                              className="form-select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.color || ""}
                              invalid={
                                validation.touched.color &&
                                validation.errors.color
                                  ? true
                                  : false
                              }
                            >
                              <option>success</option>
                              <option>warning</option>
                              <option>danger</option>
                            </Input>
                            {validation.touched.color &&
                            validation.errors.color ? (
                              <FormFeedback type="invalid">
                                {validation.errors.color}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label>DueDate</Label>
                            <Flatpickr
                              type="date"
                              name="dueDate"
                              className="form-control"
                              value={validation.values.dueDate || ""}
                              onChange={(date: any) =>
                                validation.setFieldValue(
                                  "dueDate",
                                  moment(date[0]).format("DD MMMM, YYYY")
                                )
                              }
                              options={{
                                mode: "single",
                                dateFormat: "d M, Y",
                              }}
                            />
                            {validation.touched.dueDate &&
                            validation.errors.dueDate ? (
                              <span className="text-danger">
                                {validation.errors.dueDate}
                              </span>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="text-end">
                            <Button
                              type="submit"
                              color="success"
                              className="save-user"
                            >
                              Save
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            </div>
          </Col>

          <Row>
            <Col xs={12}>
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more{" "}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Integrations);
