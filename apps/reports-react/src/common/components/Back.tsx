import * as React from "react";
import { useHistory } from "react-router-dom";

import { ArrowBackIcon } from "../material/icons";

export const Back: React.FC = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div onClick={handleBack}>
      <ArrowBackIcon />
    </div>
  );
};
