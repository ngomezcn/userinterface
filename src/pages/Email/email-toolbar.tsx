import React from "react";
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

const EmailToolbar = (props: any) => {
  return (
    <React.Fragment>

      <div className="btn-toolbar p-3" role="toolbar">
        {
          props.isToolbar &&
          <>
            <div className="btn-group me-2 mb-2 mb-sm-0">
              <Button type="button" color="primary" >
                <i className="fa fa-inbox" />
              </Button>
              <Button type="button" color="primary" >
                <i className="fa fa-exclamation-circle" />
              </Button>

              <Button type="button" color="primary" onClick={props.handleDeleteModal}>
                <i className="far fa-trash-alt" />
              </Button>

            </div>
            <UncontrolledDropdown className="btn-group me-2 mb-2 mb-sm-0">
              <DropdownToggle className="btn btn-primary dropdown-toggle" tag="i">
                <i className="fa fa-folder" />
                <i className="mdi mdi-chevron-down ms-1" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem to="#">Updates</DropdownItem>
                <DropdownItem to="#">Social</DropdownItem>
                <DropdownItem to="#">Team Manage</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown className="btn-group me-2 mb-2 mb-sm-0">
              <DropdownToggle className="btn btn-primary dropdown-toggle" tag="i">
                <i className="fa fa-tag" />
                <i className="mdi mdi-chevron-down ms-1" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem to="#">Updates</DropdownItem>
                <DropdownItem to="#">Social</DropdownItem>
                <DropdownItem to="#">Team Manage</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown className="btn-group me-2 mb-2 mb-sm-0">
              <DropdownToggle className="btn btn-primary dropdown-toggle" tag="div">
                More <i className="mdi mdi-dots-vertical ms-2" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem to="#">Mark as Unread</DropdownItem>
                <DropdownItem to="#">Mark as Important</DropdownItem>
                <DropdownItem to="#">Add to Tasks</DropdownItem>
                <DropdownItem to="#">Add Star</DropdownItem>
                <DropdownItem to="#">Mute</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        }
      </div>

    </React.Fragment>
  );
};

export default EmailToolbar;
