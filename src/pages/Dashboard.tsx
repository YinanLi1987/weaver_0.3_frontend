import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import Spinner from "../components/Spinner";
import { formatCurrencyAuto } from "../utils/formatCurrency";
import FileUploadSection from "../components/FileUploadSection";
import PromptDefinitionSection from "../components/PromptDefinitionSection";
import LLMSelectionSection from "../components/LLMSelectionSection";
import AnalyzeButton from "../components/AnalyzeButton";
import AnalysisTable from "../components/AnalysisTable";
import ModelProgressPanel from "../components/ModelProgressPanel";
import { useProgressTracker } from "../hooks/useProgressTracker";
import { fetchResults } from "../api/analyze";
import EvaluationSection from "../components/EvaluationSection";
import { exportFinalEntitiesToCSV } from "../utils/exportFinalEntities";
import SectionTooltip from "../components/SectionTooltip";
import { API_BASE_URL } from "../api/config";
export default function Dashboard() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState("");
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<PromptDefinition[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [results, setResults] = useState<ArticleResult[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [taskId, setTaskId] = useState<string | null>(null);
  const { progress, done } = useProgressTracker(taskId);
  // Log the current taskId for debugging
  //console.log("taskId in Dashboard:", taskId);
  //console.log("Progress state:", progress);
  //console.log("Done?", done);
  useEffect(() => {
    console.log("🌐 API_BASE_URL =", API_BASE_URL);
  }, []);
  useEffect(() => {
    if (done && taskId) {
      fetchResults(taskId)
        .then((data) => {
          if (!data || !Array.isArray(data.results)) {
            throw new Error("Invalid results format");
          }
          setResults(data.results); // ✅ 保持一致
        })
        .catch((err) => {
          console.error("Error fetching final results:", err);
          setAlert("❌ Failed to load analysis results.");
        });
    }
    console.log("📦 Effect triggered:", { done, taskId });
  }, [done, taskId]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const res = await fetch("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBalance(data.balance);
      setLoading(false);
    };

    fetchBalance();
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Please sign in to access the dashboard.
      </div>
    );
  }

  if (loading) {
    return <Spinner />;
  }
  const handleFullAnalysis = async () => {
    if (
      !csvFileName ||
      prompts.length === 0 ||
      selectedColumns.length === 0 ||
      selectedModels.length === 0
    ) {
      alert("Please complete all sections before running analysis.");
      return;
    }

    try {
      const response = await analyzeFull({
        prompts,
        models: selectedModels,
        csvFileName,
        selectedColumns,
      });

      if (!response || !response.taskId) {
        alert("Invalid response from server.");
        return;
      }
      setTaskId(response.taskId);
    } catch (err) {
      alert("Analysis failed.");
      console.error(err);
    }
  };
  return (
    <div className="p-6 space-y-4">
      <p>
        <strong>Balance:</strong>{" "}
        {balance !== null ? formatCurrencyAuto(balance) : "N/A"}
      </p>

      {alert && (
        <div className="p-3 bg-yellow-100 text-yellow-800 rounded">{alert}</div>
      )}

      {/* CSV Upload Section */}
      <FileUploadSection
        csvFileName={csvFileName}
        setCsvFileName={setCsvFileName}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
      {/* Prompt Definition Section */}
      <PromptDefinitionSection prompts={prompts} setPrompts={setPrompts} />

      {/* LLM Selection Section */}
      <LLMSelectionSection
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
      />
      <AnalyzeButton
        prompts={prompts}
        models={selectedModels}
        csvFileName={csvFileName}
        selectedColumns={selectedColumns}
        onResults={setResults}
        onTaskId={setTaskId}
      />
      {/* Show model progress */}
      {taskId && <ModelProgressPanel progress={progress} done={done} />}
      {Array.isArray(results) && results.length > 0 && (
        <>
          <AnalysisTable
            results={results}
            onUpdate={setResults}
            promptNames={prompts.map((p) => p.name)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            onClick={() =>
              exportFinalEntitiesToCSV(
                results,
                prompts.map((p) => p.name)
              )
            }
          >
            Export Final Entities
          </button>
          <EvaluationSection
            results={results}
            promptNames={prompts.map((p) => p.name)}
          />
        </>
      )}
    </div>
  );
}
