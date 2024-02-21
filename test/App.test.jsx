import { render, screen } from "@testing-library/react";
import App from '../src/App';

describe('Tests on <App />', () => {
    test('should render correctly', () => {

        render(<App />);

        expect(screen.getByText('Vite + React')).toBeTruthy();
    });
});
