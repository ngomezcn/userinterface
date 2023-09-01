import React from 'react';
import { Link } from 'react-router-dom';

const Idno = (cell:any) => {
    return  <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
};

const Pdate = (cell:any) => {
    return cell.value ? cell.value : '';
};

const Type = (cell:any) => {
    return cell.value ? cell.value : '';
};

const Value = (cell:any) => {
    return cell.value ? cell.value : '';
};

const ValueInUsd = (cell:any) => {
    return cell.value ? cell.value : '';
};

const Amount = (cell:any) => {
    return cell.value ? cell.value : '';
};

const Coin = (cell:any) => {
    return cell.value ? cell.value : '';
};


export {
    Idno,
    Pdate,
    Type,
    Value,
    Amount,
    ValueInUsd,
    Coin
};