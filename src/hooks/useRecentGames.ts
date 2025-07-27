import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Game } from '../types';

export const useRecentGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecentGames = async () => {
            try {
                setIsLoading(true);
                // The API might return null if there are no recent games
                const gameData = await api.getRecentGames() || [];
                setGames(gameData);
            } catch (err) {
                setError('Failed to fetch recent games');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecentGames();
    }, []);

    return { games, isLoading, error };
};