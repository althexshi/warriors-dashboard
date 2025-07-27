export interface Player {
    idPlayer: string;
    strPlayer: string;
    strPosition: string;
    strThumb: string;
    dateBorn: string;
    strNumber: string;
    strHeight: string;
    strWeight: string;
    strDescriptionEN: string;
    strTeam: string;
}

export interface Team {
    idTeam: string;
    strTeam: string;
    strStadium: string;
    strStadiumThumb: string;
    intFormedYear: string;
    strLeague: string;
    strDescriptionEN: string;
    strBadge: string;
    strTeamJersey: string;
}

// ...existing code...
export interface Game {
    idEvent: string;
    strEvent: string;
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore: string;
    intAwayScore: string;
    dateEvent: string;
}

// --- New Types for balldontlie.io ---
export interface BdlPlayer {
    id: number;
    first_name: string;
    last_name: string;
}

export interface SeasonAverages {
    games_played: number;
    pts: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
    turnover: number;
}