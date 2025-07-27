import React from 'react';
import { useRecentGames } from '../hooks/useRecentGames';
import { GameResultCard } from './GameResultCard'; // Import the new component
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const RecentGames: React.FC = () => {
    const { games, isLoading, error } = useRecentGames();

    if (isLoading) return <p className="loading-text">Loading recent games...</p>;
    if (error) return <p className="error-text">Error loading games: {error}</p>;
    if (games.length === 0) return <p className="text-muted">No recent games found.</p>;

    const chartData = games.slice(0, 5).map(game => {
        const isWarriorsHome = game.strHomeTeam === 'Golden State Warriors';
        return {
            name: (isWarriorsHome ? game.strAwayTeam : game.strHomeTeam).split(' ').pop(),
            Warriors: Number(isWarriorsHome ? game.intHomeScore : game.intAwayScore),
            Opponent: Number(isWarriorsHome ? game.intAwayScore : game.intHomeScore),
        };
    }).reverse();

    return (
        <div className="my-8">
            <h2 className="section-title">Recent Games</h2>
            
            <div className="card-container mb-8">
                <h3 className="title-secondary">Last 5 Games Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Warriors" fill="#FFC72C" />
                        <Bar dataKey="Opponent" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div>
                {games.map((game) => (
                    <GameResultCard key={game.idEvent} game={game} />
                ))}
            </div>
        </div>
    );
};