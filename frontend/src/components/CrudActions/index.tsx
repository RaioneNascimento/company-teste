import { Icon } from "@iconify/react";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import React from "react";

interface CrudActionsProps {
  actions: string[];
  handleEdit: () => void;
  handleDelete: () => void;
}

export const CrudActions: React.FC<CrudActionsProps> = ({ actions, handleEdit, handleDelete }) => {
  return (
    <TableCell sx={{ padding: "4px" }}>
      {actions && actions.includes("edit") && (
        <Tooltip title="Editar">
          <IconButton sx={{ padding: "10px" }} onClick={handleEdit}>
            <Icon icon="carbon:edit" width={18} height={18} />
          </IconButton>
        </Tooltip>
      )}

      {actions && actions.includes("delete") && (
        <Tooltip title="Deletar">
          <IconButton sx={{ padding: "10px" }} onClick={handleDelete}>
            <Icon icon="carbon:trash-can" width={18} height={18} />
          </IconButton>
        </Tooltip>
      )}
    </TableCell>
  );
};
