import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("Tests on <App />", () => {
  test("should render correctly", () => {
    render(<App />);

    expect(screen.getByText("Qery.me")).toBeTruthy();
  });
  test("should render correctly", () => {
    render(<App />);
    // aaaaaaaaaaa
    expect(
      screen.getByText("Conéctate con tus clientes al instante")
    ).toBeTruthy();
  });
  test("should render correctly", () => {
    render(<App />);

    expect(true).toBeTruthy();
  });
});
