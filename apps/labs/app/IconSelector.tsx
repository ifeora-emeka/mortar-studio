'use client'
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";

interface AllowedIconsType {
    name: string;
    importPath: string;
}

const allowedIcons: AllowedIconsType[] = [
    {
        name: 'FontAwesome',
        importPath: 'react-icons/fa',
    },
    {
        name: 'MaterialDesign',
        importPath: 'react-icons/md',
    },
    {
        name: 'AntDesign',
        importPath: 'react-icons/ai',
    },
]

interface SelectedIcon {
    type: string;
    icons: string[];
}

const IconSelector = () => {
    const iconTypes = {
        FontAwesome: FaIcons,
        MaterialDesign: MdIcons,
        AntDesign: AiIcons,
    };

    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedIcons, setSelectedIcons] = useState<SelectedIcon[]>([]);

    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
    };

    const handleIconSelect = (iconName: string) => {
        if (!selectedType) return;

        const existingType = selectedIcons.find((item) => item.type === selectedType);

        if (existingType) {
            if (!existingType.icons.includes(iconName)) {
                setSelectedIcons((prev) =>
                    prev.map((item) =>
                        item.type === selectedType ? { ...item, icons: [...item.icons, iconName] } : item
                    )
                );
            }
        } else {
            setSelectedIcons((prev) => [...prev, { type: selectedType, icons: [iconName] }]);
        }
    };

    const handleRemove = (type: string, iconName: string) => {
        setSelectedIcons((prev) =>
            prev.map((item) =>
                item.type === type
                    ? { ...item, icons: item.icons.filter((name) => name !== iconName) }
                    : item
            ).filter((item) => item.icons.length > 0)
        );
    };

    return (
        <div>
            <h1>Icon Selector</h1>

            <h2>Select Icon Type</h2>
            <div style={{ display: "flex", gap: "10px" }}>
                {Object.keys(iconTypes).map((type) => (
                    <button
                        key={type}
                        onClick={() => handleTypeSelect(type)}
                        style={{
                            padding: "10px",
                            border: selectedType === type ? "2px solid blue" : "1px solid gray",
                        }}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <h2>Available Icons</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                {selectedType &&
                    Object.keys(iconTypes[selectedType]).map((iconName) => {
                        const IconComponent = iconTypes[selectedType][iconName as keyof typeof FaIcons];
                        return (
                            <button
                                key={iconName}
                                onClick={() => handleIconSelect(iconName)}
                                style={{
                                    border: "1px solid gray",
                                    padding: "10px",
                                    borderRadius: "5px",
                                }}
                            >
                                <IconComponent size={24} />
                                <div>{iconName}</div>
                            </button>
                        );
                    })}
            </div>

            <h2>Selected Icons</h2>
            <div style={{ marginTop: "10px" }}>
                {selectedIcons.map(({ type, icons }) => (
                    <div key={type} style={{ marginBottom: "20px" }}>
                        <h3>{type}</h3>
                        <div style={{ display: "flex", gap: "10px" }}>
                            {icons.map((iconName) => {
                                const IconComponent = iconTypes[type][iconName as keyof typeof FaIcons];
                                return (
                                    <div
                                        key={iconName}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            border: "1px solid gray",
                                            padding: "10px",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <IconComponent size={24} />
                                        <span>{iconName}</span>
                                        <button
                                            onClick={() => handleRemove(type, iconName)}
                                            style={{ marginLeft: "10px", cursor: "pointer" }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IconSelector;
