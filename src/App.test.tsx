import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";

// Mocking Loading component
jest.mock("./components/Loading", () => {
  return function DummyLoading() {
    return <div data-testid="iconLoadingId">Loading...</div>;
  };
});

describe("App component", () => {
  // No solution
  // it("should render the loading component after 3 seconds", async () => {
  //   render(<App />);

  //   expect(screen.getByText("APP")).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(screen.getByTestId("iconLoadingId")).toBeInTheDocument();
  //   });
  // });

  it("should not render the loading component before 3 seconds", () => {
    render(<App />);

    expect(screen.queryByTestId("iconLoadingId")).not.toBeInTheDocument();
  });
});
