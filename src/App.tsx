import * as React from 'react';
import StandingsTable from "./StandingsTable";
import Spacer from "./Spacer";

export default function App() {
    return (
        <>
            <h1 className="center">Score Keeper</h1>

            <Spacer y={4}/>

            <div className="center">
                <StandingsTable/>
            </div>
        </>
    );
}
