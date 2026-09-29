# PathSim AI

**Class 10 to Career Decision Simulator** — *Explore • Test-drive • Stress-test your future*

> "Try your career before you choose it, and know your Plan B before you need it."

Presentation for **HackMatrix – Round 1** · Problem Statement **MISC01: Class 10 Career Decision Support**

📄 **Slides:** [`PathSim_HackMatrix_Round1.pptx`](./PathSim_HackMatrix_Round1.pptx)

---

## The Problem

Class 10 students choose their stream with limited information about their interests, finances and career outcomes. Most existing tools also assume every exam goes to plan, so there is no Plan B if a student misses JEE/NEET or the family budget changes.

## Our Solution

PathSim AI is an AI decision-support platform that shows multiple career pathways with their costs, funding options, loans and Plan B scenarios, so students and parents can make an informed and confident stream choice.

**Target users:** Class 10 students and their parents.

## Key Features

| # | Feature | What it does |
|---|---------|--------------|
| 1 | **Interactive Skill-Tree** | Live map from Class 10 to a job, coloured by fit and cost |
| 2 | **Work-Day Simulator** | A 5-minute career preview that sharpens role fit |
| 3 | **Plan B Recalibrator** | Missed JEE/NEET or budget cut? Paths re-route instantly |
| 4 | **Student–Parent View** | Interest-led and ROI-led views, in English + Hindi/Marathi |

Cost, loan and ROI figures are shown as **ranges, not promises**.

## Technical Approach

```
Student Profile (marks, RIASEC quiz, budget, risk)      Institutions (fees, cutoffs, location)
                         \                                        /
                          →  Pathway Engine + Skill-Tree (knowledge graph, hybrid recommender)
                                            ↓
        Funding + Loans (scholarships, EMI, ROI)  ·  Work-Day Sim (LLM role-fit signal)
                                            ↓
                         Decision Matrix (weights + Monte Carlo ranges)
                                            ↓
                         Student ⇄ Parent View (roadmap + PDF report)
```

Any change in marks, budget or stream re-runs the whole flow (Plan B Recalibrator).

**AI / ML techniques**
- RIASEC scoring + clustering
- Embeddings + graph traversal
- Logistic regression (admission chance)
- Monte Carlo simulation
- RAG + Gemini LLM

## Planned Tech Stack

- **Frontend:** Next.js, React Flow, Recharts
- **Backend:** FastAPI, scikit-learn
- **Data / search:** NetworkX, FAISS, SQLite
- **LLM:** Gemini API
- **Deployment:** Vercel + Render

## MVP Scope

- Profile builder + pathway engine
- Interactive skill-tree
- Institution + loan comparison
- Plan B (2 scenarios) + decision matrix

Scoped data: ~8 career clusters · ~40 institutions in 4–5 countries · ~30 scholarships · ~8 loans

## Data Sources

- [NIRF Rankings](https://www.nirfindia.org) — institution data
- [National Scholarship Portal](https://scholarships.gov.in) — scholarships
- [Vidya Lakshmi Portal](https://www.vidyalakshmi.co.in) — education loans
- [Adzuna API](https://developer.adzuna.com) — salary data, with cached fallback

## References

1. Holland, J. L. (1997). *Making Vocational Choices: A Theory of Vocational Personalities and Work Environments* (RIASEC model).
2. Frey, C. B. & Osborne, M. A. (2017). The future of employment: How susceptible are jobs to computerisation? *Technological Forecasting and Social Change*, 114.
3. Reimers, N. & Gurevych, I. (2019). Sentence-BERT: Sentence embeddings using Siamese BERT-networks. *EMNLP*.
4. Lewis, P. et al. (2020). Retrieval-Augmented Generation for knowledge-intensive NLP tasks. *NeurIPS*.
5. Johnson, J., Douze, M. & Jégou, H. (2019). Billion-scale similarity search with GPUs (FAISS). *IEEE Transactions on Big Data*.

## Team PathSim AI

- Maitri Sudrik
- Komal Koshti
- Swara Pande
- Kritika Kavtikwar
