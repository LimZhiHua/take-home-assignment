import React, { useState } from "react";
import {
  Typography,
  Grid2,
  Divider,
  ListItem,
  List,
  Link,
  ListItemText,
  Box,
  useTheme,
  Theme,

} from "@mui/material";
import { Masthead } from "@lifesg/react-design-system/masthead";
import ErrorBanner from "../components/ErrorHeader";
import { highlightText } from "../utils";
import SearchBar from "../components/SearchBar";


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
  resultsHeader: {
    flexGrow: 1,
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(5),
  },
  resultItem: {
    paddingBottom: theme.spacing(2),
    maxWidth: "832px",
    paddingLeft: 0,
  },
  resultExcerpt: {
    display: "block",
    marginBottom: theme.spacing(2),
    maxWidth: "832px",
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
      <Masthead />
      <ErrorBanner showHeader={showErrorNotification} onClick={closeErrorNotification} message={error} />
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
            <Typography variant="h2" sx={classes.resultsHeader}>
              Showing 1-{searchResults.PageSize} of {searchResults.TotalNumberOfResults} results
            </Typography>
            <List>
              {searchResults.ResultItems.map((doc) => (
                <ListItem key={doc.DocumentId} alignItems="flex-start" sx={classes.resultItem}>
                  <ListItemText
                    primary={
                      <Link href={doc.DocumentURI} target="_blank" rel="noopener noreferrer" underline="hover">
                        <Typography variant="h1" component="span" sx={classes.resultExcerpt}>
                          {highlightText(doc.DocumentTitle.Text, searchQuery)}
                        </Typography>
                      </Link>
                    }
                    secondary={
                      <>
                        <Typography variant="body1" component="span" sx={classes.resultExcerpt}>
                          {highlightText(doc.DocumentExcerpt.Text, searchQuery)}
                        </Typography>
                        <Typography variant="body2" component="span" sx={classes.resultExcerpt}>
                          {highlightText(doc.DocumentURI, searchQuery)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid2>
        </Grid2>}
      </Box >
    </>
  );
};


export default SearchPage;
