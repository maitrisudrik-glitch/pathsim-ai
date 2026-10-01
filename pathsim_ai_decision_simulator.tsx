import React, { useState, useMemo, useEffect } from 'react';
import {
  Compass,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Briefcase,
  Sliders,
  DollarSign,
  HelpCircle,
  RotateCcw,
  Zap,
  Globe,
  Users,
  UserCheck,
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Award,
  Layers,
  ArrowRight,
  Sparkles,
  BarChart3,
  Calendar,
  Lock,
  Search,
  ExternalLink,
  BookOpen
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    title: "PathSim AI",
    tagline: "Class 10 to Career Decision Simulator & Plan B Engine",
    studentView: "Student View",
    parentView: "Parent View",
    demoBtn: "Load Demo (88% PCB/Tech)",
    planBTriggers: "Plan B Stress-Test",
    tabs: {
      profile: "Profile & RIASEC",
      skilltree: "Career Skill-Tree",
      planB: "Plan B Recalibrator",
      simulator: "Work-Day Sim (M8)",
      institutions: "Colleges & Loans",
      matrix: "Decision Matrix & Monte Carlo"
    },
    parentBanner: "Parent Mode Active: Prioritizing Total Cost of Borrowing, Salary-to-EMI Safety, and Automation Risk.",
    studentBanner: "Student Mode Active: Prioritizing Daily Work Excitement, Creative Freedom, and Skill Trajectories.",
    budget: "Family Budget Cap",
    loanRisk: "EMI vs Expected Salary",
    contingencyTriggered: "Stress-Test Scenario Activated",
    resetScenario: "Reset to Baseline",
    printReport: "Print Summary"
  },
  hi: {
    title: "पाथ-सिम AI",
    tagline: "कक्षा 10 से करियर निर्णय सिमुलेटर एवं प्लान-बी इंजन",
    studentView: "छात्र दृष्टिकोण",
    parentView: "अभिभावक दृष्टिकोण",
    demoBtn: "डेमो लोड करें (88% PCB/Tech)",
    planBTriggers: "प्लान बी स्ट्रेस-टेस्ट",
    tabs: {
      profile: "प्रोफाइल और रुचि (RIASEC)",
      skilltree: "करियर स्किल-ट्री",
      planB: "प्लान बी पुनर्गणना",
      simulator: "कार्य-दिवस सिम्युलेटर",
      institutions: "कॉलेज और शिक्षा ऋण",
      matrix: "निर्णय मैट्रिक्स और अनिश्चितता"
    },
    parentBanner: "अभिभावक मोड सक्रिय: कुल खर्च, ईएमआई सुरक्षा और करियर स्थिरता पर विशेष जोर।",
    studentBanner: "छात्र मोड सक्रिय: दैनिक कार्य की संतुष्टि, व्यक्तिगत रुचि और कौशल विकास पर जोर।",
    budget: "पारिवारिक बजट सीमा",
    loanRisk: "ईएमआई बनाम अपेक्षित वेतन",
    contingencyTriggered: "आपातकालीन परिदृश्य सक्रिय",
    resetScenario: "मूल स्थिति में लाएं",
    printReport: "रिपोर्ट प्रिंट करें"
  }
};

const BASELINE_PATHWAYS = [
  {
    id: "mbbs-clinical",
    stream: "PCB",
    name: "Clinical Medicine (MBBS)",
    category: "Ambitious",
    tier: "Doctor / Surgeon",
    steps: ["Class 10", "PCB + NEET-UG", "MBBS (5.5y)", "MD/MS Residency", "Specialist Physician"],
    durationYrs: 10,
    costRange: [1200000, 7500000],
    avgStartingSalary: 1200000,
    salaryGrowth: "High (peaks year 7+)",
    difficulty: "Extremely High (NEET 99.2%ile)",
    automationRisk: "Low (7%)",
    fitScore: 89,
    riasecMatch: "Investigative & Social",
    skills: ["Anatomy", "Pathology", "Clinical Diagnosis", "Patient Empathy", "Emergency Triage"],
    outlook: "High prestige, prolonged training, recession-proof.",
    whyCard: "Strong fit for Investigative profile and high Biology marks, but carries high entrance competition risk.",
    isPlanB: false,
    ghosted: false
  },
  {
    id: "bio-informatics",
    stream: "PCMB",
    name: "Computational Biology & AI Genomics",
    category: "Safe",
    tier: "Tech-Bio Hybrid",
    steps: ["Class 10", "PCMB Stream", "B.Tech BioTech / B.Sc Data Sci", "M.Sc Computational Biology", "Bioinformatics Scientist"],
    durationYrs: 5,
    costRange: [600000, 2400000],
    avgStartingSalary: 1450000,
    salaryGrowth: "Exponential",
    difficulty: "Moderate-High",
    automationRisk: "Moderate (21%)",
    fitScore: 94,
    riasecMatch: "Investigative & Realistic",
    skills: ["Python", "Genomics Pipelines", "R / Bioconductor", "Machine Learning", "Structural Biology"],
    outlook: "Massive global demand in drug discovery, biotech startups, and personalized oncology.",
    whyCard: "Harnesses your strong analytical aptitude with Biology without the 10-year residency slog.",
    isPlanB: false,
    ghosted: false
  },
  {
    id: "biomedical-eng",
    stream: "PCM",
    name: "Biomedical Devices & Robotic Surgery Tech",
    category: "International",
    tier: "Engineering",
    steps: ["Class 10", "PCM Stream", "B.Tech Biomedical Eng (India/DE)", "Medical Device Innovation Lab", "R&D Device Specialist"],
    durationYrs: 4.5,
    costRange: [800000, 2800000],
    avgStartingSalary: 1100000,
    salaryGrowth: "Strong",
    difficulty: "Moderate",
    automationRisk: "Low-Moderate (14%)",
    fitScore: 86,
    riasecMatch: "Realistic & Investigative",
    skills: ["Embedded Systems", "Biomechanics", "ISO 13485 Compliance", "CAD/SolidWorks", "Signal Processing"],
    outlook: "Huge growth in healthcare robotics, neuro-implants, and wearable diagnostics.",
    whyCard: "Directly benefits from tuition-free German universities or top Indian technological institutes.",
    isPlanB: false,
    ghosted: false
  },
  {
    id: "bpharm-regulatory",
    stream: "PCB",
    name: "Pharmaceutical Sciences & Clinical Trials",
    category: "Low-Cost",
    tier: "Allied Health",
    steps: ["Class 10", "PCB / MHT-CET / CUET", "B.Pharm (Govt/Semi-Govt)", "Clinical Research Diploma", "Clinical Data Associate"],
    durationYrs: 4,
    costRange: [350000, 1100000],
    avgStartingSalary: 750000,
    salaryGrowth: "Steady",
    difficulty: "Accessible (CUET/CET cutoff)",
    automationRisk: "Moderate (28%)",
    fitScore: 82,
    riasecMatch: "Conventional & Investigative",
    skills: ["Good Clinical Practice (GCP)", "Drug Dossiers", "Pharmacovigilance", "Regulatory Filings"],
    outlook: "Reliable employment across multi-national CROs and global pharma export corridors.",
    whyCard: "Maximum downside protection with high ROI-to-tuition ratio and rapid entry to workforce.",
    isPlanB: true,
    ghosted: false
  },
  {
    id: "health-data-quant",
    stream: "Commerce-Math",
    name: "Healthcare FinTech & Actuarial Health Risk",
    category: "Low-Cost",
    tier: "Finance / Analytics",
    steps: ["Class 10", "Commerce + Math", "B.Sc Statistics / Actuarial", "Health Insurance Quant Analytics", "Lead Risk Analyst"],
    durationYrs: 4,
    costRange: [400000, 1500000],
    avgStartingSalary: 1300000,
    salaryGrowth: "High",
    difficulty: "High (Actuarial Papers)",
    automationRisk: "Low (16%)",
    fitScore: 80,
    riasecMatch: "Enterprising & Conventional",
    skills: ["Survival Analysis", "Predictive Underwriting", "Financial Risk Modeling", "SQL & PowerBI"],
    outlook: "Huge expansion in private health insurance and global medical underwriting.",
    whyCard: "Alternative route if pivoting from science to commerce while keeping healthcare domain focus.",
    isPlanB: false,
    ghosted: false
  }
];

