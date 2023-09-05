import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import JobFilter from "./JobFilter";
import JobData from "./JobData";
import { useDispatch, useSelector } from "react-redux";
//import { getJobGrid as onGetJobGrid } from 'slices/thunk';
import { getIntegrationTemplates as onGetIntegrationTemplates } from "slices/thunk";
import Pagination from "Components/Common/Pagination";
import { createSelector } from "reselect";

import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../../Components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//import components
import DeleteModal from "../../Components/Common/DeleteModal";

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "slices/thunk";

//redux
//import EcommerceOrdersModal from "./EcommerceOrdersModal";

import {
  Button,
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  FormGroup,
} from "reactstrap";
import moment from "moment";

import { useNavigate } from "react-router-dom";

import { addNewIntegration as addNewIntegrationApi } from "../../helpers/fakebackend_helper";

const IntegrationsTemplates = () => {
  document.title = "Integration Templates";

  const [modal, setModal] = useState<boolean>(false);
  const [modal1, setModal1] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(null);
  const [currentpages, setCurrentpages] = useState<any>();

  const dispatch = useDispatch<any>();

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderId: (order && order.orderId) || "",
      billingName: (order && order.billingName) || "",
      orderdate: (order && order.orderdate) || "",
      total: (order && order.total) || "",
      paymentStatus: (order && order.paymentStatus) || "Paid",
      badgeclass: (order && order.badgeclass) || "success",
      paymentMethod: (order && order.paymentMethod) || "Mastercard",

      projectName: (order && order.projectName) || "",
      description: (order && order.description) || "",
      mainEnviroment: (order && order.mainEnviroment) || "",
      optionalEnviroments: (order && order.optionalEnviroments) || "",
    },
    validationSchema: Yup.object({
      /*orderId: Yup.string().required("Please Enter Your Order Id"),
      billingName: Yup.string().required("Please Enter Your Billing Name"),
      orderdate: Yup.string().required("Please Enter Your Order Date"),
      total: Yup.string().required("Total Amount"),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),*/

      projectName: Yup.string().required(
        "Please Enter Your Payment Project Name"
      ),
      mainEnviroment: Yup.string().required(
        "Please Enter Your Main Enviroment"
      ),
    }),
    onSubmit: (values: any) => {
      if (isEdit) {
        const updateOrder = {
          id: order ? order.id : 0,
          orderId: values.orderId,
          billingName: values.billingName,
          orderdate: values.orderdate,
          total: values.total,
          paymentStatus: values.paymentStatus,
          paymentMethod: values.paymentMethod,
          badgeclass: values.badgeclass,

          projectName: values.projectName,
          description: values.description,
          mainEnviroment: values.mainEnviroment,
          optionalEnviroments: values.optionalEnviroments,
        };
        // update order
        dispatch(onUpdateOrder(updateOrder));
        validation.resetForm();
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          orderId: values["orderId"],
          billingName: values["billingName"],
          orderdate: values["orderdate"],
          total: values["total"],
          paymentStatus: values["paymentStatus"],
          paymentMethod: values["paymentMethod"],
          badgeclass: values["badgeclass"],

          projectName: values["projectName"],
          description: values["description"],
          mainEnviroment: values["mainEnviroment"],
          optionalEnviroments: values["optionalEnviroments"],
        };

        console.log(newOrder);

        // save new order
        //dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      }
      toggle();
    },
  });

  /*const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      projectName: (order && order.projectName) || "",
      description: (order && order.description) || "",
      optionalEnviroments: (order && order.optionalEnviroments) || "",
      mainEnviroment: (order && order.mainEnviroment) || "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Please Enter Your Project Name"),
      mainEnviroment: Yup.string().required("Please Enter Your Enviroment"),
    }),
    onSubmit: (values: any) => {
      /*try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        const newIntegration = {
          projectName: values.projectName,
          description: values.description,
          mainEnviroment: values.mainEnviroment,
          optionalEnviroments: values.optionalEnviroments,
          date: formattedDate,
        };

        // Realiza la solicitud a la API y espera la respuesta
        const response = await addNewIntegrationApi(newIntegration);

        // Asegúrate de que la respuesta sea un objeto válido
        if (response && response.data) {
          const newOrderData = response.data;
          console.log(newOrderData);

          // Redirige a la página correspondiente
          navigate(`/order/${newOrderData.id}`);

          // Reinicia el formulario
          validation.resetForm();
          toggle();
        } else {
          console.error("Respuesta de API inválida");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      const currentDate: Date = new Date();
      const formattedDate: string = currentDate.toISOString();

      const newIntegration = {
        projectName: values["projectName"],
        description: values["description"],
        mainEnviroment: values["mainEnviroment"],
        optionalEnviroments: values["optionalEnviroments"],
        date: formattedDate,
      };
      console.log("QUE COJONES")
      console.log(order)
      console.log(JSON.stringify(newIntegration));
      console.log(newIntegration)
      console.log("QUE COJONES")

      //console.log(values)
      dispatch(onAddNewOrder(newIntegration));
      validation.resetForm();
      toggle();
    },
  });*/

  const selectProperties = createSelector(
    (state: any) => state.jobs,
    (jobs) => ({
      jobdata: jobs.jobGrid,
    })
  );
  const { jobdata } = useSelector(selectProperties);
  const [jobGrid, setJobGrid] = useState<any>();

  useEffect(() => {
    dispatch(onGetIntegrationTemplates());
  }, [dispatch]);

  useEffect(() => {
    setJobGrid(jobdata);
  }, [jobdata]);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleOrderClicks = () => {
    setOrder("");
    toggle();
  };

  const [textareabadge, settextareabadge] = useState(0) as any[];
  const [textcount, settextcount] = useState(0);

  function textareachange(event: any) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="" breadcrumbItem="Integration Templates" />

          <JobFilter
            setJobGrid={setJobGrid}
            jobdata={jobdata}
            toggleModal={handleOrderClicks}
          />
          <JobData jobGrid={jobGrid} />
          <Pagination
            perPageData={8}
            data={jobdata}
            setCurrentpages={setJobGrid}
            currentpages={jobGrid}
          />
        </Container>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} tag="h4">
            New Project
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Row>
                <Col xs={12}>
                  <div className="mb-3">
                    <Label>Project Logo</Label>
                    <Input className="form-control" type="file" id="formFile" />
                  </div>

                  <div className="mb-3">
                    <Label>Project Name</Label>
                    <Input
                      name="projectName"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.projectName || ""}
                      invalid={
                        validation.touched.projectName &&
                        validation.errors.projectName
                          ? true
                          : false
                      }
                    />
                    {validation.touched.projectName &&
                    validation.errors.projectName ? (
                      <FormFeedback type="invalid">
                        {validation.errors.projectName}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label>Description</Label>
                    <Input
                      name="description"
                      type="textarea"
                      id="textarea"
                      onChange={(e) => {
                        textareachange(e);
                        validation.handleChange(e);
                      }}
                      onBlur={validation.handleBlur}
                      value={validation.values.description || ""}
                      maxLength={80}
                      rows="3"
                      placeholder="This textarea has a limit of 225 chars."
                    />
                    {textareabadge ? (
                      <span className="badgecount badge bg-success">
                        {" "}
                        {textcount} / 80{" "}
                      </span>
                    ) : null}
                    {validation.touched.description &&
                    validation.errors.description ? (
                      <FormFeedback type="invalid">
                        {validation.errors.description}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label>Main Enviroment</Label>
                    <Input
                      name="mainEnviroment"
                      type="select"
                      className="form-select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.mainEnviroment || ""}
                      invalid={
                        validation.touched.mainEnviroment &&
                        validation.errors.mainEnviroment
                          ? true
                          : false
                      }
                    >
                      <option></option>
                      <option>Desarrollo RS_ATP_TEST</option>
                      <option>NextGen B1 Dev</option>
                      <option>Cloud B1 Pruebas</option>
                      <option>Testing</option>
                    </Input>
                    {validation.touched.mainEnviroment &&
                    validation.errors.mainEnviroment ? (
                      <FormFeedback type="invalid">
                        {validation.errors.mainEnviroment}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label>Optional Enviroments</Label>
                    <Input
                      name="optionalEnviroments"
                      type="text"
                      validate={{
                        required: { value: true },
                      }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.optionalEnviroments || ""}
                    />
                  </div>

                  {/*<div className="mb-3">
                    <Label>Order Id</Label>
                    <Input
                      name="orderId"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.orderId || ""}
                      invalid={
                        validation.touched.orderId && validation.errors.orderId
                          ? true
                          : false
                      }
                    />
                    {validation.touched.orderId && validation.errors.orderId ? (
                      <FormFeedback type="invalid">
                        {validation.errors.orderId}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Billing Name</Label>
                    <Input
                      name="billingName"
                      type="text"
                      validate={{
                        required: { value: true },
                      }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.billingName || ""}
                      invalid={
                        validation.touched.billingName &&
                        validation.errors.billingName
                          ? true
                          : false
                      }
                    />
                    {validation.touched.billingName &&
                    validation.errors.billingName ? (
                      <FormFeedback type="invalid">
                        {validation.errors.billingName}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Order Date</Label>
                    <Flatpickr
                      className="form-control d-block"
                      id="orderdate"
                      name="orderdate"
                      placeholder="Select date"
                      options={{
                        mode: "single",
                        dateFormat: "d M, Y",
                      }}
                      onChange={(kycbirthDate: any) =>
                        validation.setFieldValue(
                          "orderdate",
                          moment(kycbirthDate[0]).format("DD MMMM ,YYYY")
                        )
                      }
                      value={validation.values.orderdate || ""}
                    />
                    {validation.touched.orderdate &&
                    validation.errors.orderdate ? (
                      <span className="text-danger">
                        {validation.errors.orderdate}
                      </span>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Total</Label>
                    <Input
                      name="total"
                      type="number"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.total || ""}
                      invalid={
                        validation.touched.total && validation.errors.total
                          ? true
                          : false
                      }
                    />
                    {validation.touched.total && validation.errors.total ? (
                      <FormFeedback type="invalid">
                        {validation.errors.total}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Total</Label>
                    <Input
                      name="paymentStatus"
                      type="select"
                      className="form-select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.paymentStatus || ""}
                    >
                      <option>Paid</option>
                      <option>Chargeback</option>
                      <option>Refund</option>
                    </Input>
                    {validation.touched.paymentStatus &&
                    validation.errors.paymentStatus ? (
                      <FormFeedback type="invalid">
                        {validation.errors.paymentStatus}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label>Payment Method</Label>
                    <Input
                      name="paymentMethod"
                      type="select"
                      className="form-select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.paymentMethod || ""}
                    >
                      <option>Mastercard</option>
                      <option>Visa</option>
                      <option>Paypal</option>
                      <option>COD</option>
                    </Input>
                    </div>*/}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-end">
                    <Button type="submit" color="success" className="save-user">
                      {!!isEdit ? "Update" : "Add"}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default IntegrationsTemplates;
