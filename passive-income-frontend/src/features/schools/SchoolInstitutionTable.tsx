import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// Example data type
type SchoolInstitution = {
  institutionId: number | bigint;
  name: string;
  address?: string;
  postalCode?: string;
  municipality?: string;
  city?: string;
  createdAt?: Date;
  email?: string;
  phone?: string;
};

// Example data (replace with your real data)
// const institutions: SchoolInstitution[] = [
//   {
//     institutionId: 1,
//     name: "Example School",
//     address: "123 Main St",
//     postalCode: "12345",
//     municipality: "Central",
//     city: "Metropolis",
//     createdAt: new Date(),
//     email: "info@example.com",
//     phone: "123-456-7890",
//   },
// ];

export const SchoolInstitutionTable = (institutions: SchoolInstitution[]) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Postal Code</TableCell>
          <TableCell>Municipality</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {institutions.map((inst) => (
          <TableRow key={inst.institutionId.toString()}>
            <TableCell>{inst.institutionId.toString()}</TableCell>
            <TableCell>{inst.name}</TableCell>
            <TableCell>{inst.address || "-"}</TableCell>
            <TableCell>{inst.postalCode || "-"}</TableCell>
            <TableCell>{inst.municipality || "-"}</TableCell>
            <TableCell>{inst.city || "-"}</TableCell>
            <TableCell>{inst.createdAt ? inst.createdAt.toLocaleString() : "-"}</TableCell>
            <TableCell>{inst.email || "-"}</TableCell>
            <TableCell>{inst.phone || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
