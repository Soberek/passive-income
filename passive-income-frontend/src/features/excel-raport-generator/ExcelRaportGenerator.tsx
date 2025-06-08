import React from "react";
import { Box, Typography } from "@mui/material";
import { ExcelUploaderMonths } from "./ExcelRaportMonthsButtons";
import ExcelUploaderUploadButtons from "./ExcelUploaderUploadButtons";
import { Stat } from "../../components/Stats";

import ExcelTable from "./ExcelTable";
import SiteTitle from "../../components/SiteTitle";
import SiteContainer from "../../components/SiteContainer";
import { useExcelUploader } from "./useExcelUploader";

const MemoizedExcelUploaderMonths = React.memo(ExcelUploaderMonths);
const MemoizedExcelUploaderUploadButtons = React.memo(ExcelUploaderUploadButtons);
const MemoizedExcelUploaderTable = React.memo(ExcelTable);

const ExcelUploader: React.FC = () => {
  const {
    months,
    handleFileUpload,
    handleMonthSelect,
    saveToExcelFile,
    miernik_summary,
    file_name,
    agregated_data,
    error,
  } = useExcelUploader();
  return (
    <SiteContainer>
      <SiteTitle>🧮 Miernik budżetowy</SiteTitle>

      <MemoizedExcelUploaderMonths months={months} handleMonthSelect={handleMonthSelect} />
      <MemoizedExcelUploaderUploadButtons
        file_name={file_name}
        handleFileUpload={handleFileUpload}
        saveToExcelFile={saveToExcelFile}
      />

      <Box display="flex" gap={2} flexWrap="wrap" marginBottom={{ base: 2, md: 0 }} paddingBottom={1}>
        <Stat label="👩‍🏫 Ogólna liczba działań" value={miernik_summary.actions} />
        <Stat label="👨‍👩‍👧‍👦 Ogólna liczba odbiorców" value={miernik_summary.people} />
      </Box>

      {Object.keys(agregated_data).length > 0 && !error ? (
        <MemoizedExcelUploaderTable {...agregated_data} />
      ) : (
        <Typography>{error}</Typography>
      )}
    </SiteContainer>
  );
};

export default ExcelUploader;
