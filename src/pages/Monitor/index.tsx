import React from "react";
import { Container, Row } from "reactstrap";
import ActivityFeed from "./ActivityFeed";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import SalesAnalytics from "./sales-analytics";
import { useState, useMemo, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Label,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Nav,
} from "reactstrap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../../Components/Common/withRouter";

import { Pdate, Type, Value, ValueinUSD, Status, Coin } from "./CryptoCol";

import TableContainer from "../../Components/Common/TableContainer";

//Date Picker
import Flatpickr from "react-flatpickr";
import "react-datepicker/dist/react-datepicker.css";
import "assets/scss/datatables.scss";
//Import Breadcrumb
import { getCryptoOrderList as onGetCryptoOrderList } from "slices/thunk";
import Pagination from "Components/Common/Pagination";
import { createSelector } from "reselect";
//Import Components
import StatisticsApplications from "./StatisticsApplications";

const Monitor = () => {
  document.title = "Monitor";

  const [activeTab, setActiveTab] = useState<any>("1");
  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: any) => state.crypto,
    (crypto) => ({
      cryptoOrder: crypto.cryptoOrders,
    })
  );

  const { cryptoOrder } = useSelector(selectProperties);

  const [order, setOrder] = useState<any>();

  //coin search
  const handleSelect = (ele: any) => {
    let data = ele.target.value;
    setOrder(
      (cryptoOrder || [])?.filter(
        (item: any) => item.coin === data || data === "all"
      )
    );
  };

  //type search
  const handleSelectType = (ele: any) => {
    let data = ele.target.value;
    setOrder(
      (cryptoOrder || [])?.filter(
        (item: any) => item.type === data || data === "all"
      )
    );
  };

  //status search
  const handleSelectStatus = (ele: any) => {
    let data = ele.target.value;
    setOrder(
      (cryptoOrder || [])?.filter(
        (item: any) => item.status === data || data === "all"
      )
    );
  };

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    dispatch(onGetCryptoOrderList());
  }, [dispatch]);

  useEffect(() => {
    setOrder(cryptoOrder);
  }, [cryptoOrder]);

  // Table Data
  const columns: any = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "pdate",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Pdate {...cellProps} />;
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Type {...cellProps} />;
        },
      },
      {
        Header: "Coin",
        accessor: "coin",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Coin {...cellProps} />;
        },
      },
      {
        Header: "Value",
        accessor: "value",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Value {...cellProps} />;
        },
      },
      {
        Header: "Value in USD",
        accessor: "valueInUsd",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <ValueinUSD {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: false,
        isSortable: false,
        Cell: (cellProps: any) => {
          return <Status {...cellProps} />;
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Control center" breadcrumbItem="Monitor" />

          <Row>
            <StatisticsApplications />

              <ActivityFeed />
          </Row>

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-3">
                    History Logs
                  </CardTitle>
                  <Nav tabs className="nav-tabs-custom" role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggleTab("1");
                        }}
                      >
                        {" "}
                        Integrations
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggleTab("2");
                        }}
                      >
                        {" "}
                        Processing
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="all-order">
                      <Form>
                        <Row className="mb-4">
                          <Col sm={6} className="col-xl">
                            <FormGroup className="mb-3">
                              <Label>Date :</Label>
                              <Flatpickr
                                className="form-control"
                                id="customerdate"
                                name="customerdate"
                                placeholder="Select date"
                                options={{
                                  mode: "single",
                                  dateFormat: "d M, Y",
                                }}
                              />
                            </FormGroup>
                          </Col>

                          <Col sm={6} className="col-xl">
                            <FormGroup className="mb-3">
                              <Label>Coin</Label>
                              <select
                                className="form-control select2-search-disable"
                                onChange={(e: any) => handleSelect(e)}
                              >
                                <option defaultValue="Bitcoin">
                                  {" "}
                                  Bitcoin{" "}
                                </option>
                                <option value="Ethereum">Ethereum</option>
                                <option value="Litecoin">litecoin</option>
                              </select>
                            </FormGroup>
                          </Col>

                          <Col sm={6} className="col-xl">
                            <FormGroup className="mb-3">
                              <Label>Type</Label>
                              <select
                                className="form-control select2-search-disable"
                                onChange={(e: any) => handleSelectType(e)}
                              >
                                <option defaultValue="Buy">Buy</option>
                                <option value="Sell">Sell</option>
                              </select>
                            </FormGroup>
                          </Col>

                          <Col sm={6} className="col-xl">
                            <FormGroup className="mb-3">
                              <Label>Status</Label>
                              <select
                                className="form-control select2-search-disable"
                                onChange={(e: any) => handleSelectStatus(e)}
                              >
                                <option defaultValue="Completed">
                                  Completed{" "}
                                </option>
                                <option value="Pending">Pending</option>
                              </select>
                            </FormGroup>
                          </Col>

                          <Col sm={6} className="col-xl align-self-end">
                            <div className="mb-3">
                              <Button
                                type="button"
                                color="primary"
                                className="w-md"
                              >
                                {" "}
                                Filter
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>

                      <TableContainer
                        columns={columns}
                        data={order || []}
                        customPageSize={10}
                        tableClass="table-hover datatable dt-responsive nowrap dataTable no-footer dtr-inline"
                      />

                      <Pagination
                        perPageData={10}
                        data={cryptoOrder}
                        setCurrentpages={setOrder}
                        currentpages={order}
                      />
                    </TabPane>
                    <TabPane tabId="2" id="processing">
                      <div>
                        <TableContainer
                          columns={columns}
                          data={order || []}
                          isGlobalFilter={true}
                          customPageSizeOption={true}
                          customPageSize={10}
                          tableClass="table-hover datatable dt-responsive nowrap dataTable no-footer dtr-inline"
                        />
                        <Pagination
                          perPageData={10}
                          data={cryptoOrder}
                          setCurrentpages={setOrder}
                          currentpages={order}
                        />
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row></Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Monitor;
