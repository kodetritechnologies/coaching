import _jeeImg from "@/assets/course-jee.jpg"; const jeeImg = _jeeImg.src;
import _neetImg from "@/assets/course-neet.jpg"; const neetImg = _neetImg.src;
import _foundationImg from "@/assets/course-foundation.jpg"; const foundationImg = _foundationImg.src;
import _cuetImg from "@/assets/course-cuet.jpg"; const cuetImg = _cuetImg.src;
import _ndaImg from "@/assets/course-nda.jpg"; const ndaImg = _ndaImg.src;
import _sscImg from "@/assets/course-ssc.jpg"; const sscImg = _sscImg.src;
import _bankingImg from "@/assets/course-banking.jpg"; const bankingImg = _bankingImg.src;

import _f1 from "@/assets/faculty-1.jpg"; const f1 = _f1.src;
import _f2 from "@/assets/faculty-2.jpg"; const f2 = _f2.src;
import _f3 from "@/assets/faculty-3.jpg"; const f3 = _f3.src;
import _f4 from "@/assets/faculty-4.jpg"; const f4 = _f4.src;

import _t1 from "@/assets/topper-1.jpg"; const t1 = _t1.src;
import _t2 from "@/assets/topper-2.jpg"; const t2 = _t2.src;
import _t3 from "@/assets/topper-3.jpg"; const t3 = _t3.src;
import _t4 from "@/assets/topper-4.jpg"; const t4 = _t4.src;

import _g1 from "@/assets/gallery-1.jpg"; const g1 = _g1.src;
import _g2 from "@/assets/gallery-2.jpg"; const g2 = _g2.src;
import _g3 from "@/assets/gallery-3.jpg"; const g3 = _g3.src;
import _g4 from "@/assets/gallery-4.jpg"; const g4 = _g4.src;
import _g5 from "@/assets/gallery-5.jpg"; const g5 = _g5.src;
import _heroImg from "@/assets/hero-classroom.jpg"; const heroImg = _heroImg.src;

export interface Course {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tag: string;
  category: "engineering" | "medical" | "foundation" | "university" | "defence" | "government" | "banking";
  targetExam: string;
  duration: string;
  mode: string;
  startDate: string;
  feeOneTime: string;
  feeInstallments: string;
  seatsTotal: number;
  seatsFilled: number;
  rating: number;
  studentsEnrolled: number;
  img: string;
  overview: string;
  highlights: string[];
  eligibility: string[];
  variants: {
    name: string;
    targetClass: string;
    duration: string;
    timing: string;
    fee: string;
  }[];
  curriculum: {
    term: string;
    title: string;
    hours: string;
    topics: string[];
  }[];
  faculty: string[];
  faqs: { q: string; a: string }[];
}

