import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Card, CardBody, CardTitle, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

import TableContainer from "../../../Components/Common/TableContainer";

import { Idno, Pdate, Type, Value, ValueInUsd, Amount } from "./CryptoWalCol";
import { useDispatch, useSelector } from "react-redux";
import { getWalletActivities as onGetWalletActivities } from "slices/thunk";
import Pagination from "Components/Common/Pagination";
import { createSelector } from 'reselect';

const WalletActivities = ({ activeTab, toggleTab }: any) => {
  const dispatch = useDispatch<any>();

 const selectProperties = createSelector(
    (state: any) => state.crypto,
    (crypto) => ({
      WalletActivities: crypto.walletActivities
    })
  );

  const { WalletActivities } = useSelector(selectProperties);

  const [currentpages, setCurrentpages] = useState<any>();
  const [buy, setBuy] = useState<any>();
  const [sell, setSell] = useState<any>();

  useEffect(() => {
    dispatch(onGetWalletActivities())
  }, [dispatch]);

  useEffect(() => {
    setCurrentpages(WalletActivities)
    setBuy(WalletActivities?.filter((data: any) => data.type === 'Buy'));
    setSell(WalletActivities?.filter((data: any) => data.type === 'Sell'));
  }, [WalletActivities])

  const columns = useMemo(
    () => [
      {
        Header: "Id No",
        accessor: "idno",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Idno {...cellProps} />;
        },
      },
      {
        Header: "Date",
        accessor: "pdate",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: cellProps => {
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
        Header: "Currency",
        accessor: "coin",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Value {...cellProps} />;
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        filterable: true,
        Filter: false,
        isSortable: true,
        Cell: (cellProps: any) => {
          return <Amount {...cellProps} />;
        },
      },
      {
        Header: "Amount in USD",
        accessor: "valueInUsd",
        filterable: true,
        Filter: false,
        isSortable: false,
        Cell: (cellProps: any) => {
          return <ValueInUsd {...cellProps} />;
        },
      },
    ],
    []
  );

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4" className="mb-4">Activities</CardTitle>
        <Nav tabs className="nav-tabs-custom">
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "1",
              })}
              onClick={() => {
                toggleTab("1");
              }}
            >
              All
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
              Buy
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "3",
              })}
              onClick={() => {
                toggleTab("3");
              }}
            >
              Sell
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane id="1" tabId="1">
            <div className="mt-4">
              <TableContainer
                columns={columns}
                tableClass="table table-hover dt-responsive nowrap dataTable no-footer dtr-inline"
                data={currentpages || []}
                isGlobalFilter={true}
                isAddOptions={true}
                customPageSizeOption={true}
                customPageSize={10}
              />
              <Pagination
                perPageData={10}
                data={WalletActivities}
                setCurrentpages={setCurrentpages}
                currentpages={currentpages}
              />
            </div>
          </TabPane>
          <TabPane id="2" tabId="2">
            <div className="mt-4">
              <TableContainer
                columns={columns}
                data={buy || []}
                isGlobalFilter={true}
                customPageSizeOption={true}
                customPageSize={10}
                tableClass="table-hover dt-responsive nowrap dataTable no-footer dtr-inline"
              />
              <Pagination
                perPageData={10}
                data={WalletActivities}
                setCurrentpages={setBuy}
                currentpages={buy}
              />
            </div>
          </TabPane>
          <TabPane id="3" tabId="3">
            <div className="mt-4">
              <TableContainer
                columns={columns}
                data={sell || []}
                isGlobalFilter={true}
                customPageSizeOption={true}
                customPageSize={10}
                tableClass="table-hover dt-responsive nowrap dataTable no-footer dtr-inline"
              />
              <Pagination
                perPageData={10}
                data={WalletActivities}
                setCurrentpages={setSell}
                currentpages={sell}
              />
            </div>
          </TabPane>
        </TabContent>


      </CardBody>
    </Card>
  );
};

export default WalletActivities;
