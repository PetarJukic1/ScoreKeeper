import React from "react";
import Match from "./Match";
import MatchItem from "./MatchItem";
import Spacer from "./Spacer";

export default function MatchList({matches}: { matches: Array<Match> }) {
    return (
        <>
            {matches.map(match => {
                return <MatchItem match={match}/>
            })}
            <Spacer y={4}/>
        </>
    )
}