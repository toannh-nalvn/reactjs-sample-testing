import { render, screen } from "@testing-library/react";
import FirstComponent from "../FirstComponent";

test("Example 1 renders successfully", () => {
  render(<FirstComponent />);

  const element = screen.getByText(/First test/i);

  expect(element).toBeInTheDocument();
});
