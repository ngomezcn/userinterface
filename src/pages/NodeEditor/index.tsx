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
import { createEditor, editor, socket, area, nodeEditorConnections, nodeEditorNodes } from "./editor";
import { Message } from "./rete/nodes";
import { replace } from "lodash";
import LabelSubTitle from "./params-subtitle";
import EndpointParameter from "./endpointParameter";
import {
  getModelListById,
  putIntegration,
} from "../../helpers/fakebackend_helper";
import { useNavigate } from "react-router-dom";

const integrationModels: string[] = [
  "Clientes",
  "Proveedores",
  "Artículos",
  "Facturas de venta",
  "Pedidos de compra",
  "Inventarios",
  "Documentos de marketing",
  "Asientos contables",
  "Informe de ventas",
  "Informe de compras",
  // Agrega más elementos según tus necesidades
];

const generics: string[] = ["List<_TYPE_>"];

const varStyle = {
  fontWeight: "bold",
  color: "green",
  fontFamily: '"Consolas", monospace',
};

const hardCodeStyle = {
  fontWeight: "normal",
  color: "black",
  fontFamily: '"Consolas", monospace',
};

const initialInputState = {
  endpoint: {
    value: "",
    style: hardCodeStyle,
  },
  method: {
    value: "",
    style: hardCodeStyle,
  },
  apiKey: {
    value: "",
    style: hardCodeStyle,
  },
  apiKeyValue: {
    value: "",
    style: hardCodeStyle,
  },
};

let nodeParameter: Message;

let dataToImport : any

