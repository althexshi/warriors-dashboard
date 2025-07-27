import React from 'react';
import type { Player } from '../types';

interface PlayerCardProps {
    player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className="player-card flex flex-col h-full">
            <img
                className="player-card-image"
                src={player.strThumb ? `${player.strThumb}/preview` : 'https://via.placeholder.com/400x300'}
                alt={player.strPlayer}
            />
            <div className="player-card-content">
                <div className="flex-grow">
                    <h3 className="player-name" title={player.strPlayer}>
                        {player.strPlayer}
                    </h3>
                    <p className="player-position">{player.strPosition}</p>
                </div>
                <p className="player-jersey">Jersey: #{player.strNumber}</p>
            </div>
        </div>
    );
};