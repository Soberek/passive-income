import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import useFileReader, { ExcelRow } from "./useExcelFileReader";
import useFileSaver from "./useExcelFileSaver";

import { Month } from "./ExcelRaportMonthsButtons";

export interface ProgramsData {
  [key: string]: {
    [key: string]: {
      [key: string]: { people: number; action_number: number };
    };
  };
}

export const useExcelUploader = () => {
  const [aggregated_data, setAggregatedData] = useState<ProgramsData>({});
  const [miernik_summary, setMiernikSummary] = useState({
    actions: 0,
    people: 0,
  });

  const [error, setError] = useState("");

  const [months, setMonths] = useState<Month[]>(() =>
    new Array(12).fill(0).map((_, index) => ({
      month_num: index + 1,
      selected: false,
    }))
  );

  const { raw_data, file_name, handleFileUpload } = useFileReader();
  const { saveToExcelFile } = useFileSaver(aggregated_data);

  const handleMonthSelect = useCallback((selected_month: number) => {
    if (error.length > 0) {
      console.warn("Error exists, cannot change month selection.");
      return;
    }
    setMonths((prev_months) =>
      prev_months.map((month) => (month.month_num === selected_month ? { ...month, selected: !month.selected } : month))
    );
    setError("");
  }, []);

  const selectedMonths = months.filter((month) => month.selected).map((month) => month.month_num);

  useEffect(() => {
    if (raw_data && raw_data.length > 0) {
      aggregateData(raw_data, months);
    }
  }, [raw_data, selectedMonths, file_name]);

  const aggregateData = (data: ExcelRow[], months: Month[]) => {
    let all_people = 0;
    let all_actions = 0;

    // Move selectedMonths calculation outside reduce
    const selectedMonths = months.filter((month) => month.selected === true).map((month) => month.month_num);

    try {
      const aggregated = data.reduce((acc, item) => {
        const program_type = item["Typ programu"];
        const program_name = item["Nazwa programu"];
        const program_action = item["Działanie"];
        const people_count = Number(item["Liczba ludzi"]);
        const action_count = Number(item["Liczba działań"]);
        const date = moment(item["Data"], "YYYY-MM-DD");
        const month = date.month() + 1; // moment months are 0-indexed
        if (!program_type) {
          console.debug("Invalid row: missing program_type", { rowIndex: data.indexOf(item), keys: Object.keys(item) });
          throw new Error("Brak wartości w kolumnie 'Typ programu'. Sprawdź swój plik excel.");
        }
        if (!program_name) {
          console.debug("Invalid row: missing program_name", { rowIndex: data.indexOf(item), keys: Object.keys(item) });
          throw new Error("Brak wartości w kolumnie 'Nazwa programu'. Sprawdź swój plik excel.");
        }
        if (!program_action) {
          console.debug("Invalid row: missing program_action", {
            rowIndex: data.indexOf(item),
            keys: Object.keys(item),
          });
          throw new Error("Brak wartości w kolumnie 'Działanie'. Sprawdź swój plik excel.");
        }
        if (isNaN(people_count)) {
          console.debug("Invalid row: people_count is NaN", { rowIndex: data.indexOf(item), keys: Object.keys(item) });
          throw new Error(
            `Napotkano na nieprawidłową liczbę w kolumnie 'Liczba ludzi': ${item["Liczba ludzi"]}. Sprawdź swój plik excel.`
          );
        }
        if (isNaN(action_count)) {
          console.debug("Invalid row: action_count is NaN", { rowIndex: data.indexOf(item), keys: Object.keys(item) });
          throw new Error(
            `Napotkano na nieprawidłową liczbę w kolumnie 'Liczba działań': ${item["Liczba działań"]}. Sprawdź swój plik excel.`
          );
        }

        // Check for selected months
        if (selectedMonths.length > 0 && !selectedMonths.includes(month)) {
          return acc;
        }

        // Initialize nested objects if they don't exist
        if (!acc[program_type]) {
          acc[program_type] = {};
        }

        if (!acc[program_type][program_name]) {
          acc[program_type][program_name] = {};
        }

        if (!acc[program_type][program_name][program_action]) {
          acc[program_type][program_name][program_action] = { people: 0, action_number: 0 };
        }

        // Accumulate values
        acc[program_type][program_name][program_action].action_number += action_count;
        acc[program_type][program_name][program_action].people += people_count;

        all_people += people_count;
        all_actions += action_count;

        return acc;
      }, {} as ProgramsData);

      // If no errors, update state
      setMiernikSummary({
        people: all_people,
        actions: all_actions,
      });
      setAggregatedData(aggregated);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
    }
  };

  return {
    months,
    miernik_summary,
    handleMonthSelect,
    file_name,
    aggregated_data,
    error,
    saveToExcelFile,
    handleFileUpload,
  };
};
