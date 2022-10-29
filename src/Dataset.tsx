import * as React from 'react';
import {Stats} from "fs";

interface Opponents {
    hostClub: string,
    guestClub: string,
}


const clubs: Array<string> = ['Dinamo Zagreb', 'Hajduk Split', 'Osijek', 'Varaždin', 'Slaven Belupo']

function generatePairs(clubs: Array<string>) {
    let clubPairs = new Array<Opponents>()
    for (let i = 0; i < clubs.length; i++) {
        for (let j = i; j < clubs.length; j++) {
            if (clubs[i] == clubs[j]) continue
            clubPairs.push({hostClub: clubs[i], guestClub: clubs[j]})
            clubPairs.push({hostClub: clubs[j], guestClub: clubs[i]})
        }
    }
    return clubPairs
}

const clubPairs = generatePairs(clubs)

interface Match {
    opponents: Opponents,
    finished: boolean,
    goals: Array<number>,
}

function createMatch(
    opponents: Opponents,
    finished: boolean,
    goals?: Array<number>,
) {
    return {opponents, finished, goals} as Match
}

const finishedMatches: Array<Match> = [
    createMatch(clubPairs[0], true, [3, 4]),
    createMatch(clubPairs[2], true, [0, 0]),
    createMatch(clubPairs[3], true, [0, 0]),
    createMatch(clubPairs[4], true, [1, 2]),
    createMatch(clubPairs[6], true, [2, 0]),
    createMatch(clubPairs[7], true, [5, 0]),
    createMatch(clubPairs[11], true, [4, 4]),
    createMatch(clubPairs[15], true, [1, 1]),
    createMatch(clubPairs[16], true, [2, 2]),
    createMatch(clubPairs[17], true, [1, 3]),
]

console.log(finishedMatches)

interface ClubStats {
    clubName: string,
    points: number,
    totalNumberOfGoals: number
}

function initializeClubStats(clubs: Array<string>) {
    let clubStats: Array<ClubStats> = []
    for (let i = 0; i < clubs.length; i++) {
        clubStats.push({clubName: clubs[i], points: 0, totalNumberOfGoals: 0})
    }

    return clubStats
}

function calculatePoints(firstClubGoals: number, secondClubGoals: number){
    if(firstClubGoals > secondClubGoals){
        return 3
    }else if(firstClubGoals < secondClubGoals){
        return 0
    }else{
        return 1
    }
}

function updateStandings(clubStats: Array<ClubStats>, match: Match) {
    for (let i = 0; i < clubStats.length; i++) {
        if(clubStats[i].clubName == match.opponents.hostClub){
            clubStats[i].totalNumberOfGoals += match.goals[0]
            clubStats[i].points += calculatePoints(match.goals[0], match.goals[1])
        }
        if(clubStats[i].clubName == match.opponents.guestClub){
            clubStats[i].totalNumberOfGoals += match.goals[1]
            clubStats[i].points += calculatePoints(match.goals[1], match.goals[0])
        }
    }

    return clubStats
}

let clubStats: Array<ClubStats> = initializeClubStats(clubs)

for(let i = 0; i < finishedMatches.length; i++){
    clubStats = updateStandings(clubStats, finishedMatches[i])
}

const stats = clubStats.sort(function (a, b) {
    if (a.points == b.points) {
        return (a.totalNumberOfGoals > b.totalNumberOfGoals ? -1 : 1)
    } else {
        return (a.points > b.points ? -1 : 1)
    }
});

export default {stats}