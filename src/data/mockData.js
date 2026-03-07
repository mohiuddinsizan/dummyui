// mockData.js  (edited as per your instructions)
// ✅ books for subscription (NOT courses)
// ✅ categories: admission / hsc / ssc
// ✅ subcategories: quick_preparation / guide / understanding / test_paper
// ✅ Bangla names that make sense for Bangladesh
// ✅ presetBundles fixed to use correct ids from this dataset (NOT b001 etc.)
// ✅ kept export names (homeCourses, presetBundles etc.) so your existing pages don't break

export const user = {
  name: "Student",
  id: "U-1029",
  email: "student@example.com",
  walletBalance: 1250,
  plan: "Standard",
};

/**
 * NOTE:
 * - We keep the variable name `homeCourses` to avoid breaking imports.
 * - But each item is a BOOK subscription.
 * - New fields:
 *   category: "admission" | "hsc" | "ssc"
 *   subcategory: "quick_preparation" | "guide" | "understanding" | "test_paper"
 */
export const homeCourses = [
  // -------------------- HSC --------------------
  {
    id: "bk-hsc-phy-uc-01",
    name: "উচ্চতর পদার্থবিজ্ঞান (১ম পত্র) — কনসেপ্ট সিরিজ",
    price: 249,
    validity: "90 দিন",
    desc: "ভেক্টর, গতি, নিউটন, কাজ-শক্তি — কনসেপ্ট + উদাহরণ + CQ/MCQ",
    image: "1.png",
    category: "hsc",
    subcategory: "understanding",
  },
  {
    id: "bk-hsc-phy-gd-01",
    name: "এইচএসসি পদার্থবিজ্ঞান গাইড — বোর্ড ফোকাস",
    price: 299,
    validity: "120 দিন",
    desc: "বোর্ড ট্রেন্ড + গুরুত্বপূর্ণ পয়েন্ট + সাধারণ ভুল + শর্ট টেকনিক",
    image: "2.png",
    category: "hsc",
    subcategory: "guide",
  },
  {
    id: "bk-hsc-phy-qp-01",
    name: "এইচএসসি পদার্থবিজ্ঞান — কুইক প্রিপারেশন (MCQ + CQ)",
    price: 199,
    validity: "60 দিন",
    desc: "শর্ট রিভিশন + নির্বাচিত MCQ/CQ + দ্রুত রুলস",
    image: "3.png",
    category: "hsc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-hsc-phy-tp-01",
    name: "এইচএসসি পদার্থবিজ্ঞান টেস্ট পেপার (সেট-১)",
    price: 179,
    validity: "60 দিন",
    desc: "পূর্ণাঙ্গ মডেল টেস্ট + সময় বণ্টন + ব্যাখ্যাসহ সমাধান",
    image: "4.png",
    category: "hsc",
    subcategory: "test_paper",
  },

  {
    id: "bk-hsc-chem-uc-01",
    name: "উচ্চতর রসায়ন (১ম পত্র) — বুঝে পড়ি সিরিজ",
    price: 239,
    validity: "90 দিন",
    desc: "পর্যায় সারণি, রাসায়নিক বন্ধন, স্টইকিওমেট্রি — কনসেপ্ট + CQ/MCQ",
    image: "4.png",
    category: "hsc",
    subcategory: "understanding",
  },
  {
    id: "bk-hsc-chem-gd-01",
    name: "এইচএসসি রসায়ন গাইড — সাজেশন + কমন টপিক",
    price: 289,
    validity: "120 দিন",
    desc: "সাজেশন, গুরুত্বপূর্ণ সূত্র, বোর্ড প্রশ্ন বিশ্লেষণ",
    image: "5.png",
    category: "hsc",
    subcategory: "guide",
  },
  {
    id: "bk-hsc-chem-qp-01",
    name: "এইচএসসি রসায়ন — কুইক প্রিপ (অর্গানিক + ইনঅর্গানিক)",
    price: 199,
    validity: "60 দিন",
    desc: "রিঅ্যাকশন চার্ট + শর্ট নোট + গুরুত্বপূর্ণ MCQ",
    image: "6.png",
    category: "hsc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-hsc-chem-tp-01",
    name: "এইচএসসি রসায়ন টেস্ট পেপার (সেট-১)",
    price: 179,
    validity: "60 দিন",
    desc: "মডেল টেস্ট + টপিকভিত্তিক প্রশ্ন + সমাধান",
    image: "6.png",
    category: "hsc",
    subcategory: "test_paper",
  },

  {
    id: "bk-hsc-math-uc-01",
    name: "উচ্চতর গণিত (১ম পত্র) — কনসেপ্ট ক্লিয়ার সিরিজ",
    price: 259,
    validity: "90 দিন",
    desc: "ফাংশন, সীমা, ডিফারেনশিয়েশন — কনসেপ্ট + উদাহরণ + CQ",
    image: "7.png", category: "hsc",
    subcategory: "understanding",
  },
  {
    id: "bk-hsc-math-gd-01",
    name: "উচ্চতর গণিত গাইড — শর্ট কাট + বোর্ড ট্রিক",
    price: 299,
    validity: "120 দিন",
    desc: "শর্ট টেকনিক + কমন প্রশ্ন + ভুল ধরার কৌশল",
    image: "8.png",
    category: "hsc",
    subcategory: "guide",
  },
  {
    id: "bk-hsc-math-qp-01",
    name: "উচ্চতর গণিত — কুইক প্রিপারেশন (ফর্মুলা + প্র্যাকটিস)",
    price: 199,
    validity: "60 দিন",
    desc: "ফর্মুলা ভল্ট + ৫০টি কমন সমস্যা + দ্রুত রিভিশন",
    image: "9.png",
    category: "hsc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-hsc-math-tp-01",
    name: "উচ্চতর গণিত টেস্ট পেপার (সেট-১)",
    price: 179,
    validity: "60 দিন",
    desc: "পূর্ণাঙ্গ মক + উত্তরসহ সমাধান",
    image: "10.png",
    category: "hsc",
    subcategory: "test_paper",
  },

  // -------------------- SSC --------------------
  {
    id: "bk-ssc-phy-uc-01",
    name: "এসএসসি পদার্থবিজ্ঞান — বুঝে পড়ি সিরিজ",
    price: 179,
    validity: "90 দিন",
    desc: "গতি, বল, কাজ-শক্তি — কনসেপ্ট + CQ/MCQ",
    image: "11.png",
    category: "ssc",
    subcategory: "understanding",
  },
  {
    id: "bk-ssc-phy-gd-01",
    name: "এসএসসি পদার্থবিজ্ঞান গাইড — সাজেশন + কমন",
    price: 199,
    validity: "120 দিন",
    desc: "সাজেশন, গুরুত্বপূর্ণ পয়েন্ট, বোর্ড ফোকাস",
    image: "12.png",
    category: "ssc",
    subcategory: "guide",
  },
  {
    id: "bk-ssc-phy-qp-01",
    name: "এসএসসি পদার্থবিজ্ঞান — কুইক প্রিপ (MCQ + CQ)",
    price: 149,
    validity: "60 দিন",
    desc: "দ্রুত রিভিশন + গুরুত্বপূর্ণ প্রশ্ন",
    image: "13.png",
    category: "ssc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-ssc-phy-tp-01",
    name: "এসএসসি পদার্থবিজ্ঞান টেস্ট পেপার (সেট-১)",
    price: 139,
    validity: "60 দিন",
    desc: "মডেল টেস্ট + সমাধান",
    image: "5.png",
    category: "ssc",
    subcategory: "test_paper",
  },

  {
    id: "bk-ssc-chem-uc-01",
    name: "এসএসসি রসায়ন — বুঝে পড়ি সিরিজ",
    price: 169,
    validity: "90 দিন",
    desc: "মৌল, যৌগ, রাসায়নিক বিক্রিয়া — কনসেপ্ট + CQ/MCQ",
    image: "8.png",
    category: "ssc",
    subcategory: "understanding",
  },
  {
    id: "bk-ssc-chem-gd-01",
    name: "এসএসসি রসায়ন গাইড — সাজেশন + সূত্র",
    price: 189,
    validity: "120 দিন",
    desc: "সাজেশন, গুরুত্বপূর্ণ সূত্র, কমন প্রশ্ন",
    image: "12.png",
    category: "ssc",
    subcategory: "guide",
  },
  {
    id: "bk-ssc-chem-qp-01",
    name: "এসএসসি রসায়ন — কুইক প্রিপারেশন",
    price: 149,
    validity: "60 দিন",
    desc: "শর্ট নোট + MCQ সেট",
    image: "2.png",
    category: "ssc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-ssc-chem-tp-01",
    name: "এসএসসি রসায়ন টেস্ট পেপার (সেট-১)",
    price: 139,
    validity: "60 দিন",
    desc: "মডেল টেস্ট + সমাধান",
    image: "9.png",
    category: "ssc",
    subcategory: "test_paper",
  },

  {
    id: "bk-ssc-math-uc-01",
    name: "এসএসসি গণিত — কনসেপ্ট সিরিজ",
    price: 179,
    validity: "90 দিন",
    desc: "বীজগণিত, জ্যামিতি, ত্রিকোণমিতি — কনসেপ্ট + উদাহরণ",
    image: "10.png",
    category: "ssc",
    subcategory: "understanding",
  },
  {
    id: "bk-ssc-math-gd-01",
    name: "এসএসসি গণিত গাইড — বোর্ড ফোকাস",
    price: 199,
    validity: "120 দিন",
    desc: "কমন প্রশ্ন + শর্ট টেকনিক + সাজেশন",
    image: "3.png",
    category: "ssc",
    subcategory: "guide",
  },
  {
    id: "bk-ssc-math-qp-01",
    name: "এসএসসি গণিত — কুইক প্রিপ (ফর্মুলা + MCQ)",
    price: 149,
    validity: "60 দিন",
    desc: "ফর্মুলা রিভিশন + MCQ সেট",
    image: "3.png",
    category: "ssc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-ssc-math-tp-01",
    name: "এসএসসি গণিত টেস্ট পেপার (সেট-১)",
    price: 139,
    validity: "60 দিন",
    desc: "মডেল টেস্ট + সমাধান",
    image: "6.png",
    category: "ssc",
    subcategory: "test_paper",
  },

  // -------------------- ADMISSION --------------------
  {
    id: "bk-adm-math-uc-01",
    name: "ভর্তি প্রস্তুতি গণিত — কনসেপ্ট + প্র্যাকটিস",
    price: 349,
    validity: "120 দিন",
    desc: "ইউনিট/গুচ্ছ ভর্তি: ম্যাথ বেসিক থেকে অ্যাডভান্স",
    image: "1.png",
    category: "admission",
    subcategory: "understanding",
  },
  {
    id: "bk-adm-sci-uc-01",
    name: "ভর্তি প্রস্তুতি সাধারণ বিজ্ঞান — কনসেপ্ট সিরিজ",
    price: 329,
    validity: "120 দিন",
    desc: "ফিজিক্স/কেমিস্ট্রি বেসিক + দ্রুত কনসেপ্ট",
    image: "11.png",
    category: "admission",
    subcategory: "understanding",
  },
  {
    id: "bk-adm-qp-01",
    name: "ভর্তি কুইক প্রিপারেশন — ৩০ দিনে রিভিশন",
    price: 299,
    validity: "60 দিন",
    desc: "শর্ট নোট + কমন MCQ + টাইম ট্রিক",
    image: "8.png", category: "admission",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-adm-gd-01",
    name: "ভর্তি গাইড — ইউনিট টার্গেট + পরিকল্পনা",
    price: 279,
    validity: "90 দিন",
    desc: "প্ল্যানিং, সিলেবাস ব্রেকডাউন, কমন ভুল",
    image: "7.png",
    category: "admission",
    subcategory: "guide",
  },
  {
    id: "bk-adm-tp-01",
    name: "ভর্তি টেস্ট পেপার — মডেল টেস্ট (সেট-১)",
    price: 299,
    validity: "90 দিন",
    desc: "পূর্ণাঙ্গ মক + বিশ্লেষণ + সমাধান",
    image: "5.png",
    category: "admission",
    subcategory: "test_paper",
  },
];

