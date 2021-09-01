import React from "react";
const TextArea = ({
  name,
  id,
  onChange,
  value,
  label,
  errors,
  rows = 1,
    isRequired=false,

  ...rest
}) => {
  return (
    <div className="form-group">
      {label && (
        <label
          htmlFor={id ? id : name}
          className={`text-left ${isRequired ?"is-required":""}`}
          style={{ fontSize: "14px" }}
        >
          {label}
        </label>
      )}
      <textarea
        {...rest}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        rows={rows}
      />
      {errors && errors[name] && (
        <>
          <div className="alert alert-danger">{errors[name]}</div>
        </>
      )}{" "}
    </div>
  );
};

export default TextArea;
