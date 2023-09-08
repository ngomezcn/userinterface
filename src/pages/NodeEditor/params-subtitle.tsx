import React from 'react';

const LabelSubTitle = ({ text }) => {
  return (
    <div
      style={{
        borderBottom: "1px solid black",
        display: "inline-block",
        width: "100%",
        marginBottom: "10px",
      }}
      className="form-group mt-3"
    >
      <label
        style={{
          color: "black",
          fontSize: "13px",
          marginBottom: "-10px",
        }}
      >
        {text}
      </label>
    </div>
  );
};

export default LabelSubTitle;
