export const user = {
  name: "Student",
  id: "U-1029",
  email: "student@example.com",
  walletBalance: 1250,
  plan: "Standard",
};

export const homeCourses = [
  {
    id: "c1",
    name: "Physics Mastery",
    price: 499,
    validity: "90 days",
    desc: "Concept + CQ + MCQ + Board analysis",
    image:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "c2",
    name: "Chemistry Pro",
    price: 399,
    validity: "60 days",
    desc: "Organic + Inorganic + practice tests",
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde67548?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "c3",
    name: "Math Sprint",
    price: 599,
    validity: "120 days",
    desc: "Formula vault + CQ/MCQ drills",
    image:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=900&q=70",
  },
];

export const tutorialVideos = [
  {
    id: "v1",
    title: "How to use the app (Full tutorial)",
    duration: "3:45",
    channel: "Royal Scientific",
    thumb:
      "https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?auto=format&fit=crop&w=1200&q=70",
  },
  {
    id: "v2",
    title: "How to take tests & see results",
    duration: "5:10",
    channel: "Royal Scientific",
    thumb:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=70",
  },
];


export const myCourses = [
  {
    id: "course-a",
    title: "HSC Physics Full Course",
    subtitle: "Board-focused practice",
    thumb:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=70",
    subjects: [
      {
        id: "sub-1",
        title: "1st Paper",
        chapters: [
          { id: "ch-1", title: "Vector" },
          { id: "ch-2", title: "Newtonian Mechanics" },
        ],
      },
      {
        id: "sub-2",
        title: "2nd Paper",
        chapters: [
          { id: "ch-3", title: "Optics" },
          { id: "ch-4", title: "Modern Physics" },
        ],
      },
    ],
  },
  {
    id: "course-b",
    title: "HSC Chemistry Full Course",
    subtitle: "CQ/MCQ + formula bank",
    thumb:
      "https://images.unsplash.com/photo-1559757175-5700dde67548?auto=format&fit=crop&w=1200&q=70",
    subjects: [
      {
        id: "sub-3",
        title: "1st Paper",
        chapters: [
          { id: "ch-5", title: "Periodic Table" },
          { id: "ch-6", title: "Chemical Bonding" },
        ],
      },
    ],
  },
];


export const dashboardDailyMarks = [
  { day: "Mon", marks: 42 },
  { day: "Tue", marks: 55 },
  { day: "Wed", marks: 38 },
  { day: "Thu", marks: 61 },
  { day: "Fri", marks: 49 },
  { day: "Sat", marks: 70 },
  { day: "Sun", marks: 58 },
];

export const dashboardSpentHours = [
  { day: "Mon", hours: 1.2 },
  { day: "Tue", hours: 2.0 },
  { day: "Wed", hours: 0.8 },
  { day: "Thu", hours: 2.5 },
  { day: "Fri", hours: 1.6 },
  { day: "Sat", hours: 3.1 },
  { day: "Sun", hours: 2.2 },
];

// Chapter detail: board analysis mock
export const boardAnalytics = {
  boards: ["Dhaka", "Chattogram", "Rajshahi"],
  years: ["2022", "2023", "2024", "2025"],
  // board -> year -> count
  data: {
    Dhaka: { "2022": 22, "2023": 18, "2024": 25, "2025": 20 },
    Chattogram: { "2022": 15, "2023": 16, "2024": 19, "2025": 21 },
    Rajshahi: { "2022": 12, "2023": 14, "2024": 13, "2025": 17 },
  },
};

export const relevantInfoRows = [
  { name: "Definition", desc: "Short concept explanation related to this chapter." },
  { name: "Key Point", desc: "Important points to remember for boards." },
  { name: "Common Mistake", desc: "Typical errors students make in this topic." },
];

export const formulaRows = [
  { name: "v = u + at", desc: "u: initial velocity, a: acceleration, t: time" },
  { name: "s = ut + 1/2 at²", desc: "s: displacement, u: initial velocity, a: acceleration, t: time" },
];

export const sampleCQ = [
  { id: "cq1", q: "Explain Newton’s 1st law with an example.", a: "It states... Example: ..." , tag: "Basics" },
  { id: "cq2", q: "Derive the equation of motion s = ut + 1/2 at².", a: "Derivation: ..." , tag: "Derivation" },
];

export const sampleMCQ = [
  { id: "m1", q: "Unit of acceleration is:", options: ["m/s", "m/s²", "kg", "N"], answer: 1, tag: "Units" },
  { id: "m2", q: "If a=0, motion is:", options: ["uniform", "accelerated", "circular", "random"], answer: 0, tag: "Concept" },
  { id: "m3", q: "F = ma is:", options: ["1st law", "2nd law", "3rd law", "Hooke’s law"], answer: 1, tag: "Basics" },
];