export const coursesData: Course[] = [
  {
    id: "jee",
    slug: "jee",
    name: "IIT-JEE (Main + Advanced)",
    subtitle: "Pinnacle Engineering Preparation Program for Top IITs & NITs",
    tag: "Engineering",
    category: "engineering",
    targetExam: "JEE Main & JEE Advanced 2027/2028",
    duration: "2 Years / 1 Year / Dropper",
    mode: "Offline Classroom + Digital App",
    startDate: "14 April 2026",
    feeOneTime: "₹1,45,000",
    feeInstallments: "₹1,58,000 (3 Installments)",
    seatsTotal: 40,
    seatsFilled: 34,
    rating: 4.9,
    studentsEnrolled: 12400,
    img: jeeImg,
    overview:
      "Our flagship IIT-JEE program is architected by Kota veteran educators and Ex-IITian faculty. Designed to build deep conceptual clarity, rigorous mathematical problem-solving velocity, and multi-concept application required for JEE Advanced Top 500 ranks.",
    highlights: [
      "850+ Hours of high-yield classroom teaching by Ex-IITian HODs",
      "Daily Practice Problems (DPP) with 10-question graded challenge sets",
      "Bi-weekly Computer Based Tests (CBT) strictly on the latest NTA pattern",
      "Dedicated 1-on-1 Doubt Clearing Counters open 8:00 AM to 8:00 PM",
      "Exhaustive Kota-standard printed study modules + formula handbooks",
      "AI-driven performance analytics tracking question speed vs accuracy",
    ],
    eligibility: [
      "Class 10th passed / appearing (for 2-Year Pinnacle Batch)",
      "Class 11th passed (for 1-Year Target Batch)",
      "Class 12th passed / dropper (for Super-30 Repeater Batch)",
      "Minimum 70% in Class 10 Science & Mathematics or qualifying score in VSAT",
    ],
    variants: [
      {
        name: "Pinnacle 2-Year Integrated",
        targetClass: "Class 11 Moving",
        duration: "24 Months",
        timing: "8:00 AM – 1:30 PM (Morning) or 2:30 PM – 8:00 PM (Evening)",
        fee: "₹1,45,000 / year",
      },
      {
        name: "Target 1-Year Intensive",
        targetClass: "Class 12 Moving",
        duration: "12 Months",
        timing: "8:00 AM – 2:00 PM (Mon to Sat)",
        fee: "₹1,55,000 / year",
      },
      {
        name: "Super-30 Repeater / Dropper",
        targetClass: "12th Pass",
        duration: "10 Months",
        timing: "7:30 AM – 2:30 PM (Mon to Sat + Sunday Tests)",
        fee: "₹1,38,000",
      },
    ],
    curriculum: [
      {
        term: "Term 1 (Months 1–4)",
        title: "Fundamentals & Mechanics Mastery",
        hours: "240 Hours",
        topics: [
          "Physics: Kinematics, Newton's Laws, Work-Energy-Power, Rotational Dynamics",
          "Chemistry: Atomic Structure, Periodic Table, Chemical Bonding, Stoichiometry",
          "Maths: Sets & Relations, Quadratic Equations, Trigonometric Identities, Sequences & Series",
        ],
      },
      {
        term: "Term 2 (Months 5–8)",
        title: "Advanced Core Topics & Electrodynamics",
        hours: "280 Hours",
        topics: [
          "Physics: Fluid Mechanics, Thermodynamics, Electrostatics, Current Electricity & Magnetism",
          "Chemistry: Chemical & Ionic Equilibrium, Thermodynamics, Organic Reaction Mechanisms (GOC)",
          "Maths: Permutations & Combinations, Binomial Theorem, Coordinate Geometry & Conic Sections",
        ],
      },
      {
        term: "Term 3 (Months 9–12)",
        title: "Calculus, Modern Physics & JEE Advanced Problems",
        hours: "260 Hours",
        topics: [
          "Physics: Optics, Wave Motion, Modern Physics & Semiconductor Devices",
          "Chemistry: Coordination Compounds, Hydrocarbons, Carbonyl Compounds, Electrochemistry",
          "Maths: Differential & Integral Calculus, Vectors & 3D Geometry, Probability",
        ],
      },
      {
        term: "Term 4 (Final 3 Months)",
        title: "Rank Booster Test Series & NTA Mock Simulations",
        hours: "180 Hours",
        topics: [
          "Full Syllabus All India Test Series (40 Full CBTs)",
          "Last 15 Years JEE Advanced Chapter-wise Solved PYQ Workshops",
          "Doubt clinic sprints & high-pressure time management conditioning",
        ],
      },
    ],
    faculty: ["Dr. Rajeev Nair (M.Tech IIT Kanpur)", "Mr. Karan Malhotra (B.Tech IIT Bombay)", "Mrs. Anuradha Deshpande (M.Sc Gold Medalist)"],
    faqs: [
      {
        q: "What is the batch size for JEE classroom batches?",
        a: "We maintain a strict limit of 35-40 students per batch to ensure personalized faculty attention and individual doubt resolution.",
      },
      {
        q: "Are printed study materials included in the fee?",
        a: "Yes, 18 comprehensive Kota-standard printed theory books, 120+ DPP booklets, formula handbooks, and last 15-year solved papers are included.",
      },
      {
        q: "Can I avail scholarship for the JEE program?",
        a: "Yes, you can appear for our Vidyasetu Scholarship & Aptitude Test (VSAT) and earn up to 100% waiver on tuition fees.",
      },
    ],
  },
  {
    id: "neet",
    slug: "neet",
    name: "NEET UG Medical",
    subtitle: "Premier Medical Coaching for AIIMS, JIPMER & Top State Government Medical Colleges",
    tag: "Medical",
    category: "medical",
    targetExam: "NEET UG 2027/2028",
    duration: "2 Years / 1 Year / Repeater",
    mode: "Offline Classroom + NCERT Precision Lab",
    startDate: "18 April 2026",
    feeOneTime: "₹1,38,000",
    feeInstallments: "₹1,48,000 (3 Installments)",
    seatsTotal: 40,
    seatsFilled: 37,
    rating: 4.95,
    studentsEnrolled: 14200,
    img: neetImg,
    overview:
      "Our NEET UG medical preparation program emphasizes 100% line-by-line NCERT mastery combined with rigorous numerical accuracy in Physics and Physical Chemistry. Taught by doctors and seasoned medical entrance educators with 20+ years of producing Top 100 AIRs.",
    highlights: [
      "Line-by-line NCERT extraction sheets & active recall mindmaps",
      "90-Question weekly speed drills to target 360/360 in Biology",
      "Special Physics Numerical Clinics to eliminate medical aspirants' physics anxiety",
      "Full syllabus OMR-based All India Mock Tests matching NTA difficulty",
      "1-on-1 mentorship by AIIMS doctors and top NEET rank holders",
      "Comprehensive Botany & Zoology visual laboratories and 3D anatomical charts",
    ],
    eligibility: [
      "Class 10th passed / appearing (for 2-Year Sankalp Batch)",
      "Class 11th passed with PCB (for 1-Year Lakshya Batch)",
      "Class 12th passed / repeater (for Achiever Dropper Batch)",
      "Minimum 65% in Class 10 Science & Mathematics or qualifying score in VSAT",
    ],
    variants: [
      {
        name: "Sankalp 2-Year Foundation + NEET",
        targetClass: "Class 11 Moving",
        duration: "24 Months",
        timing: "8:00 AM – 1:30 PM (Morning) or 2:00 PM – 7:30 PM (Evening)",
        fee: "₹1,38,000 / year",
      },
      {
        name: "Lakshya 1-Year Target",
        targetClass: "Class 12 Moving",
        duration: "12 Months",
        timing: "8:00 AM – 2:00 PM (Mon to Sat)",
        fee: "₹1,44,000 / year",
      },
      {
        name: "Achiever Repeater Super-Batch",
        targetClass: "12th Pass",
        duration: "10 Months",
        timing: "7:30 AM – 2:30 PM (Mon to Sat + Sunday OMR)",
        fee: "₹1,30,000",
      },
    ],
    curriculum: [
      {
        term: "Term 1 (Months 1–4)",
        title: "Cell Biology, Plant Diversity & Basic Mechanics",
        hours: "260 Hours",
        topics: [
          "Biology: Cell Biology, Biomolecules, Plant Kingdom, Animal Diversity",
          "Physics: Physical World, Units & Measurements, Vectors, Kinematics, Laws of Motion",
          "Chemistry: Mole Concept, Structure of Atom, Periodic Classification, Chemical Bonding",
        ],
      },
      {
        term: "Term 2 (Months 5–8)",
        title: "Human Physiology, Genetics & Organic Chemistry",
        hours: "280 Hours",
        topics: [
          "Biology: Human Physiology, Genetics & Evolution, Molecular Basis of Inheritance",
          "Physics: Gravitation, Thermodynamics, SHM, Waves, Ray & Wave Optics",
          "Chemistry: States of Matter, Thermodynamics, Equilibrium, Basic Principles of Organic Chemistry",
        ],
      },
      {
        term: "Term 3 (Months 9–12)",
        title: "Biotechnology, Ecology, Modern Physics & Inorganic NCERT",
        hours: "250 Hours",
        topics: [
          "Biology: Biotechnology Principles & Applications, Ecology & Environment, Human Health",
          "Physics: Electrostatics, Current Electricity, Magnetism, EMI & AC, Modern Physics",
          "Chemistry: Coordination Compounds, p-block, d & f block, Carbonyl Compounds & Biomolecules",
        ],
      },
      {
        term: "Term 4 (Final 3 Months)",
        title: "720/720 Grand Test Series & Intensive OMR Drills",
        hours: "190 Hours",
        topics: [
          "45 Full Syllabus 200-Minute NTA OMR Mock Tests with negative mark analysis",
          "NCERT Word-to-Word Fill-in-the-Blanks & Assertion-Reason specialized drills",
          "Special error notebook review sessions with personal faculty mentors",
        ],
      },
    ],
    faculty: ["Dr. Meenakshi Rao (MBBS, MD)", "Mrs. Anuradha Deshpande (M.Sc Chemistry)", "Dr. Rajeev Nair (M.Tech IIT Kanpur)"],
    faqs: [
      {
        q: "How does Vidyasetu help NEET students with Physics?",
        a: "We conduct dedicated daily Physics Numerical Workshops and break down complex concepts into step-by-step mathematical patterns tailored specifically for medical aspirants.",
      },
      {
        q: "How many NEET mock tests are conducted during the course?",
        a: "Students attempt over 50 full-length OMR tests and 140+ chapter/unit tests with nationwide comparative percentile rankings.",
      },
    ],
  },
  {
    id: "foundation",
    slug: "foundation",
    name: "Foundation & Olympiads (Class 6–10)",
    subtitle: "Early STEM Advantage for NTSE, IJSO, PRMO & School Board Dominance",
    tag: "School",
    category: "foundation",
    targetExam: "School Boards, Olympiads (SOF, Silverzone), NTSE, PRMO",
    duration: "1 Year / Multi-Year",
    mode: "Offline Classroom + Smart Labs",
    startDate: "05 April 2026",
    feeOneTime: "₹48,000",
    feeInstallments: "₹54,000 (2 Installments)",
    seatsTotal: 35,
    seatsFilled: 29,
    rating: 4.9,
    studentsEnrolled: 8900,
    img: foundationImg,
    overview:
      "A transformative early foundation program designed to cultivate scientific curiosity, logical aptitude, and mathematical intuition from middle school. Prepares students to naturally transition into JEE/NEET while scoring 95%+ in school board exams.",
    highlights: [
      "Experiential science learning through practical laboratory demonstrations",
      "Mental Ability & Logical Reasoning (MAT) training for competitive advantage",
      "Integrated school syllabus coverage (CBSE / ICSE / State Boards)",
      "Weekly Olympiad challenge sheets (PRMO, NSEJS, NSO, IMO)",
      "Regular communication and quarterly Parent-Teacher review conferences",
      "Small batches of 30 students with friendly, approachable educators",
    ],
    eligibility: ["Students studying in Class 6, 7, 8, 9, or 10", "Pass in previous class final exams"],
    variants: [
      {
        name: "Class 9-10 Pre-Foundation",
        targetClass: "Class 9 & 10",
        duration: "12 Months",
        timing: "4:00 PM – 7:30 PM (4 days/week)",
        fee: "₹52,000 / year",
      },
      {
        name: "Class 6-8 Junior STEM",
        targetClass: "Class 6, 7 & 8",
        duration: "12 Months",
        timing: "4:30 PM – 7:00 PM (3 days/week)",
        fee: "₹44,000 / year",
      },
    ],
    curriculum: [
      {
        term: "Term 1",
        title: "Science Fundamentals & Algebra Mastery",
        hours: "140 Hours",
        topics: ["Physics: Motion, Force, Gravitation", "Chemistry: Matter in Our Surroundings, Atoms & Molecules", "Maths: Number Systems, Polynomials, Linear Equations"],
      },
      {
        term: "Term 2",
        title: "Advanced Biology, Geometry & Mental Ability",
        hours: "150 Hours",
        topics: ["Biology: Fundamental Unit of Life, Tissues, Diversity", "Maths: Triangles, Circles, Mensuration", "Mental Ability: Number Series, Coding-Decoding, Venn Diagrams"],
      },
    ],
    faculty: ["Mr. Karan Malhotra (IIT Bombay)", "Mrs. Anuradha Deshpande (M.Sc)", "Mr. S. K. Verma (M.Sc B.Ed)"],
    faqs: [
      {
        q: "Will this coaching interfere with my child's regular school studies?",
        a: "No, our classes are scheduled in the evening after school hours and our syllabus directly reinforces and elevates school exam performance.",
      },
    ],
  },
  {
    id: "cuet",
    slug: "cuet",
    name: "CUET UG (Common University Entrance Test)",
    subtitle: "Guaranteed Gateway to Delhi University, BHU, JNU & Top Central Universities",
    tag: "University",
    category: "university",
    targetExam: "CUET UG 2027",
    duration: "10 Months / 4 Months Crash",
    mode: "Offline + Online Live Interactive",
    startDate: "25 April 2026",
    feeOneTime: "₹36,000",
    feeInstallments: "₹40,000 (2 Installments)",
    seatsTotal: 45,
    seatsFilled: 38,
    rating: 4.85,
    studentsEnrolled: 6200,
    img: cuetImg,
    overview:
      "A comprehensive preparation module for Section I (Languages), Section II (Domain Subjects — Science/Commerce/Humanities), and Section III (General Test) engineered to achieve 100 percentile scores in CUET UG for dream university admissions.",
    highlights: [
      "Domain-specific subject deep dives mapped 100% to Class 12 NCERT",
      "Section III General Test mastery: Quantitative Aptitude, Reasoning & Current Affairs",
      "English & Hindi language comprehension velocity drills",
      "35 NTA Computer-Based Mock Tests with accurate percentile predictor",
      "Personalized university & college preference list counselling",
    ],
    eligibility: ["Class 12th appearing or passed students from any stream (Science/Commerce/Arts)"],
    variants: [
      {
        name: "CUET 1-Year Comprehensive",
        targetClass: "Class 12 Studying",
        duration: "10 Months",
        timing: "3:30 PM – 7:30 PM (Mon to Fri)",
        fee: "₹36,000",
      },
      {
        name: "CUET Post-Board Fast Track",
        targetClass: "Class 12 Board Appeared",
        duration: "75 Days (6 hrs/day)",
        timing: "9:00 AM – 3:30 PM (Daily)",
        fee: "₹22,500",
      },
    ],
    curriculum: [
      {
        term: "Module 1",
        title: "Language & General Test Mastery",
        hours: "110 Hours",
        topics: ["Reading Comprehension, Vocabulary, Sentence Rearrangement", "Quantitative Aptitude, Logical Reasoning, Static GK & Daily Current Affairs"],
      },
      {
        term: "Module 2",
        title: "Class 12 Domain Core Subjects",
        hours: "140 Hours",
        topics: ["Physics, Chemistry, Mathematics, Biology / Accountancy, Business Studies, Economics / History, Political Science, Geography"],
      },
    ],
    faculty: ["Dr. Rajeev Nair", "Mrs. Anuradha Deshpande", "Mr. Prateek Shukla (MA Gold Medalist)"],
    faqs: [
      {
        q: "Does Vidyasetu provide counselling for Delhi University college choice filling?",
        a: "Yes, our expert counsellors assist every student with university preference mapping and cut-off analysis after the exam.",
      },
    ],
  },
  {
    id: "nda",
    slug: "nda",
    name: "NDA & Defence Services",
    subtitle: "Complete Written Exam + SSB Interview & Physical Conditioning Program",
    tag: "Defence",
    category: "defence",
    targetExam: "UPSC NDA & NA Exam I & II 2026/2027",
    duration: "11 Months / 6 Months",
    mode: "Offline Classroom + SSB Ground Training",
    startDate: "05 May 2026",
    feeOneTime: "₹52,000",
    feeInstallments: "₹58,000 (2 Installments)",
    seatsTotal: 35,
    seatsFilled: 30,
    rating: 4.9,
    studentsEnrolled: 4800,
    img: ndaImg,
    overview:
      "Taught by Ex-Defence Officers and subject specialists, our NDA training program covers Mathematics, General Ability Test (English, Physics, Chemistry, History, Geography, Current Affairs), combined with 5-Day SSB Interview preparation, GTO tasks, and personality grooming.",
    highlights: [
      "UPSC NDA Mathematics shortcut techniques and 120-question speed drills",
      "Ex-SSB Board Officers guiding psychological tests (TAT, WAT, SRT, SDT)",
      "Daily physical fitness regimen and outdoor obstacle training ground",
      "Spoken English and Group Discussion (GD) confidence workshops",
      "Current Affairs weekly defense capsules and international relations briefings",
    ],
    eligibility: ["Unmarried male & female candidates", "Class 11th/12th studying or passed", "Age between 16.5 to 19.5 years"],
    variants: [
      {
        name: "NDA 1-Year Officer Foundation",
        targetClass: "Class 11 / 12 / 12th Pass",
        duration: "11 Months",
        timing: "8:00 AM – 2:00 PM (Mon to Sat)",
        fee: "₹52,000",
      },
      {
        name: "NDA Crash Course + SSB",
        targetClass: "Immediate Target Exam",
        duration: "4 Months",
        timing: "8:00 AM – 3:00 PM (Daily)",
        fee: "₹28,000",
      },
    ],
    curriculum: [
      {
        term: "Phase 1: Written Exam",
        title: "Mathematics & General Ability Test (GAT)",
        hours: "260 Hours",
        topics: ["NDA Mathematics (Calculus, Trigonometry, Matrices, Probability)", "English (Grammar, Comprehension, Vocabulary)", "General Science & Social Studies (Physics, Chemistry, History, Polity, Geography)"],
      },
      {
        term: "Phase 2: SSB Interview",
        title: "Psychological Testing, GTO Tasks & Personal Interview",
        hours: "80 Hours",
        topics: ["Screening (OIR & PPDT)", "Psychology Tests (TAT, WAT, SRT)", "GTO Tasks (PGD, HGT, Command Task)", "Personal Interview mock drills with retired Colonels/Brigadiers"],
      },
    ],
    faculty: ["Col. R. S. Rathore (Retd. SSB Board Member)", "Mr. Karan Malhotra (IIT Bombay)", "Mr. Vikramaditya Singh (MA Defense Studies)"],
    faqs: [
      {
        q: "Are female aspirants eligible for the NDA program?",
        a: "Yes, women are fully eligible for the NDA exam and our academy provides dedicated facilities, training, and guidance for female candidates.",
      },
    ],
  },
  {
    id: "ssc",
    slug: "ssc",
    name: "SSC & Railways (CGL, CHSL, RRB NTPC)",
    subtitle: "Government Job Selection Coaching with Speed Math & Reasoning Velocity",
    tag: "Government",
    category: "government",
    targetExam: "SSC CGL, SSC CHSL, CPO, RRB NTPC 2026/2027",
    duration: "8 Months",
    mode: "Offline + Online Hybrid",
    startDate: "10 May 2026",
    feeOneTime: "₹29,000",
    feeInstallments: "₹33,000 (2 Installments)",
    seatsTotal: 50,
    seatsFilled: 43,
    rating: 4.8,
    studentsEnrolled: 9800,
    img: sscImg,
    overview:
      "A fast-paced, result-oriented coaching course focusing on mental arithmetic shortcuts, grammar precision, logical reasoning, and static GK to ensure high scores in Tier-1 and Tier-2 government competitive exams.",
    highlights: [
      "Vedic Math and calculation speed hacks to solve questions in 15 seconds",
      "Exhaustive General Studies notes with memory mnemonics",
      "Daily Tier-1 & Tier-2 computer based mock test series",
      "Typing test lab and computer proficiency modules included",
    ],
    eligibility: ["Graduates (for CGL) / 10+2 passed (for CHSL) / 10th passed (for MTS/Railways)"],
    variants: [
      {
        name: "SSC CGL Master Batch",
        targetClass: "Graduates",
        duration: "8 Months",
        timing: "8:00 AM – 12:00 PM or 3:00 PM – 7:00 PM",
        fee: "₹29,000",
      },
    ],
    curriculum: [
      {
        term: "Module 1",
        title: "Quantitative Aptitude & Reasoning Velocity",
        hours: "160 Hours",
        topics: ["Arithmetic & Advanced Math (Algebra, Geometry, Mensuration, Trigonometry)", "Verbal & Non-Verbal Reasoning"],
      },
      {
        term: "Module 2",
        title: "English Language & General Awareness",
        hours: "140 Hours",
        topics: ["Grammar rules, Cloze test, Idioms, One-word substitution", "History, Polity, Economics, Science & Current Affairs"],
      },
    ],
    faculty: ["Mr. Amit Mishra (SSC CGL Topper)", "Mr. Karan Malhotra", "Mr. Prateek Shukla"],
    faqs: [
      {
        q: "Is Tier-2 preparation included?",
        a: "Yes, our course covers both Tier-1 and Tier-2 syllabus seamlessly with separate advanced problem solving batches.",
      },
    ],
  },
  {
    id: "banking",
    slug: "banking",
    name: "Banking Exams (IBPS PO/Clerk, SBI PO)",
    subtitle: "Specialized Banking Academy for Probationary Officers & Specialist Officers",
    tag: "Banking",
    category: "banking",
    targetExam: "IBPS PO, SBI PO, IBPS Clerk, RRB Officer Scale-I 2026/2027",
    duration: "6 Months",
    mode: "Online Live Interactive + Offline Doubt Labs",
    startDate: "20 May 2026",
    feeOneTime: "₹24,500",
    feeInstallments: "₹27,000 (2 Installments)",
    seatsTotal: 50,
    seatsFilled: 41,
    rating: 4.88,
    studentsEnrolled: 7600,
    img: bankingImg,
    overview:
      "Engineered specifically for high-competition banking exams where speed and high puzzle-solving accuracy are paramount. Includes Data Interpretation workshops, Financial Awareness capsules, and Mock Interviews with ex-Bank GM panelists.",
    highlights: [
      "High-level puzzle and seating arrangement mastery workshops",
      "Advanced Data Interpretation (DI) and Caselet solving techniques",
      "Banking & Financial Awareness weekly capsules and RBI updates",
      "Mock Interviews by retired General Managers of SBI and PNB",
    ],
    eligibility: ["Graduation in any discipline from a recognized University"],
    variants: [
      {
        name: "Bank PO/Clerk Comprehensive",
        targetClass: "Graduates / Final Year Students",
        duration: "6 Months",
        timing: "7:30 AM – 10:30 AM or 5:30 PM – 8:30 PM",
        fee: "₹24,500",
      },
    ],
    curriculum: [
      {
        term: "Module 1",
        title: "Prelims Velocity & Accuracy",
        hours: "120 Hours",
        topics: ["Quantitative Aptitude (Speed Math, Simplification, Series, Arithmetic)", "Reasoning Ability (Puzzles, Inequalities, Syllogisms)", "English Language"],
      },
      {
        term: "Module 2",
        title: "Mains Depth, Banking GK & Descriptive English",
        hours: "130 Hours",
        topics: ["High-Level Data Analysis & Interpretation", "Reasoning & Computer Aptitude", "Banking & Economic Awareness", "Descriptive Essay & Letter Writing"],
      },
    ],
    faculty: ["Mr. Amit Mishra", "Mr. S. K. Narang (Ex-Chief Manager SBI)", "Mr. Prateek Shukla"],
    faqs: [
      {
        q: "Does this include interview preparation for Bank PO?",
        a: "Yes, personality development, banking interview masterclasses, and one-on-one video recorded mock interviews with senior bankers are included.",
      },
    ],
  },
];

