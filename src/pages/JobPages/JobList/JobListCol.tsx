import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const JobNo = (cell: any) => {
    return <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
};

const JobTitle = (cell: any) => {
    return cell.value ? cell.value : "";
};

const CompanyName = (cell: any) => {
    return cell.value ? cell.value : "";
};

const Location = (cell: any) => {
    return cell.value ? cell.value : "";
};

const Experience = (cell: any) => {
    return cell.value ? cell.value : "";
};

const Position = (cell: any) => {
    return cell.value ? cell.value : "";
};

const Type: any = (cell: any) => {
    switch (cell.value) {
        case "Full Time":
            return <Badge className="badge-soft-success">Full Time</Badge>
        case "Part Time":
            return <Badge className="badge-soft-danger">Part Time</Badge>
        case "Freelance":
            return <Badge className="badge-soft-info">Freelance</Badge>
        case "Internship":
            return <Badge className="badge-soft-warning">Internship</Badge>
        default:
            return <Badge className="badge-soft-warning">Internship</Badge>
    };
};

const PostedDate = (cell: any) => {
    return cell.value ? cell.value : "";
};

const LastDate = (cell: any) => {
    return cell.value ? cell.value : "";
};

const Status: any = (cell: any) => {
    switch (cell.value) {
        case "Active":
            return <Badge className="bg-success">Active</Badge>
        case "New":
            return <Badge className="bg-info">New</Badge>
        case "Close":
            return <Badge className="bg-danger">Close</Badge>
        default:
            return <Badge className="bg-danger">Close</Badge>
    }
};


export { JobNo, JobTitle, CompanyName, Location, Experience, Position, Type, PostedDate, LastDate, Status };