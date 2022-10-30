import React from "react";
import Match from "./Match";
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import Spacer from "./Spacer";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const WonStyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        color: "rgba(6,173,73,0.99)",
        fontSize: 14,
    },
}));

const LostStyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        color:"rgb(253,0,9)",
        fontSize: 14,
    },
}));

const TieStyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        color: "rgba(28,27,27,0.62)",
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const FinishedStyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "rgba(70,56,58,0.32)",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function MatchItem({match, matchId}: { match: Match, matchId: number }) {
    return (
        <>
            <Spacer y={4}/>
            <div className="center">
                <TableContainer component={Card} sx={{maxWidth: 1000}}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Host Team:</StyledTableCell>
                                <StyledTableCell align="center">Goals</StyledTableCell>
                                <StyledTableCell align="right">Guest Team</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {match.finished && match.goals[0] > match.goals[1] &&
                                    (
                                        <FinishedStyledTableRow key={matchId}>
                                            <WonStyledTableCell align="left">{match.opponents.hostClub}</WonStyledTableCell>
                                            <StyledTableCell align="center">{match.goals[0]} : {match.goals[1]}</StyledTableCell>
                                            <LostStyledTableCell align="right">{match.opponents.guestClub}</LostStyledTableCell>
                                        </FinishedStyledTableRow>
                                    )
                                }
                                {match.finished && match.goals[0] < match.goals[1] &&
                                    (
                                        <FinishedStyledTableRow key={match.id}>
                                            <LostStyledTableCell align="left">{match.opponents.hostClub}</LostStyledTableCell>
                                            <StyledTableCell align="center">{match.goals[0]} : {match.goals[1]}</StyledTableCell>
                                            <WonStyledTableCell align="right">{match.opponents.guestClub}</WonStyledTableCell>
                                        </FinishedStyledTableRow>
                                    )
                                }
                                {match.finished && match.goals[0] == match.goals[1] &&
                                    (
                                        <FinishedStyledTableRow key={match.id}>
                                            <TieStyledTableCell align="left">{match.opponents.hostClub}</TieStyledTableCell>
                                            <TieStyledTableCell align="center">{match.goals[0]} : {match.goals[1]}</TieStyledTableCell>
                                            <TieStyledTableCell align="right">{match.opponents.guestClub}</TieStyledTableCell>
                                        </FinishedStyledTableRow>
                                    )
                                }
                                {!match.finished &&
                                    (
                                        <StyledTableRow>
                                            <StyledTableCell align="left">{match.opponents.hostClub}</StyledTableCell>
                                            <StyledTableCell align="center">--:--</StyledTableCell>
                                            <StyledTableCell align="right">{match.opponents.guestClub}</StyledTableCell>
                                        </StyledTableRow>
                                    )
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}