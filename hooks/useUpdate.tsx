"use client";

import React, { useState } from "react";

export const useUpdate = () => {
  const [update, setUpdate] = useState<boolean>(false);

  return {
    update,
    changeUpdate() {
      setUpdate((prev) => !prev);
    }
  }
};
