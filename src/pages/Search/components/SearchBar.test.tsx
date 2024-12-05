import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { fetchSearchResults, fetchSuggestions } from "../../../apis/Search";
import { AxiosError } from "axios";

jest.mock("../../../apis/Search");

describe("SearchBar Component", () => {
    const mockSetSearchResults = jest.fn();
    const mockSetShowErrorNotification = jest.fn();
    const mockSetError = jest.fn();
    const mockSetSearchQuery = jest.fn();
    const mockSearchQuery = "test";

    const setup = () => {
        render(
            <SearchBar
                setSearchResults={mockSetSearchResults}
                setShowErrorNotification={mockSetShowErrorNotification}
                setError={mockSetError}
                searchQuery={mockSearchQuery}
                setSearchQuery={mockSetSearchQuery}
            />
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component correctly", () => {
        setup();
        const autocompleteInput = screen.getByLabelText(/search input/i);
        expect(autocompleteInput).toBeInTheDocument();
        const searchButton = screen.getByLabelText(/Search Button/)
        expect(searchButton).toBeInTheDocument();
    });

    it("calls setSearchQuery when input value changes", () => {
        setup();
        const input = screen.getByRole("combobox");
        fireEvent.change(input, { target: { value: "new query" } });
        expect(mockSetSearchQuery).toHaveBeenCalledWith("new query");
    });

    it("fetches suggestions for valid input", async () => {
        (fetchSuggestions as jest.Mock).mockResolvedValue({
            data: { suggestions: ["suggestion1", "suggestion2"] },
        });

        setup();
        const input = screen.getByRole("combobox");
        fireEvent.change(input, { target: { value: "test" } });

        await waitFor(() => {
            expect(fetchSuggestions).toHaveBeenCalledWith("test");
        });
    });

    it("displays error notification when fetching suggestions fails", async () => {
        (fetchSuggestions as jest.Mock).mockRejectedValue(new AxiosError("Network Error"));

        setup();
        const input = screen.getByRole("combobox");
        fireEvent.change(input, { target: { value: "test" } });

        await waitFor(() => {
            expect(mockSetShowErrorNotification).toHaveBeenCalledWith(true);
        });

        await waitFor(() => {
            expect(mockSetError).toHaveBeenCalledWith("Network Error");
        });

    });

    it("fetches search results when search button is clicked", async () => {
        (fetchSearchResults as jest.Mock).mockResolvedValue({
            data: { ResultItems: ["result1", "result2"] },
        });

        setup();
        const button = screen.getByRole("button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(fetchSearchResults).toHaveBeenCalledWith(mockSearchQuery);
        });
        await waitFor(() => {
            expect(mockSetSearchResults).toHaveBeenCalledWith({ ResultItems: ["result1", "result2"] });
        });

    });

    it("displays error notification when fetching search results fails", async () => {
        (fetchSearchResults as jest.Mock).mockRejectedValue(new AxiosError("Search Error"));

        setup();
        const button = screen.getByRole("button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockSetShowErrorNotification).toHaveBeenCalledWith(true);
        });

        await waitFor(() => {
            expect(mockSetError).toHaveBeenCalledWith("Search Error");
        });
    });

    it("filters suggestions based on input value", async () => {
        (fetchSuggestions as jest.Mock).mockResolvedValue({
            data: { suggestions: ["apple", "banana", "apricot"] },
        });

        setup();
        const input = screen.getByRole("combobox");
        fireEvent.change(input, { target: { value: "ap" } });

        await waitFor(() => {
            expect(screen.getByText("apple")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText("apricot")).toBeInTheDocument();
        });

    });
});
