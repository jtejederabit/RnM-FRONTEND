import React from "react";
import './Loading.css';
const Loading: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 181.81px)',
        }}>
            <img
                src="/img_1.png"
                alt="logo"
                className="loadingImage"
            />
        </div>
    );
}

export default Loading;