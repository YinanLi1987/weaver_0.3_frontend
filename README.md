# Weaver – for Knowledge

**Weaver for Know** helps you extract, connect, and explore knowledge through structured entity extraction using powerful Large Language Models (LLMs).

🎥 **Demo Video**: [Watch on YouTube](https://youtu.be/l8qlwapNewo)

---

## ✨ Features

- **CSV Upload**: Upload text record datasets via CSV files.
- **Entity Definition Examples**: Define entities clearly for better extraction quality.
- **LLM Comparison**: Run and compare outputs from up to 3 LLMs in parallel.
- **Live Progress**: Monitor real-time analysis as models process your data.
- **Result Review**: View record-level output, disagreements, and supporting evidence.
- **Final Entity Editing**: Refine and define the gold-standard entity output.
- **Export Capability**: Download the processed and validated dataset.
- **Evaluation Metrics**: Evaluate each model’s precision, recall, and F1 score.
- **Transparent Billing**: See live updates on credits spent, with full pricing details.

---

## ✅ Good Entity Definition Example

| Name       | Description                                                                                 | Examples                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Population | Refers only to soil taxa (microorganisms, invertebrates, and vertebrates). Excludes plants. | Microorganisms, Bacteria, Fungi, Archaea, Microfauna, Macrofauna, Information_not_present |

---

## ❌ Poor Entity Definition Example

| Name       | Description                                              | Examples                      |
| ---------- | -------------------------------------------------------- | ----------------------------- |
| Population | All things in or near soil maybe, including plants, etc. | worms?? trees? fish? unknown? |

---

## 📊 Performance Metrics

- **Precision** = TP / (TP + FP)
- **Recall** = TP / (TP + FN)
- **F1 Score** = 2 × (Precision × Recall) / (Precision + Recall)

Evaluated across all models and entity types. Full breakdowns are available post-analysis.

---

## 💰 Billing & Usage

- **Free Models**: Unlimited use (e.g., Mistral Small)
- **Paid Models**: Credits deducted at cost = 1.3 × base price
  - 1.0 → Model provider
  - 0.3 → Platform infra, storage, and billing

**Note**: Pricing may change based on testing feedback.

---

## 🧠 Supported LLMs & Pricing

| Model             | Provider   | Input / 1k tokens | Output / 1k tokens | Final Cost (×1.3) | Status |
| ----------------- | ---------- | ----------------- | ------------------ | ----------------- | ------ |
| GPT-4.1 Nano      | OpenAI     | €0.0001           | €0.0004            | Paid              |
| GPT-4             | OpenAI     | €0.0300           | €0.0600            | Paid              |
| Claude Sonnet 3.7 | Anthropic  | €0.0030           | €0.0150            | Paid              |
| Mistral Small     | Mistral AI | €0.0000           | €0.0000            | Free              |

---

## 💡 Example Costs

| Model             | Tokens Used | Cost (Est.) |
| ----------------- | ----------- | ----------- |
| Claude Sonnet 3.7 | 1,316       | €0.0076     |
| GPT-4.1 Nano      | 1,135       | €0.00018    |
| Mistral Small     | 1,258       | €0.00       |

---

## 🧑‍💻 Use Cases

Ideal for:

- Clinical trial data extraction
- Financial document analysis
- Scientific paper annotation
- Media and article summarization

---

## 👤 Developers

- **Li Yinan** – System architecture, design & implementation  
  _Oulu University of Applied Sciences, Finland_
- **Marie-Liesse Vermeire** – Concept originator & scientific feedback  
  _CIRAD – Persyst – UPR Recyclage et Risque_

---

## 📫 Contact

For questions or billing issues:  
📧 liyinan39@gmail.com
