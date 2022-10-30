import * as React from 'react';
import Opponents from "./Opponents";
import Match from "./Match";
import Rounds from "./Rounds";
import {v4 as uuidv4} from 'uuid';
import Comment from "./Comment";

const clubs: Array<string> = ['Tim-1', 'Tim-2', 'Tim-3', 'Tim-4', 'Tim-5']

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

function createMatch(
    id: string,
    opponents: Opponents,
    finished: boolean,
    goals: Array<number>,
) {
    return {id, opponents, finished, goals} as Match
}

let matches: Array<Match> = []
clubPairs.forEach((value, index) => matches.push(createMatch(uuidv4(), value, false, [0, 0])))

function updateMatchResult(matches: Array<Match>, matchId: number, finished: boolean, goals: Array<number>) {
    matches[matchId].finished = finished
    matches[matchId].goals = goals
    return matches
}

matches = updateMatchResult(matches, 0, true, [0, 1])
matches = updateMatchResult(matches, 1, true, [2, 1])
matches = updateMatchResult(matches, 2, true, [3, 2])
matches = updateMatchResult(matches, 3, true, [0, 0])
matches = updateMatchResult(matches, 4, true, [2, 1])
matches = updateMatchResult(matches, 5, true, [2, 2])
matches = updateMatchResult(matches, 6, true, [4, 1])
matches = updateMatchResult(matches, 7, true, [1, 1])

matches.sort(function (a, b) {
    if (a.finished && !b.finished) {
        return -1
    } else if (!a.finished && b.finished) {
        return 1
    } else {
        return 0
    }
})

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

function calculatePoints(firstClubGoals: number, secondClubGoals: number) {
    if (firstClubGoals > secondClubGoals) {
        return 3
    } else if (firstClubGoals < secondClubGoals) {
        return 0
    } else {
        return 1
    }
}

function updateStandings(clubStats: Array<ClubStats>, match: Match) {
    for (let i = 0; i < clubStats.length; i++) {
        if (clubStats[i].clubName == match.opponents.hostClub) {
            clubStats[i].totalNumberOfGoals += match.goals[0]
            clubStats[i].points += calculatePoints(match.goals[0], match.goals[1])
        }
        if (clubStats[i].clubName == match.opponents.guestClub) {
            clubStats[i].totalNumberOfGoals += match.goals[1]
            clubStats[i].points += calculatePoints(match.goals[1], match.goals[0])
        }
    }

    return clubStats
}

let clubStats: Array<ClubStats> = initializeClubStats(clubs)

const matchesByRounds: Array<Rounds> = []

for (let i = 0; i < matches.length; i += 5) {
    matchesByRounds.push({id: uuidv4(), matches: matches.slice(i, i + 5)})
}

const comments: Array<Comment> = []

comments.push({
        roundId: matchesByRounds[0].id,
        id: uuidv4(),
        text: "Ajmoo!!",
        author: "pero.petric@gmail.com",
        createdAt: new Date('May 03, 2021 05:24:07').toLocaleDateString(),
    },
    {
        roundId: matchesByRounds[0].id,
        id: uuidv4(),
        text: "Ajmoo nasi!!",
        author: "pero@gmail.com",
        createdAt: new Date('May 04, 2021 05:25:07').toLocaleDateString(),
    },
    {
        roundId: matchesByRounds[0].id,
        id: uuidv4(),
        text: "idee!!",
        author: "petric@gmail.com",
        createdAt: new Date('May 11, 2021 05:24:07').toLocaleDateString(),
    }
)

let finishedMatches: Array<Match> = []

for (let i = 0; i < matchesByRounds.length; i++) {
    finishedMatches.push(...matchesByRounds[i].matches.filter(value => value.finished))
}

for (let i = 0; i < finishedMatches.length; i++) {
    clubStats = updateStandings(clubStats, finishedMatches[i])
}

const stats = clubStats.sort(function (a, b) {
    if (a.points == b.points) {
        return (a.totalNumberOfGoals > b.totalNumberOfGoals ? -1 : 1)
    } else {
        return (a.points > b.points ? -1 : 1)
    }
});

export const ClubStats = stats

export const MatchesByRounds = matchesByRounds

export const Comments = comments
