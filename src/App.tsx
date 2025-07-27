import { TeamInfo } from './components/TeamInfo';
import { PlayerRoster } from './components/PlayerRoster';
import { RecentGames } from './components/RecentGames';
import { usePlayers } from './hooks/usePlayers';

function App() {
    const { players, isLoading: isLoadingPlayers, error: playersError } = usePlayers();

    return (
        <div className="dashboard-container">
            <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4 shadow-lg flex items-center justify-center space-x-4">
                <h1 className="text-2xl font-bold text-yellow-400 tracking-wider">
                    Golden State Warriors Dashboard
                </h1>
            </header>
            <main className="main-content">
                {/* Correctly pass the fetched players list to TeamInfo */}
                <TeamInfo />
                <PlayerRoster players={players} isLoading={isLoadingPlayers} error={playersError} />
                <RecentGames />
            </main>
        </div>
    );
}

export default App;