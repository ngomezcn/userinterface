import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../../Components/Common/TableContainer";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import DeleteModal from "../../Components/Common/DeleteModal";
import PropagateLoader from "react-spinners/ClipLoader";
import {
  JobNo,
  JobTitle,
  CompanyName,
  Location,
  PostedDate,
} from "./JobListCol";
import {
  Col,
  Row,
  UncontrolledTooltip,
  Input,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardTitle,
  Button,
} from "reactstrap";
import "flatpickr/dist/themes/material_green.css";
import Pagination from "Components/Common/Pagination";
import { useNavigate } from "react-router-dom";
import { getModelsList } from "../../helpers/fakebackend_helper";

function Models() {
  let navigate = useNavigate();
  document.title = "Models";

  const [ jobs, setJobs ] = useState<any>(); 
  const [modal, setModal] = useState<boolean>(false);
  const [job, setJob] = useState(null);
  const [jobList, setJobList] = useState(jobs); 
  const [loading, setLoading] = useState(true);
  const [data, dataSet] = useState<any>(null);


  useEffect(() => {
    
    async function fetchMyAPI() {
      let response = await getModelsList();
  
      dataSet(response);
      setLoading(false);
      console.log(response[0].name)
      setJobs(response)
    }    
    
    fetchMyAPI();
  }, []);
  

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setJob(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  //delete Job
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (job) => {
    setJob(job);
    setDeleteModal(true);
  };

  const handleDeletejob = () => {
    if (job) {
      //dispatch(onDeleteJobList(job.id));
      setDeleteModal(false);
    }
  };

  const handleJobClicks = () => {
    setJob(null);
    toggle();
  };

  const hadnleSearch = (ele: any) => {
    let search = ele.target.value;
    if (search) {
      setJobList(
        jobs?.filter((data: any) => data.name.toLowerCase()?.includes(search))
      );
    } else {
      setJobList(jobs);
    }
  };

  const hadnleSearchStatus = (ele: any) => {
    let search = ele.target.value;
    if (search) {
      setJobList(
        jobs?.filter((data: any) => data.status === search || search === "all")
      );
    } else {
      setJobList(jobs);
    }
  };

  const hadnleSearchTime = (ele: any) => {
    let search = ele.target.value;
    if (search) {
      setJobList(
        jobs?.filter((data: any) => data.type === search || search === "all")
      );
    } else {
      setJobList(jobs);
    }
  };

  const handleEditClick = (jobData) => {
    console.log(jobData)
    navigate(`/interconnectivity-data-model-detail/${jobData.id}`);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        Filter: false,
        filterable: true,
        disableSortBy: true,
        Cell: (cellProps: any) => {
          return <JobNo {...cellProps} />;
        },
      },
      {
        Header: "Name",
        accessor: "name",
        Filter: false,
        filterable: true,
        Cell: (cellProps: any) => {
          return <JobTitle {...cellProps} />;
        },
      },
      {
        Header: "Type",
        accessor: "type",
        Filter: false,
        filterable: true,
        Cell: (cellProps: any) => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "Environment",
        accessor: "environment",
        Filter: false,
        filterable: true,
        Cell: (cellProps: any) => {
          return <Location {...cellProps} />;
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Filter: false,
        disableFilters: true,
        Cell: (cellProps: any) => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                <Link to="/job-details" className="btn btn-sm btn-soft-primary">
                  <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
                </Link>
              </li>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>

              <li>
                <Link
                  to={`/interconnectivity-data-model-detail/${cellProps.row.original.id}`}
                  className="btn btn-sm btn-soft-info"
                  onClick={() => {
                    const jobData = cellProps.row.original;
                  }}
                >
                  <i className="mdi mdi-pencil-outline" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-danger"
                  onClick={() => {
                    const jobData = cellProps.row.original;
                    onClickDelete(jobData);
                  }}
                >
                  <i className="mdi mdi-delete-outline" id="deletetooltip" />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  if (loading) {
    return (
      <div
        className="page-content"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PropagateLoader color="#556ee6" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeletejob}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Control center" breadcrumbItem="Models" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <CardTitle tag="h5" className="mb-0 flex-grow-1">
                      Models List
                    </CardTitle>
                    <div className="flex-shrink-0">
                      <Link
                        to="#"
                        onClick={() => handleJobClicks()}
                        className="btn btn-primary me-1"
                      >
                        Add New Model
                      </Link>
                      <Link to="#" className="btn btn-light me-1">
                        <i className="mdi mdi-refresh"></i>
                      </Link>
                      <UncontrolledDropdown className="dropdown d-inline-block me-1">
                        <DropdownToggle
                          type="menu"
                          className="btn btn-success"
                          id="dropdownMenuButton1"
                        >
                          <i className="mdi mdi-dots-vertical"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <li>
                            <DropdownItem href="#">Import</DropdownItem>
                          </li>
                          <li>
                            <DropdownItem href="#">Export</DropdownItem>
                          </li>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </CardBody>
                <CardBody className="border-bottom">
                  <Row className="g-3">
                    <Col xxl={4} lg={6}>
                      <Input
                        type="search"
                        id="searchInput"
                        placeholder="Search for ..."
                        onChange={hadnleSearch}
                      />
                    </Col>
                    <Col xxl={2} lg={4}>
                      <select
                        className="form-control select2"
                        onClick={hadnleSearchTime}
                      >
                        <option value="all">Select Type</option>
                        <option value="Production">Production</option>
                        <option value="Development">Development</option>
                      </select>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={jobList || []}
                    customPageSize={10}
                    handleJobClicks={handleJobClicks}
                    tableClass="table-bordered align-middle nowrap"
                  />
                  <Pagination
                    perPageData={10}
                    data={jobs}
                    setCurrentpages={setJobList}
                    currentpages={jobList}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Models;
