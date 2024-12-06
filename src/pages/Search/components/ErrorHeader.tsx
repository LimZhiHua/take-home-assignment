import React from "react";
import { NotificationBanner } from "@lifesg/react-design-system/notification-banner";

interface ErrorBannerProps {
    showHeader: boolean;
    onClick: () => void;
    message: string;
}

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
