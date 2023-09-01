import React from "react"

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

const Sender = ({ message }:any) => {
  const object:any = (localStorage.getItem("authUser"))
  const obj = JSON.parse(object)
  const name = obj && obj.username ? obj.username : message["name"]

  return (
    <li className="right">
      <div className="conversation-list">
        <UncontrolledDropdown >
          <DropdownToggle tag="a" className="dropdown-toggle">
            <i className="bx bx-dots-vertical-rounded" />
          </DropdownToggle>
          <DropdownMenu direction="right">
            <DropdownItem href="#">Copy</DropdownItem>
            <DropdownItem href="#">Save</DropdownItem>
            <DropdownItem href="#">Forward</DropdownItem>
            <DropdownItem href="#">Delete</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="ctext-wrap">
          <div className="conversation-name">{name}</div>
          <p>{message["msg"]}</p>

          <p className="chat-time mb-0">
            <i className="bx bx-time-five align-middle me-1" />{" "}
            {message["time"]}
          </p>
        </div>
      </div>
    </li>
  )
}

export default Sender
