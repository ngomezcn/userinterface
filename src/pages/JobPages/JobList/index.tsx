import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../Components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";

//import components
import Breadcrumbs from '../../../Components/Common/Breadcrumb';
import DeleteModal from '../../../Components/Common/DeleteModal';

import {
    getJobList as onGetJobList,
    addNewJobList as onAddNewJobList,
    updateJobList as onUpdateJobList,
    deleteJobList as onDeleteJobList,
} from "../../../slices/jobs/thunk";

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

function JobList() {

    //meta title
    document.title = "Jobs List | Skote - React Admin & Dashboard Template";

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

    // validation
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            jobId: (job && job.jobId) || '',
            title: (job && job.title) || '',
            companyName: (job && job.companyName) || '',
            location: (job && job.location) || '',
            experience: (job && job.experience) || '',
            position: (job && job.position) || '',
            type: (job && job.type) || '',
            status: (job && job.status) || '',

        },
        validationSchema: Yup.object({
            jobId: Yup.string().required("Please Enter Your Job Id"),
            title: Yup.string().required("Please Enter Your Job Title"),
            companyName: Yup.string().required("Please Enter Your Company Name"),
            location: Yup.string().required("Please Enter Your Location"),
            experience: Yup.string().required("Please Enter Your Experience"),
            position: Yup.string().required("Please Enter Your Position"),
            type: Yup.string().required("Please Enter Your Type"),
            status: Yup.string().required("Please Enter Your Status"),
        }),
        onSubmit: (values: any) => {
            if (isEdit) {
                const updateJobList = {
                    id: job ? job.id : 0,
                    jobId: values.jobId,
                    title: values.title,
                    companyName: values.companyName,
                    location: values.location,
                    experience: values.experience,
                    position: values.position,
                    type: values.type,
                    postedDate: "02 June 2021",
                    lastDate: "25 June 2021",
                    status: values.status,
                };
                // update Job
                dispatch(onUpdateJobList(updateJobList));
                validation.resetForm();
            } else {
                const newJobList = {
                    id: Math.floor(Math.random() * (30 - 20)) + 20,
                    jobId: values["jobId"],
                    title: values["title"],
                    companyName: values["companyName"],
                    location: values["location"],
                    experience: values["experience"],
                    position: values["position"],
                    type: values["type"],
                    postedDate: "02 June 2021",
                    lastDate: "25 June 2021",
                    status: values["status"],
                };
                // save new Job
                dispatch(onAddNewJobList(newJobList));
                validation.resetForm();
            }
            toggle();
        },
    });



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
                Header: 'Job Title',
                accessor: 'title',
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <JobTitle {...cellProps} />;
                }
            },
            {
                Header: 'Company Name',
                accessor: 'companyName',
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <CompanyName {...cellProps} />;
                }
            },
            {
                Header: 'Location',
                accessor: 'location',
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <Location {...cellProps} />;
                }
            },
            {
                Header: 'Experience',
                accessor: 'experience',
                Filter: false,
                filterable: true,
                Cell: (cellProps: any) => {
                    return <Experience {...cellProps} />;
                }
            },
            {
                Header: 'Position',
                accessor: 'position',
                Filter: false,
                Cell: (cellProps: any) => {
                    return <Position {...cellProps} />;
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
                Header: 'Posted Date',
                accessor: 'postedDate',
                Filter: false,
                Cell: (cellProps: any) => {
                    return <PostedDate {...cellProps} />;
                }
            },
            {
                Header: 'Last Date',
                accessor: 'lastDate',
                Filter: false,
                Cell: (cellProps: any) => {
                    return <LastDate {...cellProps} />;
                }
            },
            {
                Header: 'Status',
                accessor: 'status',
                Filter: false,
                disableFilters: true,
                Cell: (cellProps: any) => {
                    return <Status {...cellProps} />;
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
                    <Breadcrumbs title="Jobs" breadcrumbItem="Jobs Lists" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody className="border-bottom">
                                    <div className="d-flex align-items-center">
                                        <CardTitle tag="h5" className="mb-0 flex-grow-1">Jobs Lists</CardTitle>
                                        <div className="flex-shrink-0">
                                            <Link to="#" onClick={() => handleJobClicks()} className="btn btn-primary me-1">Add New Job</Link>
                                            <Link to="#" className="btn btn-light me-1"><i className="mdi mdi-refresh"></i></Link>
                                            <UncontrolledDropdown className="dropdown d-inline-block me-1">
                                                <DropdownToggle type="menu" className="btn btn-success" id="dropdownMenuButton1">
                                                    <i className="mdi mdi-dots-vertical"></i></DropdownToggle>
                                                <DropdownMenu>
                                                    <li><DropdownItem href="#">Action</DropdownItem></li>
                                                    <li><DropdownItem href="#">Another action</DropdownItem></li>
                                                    <li><DropdownItem href="#">Something else here</DropdownItem></li>
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
                                        <Col xxl={2} lg={6}>
                                            <select className="form-control select2" onClick={hadnleSearchStatus}>
                                                <option value="all">Status</option>
                                                <option value="Active">Active</option>
                                                <option value="New">New</option>
                                                <option value="Close">Close</option>
                                            </select>
                                        </Col>
                                        <Col xxl={2} lg={4}>
                                            <select className="form-control select2" onClick={hadnleSearchTime}>
                                                <option value="all">Select Type</option>
                                                <option value="Full Time">Full Time</option>
                                                <option value="Part Time">Part Time</option>
                                            </select>
                                        </Col>
                                        <Col xxl={2} lg={4}>
                                            <div id="datepicker1">
                                                <Flatpickr
                                                    placeholder='select data'
                                                    value={selectDate}
                                                    onChange={dateChange}
                                                    options={{
                                                        altInput: true,
                                                        mode: 'single',
                                                        dateFormat: 'd M, y'
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xxl={2} lg={4}>
                                            <Button type="button" className="btn btn-soft-secondary w-100"><i className="mdi mdi-filter-outline align-middle"></i> Filter</Button>
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
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle} tag="h4">
                            {!!isEdit ? "Edit Job" : "Add Job"}
                        </ModalHeader>
                        <ModalBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                            >
                                <Row>
                                    <Col xs={12}>
                                        <div className="mb-3">
                                            <Label> Job Id</Label>
                                            <Input
                                                name="jobId"
                                                type="text"
                                                validate={{
                                                    required: { value: true },
                                                }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.jobId || ""}
                                                invalid={
                                                    validation.touched.jobId && validation.errors.jobId ? true : false
                                                }
                                            />
                                            {validation.touched.jobId && validation.errors.jobId ? (
                                                <FormFeedback type="invalid">{validation.errors.jobId}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label>Job Title</Label>
                                            <Input
                                                name="title"
                                                type="text"
                                                validate={{
                                                    required: { value: true },
                                                }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.title || ""}
                                                invalid={
                                                    validation.touched.title && validation.errors.title ? true : false
                                                }
                                            />
                                            {validation.touched.title && validation.errors.title ? (
                                                <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label>Company Name</Label>
                                            <Input
                                                name="companyName"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.companyName || ""}
                                                invalid={
                                                    validation.touched.companyName && validation.errors.companyName ? true : false
                                                }
                                            />
                                            {validation.touched.companyName && validation.errors.companyName ? (
                                                <FormFeedback type="invalid">{validation.errors.companyName}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label>Location</Label>
                                            <Input
                                                name="location"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.location || ""}
                                                invalid={
                                                    validation.touched.location && validation.errors.location ? true : false
                                                }
                                            />
                                            {validation.touched.location && validation.errors.location ? (
                                                <FormFeedback type="invalid">{validation.errors.location}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label>Experience</Label>
                                            <Input
                                                name="experience"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.experience || ""
                                                }
                                                invalid={
                                                    validation.touched.experience && validation.errors.experience ? true : false
                                                }
                                            />
                                            {validation.touched.experience && validation.errors.experience ? (
                                                <FormFeedback type="invalid">{validation.errors.experience}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label>Position</Label>
                                            <Input
                                                name="position"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.position || ""}
                                                invalid={
                                                    validation.touched.position && validation.errors.position ? true : false
                                                }
                                            />
                                            {validation.touched.position && validation.errors.position ? (
                                                <FormFeedback type="invalid">{validation.errors.position}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label>Type</Label>
                                            <Input
                                                name="type"
                                                type="select"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.type || ""
                                                }
                                                invalid={
                                                    validation.touched.type && validation.errors.type ? true : false
                                                }
                                            >
                                                <option>Full Time</option>
                                                <option>Part Time</option>
                                                <option>Freelance</option>
                                                <option>Internship</option>

                                            </Input>
                                            {validation.touched.type && validation.errors.type ? (
                                                <FormFeedback type="invalid">{validation.errors.type}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label>Status</Label>
                                            <Input
                                                name="status"
                                                type="select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.status || ""
                                                }
                                                invalid={
                                                    validation.touched.status && validation.errors.status ? true : false
                                                }
                                            >
                                                <option>Active</option>
                                                <option>New</option>
                                                <option>Close</option>
                                            </Input>
                                            {validation.touched.status && validation.errors.status ? (
                                                <FormFeedback status="invalid">{validation.errors.status}</FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="text-end">
                                            <Button type="submit" color="success" className="save-user" > Save</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </React.Fragment>
    );
}


export default JobList;