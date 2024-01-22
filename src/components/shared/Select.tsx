import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Select.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: {
        value: string;
        label: string;
    }[];
    setOption: (e: string) => void;
    param: string;
}

const Select: React.FC<SelectProps> = ({ options, setOption, param, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const addFilterToUrl = (e: string) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(param, e);
        if (e === '') searchParams.delete(param);
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        setOption(e);
    };

    return (
        <div className="selectContainer">
            <label htmlFor={param} className="selectLabel">
                {param.charAt(0).toUpperCase() + param.slice(1)}
            </label>
            <select
                className="selectElement"
                data-testid={`select-${param}`}
                name={param}
                {...props}
                onChange={(e) => addFilterToUrl(e.target.value)}
            >
                {options.map((option, index) => (
                    <option key={`${option.value}-${index}`} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
