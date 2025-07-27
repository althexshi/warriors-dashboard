import React from 'react';
import type { Player } from '../types';
import { usePlayerStats } from '../hooks/usePlayerStats';
import { PlayerBasicInfo } from './PlayerBasicInfo';
import { PlayerStatsDisplay } from './PlayerStatsDisplay';
import { PlayerAbout } from './PlayerAbout';

interface PlayerModalProps {
    player: Player;
    onClose: () => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose }) => {
    const { stats, isLoading: isLoadingStats, error: statsError } = usePlayerStats(player.strPlayer);

    return (
        <div onClick={onClose} className="modal-overlay">
            <div onClick={(e) => e.stopPropagation()} className="modal-content p-6 relative">
                <button onClick={onClose} className="close-btn">&times;</button>
                
                <PlayerBasicInfo player={player} />
                <PlayerStatsDisplay stats={stats} isLoading={isLoadingStats} error={statsError} />
                <PlayerAbout player={player} />
            </div>
        </div>
    );
};