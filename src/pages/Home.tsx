// src/pages/Home.tsx
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="bg-white text-gray-800 flex min-h-screen">
      {/* Sidebar */}
      <nav className="hidden md:block w-48 sticky top-0 h-screen p-6 bg-gray-50 border-r text-sm text-gray-800 space-y-4">
        <h2 className="text-lg font-bold mb-4">Home Navigation </h2>
        <ul className="space-y-2">
          <li>
            <a href="#welcome" className="hover:text-blue-600">
              Welcome
            </a>
          </li>
          <li>
            <a href="#how-to-use" className="hover:text-blue-600">
              How to Use
            </a>
          </li>
          <li>
            <a href="#usecases" className="hover:text-blue-600">
              Use Cases
            </a>
          </li>
          <li>
            <a href="#billing" className="hover:text-blue-600">
              Billing
            </a>
          </li>

          <li>
            <a href="#team" className="hover:text-blue-600">
              Team
            </a>
          </li>
        </ul>
      </nav>
      <main className="p-8 max-w-8xl mx-auto space-y-12">
        <section id="welcome" className="space-y-4">
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
        <section id="how-to-use">
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">
              Upload Your CSV File
            </h2>
            <p>
              Upload a CSV file containing text records. After uploading, you'll
              be able to select which columns are used for entity extraction.
            </p>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              Entity Definition Examples: Good vs. Poor
            </h2>
            <p className="mb-6 text-gray-700">
              Clear and consistent entity definitions improve LLM extraction
              quality. Here’s a comparison between a well-defined entity type
              and a poorly defined one.
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
                      <td className="border px-4 py-2 font-medium">
                        Population
                      </td>
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

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">
              Select LLMs (up to 3)
            </h2>
            <p>
              Choose up to three LLMs to perform entity and evidence extraction.
              You can compare their performance side-by-side.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">Run the Analysis</h2>
            <p>
              Start the extraction process. Each LLM works in parallel to
              extract entities and evidence. Progress is tracked live.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">Review the Results</h2>
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

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">
              Inspect and Edit Details
            </h2>
            <p>
              Click on any result row to see detailed model outputs, evidence,
              and the source location. Switch models to compare.
            </p>
            <p className="mt-2">
              Each result has a <strong>Final Entity</strong> field, initialized
              as the deduplicated union of all models' outputs. You can manually
              edit this field to define the gold-standard used for model
              evaluation.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">
              Export Final Results
            </h2>
            <p>
              Export a CSV that includes your selected input columns and
              confirmed final entities.
            </p>
            <p className="mt-2 text-red-700 font-medium">
              ⚠️ Tip: Please export your results once finished. The platform
              does not auto-save processed data.
            </p>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">Performance Metrics</h2>
            <p>
              Each LLM's extraction performance is evaluated using standard
              information retrieval metrics:
              <strong> Precision</strong>, <strong>Recall</strong>, and{" "}
              <strong>F1 Score</strong>. These metrics compare the model's
              extracted entities against the confirmed <em>Final Entity</em>{" "}
              list you defined or edited.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>✔️ True Positive (TP):</strong> Correctly extracted
                entities that match the final entity list.
              </p>
              <p>
                <strong>❌ False Positive (FP):</strong> Entities extracted by
                the model but not present in the final list.
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
              The platform aggregates these scores for each model and each
              entity type across all records. You can find the full breakdown in
              the “LLM Evaluation Summary” section after running an analysis.
            </p>
          </section>
        </section>
        <section id="usecases" className="mt-12">
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
        <section id="billing" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">💰 Billing & Usage</h2>

          <p className="text-gray-800 mb-4">
            Our billing system is designed to be transparent and simple:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Free LLMs</strong> can be used without any cost.
            </li>
            <li>
              <strong>Paid LLMs</strong> will deduct credits from your balance.
              The cost is calculated as{" "}
              <strong>1.3 × the base model price</strong>, where:
              <ul className="list-disc list-inside ml-5 mt-1 text-sm text-gray-600">
                <li>
                  <strong>1.0</strong> goes to the model provider
                </li>
                <li>
                  <strong>0.3</strong> covers server resources, database,
                  payment processing, and platform maintenance
                </li>
              </ul>
            </li>
          </ul>

          <p className="mt-4">
            You can view your <strong>payment history</strong> and{" "}
            <strong>deductions</strong> in the user page. Your{" "}
            <strong>balance updates in real time</strong> after each analysis
            task.
          </p>

          <p className="mt-4 text-sm text-gray-600 italic">
            ⚠️ Note: As the platform is still in testing, pricing rules may
            change based on user feedback.
          </p>

          <p className="mt-2 text-sm text-gray-700">
            For any billing questions, contact:{" "}
            <a
              href="mailto:liyinan39@gmail.com"
              className="text-blue-600 underline"
            >
              liyinan39@gmail.com
            </a>
          </p>

          {/* Model pricing table */}
          <h3 className="text-xl font-semibold mt-12 mb-4">
            🧠 Supported LLMs & Base Prices
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border text-sm bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left font-medium">
                    Model
                  </th>
                  <th className="border px-4 py-2 text-left font-medium">
                    Provider
                  </th>
                  <th className="border px-4 py-2 text-left font-medium">
                    Input / 1k tokens
                  </th>
                  <th className="border px-4 py-2 text-left font-medium">
                    Output / 1k tokens
                  </th>
                  <th className="border px-4 py-2 text-left font-medium">
                    Final Cost (×1.3)
                  </th>
                  <th className="border px-4 py-2 text-left font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">GPT-4.1 Nano</td>
                  <td className="border px-4 py-2">OpenAI</td>
                  <td className="border px-4 py-2">€0.0001</td>
                  <td className="border px-4 py-2">€0.0004</td>
                  <td className="border px-4 py-2">×1.3</td>
                  <td className="border px-4 py-2 text-green-700 font-medium">
                    Paid
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">GPT-4</td>
                  <td className="border px-4 py-2">OpenAI</td>
                  <td className="border px-4 py-2">€0.0300</td>
                  <td className="border px-4 py-2">€0.0600</td>
                  <td className="border px-4 py-2">×1.3</td>
                  <td className="border px-4 py-2 text-green-700 font-medium">
                    Paid
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Claude Sonnet 3.7</td>
                  <td className="border px-4 py-2">Anthropic</td>
                  <td className="border px-4 py-2">€0.0030</td>
                  <td className="border px-4 py-2">€0.0150</td>
                  <td className="border px-4 py-2">×1.3</td>
                  <td className="border px-4 py-2 text-green-700 font-medium">
                    Paid
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Mistral Small</td>
                  <td className="border px-4 py-2">Mistral AI</td>
                  <td className="border px-4 py-2">€0.0000</td>
                  <td className="border px-4 py-2">€0.0000</td>
                  <td className="border px-4 py-2">Free</td>
                  <td className="border px-4 py-2 text-blue-700 font-medium">
                    Free
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Real usage examples */}
          <h3 className="text-xl font-semibold mt-12 mb-4">
            💡 Real Usage Examples
          </h3>
          <p className="text-gray-700 mb-4">
            The following examples show actual usage costs based on a common
            task:
            <strong>
              {" "}
              extracting key entities from the title and abstract of a
              scientific article.
            </strong>
          </p>
          <p className="mt-2 text-sm text-gray-600 italic">
            ⚠️ Token counts are estimates and may not be 100% precise, as not
            all LLM providers expose exact token usage.
          </p>

          <div className="text-sm bg-gray-50 border rounded p-4 space-y-2 text-gray-800">
            <p>
              🧠 <strong>Claude Sonnet 3.7</strong> — 1,316 tokens →{" "}
              <span className="text-blue-700 font-semibold">€0.0076</span>
            </p>
            <p>
              🧠 <strong>GPT-4.1 Nano</strong> — 1,135 tokens →{" "}
              <span className="text-blue-700 font-semibold">€0.00018</span>
            </p>
            <p>
              🧠 <strong>Mistral Small</strong> — 1,258 tokens →{" "}
              <span className="text-green-700 font-semibold">€0.00</span>
            </p>
            <p>
              🧠 <strong>Claude Sonnet 3.7</strong> — 1,484 tokens →{" "}
              <span className="text-blue-700 font-semibold">€0.0096</span>
            </p>
            <p>
              🧠 <strong>GPT-4.1 Nano</strong> — 1,221 tokens →{" "}
              <span className="text-blue-700 font-semibold">€0.00018</span>
            </p>
            <p>
              🧠 <strong>Mistral Small</strong> — 1,376 tokens →{" "}
              <span className="text-green-700 font-semibold">€0.00</span>
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-600 italic">
            Claude Sonnet and GPT-4 offer premium results with moderate to high
            cost. GPT-4.1 Nano is ultra low-cost, and Mistral Small is entirely
            free. Choose models based on your balance, budget, and accuracy
            needs.
          </p>
        </section>

        <section id="team" className="mt-12 space-y-4 text-gray-800">
          <h2 className="text-2xl font-semibold mb-2">Developed by:</h2>
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
