import React from "react";
import { Card, CardBody, Container } from "reactstrap";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import FileLeftBar from "./FileLeftBar";
import FileList from "./FileList";
import RecentFile from "./RecentFile";
import Storage from "./Storage";
import PropagateLoader from "react-spinners/ClipLoader";
import { useRete } from "rete-react-plugin";
import { useCallback } from "react";
import { message } from "antd";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import { SketchPicker } from "react-color";
import ColorPicker from "@vtaits/react-color-picker";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import Select from "react-select";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import SimpleBar from "simplebar-react";
import { getIntegrationById } from "../../helpers/fakebackend_helper";
import classnames from "classnames";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledAlert,
  UncontrolledDropdown,
  CardText,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledCollapse,
} from "reactstrap";

import { RestApiEndpoint } from "./rete/nodes/web-protocols/rest-api/endpoint";
import { NodeEditor, GetSchemes, ClassicPreset } from "rete";

import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_blue.css";
import { createEditor, editor, socket } from "./editor";
import { Message } from "./rete/nodes";

let nodeParameter: Message;

const Index = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [data, dataSet] = useState<any>(null);
  const simpleBarRef = useRef(null);
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [textareabadge, settextareabadge] = useState(0) as any[];

  const [paramsLabel, setParamsLabel] = useState("Datepicker");
  const [showSimpleBar, setShowSimpleBar] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);

  const handleTextareaChange = (e) => {
    const text = e.target.value;
    setTextareaValue(text);
    nodeParameter.parameters = text;
  };

  function setNodeToParameters(type: Message) {
    nodeParameter = type;
    setParamsLabel(type.label);
    setTextareaValue(nodeParameter.parameters);
    setShowSimpleBar(true);
  }

  function hideNodeParams() {
    setShowSimpleBar(false);
    setcustomActiveTab("1");
  }

  const [messageApi, contextHolder] = message.useMessage();

  const create = useCallback((el: HTMLElement) => {
    //return createEditor(el, (text, type) => messageApi[type](text));
    return createEditor(
      el,
      (type) => setNodeToParameters(type),
      () => hideNodeParams()
    );
  }, []);
  const [ref] = useRete(create);

  document.title = "Node Editor";

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      console.log("Llamada");
      let idIntegration = id || "";
      let response = await getIntegrationById(idIntegration);
      dataSet(response);
      console.log("Respuesta: " + JSON.stringify(response));
      setLoading(false); // Set loading to false
    }

    fetchMyAPI();
  }, [id]);

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

  const endpointFixSlash = (e) => {
    if (e.target.value[0] != "/") {
      e.target.value = "/" + e.target.value;
    }
  };

  return (
    <React.Fragment>
      <div className="page-content" style={{ height: "100vh" }}>
        <Container fluid style={{ height: "100%" }}>
          <Breadcrumbs
            title="Interconnectivity"
            //breadcrumbItem={"Node Editor - " + data.projectName}
            customRoute="Node Editor"
          />
          <div className="d-xl-flex flex-column" style={{ height: "100%" }}>
            <div className="w-100" style={{ height: "100%" }}>
              <div
                className="d-md-flex flex-column flex-md-row"
                style={{ height: "100%" }}
              >
                <FileLeftBar />

                <div
                  ref={ref}
                  className="w-100"
                  style={{
                    flex: "1",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                ></div>

                {showSimpleBar && (
                  <SimpleBar
                    style={{ maxHeight: "80vh", marginBottom: "-10px" }}
                    autoHide={true} // Configura esto según tus preferencias
                    ref={simpleBarRef}
                  >
                    <Card>
                      <CardBody>
                        <h4 className="card-title">{paramsLabel}</h4>
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

                        <TabContent
                          activeTab={customActiveTab}
                          className="p-3 text-muted"
                        >
                          <TabPane tabId="1">
                            <Form>
                              <div className="form-group mb-4">
                                <Label>Endpoint</Label>
                                <Input
                                  name="optionalEnviroments"
                                  type="text"
                                  hint="asd"
                                  onChange={endpointFixSlash}
                                />
                              </div>

                              <div className="form-group mb-4">
                                <Label>Method</Label>
                                <Input
                                  name="mainEnviroment"
                                  type="select"
                                  className="form-select"
                                >
                                  <option></option>
                                  <option>GET</option>
                                  <option>POST</option>
                                  <option>PUT</option>
                                  <option>PATH</option>
                                  <option>DELETE</option>
                                  <option>COPY</option>
                                  <option>HEAD</option>
                                  <option>OPTIONS</option>
                                  <option>LINK</option>
                                  <option>UNLINK</option>
                                  <option>PURGE</option>
                                  <option>LOCK</option>
                                  <option>UNLOCK</option>
                                  <option>PROPFIND</option>
                                  <option>VIEW</option>
                                </Input>
                              </div>

                              <div
                                style={{
                                  borderBottom: "2px solid black",
                                  display: "inline-block",
                                  width: "100%",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <Label
                                  style={{
                                    color: "black",
                                    fontSize: "15px",
                                    marginBottom: "-10px",
                                  }}
                                >
                                  {" "}
                                  Authentication{" "}
                                </Label>{" "}
                              </div>

                              <div className="form-group mb-4">
                                <Label>Method</Label>
                                <Input
                                  name="mainEnviroment"
                                  type="select"
                                  className="form-select"
                                >
                                  <option>No Auth</option>
                                  <option>API Key</option>
                                  <option>Bearer Token</option>
                                  <option>Basic Auth</option>
                                  <option>Digest Auth</option>
                                </Input>
                              </div>


                              <div
                                style={{
                                  borderBottom: "2px solid black",
                                  display: "inline-block",
                                  width: "100%",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <Label
                                  style={{
                                    color: "black",
                                    fontSize: "15px",
                                    marginBottom: "-10px",
                                  }}
                                >
                                  {" "}
                                  Response{" "}
                                </Label>{" "}
                              </div>

                              <div className="form-group mb-4">
                                <Label>Method</Label>
                                <Input
                                  name="mainEnviroment"
                                  type="select"
                                  className="form-select"
                                >
                                  <option>No Auth</option>
                                  <option>API Key</option>
                                  <option>Bearer Token</option>
                                  <option>Basic Auth</option>
                                </Input>
                              </div>

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
                                value={textareaValue}
                                onChange={handleTextareaChange}
                                // Asignar la referencia
                                ref={textareaRef}
                              />
                            </Form>
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                  </SimpleBar>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Index;