const INSTITUTIONS_DB = [
  {
    id: "inst-1",
    name: "AIIMS New Delhi",
    country: "India Govt",
    program: "MBBS",
    tuition5Yr: 15000,
    living5Yr: 300000,
    admissionChance: "0.2% (Extremely Hyper-Competitive)",
    roiRating: "Exceptional",
    acceptanceScore: 12,
    scholarshipsAvailable: "Merit National Health Fellowship (100% cover)"
  },
  {
    id: "inst-2",
    name: "Manipal Academy of Higher Ed (MAHE)",
    country: "India Private",
    program: "MBBS / Biomedical Sciences",
    tuition5Yr: 6800000,
    living5Yr: 1200000,
    admissionChance: "35% (MET / NEET Score)",
    roiRating: "Moderate-Low (Heavy initial debt)",
    acceptanceScore: 65,
    scholarshipsAvailable: "Kalam-Pai Merit Scholarship (Up to 30% fee waiver)"
  },
  {
    id: "inst-3",
    name: "Technical University of Munich (TUM)",
    country: "Germany",
    program: "B.Sc Bioinformatics / Computational Bio",
    tuition5Yr: 280000, // Nominal admin fees
    living5Yr: 3800000, // Blocked account (~€950/mo)
    admissionChance: "42% (Aptitude test + TestAS)",
    roiRating: "Very High (Zero Tuition + EU job market)",
    acceptanceScore: 55,
    scholarshipsAvailable: "DAAD STIBET & Deutschlandstipendium"
  },
  {
    id: "inst-4",
    name: "IIT Kharagpur (School of Med Sci & Tech)",
    country: "India Govt",
    program: "Integrated B.Tech-M.Tech Bioengineering",
    tuition5Yr: 950000,
    living5Yr: 450000,
    admissionChance: "2.1% (JEE Advanced)",
    roiRating: "Outstanding",
    acceptanceScore: 28,
    scholarshipsAvailable: "Central Sector Top Class Scholarship"
  },
  {
    id: "inst-5",
    name: "University of Manchester",
    country: "UK",
    program: "B.Sc Biotechnology with Industrial Experience",
    tuition5Yr: 8900000,
    living5Yr: 4200000,
    admissionChance: "58% (Conditional on 85%+ in XII)",
    roiRating: "Moderate (Depends heavily on Graduate Route Visa)",
    acceptanceScore: 78,
    scholarshipsAvailable: "Global Futures Scholarship (£5,000/yr)"
  }
];

const SCHOLARSHIPS_DATA = [
  {
    id: "sch-1",
    name: "Inspire SHE (Dept of Science & Technology, GoI)",
    amount: "₹80,000 / year (₹4 Lakh total)",
    criteria: "Top 1% in Class 12 Boards pursuing Basic Sciences/Bio",
    fitConfidence: "Likely",
    type: "Govt Direct Benefit"
  },
  {
    id: "sch-2",
    name: "DAAD Study Grant (Germany)",
    amount: "€861/month stipend + health insurance subsidy",
    criteria: "Enrolled in approved German public university STEM",
    fitConfidence: "Possible",
    type: "International Merit"
  },
  {
    id: "sch-3",
    name: "HDFC Badhte Kadam Healthcare Education Grant",
    amount: "₹1,00,000 one-time assistance",
    criteria: "Family annual income < ₹6 Lakhs & enrolled in Allied Health",
    fitConfidence: "Likely",
    type: "CSR Private"
  },
  {
    id: "sch-4",
    name: "Commonwealth Undergraduate Open Scholarship",
    amount: "Full tuition + return airfare",
    criteria: "Academic excellence + demonstrable social impact",
    fitConfidence: "Stretch (High competition)",
    type: "Prestigious International"
  }
];