export const tutorialVideos = [
  {
    id: "v1",
    title: "How to use the app (Full tutorial)",
    duration: "3:45",
    channel: "Royal Scientific",
    thumb: "https://the-royal-scientific-publications.com/uploads/sliders/2024/01/24/Slider1706084072.webp",
    
  },
  {
    id: "v2",
    title: "How to take tests & see results",
    duration: "5:10",
    channel: "Royal Scientific",
    thumb:
      "https://the-royal-scientific-publications.com/uploads/category/2023/08/07/PEC_Exercise1691379436.jpg",
  },
];

/**
 * You said: "there will be books for subscription (no course)"
 * So this "myCourses" structure is not needed for the subscription feature.
 * Keeping export so other pages don't crash; you can remove later if unused.
 */
// mockData.js (replace your myCourses with this new structure)

// ✅ FIXED: Library data (My Library)
// Goal:
// - Bundle -> books -> chapters
// - Book -> chapters
// No subjects nesting, no chapters inside chapters.

// =========================
// ✅ REALISTIC (BD) MY LIBRARY
// =========================

export const myBooks = [
  // -------------------- HSC --------------------
  {
    id: "bk-hsc-phy-1st",
    title: "এইচএসসি পদার্থবিজ্ঞান — ১ম পত্র",
    // subtitle: "কনসেপ্ট + বোর্ড ফোকাস",
    thumb:
      "1.png",
    chapters: [
      { id: "hsc-phy1-ch1", title: "ভৌতজগৎ ও পরিমাপ", duration: "18 min" },
      { id: "hsc-phy1-ch2", title: "ভেক্টর", duration: "22 min" },
      { id: "hsc-phy1-ch3", title: "গতিবিদ্যা", duration: "25 min" },
      { id: "hsc-phy1-ch4", title: "নিউটনিয়ান বলবিদ্যা", duration: "28 min" },
      { id: "hsc-phy1-ch5", title: "কাজ, শক্তি ও ক্ষমতা", duration: "24 min" },
      { id: "hsc-phy1-ch6", title: "মহাকর্ষ ও অভিকর্ষ", duration: "26 min" },
      { id: "hsc-phy1-ch7", title: "পদার্থের গাঠনিক ধর্ম", duration: "20 min" },
      { id: "hsc-phy1-ch8", title: "পর্যাবৃত্ত গতি", duration: "23 min" },
      { id: "hsc-phy1-ch9", title: "তরঙ্গ", duration: "24 min" },
      { id: "hsc-phy1-ch10", title: "আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব", duration: "21 min" },
    ],
  },

  {
    id: "bk-hsc-phy-2nd",
    title: "এইচএসসি পদার্থবিজ্ঞান — ২য় পত্র",
    subtitle: "তড়িৎ + চৌম্বকত্ব + আলোকবিজ্ঞান",
    thumb:
      "2.png",
    chapters: [
      { id: "hsc-phy2-ch1", title: "তাপগতিবিদ্যা", duration: "24 min" },
      { id: "hsc-phy2-ch2", title: "স্থির তড়িৎ", duration: "26 min" },
      { id: "hsc-phy2-ch3", title: "চল তড়িৎ", duration: "25 min" },
      { id: "hsc-phy2-ch4", title: "তড়িৎ প্রবাহের চৌম্বক ক্রিয়া", duration: "22 min" },
      { id: "hsc-phy2-ch5", title: "তড়িতচৌম্বকীয় আবেশ", duration: "24 min" },
      { id: "hsc-phy2-ch6", title: "জ্যামিতিক আলোকবিজ্ঞান", duration: "21 min" },
      { id: "hsc-phy2-ch7", title: "ভৌত আলোকবিজ্ঞান", duration: "23 min" },
      { id: "hsc-phy2-ch8", title: "আধুনিক পদার্থবিজ্ঞানের সূচনা", duration: "20 min" },
      { id: "hsc-phy2-ch9", title: "পরমাণুর মডেল ও নিউক্লিয়ার পদার্থবিজ্ঞান", duration: "22 min" },
    ],
  },

  {
    id: "bk-hsc-chem-1st",
    title: "এইচএসসি রসায়ন — ১ম পত্র",
    subtitle: "গুণগত + পর্যায়বৃত্ত ধর্ম + পরিবর্তন",
    thumb:
      "3.png",
    // (অনলাইনে প্রচলিত লিস্টিং অনুযায়ী) :contentReference[oaicite:1]{index=1}
    chapters: [
      { id: "hsc-chem1-ch2", title: "গুণগত রসায়ন", duration: "26 min" },
      { id: "hsc-chem1-ch3", title: "মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন", duration: "28 min" },
      { id: "hsc-chem1-ch4", title: "রাসায়নিক পরিবর্তন", duration: "24 min" },
      { id: "hsc-chem1-ch5", title: "কর্মমুখী রসায়ন", duration: "20 min" },
    ],
  },

  {
    id: "bk-hsc-chem-2nd",
    title: "এইচএসসি রসায়ন — ২য় পত্র",
    subtitle: "পরিবেশ + জৈব + তড়িৎ রসায়ন",
    thumb:
      "6.png",
    chapters: [
      { id: "hsc-chem2-ch1", title: "পরিবেশ রসায়ন", duration: "20 min" },
      { id: "hsc-chem2-ch2", title: "জৈব রসায়ন", duration: "28 min" },
      { id: "hsc-chem2-ch3", title: "পরিমাণগত রসায়ন", duration: "26 min" },
      { id: "hsc-chem2-ch4", title: "তড়িৎ রসায়ন", duration: "24 min" },
      { id: "hsc-chem2-ch5", title: "অর্থনৈতিক রসায়ন", duration: "18 min" },
    ],
  },

  // -------------------- SSC --------------------
  {
    id: "bk-ssc-phy",
    title: "এসএসসি পদার্থবিজ্ঞান",
    // subtitle: "নবম-দশম — বোর্ড ভিত্তিক",
    thumb:
      "8.png",
    chapters: [
      { id: "ssc-phy-ch1", title: "ভৌত রাশি ও পরিমাপ", duration: "16 min" },
      { id: "ssc-phy-ch2", title: "গতি", duration: "18 min" },
      { id: "ssc-phy-ch3", title: "বল", duration: "20 min" },
      { id: "ssc-phy-ch4", title: "কাজ-শক্তি-ক্ষমতা", duration: "18 min" },
      { id: "ssc-phy-ch5", title: "পদার্থের অবস্থা ও চাপ", duration: "17 min" },
      { id: "ssc-phy-ch6", title: "বস্তুর উপর তাপের প্রভাব", duration: "20 min" },
      { id: "ssc-phy-ch7", title: "তরঙ্গ ও শব্দ", duration: "20 min" },
      { id: "ssc-phy-ch8", title: "আলোর প্রতিফলন", duration: "18 min" },
      { id: "ssc-phy-ch9", title: "আলোর প্রতিসরণ", duration: "19 min" },
      { id: "ssc-phy-ch10", title: "চোখ ও আলোকীয় যন্ত্র", duration: "18 min" },
      { id: "ssc-phy-ch11", title: "চল বিদ্যুৎ", duration: "20 min" },
      { id: "ssc-phy-ch12", title: "বিদ্যুতের চৌম্বক ক্রিয়া", duration: "18 min" },
      { id: "ssc-phy-ch13", title: "তেজস্ক্রিয়তা ও ইলেকট্রনিকস", duration: "19 min" },
    ],
  },

  {
    id: "bk-ssc-chem",
    title: "এসএসসি রসায়ন",
    // subtitle: "নবম-দশম — কনসেপ্ট + অনুশীলনী",
    thumb:
      "9.png",
    chapters: [
      { id: "ssc-chem-ch1", title: "রসায়নের ধারণা", duration: "16 min" },
      { id: "ssc-chem-ch2", title: "পদার্থের অবস্থা", duration: "18 min" },
      { id: "ssc-chem-ch3", title: "পদার্থের গঠন", duration: "18 min" },
      { id: "ssc-chem-ch4", title: "পর্যায় সারণি", duration: "20 min" },
      { id: "ssc-chem-ch5", title: "রাসায়নিক বন্ধন", duration: "22 min" },
      { id: "ssc-chem-ch6", title: "রাসায়নিক গণনা (মোল/ঘনমাত্রা)", duration: "22 min" },
      { id: "ssc-chem-ch7", title: "রাসায়নিক বিক্রিয়া", duration: "24 min" },
    ],
  },

  // -------------------- ADMISSION (Varsity) --------------------
  {
    id: "bk-adm-varsity-phy",
    title: "ভার্সিটি ভর্তি পদার্থবিজ্ঞান (MCQ + CQ)",
    subtitle: "ফিজিক্স বেসিক → এডভান্স (ইউনিট টার্গেট)",
    thumb:
      "10.png",
    chapters: [
      { id: "adm-phy-ch1", title: "ভেক্টর + কাইনেমেটিক্স রিভিশন", duration: "22 min" },
      { id: "adm-phy-ch2", title: "নিউটন + ঘর্ষণ (Problem Solving)", duration: "25 min" },
      { id: "adm-phy-ch3", title: "কাজ-শক্তি + মহাকর্ষ", duration: "22 min" },
      { id: "adm-phy-ch4", title: "তড়িৎ (Electrostatics) শর্ট ট্রিক", duration: "24 min" },
      { id: "adm-phy-ch5", title: "চল তড়িৎ + সার্কিট", duration: "23 min" },
    ],
  },

  {
    id: "bk-adm-varsity-chem",
    title: "ভার্সিটি ভর্তি রসায়ন (MCQ স্পেশাল)",
    subtitle: "জৈব + অজৈব + গণনা",
    thumb:
      "11.png",
    chapters: [
      { id: "adm-chem-ch1", title: "পর্যায় সারণি + রাসায়নিক বন্ধন (Fast Recap)", duration: "22 min" },
      { id: "adm-chem-ch2", title: "মোল/ঘনমাত্রা/স্টইকিওমেট্রি", duration: "26 min" },
      { id: "adm-chem-ch3", title: "জৈব রসায়ন বেসিক + রিঅ্যাকশন ম্যাপ", duration: "28 min" },
      { id: "adm-chem-ch4", title: "ইলেক্ট্রোকেমিস্ট্রি (Short Technique)", duration: "22 min" },
    ],
  },
];


