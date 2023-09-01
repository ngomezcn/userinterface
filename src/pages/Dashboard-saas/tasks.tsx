import React, { useState } from "react"
import {
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Table,
  Input,
  Label,
  CardTitle,
  FormGroup,
  CardFooter
} from "reactstrap"
import { Link } from "react-router-dom"
import classnames from "classnames"

//Simple bar
import SimpleBar from "simplebar-react"

const Tasks = () => {
  const [activeTab, setActiveTab] = useState<any>("1")

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody>
            <CardTitle tag="h4" className="card-title mb-4">Tasks</CardTitle>

            <Nav pills className="bg-light rounded">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "1",
                  })}
                  onClick={() => {
                    toggleTab("1")
                  }}
                >
                  In Process
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "2",
                  })}
                  onClick={() => {
                    toggleTab("2")
                  }}
                >
                  Upcoming
                </NavLink>
              </NavItem>
            </Nav>

            <div className="mt-4">
              <SimpleBar style={{ maxHeight: "250px" }}>
                <div className="table-responsive">
                  <Table className="table table-nowrap align-middle table-hover mb-0">
                    <tbody>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              id="customCheck1"
                            />
                            <Label check for="customCheck1" />
                          </FormGroup>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14 mb-1">
                            <Link to="#" className="text-dark">
                              Skote Saas Dashboard
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">Assigned to Mark</p>
                        </td>
                        <td style={{ width: "90px" }}>
                          <div>
                            <ul className="list-inline mb-0 font-size-16">
                              <li className="list-inline-item">
                                <Link to="#" className="text-success p-1">
                                  <i className="bx bxs-edit-alt" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link to="#" className="text-danger p-1">
                                  <i className="bx bxs-trash" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <FormGroup check>
                            <Input type="checkbox" id="customCheck2" />
                            <Label check for="customCheck2" />
                          </FormGroup>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14 mb-1">
                            <Link to="#" className="text-dark">
                              New Landing UI
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">Assigned to Team A</p>
                        </td>
                        <td>
                          <div>
                            <ul className="list-inline mb-0 font-size-16">
                              <li className="list-inline-item">
                                <Link to="#" className="text-success p-1">
                                  <i className="bx bxs-edit-alt" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link to="#" className="text-danger p-1">
                                  <i className="bx bxs-trash" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <FormGroup check>
                            <Input type="checkbox" id="customCheck3" />
                            <Label check for="customCheck3" />
                          </FormGroup>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14 mb-1">
                            <Link to="#" className="text-dark">
                              Brand logo design
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">Assigned to Janis</p>
                        </td>
                        <td>
                          <div>
                            <ul className="list-inline mb-0 font-size-16">
                              <li className="list-inline-item">
                                <Link to="#" className="text-success p-1">
                                  <i className="bx bxs-edit-alt" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link to="#" className="text-danger p-1">
                                  <i className="bx bxs-trash" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <FormGroup check>
                            <Input type="checkbox" id="customCheck4" />
                            <Label check for="customCheck4" />
                          </FormGroup>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14 mb-1">
                            <Link to="#" className="text-dark">
                              Blog Template UI
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">Assigned to Dianna</p>
                        </td>
                        <td>
                          <div>
                            <ul className="list-inline mb-0 font-size-16">
                              <li className="list-inline-item">
                                <Link to="#" className="text-success p-1">
                                  <i className="bx bxs-edit-alt" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link to="#" className="text-danger p-1">
                                  <i className="bx bxs-trash" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <FormGroup check>
                            <Input type="checkbox" id="customCheck5" />
                            <Label check for="customCheck5" />
                          </FormGroup>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14 mb-1">
                            <Link to="#" className="text-dark">
                              Multipurpose Landing
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">Assigned to Team B</p>
                        </td>
                        <td>
                          <div>
                            <ul className="list-inline mb-0 font-size-16">
                              <li className="list-inline-item">
                                <Link to="#" className="text-success p-1">
                                  <i className="bx bxs-edit-alt" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link to="#" className="text-danger p-1">
                                  <i className="bx bxs-trash" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Input type="checkbox" id="customCheck6" />
                            <Label check for="customCheck6" />
                          </FormGroup>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14 mb-1">
                            <Link to="#" className="text-dark">
                              Redesign - Landing page
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">Assigned to Jerry</p>
                        </td>
                        <td>
                          <div>
                            <ul className="list-inline mb-0 font-size-16">
                              <li className="list-inline-item">
                                <Link to="#" className="text-success p-1">
                                  <i className="bx bxs-edit-alt" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link to="#" className="text-danger p-1">
                                  <i className="bx bxs-trash" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <FormGroup check>
                            <Input type="checkbox" id="tasklistCheck01" />
                            <Label check for="tasklistCheck01"></Label>
                          </FormGroup>
                        </td>
                        <td>
                          <h5 className="text-truncate font-size-14 mb-1"><Link to="#" className="text-dark">Skote Saas Dashboard</Link></h5>
                          <p className="text-muted mb-0">Assigned to Mark</p>
                        </td>
                        <td style={{ width: "90px" }}>
                          <div>
                            <ul className="list-inline mb-0 font-size-16">
                              <li className="list-inline-item">
                                <Link to="#" className="text-success p-1"><i className="bx bxs-edit-alt"></i></Link>
                              </li>
                              <li className="list-inline-item">
                                <Link to="#" className="text-danger p-1"><i className="bx bxs-trash"></i></Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </SimpleBar>
            </div>
          </CardBody>

          <CardFooter className="bg-transparent border-top">
            <div className="text-center">
              <Link to="#" className="btn btn-primary"> Add new Task </Link>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default Tasks
