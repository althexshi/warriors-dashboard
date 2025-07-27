// filepath: /Users/jianqishi/warriors-dashboard/src/hooks/usePlayerStats.ts
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { SeasonAverages } from '../types';

export const usePlayerStats = (playerName: string) => {
    const [stats, setStats] = useState<SeasonAverages | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Don't fetch if there's no player name
        if (!playerName) {
            setIsLoading(false);
            return;
        }

        const fetchStats = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // First, find the player on balldontlie.io to get their ID
                const bdlPlayer = await api.searchPlayerOnBdl(playerName);

                if (bdlPlayer) {
                    // If found, use the ID to get their season averages
                    const seasonAverages = await api.getPlayerSeasonAverages(bdlPlayer.id);
                    if (seasonAverages) {
                        setStats(seasonAverages);
                    } else {
                        // Handle case where player is found but has no stats for the season
                        setError('No stats available for the 2023-2024 season.');
                    }
                } else {
                    // Handle case where player is not found on the stats API
                    setError('Player not found in the stats database.');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch player stats.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [playerName]); // Re-run the effect if the player name changes

    return { stats, isLoading, error };
};