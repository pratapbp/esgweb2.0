import { type NextRequest, NextResponse } from "next/server"

const pharmaKnowledge = {
  protocols: {
    "diabetes vaccine": {
      phase2: `# Phase 2 Diabetes Vaccine Trial Protocol

## Primary Objective
Evaluate safety and immunogenicity of T1D-PREV vaccine in pre-diabetic patients

## Study Design
- Randomized, double-blind, placebo-controlled
- Duration: 24 months
- Sample size: 240 participants (2:1 randomization)

## Inclusion Criteria
- Age 18-45 years
- Positive for ≥2 diabetes autoantibodies
- Normal glucose tolerance or stage 1 T1D
- BMI 18-30 kg/m²

## Primary Endpoints
- Safety profile (AEs, SAEs, laboratory abnormalities)
- Immune response (antibody titers, T-cell responses)

## Secondary Endpoints
- Time to T1D onset
- C-peptide preservation
- HbA1c levels

## Dosing Schedule
- Day 0: Initial vaccination
- Day 30: Booster dose
- Follow-up: Monthly for 6 months, then quarterly

## AI-Enhanced Features
- Predictive patient enrollment scoring
- Real-time safety signal detection
- Automated adverse event classification
- Intelligent protocol deviation tracking`,
      attachments: [
        {
          type: "protocol",
          title: "Complete Protocol Document",
          description: "Full 45-page protocol with statistical analysis plan",
        },
        {
          type: "checklist",
          title: "Regulatory Submission Checklist",
          description: "FDA IND requirements and submission timeline",
        },
      ],
    },
    "oncology phase1": {
      content: `# Phase 1 Oncology Trial Protocol - CAR-T Therapy

## Primary Objective
Determine maximum tolerated dose (MTD) and dose-limiting toxicities (DLTs) of CAR-T cell therapy in relapsed/refractory B-cell lymphoma

## Study Design
- Open-label, dose-escalation study
- 3+3 design with expansion cohort
- Duration: 36 months
- Estimated enrollment: 30-45 patients

## Inclusion Criteria
- Age ≥18 years
- Histologically confirmed B-cell lymphoma
- Relapsed/refractory after ≥2 prior therapies
- ECOG performance status 0-1
- Adequate organ function

## Dose Escalation Schema
- Dose Level 1: 1×10⁶ CAR-T cells/kg
- Dose Level 2: 3×10⁶ CAR-T cells/kg
- Dose Level 3: 1×10⁷ CAR-T cells/kg

## Safety Monitoring
- Real-time cytokine release syndrome (CRS) monitoring
- Neurological toxicity assessment
- Tumor lysis syndrome prevention
- AI-powered adverse event prediction

## Biomarker Analysis
- CAR-T cell persistence and expansion
- Cytokine profiling
- Tumor microenvironment analysis
- Resistance mechanism identification`,
      attachments: [
        {
          type: "protocol",
          title: "CAR-T Protocol Template",
          description: "Complete protocol with safety run-in design",
        },
        {
          type: "safety",
          title: "CRS Management Guidelines",
          description: "Comprehensive cytokine release syndrome protocols",
        },
      ],
    },
  },

  labeling: {
    india_eu: `# Pharmaceutical Labeling Requirements: India & EU

## India (CDSCO) Requirements

### Primary Display Panel
- Product name in English and Hindi
- Strength and dosage form
- Net quantity
- Batch number and manufacturing date
- Expiry date (month/year format)
- "Rx" symbol for prescription drugs

### Secondary Panel
- Manufacturer details with license number
- Storage conditions
- Composition (active and inactive ingredients)
- Therapeutic indication
- Contraindications and warnings
- MRP including all taxes

### Special Requirements
- Red border for Schedule H drugs
- Black triangle for new drugs under monitoring
- Braille marking for visually impaired (if applicable)

## EU Requirements

### Outer Packaging
- Name of medicinal product
- Common name of active substance
- Pharmaceutical form and contents
- Marketing authorization holder
- Marketing authorization number
- Batch number and expiry date

### Immediate Packaging
- Name and strength
- Pharmaceutical form
- Route of administration
- Expiry date and batch number
- Special storage conditions

### Patient Information Leaflet
- Must be in official language(s) of member state
- QR code linking to electronic leaflet
- Unique identifier for falsified medicines directive

## AI Compliance Checker
✅ All mandatory elements included
✅ Language requirements met
✅ Font size compliance verified
✅ Color contrast standards met
⚠️ Review required for specific therapeutic area warnings`,
    attachments: [
      {
        type: "template",
        title: "Multi-language Label Templates",
        description: "Ready-to-use templates for India and EU markets",
      },
      {
        type: "compliance",
        title: "Regulatory Change Tracker",
        description: "Latest updates to labeling requirements",
      },
    ],

    us_canada: `# US & Canada Labeling Requirements

## FDA Requirements (US)

### Principal Display Panel
- Established name and proprietary name
- Strength per dosage unit
- Dosage form
- Net quantity of contents
- NDC number

### Side Panel Requirements
- Manufacturer/distributor information
- Lot number and expiration date
- Storage and handling instructions
- Rx only statement
- Barcode (linear and 2D)

### Package Insert Requirements
- Full prescribing information
- Boxed warnings (if applicable)
- Indications and usage
- Dosage and administration
- Contraindications and warnings

## Health Canada Requirements

### Bilingual Labeling
- English and French text required
- Equal prominence for both languages
- Specific font size requirements

### Drug Identification Number (DIN)
- 8-digit number on all packages
- Must be clearly visible
- Links to product monograph

### Special Populations
- Pregnancy and lactation warnings
- Pediatric and geriatric considerations
- Renal/hepatic impairment dosing

## AI Validation Features
✅ Bilingual compliance verification
✅ Font size and contrast analysis
✅ Regulatory change monitoring
✅ Automated artwork review`,
    attachments: [
      {
        type: "template",
        title: "FDA/HC Label Templates",
        description: "Compliant templates for North American markets",
      },
      {
        type: "validation",
        title: "AI Artwork Reviewer",
        description: "Automated compliance checking tool",
      },
    ],
  },

  coldChain: `# Cold Chain Temperature Breach Analysis - Last 30 Days

## Summary Dashboard
- Total Shipments Monitored: 1,247
- Temperature Breaches: 23 incidents
- Compliance Rate: 98.2%
- Product Loss Value: $47,300

## Breach Incidents by Severity

### Critical Breaches (>8°C for >2 hours)
**Incident #CC-2024-001**
- Date: March 15, 2024
- Route: Mumbai → Delhi
- Duration: 3.5 hours at 12°C
- Cause: Refrigeration unit failure
- Products Affected: 450 vials COVID vaccine
- Action: Product quarantined, investigation initiated
- Status: Insurance claim filed

**Incident #CC-2024-007**
- Date: March 22, 2024
- Route: Frankfurt → London
- Duration: 2.2 hours at 9°C
- Cause: Airport delay during transfer
- Products Affected: 200 units insulin
- Action: Stability testing ordered
- Status: Pending release decision

### Minor Breaches (2-8°C excursion <30 min)
- 21 incidents of brief temperature fluctuations
- Average duration: 12 minutes
- Primary cause: Door opening during loading
- All products released after assessment

## Predictive Analytics Insights
🔮 **AI Predictions for Next 30 Days:**
- High risk routes: Mumbai-Chennai (monsoon season)
- Recommended actions: Pre-position backup units
- Optimal shipping windows: Early morning departures

## Blockchain Verification
- 100% of incidents logged on immutable ledger
- Real-time regulatory reporting enabled
- Audit trail complete for all shipments

## Corrective Actions Implemented
✅ Enhanced driver training on cold chain protocols
✅ Backup refrigeration units deployed on high-risk routes
✅ IoT sensor calibration completed
✅ Predictive maintenance schedule updated`,

  manufacturing: `# SAP Manufacturing Intelligence Dashboard

## Production KPIs (Real-time)
- Overall Equipment Effectiveness: 87.3%
- Quality Rate: 99.6%
- On-time Delivery: 94.2%
- Energy Efficiency: 92.1%

## AI-Powered Insights
🤖 **Predictive Maintenance Alerts:**
- Tablet Press #3: Bearing replacement due in 72 hours
- Coating Pan #1: Calibration drift detected
- Packaging Line B: Sensor cleaning required

## Quality Control Automation
- Computer vision defect detection: 99.8% accuracy
- Real-time batch release testing
- Automated deviation investigations
- Continuous process verification

## Regulatory Compliance Status
✅ FDA PAT guidelines compliance
✅ EU GMP Annex 15 qualification
✅ ICH Q8/Q9/Q10 implementation
✅ Data integrity (ALCOA+) verified

## Batch Analytics
**Current Batch: LOT-2024-0847**
- Product: Metformin 500mg tablets
- Batch size: 250,000 units
- Progress: 78% complete
- Quality score: 99.2%
- Estimated completion: 14:30 today

## Supply Chain Integration
- Raw material inventory: 94% optimal
- Packaging material status: Green
- Distribution readiness: 96%
- Regulatory submission status: Approved`,

  regulatory: `# Regulatory Intelligence Dashboard

## Global Submission Status
- Active submissions: 47
- Pending approvals: 23
- Recent approvals: 12 (last 30 days)
- Regulatory meetings scheduled: 8

## AI-Powered Regulatory Insights
🧠 **Approval Probability Predictions:**
- Product A (EU): 87% approval likelihood
- Product B (FDA): 92% approval likelihood
- Product C (Health Canada): 76% approval likelihood

## Regulatory Change Monitoring
**Recent Updates (Last 7 Days):**
- FDA: New guidance on AI/ML in drug development
- EMA: Updated pharmacovigilance requirements
- PMDA: Revised clinical trial guidelines
- Health Canada: New labeling requirements

## Compliance Tracking
✅ All submissions meet current guidelines
✅ Quality management system updated
✅ Pharmacovigilance system operational
⚠️ 3 minor observations pending response

## Document Management
- Total regulatory documents: 12,847
- AI-indexed and searchable: 100%
- Version control compliance: 100%
- Audit trail completeness: 100%`,

  clinicalTrials: `# Clinical Trials Management Dashboard

## Active Trials Overview
- Phase I trials: 8 active
- Phase II trials: 12 active  
- Phase III trials: 5 active
- Post-marketing studies: 15 active

## Enrollment Analytics
**Current Month Performance:**
- Target enrollment: 450 patients
- Actual enrollment: 387 patients (86%)
- Screen failure rate: 23%
- Protocol deviations: 12 minor, 2 major

## AI-Enhanced Patient Matching
🎯 **Recruitment Optimization:**
- Predictive enrollment modeling: 94% accuracy
- Patient-trial matching algorithm: Active
- Site performance scoring: Updated daily
- Retention risk assessment: Ongoing

## Safety Monitoring
**Real-time Safety Signals:**
- Serious adverse events: 3 (all expected)
- Data safety monitoring board: Next review March 30
- Benefit-risk assessment: Favorable
- Regulatory notifications: All current

## Data Quality Metrics
- Source data verification: 98.5% complete
- Query resolution rate: 94%
- Database lock timeline: On track
- Statistical analysis plan: Finalized

## Regulatory Milestones
✅ IND submissions: All approved
✅ Ethics committee approvals: Complete
✅ Site initiations: 89% complete
📅 Interim analysis: Scheduled Q2 2024`,

  pharmacovigilance: `# Pharmacovigilance Intelligence System

## Safety Signal Detection
- Cases processed (last 30 days): 2,847
- New safety signals identified: 3
- Signal validation status: 2 confirmed, 1 under review
- Regulatory notifications sent: 15

## AI-Powered Case Processing
🤖 **Automated Triage Results:**
- Serious cases auto-flagged: 156
- Expedited reporting triggered: 23
- Duplicate case detection: 99.2% accuracy
- Medical coding accuracy: 97.8%

## Global Adverse Event Reporting
**Regulatory Submissions (YTD):**
- FDA FAERS: 1,247 cases
- EudraVigilance: 892 cases
- WHO VigiBase: 2,156 cases
- Local authorities: 3,401 cases

## Risk Management Activities
- Risk Evaluation and Mitigation Strategies: 12 active
- Periodic Safety Update Reports: 8 due this quarter
- Post-authorization safety studies: 5 ongoing
- Healthcare provider communications: 23 sent

## Literature Monitoring
- Scientific articles screened: 15,847
- Relevant safety information: 234 articles
- Case reports identified: 67
- Regulatory impact assessment: Ongoing

## Signal Management Workflow
✅ Signal detection algorithms: Active
✅ Medical review process: Streamlined
✅ Regulatory consultation: Scheduled
✅ Risk communication: Prepared`,
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    let response = ""
    let attachments: any[] = []

    // Analyze the message and provide appropriate response
    if (message.toLowerCase().includes("diabetes vaccine") && message.toLowerCase().includes("protocol")) {
      response = pharmaKnowledge.protocols["diabetes vaccine"].phase2
      attachments = pharmaKnowledge.protocols["diabetes vaccine"].attachments
    } else if (message.toLowerCase().includes("oncology") && message.toLowerCase().includes("phase 1")) {
      response = pharmaKnowledge.protocols["oncology phase1"].content
      attachments = pharmaKnowledge.protocols["oncology phase1"].attachments
    } else if (
      message.toLowerCase().includes("labeling") &&
      (message.toLowerCase().includes("india") || message.toLowerCase().includes("eu"))
    ) {
      response = pharmaKnowledge.labeling.india_eu
      attachments = pharmaKnowledge.labeling.attachments
    } else if (
      message.toLowerCase().includes("labeling") &&
      (message.toLowerCase().includes("us") || message.toLowerCase().includes("canada"))
    ) {
      response = pharmaKnowledge.labeling.us_canada
      attachments = pharmaKnowledge.labeling.attachments
    } else if (message.toLowerCase().includes("temperature") && message.toLowerCase().includes("breach")) {
      response = pharmaKnowledge.coldChain
    } else if (message.toLowerCase().includes("manufacturing") || message.toLowerCase().includes("production")) {
      response = pharmaKnowledge.manufacturing
    } else if (message.toLowerCase().includes("regulatory") && message.toLowerCase().includes("submission")) {
      response = pharmaKnowledge.regulatory
    } else if (message.toLowerCase().includes("clinical trial") || message.toLowerCase().includes("enrollment")) {
      response = pharmaKnowledge.clinicalTrials
    } else if (message.toLowerCase().includes("pharmacovigilance") || message.toLowerCase().includes("safety")) {
      response = pharmaKnowledge.pharmacovigilance
    } else {
      // General pharma AI response
      response = `I'm your Pharma AI Copilot, specialized in pharmaceutical development and manufacturing. I can help you with:

🧬 **Drug Discovery & Development**
- AI-powered molecule property prediction
- Clinical trial protocol generation (Phase I-III)
- Patient recruitment optimization
- Safety signal detection and analysis

📋 **Regulatory Affairs**
- Multi-jurisdiction labeling requirements (US, EU, India, Canada)
- Compliance documentation automation
- Regulatory change tracking and impact analysis
- Submission timeline optimization and approval predictions

🏭 **Manufacturing Excellence**
- SAP MII integration and real-time monitoring
- Predictive maintenance scheduling
- Quality control automation with computer vision
- Batch release acceleration and compliance

🚛 **Supply Chain & Distribution**
- Cold chain monitoring and breach analysis
- Blockchain-based traceability and audit trails
- Predictive risk assessment for logistics
- Global distribution optimization

🔍 **Pharmacovigilance & Safety**
- Automated adverse event processing
- Real-time safety signal detection
- Global regulatory reporting automation
- Risk management strategy optimization

Please ask me about specific areas like:
- "Draft a protocol for [indication] [phase]"
- "Show labeling requirements for [countries]"
- "Analyze temperature breaches in [timeframe]"
- "Optimize manufacturing for [product type]"
- "Generate safety report for [product]"
- "Track regulatory submissions for [region]"`
    }

    return NextResponse.json({
      success: true,
      response,
      attachments,
    })
  } catch (error) {
    console.error("Pharma copilot error:", error)
    return NextResponse.json({ success: false, error: "Failed to process pharma query" }, { status: 500 })
  }
}
