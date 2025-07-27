import React from 'react';
import type { Team } from '../types';

interface TeamHeaderProps {
    team: Team;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
    return (
        <div className="flex items-center">
            <img 
                src={team.strBadge || 'https://www.thesportsdb.com/images/media/team/badge/uyyvqt1426884514.png'} 
                alt={`${team.strTeam} Badge`} 
                className="h-24 w-24 mr-6"
            />
            <div>
                <h1 className="title-primary">{team.strTeam}</h1>
                <p className="subtitle">Established in {team.intFormedYear}</p>
            </div>
        </div>
    );
};
