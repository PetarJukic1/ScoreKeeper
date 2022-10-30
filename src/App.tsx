import * as React from 'react';
import StandingsTable from "./StandingsTable";
import Spacer from "./Spacer";
import MatchList from "./MatchList";
import Dataset from "./Dataset";

export default function App() {
    return (
        <>
            <h1 className="center">Score Keeper</h1>

            <div className="subtitle">
                <Spacer x={4}/>

                <h2>Standings:</h2>
            </div>

            <Spacer y={4}/>

            <div className="center">
                <StandingsTable/>
            </div>

            <Spacer y={4}/>

            <div className="subtitle">
                <Spacer x={4}/>

                <h2>Matches:</h2>
            </div>

            <MatchList matches={Dataset.matches}/>
        </>
    );
}
