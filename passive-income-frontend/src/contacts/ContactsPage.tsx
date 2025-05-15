import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";

import { Box, Typography, Paper, Container, Button, CircularProgress, Alert } from "@mui/material";

// Import your interfaces

// Define an interface for combined School and Institution data

interface SchoolsDataGridProps {
  // Data props
  rows: [];
  loading: boolean;
  error: string | null;

  // Event handlers
  onView: (id: number | bigint) => void;
  onEdit: (id: number | bigint) => void;
  onDelete: (id: number | bigint) => void;
  onAdd: () => void;
}

const SchoolsDataGrid: React.FC<SchoolsDataGridProps> = ({ rows, loading, error, onView, onEdit, onDelete, onAdd }) => {
  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "schoolId",
      headerName: "ID",
      width: 90,
      type: "number",
    },
    {
      field: "institutionId",
      headerName: "Institution ID",
      width: 130,
      type: "number",
    },
    {
      field: "institutionName",
      headerName: "Institution Name",
      width: 220,
      valueGetter: (params: GridValueGetterParams) => params.row.institution?.name || "Unknown",
    },
    {
      field: "director",
      headerName: "Director",
      width: 180,
      valueGetter: (params: GridValueGetterParams) => params.row.director || "",
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      valueGetter: (params: GridValueGetterParams) => params.row.institution?.city || "",
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.institution?.address || "",
    },
    {
      field: "postalCode",
      headerName: "Postal Code",
      width: 120,
      valueGetter: (params: GridValueGetterParams) => params.row.institution?.postalCode || "",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.institution?.email || "",
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 120,
      getActions: (params) => [],
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%", mb: 4 }}>
        <Paper sx={{ p: 3, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" component="h2">
              Schools Management
            </Typography>
            <Button variant="contained" color="primary" onClick={onAdd}>
              Add New School
            </Button>
          </Box>

          <Box sx={{ height: 500, width: "100%" }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.schoolId}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                  sorting: {
                    sortModel: [{ field: "schoolId", sort: "asc" }],
                  },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                checkboxSelection
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SchoolsDataGrid;
