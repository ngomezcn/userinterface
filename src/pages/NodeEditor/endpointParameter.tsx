import React from "react";
import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  Label,
} from "reactstrap";

import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_blue.css";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_blue.css";

const EndpointParameter = ({ menuInputs, integrationModels, generics, removeInput }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [optionState, setOptionState] = useState("models");
  const [replacedGenerics, setReplacedGenerics] = useState<string[]>([]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    if (selectedValue != "") {
      setOptionState("generics");
    } else {
      setOptionState("models");
    }

    const newReplacedGenerics = generics.map((generic) =>
      generic.replace(/_TYPE_/g, selectedValue)
    );
    setReplacedGenerics(newReplacedGenerics);

    setSelectedValue(selectedValue);
  };

  return (
    <div>
      {menuInputs.map((value, index) => (
        <div className="form-group mb-2">
          <Label>
            {value}{" "}
            <Button
              color="danger"
              size="sm"
              style={{ padding: "0.30rem" }}
              onClick={() => removeInput(index)}
            ></Button>
          </Label>
          <InputGroup>
            {optionState === "models" && (
              <Input
                name="mainEnviroment"
                type="select"
                className="form-select"
                onChange={handleSelectChange}
                value={selectedValue}
              >
                <option></option>
                {integrationModels.map((model, index) => (
                  <option key={index}>{model}</option>
                ))}
              </Input>
            )}

            {optionState === "generics" && (
              <Input
                name="mainEnviroment"
                type="select"
                className="form-select"
                onChange={handleSelectChange}
                value={selectedValue}
              >
                <option></option>
                <option>{selectedValue}</option>
                {replacedGenerics.map((model, index) => (
                  <option key={index}>{model}</option>
                ))}
              </Input>
            )}

            <Input type="text" className="form-control" />
          </InputGroup>
        </div>
      ))}
    </div>
  );
};

export default EndpointParameter;
