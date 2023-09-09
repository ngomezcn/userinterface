import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  Input,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";

import companies from "assets/images/companies";

const letterToColorMap = {
  S: "success",
  E: "warning",
  T: "info",
  // Agrega más letras y colores según tus necesidades
};

const getColorForLetter = (letter) => {
  // Verifica si la letra está en el mapeo, si no, usa un color predeterminado
  return letterToColorMap[letter] || "warning";
};

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
                  <Link to="#">
                    <i className="uil uil-heart-alt fs-18"></i>
                  </Link>
                </div>
                <img
                  src={companies[item.img]}
                  alt=""
                  height="50"
                  className="mb-3"
                />
                <h5 className="fs-17 mb-2">
                  <Link to="/job-details" className="text-dark">
                    {item.software}
                  </Link>{" "}
                  <small className="text-muted fw-normal">
                    ({item.version})
                  </small>
                </h5>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-1">{item.company}</p>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      <i className="mdi mdi-map-marker"></i> {item.location}
                    </p>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      <i className="uil uil-wallet"></i> {item.apiVersion}
                    </p>
                  </li>
                </ul>
                <div className="mt-3 hstack gap-2">
                  {item.labels.trim().split(",").map((badgeText, index) => {
                    const firstLetter = badgeText.charAt(0).toUpperCase(); // Obtén la primera letra y conviértela a mayúscula
                    const color = getColorForLetter(firstLetter);
                    
                    return (
                      <Badge
                        key={index}
                        className={`rounded-1 badge-soft-${color}`}
                      >
                        {badgeText}
                      </Badge>
                    );
                  })}

                </div>
                <div className="mt-4 hstack gap-2">
                  <Link
                    to="/integration-template-detail/47784bfc-1ff5-4e9c-9971-f7a08afb3fc9"
                    className="btn btn-soft-success w-100"
                  >
                    View
                  </Link>
                  <Link
                    to="#applyJobs"
                    onClick={() => setModal(true)}
                    className="btn btn-soft-primary w-100"
                  >
                    Deploy Now
                  </Link>
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
          setModal();
        }}
        id="applyJobs"
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => setModal()}
            id="applyJobsLabel"
            className="modal-header"
          >
            Apply For This Job
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="fullnameInput" className="form-label">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="fullnameInput"
                    placeholder="Enter your name"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="emailInput" className="form-label">
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="Enter your email"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="phoneNumberInput" className="form-label">
                    Phone Number
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="phoneNumberInput"
                    placeholder="Enter your number"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="uploadResume" className="form-label">
                    Upload Resume
                  </Label>
                  <Input
                    type="file"
                    className="form-control"
                    id="uploadResume"
                    placeholder="Upload resume"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-4">
                  <Label htmlFor="messageInput" className="form-label">
                    Message
                  </Label>
                  <textarea
                    className="form-control"
                    id="messageInput"
                    rows={3}
                    placeholder="Enter your message"
                  ></textarea>
                </div>
              </Col>
              <Col lg={12}>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-success me-1"
                    onClick={() => setModal()}
                  >
                    Send Application <i className="bx bx-send align-middle"></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setModal()}
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default JobData;
