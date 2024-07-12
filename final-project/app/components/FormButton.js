import React from "react";
import { Button } from "@rneui/themed";

const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{
      borderColor: buttonColor,
      backgroundColor: buttonColor,
      borderRadius: 3,
    }}
    titleStyle={{ color: "#ffffff" }}
  />
);

export default FormButton;
