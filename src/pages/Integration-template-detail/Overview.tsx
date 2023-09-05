import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';

//import images
import adobephotoshop from "../../assets/images/companies/adobe-photoshop.svg";
import salesforce from "../../assets/images/companies/salesforce-2.jpg";

const Overview = () => {
    return (
        <React.Fragment>
            <Col xl={3}>
                <Card>
                    <CardBody>
                        <h5 className="fw-semibold">Overview</h5>

                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="col">Software</th>
                                        <td headers="jobTitleHeader">Salesforce CRM</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Version</th>
                                        <td>Enterprise</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Architecture:</th>
                                        <td><span className="badge badge-soft-success">SaaS</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Availability</th>
                                        <td>SLA Premium</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">API Version</th>
                                        <td>v55.0</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Posted Date</th>
                                        <td>31 June, 2023</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Last Revision</th>
                                        <td>05 Sep, 2023</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="hstack gap-2">
                            <button className="btn btn-soft-primary w-100">Deploy Now</button>
                            <button className="btn btn-soft-danger w-100">Contact Us</button>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <div className="text-center">
                            <img src={salesforce} alt="" height="50" className="mx-auto d-block" />
                            <h5 className="mt-3 mb-1">Salesforce</h5>
                            <p className="text-muted mb-0">Since 1999</p>
                        </div>

                        <ul className="list-unstyled mt-4">
                            <li>
                                <div className="d-flex">
                                    <i className="bx bx-phone text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">Phone</h6>
                                        <p className="text-muted fs-14 mb-0">+415 800 300 229</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="d-flex">
                                    <i className="bx bx-mail-send text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">Email</h6>
                                        <p className="text-muted fs-14 mb-0">hello@salesforce.com</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="d-flex">
                                    <i className="bx bx-globe text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">Website</h6>
                                        <p className="text-muted fs-14 text-break mb-0">www.salesforce.com/crm</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="d-flex">
                                    <i className="bx bx-map text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">Location</h6>
                                        <p className="text-muted fs-14 mb-0">San Francisco, California</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <Link to="#" className="btn btn-soft-primary btn-hover w-100 rounded"><i className="mdi mdi-eye"></i> View Website</Link>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default Overview;