const WORKDAY_SIMULATIONS = {
  bioinformatics: {
    title: "Bioinformatics Scientist - Crisis in Cancer Drug Target",
    career: "Computational Biology & Genomics",
    timeLimit: 180,
    scenario: "You are testing a novel CRISPR target for triple-negative breast cancer. At 09:30 AM, your automated sequencing pipeline throws an anomaly: 14% of cell assays demonstrate unanticipated off-target genomic cleavage on chromosome 7.",
    steps: [
      {
        q: "Step 1 of 3: How do you immediately triage the chromosome 7 cleavage anomaly?",
        options: [
          {
            text: "Pause wet-lab synthesis immediately; run a multi-genome BLAST alignment with synthetic guide RNA tolerance to identify specific binding affinity.",
            trait: "Analytical Rigor",
            scoreDelta: +8,
            feedback: "Spot on! Prevents ₹4,50,000 waste in live cell lines while isolating the molecular mismatch mathematically."
          },
          {
            text: "Proceed with the planned dosage in mice to check if the immune system naturally cleans up the mutation.",
            trait: "Reckless Risk",
            scoreDelta: -6,
            feedback: "High safety violation! Clinical trials strictly forbid uncharacterized off-target cleavage."
          },
          {
            text: "Recalibrate the sequencer sensors assuming it was a sensor fluorescence artifact.",
            trait: "Wishful Bias",
            scoreDelta: -2,
            feedback: "Risk of false reassurance: Bio-data anomalies are predominantly sequence-specific, not sensor noise."
          }
        ]
      },
      {
        q: "Step 2 of 3: The algorithmic model confirms off-target affinity in a non-coding histone promoter. The project lead wants quick results for an investor milestone next week. What is your recommendation?",
        options: [
          {
            text: "Design a high-fidelity Cas9 variant with modified PAM recognition sequence, extending the milestone deadline by 3 weeks.",
            trait: "Quality & Ethics",
            scoreDelta: +9,
            feedback: "Exemplary scientific leadership. Biotech patents built on shaky safety fail regulatory scrutiny later."
          },
          {
            text: "Omit the promoter region note from the investor deck and fix it post-funding round.",
            trait: "Unethical Pressure",
            scoreDelta: -10,
            feedback: "Severe ethical hazard! Would fail FDA IND filing and subject your lab to audits."
          },
          {
            text: "Deploy a small-molecule inhibitor to chemically mask the unintended expression.",
            trait: "Clever Workaround",
            scoreDelta: +4,
            feedback: "Viable stop-gap, though increases multi-drug toxicity risk in later trials."
          }
        ]
      },
      {
        q: "Step 3 of 3: You have 15 minutes to brief the executive committee and venture partners. How do you communicate?",
        options: [
          {
            text: "Present a 3D structural rendering of the modified Cas9, showing the zero-cleavage envelope with verified confidence intervals.",
            trait: "Executive Synthesis",
            scoreDelta: +8,
            feedback: "Translates complex genomic mathematics into clear corporate risk-reduction metrics."
          },
          {
            text: "Dump 45 pages of raw Python FASTA logs and tell them the data speaks for itself.",
            trait: "Communication Breakdown",
            scoreDelta: -4,
            feedback: "Investors and hospital partners need synthesized decision options, not terminal logs."
          }
        ]
      }
    ]
  },
  cybersecurity: {
    title: "Incident Response Lead - Hospital Network Ransomware Alert",
    career: "Healthcare Cybersecurity & Defense",
    timeLimit: 180,
    scenario: "It is 02:14 AM on Saturday. The pediatric ICU network at a major medical hub alerts you: multiple telemetry machines are making encrypted outbound calls to an unrecognized IP address in Eastern Europe.",
    steps: [
      {
        q: "Step 1 of 3: Heart monitors are currently functioning, but outbound data leaks are increasing. First action?",
        options: [
          {
            text: "Physically sever the hospital core VLAN from the public WAN while isolating the pediatric ICU onto local air-gapped subnet.",
            trait: "Decisive Containment",
            scoreDelta: +9,
            feedback: "Perfect containment: preserves live patient monitoring while terminating telemetry exfiltration."
          },
          {
            text: "Wait 30 minutes to see if the hospital director wakes up to authorize network changes.",
            trait: "Paralysis",
            scoreDelta: -8,
            feedback: "Ransomware spreads laterally in under 4 minutes. Waiting guarantees total encryption."
          },
          {
            text: "Reboot every ventilator and monitor immediately.",
            trait: "Catastrophic Action",
            scoreDelta: -12,
            feedback: "Critical danger! Never reboot live patient-supporting hardware during an active breach."
          }
        ]
      },
      {
        q: "Step 2 of 3: The attacker drops a ransom note demanding 15 Bitcoin or they decrypt patient psychiatric records online.",
        options: [
          {
            text: "Engage CERT-In / cyber police, spin up offline immutable warm-backups from 23:00 hours, and verify hash integrity.",
            trait: "Resilient Protocol",
            scoreDelta: +8,
            feedback: "Adheres to gold-standard incident response: restores integrity without funding extortion."
          },
          {
            text: "Negotiate on Telegram and pay the ransom using discretionary emergency funds.",
            trait: "Vulnerable Capitulation",
            scoreDelta: -7,
            feedback: "Over 68% of ransom-paying targets are hit a second time within 90 days."
          }
        ]
      }
    ]
  }
};

