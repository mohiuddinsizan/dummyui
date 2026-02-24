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
    image: "https://www.shutterstock.com/shutterstock/photos/2301519911/display_1500/stock-photo-physics-equations-floating-in-the-background-hands-writing-in-notebooks-on-work-tables-2301519911.jpg",
    category: "hsc",
    subcategory: "understanding",
  },
  {
    id: "bk-hsc-phy-gd-01",
    name: "এইচএসসি পদার্থবিজ্ঞান গাইড — বোর্ড ফোকাস",
    price: 299,
    validity: "120 দিন",
    desc: "বোর্ড ট্রেন্ড + গুরুত্বপূর্ণ পয়েন্ট + সাধারণ ভুল + শর্ট টেকনিক",
    image: "https://www.physicstutoronline.co.uk/wp-content/uploads/2019/05/physics1.jpg",
    category: "hsc",
    subcategory: "guide",
  },
  {
    id: "bk-hsc-phy-qp-01",
    name: "এইচএসসি পদার্থবিজ্ঞান — কুইক প্রিপারেশন (MCQ + CQ)",
    price: 199,
    validity: "60 দিন",
    desc: "শর্ট রিভিশন + নির্বাচিত MCQ/CQ + দ্রুত রুলস",
    image: "https://www.physicstutoronline.co.uk/wp-content/uploads/2019/05/physics1.jpg",
    category: "hsc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-hsc-phy-tp-01",
    name: "এইচএসসি পদার্থবিজ্ঞান টেস্ট পেপার (সেট-১)",
    price: 179,
    validity: "60 দিন",
    desc: "পূর্ণাঙ্গ মডেল টেস্ট + সময় বণ্টন + ব্যাখ্যাসহ সমাধান",
    image: "https://www.shutterstock.com/shutterstock/photos/2301519911/display_1500/stock-photo-physics-equations-floating-in-the-background-hands-writing-in-notebooks-on-work-tables-2301519911.jpg",
    category: "hsc",
    subcategory: "test_paper",
  },

  {
    id: "bk-hsc-chem-uc-01",
    name: "উচ্চতর রসায়ন (১ম পত্র) — বুঝে পড়ি সিরিজ",
    price: 239,
    validity: "90 দিন",
    desc: "পর্যায় সারণি, রাসায়নিক বন্ধন, স্টইকিওমেট্রি — কনসেপ্ট + CQ/MCQ",
    image: "https://image.shutterstock.com/image-vector/chemistry-banner-outline-illustration-vector-260nw-1198049536.jpg",
    category: "hsc",
    subcategory: "understanding",
  },
  {
    id: "bk-hsc-chem-gd-01",
    name: "এইচএসসি রসায়ন গাইড — সাজেশন + কমন টপিক",
    price: 289,
    validity: "120 দিন",
    desc: "সাজেশন, গুরুত্বপূর্ণ সূত্র, বোর্ড প্রশ্ন বিশ্লেষণ",
    image: "https://images.ctfassets.net/szez98lehkfm/2g2qAwNo9g1sqNTMM8Dx09/a6255a7191b72e3024accbdd1ecec5ed/MyIC_Article_93347?w=730&h=410&fm=jpg&fit=fill",
    category: "hsc",
    subcategory: "guide",
  },
  {
    id: "bk-hsc-chem-qp-01",
    name: "এইচএসসি রসায়ন — কুইক প্রিপ (অর্গানিক + ইনঅর্গানিক)",
    price: 199,
    validity: "60 দিন",
    desc: "রিঅ্যাকশন চার্ট + শর্ট নোট + গুরুত্বপূর্ণ MCQ",
    image: "https://m.media-amazon.com/images/I/51L1PrGek6L._AC_UF1000,1000_QL80_.jpg",
    category: "hsc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-hsc-chem-tp-01",
    name: "এইচএসসি রসায়ন টেস্ট পেপার (সেট-১)",
    price: 179,
    validity: "60 দিন",
    desc: "মডেল টেস্ট + টপিকভিত্তিক প্রশ্ন + সমাধান",
    image: "https://image.shutterstock.com/image-vector/chemistry-banner-outline-illustration-vector-260nw-1198049536.jpg",
    category: "hsc",
    subcategory: "test_paper",
  },

  {
    id: "bk-hsc-math-uc-01",
    name: "উচ্চতর গণিত (১ম পত্র) — কনসেপ্ট ক্লিয়ার সিরিজ",
    price: 259,
    validity: "90 দিন",
    desc: "ফাংশন, সীমা, ডিফারেনশিয়েশন — কনসেপ্ট + উদাহরণ + CQ",
    image: "https://c8.alamy.com/comp/2SJF9N4/book-title-mathematics-2SJF9N4.jpg",
    category: "hsc",
    subcategory: "understanding",
  },
  {
    id: "bk-hsc-math-gd-01",
    name: "উচ্চতর গণিত গাইড — শর্ট কাট + বোর্ড ট্রিক",
    price: 299,
    validity: "120 দিন",
    desc: "শর্ট টেকনিক + কমন প্রশ্ন + ভুল ধরার কৌশল",
    image: "https://c8.alamy.com/comp/2SJF9N4/book-title-mathematics-2SJF9N4.jpg",
    category: "hsc",
    subcategory: "guide",
  },
  {
    id: "bk-hsc-math-qp-01",
    name: "উচ্চতর গণিত — কুইক প্রিপারেশন (ফর্মুলা + প্র্যাকটিস)",
    price: 199,
    validity: "60 দিন",
    desc: "ফর্মুলা ভল্ট + ৫০টি কমন সমস্যা + দ্রুত রিভিশন",
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=900&q=70",
    category: "hsc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-hsc-math-tp-01",
    name: "উচ্চতর গণিত টেস্ট পেপার (সেট-১)",
    price: 179,
    validity: "60 দিন",
    desc: "পূর্ণাঙ্গ মক + উত্তরসহ সমাধান",
    image: "https://c8.alamy.com/comp/2SJF9N4/book-title-mathematics-2SJF9N4.jpg",
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
    image: "https://www.physicstutoronline.co.uk/wp-content/uploads/2019/05/physics1.jpg",
    category: "ssc",
    subcategory: "understanding",
  },
  {
    id: "bk-ssc-phy-gd-01",
    name: "এসএসসি পদার্থবিজ্ঞান গাইড — সাজেশন + কমন",
    price: 199,
    validity: "120 দিন",
    desc: "সাজেশন, গুরুত্বপূর্ণ পয়েন্ট, বোর্ড ফোকাস",
    image: "https://www.shutterstock.com/shutterstock/photos/2301519911/display_1500/stock-photo-physics-equations-floating-in-the-background-hands-writing-in-notebooks-on-work-tables-2301519911.jpg",
    category: "ssc",
    subcategory: "guide",
  },
  {
    id: "bk-ssc-phy-qp-01",
    name: "এসএসসি পদার্থবিজ্ঞান — কুইক প্রিপ (MCQ + CQ)",
    price: 149,
    validity: "60 দিন",
    desc: "দ্রুত রিভিশন + গুরুত্বপূর্ণ প্রশ্ন",
    image: "https://www.physicstutoronline.co.uk/wp-content/uploads/2019/05/physics1.jpg",
    category: "ssc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-ssc-phy-tp-01",
    name: "এসএসসি পদার্থবিজ্ঞান টেস্ট পেপার (সেট-১)",
    price: 139,
    validity: "60 দিন",
    desc: "মডেল টেস্ট + সমাধান",
    image: "https://www.shutterstock.com/shutterstock/photos/2301519911/display_1500/stock-photo-physics-equations-floating-in-the-background-hands-writing-in-notebooks-on-work-tables-2301519911.jpg",
    category: "ssc",
    subcategory: "test_paper",
  },

  {
    id: "bk-ssc-chem-uc-01",
    name: "এসএসসি রসায়ন — বুঝে পড়ি সিরিজ",
    price: 169,
    validity: "90 দিন",
    desc: "মৌল, যৌগ, রাসায়নিক বিক্রিয়া — কনসেপ্ট + CQ/MCQ",
    image: "https://image.shutterstock.com/image-vector/chemistry-banner-outline-illustration-vector-260nw-1198049536.jpg",
    category: "ssc",
    subcategory: "understanding",
  },
  {
    id: "bk-ssc-chem-gd-01",
    name: "এসএসসি রসায়ন গাইড — সাজেশন + সূত্র",
    price: 189,
    validity: "120 দিন",
    desc: "সাজেশন, গুরুত্বপূর্ণ সূত্র, কমন প্রশ্ন",
    image: "https://images.ctfassets.net/szez98lehkfm/2g2qAwNo9g1sqNTMM8Dx09/a6255a7191b72e3024accbdd1ecec5ed/MyIC_Article_93347?w=730&h=410&fm=jpg&fit=fill",
    category: "ssc",
    subcategory: "guide",
  },
  {
    id: "bk-ssc-chem-qp-01",
    name: "এসএসসি রসায়ন — কুইক প্রিপারেশন",
    price: 149,
    validity: "60 দিন",
    desc: "শর্ট নোট + MCQ সেট",
    image: "https://m.media-amazon.com/images/I/51L1PrGek6L._AC_UF1000,1000_QL80_.jpg",
    category: "ssc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-ssc-chem-tp-01",
    name: "এসএসসি রসায়ন টেস্ট পেপার (সেট-১)",
    price: 139,
    validity: "60 দিন",
    desc: "মডেল টেস্ট + সমাধান",
    image: "https://image.shutterstock.com/image-vector/chemistry-banner-outline-illustration-vector-260nw-1198049536.jpg",
    category: "ssc",
    subcategory: "test_paper",
  },

  {
    id: "bk-ssc-math-uc-01",
    name: "এসএসসি গণিত — কনসেপ্ট সিরিজ",
    price: 179,
    validity: "90 দিন",
    desc: "বীজগণিত, জ্যামিতি, ত্রিকোণমিতি — কনসেপ্ট + উদাহরণ",
    image: "https://c8.alamy.com/comp/2SJF9N4/book-title-mathematics-2SJF9N4.jpg",
    category: "ssc",
    subcategory: "understanding",
  },
  {
    id: "bk-ssc-math-gd-01",
    name: "এসএসসি গণিত গাইড — বোর্ড ফোকাস",
    price: 199,
    validity: "120 দিন",
    desc: "কমন প্রশ্ন + শর্ট টেকনিক + সাজেশন",
    image: "https://c8.alamy.com/comp/2SJF9N4/book-title-mathematics-2SJF9N4.jpg",
    category: "ssc",
    subcategory: "guide",
  },
  {
    id: "bk-ssc-math-qp-01",
    name: "এসএসসি গণিত — কুইক প্রিপ (ফর্মুলা + MCQ)",
    price: 149,
    validity: "60 দিন",
    desc: "ফর্মুলা রিভিশন + MCQ সেট",
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=900&q=70",
    category: "ssc",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-ssc-math-tp-01",
    name: "এসএসসি গণিত টেস্ট পেপার (সেট-১)",
    price: 139,
    validity: "60 দিন",
    desc: "মডেল টেস্ট + সমাধান",
    image: "https://c8.alamy.com/comp/2SJF9N4/book-title-mathematics-2SJF9N4.jpg",
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
    image: "https://c8.alamy.com/comp/2SJF9N4/book-title-mathematics-2SJF9N4.jpg",
    category: "admission",
    subcategory: "understanding",
  },
  {
    id: "bk-adm-sci-uc-01",
    name: "ভর্তি প্রস্তুতি সাধারণ বিজ্ঞান — কনসেপ্ট সিরিজ",
    price: 329,
    validity: "120 দিন",
    desc: "ফিজিক্স/কেমিস্ট্রি বেসিক + দ্রুত কনসেপ্ট",
    image: "https://www.physicstutoronline.co.uk/wp-content/uploads/2019/05/physics1.jpg",
    category: "admission",
    subcategory: "understanding",
  },
  {
    id: "bk-adm-qp-01",
    name: "ভর্তি কুইক প্রিপারেশন — ৩০ দিনে রিভিশন",
    price: 299,
    validity: "60 দিন",
    desc: "শর্ট নোট + কমন MCQ + টাইম ট্রিক",
    image: "https://m.media-amazon.com/images/I/51L1PrGek6L._AC_UF1000,1000_QL80_.jpg",
    category: "admission",
    subcategory: "quick_preparation",
  },
  {
    id: "bk-adm-gd-01",
    name: "ভর্তি গাইড — ইউনিট টার্গেট + পরিকল্পনা",
    price: 279,
    validity: "90 দিন",
    desc: "প্ল্যানিং, সিলেবাস ব্রেকডাউন, কমন ভুল",
    image: "https://images.ctfassets.net/szez98lehkfm/2g2qAwNo9g1sqNTMM8Dx09/a6255a7191b72e3024accbdd1ecec5ed/MyIC_Article_93347?w=730&h=410&fm=jpg&fit=fill",
    category: "admission",
    subcategory: "guide",
  },
  {
    id: "bk-adm-tp-01",
    name: "ভর্তি টেস্ট পেপার — মডেল টেস্ট (সেট-১)",
    price: 299,
    validity: "90 দিন",
    desc: "পূর্ণাঙ্গ মক + বিশ্লেষণ + সমাধান",
    image: "https://image.shutterstock.com/image-vector/chemistry-banner-outline-illustration-vector-260nw-1198049536.jpg",
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
    thumb:
      "https://www.seoclerk.com/pics/000/951/134/f889272345a569d40799d29dca61d254.png",
  },
  {
    id: "v2",
    title: "How to take tests & see results",
    duration: "5:10",
    channel: "Royal Scientific",
    thumb: "https://i.ytimg.com/vi/Nii_fBGb0_c/maxresdefault.jpg",
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

export const myBooks = [
  {
    id: "b101",
    title: "HSC পদার্থবিজ্ঞান ১ম পত্র",
    subtitle: "কুইক প্রিপারেশন + টেস্ট পেপার",
    thumb: "https://www.physicstutoronline.co.uk/wp-content/uploads/2019/05/physics1.jpg",

    // ✅ Book -> chapters (flat)
    chapters: [
      { id: "b101-ch1", title: "ভেক্টর: যোগ-বিয়োগ", duration: "12 min" },
      { id: "b101-ch2", title: "ডট ও ক্রস প্রোডাক্ট", duration: "15 min" },
      { id: "b101-ch3", title: "নিউটনের সূত্র", duration: "18 min" },
      { id: "b101-ch4", title: "ঘর্ষণ ও কাজ", duration: "14 min" },
    ],
  },

  {
    id: "b102",
    title: "HSC উচ্চতর গণিত",
    subtitle: "আন্ডারস্ট্যান্ডিং সিরিজ",
    thumb: "https://c8.alamy.com/comp/2SJF9N4/book-title-mathematics-2SJF9N4.jpg",

    chapters: [
      { id: "b102-ch1", title: "Limit Concept", duration: "16 min" },
      { id: "b102-ch2", title: "Differentiation Rules", duration: "20 min" },
      { id: "b102-ch3", title: "Practice Set (Board Focus)", duration: "25 min" },
    ],
  },

  {
    id: "b103",
    title: "SSC রসায়ন গাইড",
    subtitle: "বোর্ড ভিত্তিক প্রস্তুতি",
    thumb: "https://image.shutterstock.com/image-vector/chemistry-banner-outline-illustration-vector-260nw-1198049536.jpg",

    chapters: [
      { id: "b103-ch1", title: "পর্যায় সারণি: ধাতু ও অধাতু", duration: "10 min" },
      { id: "b103-ch2", title: "রাসায়নিক বন্ধন", duration: "14 min" },
      { id: "b103-ch3", title: "রাসায়নিক বিক্রিয়া", duration: "12 min" },
    ],
  },
];

export const myBundles = [
  {
    id: "bd201",
    title: "HSC বিজ্ঞান ফুল বান্ডেল",
    subtitle: "ফিজিক্স + ম্যাথ (কম্বাইন্ড)",
    thumb: "https://m.media-amazon.com/images/I/51L1PrGek6L._AC_UF1000,1000_QL80_.jpg",

    // ✅ Bundle -> books (each book has chapters)
    books: [
      {
        id: "b101",
        title: "HSC পদার্থবিজ্ঞান ১ম পত্র",
        thumb: "https://www.physicstutoronline.co.uk/wp-content/uploads/2019/05/physics1.jpg",
        chapters: [
          { id: "b101-ch1", title: "ভেক্টর: যোগ-বিয়োগ", duration: "12 min" },
          { id: "b101-ch2", title: "ডট ও ক্রস প্রোডাক্ট", duration: "15 min" },
          { id: "b101-ch3", title: "নিউটনের সূত্র", duration: "18 min" },
          { id: "b101-ch4", title: "ঘর্ষণ ও কাজ", duration: "14 min" },
        ],
      },
      {
        id: "b102",
        title: "HSC উচ্চতর গণিত",
        thumb: "https://c8.alamy.com/comp/2SJF9N4/book-title-mathematics-2SJF9N4.jpg",
        chapters: [
          { id: "b102-ch1", title: "Limit Concept", duration: "16 min" },
          { id: "b102-ch2", title: "Differentiation Rules", duration: "20 min" },
          { id: "b102-ch3", title: "Practice Set (Board Focus)", duration: "25 min" },
        ],
      },
    ],
  },

  {
    id: "bd202",
    title: "SSC রিভিশন বান্ডেল",
    subtitle: "দ্রুত প্রস্তুতি + গাইড",
    thumb: "https://m.media-amazon.com/images/I/51L1PrGek6L._AC_UF1000,1000_QL80_.jpg",

    books: [
      {
        id: "b103",
        title: "SSC রসায়ন গাইড",
        thumb: "https://image.shutterstock.com/image-vector/chemistry-banner-outline-illustration-vector-260nw-1198049536.jpg",
        chapters: [
          { id: "b103-ch1", title: "পর্যায় সারণি: ধাতু ও অধাতু", duration: "10 min" },
          { id: "b103-ch2", title: "রাসায়নিক বন্ধন", duration: "14 min" },
          { id: "b103-ch3", title: "রাসায়নিক বিক্রিয়া", duration: "12 min" },
        ],
      },
    ],
  },
];

// ✅ Backward compatibility so old pages don't crash:
export const myCourses = myBooks;

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
    explain: "এটি নিউটনের দ্বিতীয় গতিসূত্র — বল = ভর × ত্বরণ।",
  },
];