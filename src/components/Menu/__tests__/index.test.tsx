import { render, screen } from "@testing-library/react";
import Menu from "..";

describe("Menu component", () => {
  it("should render the menu text", () => {
    render(<Menu />);

    const menuText = screen.getByText("Menu");

    expect(menuText).toBeInTheDocument();
  });
});