export interface Topper {
  id: string;
  name: string;
  rank: string;
  exam: string;
  year: number;
  marks: string;
  percentile?: string;
  college: string;
  branch?: string;
  courseTaken: string;
  city: string;
  img: string;
  quote: string;
  story: string;
}

export const toppersData: Topper[] = [
  {
    id: "aarav-sharma",
    name: "Aarav Sharma",
    rank: "AIR 42",
    exam: "JEE Advanced 2025",
    year: 2025,
    marks: "312 / 360",
    percentile: "99.98%ile",
    college: "IIT Bombay",
    branch: "Computer Science & Engineering",
    courseTaken: "2-Year Pinnacle Classroom Batch",
    city: "Indore, MP",
    img: t1,
    quote: "The conceptual clarity in Physics and constant doubt support by Dr. Rajeev Sir made all the difference on exam day.",
    story: "Aarav joined Vidyasetu in Class 11. Through daily practice problems and 40+ CBT mock tests, he transformed his problem-solving speed and secured AIR 42 in JEE Advanced.",
  },
  {
    id: "ishita-verma",
    name: "Ishita Verma",
    rank: "AIR 87",
    exam: "NEET UG 2025",
    year: 2025,
    marks: "702 / 720",
    percentile: "99.96%ile",
    college: "AIIMS New Delhi",
    branch: "MBBS",
    courseTaken: "2-Year Sankalp Medical Batch",
    city: "Bhopal, MP",
    img: t2,
    quote: "Scoring 360/360 in Biology was possible only because of Vidyasetu's word-to-word NCERT drills and constant motivation.",
    story: "Ishita balanced school and NEET prep through Vidyasetu's disciplined study routine, mastering error notebooks and securing an open category seat at AIIMS New Delhi.",
  },
  {
    id: "rohan-patidar",
    name: "Rohan Patidar",
    rank: "AIR 156",
    exam: "JEE Advanced 2025",
    year: 2025,
    marks: "296 / 360",
    percentile: "99.91%ile",
    college: "IIT Delhi",
    branch: "Electrical Engineering",
    courseTaken: "1-Year Target Batch",
    city: "Ujjain, MP",
    img: t3,
    quote: "The teachers here don't just teach formulas; they teach you how to think like an engineer under time pressure.",
    story: "Rohan traveled 50km daily to attend classroom lectures. With relentless mentorship and scholarship support from Vidyasetu, he achieved his IIT dream.",
  },
  {
    id: "sanya-jain",
    name: "Sanya Jain",
    rank: "AIR 214 / State Rank 1",
    exam: "NEET UG 2025",
    year: 2025,
    marks: "695 / 720",
    percentile: "99.89%ile",
    college: "MGM Medical College / AIIMS Bhopal",
    branch: "MBBS",
    courseTaken: "2-Year Sankalp Medical Batch",
    city: "Indore, MP",
    img: t4,
    quote: "Physics was my biggest fear in Class 10. The faculty broke down every derivation until I scored 170/180 in NEET Physics.",
    story: "Sanya topped Madhya Pradesh in Class 12 Boards (494/500) while cracking NEET UG in her very first attempt with State Rank 1.",
  },
  {
    id: "kartik-mehta",
    name: "Kartik Mehta",
    rank: "AIR 289",
    exam: "JEE Advanced 2024",
    year: 2024,
    marks: "284 / 360",
    percentile: "99.85%ile",
    college: "IIT Kanpur",
    branch: "Mechanical Engineering",
    courseTaken: "2-Year Integrated Batch",
    city: "Jabalpur, MP",
    img: t1,
    quote: "Weekly All India test series exposed my weak areas early so I could rectify them before the final examination.",
    story: "Kartik consistently scored in the top 5 of our internal tests and turned that consistency into AIR 289 in JEE Advanced 2024.",
  },
  {
    id: "priya-choudhary",
    name: "Priya Choudhary",
    rank: "AIR 340",
    exam: "NEET UG 2024",
    year: 2024,
    marks: "688 / 720",
    percentile: "99.82%ile",
    college: "Lady Hardinge Medical College, Delhi",
    branch: "MBBS",
    courseTaken: "Achiever Dropper Batch",
    city: "Gwalior, MP",
    img: t2,
    quote: "In my dropper year, Vidyasetu gave me the right atmosphere, individual teacher attention, and zero distractions.",
    story: "Priya improved her score from 560 in her first attempt to 688 in her repeater year, gaining admission into Delhi's premier medical college.",
  },
  {
    id: "devansh-gupta",
    name: "Devansh Gupta",
    rank: "AIR 94",
    exam: "NDA I 2025",
    year: 2025,
    marks: "520 / 900",
    percentile: "Top 0.1%",
    college: "National Defence Academy (NDA Khadakwasla)",
    branch: "Indian Air Force Cadet",
    courseTaken: "NDA Officer 1-Year Batch",
    city: "Indore, MP",
    img: t3,
    quote: "From written exam math tricks to SSB obstacle training, the faculty shaped my personality into an officer.",
    story: "Devansh cleared both written exam with high merit and recommended in first attempt by 1 AFSB Dehradun.",
  },
  {
    id: "tanvi-shukla",
    name: "Tanvi Shukla",
    rank: "100 Percentile",
    exam: "CUET UG 2025",
    year: 2025,
    marks: "800 / 800",
    percentile: "100.00%ile",
    college: "SRCC, Delhi University",
    branch: "B.Com (Hons)",
    courseTaken: "CUET Comprehensive Batch",
    city: "Bhopal, MP",
    img: t4,
    quote: "The mock test environment simulated the exact NTA UI, so the real exam felt like just another Sunday test.",
    story: "Tanvi scored a perfect 100 percentile in 4 subjects, bagging admission to the country's most coveted commerce college.",
  },
];

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  designation: string;
  department: "Physics" | "Chemistry" | "Mathematics" | "Biology" | "Defence & Aptitude";
  qualifications: string;
  experience: string;
  ranksMentored: string;
  bio: string;
  achievements: string[];
  img: string;
  linkedin: string;
  demoVideoTitle: string;
}

