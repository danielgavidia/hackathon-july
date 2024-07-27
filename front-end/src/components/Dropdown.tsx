import React, { useState } from "react";

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
        <div>
            <select value={selected} onChange={handleChange}>
                <option value="" disabled>
                    Select an option
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
