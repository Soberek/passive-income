import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

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

interface SchoolInstitutionTableProps {
  data: SchoolInstitution[]; // Array of school/institution data
  rowsPerPage: number; // Number of rows per page
  page: number; // Current page number
  totalCount: number; // Total number of rows
  onPageChange: (newPage: number) => void; // Callback when page changes
  onRowsPerPageChange: (newRowsPerPage: number) => void; // Callback when rows per page changes
}

const SchoolInstitutionTable: React.FC<SchoolInstitutionTableProps> = ({
  data,
  rowsPerPage,
  page,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Postal Code</TableCell>
            <TableCell>Municipality</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {data.map((institution) => (
            <TableRow key={institution.institutionId.toString()}>
              <TableCell>{institution.institutionId}</TableCell>
              <TableCell>{institution.name}</TableCell>
              <TableCell>{institution.address || "N/A"}</TableCell>
              <TableCell>{institution.postalCode || "N/A"}</TableCell>
              <TableCell>{institution.municipality || "N/A"}</TableCell>
              <TableCell>{institution.city || "N/A"}</TableCell>
              <TableCell>{institution.email || "N/A"}</TableCell>
              <TableCell>{institution.phone || "N/A"}</TableCell>
              <TableCell>{institution.createdAt ? institution.createdAt.toLocaleDateString() : "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Table Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default SchoolInstitutionTable;