export const myBundles = [
  {
    id: "bd-hsc-quick-prep",
    title: "HSC Quick Preparation Series",
    subtitle: "Physics + Chemistry (১ম/২য় পত্র) কম্বো",
    thumb:
      "5.png",
    books: [
      { id: "bk-hsc-phy-1st", title: "এইচএসসি পদার্থবিজ্ঞান — ১ম পত্র", thumb: myBooks.find(b => b.id === "bk-hsc-phy-1st")?.thumb, chapters: myBooks.find(b => b.id === "bk-hsc-phy-1st")?.chapters || [] },
      { id: "bk-hsc-phy-2nd", title: "এইচএসসি পদার্থবিজ্ঞান — ২য় পত্র", thumb: myBooks.find(b => b.id === "bk-hsc-phy-2nd")?.thumb, chapters: myBooks.find(b => b.id === "bk-hsc-phy-2nd")?.chapters || [] },
      { id: "bk-hsc-chem-1st", title: "এইচএসসি রসায়ন — ১ম পত্র", thumb: myBooks.find(b => b.id === "bk-hsc-chem-1st")?.thumb, chapters: myBooks.find(b => b.id === "bk-hsc-chem-1st")?.chapters || [] },
      { id: "bk-hsc-chem-2nd", title: "এইচএসসি রসায়ন — ২য় পত্র", thumb: myBooks.find(b => b.id === "bk-hsc-chem-2nd")?.thumb, chapters: myBooks.find(b => b.id === "bk-hsc-chem-2nd")?.chapters || [] },
    ],
  },

  {
    id: "bd-varsity-admission",
    title: "Varsity Admission Series",
    subtitle: "Physics + Chemistry (Unit Target)",
    thumb:
      "8.png",
    books: [
      { id: "bk-adm-varsity-phy", title: "ভার্সিটি ভর্তি পদার্থবিজ্ঞান (MCQ + CQ)", thumb: myBooks.find(b => b.id === "bk-adm-varsity-phy")?.thumb, chapters: myBooks.find(b => b.id === "bk-adm-varsity-phy")?.chapters || [] },
      { id: "bk-adm-varsity-chem", title: "ভার্সিটি ভর্তি রসায়ন (MCQ স্পেশাল)", thumb: myBooks.find(b => b.id === "bk-adm-varsity-chem")?.thumb, chapters: myBooks.find(b => b.id === "bk-adm-varsity-chem")?.chapters || [] },
    ],
  },
];


