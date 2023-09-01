import React from "react";
import { Card, CardBody, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

// import Component
import FileLeftBar from "./FileLeftBar";
import FileList from "./FileList";
import RecentFile from "./RecentFile";
import Storage from "./Storage";

import { createEditor } from "../../editor";
import { useRete } from "rete-react-plugin";

const Index = () => {
  const [ref] = useRete(createEditor);

  //meta title
  document.title = "Node Editor | Skote - React Admin & Dashboard Template";

  const series = [76]
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
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Apps" breadcrumbItem="Node Editor" />
          <div className="d-xl-flex">
            <div className="w-100">
              <div className="d-md-flex">
                {/* FileRightBar  */}
                <FileLeftBar />
                <div ref={ref} className="w-100"></div>
              </div>
            </div>
            <Storage options={options} series={series} />
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default Index
