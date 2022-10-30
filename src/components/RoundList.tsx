import React from "react";
import Match from "./Match";
import Spacer from "./Spacer";
import MatchItem from "./MatchItem";

export default function RoundList({matches}: { matches: Array<Match> }){
    {matches.map((match, index) => (
        <div>
            <div className="subtitle">
                <Spacer x={4}/>

                <h2>Matches:</h2>
            </div>
            <MatchItem match={match} matchId={index}/>
        </div>
    ))}
}