import React from "react";
const ErrorMessage: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 176.81px)',
        }}>
            <h1>Page not found...</h1>
        </div>
    );
}

export default ErrorMessage;