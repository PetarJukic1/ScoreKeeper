import React from "react";
import Match from "./Match";
import MatchItem from "./MatchItem";
import Spacer from "./Spacer";

export default function MatchList({matches}: { matches: Array<Match>}) {
    return (
        <>
            {matches.map((match, index) => {
                return <MatchItem key={index} match={match} matchId={index}/>
            })}
            <Spacer y={4}/>
        </>
    )
}