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

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

// import Component
import FileLeftBar from "./FileLeftBar";
import FileList from "./FileList";
import RecentFile from "./RecentFile";
import Storage from "./Storage";

import { createEditor } from "./editor";
import { useRete } from "rete-react-plugin";

import { useCallback } from "react";
import { message } from "antd";
import { Form, FormGroup, Input, InputGroup, Label } from "reactstrap";

import { SketchPicker } from "react-color";
import ColorPicker from "@vtaits/react-color-picker";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import Select from "react-select";
import { useRef, useEffect } from "react";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import SimpleBar from "simplebar-react";

const NodeProperties = () => {
  const simpleBarRef = useRef(null);

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [textareabadge, settextareabadge] = useState(0) as any[];

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  return (
    <React.Fragment>
      <SimpleBar
        style={{ maxHeight: "80vh", marginBottom: "-10px" }}
        autoHide={true} // Configura esto según tus preferencias
        ref={simpleBarRef}
      >
        <Card>
          <CardBody>
            <h4 className="card-title">Datepicker</h4>
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
                    <span className="d-none d-sm-block">Form</span>
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
                      <i className="fas fa-cog"></i>
                    </span>
                    <span className="d-none d-sm-block">Raw</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>

            <TabContent activeTab={customActiveTab} className="p-3 text-muted">
              <TabPane tabId="1">
                <Form>
                  <FormGroup className="mb-4">
                    <Label>Default Functionality</Label>
                    <InputGroup>
                      <Flatpickr
                        className="form-control d-block"
                        placeholder="dd M,yyyy"
                        options={{
                          altInput: true,
                          altFormat: "F j, Y",
                          dateFormat: "Y-m-d",
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="form-group mb-4">
                    <Label>Auto Close</Label>
                    <InputGroup>
                      <Flatpickr
                        className="form-control d-block"
                        placeholder="dd M,yyyy"
                        options={{
                          altInput: true,
                          altFormat: "F j, Y",
                          dateFormat: "Y-m-d",
                        }}
                      />
                    </InputGroup>
                  </div>

                  <div className="form-group mb-4">
                    <label>Multiple Date</label>
                    <div className="input-group">
                      <Flatpickr
                        className="form-control d-block"
                        placeholder="dd M,yyyy"
                        options={{
                          altInput: true,
                          altFormat: "F j, Y",
                          mode: "multiple",
                          dateFormat: "Y-m-d",
                        }}
                      />
                    </div>
                  </div>

                  <FormGroup className="mb-4">
                    <Label>Date Range</Label>
                    <InputGroup>
                      <Flatpickr
                        className="form-control d-block"
                        placeholder="dd M,yyyy"
                        options={{
                          mode: "range",
                          dateFormat: "Y-m-d",
                        }}
                      />
                    </InputGroup>
                  </FormGroup>

                  <div className="form-group mb-0">
                    <label>Inline Datepicker</label>
                    <Flatpickr
                      className="form-control d-block"
                      placeholder="dd M,yyyy"
                      options={{
                        inline: true,
                        altInput: true,
                        altFormat: "F j, Y",
                        dateFormat: "Y-m-d",
                      }}
                    />
                  </div>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form>
                  <Input
                    type="textarea"
                    id="textarea"
                    maxLength={5000}
                    rows="35"
                    placeholder=""
                  />
                
                </Form>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </SimpleBar>
    </React.Fragment>
  );
};

export default NodeProperties;
