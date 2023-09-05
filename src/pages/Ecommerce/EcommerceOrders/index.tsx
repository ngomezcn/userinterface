
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../Components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//import components
import Breadcrumbs from '../../../Components/Common/Breadcrumb';
import DeleteModal from '../../../Components/Common/DeleteModal';

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "slices/thunk";

import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod
}
  from "./EcommerceOrderCol";

//redux
import { useSelector, useDispatch } from "react-redux";
import EcommerceOrdersModal from "./EcommerceOrdersModal";

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
  FormGroup
} from "reactstrap";
import moment from "moment";
import Pagination from "Components/Common/Pagination";
import { createSelector } from 'reselect';

function EcommerceOrder() {

  //meta title
  document.title = "Orders | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch<any>();
 const selectProperties = createSelector(
    (state: any) => state.ecommerce,
    (ecommerce) => ({
      orders: ecommerce.orders
    })
  );
  const { orders } = useSelector(selectProperties);

  const [modal, setModal] = useState<boolean>(false);
  const [modal1, setModal1] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(null);
  const [currentpages, setCurrentpages] = useState<any>();

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderId: (order && order.orderId) || '',
      billingName: (order && order.billingName) || '',
      orderdate: (order && order.orderdate) || '',
      total: (order && order.total) || '',
      paymentStatus: (order && order.paymentStatus) || 'Paid',
      badgeclass: (order && order.badgeclass) || 'success',
      paymentMethod: (order && order.paymentMethod) || 'Mastercard',
    },
    validationSchema: Yup.object({
      orderId: Yup.string().required("Please Enter Your Order Id"),
      billingName: Yup.string().required("Please Enter Your Billing Name"),
      orderdate: Yup.string().required("Please Enter Your Order Date"),
      total: Yup.string().required("Total Amount"),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
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
        };

        console.log(newOrder)

        // save new order
        dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      }
      toggle();
    },
  });


  const toggleViewModal = useCallback(() => setModal1(!modal1), [modal1]);

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders());
    }
  }, [dispatch, orders]);

  useEffect(() => {
    setCurrentpages(orders)
  }, [orders])

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleOrderClick = useCallback((arg: any) => {
    const order = arg;
    setOrder({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
    });
    setIsEdit(true);

    toggle();
  }, [toggle]);

  //delete order
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onClickDelete = (order: any) => {
    setOrder(order);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (order.id) {
      dispatch(onDeleteOrder(order.id));
      setDeleteModal(false);
    }
  };
  const handleOrderClicks = () => {
    setIsEdit(false);
    setOrder("")
    toggle();
  };

  const columns = useMemo(
    () => [
      {
        Header: () => {
          return (
            <FormGroup check className="font-size-16">
              <Label check>
                <Input type="checkbox" id="checkAll" />
              </Label>
            </FormGroup>
          )
        },
        id: "#",
        accessor: () => (
          <FormGroup check className="font-size-16">
            <Label check>
              <Input type="checkbox" id="checkAll" />
            </Label>
          </FormGroup>
        ),
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: false,
        disableSortBy: true,
        Filter: false,
      },
      {
        Header: 'Order ID',
        accessor: 'orderId',
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <OrderId {...cellProps} />;
        }
      },
      {
        Header: 'Billing Name',
        accessor: 'billingName',
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <BillingName {...cellProps} />;
        }
      },
      {
        Header: 'Date',
        accessor: 'orderdate',
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Date {...cellProps} />;
        }
      },
      {
        Header: 'Total',
        accessor: 'total',
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Total {...cellProps} />;
        }
      },
      {
        Header: 'Payment Status',
        accessor: 'paymentStatus',
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <PaymentStatus {...cellProps} />;
        }
      },
      {
        Header: 'Payment Method',
        accessor: 'paymentMethod',
        Filter: false,
        Cell: (cellProps: any) => {
          return <PaymentMethod {...cellProps} />;
        }
      },
      {
        Header: 'View Details',
        accessor: 'view',
        Filter: false,
        Cell: () => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={toggleViewModal}
            >
              View Details
            </Button>);
        }
      },
      {
        Header: 'Action',
        accessor: 'action',
        Filter: false,
        Cell: (cellProps: any) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  handleOrderClick(orderData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickDelete(orderData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        }
      },
    ],
    [handleOrderClick, toggleViewModal]
  );

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    tableClass="align-middle table-nowrap table-check"
                    theadClass="table-light"
                    data={currentpages || []}
                    isGlobalFilter={true}
                    isAddOptions={true}
                    customPageSizeOption={true}
                    handleOrderClicks={handleOrderClicks}
                    customPageSize={10}
                  />
                </CardBody>
                <Pagination
                  perPageData={10}
                  data={orders}
                  setCurrentpages={setCurrentpages}
                  currentpages={currentpages}
                />
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Order" : "Add Order"}
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
                      <Label>Order Id</Label>
                      <Input
                        name="orderId"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.orderId || ""}
                        invalid={
                          validation.touched.orderId && validation.errors.orderId ? true : false
                        }
                      />
                      {validation.touched.orderId && validation.errors.orderId ? (
                        <FormFeedback type="invalid">{validation.errors.orderId}</FormFeedback>
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
                          validation.touched.billingName && validation.errors.billingName ? true : false
                        }
                      />
                      {validation.touched.billingName && validation.errors.billingName ? (
                        <FormFeedback type="invalid">{validation.errors.billingName}</FormFeedback>
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
                          dateFormat: 'd M, Y',
                        }}
                        onChange={(kycbirthDate: any) => validation.setFieldValue("orderdate", moment(kycbirthDate[0]).format("DD MMMM ,YYYY"))}
                        value={validation.values.orderdate || ''}
                      />
                      {validation.touched.orderdate && validation.errors.orderdate ? (
                        <span className="text-danger">{validation.errors.orderdate}</span>
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
                          validation.touched.total && validation.errors.total ? true : false
                        }
                      />
                      {validation.touched.total && validation.errors.total ? (
                        <FormFeedback type="invalid">{validation.errors.total}</FormFeedback>
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
                        value={
                          validation.values.paymentStatus || ""
                        }
                      >
                        <option>Paid</option>
                        <option>Chargeback</option>
                        <option>Refund</option>
                      </Input>
                      {validation.touched.paymentStatus && validation.errors.paymentStatus ? (
                        <FormFeedback type="invalid">{validation.errors.paymentStatus}</FormFeedback>
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
                        value={
                          validation.values.paymentMethod || ""
                        }
                      >
                        <option>Mastercard</option>
                        <option>Visa</option>
                        <option>Paypal</option>
                        <option>COD</option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button
                        type="submit"
                        color="success"
                        className="save-user"
                      >
                        {!!isEdit ? "Update" : "Add"}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
}
export default EcommerceOrder;