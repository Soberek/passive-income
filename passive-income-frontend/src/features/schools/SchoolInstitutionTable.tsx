import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

// Type definition
type SchoolInstitution = {
  institutionId: number;
  name: string;
  address?: string;
  postalCode?: string;
  municipality?: string;
  city?: string;
  createdAt?: Date | string;
  email?: string;
  phone?: string;
};

interface SchoolInstitutionDataGridProps {
  data: SchoolInstitution[];
  rowsPerPage: number;
  page: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const formatDate = (date?: Date | string) => {
  if (!date) return "N/A";
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return "N/A";
  }
};

const columns: GridColDef<SchoolInstitution>[] = [
  { field: "institutionId", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Nazwa",
    width: 700,
    renderCell: (params) => <strong>{params.value}</strong>,
  },
  {
    field: "address",
    headerName: "Adres",
    width: 200,
    valueGetter: (_, row) => {
      return row.address ? row.address : "N/A";
    },
  },
  {
    field: "postalCode",
    headerName: "Kod pocztowy",
    width: 120,
    valueGetter: (_, row) => row.postalCode || "N/A",
  },
  {
    field: "municipality",
    headerName: "Gmina",
    width: 140,
    valueGetter: (_, row) => row.municipality || "N/A",
  },
  {
    field: "city",
    headerName: "Miasto",
    width: 140,
    valueGetter: (_, row) => row.city || "N/A",
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
    valueGetter: (_, row) => row.email || "N/A",
  },
  {
    field: "phone",
    headerName: "Telefon",
    width: 140,
    valueGetter: (_, row) => row.phone || "N/A",
  },
  {
    field: "createdAt",
    headerName: "Data utworzenia",
    width: 140,
    valueGetter: (_, row) => formatDate(row.createdAt),
  },
];

export default function SchoolInstitutionDataGrid({
  data,
  rowsPerPage,
  page,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}: SchoolInstitutionDataGridProps) {
  // DataGrid expects row id as 'id'
  const rows = React.useMemo(
    () =>
      data.map((row) => ({
        ...row,
        id: row.institutionId,
      })),
    [data]
  );

  return (
    <Box sx={{ width: "100%", minHeight: 400, m: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        paginationMode="server"
        rowCount={totalCount}
        paginationModel={{ page, pageSize: rowsPerPage }}
        onPaginationModelChange={({ page, pageSize }) => {
          onPageChange(page);
          onRowsPerPageChange(pageSize);
        }}
        getRowHeight={() => "auto"}
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          background: "linear-gradient(120deg,#f5f7fa 0%,#c3cfe2 100%)",
          "& .MuiDataGrid-columnHeaders": {
            background: "linear-gradient(90deg,#e3f2fd 0%,#f5f7fa 100%)",
            fontWeight: 700,
            fontSize: "1rem",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "0.98rem",
          },
        }}
        localeText={{
          noRowsLabel: "Brak danych do wyświetlenia.",
          // You can translate more DataGrid texts if needed
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
