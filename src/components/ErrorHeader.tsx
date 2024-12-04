import React from "react";
import { NotificationBanner } from "@lifesg/react-design-system/notification-banner";

// Define the type for the props
interface ErrorBannerProps {
    showHeader: boolean;
    onClick: () => void;
    message: string;
}

// Define the ErrorBanner component
const ErrorBanner: React.FC<ErrorBannerProps> = ({ showHeader, onClick, message }) => {
    if (showHeader) {
        return (

            <NotificationBanner
                onClick={onClick}
                style={{
                    borderColor: "var(--color-error)", color: 'white', width: "50%",
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >{message}</NotificationBanner>
        );
    } else {
        return <></>
    }

};

export default ErrorBanner;