export const facultyData: FacultyMember[] = [
  {
    id: "dr-rajeev-nair",
    name: "Dr. Rajeev Nair",
    title: "Senior HOD & Master Educator",
    designation: "Head of Department — Physics",
    department: "Physics",
    qualifications: "M.Tech (IIT Kanpur), Ph.D. in Applied Physics",
    experience: "18+ Years",
    ranksMentored: "Mentored AIR 42, AIR 112, AIR 156 in JEE Adv",
    bio: "Renowned across central India for his intuitive visual approach to Rotational Mechanics and Electrodynamics. Author of two acclaimed reference problem books for JEE Advanced.",
    achievements: [
      "Taught over 15,000+ engineering & medical aspirants",
      "Recipient of the National STEM Excellence in Teaching Award 2023",
      "Ex-HOD at Premier Kota Institutes for 8 years",
    ],
    img: f1,
    linkedin: "https://linkedin.com",
    demoVideoTitle: "Mastering Rotational Dynamics: 5 Advanced IIT-JEE Problem Archetypes",
  },
  {
    id: "mrs-anuradha-deshpande",
    name: "Mrs. Anuradha Deshpande",
    title: "Senior Academic Dean",
    designation: "Head of Department — Chemistry",
    department: "Chemistry",
    qualifications: "M.Sc. Organic Chemistry (Gold Medalist, DAVV)",
    experience: "14+ Years",
    ranksMentored: "Mentored AIR 87, AIR 214 in NEET UG",
    bio: "Specialist in Organic Reaction Mechanisms and NCERT line-by-line decoding. Her systematic memory maps and electron-flow techniques make organic chemistry the highest scoring section for our students.",
    achievements: [
      "Over 92% of her students score 160+ / 180 in NEET Chemistry",
      "Architect of the Vidyasetu Chemistry NCERT Line-by-Line Mastery System",
      "Former Senior Faculty at Career Point & FIITJEE",
    ],
    img: f2,
    linkedin: "https://linkedin.com",
    demoVideoTitle: "Organic Reaction Mechanisms: Predicting Electrophilic Substitution with Zero Rote Learning",
  },
  {
    id: "mr-karan-malhotra",
    name: "Mr. Karan Malhotra",
    title: "Chief Academic Officer",
    designation: "Head of Department — Mathematics",
    department: "Mathematics",
    qualifications: "B.Tech (IIT Bombay, Computer Science)",
    experience: "12+ Years",
    ranksMentored: "Mentored AIR 42, AIR 156, AIR 289 in JEE Adv",
    bio: "Passionate mathematician and competitive programmer who demystifies Complex Calculus, Coordinate Geometry, and Combinatorics through elegant graphical methods and shortcut algorithms.",
    achievements: [
      "IIT Bombay Alumnus with deep passion for pedagogy",
      "Created the 120-Day Calculus Breakthrough Blueprint for JEE Advanced",
      "Keynote speaker on mathematical intuition at National Science Seminars",
    ],
    img: f3,
    linkedin: "https://linkedin.com",
    demoVideoTitle: "Graph Transformation Secrets for Definite Integration & Area Under Curves",
  },
  {
    id: "dr-meenakshi-rao",
    name: "Dr. Meenakshi Rao",
    title: "Director of Medical Studies",
    designation: "Head of Department — Biology",
    department: "Biology",
    qualifications: "MBBS (MGM Medical College), MD Physiology",
    experience: "20+ Years",
    ranksMentored: "Mentored AIR 87, AIR 214, AIR 340 in NEET",
    bio: "Practicing doctor and veteran medical entrance mentor who brings real physiological clinical examples into classroom teaching, making Botany and Zoology crystal clear and unforgettable.",
    achievements: [
      "Mentored 3,000+ practicing doctors across AIIMS, JIPMER, and GMCs",
      "Author of 'High-Yield NCERT Biology Cheat-Sheets' used by 50,000+ students",
      "Pioneer of 360/360 NEET Biology Target Masterclass series",
    ],
    img: f4,
    linkedin: "https://linkedin.com",
    demoVideoTitle: "Human Endocrine Regulation & Feedback Loops: Visual Clinical Breakdown for NEET 2026",
  },
  {
    id: "col-rs-rathore",
    name: "Col. R. S. Rathore (Retd.)",
    title: "SSB Mentor & Leadership Coach",
    designation: "Head — Defence & Personality Development",
    department: "Defence & Aptitude",
    qualifications: "Ex-GTO, Services Selection Board (SSB Allahabad & Bhopal)",
    experience: "22+ Years",
    ranksMentored: "Mentored 400+ Commissioned Officers in Army, Navy, Air Force",
    bio: "Decorated Army Veteran with over two decades of active service and SSB Board selection experience. Trains NDA and defence aspirants in officer-like qualities (OLQs), psychological resilience, and group obstacle tasks.",
    achievements: [
      "Former Group Testing Officer (GTO) at Selection Centre Central",
      "Trained state-level boxing and obstacle endurance teams",
    ],
    img: f1,
    linkedin: "https://linkedin.com",
    demoVideoTitle: "5-Day SSB Demystified: Cracking PPDT, TAT, and GTO Tasks with Officer Mindset",
  },
  {
    id: "mr-amit-mishra",
    name: "Mr. Amit Mishra",
    title: "Quantitative Aptitude Specialist",
    designation: "Head — Govt & Banking Examinations",
    department: "Defence & Aptitude",
    qualifications: "M.Sc Mathematics, SSC CGL Top 50 Ranker",
    experience: "11+ Years",
    ranksMentored: "Mentored 1,200+ Bank POs and SSC Officers",
    bio: "Master of speed mathematics, Vedic calculation tricks, and complex logical puzzles. Helps government job aspirants slash question-solving time from 2 minutes to under 20 seconds.",
    achievements: [
      "Top educator on speed math with millions of views across online masterclasses",
      "Creator of the '20-Second Arithmetic Framework'",
    ],
    img: f3,
    linkedin: "https://linkedin.com",
    demoVideoTitle: "Speed Math Mastery: Solve 50 Simplification & DI Questions in 15 Minutes Flat",
  },
];

