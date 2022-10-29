import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import Dataset from "./Dataset";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
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

export default function StandingsTable() {
    return (
        <TableContainer component={Card} sx={{maxWidth: 700}}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Placing</StyledTableCell>
                        <StyledTableCell align="center">Club</StyledTableCell>
                        <StyledTableCell align="center">Points</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Dataset.standings.map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center">{row.clubName}</StyledTableCell>
                            <StyledTableCell align="center">{row.points}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}