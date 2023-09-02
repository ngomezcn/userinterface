import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../Components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";

//import components
import Breadcrumbs from '../../Components/Common/Breadcrumb';
import DeleteModal from '../../Components/Common/DeleteModal';

import {
    getJobList as onGetJobList,
    addNewJobList as onAddNewJobList,
    updateJobList as onUpdateJobList,
    deleteJobList as onDeleteJobList,
} from "../../slices/jobs/thunk";

import { JobNo, JobTitle, CompanyName, Location, Experience, Position, Type, PostedDate, LastDate, Status } from "./JobListCol";

//redux
import { useSelector, useDispatch } from "react-redux";

import {
    Col,
    Row,
    UncontrolledTooltip,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    FormFeedback,
    Label,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardTitle,
    Button
} from "reactstrap";

//flatpickr
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import Pagination from "Components/Common/Pagination";
import { createSelector } from 'reselect';

function B1Companies() {

    //meta title
    document.title = "B1 Companies";

    const dispatch = useDispatch<any>();

    const selectProperties = createSelector(
       (state: any) => state.jobs,
       (jobs) => ({
         jobs: jobs.jobList,
       })
     );

    const { jobs } = useSelector(selectProperties);

    const [modal, setModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [job, setJob] = useState<any>(null);
    const [jobList, setJobList] = useState<any>();
    const [selectDate, setSelectDate] = useState();
    const dateChange = (date: any) => {
        setSelectDate(date)
    };

    useEffect(() => {
        if (jobs && !jobs.length) {
            dispatch(onGetJobList());
        }
    }, [dispatch, jobs]);

    useEffect(() => {
        setJobList(jobs)
    }, [jobs])

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setJob(null);
        } else {
            setModal(true);
        }
    }, [modal]);

    const handleJobClick = useCallback((arg: any) => {
        const job = arg;
        setJob({
            id: job.id,
            jobId: job.jobId,
            title: job.title,
            companyName: job.companyName,
            location: job.location,
            experience: job.experience,
            position: job.position,
            type: job.type,
            status: job.status,
        });

        setIsEdit(true);

        toggle();
    }, [toggle]);

    //delete Job
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (job) => {
        setJob(job);
        setDeleteModal(true);
    };

    const handleDeletejob = () => {
        if (job) {
            dispatch(onDeleteJobList(job.id));
            setDeleteModal(false);
        }
    };
    const handleJobClicks = () => {
        setIsEdit(false);
        setJob(null);
        toggle();
    };

    const hadnleSearch = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setJobList(jobs?.filter((data: any) => data.title.toLowerCase()?.includes(search)))
        } else {
            setJobList(jobs)
        }
    }

    const hadnleSearchStatus = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setJobList(jobs?.filter((data: any) => data.status === search || search === 'all'))
        } else {
            setJobList(jobs)
        }
    }

    const hadnleSearchTime = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setJobList(jobs?.filter((data: any) => data.type === search || search === 'all'))
        } else {
            setJobList(jobs)
        }
    }

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'id',
                Filter: false,
                filterable: true,
                disableSortBy: true,
                Cell: (cellProps: any) => {
                    return <JobNo {...cellProps} />;
                }
            },
            {
                Header: 'Alias',
                accessor: 'alias',
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <JobTitle {...cellProps} />;
                }
            },
            {
                Header: 'SBO Name',
                accessor: 'sboName',
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <CompanyName {...cellProps} />;
                }
            },
            {
                Header: 'SBO Database',
                accessor: 'sboDatabase',
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <Location {...cellProps} />;
                }
            },
            {
                Header: 'SBO Database date',
                accessor: 'sboDatabaseDate',
                Filter: false,
                Cell: (cellProps: any) => {
                    return <PostedDate {...cellProps} />;
                }
            },
            {
                Header: 'Type',
                accessor: 'type',
                Filter: false,
                Cell: (cellProps: any) => {
                    return <Type {...cellProps} />;
                }
            },
            {
                Header: 'Action',
                accessor: 'action',
                Filter: false,
                disableFilters: true,
                Cell: (cellProps: any) => {
                    return (
                        <ul className="list-unstyled hstack gap-1 mb-0">
                            <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                                <Link to="/job-details" className="btn btn-sm btn-soft-primary">
                                    <i className="mdi mdi-eye-outline" id="viewtooltip"></i></Link>
                            </li>
                            <UncontrolledTooltip placement="top" target="viewtooltip">
                                View
                            </UncontrolledTooltip>

                            <li>
                                <Link
                                    to="#"
                                    className="btn btn-sm btn-soft-info"
                                    onClick={() => {
                                        const jobData = cellProps.row.original;
                                        handleJobClick(jobData);
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
                }
            },
        ],
        [handleJobClick]
    );

    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeletejob}
                onCloseClick={() => setDeleteModal(false)}
            />
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Control center" breadcrumbItem="B1 Companies" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody className="border-bottom">
                                    <div className="d-flex align-items-center">
                                        <CardTitle tag="h5" className="mb-0 flex-grow-1">Companies List</CardTitle>
                                        <div className="flex-shrink-0">
                                            <Link to="#" onClick={() => handleJobClicks()} className="btn btn-primary me-1">Add New Company</Link>
                                            <Link to="#" className="btn btn-light me-1"><i className="mdi mdi-refresh"></i></Link>
                                            <UncontrolledDropdown className="dropdown d-inline-block me-1">
                                                <DropdownToggle type="menu" className="btn btn-success" id="dropdownMenuButton1">
                                                    <i className="mdi mdi-dots-vertical"></i></DropdownToggle>
                                                <DropdownMenu>
                                                    <li><DropdownItem href="#">Import</DropdownItem></li>
                                                    <li><DropdownItem href="#">Export</DropdownItem></li>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardBody className="border-bottom">
                                    <Row className="g-3">
                                        <Col xxl={4} lg={6}>
                                            <Input type="search" id="searchInput" placeholder="Search for ..." onChange={hadnleSearch} />
                                        </Col>
                                        <Col xxl={2} lg={4}>
                                            <select className="form-control select2" onClick={hadnleSearchTime}>
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


export default B1Companies;