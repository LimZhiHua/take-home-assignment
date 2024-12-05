import React, { useState } from "react";
import {
  Grid2,
  Divider,
  Box,
  useTheme,
  Theme,

} from "@mui/material";
import ErrorBanner from "./components/ErrorHeader";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";


const styles = (theme: Theme) => ({
  root: {
    position: "relative",
    width: "75%",
    margin: "0 auto",
  },
  searchSection: {
    display: "flex",
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(6),
  },
  divider: {
    borderWidth: "5px",
    borderColor: "#F0F0F0",
    width: "calc(100vw)",
    marginLeft: "-17%",
  },

});


interface DocumentMetadata {
  DocumentId: string;
  DocumentTitle: {
    Text: string;
    Highlights: Highlight[];
  };
  DocumentExcerpt: {
    Text: string;
    Highlights: Highlight[];
  };
  DocumentURI: string;
}

interface Highlight {
  BeginOffset: number;
  EndOffset: number;
}
export interface SearchResultResponse {
  PageSize: number;
  TotalNumberOfResults: number;
  ResultItems: DocumentMetadata[];
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("")
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResultResponse>({
    PageSize: 0,
    TotalNumberOfResults: 0,
    ResultItems: [],
  })
  const theme = useTheme();
  const classes = styles(theme);

  const closeErrorNotification = () => {
    setShowErrorNotification(false)
  }

  return (
    <>
      {/* Header */}
      <ErrorBanner aria-label="Error Bar" showHeader={showErrorNotification} onClick={closeErrorNotification} message={error} />
      <Box
        sx={classes.root}
      >
        {/* Search Bar Section */}
        <Grid2 container size={12} sx={classes.searchSection}>
          <SearchBar setSearchResults={setSearchResults} setShowErrorNotification={setShowErrorNotification} setError={setError} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Grid2>
        {/* Grey seperator  */}
        <Divider
          sx={classes.divider}
        />
        {/* Search Results Section */}
        {searchResults.TotalNumberOfResults > 0 && <Grid2 size={12} >
          <Grid2 size={12}>
            <SearchResults searchResults={searchResults} searchQuery={searchQuery} />
          </Grid2>
        </Grid2>}
      </Box >
    </>
  );
};


export default SearchPage;
