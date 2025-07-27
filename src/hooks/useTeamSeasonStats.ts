import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Player } from '../types';

interface AggregatedStats {
    pts: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
}

export const useTeamSeasonStats = (players: Player[]) => {
    const [stats, setStats] = useState<AggregatedStats | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (players.length === 0) {
            setIsLoading(false);
            return;
        }

        const fetchAllPlayerStats = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const allStatsPromises = players.map(async (player) => {
                    const bdlPlayer = await api.searchPlayerOnBdl(player.strPlayer);
                    if (bdlPlayer) {
                        return await api.getPlayerSeasonAverages(bdlPlayer.id);
                    }
                    return null;
                });

                const allStats = await Promise.all(allStatsPromises);

                const aggregated: AggregatedStats = { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0 };

                allStats.forEach(playerStats => {
                    if (playerStats) {
                        aggregated.pts += playerStats.pts;
                        aggregated.reb += playerStats.reb;
                        aggregated.ast += playerStats.ast;
                        aggregated.stl += playerStats.stl;
                        aggregated.blk += playerStats.blk;
                    }
                });
                
                // Round totals to one decimal place
                Object.keys(aggregated).forEach(key => {
                    aggregated[key as keyof AggregatedStats] = Math.round(aggregated[key as keyof AggregatedStats] * 10) / 10;
                });

                setStats(aggregated);

            } catch (err) {
                console.error(err);
                setError('Failed to fetch team season stats.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllPlayerStats();
    }, [players]);

    return { stats, isLoading, error };
};