export interface TestSeriesPackage {
  id: string;
  name: string;
  exam: string;
  badge: string;
  testsCount: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export const testSeriesPackages: TestSeriesPackage[] = [
  {
    id: "jee-aiats",
    name: "JEE Advanced + Main National Test Series (AIATS)",
    exam: "IIT-JEE 2026/2027",
    badge: "Most Popular",
    testsCount: "40 Full Syllabus + 60 Chapter Part Tests",
    price: "₹4,999",
    features: [
      "Exact NTA Computer-Based Test (CBT) interface simulation",
      "All India Rank (AIR) & state-wise percentile benchmark",
      "AI Diagnostic: Question-level Speed vs Accuracy Matrix",
      "Video solutions for every question by Kota HODs",
      "Last 15 Years Solved PYQ Chapter-wise Test Series included",
      "SMS & WhatsApp performance report sent to parents instantly",
    ],
    recommended: true,
  },
  {
    id: "neet-aiats",
    name: "NEET All India National Grand Test Series",
    exam: "NEET UG 2026/2027",
    badge: "Medical Benchmark",
    testsCount: "35 Full 720-Mark OMR Tests + 55 Unit Tests",
    price: "₹4,499",
    features: [
      "OMR-based classroom testing with optical scanner grading",
      "Complete 200-minute time constraint conditioning",
      "Negative marking diagnostic heatmap identifying error patterns",
      "NCERT page-reference tagged to every single question",
      "Biology 360/360 special assertion-reason drills",
      "Detailed national rank card with college cut-off predictor",
    ],
    recommended: true,
  },
  {
    id: "foundation-olympiad",
    name: "Foundation STEM & Olympiad Test Series",
    exam: "Class 6–10 / NTSE / Olympiads",
    badge: "Junior Ranker",
    testsCount: "24 Chapter Tests + 12 Full Mock Tests",
    price: "₹1,999",
    features: [
      "CBSE / ICSE Board pattern tests + Olympiad advanced papers",
      "Mental ability and logical reasoning speed tests",
      "Comprehensive teacher feedback and strength analysis",
      "Gamified leaderboards to encourage student enthusiasm",
    ],
  },
  {
    id: "cuet-mock-hub",
    name: "CUET UG National Mock Test Suite",
    exam: "CUET UG 2026/2027",
    badge: "University Gateway",
    testsCount: "30 Domain Tests + 20 General Tests",
    price: "₹2,499",
    features: [
      "Section I (Language) + Section II (Domains) + Section III (General Test)",
      "Instant percentile score and DU/BHU seat chance calculator",
      "Detailed explanatory solutions with revision notes",
    ],
  },
];

export interface StudyResource {
  id: string;
  title: string;
  category: "notes" | "dpp" | "pyq" | "formulas" | "sample-papers";
  tag: string;
  size: string;
  downloadsCount: string;
  description: string;
}

export const studyResourcesData: StudyResource[] = [
  {
    id: "1",
    title: "Complete Physics Formula Handbook for JEE & NEET",
    category: "formulas",
    tag: "High Yield PDF",
    size: "14.2 MB",
    downloadsCount: "42,800+",
    description: "Every formula, dimensional formula, graph, and constant from Class 11 & 12 Physics condensed into 64 pages.",
  },
  {
    id: "2",
    title: "Organic Chemistry Reaction Mechanism Roadmaps",
    category: "notes",
    tag: "Kota Notes",
    size: "18.5 MB",
    downloadsCount: "38,500+",
    description: "Named reactions, reagents summary, acid-base rankings, and synthetic conversion flowcharts for NEET/JEE.",
  },
  {
    id: "3",
    title: "Last 15 Years JEE Advanced Chapter-wise Solved Papers",
    category: "pyq",
    tag: "Solved PYQ",
    size: "28.0 MB",
    downloadsCount: "51,200+",
    description: "Detailed step-by-step solutions with alternative shortcut approaches for all questions from 2010 to 2025.",
  },
  {
    id: "4",
    title: "NEET UG 10-Year Chapter-wise Solved Biology Papers",
    category: "pyq",
    tag: "Medical Special",
    size: "22.4 MB",
    downloadsCount: "64,000+",
    description: "Every past NEET biology question mapped with exact NCERT textbook page references.",
  },
  {
    id: "5",
    title: "Daily Practice Problem (DPP) Set 1–30: Mechanics & Calculus",
    category: "dpp",
    tag: "DPP Series",
    size: "12.8 MB",
    downloadsCount: "29,400+",
    description: "300 graded problems with hints and video solution links for JEE aspirants.",
  },
  {
    id: "6",
    title: "CBSE Class 12 Science Board Model Exam Papers (2026)",
    category: "sample-papers",
    tag: "Board Booster",
    size: "9.6 MB",
    downloadsCount: "33,100+",
    description: "5 strictly syllabus-compliant model answer papers crafted by CBSE senior evaluators.",
  },
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "Exam Tips" | "Physics Strategy" | "Chemistry Strategy" | "Biology Strategy" | "Career Guidance" | "Current Affairs";
  excerpt: string;
  author: string;
  authorTitle: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  content: string[];
}

export const blogPostsData: BlogPost[] = [
  {
    id: "how-to-crack-jee-adv-top-500",
    slug: "how-to-crack-jee-adv-top-500",
    title: "The 180-Day Blueprint to Secure AIR Under 500 in JEE Advanced",
    category: "Exam Tips",
    excerpt: "Learn how top rankers organize their revision cycles, eliminate negative marking, and master multi-concept problem solving in the final 6 months.",
    author: "Mr. Karan Malhotra",
    authorTitle: "Head of Department — Mathematics (B.Tech IIT Bombay)",
    publishDate: "August 2, 2026",
    readTime: "7 min read",
    tags: ["JEE Advanced", "Revision Strategy", "IIT Bombay", "Problem Solving"],
    content: [
      "Cracking JEE Advanced with a top 500 All India Rank is not about solving 500 random problems daily; it is about solving 30 deep, multi-concept problems and thoroughly understanding every failure point in your methodology.",
      "Phase 1: Diagnostic Error Audit. Before starting any new book, review your last 5 test papers. Categorize your mistakes into Conceptual Gaps, Calculation Slips, and Time Panic. Only 20% of errors are true conceptual gaps.",
      "Phase 2: Master the Art of Multi-Topic Linkage. JEE Advanced rarely tests a topic in isolation. A single Physics problem will combine Rotational Dynamics with Electromagnetic Induction and Differential Equations.",
      "Phase 3: The 3-Hour Simulation Rigor. Condition your brain to operate at peak analytical capacity during the exact exam hours (9:00 AM to 12:00 PM and 2:30 PM to 5:30 PM) every Sunday without fail.",
    ],
  },
  {
    id: "scoring-360-in-neet-biology",
    slug: "scoring-360-in-neet-biology",
    title: "How to Score 360/360 in NEET Biology: Line-by-Line NCERT Strategy",
    category: "Biology Strategy",
    excerpt: "A forensic breakdown of how NTA frames tricky Assertion-Reason and Statement questions from single NCERT sentences.",
    author: "Dr. Meenakshi Rao",
    authorTitle: "Head of Department — Biology (MBBS, MD)",
    publishDate: "July 28, 2026",
    readTime: "6 min read",
    tags: ["NEET UG", "NCERT Mastery", "Biology 360", "AIIMS Prep"],
    content: [
      "In modern NEET examinations, Biology is not just a subject; it is the bedrock that accounts for 50% of your total marks. Scoring anything below 340 puts immense pressure on Physics and Chemistry.",
      "The Three-Pass Reading Rule: Pass 1 — Fast comprehension read. Pass 2 — Highlighting key definitions, exceptions, and scientist names. Pass 3 — Creating active recall flashcards for complex diagrams and cyclical pathways.",
      "Beware of NCERT Summaries and Captions: More than 12 questions in the last 3 NEET exams were picked directly from diagram captions and chapter summaries that most students skip.",
    ],
  },
  {
    id: "overcoming-physics-numerical-fear",
    slug: "overcoming-physics-numerical-fear",
    title: "Conquering Physics Numericals: A Guide for Medical Aspirants",
    category: "Physics Strategy",
    excerpt: "Stop fearing derivations and mathematics. Follow our 4-step framework to score 160+ in NEET Physics with confidence.",
    author: "Dr. Rajeev Nair",
    authorTitle: "Head of Department — Physics (M.Tech IIT Kanpur)",
    publishDate: "July 20, 2026",
    readTime: "8 min read",
    tags: ["NEET Physics", "Numerical Solving", "Derivations", "Study Tips"],
    content: [
      "Most medical aspirants don't struggle with Physics because they lack intelligence; they struggle because they attempt to memorize numerical steps like biological facts.",
      "Step 1: The Given-Target Free Body Diagram. Before touching any equation, draw a clean diagram and list down knowns, unknowns, and physical constraints.",
      "Step 2: Dimensional & Extreme Value Sanity Checks. Train yourself to verify units and test extreme cases (e.g. angle = 0 or mass = 0). This alone eliminates two wrong options in multiple-choice questions.",
    ],
  },
  {
    id: "iit-vs-nit-vs-bits-engineering-guide",
    slug: "iit-vs-nit-vs-bits-engineering-guide",
    title: "IIT vs NIT vs BITS: Which Engineering College Offers the Best ROI?",
    category: "Career Guidance",
    excerpt: "Comprehensive comparison of placement statistics, research opportunities, alumni networks, and tuition costs across premier Indian institutions.",
    author: "Dr. V. K. Agrawal",
    authorTitle: "Founder & Managing Director (Ex-IIT Bombay)",
    publishDate: "July 12, 2026",
    readTime: "9 min read",
    tags: ["Career Counselling", "College Selection", "IIT Placement", "BITS Pilani"],
    content: [
      "Choosing where to spend your four undergraduate engineering years is one of the most consequential decisions you and your parents will make.",
      "Top 7 IITs (Bombay, Delhi, Madras, Kanpur, Kharagpur, Roorkee, Guwahati) offer unmatched global brand equity, deep venture capital networks, and median packages exceeding ₹22 LPA.",
      "Top NITs (Trichy, Surathkal, Warangal) and BITS Pilani offer equivalent peer groups and placement opportunities for Computer Science and Electrical branches.",
    ],
  },
];

export interface Branch {
  id: string;
  name: string;
  city: string;
  tagline: string;
  address: string;
  landmark: string;
  phone: string;
  email: string;
  whatsapp: string;
  centerHead: string;
  centerHeadTitle: string;
  timings: string;
  capacity: string;
  smartClassrooms: number;
  hostelAvailable: boolean;
  mapEmbedUrl: string;
}

export const branchesData: Branch[] = [
  {
    id: "indore-hq",
    name: "Indore Central Campus (HQ)",
    city: "Indore",
    tagline: "Flagship 5-Story Academic Mega-Center",
    address: "21-24, Scheme No. 54, PU-4 Commercial, Near Vijay Nagar Square, Indore, MP 452010",
    landmark: "Behind Orbit Mall, Vijay Nagar",
    phone: "+91 731 4209900 / +91 98765 43210",
    email: "indore@vidyasetu.in",
    whatsapp: "+91 98765 43210",
    centerHead: "Prof. S. N. Trivedi",
    centerHeadTitle: "Regional Academic Director",
    timings: "Monday – Sunday: 7:00 AM – 9:00 PM",
    capacity: "2,500+ Students",
    smartClassrooms: 24,
    hostelAvailable: true,
    mapEmbedUrl: "https://www.google.com/maps?q=Vijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh&output=embed",
  },
  {
    id: "bhopal-center",
    name: "Bhopal MP Nagar Campus",
    city: "Bhopal",
    tagline: "Premier Capital City Center",
    address: "Plot 14, Zone-II, Maharana Pratap Nagar, Bhopal, MP 462011",
    landmark: "Opposite Sargam Cinema, Zone-II",
    phone: "+91 755 4910200 / +91 98765 43211",
    email: "bhopal@vidyasetu.in",
    whatsapp: "+91 98765 43211",
    centerHead: "Dr. Alok Saxena",
    centerHeadTitle: "Center Head & Senior Faculty",
    timings: "Monday – Sunday: 7:30 AM – 8:30 PM",
    capacity: "1,800+ Students",
    smartClassrooms: 16,
    hostelAvailable: true,
    mapEmbedUrl: "https://www.google.com/maps?q=MP%20Nagar%20Zone%202%20Bhopal&output=embed",
  },
  {
    id: "jabalpur-center",
    name: "Jabalpur Civic Centre Campus",
    city: "Jabalpur",
    tagline: "Mahakoshal Region Headquarters",
    address: "3rd & 4th Floor, City Tower, Wright Town, Jabalpur, MP 482002",
    landmark: "Near Civic Centre Garden",
    phone: "+91 761 4055100 / +91 98765 43212",
    email: "jabalpur@vidyasetu.in",
    whatsapp: "+91 98765 43212",
    centerHead: "Mr. Mukesh Pandey",
    centerHeadTitle: "Center Head",
    timings: "Monday – Saturday: 8:00 AM – 8:00 PM, Sunday: 8:00 AM – 2:00 PM",
    capacity: "1,200+ Students",
    smartClassrooms: 12,
    hostelAvailable: false,
    mapEmbedUrl: "https://www.google.com/maps?q=Wright%20Town%20Jabalpur&output=embed",
  },
  {
    id: "gwalior-center",
    name: "Gwalior City Centre Campus",
    city: "Gwalior",
    tagline: "Chambal & Gwalior Hub",
    address: "Shree Ram Plaza, New High Court Road, City Centre, Gwalior, MP 474011",
    landmark: "Opposite State Bank Zonal Office",
    phone: "+91 751 4088300 / +91 98765 43213",
    email: "gwalior@vidyasetu.in",
    whatsapp: "+91 98765 43213",
    centerHead: "Mr. Rakesh Kulshreshtha",
    centerHeadTitle: "Center Head",
    timings: "Monday – Saturday: 8:00 AM – 8:00 PM",
    capacity: "1,000+ Students",
    smartClassrooms: 10,
    hostelAvailable: false,
    mapEmbedUrl: "https://www.google.com/maps?q=City%20Centre%20Gwalior&output=embed",
  },
  {
    id: "kota-center",
    name: "Kota Extension Campus",
    city: "Kota",
    tagline: "Specialized Advanced Intensive Wing",
    address: "B-42, Electronic Complex, Talwandi, Kota, Rajasthan 324005",
    landmark: "Near Commerce College Ground",
    phone: "+91 744 2401100 / +91 98765 43214",
    email: "kota@vidyasetu.in",
    whatsapp: "+91 98765 43214",
    centerHead: "Mr. D. P. Singh",
    centerHeadTitle: "Academic Coordinator",
    timings: "Daily: 7:00 AM – 9:00 PM",
    capacity: "1,500+ Students",
    smartClassrooms: 14,
    hostelAvailable: true,
    mapEmbedUrl: "https://www.google.com/maps?q=Talwandi%20Kota%20Rajasthan&output=embed",
  },
  {
    id: "raipur-center",
    name: "Raipur Pandri Campus",
    city: "Raipur",
    tagline: "Chhattisgarh Premier Gateway",
    address: "2nd Floor, Crystal Arcade, Near Devendra Nagar Square, Pandri, Raipur, CG 492004",
    landmark: "Opposite City Centre Mall",
    phone: "+91 771 4220500 / +91 98765 43215",
    email: "raipur@vidyasetu.in",
    whatsapp: "+91 98765 43215",
    centerHead: "Dr. Sunita Verma",
    centerHeadTitle: "Center Head",
    timings: "Monday – Saturday: 8:00 AM – 8:00 PM",
    capacity: "1,100+ Students",
    smartClassrooms: 10,
    hostelAvailable: false,
    mapEmbedUrl: "https://www.google.com/maps?q=Pandri%20Raipur%20Chhattisgarh&output=embed",
  },
];

export interface UpcomingBatch {
  id: string;
  name: string;
  stream: string;
  targetExam: string;
  targetClass: string;
  startDate: string;
  timing: string;
  center: string;
  seatsTotal: number;
  seatsRemaining: number;
  countdownDays: number;
}

export const upcomingBatchesData: UpcomingBatch[] = [
  {
    id: "batch-1",
    name: "Pinnacle JEE 2028 (Batch 04)",
    stream: "Engineering",
    targetExam: "JEE Main & Advanced 2028",
    targetClass: "Class 10 to 11 Moving",
    startDate: "14 April 2026",
    timing: "8:00 AM – 1:30 PM (Morning)",
    center: "Indore HQ & Bhopal Campus",
    seatsTotal: 40,
    seatsRemaining: 6,
    countdownDays: 8,
  },
  {
    id: "batch-2",
    name: "Sankalp NEET 2028 (Batch 03)",
    stream: "Medical",
    targetExam: "NEET UG 2028",
    targetClass: "Class 10 to 11 Moving",
    startDate: "18 April 2026",
    timing: "8:00 AM – 1:30 PM (Morning)",
    center: "All Campuses",
    seatsTotal: 40,
    seatsRemaining: 4,
    countdownDays: 12,
  },
  {
    id: "batch-3",
    name: "Super-30 JEE Repeater Batch",
    stream: "Engineering",
    targetExam: "JEE Advanced 2027",
    targetClass: "12th Passed / Droppers",
    startDate: "25 April 2026",
    timing: "7:30 AM – 2:30 PM (Intensive)",
    center: "Indore HQ & Kota Center",
    seatsTotal: 30,
    seatsRemaining: 3,
    countdownDays: 19,
  },
  {
    id: "batch-4",
    name: "Achiever NEET Repeater Super-Batch",
    stream: "Medical",
    targetExam: "NEET UG 2027",
    targetClass: "12th Passed / Repeaters",
    startDate: "28 April 2026",
    timing: "7:30 AM – 2:30 PM (Daily)",
    center: "Indore, Bhopal & Jabalpur",
    seatsTotal: 35,
    seatsRemaining: 5,
    countdownDays: 22,
  },
  {
    id: "batch-5",
    name: "Junior STEM Pre-Foundation (Class 9)",
    stream: "Foundation",
    targetExam: "School Boards & Olympiads",
    targetClass: "Class 9 Students",
    startDate: "05 May 2026",
    timing: "4:00 PM – 7:30 PM (Evening)",
    center: "All Campuses",
    seatsTotal: 35,
    seatsRemaining: 9,
    countdownDays: 29,
  },
];

export interface NoticeItem {
  id: string;
  category: "Admissions" | "Scholarship" | "Exam Schedule" | "Notice";
  title: string;
  date: string;
  badge: string;
  link: string;
}

export const noticeBoardData: NoticeItem[] = [
  {
    id: "n1",
    category: "Scholarship",
    title: "VSAT 2026-27 Phase-2 National Scholarship Test registrations open. Win up to 100% scholarship.",
    date: "10 Aug 2026",
    badge: "Important",
    link: "/scholarship",
  },
  {
    id: "n2",
    category: "Admissions",
    title: "Early Bird registration closing on 15 April 2026 for Class 11 Pinnacle & Sankalp Batches.",
    date: "08 Aug 2026",
    badge: "Urgent",
    link: "/admissions",
  },
  {
    id: "n3",
    category: "Exam Schedule",
    title: "All India AIATS Mock Test #04 for JEE 2027 scheduled for Sunday, 23 August 2026.",
    date: "05 Aug 2026",
    badge: "Academic",
    link: "/test-series",
  },
  {
    id: "n4",
    category: "Notice",
    title: "Quarterly Parent-Teacher Meeting (PTM) for Class 11 & 12 batches on 30 August 2026.",
    date: "01 Aug 2026",
    badge: "Notice",
    link: "/about",
  },
];

export const galleryItemsData = [
  { id: "1", title: "Smart Interactive Classroom", category: "Classrooms", img: heroImg, caption: "Smartboards and acoustic digital classrooms in Indore HQ" },
  { id: "2", title: "Advanced Physics & Chemistry Labs", category: "Labs", img: g1, caption: "Hands-on experimental demonstrations for concept grounding" },
  { id: "3", title: "Central Reading Hall & Library", category: "Library", img: g2, caption: "24/7 Silent reading hall stocked with 15,000+ reference volumes" },
  { id: "4", title: "Annual Victory Felicitation Ceremony", category: "Events", img: g3, caption: "Celebrating our IIT-JEE and NEET top rank holders with families" },
  { id: "5", title: "National Motivational Seminar", category: "Seminars", img: g4, caption: "Exam temperament and stress management session with rankers" },
  { id: "6", title: "Student Wellness & Sports Complex", category: "Sports", img: g5, caption: "Recreational facilities supporting mental clarity and physical health" },
];

export const latestNotices = noticeBoardData;

export interface ScholarshipSlab {
  rankRange: string;
  waiver: string;
  criteria: string;
  badge: string;
}

export const scholarshipSlabs: ScholarshipSlab[] = [
  { rankRange: "Rank 1 – 10", waiver: "100% Tuition Fee Waiver", criteria: "Top 0.5% in VSAT National Rank / NTSE Scholar / RMO Qualified", badge: "Super-10" },
  { rankRange: "Rank 11 – 50", waiver: "75% Tuition Fee Waiver", criteria: "Score 90%+ in VSAT / 95%+ in Class 10 Board Science & Math", badge: "Merit Star" },
  { rankRange: "Rank 51 – 200", waiver: "50% Tuition Fee Waiver", criteria: "Score 80%+ in VSAT / 90%+ in Class 10 Board Exams", badge: "Pinnacle" },
  { rankRange: "Rank 201 – 500", waiver: "35% Tuition Fee Waiver", criteria: "Score 70%+ in VSAT / State Board Top 1% Merit", badge: "Achiever" },
  { rankRange: "Rank 501 – 1500", waiver: "20% Tuition Fee Waiver", criteria: "Score 60%+ in VSAT", badge: "Sankalp" },
  { rankRange: "Special Wards", waiver: "25% Fixed Waiver", criteria: "Wards of Armed Forces, Police Personnel & Teachers", badge: "Honor" },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Admissions" | "Hostel" | "Tests";
}

export const faqsData: FaqItem[] = [
  {
    question: "What is the maximum batch size at Vidyasetu Classes?",
    answer: "Classroom batches are strictly capped at 35 students (and 25 in Foundation courses) to guarantee that each student receives direct personal interaction and daily doubt time with their assigned mentor.",
    category: "General",
  },
  {
    question: "Are faculties stable or do they change mid-session?",
    answer: "All our senior Kota HODs and subject heads are on long-term permanent contracts with over 8 years average tenure at Vidyasetu. We maintain zero faculty turnover during active academic sessions.",
    category: "General",
  },
  {
    question: "Do you offer fee installment plans and educational loans?",
    answer: "Yes, parents can pay in 3 equal quarterly installments across the session. Additionally, we partner with leading national banks (SBI, HDFC) to provide 0% interest EMI options with zero processing fees.",
    category: "Admissions",
  },
  {
    question: "What is the refund and cancellation policy?",
    answer: "We offer a 100% money-back guarantee within the first 14 days of batch commencement if a student or parent is not completely satisfied with classroom pedagogy, minus only the printed study material cost.",
    category: "Admissions",
  },
  {
    question: "Are hostel facilities available for outstation boys and girls?",
    answer: "Yes, we operate dedicated, warden-supervised AC hostels within a 400-meter radius of our campuses. Facilities include hygienic 4-meal mess, biometric security, CCTV surveillance, 24x7 nurse on call, and silent night study rooms.",
    category: "Hostel",
  },
  {
    question: "How does the All-India Test Series (AIATS) work?",
    answer: "AIATS is conducted every alternate Sunday on exact NTA Computer-Based Test (CBT) software. Students receive detailed chapter-level diagnostic speed vs accuracy heatmaps, national percentile, and video solutions within 4 hours.",
    category: "Tests",
  },
  {
    question: "How can parents monitor daily attendance and test performance?",
    answer: "The Vidyasetu Parent Mobile App provides live biometric entry/exit notifications, daily homework completion status, test scorecards, and a direct messaging line with the batch coordinator.",
    category: "General",
  },
  {
    question: "Can a student switch between offline and online batches?",
    answer: "Yes, students can switch between offline classroom and live interactive hybrid mode once per semester with administrative approval without losing study progress or test records.",
    category: "Admissions",
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rank: string;
  exam: string;
  quote: string;
  verifiedBadge: string;
  img: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Dr. Alok Sharma (Parent of Aarav Sharma, AIR 42 JEE Adv)",
    role: "Senior Consultant Cardiologist",
    rank: "AIR 42 JEE Advanced",
    exam: "IIT Bombay CSE",
    quote: "As a doctor myself, I valued Vidyasetu's academic rigor and absolute transparency. The faculty treated Aarav like family and guided him whenever stress built up before JEE.",
    verifiedBadge: "Verified Parent 2025",
    img: t1,
  },
  {
    id: "t-2",
    name: "Ishita Verma (Student, AIR 87 NEET UG)",
    role: "MBBS Student, AIIMS New Delhi",
    rank: "AIR 87 NEET UG",
    exam: "AIIMS New Delhi",
    quote: "Dr. Meenakshi Ma'am's NCERT decoding gave me the confidence to score 360/360 in Biology. The doubt counters were open until 8 PM every single day.",
    verifiedBadge: "Verified Topper 2025",
    img: t2,
  },
  {
    id: "t-3",
    name: "Mr. Rajendra Patidar (Parent of Rohan Patidar, AIR 156)",
    role: "Government High School Principal",
    rank: "AIR 156 JEE Advanced",
    exam: "IIT Delhi EE",
    quote: "Coming from a rural background, the VSAT scholarship of 75% was a blessing. The high-level peer group and library kept Rohan inspired throughout two years.",
    verifiedBadge: "Verified Parent 2025",
    img: t3,
  },
  {
    id: "t-4",
    name: "Sanya Jain (Student, AIR 214 NEET UG)",
    role: "MBBS Student, AIIMS Bhopal",
    rank: "AIR 214 / State Rank 1",
    exam: "NEET UG 2025",
    quote: "The personalized test analytics showed me that my silly mistakes in organic chemistry were costing me 20 marks. Fixing that in AIATS changed my destiny.",
    verifiedBadge: "Verified Topper 2025",
    img: t4,
  },
];


