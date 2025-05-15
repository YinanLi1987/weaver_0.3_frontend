import React, { useState, Dispatch, SetStateAction } from "react";
import { uploadCSV } from "../api/upload";
import { primaryButton, toggleButton } from "../utils/buttonStyles";
import SectionTooltip from "./SectionTooltip";
interface Props {
  csvFileName: string | null;
  setCsvFileName: (name: string) => void;
  selectedColumns: string[];
  setSelectedColumns: Dispatch<SetStateAction<string[]>>;
}

const FileUploadSection: React.FC<Props> = ({
  csvFileName,
  setCsvFileName,
  selectedColumns,
  setSelectedColumns,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const { filename, columns } = await uploadCSV(file);
      setCsvFileName(filename);
      setColumns(columns);
      setSelectedColumns(columns.slice(0, 2)); // default: first 2
      setUploadSuccess(true);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const toggleColumn = (col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <section className="bg-white p-6 rounded-md shadow-md space-y-4">
      <h2 className="text-xl font-semibold">
        1. Upload CSV File
        <SectionTooltip description="Upload your CSV file with the text to analyze. You will later select columns for model input." />
      </h2>

      <div className="flex items-center space-x-4">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        {!uploadSuccess && (
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={primaryButton}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        )}

        {uploadSuccess && (
          <span className="text-green-600 text-lg font-bold">✓</span>
        )}
      </div>

      {csvFileName && (
        <p className="text-sm text-gray-600">
          Uploaded file: <strong>{csvFileName}</strong>
        </p>
      )}

      {columns.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">
            Select columns to analyze:
          </h3>
          <div className="flex flex-wrap gap-2">
            {columns.map((col) => (
              <button
                key={col}
                onClick={() => toggleColumn(col)}
                className={toggleButton(selectedColumns.includes(col))}
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FileUploadSection;
