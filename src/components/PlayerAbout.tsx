import React from 'react';
import type { Player } from '../types';

interface PlayerAboutProps {
    player: Player;
}

export const PlayerAbout: React.FC<PlayerAboutProps> = ({ player }) => {
    return (
        <div className="mt-6 border-t pt-4">
            <h3 className="title-secondary">About</h3>
            <p className="text-description">{player.strDescriptionEN || 'No biography available.'}</p>
        </div>
    );
};
