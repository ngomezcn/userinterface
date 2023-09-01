import React, { useState } from 'react';
import { Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row, Label, Input, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const JobData = ({ jobGrid }: any) => {
    const [modal, setModal] = useState(false) as any[];

    return (
        <React.Fragment>
            <Row>
                {(jobGrid || []).map((item: any, key: number) => (
                    <Col xl={3} md={6} key={key}>
                        <Card>
                            <CardBody>
                                <div className="favorite-icon">
                                    <Link to="#"><i className="uil uil-heart-alt fs-18"></i></Link>
                                </div>
                                <img src={item.img} alt="" height="50" className="mb-3" />
                                <h5 className="fs-17 mb-2">
                                    <Link to="/job-details" className="text-dark">{item.title}</Link> <small className="text-muted fw-normal">(0-2 Yrs Exp.)</small></h5>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <p className="text-muted fs-14 mb-1">{item.companyName}</p>
                                    </li>
                                    <li className="list-inline-item">
                                        <p className="text-muted fs-14 mb-0"><i className="mdi mdi-map-marker"></i> {item.location}</p>
                                    </li>
                                    <li className="list-inline-item">
                                        <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 - $800 / month</p>
                                    </li>
                                </ul>
                                <div className="mt-3 hstack gap-2">
                                    <Badge className="rounded-1 badge-soft-success">Full Time</Badge>
                                    <Badge className=" rounded-1 badge-soft-warning">Urgent</Badge>
                                    <Badge className=" rounded-1 badge-soft-info">Private</Badge>
                                </div>
                                <div className="mt-4 hstack gap-2">
                                    <Link to="/job-details" className="btn btn-soft-success w-100">View Profile</Link>
                                    <Link to="#applyJobs" onClick={() => setModal(true)} className="btn btn-soft-primary w-100">Apply Now</Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/* Modal */}
            <Modal
                isOpen={modal}
                toggle={() => {
                    setModal()
                }}
                id="applyJobs"
            >
                <div className="modal-content">
                    <ModalHeader toggle={() => setModal()} id="applyJobsLabel" className="modal-header">
                        Apply For This Job
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg={12}>
                                <div className="mb-3">
                                    <Label htmlFor="fullnameInput" className="form-label">Full Name</Label>
                                    <Input type="text" className="form-control" id="fullnameInput" placeholder="Enter your name" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label htmlFor="emailInput" className="form-label">Email</Label>
                                    <Input type="email" className="form-control" id="emailInput" placeholder="Enter your email" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label htmlFor="phoneNumberInput" className="form-label">Phone Number</Label>
                                    <Input type="email" className="form-control" id="phoneNumberInput" placeholder="Enter your number" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-3">
                                    <Label htmlFor="uploadResume" className="form-label">Upload Resume</Label>
                                    <Input type="file" className="form-control" id="uploadResume" placeholder="Upload resume" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-4">
                                    <Label htmlFor="messageInput" className="form-label">Message</Label>
                                    <textarea className="form-control" id="messageInput" rows={3} placeholder="Enter your message"></textarea>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="text-end">
                                    <button type='submit' className="btn btn-success me-1" onClick={() => setModal()}>Send Application <i className="bx bx-send align-middle"></i></button>
                                    <button className="btn btn-outline-secondary" onClick={() => setModal()}>Cancel</button>
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                </div>
            </Modal>
        </React.Fragment>
    );
}


export default JobData;