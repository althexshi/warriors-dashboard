import React, { useState, useMemo } from 'react';
import type { Player } from '../types';
import { PlayerModal } from './PlayerModal';
import { RosterFilters } from './RosterFilters';
import { RosterGrid } from './RosterGrid';

interface PlayerRosterProps {
    players: Player[];
    isLoading: boolean;
    error: string | null;
}

export const PlayerRoster: React.FC<PlayerRosterProps> = ({ players, isLoading, error }) => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedPosition, setSelectedPosition] = useState<string>('All');

    const positions = useMemo(() => 
        ['All', ...Array.from(new Set(players.map(player => player.strPosition)))]
    , [players]);

    const filteredPlayers = useMemo(() => 
        players.filter(player => {
            const matchesSearch = player.strPlayer.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPosition = selectedPosition === 'All' || player.strPosition === selectedPosition;
            return matchesSearch && matchesPosition;
        })
    , [players, searchTerm, selectedPosition]);

    if (isLoading) return <div className="loading-text">Loading player roster...</div>;
    if (error) return <div className="error-text">{error}</div>;

    return (
        <div className="my-8">
            <h2 className="section-title">Player Roster</h2>
            
            <RosterFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedPosition={selectedPosition}
                setSelectedPosition={setSelectedPosition}
                positions={positions}
                filteredPlayersCount={filteredPlayers.length}
                totalPlayersCount={players.length}
            />

            <RosterGrid
                players={filteredPlayers}
                onPlayerClick={setSelectedPlayer}
                searchTerm={searchTerm}
            />

            {selectedPlayer && (
                <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
            )}
        </div>
    );
};