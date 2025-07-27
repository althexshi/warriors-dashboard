import React from 'react';
import { useTeamInfo } from '../hooks/useTeamInfo';
import { useTeamTotalStats } from '../hooks/useTeamTotalStats';
import { TeamHeader } from './TeamHeader';
import { TeamDescription } from './TeamDescription';
import { TeamStatsChart } from './TeamStatsChart';

interface TeamInfoProps {}

export const TeamInfo: React.FC<TeamInfoProps> = () => {
    const { team, isLoading: isLoadingInfo, error: infoError } = useTeamInfo();
    const { stats: teamTotalStats, isLoading: isLoadingStats, error: statsError } = useTeamTotalStats(10);

    if (isLoadingInfo) {
        return <div className="loading-text">Loading team info...</div>;
    }

    if (infoError) {
        return <div className="error-text">{infoError}</div>;
    }

    if (!team) {
        return null;
    }

    const description = team.strDescriptionEN || '';

    return (
        <div className="card-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <TeamHeader team={team} />
                    <TeamDescription description={description} />
                </div>
                <TeamStatsChart 
                    teamTotalStats={teamTotalStats} 
                    isLoading={isLoadingStats} 
                    error={statsError} 
                />
            </div>
        </div>
    );
};