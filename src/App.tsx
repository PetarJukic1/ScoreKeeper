import * as React from 'react';
import StandingsTable from "./components/StandingsTable";
import Spacer from "./components/Spacer";
import MatchList from "./components/MatchList";
import {Matches, MatchesByRounds} from "./components/Dataset";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import {IsAdmin, IsLoggedIn, GetUsername} from "./components/Profile";
import RoundList from "./components/RoundList";
import MatchItem from "./components/MatchItem";

export default function App() {
    const loggedIn: boolean = IsLoggedIn()
    const isAdmin: boolean = IsAdmin()
    const email: string = GetUsername()
    return (
        <>
            <div>
                <div className="row">
                    {loggedIn && (<div>{email}</div>)}
                    {isAdmin && (<div>admin</div>)}

                    {loggedIn && (
                        <div>
                            <LogoutButton/>
                        </div>
                    )}
                    {!loggedIn && (<div></div>)}
                    {!loggedIn && (
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

            {MatchesByRounds.map((rounds, index) => (
                <div>
                    <div className="subtitle">
                        <Spacer x={4}/>

                        <h2>Round {index +1}:</h2>
                    </div>
                    <MatchList key={index} matches={rounds.matches} />
                </div>
            ))}
        </>
    );
}
