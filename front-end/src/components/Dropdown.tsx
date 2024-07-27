import React, { useState } from "react";
import "../styles/dropdown.css";

interface DropdownProps {
    options: string[];
    onSelect: (selectedOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
    const [selected, setSelected] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setSelected(selectedOption);
        onSelect(selectedOption);
    };

    return (
        <select value={selected} onChange={handleChange} className="dropdown">
            <option value="" disabled>
                Select an option
            </option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
