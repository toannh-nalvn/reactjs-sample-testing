import { render, screen } from "@testing-library/react";
import Loading from "..";

describe("Loading component", () => {
  it("should render loading component", () => {
    render(<Loading />);

    const loadingIcon = screen.getByTestId("iconLoadingId");
    expect(loadingIcon).toBeInTheDocument();
  });

  it("should has loader class in loading component", () => {
    render(<Loading />);

    const loadingIcon = screen.getByTestId("iconLoadingId");
    expect(loadingIcon).toHaveClass("loader");
  });
});
