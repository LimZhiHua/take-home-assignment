import React from "react";
import { Link, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { highlightText } from "../../../utils";
import { SearchResultResponse } from "../Search";

const styles = (theme: Theme) => ({
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

interface SearchResultsProps {
    searchResults: SearchResultResponse,
    searchQuery: string
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, searchQuery }) => {
    const theme = useTheme();
    const classes = styles(theme);
    return (
        <><Typography variant="h2" sx={classes.resultsHeader}>
            Showing 1-{searchResults.PageSize} of {searchResults.TotalNumberOfResults} results
        </Typography><List>
                {searchResults.ResultItems.map((doc) => (
                    <ListItem key={doc.DocumentId} alignItems="flex-start" sx={classes.resultItem}>
                        <ListItemText
                            primary={<Link href={doc.DocumentURI} target="_blank" rel="noopener noreferrer" underline="hover">
                                <Typography variant="h1" component="span" sx={classes.resultExcerpt}>
                                    {highlightText(doc.DocumentTitle.Text, searchQuery)}
                                </Typography>
                            </Link>}
                            secondary={<>
                                <Typography variant="body1" component="span" sx={classes.resultExcerpt}>
                                    {highlightText(doc.DocumentExcerpt.Text, searchQuery)}
                                </Typography>
                                <Typography variant="body2" component="span" sx={classes.resultExcerpt}>
                                    {highlightText(doc.DocumentURI, searchQuery)}
                                </Typography>
                            </>} />
                    </ListItem>
                ))}
            </List></>
    );
};

export default SearchResults;
