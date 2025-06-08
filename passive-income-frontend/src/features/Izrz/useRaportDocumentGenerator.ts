import React, { useMemo, useState } from "react";
import { useInstitutions } from "../../hooks/useInstitutions";
import { useFetch } from "../../hooks/useFetch";
import { Program } from "../../../../shared/types";
interface FormData {
  templateFile: File | null;
  caseNumber: string;
  reportNumber: string;
  programName: string;
  taskType: string;
  address: string;
  dateInput: string;
  viewerCount: number;
  viewerCountDescription: string;
  taskDescription: string;
  additionalInfo: string;
}
export const useRaportDocumentGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    templateFile: null,
    caseNumber: "",
    reportNumber: "",
    programName: "",
    taskType: "",
    address: "",
    dateInput: "",
    viewerCount: 0,
    viewerCountDescription: "",
    taskDescription: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const { institutions, loading: institutionsLoading } = useInstitutions();

  const {
    data: programs,
    loading: programsLoading,
    error: programsError,
  } = useFetch<Program[]>("http://localhost:3000/api/programs", {});

  const institutionList = useMemo(() => {
    return institutions.map((institution) => {
      return `${institution.name}, ${institution.address}, ${institution.postalCode} ${institution.city}`;
    });
  }, [institutions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      templateFile: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    const formDataToSend = new FormData(e.currentTarget);

    if (formData.templateFile) {
      formDataToSend.set("templateFile", formData.templateFile);
    }

    try {
      const response = await fetch("http://localhost:3000/api/offline_izrz", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to generate document");
      }

      const fileBlob = await response.blob();

      let filename = "report.docx";
      const disposition = response.headers.get("Content-Disposition");
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1];
      }

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(fileBlob);
      downloadLink.download = filename;
      downloadLink.click();

      setSubmitMessage({
        type: "success",
        text: "Raport został wygenerowany! Pobieranie rozpoczęte.",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Błąd podczas generowania raportu. Spróbuj ponownie.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    submitMessage,
    institutionList,
    institutionsLoading,
    handleChange,
    handleFileChange,
    handleSubmit,
    programs,
    programsLoading,
    programsError,
  };
};