const Index = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, dataSet] = useState<any>(null);
  const simpleBarRef = useRef(null);
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [textareabadge, settextareabadge] = useState(0) as any[];

  const [paramsLabel, setParamsLabel] = useState("Datepicker");
  const [showSimpleBar, setShowSimpleBar] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);
  const [selectedAuthType, setSelectedMethod] = useState("No Auth");
  const [isNodeEndpoint, setIsNodeEndpoint] = useState(true);

  const [inputValue, setInputValue] = useState("");

  const [inputStyles, setInputStyles] = useState(hardCodeStyle);
  const [inputStates, setInputStates] = useState(initialInputState);
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState<string[]>([]);

  async function saveNodeEditor() {

    if(nodeEditorNodes != undefined && nodeEditorConnections != undefined)
    {

      data.nodes = nodeEditorNodes as string
      data.connections = nodeEditorConnections as string

      console.log("data.nodes " + data.nodes)
      //console.log("data.connection " + data.nodes)

      try {
        //console.log(JSON.stringify(data, null, 2));
      } catch (error) {
        //console.log(data);
      }

      try {
        let response = await putIntegration(data);
        window.location.reload();
      } catch (error) {
        throw(error)
      }
    } else{
      console.log("cannot send is undefined!")
    }
  }

  const addInput = (value) => {
    let node = nodeParameter as ClassicPreset.Node;
    let xd = node.addOutput(value, new ClassicPreset.Output(socket));
    area.update("node", node.id);
    setInputs([...inputs, value]);
  };

  const forceUpdate = () => {
    setCount(count + 1);
  };

  const handleAuthTypeChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleTextareaChange = (e) => {
    const text = e.target.value;
    setTextareaValue(text);
    nodeParameter.parameters = text;
  };

  function setNodeToParameters(type: Message) {
    if (type.node_name_id) {
      setIsNodeEndpoint(false);
    } else {
      setIsNodeEndpoint(true);
    }

    nodeParameter = type;
    setParamsLabel(type.label);
    setTextareaValue(nodeParameter.parameters);
    setShowSimpleBar(true);
  }

  function hideNodeParams() {
    setShowSimpleBar(false);
    setcustomActiveTab("1");
  }

  const create = useCallback((el: HTMLElement) => {
    //return createEditor(el, (text, type) => messageApi[type](text));
    return createEditor(
      el,
      (type) => setNodeToParameters(type),
      () => hideNodeParams(),
      () => getImportData(),
    );
  }, []);
  const [ref] = useRete(create);

  document.title = "Node Editor";

  function getImportData() : string[]
  {
    return [dataToImport.nodes as string, dataToImport.connections as string];
  }

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      let idIntegration = id || "";
      let response = await getIntegrationById(idIntegration);
      dataToImport = response
      await dataSet(response);
      //console.log("Respuesta: " + JSON.stringify(response));
      
      if(response.status == 204)
      {
        navigate(`/pages-404`)
        console.log("wtf")
      }

      setLoading(false); // Set loading to false
      forceUpdate();
    }

    fetchMyAPI();
  }, [id]);

  const handleChange = (e, fieldName) => {
    let text = e.target.value;
    const newState = { ...inputStates };

    // Cambia el estilo según el contenido del input
    if (text.startsWith("{") && text.endsWith("}")) {
      newState[fieldName].style = varStyle;
      text = text.replace("{{", "{");
      text = text.replace("}}", "}");
    } else {
      newState[fieldName].style = hardCodeStyle;
    }

    newState[fieldName].value = text;
    setInputStates(newState);
  };

  const endpointFixSlash = (e) => {
    const fieldName = "endpoint";

    let text = e.target.value;
    const newState = { ...inputStates };

    if (text.startsWith("{") && text.endsWith("}")) {
      newState[fieldName].style = varStyle;
      text = text.replace("{{", "{");
      text = text.replace("}}", "}");
    } else {
      if (text[0] != "/" && text[0] != "{") {
        text = "/" + text;
        newState[fieldName].style = hardCodeStyle;
      }
    }
    if (text == "/") {
      text = "";
    }
    text = text.replace("//", "/");

    newState[fieldName].value = text;
    setInputStates(newState);
  };

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

  const handleRemoveInput = (indexToRemove) => {
    const a = inputs.filter((_, index) => index !== indexToRemove);
    setInputs(a);
  };

  return (
    <React.Fragment>
      <div className="page-content" style={{ height: "100vh" }}>
        <Container fluid style={{ height: "100%" }}>
          <Breadcrumbs
            title="Interconnectivity"
            breadcrumbItem={"Node Editor - " + data.projectName}
            customRoute="Node Editor"
          />
          <div className="d-xl-flex flex-column" style={{ height: "100%" }}>
            <div className="w-100" style={{ height: "100%" }}>
              <div
                className="d-md-flex flex-column flex-md-row"
                style={{ height: "100%" }}
              >
                <FileLeftBar saveNodeEditor={saveNodeEditor}/>

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
                            {isNodeEndpoint === true && (
                              <p style={{ height: "700px", width: "310px" }}>Not implemented</p>
                            )}

                            {isNodeEndpoint === false && (
                              <Form>
                                <div className="form-group mb-2">
                                  <Label>Endpoint</Label>
                                  <Input
                                    name="optionalEnviroments"
                                    type="text"
                                    value={inputStates.endpoint.value}
                                    onChange={(e) => {
                                      endpointFixSlash(e);
                                    }}
                                    style={inputStates.endpoint.style}
                                  />
                                </div>

                                <div className="form-group mb-2">
                                  <Label>Method</Label>
                                  <Input
                                    name="mainEnviroment"
                                    type="select"
                                    className="form-select"
                                    value={inputStates.method.value}
                                    onChange={(e) => handleChange(e, "method")}
                                    style={inputStates.method.style}
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

                                <LabelSubTitle text={"Authentication"} />

                                <div className="form-group mb-2">
                                  <Label>Type</Label>
                                  <Input
                                    name="mainEnviroment"
                                    type="select"
                                    className="form-select"
                                    value={selectedAuthType}
                                    onChange={handleAuthTypeChange}
                                  >
                                    <option>No Auth</option>
                                    <option>API Key</option>
                                    <option>Bearer Token</option>
                                    <option>Basic Auth</option>
                                    <option>Digest Auth</option>
                                    <option>Custom code</option>
                                  </Input>
                                </div>

                                {selectedAuthType === "API Key" && (
                                  <div>
                                    <div className="form-group mb-2">
                                      <Label>Key</Label>
                                      <Input
                                        name="optionalEnviroments"
                                        type="text"
                                        value={inputStates.apiKey.value}
                                        onChange={(e) =>
                                          handleChange(e, "apiKey")
                                        }
                                        style={inputStates.apiKey.style}
                                      />
                                    </div>
                                    <div className="form-group mb-2">
                                      <Label>Value</Label>
                                      <Input
                                        name="optionalEnviroments"
                                        type="text"
                                        value={inputStates.apiKeyValue.value}
                                        onChange={(e) =>
                                          handleChange(e, "apiKeyValue")
                                        }
                                        style={inputStates.apiKeyValue.style}
                                      />
                                    </div>
                                    <div className="form-group mb-2">
                                      <Label>From</Label>
                                      <Input
                                        name="mainEnviroment"
                                        type="select"
                                        className="form-select"
                                      >
                                        <option>Header</option>
                                        <option>Query Params</option>
                                      </Input>
                                    </div>
                                  </div>
                                )}

                                {selectedAuthType === "Bearer Token" && (
                                  <div>
                                    <div className="form-group mb-2">
                                      <Label>Token</Label>
                                      <Input
                                        name="optionalEnviroments"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                )}

                                <LabelSubTitle text="Parameters" />

                                <div
                                  className="mt-auto"
                                  style={{ marginBottom: "15px" }}
                                >
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      className="btn btn-soft-primary w-100"
                                      type="button"
                                    >
                                      Add
                                    </DropdownToggle>
                                    <DropdownMenu>
                                      <DropdownItem
                                        href="#"
                                        onClick={() => addInput("From Body")}
                                      >
                                        <i className="bx bx-certification me-1"></i>
                                        From Body
                                      </DropdownItem>
                                      <DropdownItem
                                        href="#"
                                        onClick={() => addInput("From Header")}
                                      >
                                        <i className="bx bx-dock-top me-1"></i>
                                        From Header
                                      </DropdownItem>
                                      <DropdownItem
                                        href="#"
                                        onClick={() => addInput("From Query")}
                                      >
                                        <i className="bx bx-voicemail me-1"></i>
                                        From Query
                                      </DropdownItem>
                                      <DropdownItem
                                        href="#"
                                        onClick={() => addInput("From Form")}
                                      >
                                        <i className="bx bxs-notepad me-1"></i>
                                        From Form
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>

                                <EndpointParameter
                                  menuInputs={inputs}
                                  generics={generics}
                                  integrationModels={integrationModels}
                                  removeInput={handleRemoveInput}
                                />

                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
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
                            )}
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