// =========================
// ✅ REALISTIC CQ (10 marks: 1+2+3+4)
// =========================

export const sampleCQ = [
  // -------- HSC Physics (Kinematics) --------
  {
    id: "cq-hsc-phy-kin-01",
    tag: "HSC | গতিবিদ্যা",
    q:
      "একটি গাড়ি স্থির অবস্থা থেকে সমত্বরণে চলতে শুরু করল। ৫ সেকেন্ডে গাড়িটির বেগ ২০ মি/সে হলো।",
    parts: [
      { key: "ক", q: "সমত্বরণ কাকে বলে? (১)" },
      { key: "খ", q: "v = u + at সমীকরণটি প্রমাণ/ব্যাখ্যা কর। (২)" },
      { key: "গ", q: "গাড়িটির ত্বরণ নির্ণয় কর। (৩)" },
      { key: "ঘ", q: "উক্ত সময়ে গাড়িটির অতিক্রান্ত দূরত্ব নির্ণয় কর। (৪)" },
    ],
    a:
      "ক (১): সমান সমান সময় অন্তরে বেগের পরিবর্তন সমান হলে সেই ত্বরণকে সমত্বরণ বলে।\n\n" +
      "খ (২): ত্বরণ a = (v − u)/t ⇒ v = u + at. এখানে u প্রাথমিক বেগ, v চূড়ান্ত বেগ, t সময়। সমত্বরণে বেগ সময়ের সাথে সরলরেখায় বাড়ে, তাই সম্পর্কটি প্রযোজ্য।\n\n" +
      "গ (৩): দেওয়া আছে u=0, v=20 m/s, t=5 s\n" +
      "v = u + at ⇒ 20 = 0 + a×5 ⇒ a = 4 m/s².\n" +
      "সুতরাং ত্বরণ = ৪ মি/সে²।\n\n" +
      "ঘ (৪): দূরত্ব s = ut + ½at²\n" +
      "⇒ s = 0×5 + ½×4×(5²)\n" +
      "⇒ s = 2×25 = 50 m.\n" +
      "অতএব গাড়িটি ৫০ মিটার পথ অতিক্রম করেছে।",
  },

  // -------- HSC Physics (Electricity) --------
  {
    id: "cq-hsc-phy-elec-01",
    tag: "HSC | স্থির তড়িৎ",
    q:
      "একটি বিন্দু চার্জ Q থেকে r দূরত্বে তড়িৎ ক্ষেত্রের মান E পাওয়া যায়। r দ্বিগুণ করলে ক্ষেত্র কীভাবে পরিবর্তিত হয়?",
    parts: [
      { key: "ক", q: "তড়িৎ ক্ষেত্রের তীব্রতা (Electric Field Intensity) কী? (১)" },
      { key: "খ", q: "কুলম্বের সূত্র লিখে ব্যাখ্যা কর। (২)" },
      { key: "গ", q: "E = kQ/r² সম্পর্কটি দেখাও। (৩)" },
      { key: "ঘ", q: "r দ্বিগুণ হলে E কত গুণ হবে? যুক্তিসহ। (৪)" },
    ],
    a:
      "ক (১): কোনো বিন্দুতে একক ধনাত্মক পরীক্ষণ চার্জের উপর ক্রিয় বলের মানকে ঐ বিন্দুর তড়িৎ ক্ষেত্রের তীব্রতা বলে। অর্থাৎ E = F/q₀.\n\n" +
      "খ (২): কুলম্বের সূত্র অনুযায়ী, দুটি বিন্দু চার্জ Q ও q এর মধ্যে বল F ∝ Qq এবং F ∝ 1/r²; সুতরাং F = k(Qq)/r², যেখানে k মাধ্যমনির্ভর ধ্রুবক।\n\n" +
      "গ (৩): পরীক্ষণ চার্জ q₀ বসালে বল F = k(Qq₀)/r².\n" +
      "তড়িৎ ক্ষেত্র E = F/q₀ ⇒ E = [k(Qq₀)/r²] / q₀ = kQ/r².\n\n" +
      "ঘ (৪): r → 2r হলে, E' = kQ/(2r)² = kQ/(4r²) = E/4.\n" +
      "অতএব দূরত্ব দ্বিগুণ হলে তড়িৎ ক্ষেত্র ৪ গুণ কমে (এক-চতুর্থাংশ হয়)।",
  },

  // -------- HSC Chemistry (Qualitative + Bonding) --------
  {
    id: "cq-hsc-chem-qual-01",
    tag: "HSC | গুণগত/বন্ধন",
    q:
      "একটি যৌগে পরমাণুগুলোর মধ্যে বন্ধন গঠিত হয় এবং যৌগটি পানিতে দ্রবীভূত হয়ে আয়ন দেয়।",
    parts: [
      { key: "ক", q: "আয়ন কাকে বলে? (১)" },
      { key: "খ", q: "আয়নিক বন্ধন কীভাবে গঠিত হয়—ব্যাখ্যা কর। (২)" },
      { key: "গ", q: "NaCl-এ কোন কণাগুলো আয়নে পরিণত হয় এবং কেন? (৩)" },
      { key: "ঘ", q: "আয়নিক যৌগের গলনাঙ্ক/বিদ্যুৎ পরিবাহিতা বেশি হওয়ার কারণ লিখ। (৪)" },
    ],
    a:
      "ক (১): ইলেকট্রন গ্রহণ বা ত্যাগ করে যে পরমাণু/অণু আধানযুক্ত কণায় পরিণত হয় তাকে আয়ন বলে।\n\n" +
      "খ (২): ধাতু পরমাণু ইলেকট্রন ত্যাগ করে ধনায়ন হয় এবং অধাতু ইলেকট্রন গ্রহণ করে ঋণায়ন হয়। ধনায়ন-ঋণায়নের মধ্যে তড়িৎস্থির আকর্ষণে আয়নিক বন্ধন গঠিত হয়।\n\n" +
      "গ (৩): Na একটি ইলেকট্রন ত্যাগ করে Na⁺ হয়, Cl একটি ইলেকট্রন গ্রহণ করে Cl⁻ হয়। কারণ Na-এর বহিঃস্ত স্তরে ১টি ইলেকট্রন (সহজে ত্যাগযোগ্য) এবং Cl-এর অক্টেট পূর্ণ করতে ১টি ইলেকট্রন দরকার।\n\n" +
      "ঘ (৪): আয়নিক স্ফটিকে বিপরীত আধানযুক্ত আয়নের মধ্যে আকর্ষণ খুব শক্তিশালী (ল্যাটিস এনার্জি বেশি), তাই গলনাঙ্ক বেশি। কঠিন অবস্থায় আয়ন স্থির থাকায় পরিবাহিতা কম, কিন্তু গলিত/জলীয় দ্রবণে আয়ন চলনশীল হয় বলে বিদ্যুৎ ভালো পরিবাহিত হয়।",
  },

  // -------- SSC Physics (Force + Motion) --------
  {
    id: "cq-ssc-phy-01",
    tag: "SSC | বল",
    q:
      "একটি ২ কেজি ভরের বস্তুর উপর ৬ নিউটন বল প্রয়োগ করা হলো।",
    parts: [
      { key: "ক", q: "বলের SI একক কী? (১)" },
      { key: "খ", q: "নিউটনের দ্বিতীয় সূত্র লিখ। (২)" },
      { key: "গ", q: "বস্তুর ত্বরণ নির্ণয় কর। (৩)" },
      { key: "ঘ", q: "যদি একই ত্বরণে ৪ সেকেন্ড চলে এবং শুরুতে স্থির থাকে—সরণ কত? (৪)" },
    ],
    a:
      "ক (১): বলের SI একক নিউটন (N)।\n\n" +
      "খ (২): নিউটনের দ্বিতীয় সূত্র: বল = ভর × ত্বরণ ⇒ F = ma.\n\n" +
      "গ (৩): F=6 N, m=2 kg ⇒ a = F/m = 6/2 = 3 m/s².\n\n" +
      "ঘ (৪): u=0, a=3, t=4\n" +
      "s = ut + ½at² = 0×4 + ½×3×(16) = 24 m.\n" +
      "অতএব সরণ ২৪ মিটার।",
  },

  // -------- Admission (Varsity) Physics-style CQ (still 10 marks) --------
  {
    id: "cq-adm-phy-01",
    tag: "Admission | সার্কিট",
    q:
      "একটি সার্কিটে ১২ V ব্যাটারির সাথে ৩Ω ও ৬Ω দুটি রোধ সিরিজে যুক্ত করা হলো।",
    parts: [
      { key: "ক", q: "রোধের একক কী? (১)" },
      { key: "খ", q: "সিরিজ সংযোগে সমতুল্য রোধের সূত্র লিখ। (২)" },
      { key: "গ", q: "সমতুল্য রোধ ও সার্কিটের তড়িৎধারা নির্ণয় কর। (৩)" },
      { key: "ঘ", q: "৬Ω রোধে বিভবপতন কত হবে? ব্যাখ্যা সহ। (৪)" },
    ],
    a:
      "ক (১): রোধের একক ওহম (Ω)।\n\n" +
      "খ (২): সিরিজ সংযোগে R_eq = R1 + R2 + ...\n\n" +
      "গ (৩): R_eq = 3 + 6 = 9 Ω\n" +
      "I = V/R = 12/9 = 4/3 A ≈ 1.33 A.\n\n" +
      "ঘ (৪): সিরিজে একই ধারা প্রবাহিত হয়। তাই ৬Ω রোধে বিভবপতন V6 = I×6 = (4/3)×6 = 8 V.\n" +
      "অতএব ৬Ω রোধে বিভবপতন ৮ ভোল্ট।",
  },
];

