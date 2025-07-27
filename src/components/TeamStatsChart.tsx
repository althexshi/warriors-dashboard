import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TeamStatsChartProps {
    teamTotalStats: any;
    isLoading: boolean;
    error: string | null;
}

export const TeamStatsChart: React.FC<TeamStatsChartProps> = ({ teamTotalStats, isLoading, error }) => {
    const chartData = teamTotalStats ? [
        { name: 'Points', value: parseFloat((teamTotalStats.pts / teamTotalStats.games_played).toFixed(1)) },
        { name: 'Rebounds', value: parseFloat((teamTotalStats.reb / teamTotalStats.games_played).toFixed(1)) },
        { name: 'Assists', value: parseFloat((teamTotalStats.ast / teamTotalStats.games_played).toFixed(1)) },
        { name: 'Steals', value: parseFloat((teamTotalStats.stl / teamTotalStats.games_played).toFixed(1)) },
        { name: 'Blocks', value: parseFloat((teamTotalStats.blk / teamTotalStats.games_played).toFixed(1)) },
    ].sort((a, b) => a.value - b.value) : [];

    return (
        <div className="flex flex-col">
            <h3 className="title-secondary">Team Stats Per Game</h3>
            <p className="text-muted">(2023-24 Regular Season)</p>
            {isLoading && <p className="loading-text">Loading stats...</p>}
            {error && <p className="error-text">{error}</p>}
            {teamTotalStats && (
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={60} />
                        <Tooltip cursor={{fill: 'rgba(255, 199, 44, 0.2)'}}/>
                        <Bar dataKey="value" fill="#006BB6" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};
