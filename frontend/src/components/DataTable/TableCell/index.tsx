import React from 'react';
import TableCell from '@mui/material/TableCell';

interface TableCellProps {
  content: unknown;
}

export const CustomTableCell: React.FC<TableCellProps> = ({ content }) => {
  return <TableCell sx={{ padding: 0 }}>
    {content?.toString()}
  </TableCell>;
};
