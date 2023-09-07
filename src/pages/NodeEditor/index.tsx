import React from "react";
import { Card, CardBody, Container } from "reactstrap";

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

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";

const Index = () => {
  const simpleBarRef = useRef(null);

  useEffect(
    () => {
      if (simpleBarRef.current) {
        //simpleBarRef.current.recalculate(); // Recalcula SimpleBar cuando el contenido cambia
      }
    },
    [
      /* Dependencias que desees monitorear */
    ]
  );

  /*const [messageApi, contextHolder] = message.useMessage();
  const create = useCallback(
    (el: HTMLElement) => {
      return createEditor(el, (text, type) => messageApi[type](text));
    },
    [messageApi]
  );
  const [ref] = useRete(create);*/

  const [ref] = useRete(createEditor);

  //meta title
  document.title = "Node Editor | Skote - React Admin & Dashboard Template";

  const series = [76];
  const options = {
    chart: {
      height: 150,
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#556ee6"],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
        },

        hollow: {
          size: "60%",
        },

        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "16px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    stroke: {
      dashArray: 3,
    },
    labels: ["Storage"],
  };
  const divStyle = {
    backgroundColor: "blue", // Cambia 'blue' al color que desees
    width: "200px", // Añade otros estilos según tus necesidades
    height: "100px",
    // Puedes añadir más propiedades de estilo aquí si es necesario
  };
  return (
    <React.Fragment>
      <div className="page-content" style={{ height: "100vh" }}>
        <Container fluid style={{ height: "100%" }}>
          <Breadcrumbs title="Apps" breadcrumbItem="Node Editor" />
          <div className="d-xl-flex flex-column" style={{ height: "100%" }}>
            <div className="w-100" style={{ height: "100%" }}>
              <div
                className="d-md-flex flex-column flex-md-row"
                style={{ height: "100%" }}
              >
                {/* FileLeftBar */}
                <FileLeftBar />

                {/* Div de la tarjeta */}
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

                <SimpleBar
                  style={{ maxHeight: "80vh", marginBottom: "-10px" }}
                  autoHide={true} // Configura esto según tus preferencias
                  ref={simpleBarRef}
                >
                  <Card>
                    <CardBody>
                      <h4 className="card-title">Datepicker</h4>
                      <p className="card-title-desc">
                        Examples of twitter bootstrap datepicker.
                      </p>

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
                    </CardBody>
                  </Card>
                </SimpleBar>

                {/**  <div  className="h-100"  style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                  <Card >
                    <CardBody>
                      <h4 className="card-title">Datepicker</h4>
                      <p className="card-title-desc">
                        Examples of twitter bootstrap datepicker.
                      </p>

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
                    </CardBody>
                  </Card>
                </div>*/}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Index;
