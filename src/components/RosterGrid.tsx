import React from 'react';
import { PlayerCard } from './PlayerCard';
import type { Player } from '../types';

interface RosterGridProps {
    players: Player[];
    onPlayerClick: (player: Player) => void;
    searchTerm: string;
}

export const RosterGrid: React.FC<RosterGridProps> = ({ players, onPlayerClick, searchTerm }) => {
    if (players.length === 0 && searchTerm) {
        return (
            <div className="text-center py-8">
                <p className="text-muted">No players found matching "{searchTerm}"</p>
            </div>
        );
    }

    return (
        <div className="grid-layout">
            {players.map((player) => (
                <div key={player.idPlayer} onClick={() => onPlayerClick(player)} className="clickable">
                    <PlayerCard player={player} />
                </div>
            ))}
        </div>
    );
};
