import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PlayerStatsDisplayProps {
    stats: any;
    isLoading: boolean;
    error: string | null;
}

export const PlayerStatsDisplay: React.FC<PlayerStatsDisplayProps> = ({ stats, isLoading, error }) => {
    const chartData = stats ? [
        { name: 'PTS', value: stats.pts },
        { name: 'REB', value: stats.reb },
        { name: 'AST', value: stats.ast },
    ] : [];

    return (
        <div className="mt-6 border-t pt-4">
            <h3 className="title-secondary">2023-2024 Season Averages</h3>
            {isLoading && <p className="loading-text">Loading stats...</p>}
            {error && <p className="error-text">{error}</p>}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-2 text-sm">
                        <p><strong>Games Played:</strong> {stats.games_played}</p>
                        <p><strong>Points:</strong> {stats.pts}</p>
                        <p><strong>Rebounds:</strong> {stats.reb}</p>
                        <p><strong>Assists:</strong> {stats.ast}</p>
                        <p><strong>Steals:</strong> {stats.stl}</p>
                        <p><strong>Blocks:</strong> {stats.blk}</p>
                    </div>
                    <div>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={30} />
                                <Tooltip cursor={{fill: 'rgba(255, 199, 44, 0.2)'}}/>
                                <Bar dataKey="value" fill="#006BB6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};
