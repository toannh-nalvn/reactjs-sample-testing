import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestingStateChange from "../TestingStateChange";

const mockData = [
  {
    id: 1,
    first_name: "Fletcher",
    last_name: "McVanamy",
    email: "mmcvanamy0@e-recht24.de",
    age: 30,
  },
  {
    id: 2,
    first_name: "Clarice",
    last_name: "Harrild",
    email: "charrild1@dion.ne.jp",
    age: 60,
  },
  {
    id: 3,
    first_name: "Amby",
    last_name: "Emmer",
    email: "aemmer2@buzzfeed.com",
    age: 67,
  },
];

test("Testing page load", () => {
  render(<TestingStateChange data={mockData} />);
  expect(screen.getByText(/page loaded/i)).toBeInTheDocument();
});

test("Toggle text visible", async () => {
  render(<TestingStateChange data={mockData} />);
  await userEvent.click(screen.getByText(/toggle text/i));
  expect(screen.getByText(/text visible/i)).toBeInTheDocument();
});

test("Button disabled on click", async () => {
  render(<TestingStateChange data={mockData} />);
  await userEvent.click(screen.getByText(/toggle button disabled/i));
  expect(screen.getByText(/toggle text/i)).toBeDisabled();
});

test("Phần tử được thêm vào danh sách", async () => {
  render(<TestingStateChange data={mockData} />);
  expect(screen.getAllByTestId("record").length).toBe(3);

  await userEvent.click(screen.getByText(/thêm vào danh sách/i));
  expect(screen.getAllByTestId("record").length).toBe(4);
});

test("Element removed from list", async () => {
  render(<TestingStateChange data={mockData} />);
  await userEvent.click(screen.getByText(/remove from list/i));
  expect(screen.getAllByTestId("record").length).toBe(2);
});
