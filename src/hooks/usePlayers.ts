import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Player } from '../types';

export const usePlayers = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setIsLoading(true);
                const playerData = await api.getPlayers();
                setPlayers(playerData);
            } catch (err) {
                setError('Failed to fetch players');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    return { players, isLoading, error };
};