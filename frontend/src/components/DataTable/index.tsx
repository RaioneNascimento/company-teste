import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import React from 'react';

interface EnhancedTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headCells: any[],
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { headCells } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
          >
            <TableSortLabel
              hideSortIcon
            >
              <h1 className='font-semibold'>{headCell}</h1>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface DataTableProps {
  headCells: unknown[];
  children: React.ReactNode;
}

export default function DataTable(props: DataTableProps) {
  const { headCells, children, } = props

  return (
    <Box sx={{ width: '100%', boxShadow: 3 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              headCells={headCells}
            />
            <TableBody>
              {children}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
