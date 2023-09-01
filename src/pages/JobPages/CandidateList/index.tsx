import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row, Collapse, Label, Input, Form, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import List from './List';
import { getJobCandidateList as onGetJobCandidateList } from 'slices/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const CandidateList = () => {
    document.title = "Candidate List | Skote - React Admin & Dashboard Template";

    const dispatch = useDispatch<any>();

   const selectProperties = createSelector(
        (state: any) => state.jobs,
        (jobs) => ({
            jobListCandidate: jobs.candidateList
        })
    );
    const { jobListCandidate } = useSelector(selectProperties);

    const [candidateDate, setCandidateDate] = useState<any>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen);

    const [endDate, setendDate] = useState<any>(new Date());
    const endDateChange = (date: any) => {
        setendDate(date);
    };

    //search
    const handleSearch = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setCandidateDate(jobListCandidate?.filter((data: any) => data.name.toLowerCase().includes(search)))
        } else {
            setCandidateDate(jobListCandidate)
        }
    }

    const handleLocation = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setCandidateDate(jobListCandidate?.filter((data: any) => data.location.toLowerCase().includes(search)))
        } else {
            setCandidateDate(jobListCandidate)
        }
    }

    const handleSearchType = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            setCandidateDate(jobListCandidate?.filter((data: any) => data.type === search || search === 'All'))
        } else {
            setCandidateDate(jobListCandidate)
        }
    }

    useEffect(() => {
        dispatch(onGetJobCandidateList())
    }, [dispatch])

    useEffect(() => {
        setCandidateDate(jobListCandidate)
    }, [jobListCandidate])
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Jobs" breadcrumbItem="Candidate List" />
                    <Row>
                        <Col lg={12}>
                            <Card className="job-filter">
                                <CardBody>
                                    <Form action="#">
                                        <Row className="g-3">
                                            <Col xxl={4} lg={4}>
                                                <div className="position-relative">
                                                    <Input type="text" id="searchJob" autoComplete="off" placeholder="Search your candidate" onChange={handleSearch} />
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={4}>
                                                <div className="position-relative">
                                                    <Input type="text" id="locationInput" autoComplete="off" placeholder="Search for location" onChange={handleLocation} />
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={4}>
                                                <div className="position-relative">
                                                    <select className="form-select select2" aria-label="Default select example" onClick={handleSearchType} >
                                                        <option value="All">Select for</option>
                                                        <option value="Freelance">Freelance</option>
                                                        <option value="Full Time">Full Time</option>
                                                        <option value="Part Time">Part Time</option>
                                                        <option value="Internship">Internship</option>
                                                    </select>
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={6}>
                                                <div className="position-relative">
                                                    <div id="datepicker1">
                                                        <Flatpickr
                                                            className="form-control"
                                                            id="orderdate"
                                                            name="kycbirthDate"
                                                            placeholder="Select date"
                                                            options={{
                                                                mode: "single",
                                                                dateFormat: 'd M, Y',
                                                            }}
                                                            value={endDate}
                                                            onChange={endDateChange}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={6}>
                                                <div className="position-relative h-100 hstack gap-3">
                                                    <Button type="button" color='primary' className="h-100 w-100"><i className="bx bx-search-alt align-middle"></i> Find Jobs</Button>
                                                    <Link to="#" onClick={toggle} className="btn btn-secondary h-100 w-100">
                                                        <i className="bx bx-filter-alt align-middle"></i> Advance</Link>
                                                </div>
                                            </Col>

                                            <Collapse isOpen={isOpen} id="collapseExample">
                                                <div>
                                                    <Row className="g-3">
                                                        <Col xxl={4} lg={6}>
                                                            <div>
                                                                <Label htmlFor="experience" className="form-label fw-semibold">Experience</Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                                                <Label className="form-check-label" htmlFor="inlineCheckbox1">All</Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" />
                                                                <Label className="form-check-label" htmlFor="inlineCheckbox2">Fresher</Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option2" />
                                                                <Label className="form-check-label" htmlFor="inlineCheckbox3">1-2</Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option2" />
                                                                <Label className="form-check-label" htmlFor="inlineCheckbox4">2-3</Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="option3" />
                                                                <Label className="form-check-label" htmlFor="inlineCheckbox5">4+</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={4} lg={6}>
                                                            <div>
                                                                <Label htmlFor="jobType" className="form-label fw-semibold">Job Type</Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input className="form-check-input" type="checkbox" id="inlineCheckbox6" value="option3" />
                                                                <Label className="form-check-label" htmlFor="inlineCheckbox6">Full Time</Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input className="form-check-input" type="checkbox" id="inlineCheckbox7" value="option3" />
                                                                <Label className="form-check-label" htmlFor="inlineCheckbox7">Part Time</Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input className="form-check-input" type="checkbox" id="inlineCheckbox8" value="option3" />
                                                                <Label className="form-check-label" htmlFor="inlineCheckbox8">Freelance</Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input className="form-check-input" type="checkbox" id="inlineCheckbox9" value="option3" />
                                                                <Label className="form-check-label" htmlFor="inlineCheckbox9">Internship</Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={4} lg={4}>
                                                            <div className="position-relative">
                                                                <Label htmlFor="qualificationInput" className="form-label fw-semibold">Qualification</Label>
                                                                <Input type="text" className="form-control" id="qualificationInput" autoComplete="off" placeholder="Qualification" />
                                                                <i className="ri-government-line filter-icon"></i>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Collapse>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>

                    <List candidateDate={candidateDate} />
                </Container>
            </div>
        </React.Fragment>
    );
}

export default CandidateList;