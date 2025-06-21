import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { SchoolProgramParticipationTableI } from "../types";

interface Props {
  data: SchoolProgramParticipationTableI[];
  // rowsPerPage: number;
  // page: number;
  // totalCount: number;
  // onPageChange: (newPage: number) => void;
  // onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const columns: GridColDef[] = [
  { field: "coordinatorId", headerName: "Id", width: 80, align: "center", headerAlign: "center" },
  { field: "contactName", headerName: "Imię i Nazwisko", width: 300, align: "center", headerAlign: "center" },
  { field: "institutionName", headerName: "Instytucja", width: 500, align: "center", headerAlign: "center" },
  { field: "programName", headerName: "Program", width: 300, align: "center", headerAlign: "center" },
  { field: "schoolYear", headerName: "Rok Szkolny", width: 120, align: "center", headerAlign: "center" },
  {
    field: "actions",
    headerName: "Akcje",
    width: 200,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center", py: 1 }}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            textTransform: "none",
            px: 2,
            boxShadow: 1,
            ":hover": { backgroundColor: "#e3f2fd" },
          }}
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert(`Edit coordinator with ID: ${params.row.coordinatorId}`);
          }}
        >
          Edytuj
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            textTransform: "none",
            px: 2,
            boxShadow: 1,
            ":hover": { backgroundColor: "#ffcdd2" },
          }}
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert(`Delete coordinator with ID: ${params.row.coordinatorId}`);
          }}
        >
          Usuń
        </Button>
      </Box>
    ),
  },
];

export const SchoolProgramParticipationTable: React.FC<Props> = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const totalCount = data.length; // Assuming totalCount is the length of the data array

  const rows = React.useMemo(
    () =>
      data.map((row) => ({
        ...row,
        id: row.coordinatorId,
      })),
    [data]
  );

  const onPageChange = (newPage: number) => {
    // Handle page change logic here
    setPage(newPage);
    // Optionally, you can fetch new data based on the new page
    // fetchData(newPage, rowsPerPage);
  };
  const onRowsPerPageChange = (newRowsPerPage: number) => {
    // Handle rows per page change logic here
    setRowsPerPage(newRowsPerPage);
  };

  return (
    <Box sx={{ width: "100%", my: 3, minHeight: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ page, pageSize: rowsPerPage }}
        rowCount={totalCount}
        paginationMode="server"
        filterModel={{
          items: [
            {
              field: "coordinatorId",
              operator: "contains",
              value: "",
            },
          ],
        }}
        onPaginationModelChange={({ page, pageSize }) => {
          onPageChange(page);
          onRowsPerPageChange(pageSize);
        }}
        pageSizeOptions={[5, 10, 25]}
        getRowHeight={() => "auto"}
        disableRowSelectionOnClick
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#f5f7fa",
            borderTop: "1px solid #e0e0e0",
          },
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: 700,
            fontSize: "1rem",
          },

          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "0.98rem",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)", // Subtle hover effect
            },
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.5)", // Focus outline
            },
          },
        }}
        localeText={{
          noRowsLabel: "Brak danych do wyświetlenia.",
        }}
      />
    </Box>
  );
};
