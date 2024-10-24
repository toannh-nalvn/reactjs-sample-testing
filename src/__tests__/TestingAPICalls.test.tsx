import { render, screen, waitFor } from "@testing-library/react";

import * as services from "../Services";
import TestingAPICalls from "../TestingAPICalls";

test("Testing page load", () => {
  const mockFetchData = jest
    .spyOn(services, "FetchData")
    .mockImplementation(async () => {
      return [
        {
          name: "kunal",
        },
      ];
    });

  render(<TestingAPICalls />);
  expect(mockFetchData).toHaveBeenCalled();
});

test("Testing render data from API", async () => {
  const mockFetchData = jest
    .spyOn(services, "FetchData")
    .mockImplementation(async () => {
      return [
        {
          name: "kunal",
        },
      ];
    });

  render(<TestingAPICalls />);
  expect(mockFetchData).toHaveBeenCalled();

  await waitFor(() => {
    expect(screen.getByText(/kunal/i)).toBeInTheDocument();
  });
});
