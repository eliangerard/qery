import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("Tests on <App />", () => {
  test("should render correctly", () => {
    render(<App />);

    expect(screen.getByText("Vite + React")).toBeTruthy();
  });
  test("should render correctly", () => {
    render(<App />);
    // aaaaaaaaaaa
    expect(
      screen.getByText("Click on the Vite and React logos to learn more")
    ).toBeTruthy();
  });
  test("should render correctly", () => {
    render(<App />);

    expect(true).toBeTruthy();
  });
});
