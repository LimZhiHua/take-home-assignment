import React from "react";
import { Box, Button, Typography, useTheme } from '@mui/material';
import searchIcon from '../icons/search.svg';
import { Theme } from '@mui/material/styles';

const styles = (theme: Theme) => ({
    searchButton: {
        height: "56px",
        width: "153px",
        marginLeft: "-3px",
        [theme.breakpoints.down("md")]: {
            width: "76px",
            padding: "3px 8px"
        },
    },
    searchIcon: {
        width: "26px",
        height: "26px",
        marginRight: "4px",
        [theme.breakpoints.down("md")]: {
            width: "13px",
            height: "13px",
            marginRight: "1px",
        },
    },
    searchText: {
        fontSize: "16px",
        [theme.breakpoints.down("md")]: {
            fontSize: "8px",
        },
    }
});

interface SearchButtonProps {
    onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
    const theme = useTheme();
    const classes = styles(theme);
    console.log("DELETEME classes is", classes)
    console.log("DELETEME window size is", window.innerWidth)
    return (
        <Button
            aria-label="Search Button"
            variant="contained"
            color="primary"
            sx={classes.searchButton}
            onClick={onClick}
        >
            <Box data-testid="search-icon" component="img" src={searchIcon} alt="" sx={classes.searchIcon}></Box>
            <Typography data-testid="search-text" sx={classes.searchText}>Search</Typography>
        </Button>
    );
};

export default SearchButton;
