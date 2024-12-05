import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchButton from './SearchButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const renderWithTheme = (ui: React.ReactElement) => {
    const theme = createTheme(
    ); return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};



describe('SearchButton Component', () => {
    it('renders correctly', () => {
        renderWithTheme(<SearchButton onClick={jest.fn()} />);

        // Check if the button is rendered
        const button = screen.getByRole('button', { name: /search button/i });
        expect(button).toBeInTheDocument();

        // Check if the icon is rendered
        const icon = screen.getByTestId('search-icon');
        expect(icon).toBeInTheDocument();

        // Check if the text is rendered
        const text = screen.getByTestId('search-text');
        expect(text).toBeInTheDocument();
    });

    it('calls the onClick handler when clicked', () => {
        const handleClick = jest.fn();
        renderWithTheme(<SearchButton onClick={handleClick} />);

        const button = screen.getByRole('button', { name: /search button/i });

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders the correct icon and text', () => {
        renderWithTheme(<SearchButton onClick={jest.fn()} />);

        const icon = screen.getByTestId('search-icon');
        expect(icon).toHaveAttribute('src', expect.stringContaining('search.svg'));

        const text = screen.getByText(/search/i);
        expect(text).toBeInTheDocument();
    });
});