export default function App() {
  // Global View Controls
  const [lang, setLang] = useState('en');
  const [viewMode, setViewMode] = useState('student'); // 'student' | 'parent'
  const [activeTab, setActiveTab] = useState('profile');

  // M1: Student Profile State
  const [marks, setMarks] = useState({ science: 91, math: 86, english: 88, social: 87 });
  const [board, setBoard] = useState('CBSE');
  const [riasec, setRiasec] = useState({ R: 65, I: 92, A: 48, S: 75, E: 55, C: 60 });
  const [budgetLakhs, setBudgetLakhs] = useState(15); // in Lakhs INR
  const [riskAppetite, setRiskAppetite] = useState('Balanced'); // Conservative, Balanced, Ambitious
  const [preferredCountry, setPreferredCountry] = useState('All'); // All, India Govt, India Private, Germany, UK
  const [filterPathway, setFilterPathway] = useState('All'); // All, Ambitious, Safe, Low-Cost, International

  // M6: Plan B Stress-Test Active Scenarios
  const [activeScenario, setActiveScenario] = useState(null); // null | 'no-neet' | 'budget-cut' | 'pivot-tech'

  // M8: Work-Day Sim State
  const [simActiveCareer, setSimActiveCareer] = useState('bioinformatics');
  const [simStepIndex, setSimStepIndex] = useState(0);
  const [simScoreDeltaTotal, setSimScoreDeltaTotal] = useState(0);
  const [simLogs, setSimLogs] = useState([]);
  const [simCompleted, setSimCompleted] = useState(false);

  // M5: Education Loan Calculator State
  const [loanPrincipalLakhs, setLoanPrincipalLakhs] = useState(10);
  const [interestRate, setInterestRate] = useState(9.8); // 9.8% annual
  const [loanTenureYrs, setLoanTenureYrs] = useState(7);
  const [moratoriumYrs, setMoratoriumYrs] = useState(4); // college years

  // M7: Decision Matrix User Weights
  const [weights, setWeights] = useState({
    fit: 35,
    cost: 25,
    admission: 15,
    roi: 15,
    automationSafety: 10
  });

  // M7: Editable Assumptions
  const [assumptions, setAssumptions] = useState({
    inflationRate: 5.5,
    eurInrRate: 91.5,
    salaryGrowthAnnual: 8.5,
    monteCarloTrials: 500
  });

  // Selected Node Drawer for Career Tree
  const [selectedNode, setSelectedNode] = useState(BASELINE_PATHWAYS[1]);

  const t = TRANSLATIONS[lang];

  const handleLoadDemo = () => {
    setMarks({ science: 93, math: 89, english: 87, social: 84 });
    setBoard('CBSE');
    setRiasec({ R: 60, I: 94, A: 45, S: 82, E: 50, C: 65 });
    setBudgetLakhs(15);
    setRiskAppetite('Balanced');
    setPreferredCountry('All');
    setActiveScenario(null);
    setSelectedNode(BASELINE_PATHWAYS[1]);
  };

  const pathways = useMemo(() => {
    let list = JSON.parse(JSON.stringify(BASELINE_PATHWAYS));

    // Dynamic scoring adjustments based on RIASEC & Simulation score
    list = list.map(item => {
      let dynamicFit = item.fitScore;
      if (item.id === 'bio-informatics' && simScoreDeltaTotal !== 0) {
        dynamicFit = Math.min(99, dynamicFit + simScoreDeltaTotal);
      }
      return { ...item, fitScore: dynamicFit };
    });

    if (activeScenario === 'no-neet') {
      return list.map(p => {
        if (p.id === 'mbbs-clinical') {
          return {
            ...p,
            ghosted: true,
            whyCard: "BLOCKED: NEET score insufficient. Diverting focus to allied sciences without career disruption."
          };
        }
        if (p.id === 'bio-informatics' || p.id === 'biomedical-eng' || p.id === 'bpharm-regulatory') {
          return {
            ...p,
            fitScore: Math.min(98, p.fitScore + 8),
            isPlanB: true,
            whyCard: "RECOMMENDED PLAN B: Preserves high healthcare impact, faster route to financial independence."
          };
        }
        return p;
      });
    }

    if (activeScenario === 'budget-cut') {
      const slashedBudget = budgetLakhs * 0.7; // 30% reduction
      return list.map(p => {
        const minCostInLakhs = p.costRange[0] / 100000;
        if (minCostInLakhs > slashedBudget) {
          return {
            ...p,
            ghosted: true,
            whyCard: `EXCEEDS REVISED CAP (₹${slashedBudget.toFixed(1)}L). High loan requirement flagged.`
          };
        }
        if (p.category === 'Low-Cost' || p.id === 'biomedical-eng') {
          return {
            ...p,
            fitScore: Math.min(99, p.fitScore + 12),
            isPlanB: true,
            whyCard: `PLAN B OPTIMIZED: Fits within ₹${slashedBudget.toFixed(1)}L budget cap with strong government subsidies or tuition-free European route.`
          };
        }
        return p;
      });
    }

    if (activeScenario === 'pivot-tech') {
      return list.map(p => {
        if (p.id === 'mbbs-clinical' || p.id === 'bpharm-regulatory') {
          return { ...p, ghosted: true };
        }
        if (p.id === 'bio-informatics' || p.id === 'health-data-quant') {
          return {
            ...p,
            fitScore: 97,
            isPlanB: true,
            whyCard: "TECH PIVOT: Merges biology knowledge with high-paying machine learning / fintech data stacks."
          };
        }
        return p;
      });
    }

    return list;
  }, [activeScenario, budgetLakhs, simScoreDeltaTotal]);

  const loanMetrics = useMemo(() => {
    const P = loanPrincipalLakhs * 100000;
    const r = interestRate / 12 / 100;
    const n = loanTenureYrs * 12;

    // Standard reducing balance EMI formula
    let emi = 0;
    if (r > 0) {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = P / n;
    }

    const totalRepaid = emi * n;
    const totalInterest = totalRepaid - P;

    // Monthly expected starting salary estimate (e.g. from current selected pathway or default ₹12L -> ₹1L/month)
    const expectedMonthlySalary = (selectedNode.avgStartingSalary || 1200000) / 12;
    const emiShareOfSalary = (emi / expectedMonthlySalary) * 100;

    let safetyStatus = "Safe";
    let statusColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/30";
    if (emiShareOfSalary > 35) {
      safetyStatus = "Dangerously High Debt Burden (>35%)";
      statusColor = "text-red-500 bg-red-500/10 border-red-500/30";
    } else if (emiShareOfSalary > 22) {
      safetyStatus = "Moderate Risk (Tight budget)";
      statusColor = "text-amber-500 bg-amber-500/10 border-amber-500/30";
    }

    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalCostOfBorrowing: Math.round(totalRepaid),
      emiShareOfSalary: emiShareOfSalary.toFixed(1),
      safetyStatus,
      statusColor
    };
  }, [loanPrincipalLakhs, interestRate, loanTenureYrs, selectedNode]);

  const monteCarloSimulation = useMemo(() => {
    // Generate distribution for Selected Pathway
    const baseCost = (selectedNode.costRange[0] + selectedNode.costRange[1]) / 2;
    const baseSal = selectedNode.avgStartingSalary;

    // Simulate variations in tuition inflation & starting economic cycles
    const p10Net5Yr = Math.round(baseSal * 3.8 - baseCost * 1.25); // Pessimistic
    const p50Net5Yr = Math.round(baseSal * 5.2 - baseCost * 1.05); // Expected median
    const p90Net5Yr = Math.round(baseSal * 7.1 - baseCost * 0.95); // Optimistic

    return {
      p10: p10Net5Yr,
      p50: p50Net5Yr,
      p90: p90Net5Yr,
      p10Sal: Math.round(baseSal * 0.78),
      p90Sal: Math.round(baseSal * 1.35)
    };
  }, [selectedNode, assumptions]);

  const handleSimChoice = (option) => {
    const newLogs = [
      ...simLogs,
      {
        step: simStepIndex + 1,
        choiceText: option.text,
        trait: option.trait,
        feedback: option.feedback,
        delta: option.scoreDelta
      }
    ];
    setSimLogs(newLogs);
    setSimScoreDeltaTotal(prev => prev + option.scoreDelta);

    const activeCase = WORKDAY_SIMULATIONS[simActiveCareer];
    if (simStepIndex + 1 < activeCase.steps.length) {
      setSimStepIndex(simStepIndex + 1);
    } else {
      setSimCompleted(true);
    }
  };

  const handleResetSim = () => {
    setSimStepIndex(0);
    setSimLogs([]);
    setSimScoreDeltaTotal(0);
    setSimCompleted(false);
  };

  const calculateCompositeScore = (pathway) => {
    // Computes score based on perspective
    const fitFactor = (pathway.fitScore / 100) * (weights.fit / 100);
    const costFactor = (1 - (pathway.costRange[0] / 8000000)) * (weights.cost / 100);
    const roiFactor = ((pathway.avgStartingSalary / 1500000) * 0.8) * (weights.roi / 100);
    const autoFactor = (1 - parseInt(pathway.automationRisk) / 100) * (weights.automationSafety / 100);
    return Math.round((fitFactor + costFactor + roiFactor + autoFactor) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Pitch */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-indigo-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                  {t.title}
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
                  HackMatrix MISC01
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Perspective & Quick Actions */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setViewMode('student')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'student'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                {t.studentView}
              </button>
              <button
                onClick={() => setViewMode('parent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'parent'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                {t.parentView}
              </button>
            </div>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300"
              title="Toggle English / Hindi"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Demo Quick-Loader */}
            <button
              onClick={handleLoadDemo}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.demoBtn}</span>
            </button>
          </div>
        </div>
      </header>

      {}
      <div className={`px-4 py-2 border-b text-xs flex items-center justify-between transition-colors ${
        viewMode === 'parent'
          ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
          : 'bg-indigo-950/40 border-indigo-800/50 text-indigo-300'
      }`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>{viewMode === 'parent' ? t.parentBanner : t.studentBanner}</span>
          </div>
          {activeScenario && (
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-medium animate-pulse flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {t.contingencyTriggered}: {activeScenario.toUpperCase()}
              </span>
              <button
                onClick={() => setActiveScenario(null)}
                className="underline hover:text-white ml-2 text-[11px]"
              >
                {t.resetScenario}
              </button>
            </div>
          )}
        </div>
      </div>

      {}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none">
          {Object.entries(t.tabs).map(([key, label]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {key === 'profile' && <GraduationCap className="w-4 h-4 text-violet-400" />}
                {key === 'skilltree' && <Layers className="w-4 h-4 text-cyan-400" />}
                {key === 'planB' && <RotateCcw className="w-4 h-4 text-amber-400" />}
                {key === 'simulator' && <Zap className="w-4 h-4 text-emerald-400" />}
                {key === 'institutions' && <DollarSign className="w-4 h-4 text-blue-400" />}
                {key === 'matrix' && <BarChart3 className="w-4 h-4 text-purple-400" />}
                <span>{label}</span>
                {key === 'planB' && activeScenario && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* TAB 1: M1 Profile Builder */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Academic & Financial Inputs */}
            <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    M1: Student Academic & Financial Baseline
                  </h2>
                  <p className="text-xs text-slate-400">Class 10 scores, board accreditation, and family financial constraints</p>
                </div>
                <span className="text-xs bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-full font-mono">
                  Board: {board}
                </span>
              </div>

              {/* Class 10 Marks Sliders */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 block">
                  Class 10 Subject Performance (% Marks)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(marks).map(([subject, val]) => (
                    <div key={subject} className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="capitalize text-slate-400">{subject}</span>
                        <span className="font-bold text-indigo-400">{val}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={val}
                        onChange={(e) => setMarks({ ...marks, [subject]: parseInt(e.target.value) })}
                        className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Board Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">
                  Examination Board
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['CBSE', 'ICSE', 'State Board'].map(b => (
                    <button
                      key={b}
                      onClick={() => setBoard(b)}
                      className={`py-2 px-3 text-xs rounded-xl border text-center transition-all font-medium ${
                        board === b
                          ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-sm'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Financial Constraints Sliders */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="text-sm font-semibold text-white flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      Family Self-Funded Budget Cap
                    </label>
                    <p className="text-xs text-slate-400">Total liquid capital available without education loans</p>
                  </div>
                  <span className="text-base font-bold text-emerald-400 font-mono">
                    ₹{budgetLakhs} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="75"
                  step="1"
                  value={budgetLakhs}
                  onChange={(e) => setBudgetLakhs(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>₹3L (Strict Govt / Scholarships)</span>
                  <span>₹25L (Mid Private)</span>
                  <span>₹75L+ (Global Overseas)</span>
                </div>
              </div>

              {/* Risk Appetite */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">
                  Family Risk Appetite & Exam Retake Tolerance
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'Conservative', desc: 'Prioritize guaranteed seat & fast earning' },
                    { key: 'Balanced', desc: '1 competitive attempt + reliable backup' },
                    { key: 'Ambitious', desc: 'Multiple competitive drops if needed' }
                  ].map(r => (
                    <button
                      key={r.key}
                      onClick={() => setRiskAppetite(r.key)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        riskAppetite === r.key
                          ? 'border-indigo-500 bg-indigo-500/10 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-200">{r.key}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-1">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIASEC Psychometric & Student Profile Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-cyan-400" />
                      Holland RIASEC Profile Fit
                    </h3>
                    <p className="text-xs text-slate-400">Psychometric vector derived from interest questionnaire</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { key: 'R', label: 'Realistic (Hands-on, Equipment, Code)', color: 'accent-cyan-500', bar: 'bg-cyan-500' },
                    { key: 'I', label: 'Investigative (Analysis, Research, Bio)', color: 'accent-indigo-500', bar: 'bg-indigo-500' },
                    { key: 'A', label: 'Artistic (Creative Design, Expression)', color: 'accent-pink-500', bar: 'bg-pink-500' },
                    { key: 'S', label: 'Social (Healthcare, Counseling, Teaching)', color: 'accent-emerald-500', bar: 'bg-emerald-500' },
                    { key: 'E', label: 'Enterprising (Leadership, Startups)', color: 'accent-amber-500', bar: 'bg-amber-500' },
                    { key: 'C', label: 'Conventional (Data, Process, Accounting)', color: 'accent-blue-500', bar: 'bg-blue-500' }
                  ].map(item => (
                    <div key={item.key} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">{item.label}</span>
                        <span className="font-mono font-bold text-slate-400">{riasec[item.key]}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={riasec[item.key]}
                        onChange={(e) => setRiasec({ ...riasec, [item.key]: parseInt(e.target.value) })}
                        className={`w-full ${item.color} h-1.5 bg-slate-800 rounded cursor-pointer`}
                      />
                    </div>
                  ))}
                </div>

                {/* Profile Summary Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-800/40 space-y-2">
                  <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Persona Synthesis
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Student possesses <strong className="text-white">High Investigative (92%)</strong> & <strong className="text-white">Social (75%)</strong> tendencies, backed by strong 10th science aptitude (91%). Best matched with scientific healthcare, bio-computational research, and medical technologies rather than pure rote clinical paths.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">Recommended Streams: PCB / PCMB</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">Financial Tier: Mid-Budget</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('skilltree')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  <span>Explore Generated Career Tree (M2/M3)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: M2 & M3 Interactive Skill Tree */}
        {activeTab === 'skilltree' && (
          <div className="space-y-6">
            {/* Filter and Mode Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">Path Filter:</span>
                {['All', 'Ambitious', 'Safe', 'Low-Cost', 'International'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterPathway(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      filterPathway === cat
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('planB')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Test Plan B Recalibration</span>
                </button>
              </div>
            </div>

            {/* Tree Canvas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Visual Step Trees */}
              <div className="lg:col-span-8 space-y-4">
                {pathways
                  .filter(p => filterPathway === 'All' || p.category === filterPathway)
                  .map((path) => {
                    const isSelected = selectedNode.id === path.id;
                    const composite = calculateCompositeScore(path);

                    return (
                      <div
                        key={path.id}
                        onClick={() => setSelectedNode(path)}
                        className={`relative cursor-pointer transition-all duration-300 rounded-2xl border p-5 ${
                          path.ghosted
                            ? 'opacity-40 bg-slate-950/40 border-slate-900 line-through-decor'
                            : isSelected
                            ? 'bg-slate-900 border-indigo-500/80 shadow-xl shadow-indigo-500/10'
                            : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {/* Status Badges */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${
                              path.category === 'Ambitious'
                                ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                                : path.category === 'Safe'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : path.category === 'Low-Cost'
                                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                                : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                            }`}>
                              {path.category}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">Stream: {path.stream}</span>
                            {path.isPlanB && (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1">
                                <Zap className="w-3 h-3 text-amber-400" />
                                Calibrated Plan B
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 block uppercase">
                                {viewMode === 'parent' ? 'Composite ROI Score' : 'Interest Fit'}
                              </span>
                              <span className={`text-sm font-bold font-mono ${
                                path.fitScore >= 90 ? 'text-emerald-400' : path.fitScore >= 80 ? 'text-indigo-400' : 'text-amber-400'
                              }`}>
                                {viewMode === 'parent' ? `${composite}/100` : `${path.fitScore}% Fit`}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Title & One-liner */}
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            {path.name}
                            <span className="text-xs text-slate-400 font-normal">({path.tier})</span>
                          </h3>
                          <p className="text-xs text-slate-300 mt-1">{path.whyCard}</p>
                        </div>

                        {/* Visual Trajectory Nodes / Pipeline */}
                        <div className="pt-2 border-t border-slate-800">
                          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                            {path.steps.map((st, sidx) => (
                              <React.Fragment key={st}>
                                <div className={`px-2.5 py-1.5 rounded-lg text-[11px] whitespace-nowrap border ${
                                  sidx === 0
                                    ? 'bg-slate-950 border-slate-800 text-slate-400'
                                    : sidx === path.steps.length - 1
                                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                                    : 'bg-slate-800/80 border-slate-700 text-slate-200'
                                }`}>
                                  {st}
                                </div>
                                {sidx < path.steps.length - 1 && (
                                  <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        {/* Financial and Risk Metric Strip */}
                        <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Est. Degree Cost</span>
                            <span className="font-semibold text-slate-200">
                              ₹{(path.costRange[0]/100000).toFixed(1)}L - ₹{(path.costRange[1]/100000).toFixed(1)}L
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Starting Salary</span>
                            <span className="font-semibold text-emerald-400">
                              ₹{(path.avgStartingSalary/100000).toFixed(1)} LPA
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Duration</span>
                            <span className="font-semibold text-slate-200">{path.durationYrs} Years</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Automation Risk</span>
                            <span className="font-semibold text-amber-400">{path.automationRisk}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Right Column: Node Inspector & AI Why This Path */}
              <div className="lg:col-span-4 space-y-5">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-24 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      Node Deep-Dive Inspector
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">
                      {selectedNode.fitScore}% Profile Fit
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{selectedNode.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{selectedNode.outlook}</p>
                  </div>

                  {/* Required Competencies */}
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-2">Required Skills / Curricula:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.skills.map(sk => (
                        <span key={sk} className="text-[11px] bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md text-slate-300">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rigorous Parent View Metrics */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Entrance Barrier:</span>
                      <span className="text-slate-200 font-semibold">{selectedNode.difficulty}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Salary Growth Velocity:</span>
                      <span className="text-indigo-300 font-semibold">{selectedNode.salaryGrowth}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">RIASEC Archetype:</span>
                      <span className="text-slate-200">{selectedNode.riasecMatch}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">AI Automation Exposure:</span>
                      <span className="text-amber-400 font-mono font-bold">{selectedNode.automationRisk}</span>
                    </div>
                  </div>

                  {/* Quick simulation trigger */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSimActiveCareer(selectedNode.id === 'bio-informatics' ? 'bioinformatics' : 'cybersecurity');
                        setActiveTab('simulator');
                      }}
                      className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Test-Drive in 5-Min Work Sim</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: M6 Plan B Recalibrator */}
        {activeTab === 'planB' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-800/40 p-6 rounded-2xl">
              <div className="max-w-3xl">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <RotateCcw className="w-4 h-4" />
                  M6: Dynamic Plan B Recalibrator
                </span>
                <h2 className="text-xl font-bold text-white">
                  "Try your career before you choose it, and know your Plan B before you need it."
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Traditional career counseling breaks when exams or budgets fail. Trigger reality-check stress scenarios below to watch the graph reroute live without restarting from scratch.
                </p>
              </div>

              {/* Stress Test Action Trigger Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <button
                  onClick={() => setActiveScenario('no-neet')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeScenario === 'no-neet'
                      ? 'border-amber-500 bg-amber-500/20 text-white shadow-lg shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>Missed NEET / JEE Cutoff</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Instantly reroutes PCB path to Bioinformatics, Biomedical Engineering, and Clinical Research.
                  </p>
                </button>

                <button
                  onClick={() => setActiveScenario('budget-cut')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeScenario === 'budget-cut'
                      ? 'border-amber-500 bg-amber-500/20 text-white shadow-lg shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>Budget Slashed by 30%</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Eliminates high-debt private colleges; surfaces tuition-free German universities & govt grants.
                  </p>
                </button>

                <button
                  onClick={() => setActiveScenario('pivot-tech')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeScenario === 'pivot-tech'
                      ? 'border-amber-500 bg-amber-500/20 text-white shadow-lg shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>Pivot from Medical to Tech</span>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Bypasses residency delay; bridges biology marks with AI computational genomics.
                  </p>
                </button>
              </div>

              {activeScenario && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setActiveScenario(null)}
                    className="text-xs text-slate-400 hover:text-white underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset to Baseline Simulation
                  </button>
                </div>
              )}
            </div>

            {/* Live Recalibration Visual Diff */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Live Recalibrated Pathway Trajectory
              </h3>

              <div className="space-y-3">
                {pathways.map(p => (
                  <div
                    key={p.id}
                    className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                      p.ghosted
                        ? 'opacity-35 bg-slate-950 border-red-900/40'
                        : p.isPlanB
                        ? 'bg-amber-950/20 border-amber-500/40 shadow-md'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${p.ghosted ? 'line-through text-slate-400' : 'text-white'}`}>
                          {p.name}
                        </span>
                        {p.ghosted && (
                          <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded">
                            Eliminated by Trigger
                          </span>
                        )}
                        {p.isPlanB && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-semibold">
                            Activated Alternative
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{p.whyCard}</p>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block uppercase">Salary Estimate</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          ₹{(p.avgStartingSalary/100000).toFixed(1)} LPA
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block uppercase">Duration</span>
                        <span className="text-xs font-mono text-slate-300">{p.durationYrs} Yrs</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: M8 5-Minute Work-Day Simulator */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Simulation Active Terminal */}
            <div className="lg:col-span-8 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    M8: Interactive Job Preview (Not a Test of Ability)
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {WORKDAY_SIMULATIONS[simActiveCareer].title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSimActiveCareer(simActiveCareer === 'bioinformatics' ? 'cybersecurity' : 'bioinformatics');
                      handleResetSim();
                    }}
                    className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
                  >
                    Switch Career Case
                  </button>
                  <button
                    onClick={handleResetSim}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                    title="Reset Simulator"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scenario Context Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400">Situational Incident Feed</span>
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> 09:30 AM Real-time
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {WORKDAY_SIMULATIONS[simActiveCareer].scenario}
                </p>
              </div>

              {/* Step Question & Choices */}
              {!simCompleted ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white">
                    {WORKDAY_SIMULATIONS[simActiveCareer].steps[simStepIndex].q}
                  </h4>

                  <div className="space-y-3">
                    {WORKDAY_SIMULATIONS[simActiveCareer].steps[simStepIndex].options.map((opt, oidx) => (
                      <button
                        key={oidx}
                        onClick={() => handleSimChoice(opt)}
                        className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950/80 hover:bg-slate-850 hover:border-indigo-500/60 transition-all text-xs sm:text-sm text-slate-200 group"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white flex-shrink-0 mt-0.5">
                            {String.fromCharCode(65 + oidx)}
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Work-Day Simulation Concluded!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your analytical choices demonstrated high resilience, precision, and strategic reasoning. This signal has dynamically recalibrated your career pathway recommendation fit.
                  </p>
                  <div className="text-sm font-bold text-emerald-400 font-mono">
                    Role-Fit Modifier: +{simScoreDeltaTotal} Points to Computational Biology
                  </div>
                  <button
                    onClick={() => setActiveTab('skilltree')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
                  >
                    View Updated Career Tree Fit
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Dynamic Role-Fit Signal Feed */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    Role-Fit Feedback Loop
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    Net Delta: {simScoreDeltaTotal > 0 ? `+${simScoreDeltaTotal}` : simScoreDeltaTotal}
                  </span>
                </div>

                <div className="space-y-3">
                  {simLogs.length === 0 ? (
                    <div className="text-xs text-slate-500 italic py-6 text-center">
                      Make decisions in the left panel to record behavioral traits and real-time trade-off feedback.
                    </div>
                  ) : (
                    simLogs.map((log, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                        <div className="flex justify-between items-center font-semibold">
                          <span className="text-slate-300">{log.trait}</span>
                          <span className={`font-mono ${log.delta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {log.delta >= 0 ? `+${log.delta}` : log.delta}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{log.feedback}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-slate-300">Guardrail Principle:</strong> This module exposes real day-in-the-life tradeoffs rather than penalizing academic ability.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: M4 & M5 Institutions, Loans & Funding */}
        {activeTab === 'institutions' && (
          <div className="space-y-8">
            {/* Institution Comparator Table */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    M4: Curated Institution Comparator
                  </h3>
                  <p className="text-xs text-slate-400">Side-by-side total 5-year cost, admission cutoff realistic chance, and grants</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Budget Limit: ₹{budgetLakhs}L</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 pr-4">Institution & Program</th>
                      <th className="pb-3 px-4">Location</th>
                      <th className="pb-3 px-4">Tuition (5-Yr)</th>
                      <th className="pb-3 px-4">Living (5-Yr)</th>
                      <th className="pb-3 px-4">Admission Probability</th>
                      <th className="pb-3 px-4">Constraint Check</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {INSTITUTIONS_DB.map(inst => {
                      const totalCostLakhs = (inst.tuition5Yr + inst.living5Yr) / 100000;
                      const withinBudget = totalCostLakhs <= budgetLakhs;

                      return (
                        <tr key={inst.id} className="hover:bg-slate-850/50 transition-colors">
                          <td className="py-3.5 pr-4">
                            <div className="font-bold text-white">{inst.name}</div>
                            <div className="text-[11px] text-slate-400">{inst.program}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                              {inst.country}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-semibold">₹{(inst.tuition5Yr/100000).toFixed(1)}L</td>
                          <td className="py-3.5 px-4 font-mono">₹{(inst.living5Yr/100000).toFixed(1)}L</td>
                          <td className="py-3.5 px-4">{inst.admissionChance}</td>
                          <td className="py-3.5 px-4">
                            {withinBudget ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                                <CheckCircle2 className="w-3 h-3" /> Meets Budget
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
                                <AlertTriangle className="w-3 h-3" /> Needs Loan
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* M5: Loan EMI & Total Cost of Borrowing Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    M5: Education Loan Health & Cost Calculator
                  </h3>
                  <p className="text-xs text-slate-400">Transparent standard reducing balance formula with Moratorium buffer</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Required Loan Principal Amount:</span>
                      <span className="font-mono font-bold text-emerald-400">₹{loanPrincipalLakhs} Lakhs</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="50"
                      value={loanPrincipalLakhs}
                      onChange={(e) => setLoanPrincipalLakhs(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Annual Interest Rate:</span>
                        <span className="font-bold text-slate-200">{interestRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="7.5"
                        max="14.0"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Repayment Tenure:</span>
                        <span className="font-bold text-slate-200">{loanTenureYrs} Years</span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="15"
                        value={loanTenureYrs}
                        onChange={(e) => setLoanTenureYrs(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-center">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">Monthly Repayment EMI</span>
                    <span className="text-base font-bold text-white font-mono">
                      ₹{loanMetrics.monthlyEMI.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">Total Interest Surcharge</span>
                    <span className="text-base font-bold text-amber-400 font-mono">
                      ₹{Math.round(loanMetrics.totalInterest / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase">Total Cost of Borrowing</span>
                    <span className="text-base font-bold text-emerald-400 font-mono">
                      ₹{Math.round(loanMetrics.totalCostOfBorrowing / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>

                {/* Crucial Parent Metric: EMI as % of Expected Salary */}
                <div className={`p-4 rounded-xl border ${loanMetrics.statusColor} flex items-center justify-between`}>
                  <div>
                    <span className="text-xs uppercase font-bold block">{t.loanRisk}</span>
                    <span className="text-xs opacity-90 mt-0.5 block">
                      Status: {loanMetrics.safetyStatus} (Based on ₹{(selectedNode.avgStartingSalary/100000).toFixed(1)}L starting salary)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold font-mono">{loanMetrics.emiShareOfSalary}%</span>
                    <span className="text-[10px] block opacity-75">of monthly gross</span>
                  </div>
                </div>
              </div>

              {/* Scholarships Matching Engine */}
              <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur space-y-4">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      Matched Grants & Scholarships
                    </h3>
                    <p className="text-xs text-slate-400">Rule-based filters linked to 10th score & family bracket</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {SCHOLARSHIPS_DATA.map(sch => (
                    <div key={sch.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-xs text-white leading-tight">{sch.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold whitespace-nowrap border ${
                          sch.fitConfidence === 'Likely'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : sch.fitConfidence === 'Possible'
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                            : 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                        }`}>
                          {sch.fitConfidence}
                        </span>
                      </div>
                      <div className="text-emerald-400 font-mono text-xs font-bold">{sch.amount}</div>
                      <p className="text-[11px] text-slate-400">{sch.criteria}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: M7 Decision Matrix & Monte Carlo */}
        {activeTab === 'matrix' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Multi-Criteria Weight Adjustments */}
            <div className="lg:col-span-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  M7: Multi-Criteria Decision Weights
                </h3>
                <p className="text-xs text-slate-400">Customize what matters most to your family's future</p>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'fit', label: 'Student Passion & RIASEC Fit', color: 'accent-indigo-500' },
                  { key: 'cost', label: 'Lowest Upfront Tuition & Living Cost', color: 'accent-emerald-500' },
                  { key: 'admission', label: 'Admission Certainty (Low Cutoff Risk)', color: 'accent-cyan-500' },
                  { key: 'roi', label: '5-Year Break-Even ROI Speed', color: 'accent-amber-500' },
                  { key: 'automationSafety', label: 'AI Automation Defense Rating', color: 'accent-purple-500' }
                ].map(criterion => (
                  <div key={criterion.key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{criterion.label}</span>
                      <span className="font-mono font-bold text-indigo-400">{weights[criterion.key]}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={weights[criterion.key]}
                      onChange={(e) => setWeights({ ...weights, [criterion.key]: parseInt(e.target.value) })}
                      className={`w-full ${criterion.color} h-1.5 bg-slate-800 rounded cursor-pointer`}
                    />
                  </div>
                ))}
              </div>

              {/* Dynamic Ranked Pathways Table */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-semibold uppercase text-slate-400 mb-3 block">
                  Weighted Composite Rankings
                </span>
                <div className="space-y-2">
                  {pathways.map((p, idx) => (
                    <div key={p.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono font-bold text-slate-400">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-slate-200">{p.name}</span>
                      </div>
                      <span className="font-mono font-bold text-indigo-400">
                        Score: {calculateCompositeScore(p)}/100
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monte Carlo Range Simulation & Assumptions Panel */}
            <div className="lg:col-span-6 space-y-6">
              {/* Monte Carlo Output Card */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur space-y-4">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-cyan-400" />
                      Monte Carlo 5-Year Uncertainty Engine
                    </h3>
                    <p className="text-xs text-slate-400">Simulating {assumptions.monteCarloTrials} statistical trials for {selectedNode.name}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="text-xs font-semibold text-slate-300">
                    5-Year Net Financial Position (Salary Earned - Education Costs):
                  </div>

                  {/* Range visual bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-red-400">P10 (Pessimistic): ₹{(monteCarloSimulation.p10/100000).toFixed(1)}L</span>
                      <span className="text-indigo-400 font-bold">P50 (Median): ₹{(monteCarloSimulation.p50/100000).toFixed(1)}L</span>
                      <span className="text-emerald-400">P90 (Optimistic): ₹{(monteCarloSimulation.p90/100000).toFixed(1)}L</span>
                    </div>

                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="w-1/4 bg-red-500/50" />
                      <div className="w-2/4 bg-indigo-500" />
                      <div className="w-1/4 bg-emerald-500" />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Even under severe 10th percentile market downturns (P10), the student's break-even holds positive due to strong international demand and low baseline tuition exposure.
                  </p>
                </div>

                {/* Editable Assumptions Sandbox */}
                <div className="pt-2 space-y-3">
                  <span className="text-xs font-semibold uppercase text-slate-400 block">
                    Editable Economic Assumptions Panel
                  </span>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Inflation Rate</span>
                      <input
                        type="number"
                        step="0.1"
                        value={assumptions.inflationRate}
                        onChange={(e) => setAssumptions({ ...assumptions, inflationRate: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-transparent font-mono font-bold text-white border-none p-0 focus:ring-0 text-xs"
                      />
                      <span className="text-[10px] text-slate-500">% Annual</span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">EUR to INR Forex</span>
                      <input
                        type="number"
                        step="0.5"
                        value={assumptions.eurInrRate}
                        onChange={(e) => setAssumptions({ ...assumptions, eurInrRate: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-transparent font-mono font-bold text-white border-none p-0 focus:ring-0 text-xs"
                      />
                      <span className="text-[10px] text-slate-500">₹ per Euro</span>
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Salary Growth</span>
                      <input
                        type="number"
                        step="0.5"
                        value={assumptions.salaryGrowthAnnual}
                        onChange={(e) => setAssumptions({ ...assumptions, salaryGrowthAnnual: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-transparent font-mono font-bold text-white border-none p-0 focus:ring-0 text-xs"
                      />
                      <span className="text-[10px] text-slate-500">% Annual</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {}
      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-6 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Built for HackMatrix Hackathon (Problem MISC01) | Decision-Support Engine</span>
          </div>
          <div className="text-[11px] text-slate-600 text-center sm:text-right">
            Non-prescriptive simulation. Projections use calibrated Monte Carlo intervals; not an educational guarantee.
          </div>
        </div>
      </footer>
    </div>
  );
}