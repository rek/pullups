import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import { Line } from "../line";

describe("Line", () => {
  test("good line", () => {
    const props = {
      data: [],
    };

    render(<Line {...props} />);

    expect(screen.getAllByRole("presentation")[0]).toBeInTheDocument();
  });
});
