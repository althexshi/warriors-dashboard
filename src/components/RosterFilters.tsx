import React from 'react';

interface RosterFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedPosition: string;
    setSelectedPosition: (position: string) => void;
    positions: string[];
    filteredPlayersCount: number;
    totalPlayersCount: number;
}

export const RosterFilters: React.FC<RosterFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    selectedPosition,
    setSelectedPosition,
    positions,
    filteredPlayersCount,
    totalPlayersCount,
}) => {
    return (
        <div className="mb-6">
            <div className="relative max-w-md mx-auto mb-4">
                <input
                    type="text"
                    placeholder="Search players by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {positions.map((position) => (
                    <button
                        key={position}
                        onClick={() => setSelectedPosition(position)}
                        className={selectedPosition === position ? 'btn-primary' : 'btn-secondary'}
                    >
                        {position}
                    </button>
                ))}
            </div>
            
            {(searchTerm || selectedPosition !== 'All') && (
                <p className="text-muted mt-2">
                    Showing {filteredPlayersCount} of {totalPlayersCount} players
                    {selectedPosition !== 'All' && ` (${selectedPosition})`}
                </p>
            )}
        </div>
    );
};
