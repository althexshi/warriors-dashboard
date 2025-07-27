import React from 'react';
import type { Player } from '../types';

interface PlayerBasicInfoProps {
    player: Player;
}

const getFirstPart = (value: string | undefined) => {
    if (!value) return 'N/A';
    return value.split('(')[0].trim();
};

export const PlayerBasicInfo: React.FC<PlayerBasicInfoProps> = ({ player }) => {
    return (
        <div className="flex flex-col md:flex-row">
            <img 
                src={player.strThumb ? `${player.strThumb}/preview` : 'https://via.placeholder.com/400x300'} 
                alt={player.strPlayer} 
                className="player-card-image md:w-1/3 md:h-auto"
            />
            <div className="md:pl-6 mt-4 md:mt-0">
                <h2 className="title-primary">{player.strPlayer}</h2>
                <p className="player-position">{player.strPosition}</p>
                <p className="text-muted mt-1">Jersey: #{player.strNumber}</p>
                
                <div className="stats-grid text-center">
                    <div className="stat-item">
                        <p className="stat-label">{getFirstPart(player.strHeight)}</p>
                        <p className="text-muted">Height</p>
                    </div>
                    <div className="stat-item">
                        <p className="stat-label">{getFirstPart(player.strWeight)}</p>
                        <p className="text-muted">Weight</p>
                    </div>
                    <div className="stat-item">
                        <p className="stat-label">{player.dateBorn || 'N/A'}</p>
                        <p className="text-muted">Born</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
