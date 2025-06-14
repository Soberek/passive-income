import { Table, TableBody, TableHead, TableRow, TableCell, Button } from "@mui/material";

import { ProgramCoordinatorData } from "./ProgramCoordinator";

export const ProgramCoordinatorTable: React.FC<{ data: ProgramCoordinatorData[] }> = ({ data }) => {
  function handleEdit(coordinatorId: number): void {
    console.log("Edit coordinator with ID:", coordinatorId);
    throw new Error("Function not implemented.");
  }

  function handleDelete(coordinatorId: number): void {
    console.log("Delete coordinator with ID:", coordinatorId);
    throw new Error("Function not implemented.");
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Imię i Nazwisko</TableCell>
          <TableCell>Instytucja</TableCell>
          <TableCell>Program</TableCell>
          <TableCell>Rok Szkolny</TableCell>
          <TableCell>Akcje</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.coordinatorId}>
            <TableCell>{row.coordinatorId}</TableCell>
            <TableCell>{row.contactName}</TableCell>
            <TableCell>{row.institutionName}</TableCell>
            <TableCell>{row.programName}</TableCell>
            <TableCell>{row.year}</TableCell>
            <TableCell style={{ display: "flex", gap: "8px" }}>
              <Button variant="outlined" color="primary" onClick={() => handleEdit(row.coordinatorId)}>
                Edytuj
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.coordinatorId)}>
                Usuń
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
//       <Controller
