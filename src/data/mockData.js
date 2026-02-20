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
      "https://www.shutterstock.com/shutterstock/photos/2301519911/display_1500/stock-photo-physics-equations-floating-in-the-background-hands-writing-in-notebooks-on-work-tables-2301519911.jpg",
  },
  {
    id: "c2",
    name: "Chemistry Pro",
    price: 399,
    validity: "60 days",
    desc: "Organic + Inorganic + practice tests",
    image:
      "https://images.ctfassets.net/szez98lehkfm/2g2qAwNo9g1sqNTMM8Dx09/a6255a7191b72e3024accbdd1ecec5ed/MyIC_Article_93347?w=730&h=410&fm=jpg&fit=fill",
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
      "https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/dee096b0d5ecfd035e4d25da560d1d28fd47687c",
  },
  {
    id: "v2",
    title: "How to take tests & see results",
    duration: "5:10",
    channel: "Royal Scientific",
    thumb:
      "https://i.ytimg.com/vi/Nii_fBGb0_c/maxresdefault.jpg",
  },
];


export const myCourses = [
  {
    id: "course-a",
    title: "HSC Physics Full Course",
    subtitle: "Board-focused practice",
    thumb:
      "https://www.shutterstock.com/shutterstock/photos/2301519911/display_1500/stock-photo-physics-equations-floating-in-the-background-hands-writing-in-notebooks-on-work-tables-2301519911.jpg",
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
      "https://images.ctfassets.net/szez98lehkfm/2g2qAwNo9g1sqNTMM8Dx09/a6255a7191b72e3024accbdd1ecec5ed/MyIC_Article_93347?w=730&h=410&fm=jpg&fit=fill",
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
  { name: "সংজ্ঞা", desc: "এই অধ্যায়ের মূল ধারণা/কনসেপ্ট সংক্ষেপে ব্যাখ্যা।" },
  { name: "গুরুত্বপূর্ণ পয়েন্ট", desc: "বোর্ড পরীক্ষায় বারবার আসে—মনে রাখার মতো পয়েন্ট।" },
  { name: "সাধারণ ভুল", desc: "এই টপিকে শিক্ষার্থীরা যে ভুলগুলো বেশি করে—সতর্কতা।" },
];

export const formulaRows = [
  { name: "v = u + at", desc: "u: প্রাথমিক বেগ, a: ত্বরণ, t: সময়" },
  { name: "s = ut + ½at²", desc: "s: সরণ, u: প্রাথমিক বেগ, a: ত্বরণ, t: সময়" },
  { name: "F = ma", desc: "F: বল, m: ভর, a: ত্বরণ" },
];

/**
 * CQ = 1 stem + 4 serial questions (ক, খ, গ, ঘ)
 * Keep q as stem, and parts[] as the 4 sub-questions.
 */
export const sampleCQ = [
  {
    id: "cq1",
    tag: "গতি/সমত্বরণ",
    q: "একটি বস্তু স্থির অবস্থা থেকে সমত্বরণে চলতে শুরু করল। ৪ সেকেন্ড পরে এর বেগ ৮ মি/সে হলো।",
    parts: [
      { key: "ক", q: "সমত্বরণ কাকে বলে?" },
      { key: "খ", q: "v = u + at সমীকরণটি কীভাবে প্রযোজ্য—ব্যাখ্যা কর।" },
      { key: "গ", q: "বস্তুর ত্বরণ নির্ণয় কর।" },
      { key: "ঘ", q: "উক্ত ত্বরণে ৪ সেকেন্ডে বস্তুটির সরণ কত হবে? গণনা কর।" },
    ],
    a:
      "ক) সমত্বরণ: সমান সময় অন্তরে বেগের পরিবর্তন সমান হলে তাকে সমত্বরণ বলে।\n\n" +
      "খ) এখানে u=0 (স্থির থেকে শুরু), v=8, t=4 ⇒ v=u+at প্রযোজ্য।\n\n" +
      "গ) v=u+at ⇒ 8=0+a×4 ⇒ a=2 মি/সে²\n\n" +
      "ঘ) s=ut+½at² ⇒ s=0×4+½×2×(4²)=16 মিটার",
  },
  {
    id: "cq2",
    tag: "নিউটনের সূত্র",
    q: "একটি বাস হঠাৎ ব্রেক করলে যাত্রীরা সামনের দিকে ঝুঁকে পড়ে।",
    parts: [
      { key: "ক", q: "জড়তা (Inertia) কাকে বলে?" },
      { key: "খ", q: "উপরের ঘটনাটি নিউটনের কোন সূত্র/নীতির সাথে সম্পর্কিত—ব্যাখ্যা কর।" },
      { key: "গ", q: "নিউটনের প্রথম গতিসূত্র লিখ।" },
      { key: "ঘ", q: "আরেকটি দৈনন্দিন উদাহরণ দাও যেখানে জড়তার প্রভাব দেখা যায়।" },
    ],
    a:
      "ক) জড়তা: বস্তু তার স্থির বা সমবেগে সরলরেখায় গতি অবস্থা বজায় রাখতে চায়—এ ধর্মকে জড়তা বলে।\n\n" +
      "খ) বাস ব্রেক করলে বাস থামে, কিন্তু যাত্রীর শরীর আগের গতি অবস্থা বজায় রাখতে চায় ⇒ সামনের দিকে ঝুঁকে পড়ে (জড়তার কারণে)।\n\n" +
      "গ) বাহ্যিক অসম বল না থাকলে বস্তু স্থির থাকবে বা সমবেগে সরলরেখায় চলবে।\n\n" +
      "ঘ) বাস হঠাৎ চলতে শুরু করলে যাত্রী পিছনে হেলে পড়ে—এটিও জড়তার উদাহরণ।",
  },
];

export const sampleMCQ = [
  {
    id: "m1",
    tag: "একক",
    q: "ত্বরণের একক কোনটি?",
    options: ["m/s", "m/s²", "kg", "N"],
    answer: 1,
    explain: "ত্বরণ = বেগের পরিবর্তন / সময়, তাই একক (m/s) / s = m/s²।",
  },
  {
    id: "m2",
    tag: "ধারণা",
    q: "যদি ত্বরণ a = 0 হয়, তবে গতি হবে—",
    options: ["সমবেগ", "ত্বরণযুক্ত", "বৃত্তাকার", "এলোমেলো"],
    answer: 0,
    explain: "ত্বরণ শূন্য মানে বেগ পরিবর্তন হচ্ছে না—অর্থাৎ বস্তু সমবেগে চলবে।",
  },
  {
    id: "m3",
    tag: "সূত্র",
    q: "F = ma সমীকরণটি কোন সূত্রের সাথে সম্পর্কিত?",
    options: ["প্রথম গতিসূত্র", "দ্বিতীয় গতিসূত্র", "তৃতীয় গতিসূত্র", "হুকের সূত্র"],
    answer: 1,
    explain: "ত্বরণ = বেগের পরিবর্তন / সময়, তাই একক (m/s) / s = m/s²।",
  },
];