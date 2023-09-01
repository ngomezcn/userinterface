import React, { useEffect, useState, useMemo, useCallback } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
  Input,
  FormFeedback,
  Label,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "../../../slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

// Column
import {
  UserName,
  Address,
  Rating,
  WalletBalances,
  JoiningDate,
} from "./EcommerceCustCol";
import { PatternFormat } from "react-number-format";


//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import Pagination from "Components/Common/Pagination";
import { createSelector } from 'reselect';

const EcommerceCustomers = () => {
  //meta title
  document.title = "Customers | Skote - React Admin & Dashboard Template";

  const dispatch: any = useDispatch();

 const selectProperties = createSelector(
    (state: any) => state.ecommerce,
    (ecommerce) => ({
      customers: ecommerce.customers
    })
  );

  const { customers }: any = useSelector(selectProperties);

  const [currentpages, setCurrentpages] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>(null);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  // validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: (customer && customer.username) || "",
      email: (customer && customer.email) || "",
      phone: (customer && customer.phone) || "",
      address: (customer && customer.address) || "",
      rating: (customer && customer.rating) || "",
      walletBalance: (customer && customer.walletBalance) || "",
      joiningDate: (customer && customer.joiningDate) || "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Name"),
      email: Yup.string().email().required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone"),
      address: Yup.string().required("Please Enter Your Address"),
      rating: Yup.number().min(0).max(4).required("Please Enter Your Rating"),
      walletBalance: Yup.number().required("Please Enter Your Wallet Balance"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
    }),
    onSubmit: (values: any) => {

      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          username: values.username,
          email: values.email,
          phone: values.phone,
          address: values.address,
          rating: values.rating,
          walletBalance: values.walletBalance,
          joiningDate: values.joiningDate,
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
      } else {
        const newCustomer = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          username: values["username"],
          email: values["email"],
          phone: values["phone"],
          address: values["address"],
          rating: values["rating"],
          walletBalance: values["walletBalance"],
          joiningDate: values['joiningDate'],
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
      }
      toggle();
    },
  });

  const handleCustomerClick = useCallback((arg: any) => {
    const customer = arg;

    setCustomer({
      id: customer.id,
      username: customer.username,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      rating: customer.rating,
      walletBalance: customer.walletBalance,
      joiningDate: customer.joiningDate,
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

  // Customber Column
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" className="form-check-input" />;
        },
        Filter: false,
        filterable: false,
      },
      {
        Header: "Username",
        accessor: "username",
        filterable: false,
        Filter: false,
        Cell: (cellProps: any) => {
          return <UserName {...cellProps} />;
        },
      },
      {
        Header: "Phone",
        accessor: "phone",
        filterable: false,
        Filter: false,
        Cell: (cell: any) => {
          return (
            <>
              <p className="mb-1">{cell.row.original.phone}</p>
              <p className="mb-0">{cell.row.original.email}</p>
            </>
          );
        },
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: false,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Address {...cellProps} />;
        },
      },
      {
        Header: "Rating",
        accessor: "rating",
        filterable: false,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Rating {...cellProps} />;
        },
      },
      {
        Header: "Wallet Balances",
        accessor: "walletBalance",
        filterable: false,
        Filter: false,
        Cell: (cellProps: any) => {
          return <WalletBalances {...cellProps} />;
        },
      },
      {
        Header: "Joining Date",
        accessor: "joiningDate",
        filterable: false,
        Filter: false,
        Cell: (cellProps: any) => {
          return <JoiningDate {...cellProps} />;
        },
      },
      {
        Header: "Action",
        Filter: false,
        filterable: false,
        Cell: (cellProps: any) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" href="#" className="card-drop"> <i className="mdi mdi-dots-horizontal font-size-18"></i></DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  href="#"
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    handleCustomerClick(customerData);
                  }}>
                  <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i> Edit
                  <UncontrolledTooltip placement="top" target="edittooltip"> Edit </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  href="#"
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    onClickDelete(customerData);
                  }} >
                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="deletetooltip" ></i>Delete
                  <UncontrolledTooltip placement="top" target="deletetooltip"> Delete</UncontrolledTooltip>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    [handleCustomerClick]
  );

  //delete customer
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onClickDelete = (customer: any) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer.id));
    }
    setDeleteModal(false);
  };

  useEffect(() => {
    dispatch(onGetCustomers());
  }, [dispatch]);

  useEffect(() => {
    setCurrentpages(customers);
  }, [customers])

  const handleCustomerClicks = () => {
    setIsEdit(false);
    setCustomer("");
    toggle();
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Customers" />
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    tableClass="table align-middle table-nowrap"
                    theadClass=""
                    data={currentpages || []}
                    isGlobalFilter={true}
                    isAddCustList={true}
                    customPageSizeOption={true}
                    customPageSize={10}
                    handleOrderClicks={handleCustomerClicks}
                  />
                  <Pagination
                    perPageData={10}
                    data={customers}
                    setCurrentpages={setCurrentpages}
                    currentpages={currentpages}
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Customer" : "Add Customer"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e: any) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label>UserName</Label>
                              <Input
                                name="username"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.username || ""}
                                placeholder="Insert user name"
                                invalid={
                                  validation.touched.username && validation.errors.username ? true : false
                                }
                              />
                              {validation.touched.username && validation.errors.username ?
                                (<FormFeedback type="invalid">{validation.errors.username}</FormFeedback>) : null}
                            </div>
                            <div className="mb-3">
                              <Label>Email</Label>
                              <Input
                                name="email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                placeholder="Insert user name"
                                invalid={
                                  validation.touched.email && validation.errors.email ? true : false
                                }
                              />
                              {validation.touched.email && validation.errors.email ?
                                (<FormFeedback type="invalid">{validation.errors.email}</FormFeedback>) : null}
                            </div>
                            <div className="mb-3">
                              <Label>Phone No</Label>
                              <PatternFormat
                                name="phone"
                                className="form-control"
                                format="###-###-####"
                                placeholder="Insert phone no"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                              />
                              {validation.touched.phone && validation.errors.phone ?
                                (<span className="text-danger">{validation.errors.phone}</span>) : null}
                            </div>
                            <div className="mb-3">
                              <Label>Address</Label>
                              <Input
                                name="address"
                                type="textarea"
                                rows="3"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
                                placeholder="Insert address"
                                invalid={
                                  validation.touched.address && validation.errors.address ? true : false}
                              />
                              {validation.touched.address && validation.errors.address ?
                                (<FormFeedback type="invalid">  {validation.errors.address} </FormFeedback>) : null}
                            </div>

                            <div className="mb-3">
                              <Label>Rating</Label>
                              <Input
                                name="rating"
                                type="number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rating || ""}
                                invalid={
                                  validation.touched.rating && validation.errors.rating ? true : false}
                                placeholder="Insert rating"
                              />
                              {validation.touched.rating && validation.errors.rating ?
                                (<FormFeedback type="invalid">  {validation.errors.rating} </FormFeedback>) : null}
                            </div>

                            <div className="mb-3">
                              <Label>  Wallet Balance </Label>
                              <Input
                                type="number"
                                name="walletBalance"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.walletBalance || ''}
                                placeholder="Insert wallent balance"
                                invalid={
                                  validation.touched.walletBalance && validation.errors.walletBalance ? true : false
                                }
                              />
                              {validation.touched.walletBalance && validation.errors.walletBalance ?
                                (<FormFeedback type="invalid"> {validation.errors.walletBalance} </FormFeedback>) : null}
                            </div>

                            <div className="mb-3">
                              <Label>Joining Date</Label>
                              <Flatpickr
                                type="date"
                                name="joiningDate"
                                className="form-control d-block"
                                placeholder="Select time"
                                options={{
                                  mode: "single",
                                  dateFormat: 'd M, Y',
                                }}
                                value={validation.values.joiningDate}
                                onChange={(date: any) => validation.setFieldValue("joiningDate", moment(date[0]).format("DD MMMM ,YYYY"))}
                              />
                              {validation.touched.joiningDate && validation.errors.joiningDate ?
                                (<span className="text-danger"> {validation.errors.joiningDate}  </span>) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <Button type="submit" color="success" className="save-customer" >{!!isEdit ? "Update" : "Add"}</Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCustomers;
