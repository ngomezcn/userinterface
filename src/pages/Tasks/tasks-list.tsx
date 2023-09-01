import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, CardTitle, Table, FormGroup, Label, Input, Badge } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb"
import ReactApexChart from "react-apexcharts"
import withRouter from "../../Components/Common/withRouter";

//Import Images
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";

import { getTasks as onGetTasks } from "../../slices/tasks/thunk"
import { options, series, } from "common/data/tasks"

//redux
import { useDispatch } from "react-redux"

const TasksList = () => {
  //meta title
  document.title = "Task List | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(onGetTasks())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tasks" breadcrumbItem="Task List" />
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Upcoming</CardTitle>
                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <tbody>
                        <tr>
                          <td style={{ width: "40px" }}>
                            <FormGroup check className="font-size-16">
                              <Input type="checkbox" id="upcomingtaskCheck01" />
                              <Label check htmlFor="upcomingtaskCheck01"></Label>
                            </FormGroup>
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Create a Skote Dashboard UI</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar5} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <Badge pill className="badge-soft-secondary font-size-11">Waiting</Badge>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check className="font-size-16">
                              <Input type="checkbox" id="upcomingtaskCheck02" defaultChecked />
                              <Label check htmlFor="upcomingtaskCheck02"></Label>
                            </FormGroup>
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Create a New Landing UI</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar1} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar2} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-success text-white font-size-16">
                                      A
                                    </span>
                                  </div>
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar6} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <Badge pill className="badge-soft-primary font-size-11">Approved</Badge>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <FormGroup check className="font-size-16">
                              <Input type="checkbox" id="upcomingtaskCheck03" />
                              <Label check htmlFor="upcomingtaskCheck03"></Label>
                            </FormGroup>
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Create a Skote Logo</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-warning text-white font-size-16">
                                      R
                                    </span>
                                  </div>
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar5} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <Badge pill className="badge-soft-secondary font-size-11">Waiting</Badge>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">In Progress</CardTitle>
                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <tbody>
                        <tr>
                          <td style={{ width: "40px" }}>
                            <FormGroup check className="font-size-16">
                              <Input type="checkbox" id="inprogresstaskCheck01" defaultChecked />
                              <Label check htmlFor="inprogresstaskCheck01"></Label>
                            </FormGroup>
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Brand logo design</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar5} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <Badge pill className="badge-soft-success font-size-11">Complete</Badge>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <FormGroup check className="font-size-16">
                              <Input type="checkbox" id="inprogresstaskCheck02" />
                              <Label check htmlFor="inprogresstaskCheck02"></Label>
                            </FormGroup>
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Create a Blog Template UI</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-success text-white font-size-16">
                                      A
                                    </span>
                                  </div>
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar2} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <Badge pill className="badge-soft-warning font-size-11">Pending</Badge>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Completed</CardTitle>
                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <tbody>
                        <tr>
                          <td style={{ width: "40px" }}>
                            <FormGroup check className="font-size-16">
                              <Input type="checkbox" id="completedtaskCheck01" />
                              <Label check htmlFor="completedtaskCheck01"></Label>
                            </FormGroup>
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Redesign - Landing page</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar5} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-danger text-white font-size-16">
                                      K
                                    </span>
                                  </div>
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar2} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <Badge pill className="badge-soft-success font-size-11">Complete</Badge>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <FormGroup check className="font-size-16">
                              <Input type="checkbox" id="completedtaskCheck02" defaultChecked />
                              <Label check htmlFor="completedtaskCheck02"></Label>
                            </FormGroup>
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Multipurpose Landing</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar8} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar6} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <Badge pill className="badge-soft-success font-size-11">Complete</Badge>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <FormGroup check className="font-size-16">
                              <Input type="checkbox" id="completedtaskCheck03" />
                              <Label check htmlFor="completedtaskCheck03"></Label>
                            </FormGroup>
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Create a Blog Template UI</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar5} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar2} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-info text-white font-size-16">
                                      D
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <Badge pill className="badge-soft-success font-size-11">Complete</Badge>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Tasks </CardTitle>
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    height={280}
                    className="apex-charts"
                  />
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">Recent Tasks</CardTitle>

                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <tbody>
                        <tr>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Brand logo design</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar5} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Create a Blog Template UI</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar1} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar2} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-info text-white font-size-16">
                                      D
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5 className="text-truncate font-size-14 m-0"><Link to="#" className="text-dark">Redesign - Landing page</Link></h5>
                          </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar8} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <img src={avatar7} alt="" className="rounded-circle avatar-xs" />
                                </Link>
                              </div>
                              <div className="avatar-group-item">
                                <Link to="#" className="d-inline-block">
                                  <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-danger text-white font-size-16">
                                      P
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(TasksList)
