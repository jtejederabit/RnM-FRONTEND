import React from "react";
import { useDispatch } from "react-redux";
import { loginSlice } from "../../store/loginSlice.ts";
import { useNavigate } from "react-router-dom";
import './NavigationBar.css'; // Import the external CSS file

const NavigationBar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(loginSlice.actions.clearToken());
        navigate('/login');
    };

    return (
        <div className="navigationBar">
            <span className="logoContainer">
                <img src="/img.png" alt="logo" className="logo"/>
            </span>
            <span className="logoutButtonContainer">
                <button onClick={logOut}>Logout</button>
            </span>
        </div>
    );
}

export default NavigationBar;
