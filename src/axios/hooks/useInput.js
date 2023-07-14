// src/hooks/useInput.js

import React, { useState } from "react";

const useInput = () => {
  // use useState to manage value
  const [value, setValue] = useState("");

  const handler = (e) => {
    setValue(e.target.value);
  };
  // when it's returned, it comes with value first and handler after.
  return [value, handler];
};

export default useInput;
