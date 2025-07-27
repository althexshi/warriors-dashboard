import React from 'react';
import type { Game } from '../types';

export const GameResultCard: React.FC<{ game: Game }> = ({ game }) => {
    const isWarriorsHome = game.strHomeTeam === 'Golden State Warriors';
    const warriorsScore = isWarriorsHome ? game.intHomeScore : game.intAwayScore;
    const opponentScore = isWarriorsHome ? game.intAwayScore : game.intHomeScore;
    const opponentTeam = isWarriorsHome ? game.strAwayTeam : game.strHomeTeam;
    const isWin = Number(warriorsScore) > Number(opponentScore);

    return (
        <div className={`card-container mb-4 flex justify-between items-center border-l-4 ${isWin ? 'border-win' : 'border-loss'}`}>
            <div>
                <p className="text-muted">{new Date(game.dateEvent).toLocaleDateString()}</p>
                <p className="text-lg font-bold">
                    {isWarriorsHome ? 'vs' : '@'} {opponentTeam}
                </p>
            </div>
            <div className="text-right">
                <p className={`text-2xl font-bold ${isWin ? 'status-win' : 'status-loss'}`}>
                    {warriorsScore} - {opponentScore}
                </p>
                <p className={`text-lg font-semibold ${isWin ? 'status-win' : 'status-loss'}`}>
                    {isWin ? 'W' : 'L'}
                </p>
            </div>
        </div>
    );
};