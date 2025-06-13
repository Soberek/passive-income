import { Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import { SchoolProgramParticipationTableI } from "./SchoolProgramParticipation";

interface SchoolProgramParticipationTableProps {
  data: SchoolProgramParticipationTableI[];
  loading: boolean;
}

const LoadingRow = () => (
  <TableRow>
    <TableCell colSpan={2}>Loading...</TableCell>
  </TableRow>
);

export const SchoolProgramParticipationTable = ({ data, loading }: SchoolProgramParticipationTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Rok</TableCell>
          <TableCell>Nazwa szkoły/instytucji</TableCell>
          <TableCell>Nazwa programu</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading && <LoadingRow />}

        {!loading &&
          data &&
          data.length > 0 &&
          data.map((participation) => (
            <TableRow key={participation.participationId}>
              <TableCell>{String(participation.participationId)}</TableCell>
              <TableCell>{String(participation.year)}</TableCell>
              <TableCell>{String(participation.institutionName)}</TableCell>
              <TableCell>{String(participation.name)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