export const subscriptionYears = ["2024", "2025", "2026"];

/**
 * Preset bundle subscriptions shown on HOME carousel (clickable).
 * IMPORTANT: courseIds must match the `homeCourses` ids above.
 */
export const presetBundles = [
  {
    id: "pb-hsc-science-starter",
    name: "এইচএসসি বিজ্ঞান স্টার্টার বান্ডেল",
    courseIds: [
      "bk-hsc-phy-uc-01",
      "bk-hsc-chem-uc-01",
      "bk-hsc-math-uc-01",
    ],
  },
  {
    id: "pb-hsc-quick-revision",
    name: "এইচএসসি কুইক রিভিশন বান্ডেল",
    courseIds: [
      "bk-hsc-phy-qp-01",
      "bk-hsc-chem-qp-01",
      "bk-hsc-math-qp-01",
    ],
  },
  {
    id: "pb-ssc-complete",
    name: "এসএসসি কমপ্লিট প্রিপ বান্ডেল",
    courseIds: [
      "bk-ssc-phy-gd-01",
      "bk-ssc-chem-gd-01",
      "bk-ssc-math-gd-01",
    ],
  },
  {
    id: "pb-ssc-testpack",
    name: "এসএসসি টেস্ট পেপার বান্ডেল",
    courseIds: [
      "bk-ssc-phy-tp-01",
      "bk-ssc-chem-tp-01",
      "bk-ssc-math-tp-01",
    ],
  },
  {
    id: "pb-admission-combo",
    name: "ভর্তি ফুল কম্বো বান্ডেল",
    courseIds: [
      "bk-adm-math-uc-01",
      "bk-adm-qp-01",
      "bk-adm-tp-01",
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

export const boardAnalytics = {
  boards: ["Dhaka", "Chattogram", "Rajshahi"],
  years: ["2022", "2023", "2024", "2025"],
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
    explain: "এটি নিউটনের দ্বিতীয় গতিসূত্র — বল = ভর × ত্বরণ।",
  },
];