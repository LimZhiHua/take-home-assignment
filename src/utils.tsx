import React from "react";

export const highlightText = (text: string, searchQuery: string): JSX.Element => {
    if (!searchQuery) {
        return (<>{text}</>)
    }
    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);
    return (
        <>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <span key={index} style={{ fontWeight: "var(--font-weight-bold)" }}>
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
};