import * as React from 'react';


function createData(
    clubName: string,
    points: number,
    totalNumberOfGoals: number,
) {
    return {clubName, points, totalNumberOfGoals};
}

const standings = [
    createData('Dinamo Zagreb', 10, 38),
    createData('Hajduk Split', 10, 26),
    createData('Osijek', 27, 26),
    createData('Varaždin', 22, 13),
    createData('Slaven Belupo', 23, 12),
].sort(function (a, b){
    if(a.points == b.points){
        return (a.totalNumberOfGoals > b.totalNumberOfGoals ? -1 : 1)
    }else{
        return (a.points > b.points ? -1 : 1)
    }
});

export default {standings}