import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from "../../../Components/Common/Breadcrumb";
import JobFilter from './JobFilter';
import JobData from './JobData';
import { useDispatch, useSelector } from 'react-redux';
import { getJobGrid as onGetJobGrid } from 'slices/thunk';
import Pagination from 'Components/Common/Pagination';
import { createSelector } from 'reselect';

const JobGrid = () => {
    document.title = "Jobs Grid | Skote - React Admin & Dashboard Template";

    const dispatch = useDispatch<any>();

   const selectProperties = createSelector(
        (state: any) => state.jobs,
        (jobs) => ({
            jobdata: jobs.jobGrid
        })
    );
    const { jobdata } = useSelector(selectProperties);
    const [jobGrid, setJobGrid] = useState<any>()

    useEffect(() => {
        dispatch(onGetJobGrid())
    }, [dispatch])

    useEffect(() => {
        setJobGrid(jobdata)
    }, [jobdata])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Jobs" breadcrumbItem="Jobs Grid" />

                    <JobFilter setJobGrid={setJobGrid} jobdata={jobdata} />
                    <JobData jobGrid={jobGrid} />
                    <Pagination
                        perPageData={8}
                        data={jobdata}
                        setCurrentpages={setJobGrid}
                        currentpages={jobGrid}
                    />
                </Container>
            </div>
        </React.Fragment>
    );
}

export default JobGrid;