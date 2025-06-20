import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

export interface ExcelRow {
  [key: string]: string | number;
}

const useFileReader = () => {
  const [file_name, setFileName] = useState("");
  const [raw_data, setRawData] = useState<ExcelRow[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No file selected.");
      return;
    }

    const blob_xlsx_file = e.target.files?.[0];

    const isXlsx = blob_xlsx_file?.name.endsWith(".xlsx");
    const isXls = blob_xlsx_file?.name.endsWith(".xls");

    if (!isXls && !isXlsx) return;

    const file_name = e.target.files?.[0].name;

    if (typeof file_name === "string") {
      setFileName(file_name);
    }

    if (!blob_xlsx_file) return;

    const reader = new FileReader();

    reader.onloadstart = () => {
      console.log("Loading file start....");
    };

    reader.onloadend = () => {
      console.log("Loading file end...");
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.onload = (evt: ProgressEvent<FileReader>) => {
      const array_buffer = evt.target?.result;

      if (!array_buffer) {
        console.error("Failed to load the file. The file data is missing.");
        return;
      }

      try {
        const wb = XLSX.read(array_buffer, { type: "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { raw: false }) as ExcelRow[];

        setRawData(data);
      } catch (error) {
        console.error("Error reading XLSX file:", error);
      }
    };

    reader.readAsArrayBuffer(blob_xlsx_file);
  };

  return { raw_data, file_name, handleFileUpload };
};

export default useFileReader;
