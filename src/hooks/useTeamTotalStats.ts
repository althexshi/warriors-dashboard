import { useState, useEffect } from 'react';
import { api } from '../services/api';

// A simplified representation of what total season stats might look like.
interface TeamTotalStats {
    pts: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
    games_played: number;
}

export const useTeamTotalStats = (teamId: number | undefined) => {
    const [stats, setStats] = useState<TeamTotalStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!teamId) {
            setIsLoading(false);
            return;
        }

        const fetchTeamTotals = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // The balldontlie.io API does not have a direct endpoint for team season totals.
                // We are using a placeholder function in our api service (api.ts)
                // that returns hardcoded values for the Golden State Warriors for the 2023 season.
                const totalStats = await api.getTeamSeasonTotals(teamId);
                if (totalStats) {
                    setStats(totalStats);
                } else {
                    setError('Could not fetch team total season stats.');
                }
            } catch (err) {
                setError('An error occurred while fetching team total stats.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamTotals();
    }, [teamId]);

    return { stats, isLoading, error };
};
