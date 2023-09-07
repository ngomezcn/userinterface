import React from "react";
import { Card, CardBody, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

// import Component
import FileLeftBar from "./FileLeftBar";
import NodeProperties from "./NodeProperties";
import FileList from "./FileList";
import RecentFile from "./RecentFile";
import Storage from "./Storage";
import PropagateLoader from "react-spinners/ClipLoader";

import { createEditor, editor } from "./editor";
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
import { Link } from "react-router-dom";

import { getIntegrationById } from "../../helpers/fakebackend_helper";

const Index = () => {
  //const [data, setData] = useState(null); // Estado para almacenar los datos de la API
  const [loading, setLoading] = useState(true); // Estado de carga
  const { id } = useParams();
  const [data, dataSet] = useState<any>(null);
  const [ref] = useRete(createEditor);
  document.title = "Node Editor";

  useEffect(() => {
    // Realiza una llamada a la API utilizando el parámetro 'id'
    // Reemplaza 'apiUrl' con la URL real de tu punto de acceso de la API
    async function fetchMyAPI() {
      //let response = await fetch('api/data')
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

  return (
    <React.Fragment>
      <div className="page-content" style={{ height: "100vh" }}>
        <Container fluid style={{ height: "100%" }}>
          <Breadcrumbs
            title="Interconnectivity"
            breadcrumbItem={"Node Editor - " + data.projectName}
            customRoute = "Node Editor"
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

                <NodeProperties />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Index;
