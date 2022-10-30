import * as React from 'react';
import StandingsTable from "./components/StandingsTable";
import Spacer from "./components/Spacer";
import MatchList from "./components/MatchList";
import Dataset from "./components/Dataset";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import {IsAdmin, IsLoggedIn, GetUsername} from "./components/Profile";

export default function App() {
    return (
        <>
            <div>
                <div className="row">
                    {IsLoggedIn() && (<div>{GetUsername()}</div>)}
                    {IsAdmin() && (<div>admin</div>)}

                    {IsLoggedIn() && (
                        <div>
                            <LogoutButton/>
                        </div>
                    )}
                    {!IsLoggedIn() && (<div></div>)}
                    {!IsLoggedIn() && (
                        <div className="right">
                            <LoginButton/>
                        </div>
                    )}
                </div>
                <h1 className="center">Score Keeper</h1>
            </div>
            <Spacer y={2}/>

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
