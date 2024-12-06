import React, { useState, useEffect, useMemo } from "react";
import {
    Typography,
    TextField,
    Autocomplete,
    debounce,
    useTheme,

} from "@mui/material";
import { AxiosError } from "axios";
import { highlightText } from "../../../utils";
import SearchButton from "./SearchButton";
import { fetchSearchResults, fetchSuggestions } from "../../../apis/Search";
import { SearchResultResponse } from "../Search";
import { Theme } from '@mui/material/styles';

const styles = (theme: Theme) => ({
    // width is equal to 100% - width of search button.
    autocomplete: {
        width: "calc(100% - 153px)",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: "none",
        [theme.breakpoints.down("md")]: {
            width: "calc(100% - 76px)",
        },
    },
});
interface SearchSuggestionResponse {
    stemmedQueryTerm: string;
    suggestions: string[];
}

interface SearchButtonProps {
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResultResponse>>
    setShowErrorNotification: React.Dispatch<React.SetStateAction<boolean>>
    setError: React.Dispatch<React.SetStateAction<string>>
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    searchQuery: string
}

const SearchBar: React.FC<SearchButtonProps> = ({ setSearchResults, setShowErrorNotification, setError, searchQuery, setSearchQuery }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const theme = useTheme();
    const classes = styles(theme);

    const debouncedSearch = useMemo(
        () =>
            debounce(async (searchTerm: string) => {
                if (searchTerm) {
                    setLoading(true);
                    setError('');
                    try {
                        console.log("Getting suggestions for", searchTerm);
                        const response = await fetchSuggestions(searchTerm)
                        const data: SearchSuggestionResponse = response.data;
                        if (!data.suggestions) {
                            throw new Error("Error: Failed to load suggestions")
                        }
                        setFilteredSuggestions(data.suggestions);
                    } catch (error) {
                        if (error instanceof AxiosError) {
                            console.error("Axios error when getting suggestions:", error, error.response?.data);
                            setError(error.message || "An unexpected error occurred when getting suggestiona");
                        } else if (error instanceof Error) {
                            console.error("Error when getting suggestions:", error, error.message);
                            setError(error.message || "An unexpected error occurred when getting suggestions");
                        } else {
                            setError("An unexpected error occurred when getting suggestion info");
                        }
                        setShowErrorNotification(true);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setFilteredSuggestions([]);
                }
            }, 300),
        [setError, setShowErrorNotification]
    );

    useEffect(() => {
        if (searchQuery.length > 2) {
            debouncedSearch(searchQuery);
        } else {
            setFilteredSuggestions([]);
        }
    }, [debouncedSearch, searchQuery]);

    useEffect(() => {
        return () => {
            debouncedSearch.clear(); // Clear any pending debounced actions
        };
    }, [debouncedSearch]);

    const getSearchInfo = async (searchValue: string) => {
        if (searchValue) {
            try {
                console.log("Searching for", searchValue)
                const response = await fetchSearchResults(searchValue)
                const data: SearchResultResponse = response.data
                if (!data.ResultItems || data.ResultItems.length === 0) {
                    throw new Error("No results found for your search term.");
                }
                setSearchResults(data)
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    console.error("Axios search error:", error, error.response?.data);
                    setError(error.message || "An unexpected error occurred.");
                } else if (error instanceof Error) {
                    console.error("Search error:", error, error.message);
                    setError(error.message || "An unexpected error occurred when getting search info");
                } else {
                    setError("An unexpected error occurred when getting search info");
                }
                setShowErrorNotification(true);
            }
        }
    }


    return (
        <>
            <Autocomplete
                freeSolo
                id="search-bar"
                disableClearable
                options={filteredSuggestions}
                sx={classes.autocomplete}
                filterOptions={(options, state) => {
                    if (state.inputValue.length > 2) {
                        return options.filter((item) =>
                            String(item).toLowerCase().includes(state.inputValue.toLowerCase())
                        );
                    }
                    return options;
                }}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        aria-label="Search Input"
                        {...params}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                type: 'search',
                            },
                        }}

                    />
                )}
                renderOption={(props, option) => (
                    <li {...props} key={option}>
                        <Typography >
                            {highlightText(option, searchQuery)}
                        </Typography>
                    </li>

                )}
                onInputChange={(_: React.SyntheticEvent, value: string) => {
                    setSearchQuery(value);
                }}
                onChange={(
                    _: React.SyntheticEvent,
                    value: string | null
                ) => {
                    if (value) {
                        getSearchInfo(value);
                    }
                }}
            />
            <SearchButton onClick={() => { getSearchInfo(searchQuery) }} /></>
    );
};

export default SearchBar;
