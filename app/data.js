// China national statistics — figures as published by the National Bureau of
// Statistics of China (NBS) in the annual Statistical Communiqué and the
// 17 January 2025 press release on 2024 economic data. Provincial GDP is
// preliminary 2024 data from the provincial statistical communiqués
// (January–February 2025). See the Sources page in the site for details.
// Units: yuan (¥) unless stated. Growth rates are real (constant prices)
// unless labelled nominal.
window.CHINA_STATS = {
  meta: {
    country: "China",
    latestYear: 2024,
    updated: "February 2025 (2024 Statistical Communiqué)",
    currencyNote: "¥1 ≈ US$0.14 at the 2024 average rate of ¥7.12 per US$1 (NBS)."
  },

  // Headline indicators, latest year (2024).
  headline: [
    { key: "gdp", label: "Gross domestic product", value: "¥134.91 trillion", change: "+5.0% real", note: "2024, up from ¥129.43 trillion in 2023 (revised)" },
    { key: "gdpPc", label: "GDP per capita", value: "¥95,749", change: "+5.1% real", note: "About US$13,445 at the 2024 average exchange rate" },
    { key: "population", label: "Population (year-end)", value: "1,408.28 million", change: "−1.39 million", note: "Second straight annual decline; births 9.54m, deaths 10.93m" },
    { key: "cpi", label: "Consumer prices (CPI)", value: "+0.2%", change: "2024 average", note: "Core CPI excluding food and energy +0.5%" },
    { key: "unemployment", label: "Urban surveyed unemployment", value: "5.1%", change: "2024 average", note: "12.56 million new urban jobs created" },
    { key: "trade", label: "Goods trade total", value: "¥43.85 trillion", change: "+5.0%", note: "Exports ¥25.45tn, imports ¥18.39tn, surplus ¥7.06tn" },
    { key: "income", label: "Disposable income per capita", value: "¥41,314", change: "+5.3% nominal", note: "Urban ¥54,188; rural ¥23,119; median ¥34,707" },
    { key: "retail", label: "Retail sales of consumer goods", value: "¥48.79 trillion", change: "+3.5%", note: "Online retail sales ¥15.52 trillion (+7.2%)" }
  ],

  // GDP level (trillion yuan, current prices). 2020–2024 on the post-5th
  // economic census revision; 2015 shown on the earlier series for scale.
  gdpLevel: [
    { year: 2015, value: 70.25 },
    { year: 2020, value: 103.49 },
    { year: 2021, value: 117.38 },
    { year: 2022, value: 123.40 },
    { year: 2023, value: 129.43 },
    { year: 2024, value: 134.91 }
  ],

  // Real GDP growth, % per year.
  gdpGrowth: [
    { year: 2015, value: 6.9 }, { year: 2016, value: 6.8 },
    { year: 2017, value: 6.9 }, { year: 2018, value: 6.7 },
    { year: 2019, value: 6.0 }, { year: 2020, value: 2.2 },
    { year: 2021, value: 8.6 }, { year: 2022, value: 3.0 },
    { year: 2023, value: 5.2 }, { year: 2024, value: 5.0 }
  ],

  // CPI annual average change, %.
  cpi: [
    { year: 2015, value: 1.4 }, { year: 2016, value: 2.0 },
    { year: 2017, value: 1.6 }, { year: 2018, value: 2.1 },
    { year: 2019, value: 2.9 }, { year: 2020, value: 2.5 },
    { year: 2021, value: 0.9 }, { year: 2022, value: 2.0 },
    { year: 2023, value: 0.2 }, { year: 2024, value: 0.2 }
  ],

  // Producer prices (PPI) annual average change, %.
  ppi: [
    { year: 2015, value: -5.2 }, { year: 2016, value: -1.4 },
    { year: 2017, value: 6.3 }, { year: 2018, value: 3.5 },
    { year: 2019, value: -0.3 }, { year: 2020, value: -1.8 },
    { year: 2021, value: 8.1 }, { year: 2022, value: 4.1 },
    { year: 2023, value: -3.0 }, { year: 2024, value: -2.2 }
  ],

  // Year-end population, million.
  population: [
    { year: 2015, value: 1374.62 }, { year: 2016, value: 1382.71 },
    { year: 2017, value: 1390.08 }, { year: 2018, value: 1395.38 },
    { year: 2019, value: 1400.05 }, { year: 2020, value: 1411.78 },
    { year: 2021, value: 1412.60 }, { year: 2022, value: 1411.75 },
    { year: 2023, value: 1409.67 }, { year: 2024, value: 1408.28 }
  ],

  // Births, deaths and natural growth, 2024.
  vital: {
    births: { value: 9.54, unit: "million", rate: "6.77 per 1,000" },
    deaths: { value: 10.93, unit: "million", rate: "7.76 per 1,000" },
    natural: { value: -1.39, unit: "per 1,000", rate: "natural growth rate" },
    urbanisation: { value: 67.00, unit: "%", note: "share of population living in urban areas" },
    aged60: { value: 310.31, unit: "million", share: "22.0% of population" },
    aged65: { value: 220.23, unit: "million", share: "15.6% of population" },
    workingAge: { value: 857.98, unit: "million", share: "60.9% aged 16–59" }
  },

  // Disposable income per capita, yuan.
  income: [
    { year: 2015, national: 21966, urban: 31195, rural: 11422 },
    { year: 2016, national: 23821, urban: 33616, rural: 12363 },
    { year: 2017, national: 25974, urban: 36396, rural: 13432 },
    { year: 2018, national: 28228, urban: 39251, rural: 14617 },
    { year: 2019, national: 30733, urban: 42359, rural: 16021 },
    { year: 2020, national: 32189, urban: 43834, rural: 17131 },
    { year: 2021, national: 35128, urban: 47412, rural: 18931 },
    { year: 2022, national: 36883, urban: 49283, rural: 20133 },
    { year: 2023, national: 39218, urban: 51821, rural: 21691 },
    { year: 2024, national: 41314, urban: 54188, rural: 23119 }
  ],

  // Employment, 2024.
  employment: {
    newUrbanJobs: { value: 12.56, unit: "million", note: "up 120,000 on 2023" },
    surveyedRate: { value: 5.1, unit: "%", note: "annual average urban surveyed unemployment rate" },
    migrantWorkers: { value: 299.73, unit: "million", note: "total migrant workers, +0.7% on 2023" },
    monthlyIncomeMigrant: { value: 4961, unit: "yuan", note: "average monthly income of migrant workers, +3.8%" }
  },

  // Trade and the wider economy, 2024.
  economy: {
    exports: { value: 25.45, unit: "¥ trillion", change: "+7.1%" },
    imports: { value: 18.39, unit: "¥ trillion", change: "+2.3%" },
    surplus: { value: 7.06, unit: "¥ trillion", note: "goods trade surplus" },
    fixedInvestment: { value: 3.2, unit: "% growth", note: "fixed-asset investment (excluding rural households)" },
    industrialValueAdded: { value: 5.8, unit: "% growth", note: "value added of industrial enterprises above designated size" },
    servicesValueAdded: { value: 5.0, unit: "% growth", note: "value added of the service sector" },
    fiscalRevenue: { value: 21.97, unit: "¥ trillion", note: "general public budget revenue, +1.3%" },
    fiscalSpending: { value: 28.46, unit: "¥ trillion", note: "general public budget expenditure, +3.6%" },
    rdSpending: { value: 3.61, unit: "¥ trillion", note: "R&D spending, 2.68% of GDP" },
    grainOutput: { value: 706.50, unit: "million tonnes", note: "grain output, +1.6%; a record high" }
  },

  // Economy by year for the year selector (2020–2024).
  byYear: {
    2020: { gdp: 103.49, growth: 2.2, cpi: 2.5, population: 1411.78, income: 32189, unemployment: 5.6, trade: 32.16 },
    2021: { gdp: 117.38, growth: 8.6, cpi: 0.9, population: 1412.60, income: 35128, unemployment: 5.1, trade: 39.10 },
    2022: { gdp: 123.40, growth: 3.0, cpi: 2.0, population: 1411.75, income: 36883, unemployment: 5.6, trade: 42.07 },
    2023: { gdp: 129.43, growth: 5.2, cpi: 0.2, population: 1409.67, income: 39218, unemployment: 5.2, trade: 41.76 },
    2024: { gdp: 134.91, growth: 5.0, cpi: 0.2, population: 1408.28, income: 41314, unemployment: 5.1, trade: 43.85 }
  },

  // Society: education and health, 2024.
  society: [
    { label: "Life expectancy at birth", value: "79.0 years", note: "National Health Commission, 2024" },
    { label: "Gross enrolment, higher education", value: "60.8%", note: "Ministry of Education, 2024" },
    { label: "Nine-year compulsory education consolidation rate", value: "95.9%", note: "Ministry of Education, 2024" },
    { label: "Students in higher education", value: "49.77 million", note: "regular higher-education institutions, 2024" },
    { label: "Hospital beds per 1,000 people", value: "7.7", note: "National Health Commission, 2023" },
    { label: "Basic pension insurance participants", value: "1,073.84 million", note: "end-2024, Ministry of Human Resources and Social Security" }
  ],

  // Provincial GDP, 2024 preliminary (¥ billion, real growth %).
  // Source: provincial statistical communiqués, Jan–Feb 2025, via NBS.
  provinces: [
    { name: "Guangdong", region: "East", gdp: 14163.4, growth: 3.5 },
    { name: "Jiangsu", region: "East", gdp: 13700.8, growth: 5.8 },
    { name: "Shandong", region: "East", gdp: 9856.6, growth: 5.7 },
    { name: "Zhejiang", region: "East", gdp: 9013.1, growth: 5.5 },
    { name: "Sichuan", region: "West", gdp: 6469.7, growth: 5.7 },
    { name: "Henan", region: "Central", gdp: 6359.0, growth: 5.1 },
    { name: "Hubei", region: "Central", gdp: 6001.3, growth: 5.8 },
    { name: "Fujian", region: "East", gdp: 5776.1, growth: 5.5 },
    { name: "Shanghai", region: "East", gdp: 5392.7, growth: 5.0 },
    { name: "Hunan", region: "Central", gdp: 5323.1, growth: 4.8 },
    { name: "Anhui", region: "Central", gdp: 5062.5, growth: 5.8 },
    { name: "Beijing", region: "East", gdp: 4984.3, growth: 5.2 },
    { name: "Hebei", region: "East", gdp: 4752.7, growth: 5.4 },
    { name: "Shaanxi", region: "West", gdp: 3553.9, growth: 5.3 },
    { name: "Jiangxi", region: "Central", gdp: 3420.3, growth: 5.1 },
    { name: "Liaoning", region: "Northeast", gdp: 3261.3, growth: 5.1 },
    { name: "Chongqing", region: "West", gdp: 3219.3, growth: 5.7 },
    { name: "Yunnan", region: "West", gdp: 3153.4, growth: 3.3 },
    { name: "Guangxi", region: "West", gdp: 2864.9, growth: 4.2 },
    { name: "Inner Mongolia", region: "West", gdp: 2631.5, growth: 5.8 },
    { name: "Shanxi", region: "Central", gdp: 2549.5, growth: 2.3 },
    { name: "Guizhou", region: "West", gdp: 2266.7, growth: 5.3 },
    { name: "Xinjiang", region: "West", gdp: 2053.4, growth: 6.1 },
    { name: "Tianjin", region: "East", gdp: 1802.4, growth: 5.1 },
    { name: "Heilongjiang", region: "Northeast", gdp: 1647.7, growth: 3.2 },
    { name: "Jilin", region: "Northeast", gdp: 1436.1, growth: 4.3 },
    { name: "Gansu", region: "West", gdp: 1300.3, growth: 5.8 },
    { name: "Hainan", region: "East", gdp: 793.6, growth: 3.7 },
    { name: "Ningxia", region: "West", gdp: 550.3, growth: 5.4 },
    { name: "Qinghai", region: "West", gdp: 395.1, growth: 2.7 },
    { name: "Tibet", region: "West", gdp: 276.5, growth: 6.3 }
  ]
};
