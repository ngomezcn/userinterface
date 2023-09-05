import React from 'react';
import { Container, Row } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import Overview from './Overview';
import DetailsSection from './DetailsSection';

const IntegrationDetail = () => {
    document.title = "Job Details | Skote - React Admin & Dashboard Template";
   
    return (
        <React.Fragment>
             <div className="page-content">
                <Container fluid>
                {/* Render Breadcrumbs */}
                <Breadcrumbs title="Integration Templates" breadcrumbItem="Template Details" />

                <Row>
                    <Overview />
                    <DetailsSection />
                </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default IntegrationDetail;