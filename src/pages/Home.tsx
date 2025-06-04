// src/pages/Home.tsx
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      <main className="p-8 max-w-8xl mx-auto space-y-12">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">
            Welcome to Weaver
          </h1>
          <p className="text-gray-600 text-lg">
            Weaver for Know – extract, connect, and explore knowledge.
          </p>
          <p className="text-lg">
            Easily compare how different Large Language Models (LLMs) perform on
            structured entity extraction tasks — while also boosting
            researchers’ efficiency with powerful LLM-assisted extraction
            workflows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            1️⃣ Upload Your CSV File
          </h2>
          <p>
            Upload a CSV file containing text records. After uploading, you'll
            be able to select which columns are used for entity extraction.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            ✅ Entity Definition Examples: Good vs. Poor
          </h2>
          <p className="mb-6 text-gray-700">
            Clear and consistent entity definitions improve LLM extraction
            quality. Here’s a comparison between a well-defined entity type and
            a poorly defined one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded shadow p-4 bg-green-50 min-w-0 break-words">
              {/* ✅ GOOD EXAMPLE */}

              <h3 className="text-lg font-semibold text-green-700 mb-2">
                ✅ Good Example
              </h3>
              <div className="overflow-x-auto bg-white rounded">
                <table className="w-full table-auto border text-sm bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-left font-medium">
                        Name
                      </th>
                      <th className="border px-4 py-2 text-left font-medium">
                        Description
                      </th>
                      <th className="border px-4 py-2 text-left font-medium">
                        Examples
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="align-top">
                      <td className="border px-4 py-2 font-medium">
                        Population
                      </td>
                      <td className="border px-4 py-2">
                        Refers to soil taxa only, including microorganisms,
                        invertebrates, and vertebrates living in the soil.
                        Excludes all plants.
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Use standard terms (e.g., Bacteria, Fungi)</li>
                          <li>
                            <strong>Other</strong> for unlisted soil organisms
                          </li>
                          <li>
                            <strong>Information_not_present</strong> if not
                            mentioned
                          </li>
                          <li>
                            <strong>Wrong_P</strong> for non-soil taxa (e.g.,
                            crops)
                          </li>
                        </ul>
                      </td>
                      <td className="border px-4 py-2  font-medium">
                        Microorganisms, Virus, Bacteria, Fungi, Archaea,
                        Microfauna, Mesofauna, Macrofauna, Megafauna,
                        Information_not_present, Other, Wrong_P
                        <br />
                        <span className="text-xs  text-red-600">
                          * Valid standardized outputs, comma-separated
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* ❌ POOR EXAMPLE */}
            <div className="border rounded shadow p-4 bg-red-50">
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                ❌ Poor Example
              </h3>
              <table className="w-full table-auto border text-sm bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left font-medium">
                      Name
                    </th>
                    <th className="border px-4 py-2 text-left font-medium">
                      Description
                    </th>
                    <th className="border px-4 py-2 text-left font-medium">
                      Examples
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="align-top">
                    <td className="border px-4 py-2 font-medium">Population</td>
                    <td className="border px-4 py-2">
                      All things in or near soil maybe. Could include plants,
                      animals, insects...
                      <p className="text-red-600 mt-2">
                        ⚠️ Description is vague and includes unrelated
                        categories.
                      </p>
                    </td>
                    <td className="border px-4 py-2 text-gray-800">
                      worms?? trees and other plants, maybe root systems?,
                      fish?, unknown stuff
                      <br />
                      <span className="text-xs text-red-600">
                        ✘ Non-standard terms, unclear formatting, natural
                        language, invalid entities.
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3️⃣ Select LLMs (up to 3)
          </h2>
          <p>
            Choose up to three LLMs to perform entity and evidence extraction.
            You can compare their performance side-by-side.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4️⃣ Run the Analysis</h2>
          <p>
            Start the extraction process. Each LLM works in parallel to extract
            entities and evidence. Progress is tracked live.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5️⃣ Review the Results</h2>
          <p>
            The result table shows each record's ID, title, and extracted
            entities.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              🔴 <strong>Red dot</strong>: Different outputs across models
              (hover to compare).
            </li>
            <li>
              🟢 <strong>Green text</strong>: Models agreed on the output.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            6️⃣ Inspect and Edit Details
          </h2>
          <p>
            Click on any result row to see detailed model outputs, evidence, and
            the source location. Switch models to compare.
          </p>
          <p className="mt-2">
            Each result has a <strong>Final Entity</strong> field, initialized
            as the deduplicated union of all models' outputs. You can manually
            edit this field to define the gold-standard used for model
            evaluation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            7️⃣ Export Final Results
          </h2>
          <p>
            Export a CSV that includes your selected input columns and confirmed
            final entities.
          </p>
          <p className="mt-2 text-red-700 font-medium">
            ⚠️ Tip: Please export your results once finished. The platform does
            not auto-save processed data.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            📊 Performance Metrics
          </h2>
          <p>
            Each LLM's extraction performance is evaluated using standard
            information retrieval metrics:
            <strong> Precision</strong>, <strong>Recall</strong>, and{" "}
            <strong>F1 Score</strong>. These metrics compare the model's
            extracted entities against the confirmed <em>Final Entity</em> list
            you defined or edited.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <strong>✔️ True Positive (TP):</strong> Correctly extracted
              entities that match the final entity list.
            </p>
            <p>
              <strong>❌ False Positive (FP):</strong> Entities extracted by the
              model but not present in the final list.
            </p>
            <p>
              <strong>⚠️ False Negative (FN):</strong> Entities present in the
              final list but missed by the model.
            </p>
          </div>

          <div className="mt-4 space-y-1 text-sm">
            <p>
              <strong>Precision = TP / (TP + FP)</strong>
            </p>
            <p>
              <strong>Recall = TP / (TP + FN)</strong>
            </p>
            <p>
              <strong>
                F1 Score = 2 * (Precision * Recall) / (Precision + Recall)
              </strong>
            </p>
          </div>

          <p className="mt-4">
            The platform aggregates these scores for each model and each entity
            type across all records. You can find the full breakdown in the “LLM
            Evaluation Summary” section after running an analysis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">🎯 Use Cases</h2>
          <p className="mt-2">
            Perfect for NLP researchers, data scientists, and product teams who
            want to evaluate LLM performance on real-world extraction tasks
            like:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Clinical trial data extraction</li>
            <li>Financial document analysis</li>
            <li>Scientific paper annotation</li>
            <li>Media and article summarization</li>
          </ul>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">💰 Billing & Usage</h2>
          <p className="text-gray-800">
            Our current billing system is straightforward:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>
              <strong>Free LLMs</strong> can be used without any cost.
            </li>
            <li>
              <strong>Paid LLMs</strong> will deduct usage fees from your
              balance. Each unit costs <strong>1.3 credits</strong>, which
              includes:
              <ul className="list-disc list-inside ml-5 mt-1 text-sm text-gray-600">
                <li>1.0 credit to the model provider</li>
                <li>
                  0.3 credit covers server usage, database, online payment fees,
                  and platform maintenance
                </li>
              </ul>
            </li>
          </ul>

          <p className="mt-4">
            You can view your <strong>payment history</strong> and{" "}
            <strong>usage deductions</strong> on your user page. Your balance is
            updated <strong>in real time</strong> after each operation.
          </p>

          <p className="mt-4 text-sm text-gray-600 italic">
            ⚠️ Note: As the platform is still in the testing phase, pricing
            rules may be adjusted based on user feedback.
          </p>

          <p className="mt-4 text-sm text-gray-700">
            If you have any questions regarding billing, feel free to contact us
            at:{" "}
            <a
              href="mailto:liyinan39@gmail.com"
              className="text-blue-600 underline"
            >
              liyinan39@gmail.com
            </a>
          </p>
        </section>

        <section className="bg-gray-50 border p-6 rounded shadow text-sm text-gray-700 space-y-4">
          <p className="font-semibold text-gray-800 mb-2">Developed by:</p>
          <div className="flex flex-col md:flex-row gap-x-12 gap-y-4">
            {/* Li Yinan first */}
            <div className="flex-1">
              <strong>Li Yinan</strong>
              <br />
              Oulu University of Applied Sciences, Finland
              <br />
              Lead Developer – System architecture, design, and implementation
            </div>

            <div className="flex-1">
              <strong>Marie-Liesse Vermeire</strong>
              <br />
              CIRAD - Persyst - UPR Recyclage et Risque
              <br />
              Concept Originator – Testing data, scientific insights and
              iterative feedback
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 text-center text-gray-400 text-sm p-4 border-t">
        © 2025 Weaver. All rights reserved.
      </footer>
    </div>
  );
}
