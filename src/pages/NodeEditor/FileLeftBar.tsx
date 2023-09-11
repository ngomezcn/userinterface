import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
  Card,
  CardBody,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledAlert,
  UncontrolledDropdown,
  Button,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledCollapse,
} from "reactstrap";

import { Message } from "./rete/nodes";

import { RestApiEndpoint } from "./rete/nodes/web-protocols/rest-api/endpoint";

import { editor } from "./editor";

const FileLeftBar = ({ saveNodeEditor }) => {
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [dropdowns, setDropdowns] = useState({
    WebProtocols: false,
    RestApi: false,
    Decoder: false,
    Encoder: false,
    Integration: false,
    Events: false,
    Code: false,
  });

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const toggleDropdown = (dropdownName) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [dropdownName]: !prevDropdowns[dropdownName],
    }));
  };

  function spawnNode(nodeName: string) {
    let newNode: any;
    switch (nodeName) {
      case "RestApiEndpoint":
        newNode = new RestApiEndpoint("REST API Node");
        break;
      case "message":
        newNode = new Message("JSON Node");
        break;
      default:
        break;
    }

    editor.addNode(newNode);
  }

  return (
    <React.Fragment>
      <Card className="filemanager-sidebar me-md-2">
        <CardBody>
          <div className="d-flex flex-column h-100">
            <div className="mb-4">
              <div className="mb-3">
                <Nav tabs className="nav-tabs-custom nav-justified">
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "1",
                      })}
                      onClick={() => {
                        toggleCustom("1");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="fas fa-home"></i>
                      </span>
                      <span className="d-none d-sm-block">Editor</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "2",
                      })}
                      onClick={() => {
                        toggleCustom("2");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="far fa-user"></i>
                      </span>
                      <span className="d-none d-sm-block">Properties</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "3",
                      })}
                      onClick={() => {
                        toggleCustom("3");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="far fa-envelope"></i>
                      </span>
                      <span className="d-none d-sm-block">Enviroment</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "4",
                      })}
                      onClick={() => {
                        toggleCustom("4");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="fas fa-cog"></i>
                      </span>
                      <span className="d-none d-sm-block">VCS</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>

              <ul className="list-unstyled categories-list">
                {/* Dropdown Web Protocols */}
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={() => toggleDropdown("WebProtocols")}
                      to="#"
                    >
                      <i className="mdi mdi-web font-size-16 text-info me-2"></i>{" "}
                      Web Protocols{" "}
                      <i
                        className={
                          dropdowns.WebProtocols
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>

                    <Collapse isOpen={dropdowns.WebProtocols}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link
                              className="text-body fw-medium py-1 d-flex align-items-center"
                              onClick={() => toggleDropdown("RestApi")}
                              to="#"
                            >
                              <i className="mdi mdi-folder font-size-16 text-warning me-2"></i>{" "}
                              REST API{" "}
                              <i
                                className={
                                  dropdowns.RestApi
                                    ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                                    : "mdi mdi-chevron-down accor-down-icon ms-auto"
                                }
                              />
                            </Link>
                            <Collapse isOpen={dropdowns.RestApi}>
                              <div className="card border-0 shadow-none ps-2 mb-0">
                                <ul className="list-unstyled mb-0">
                                  <li>
                                    <Link
                                      to="#"
                                      className="d-flex align-items-center"
                                      onClick={() =>
                                        spawnNode("RestApiEndpoint")
                                      }
                                    >
                                      <span className="me-auto">Endpoint</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="d-flex align-items-center"
                                    >
                                      <span className="me-auto">Request</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className="d-flex align-items-center"
                                    >
                                      <span className="me-auto">Auth</span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </Collapse>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                {/* ===Dropdown Web Protocols=== */}

                {/* Dropdown Decoder */}
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={() => toggleDropdown("Decoder")}
                      to="#"
                    >
                      <i className="mdi mdi-cube-unfolded font-size-16 me-2"></i>{" "}
                      Decoder / Deserializer{" "}
                      <i
                        className={
                          dropdowns.Decoder
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>

                    <Collapse isOpen={dropdowns.Decoder}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">JSON</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">XML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">CSV</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">YAML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">Custom Function</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                {/* ===Decoder=== */}

                {/* Dropdown Encoder */}
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={() => toggleDropdown("Encoder")}
                      to="#"
                    >
                      <i className="mdi mdi-cube-outline font-size-16 me-2"></i>{" "}
                      Encoder / Serializer{" "}
                      <i
                        className={
                          dropdowns.Encoder
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>

                    <Collapse isOpen={dropdowns.Encoder}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">JSON</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">XML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">CSV</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">YAML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">Custom Function</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                {/* ===Encoder=== */}

                {/* Dropdown Integration */}
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={() => toggleDropdown("Integration")}
                      to="#"
                    >
                      <i className="mdi mdi-vector-difference font-size-16 me-2"></i>{" "}
                      Integration{" "}
                      <i
                        className={
                          dropdowns.Integration
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>

                    <Collapse isOpen={dropdowns.Integration}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">JSON</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">XML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">CSV</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">YAML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">Custom Function</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                {/* ===Integration=== */}

                {/* Dropdown Events */}
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={() => toggleDropdown("Events")}
                      to="#"
                    >
                      <i className="mdi mdi-blur  font-size-16 me-2"></i> Events{" "}
                      <i
                        className={
                          dropdowns.Events
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>

                    <Collapse isOpen={dropdowns.Events}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">Task Scheduler</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">XML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">CSV</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">YAML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">Custom Function</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                {/* ===Events=== */}

                {/* Dropdown Code */}
                <li>
                  <div className="custom-accordion">
                    <Link
                      className="text-body fw-medium py-1 d-flex align-items-center"
                      onClick={() => toggleDropdown("Code")}
                      to="#"
                    >
                      <i className="mdi mdi-code-braces font-size-16 me-2"></i>{" "}
                      Code / Functions{" "}
                      <i
                        className={
                          dropdowns.Code
                            ? "mdi mdi-chevron-up accor-down-icon ms-auto"
                            : "mdi mdi-chevron-down accor-down-icon ms-auto"
                        }
                      />
                    </Link>

                    <Collapse isOpen={dropdowns.Code}>
                      <div className="card border-0 shadow-none ps-2 mb-0">
                        <ul className="list-unstyled mb-0">
                          <li>
                            <Link
                              to="#"
                              className="d-flex align-items-center"
                              onClick={() => toggleDropdown("Code")}
                            >
                              <span className="me-auto">JSON</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">XML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">CSV</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">YAML</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="d-flex align-items-center">
                              <span className="me-auto">Custom Function</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </li>
                {/* ===Events=== */}
              </ul>
            </div>

            <div className="mt-auto" style={{ marginBottom: "15px" }}>
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn btn-success waves-effect waves-light w-100"
                  type="button"
                >
                  Save
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#">
                    <i className="bx bx-file-blank me-1"></i>Save and download
                  </DropdownItem>
                  <DropdownItem href="" onClick={saveNodeEditor}>
                    <i className="bx bxs-save me-1"></i>Save only
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default FileLeftBar;
