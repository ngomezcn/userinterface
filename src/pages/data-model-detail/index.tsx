import React from "react";
import { Card, CardBody, Container } from "reactstrap";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import PropagateLoader from "react-spinners/ClipLoader";
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
import {
  getModelListById,
  putDataModel,
} from "../../helpers/fakebackend_helper";
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

import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_blue.css";
import { replace } from "lodash";

const DataModelDetail = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, dataSet] = useState<any>(null);
  const [textareaValue, setTextareaValue] = useState("");

  document.title = "Model Detail";

  const handleTextareaChange = (e) => {
    const text = e.target.value;

    data.schema = text;
    setTextareaValue(text);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      let idIntegration = id || "";
      let response = await getModelListById(idIntegration);

      try {
        response.schema = JSON.stringify(JSON.parse(response.schema), null, 2);
      } catch (error) {}

      dataSet(response);
      setLoading(false);
      setTextareaValue(response.schema);
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

  async  function  patchDataModel() {
    data.schema = data.schema.split(" ").join("");

    try {
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(data);
    }

    try {
      let response = await putDataModel(data);
      window.location.reload();
    } catch (error) {
      throw(error)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content" style={{ height: "100vh" }}>
        <Container fluid style={{ height: "100%" }}>
          <Breadcrumbs
            title="Interconnectivity"
            breadcrumbItem={"Model detail - " + data.name}
            customRoute="Model detail"
          />
          <div className="d-xl-flex flex-column" style={{ height: "100%" }}>
            <div className="w-100" style={{ height: "100%" }}>
              <Button color="success" className="mb-1" onClick={patchDataModel}>
                Guardar
              </Button>
              <Form>
                <Input
                  className="scrollable-textarea"
                  type="textarea"
                  id="textarea"
                  maxLength={50000}
                  rows="35"
                  placeholder=""
                  value={textareaValue}
                  onChange={handleTextareaChange}
                />
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default DataModelDetail;
