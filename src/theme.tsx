import { createTheme } from '@mui/material/styles';
import "./index"

const theme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: 'Open Sans, sans-serif',
        h1: {
            fontSize: "22px",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--color-tertiary)",
            lineHeight: "28px",
            wordBreak: "break-word",
            overflowWrap: "break-word"
        },
        h2: {
            fontSize: "22px",
            fontWeight: "var(--font-weight-regular)",
            lineHeight: "28px",
            wordBreak: "break-word",
            overflowWrap: "break-word"
        },
        body1: {
            fontSize: "var(--font-size-body)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--color-primary)",
            lineHeight: "24px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
        },
        body2: {
            fontSize: "var(--font-size-small)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--color-secondary)",
            wordBreak: "break-word",
            overflowWrap: "break-word"
        },
    },
    breakpoints: {
        values: {
            xs: 0,      // Extra small devices
            sm: 480,    // Small devices
            md: 768,    // Medium devices
            lg: 1024,   // Large devices
            xl: 1440,   // Extra large devices
        },
    }
});


export default theme;
