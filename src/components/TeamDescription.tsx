import React, { useState } from 'react';

interface TeamDescriptionProps {
    description: string;
}

export const TeamDescription: React.FC<TeamDescriptionProps> = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayText = isExpanded ? description : `${description.substring(0, 250)}...`;

    return (
        <>
            <p className="mt-4 text-description transition-all duration-300">
                {displayText}
            </p>
            {description.length > 250 && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="link-button"
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            )}
        </>
    );
};
