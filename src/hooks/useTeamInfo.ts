import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Team } from '../types';

export const useTeamInfo = () => {
    const [team, setTeam] = useState<Team | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeamInfo = async () => {
            try {
                setIsLoading(true);
                const teamData = await api.getTeamInfo();
                setTeam(teamData);
            } catch (err) {
                setError('Failed to fetch team info');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamInfo();
    }, []); // The empty array means this effect runs only once when the component mounts

    return { team, isLoading, error };
};