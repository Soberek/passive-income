import * as XLSX from "xlsx";
import { useCallback } from "react";
import { ProgramsData } from "./useExcelUploader";

const useFileSaver = (data: ProgramsData) => {
  const saveToExcelFile = useCallback(() => {
    if (!Object.keys(data).length) return;
    const flatten_data: [string, string, string | number, string | number][] = [];

    Object.keys(data).forEach((program_type) => {
      flatten_data.push([`${program_type}`, "", "", ""]);

      Object.keys(data[program_type]).forEach((program_name, program_index) => {
        flatten_data.push([`${++program_index}.`, `${program_name}`, "", ""]);
        Object.keys(data[program_type][program_name]).forEach((action_name, action_index) => {
          const poeple = data[program_type][program_name][action_name].people;
          const action_number = data[program_type][program_name][action_name].action_number;

          flatten_data.push([`${program_index}.${++action_index}`, action_name, poeple, action_number]);
        });
      });
    });

    const worksheet = XLSX.utils.aoa_to_sheet(flatten_data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Miernik");

    XLSX.writeFile(workbook, "miernik.xlsx");
  }, [data]);

  return { saveToExcelFile };
};

export default useFileSaver;
