// China Data Atlas — page router and renderers. Hash routes:
// #/overview #/economy #/population #/employment #/regions #/sources
(function () {
  "use strict";

  var S = window.CHINA_STATS;
  var C = window.ChinaCharts;
  var root = document.getElementById("page");
  var nav = document.getElementById("main-nav");

  var ROUTES = [
    { hash: "#/overview", label: "Overview" },
    { hash: "#/economy", label: "Economy" },
    { hash: "#/population", label: "Population & Society" },
    { hash: "#/employment", label: "Employment & Income" },
    { hash: "#/regions", label: "Regions" },
    { hash: "#/sources", label: "Data & Sources" }
  ];

  // Build the top navigation once.
  ROUTES.forEach(function (r) {
    var a = document.createElement("a");
    a.href = r.hash;
    a.textContent = r.label;
    a.dataset.route = r.hash;
    nav.appendChild(a);
  });

  function setActiveNav(hash) {
    Array.prototype.forEach.call(nav.children, function (a) {
      a.classList.toggle("active", a.dataset.route === hash);
    });
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function kpiCard(item) {
    var down = item.change && item.change.charAt(0) === "−";
    return '<div class="kpi"><div class="kpi-label">' + esc(item.label) + "</div>" +
      '<div class="kpi-value">' + esc(item.value) + "</div>" +
      '<div class="kpi-change' + (down ? " down" : "") + '">' + esc(item.change) + "</div>" +
      '<div class="kpi-note">' + esc(item.note) + "</div></div>";
  }

  function pageHead(title, intro, updated) {
    return '<div class="page-head"><h1>' + esc(title) + "</h1><p>" + esc(intro) + "</p>" +
      (updated ? '<p class="updated">' + esc(updated) + "</p>" : "") + "</div>";
  }

  function sourceLine() {
    return '<p class="chart-note">Source: National Bureau of Statistics of China, ' +
      "2024 Statistical Communiqué (28 February 2025) and the NBS press release " +
      "of 17 January 2025. Figures are preliminary where the communiqué says so.</p>";
  }

  /* ---------------- Overview ---------------- */
  function renderOverview() {
    var html = pageHead(
      "China in numbers — 2024",
      "The headline figures for the world's second-largest economy, from the " +
      "National Bureau of Statistics of China. Pick a section above to dig into " +
      "the economy, population, jobs and the provinces.",
      "Latest data: full year 2024, published January–February 2025."
    );
    html += '<div class="kpi-grid">' + S.headline.map(kpiCard).join("") + "</div>";
    html += '<div class="section"><h2>Growth and people</h2>' +
      '<p class="lede">Real GDP grew 5.0% in 2024. The population fell for a ' +
      "second year, while the economy passed ¥134 trillion.</p>" +
      '<div class="chart-grid">' +
      '<div class="card"><div id="chart-growth"></div></div>' +
      '<div class="card"><div id="chart-population"></div></div>' +
      "</div>" + sourceLine() + "</div>";
    html += '<div class="section"><h2>2024 at a glance</h2>' +
      '<div class="table-wrap"><table class="data"><caption>Key indicators, 2024</caption>' +
      "<thead><tr><th>Indicator</th><th>Value</th><th>Change on 2023</th></tr></thead><tbody>" +
      "<tr><td>GDP</td><td class=\"num\">¥134.91 trillion</td><td class=\"num\">+5.0% real</td></tr>" +
      "<tr><td>GDP per capita</td><td class=\"num\">¥95,749</td><td class=\"num\">+5.1% real</td></tr>" +
      "<tr><td>Consumer prices (CPI)</td><td class=\"num\">+0.2%</td><td class=\"num\">same as 2023</td></tr>" +
      "<tr><td>Producer prices (PPI)</td><td class=\"num\">−2.2%</td><td class=\"num\">from −3.0% in 2023</td></tr>" +
      "<tr><td>Goods trade</td><td class=\"num\">¥43.85 trillion</td><td class=\"num\">+5.0%</td></tr>" +
      "<tr><td>Retail sales</td><td class=\"num\">¥48.79 trillion</td><td class=\"num\">+3.5%</td></tr>" +
      "<tr><td>Fixed-asset investment</td><td class=\"num\">—</td><td class=\"num\">+3.2%</td></tr>" +
      "<tr><td>Disposable income per capita</td><td class=\"num\">¥41,314</td><td class=\"num\">+5.3% nominal</td></tr>" +
      "<tr><td>Urban surveyed unemployment</td><td class=\"num\">5.1%</td><td class=\"num\">from 5.2% in 2023</td></tr>" +
      "<tr><td>Population (year-end)</td><td class=\"num\">1,408.28 million</td><td class=\"num\">−1.39 million</td></tr>" +
      "</tbody></table></div>" + sourceLine() + "</div>";
    html += '<div class="callout"><p><strong>How to read this site.</strong> Every figure ' +
      "names its source and year. Growth rates are real (price-adjusted) unless " +
      "labelled nominal. Provincial GDP is preliminary 2024 data from the " +
      "provincial statistical communiqués.</p></div>";
    root.innerHTML = html;
    C.lineChart("chart-growth", S.gdpGrowth, { unit: "%", title: "Real GDP growth, 2015–2024 (%)", showValues: false });
    C.barChart("chart-population", S.population, { unit: "m", title: "Year-end population, 2015–2024 (million)" });
  }

  /* ---------------- Economy ---------------- */
  var econTab = "growth";
  var econYear = 2024;

  function renderEconomy() {
    var y = S.byYear[econYear];
    var html = pageHead(
      "Economy",
      "Output, prices, trade and public finance. Use the year selector to see " +
      "each year from 2020 to 2024, and the tabs to switch between growth, " +
      "prices and trade.",
      "Source: National Bureau of Statistics of China."
    );
    html += '<div class="controls"><label for="year-select">Year</label>' +
      '<select id="year-select">' +
      [2020, 2021, 2022, 2023, 2024].map(function (yr) {
        return '<option value="' + yr + '"' + (yr === econYear ? " selected" : "") + ">" + yr + "</option>";
      }).join("") + "</select>" +
      '<span id="year-summary" class="method-note"></span></div>';
    html += '<div class="kpi-grid" id="year-kpis"></div>';
    html += '<div class="section"><div class="tabs" role="tablist">' +
      '<button class="tab-btn' + (econTab === "growth" ? " active" : "") + '" data-tab="growth">Growth &amp; output</button>' +
      '<button class="tab-btn' + (econTab === "prices" ? " active" : "") + '" data-tab="prices">Prices</button>' +
      '<button class="tab-btn' + (econTab === "trade" ? " active" : "") + '" data-tab="trade">Trade &amp; fiscal</button>' +
      '</div><div id="econ-tab-body"></div></div>';
    root.innerHTML = html;

    document.getElementById("year-select").addEventListener("change", function (e) {
      econYear = parseInt(e.target.value, 10);
      renderYearKpis();
    });
    Array.prototype.forEach.call(root.querySelectorAll(".tab-btn"), function (btn) {
      btn.addEventListener("click", function () {
        econTab = btn.dataset.tab;
        renderEconomy();
      });
    });
    renderYearKpis();
    renderEconTab();
  }

  function renderYearKpis() {
    var y = S.byYear[econYear];
    var host = document.getElementById("year-kpis");
    var summary = document.getElementById("year-summary");
    if (!host) return;
    var cards = [
      { label: "GDP", value: "¥" + y.gdp.toFixed(2) + " trillion", change: "+" + y.growth.toFixed(1) + "% real", note: "Gross domestic product, " + econYear },
      { label: "CPI", value: "+" + y.cpi.toFixed(1) + "%", change: "consumer prices", note: "Annual average change, " + econYear },
      { label: "Population", value: y.population.toLocaleString("en-US") + "m", change: "year-end", note: "Total population, " + econYear },
      { label: "Disposable income", value: "¥" + y.income.toLocaleString("en-US"), change: "per capita", note: "Disposable income per capita, " + econYear },
      { label: "Goods trade", value: "¥" + y.trade.toFixed(2) + " trillion", change: "total trade", note: "Exports plus imports, " + econYear },
      { label: "Unemployment", value: y.unemployment.toFixed(1) + "%", change: "urban surveyed", note: "Annual average, " + econYear }
    ];
    host.innerHTML = cards.map(kpiCard).join("");
    if (summary) {
      summary.textContent = econYear === 2024
        ? "2024: the economy grew 5.0% and passed ¥134 trillion for the first time."
        : econYear + ": real GDP grew " + y.growth.toFixed(1) + "% to ¥" + y.gdp.toFixed(2) + " trillion.";
    }
  }

  function renderEconTab() {
    var body = document.getElementById("econ-tab-body");
    if (!body) return;
    if (econTab === "growth") {
      body.innerHTML =
        '<div class="chart-grid">' +
        '<div class="card"><div id="chart-gdp-level"></div></div>' +
        '<div class="card"><div id="chart-gdp-growth"></div></div>' +
        "</div>" + sourceLine() +
        '<div class="section"><h2>What drove growth in 2024</h2>' +
        '<div class="stat-list">' +
        statItem("Industrial value added", "+5.8%", "enterprises above designated size") +
        statItem("Services value added", "+5.0%", "share of GDP: 56.7%") +
        statItem("Manufacturing value added", "+6.1%", "high-tech manufacturing +8.9%") +
        statItem("Grain output", "706.50m tonnes", "record high, +1.6% on 2023") +
        "</div></div>" +
        '<p class="chart-note">Source: NBS, Statistical Communiqué 2024. ' +
        "GDP levels for 2020–2024 are on the post-5th economic census revision; " +
        "2015 is shown on the earlier series for scale.</p>";
      C.barChart("chart-gdp-level", S.gdpLevel, { unit: "¥tn", title: "GDP level, selected years (¥ trillion)" });
      C.lineChart("chart-gdp-growth", S.gdpGrowth, { unit: "%", title: "Real GDP growth, 2015–2024 (%)", showValues: true });
    } else if (econTab === "prices") {
      body.innerHTML =
        '<div class="chart-grid">' +
        '<div class="card"><div id="chart-cpi"></div></div>' +
        '<div class="card"><div id="chart-ppi"></div></div>' +
        "</div>" + sourceLine() +
        '<div class="callout teal"><p><strong>Prices were flat in 2024.</strong> Consumer prices ' +
        "rose just 0.2% — the same as 2023 — while factory-gate prices fell 2.2%, " +
        "a second year of producer deflation as industrial overcapacity weighed " +
        "on prices.</p></div>";
      C.lineChart("chart-cpi", S.cpi, { unit: "%", title: "Consumer prices (CPI), annual change 2015–2024 (%)", showValues: true });
      C.lineChart("chart-ppi", S.ppi, { unit: "%", title: "Producer prices (PPI), annual change 2015–2024 (%)", showValues: true });
    } else {
      var e = S.economy;
      body.innerHTML =
        '<div class="stat-list">' +
        statItem("Exports of goods", "¥" + e.exports.value + " trillion", e.exports.change + " on 2023") +
        statItem("Imports of goods", "¥" + e.imports.value + " trillion", e.imports.change + " on 2023") +
        statItem("Goods trade surplus", "¥" + e.surplus.value + " trillion", "largest on record in yuan terms") +
        statItem("General public budget revenue", "¥" + e.fiscalRevenue.value + " trillion", e.fiscalRevenue.note) +
        statItem("General public budget expenditure", "¥" + e.fiscalSpending.value + " trillion", e.fiscalSpending.note) +
        statItem("R&D spending", "¥" + e.rdSpending.value + " trillion", e.rdSpending.note) +
        "</div>" +
        '<div class="section"><h2>Trade partners and structure</h2>' +
        '<div class="table-wrap"><table class="data"><caption>Goods trade, 2024</caption>' +
        "<thead><tr><th>Flow</th><th>Value (¥ trillion)</th><th>Change</th></tr></thead><tbody>" +
        "<tr><td>Exports</td><td class=\"num\">25.45</td><td class=\"num\">+7.1%</td></tr>" +
        "<tr><td>Imports</td><td class=\"num\">18.39</td><td class=\"num\">+2.3%</td></tr>" +
        "<tr><td>Total</td><td class=\"num\">43.85</td><td class=\"num\">+5.0%</td></tr>" +
        "<tr><td>Surplus</td><td class=\"num\">7.06</td><td class=\"num\">—</td></tr>" +
        "</tbody></table></div>" + sourceLine() + "</div>";
    }
  }

  function statItem(label, value, note) {
    return '<div class="stat-item"><div><div class="s-label">' + esc(label) + "</div>" +
      '<div class="s-note">' + esc(note) + '</div></div><div class="s-value">' + esc(value) + "</div></div>";
  }

  /* ---------------- Population & society ---------------- */
  function renderPopulation() {
    var v = S.vital;
    var html = pageHead(
      "Population & society",
      "China's population peaked in 2021 and has fallen for three years. " +
      "The country is ageing fast: more than one in five people is now 60 or older.",
      "Source: National Bureau of Statistics of China, 2024 Statistical Communiqué."
    );
    html += '<div class="kpi-grid">' +
      kpiCard({ label: "Population (end-2024)", value: "1,408.28m", change: "−1.39 million", note: "Down from 1,409.67m at end-2023" }) +
      kpiCard({ label: "Births in 2024", value: "9.54m", change: "6.77 per 1,000", note: "Birth rate, up from 6.39 in 2023" }) +
      kpiCard({ label: "Urbanisation rate", value: "67.00%", change: "+0.84 pts", note: "Share of population in urban areas" }) +
      kpiCard({ label: "Aged 65 and over", value: "220.23m", change: "15.6% of population", note: "Aged 60 and over: 310.31m (22.0%)" }) +
      "</div>";
    html += '<div class="section"><div class="card"><div id="chart-pop-trend"></div></div>' +
      sourceLine() + "</div>";
    html += '<div class="section"><h2>Births, deaths and ageing</h2>' +
      '<div class="stat-list">' +
      statItem("Births", "9.54 million", "birth rate 6.77 per 1,000") +
      statItem("Deaths", "10.93 million", "death rate 7.76 per 1,000") +
      statItem("Natural growth", "−1.39 per 1,000", "third straight year of natural decline") +
      statItem("Working-age population (16–59)", "857.98 million", "60.9% of the population") +
      statItem("Aged 60 and over", "310.31 million", "22.0% of the population") +
      statItem("Aged 65 and over", "220.23 million", "15.6% of the population") +
      "</div></div>";
    html += '<div class="section"><h2>Education and health</h2>' +
      '<div class="stat-list">' +
      S.society.map(function (s) { return statItem(s.label, s.value, s.note); }).join("") +
      "</div>" + sourceLine() + "</div>";
    root.innerHTML = html;
    C.lineChart("chart-pop-trend", S.population, { unit: "m", title: "Year-end population, 2015–2024 (million)", showValues: false });
  }

  /* ---------------- Employment & income ---------------- */
  var incomeSeries = "national";

  function renderEmployment() {
    var em = S.employment;
    var html = pageHead(
      "Employment & income",
      "Jobs, pay and the urban–rural income gap. Incomes kept rising in 2024: " +
      "rural incomes grew faster than urban incomes for a fifteenth straight year.",
      "Source: National Bureau of Statistics of China, 2024."
    );
    html += '<div class="kpi-grid">' +
      kpiCard({ label: "Disposable income per capita", value: "¥41,314", change: "+5.3% nominal", note: "Real growth +5.1% after prices" }) +
      kpiCard({ label: "Median disposable income", value: "¥34,707", change: "+5.1% nominal", note: "Half of residents earn less than this" }) +
      kpiCard({ label: "New urban jobs", value: "12.56m", change: "+120,000 on 2023", note: "Above the target of 12 million" }) +
      kpiCard({ label: "Migrant workers", value: "299.73m", change: "+0.7%", note: "Average monthly income ¥4,961" }) +
      "</div>";
    html += '<div class="section"><h2>Income trend</h2>' +
      '<div class="controls"><span class="chip-row" id="income-chips">' +
      '<button class="chip' + (incomeSeries === "national" ? " active" : "") + '" data-series="national">National</button>' +
      '<button class="chip' + (incomeSeries === "urban" ? " active" : "") + '" data-series="urban">Urban</button>' +
      '<button class="chip' + (incomeSeries === "rural" ? " active" : "") + '" data-series="rural">Rural</button>' +
      "</span></div>" +
      '<div class="card"><div id="chart-income"></div></div>' + sourceLine() + "</div>";
    html += '<div class="section"><h2>Income by year</h2>' +
      '<div class="table-wrap"><table class="data"><caption>Disposable income per capita (¥)</caption>' +
      "<thead><tr><th>Year</th><th>National</th><th>Urban</th><th>Rural</th><th>Urban ÷ rural</th></tr></thead><tbody>" +
      S.income.map(function (d) {
        return "<tr><td>" + d.year + "</td><td class=\"num\">" + d.national.toLocaleString("en-US") +
          "</td><td class=\"num\">" + d.urban.toLocaleString("en-US") +
          "</td><td class=\"num\">" + d.rural.toLocaleString("en-US") +
          "</td><td class=\"num\">" + (d.urban / d.rural).toFixed(2) + "×</td></tr>";
      }).join("") + "</tbody></table></div>" + sourceLine() + "</div>";
    html += '<div class="callout teal"><p><strong>The urban–rural gap is narrowing.</strong> ' +
      "In 2024 urban disposable income was 2.34 times rural income, down from 2.39 " +
      "times in 2023 and 2.73 times in 2015 — rural incomes have grown faster " +
      "than urban incomes every year since 2010.</p></div>";
    root.innerHTML = html;
    Array.prototype.forEach.call(root.querySelectorAll("#income-chips .chip"), function (btn) {
      btn.addEventListener("click", function () {
        incomeSeries = btn.dataset.series;
        renderEmployment();
      });
    });
    var series = S.income.map(function (d) {
      return { year: d.year, value: d[incomeSeries] };
    });
    var label = incomeSeries === "national" ? "National" : incomeSeries === "urban" ? "Urban" : "Rural";
    C.lineChart("chart-income", series, { unit: "¥", title: label + " disposable income per capita, 2015–2024 (¥)", showValues: false });
  }

  /* ---------------- Regions ---------------- */
  var regionFilter = "All";
  var regionQuery = "";
  var sortKey = "gdp";
  var sortDir = -1;

  function renderRegions() {
    var html = pageHead(
      "Regions",
      "All 31 provincial-level regions ranked by GDP in 2024. Sort any column, " +
      "filter by region of the country, or search for a province by name.",
      "Source: provincial statistical communiqués, January–February 2025 (preliminary)."
    );
    html += '<div class="section"><div class="card"><div id="chart-top10"></div></div>' +
      '<p class="chart-note">Guangdong has led the provinces for 36 straight years. ' +
      "The top four provinces together make up 34.9% of national GDP.</p></div>";
    html += '<div class="section"><h2>Provincial table, 2024</h2>' +
      '<div class="controls">' +
      '<label for="region-search">Search</label>' +
      '<input type="search" id="region-search" placeholder="Type a province name…" value="' + esc(regionQuery) + '">' +
      '<span class="chip-row" id="region-chips">' +
      ["All", "East", "Central", "West", "Northeast"].map(function (r) {
        return '<button class="chip' + (regionFilter === r ? " active" : "") + '" data-region="' + r + '">' + r + "</button>";
      }).join("") + "</span></div>" +
      '<div class="table-wrap"><table class="data"><caption id="region-caption"></caption>' +
      "<thead><tr>" +
      '<th><button data-sort="name">Province ↕</button></th>' +
      '<th><button data-sort="region">Region ↕</button></th>' +
      '<th><button data-sort="gdp">GDP (¥bn) ↕</button></th>' +
      '<th><button data-sort="share">Share of national GDP ↕</button></th>' +
      '<th><button data-sort="growth">Real growth ↕</button></th>' +
      "</tr></thead><tbody id=\"region-body\"></tbody></table></div>" +
      '<p class="chart-note">GDP is preliminary 2024 data at current prices. ' +
      "Growth is real (constant prices). Hong Kong, Macao and Taiwan are not " +
      "included in the 31-region table. Shares are of mainland GDP (¥134.91 trillion).</p></div>";
    root.innerHTML = html;

    var search = document.getElementById("region-search");
    search.addEventListener("input", function () { regionQuery = search.value; renderRegionRows(); });
    Array.prototype.forEach.call(root.querySelectorAll("#region-chips .chip"), function (btn) {
      btn.addEventListener("click", function () {
        regionFilter = btn.dataset.region;
        renderRegions();
      });
    });
    Array.prototype.forEach.call(root.querySelectorAll("th button[data-sort]"), function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.dataset.sort;
        if (sortKey === k) { sortDir = -sortDir; } else { sortKey = k; sortDir = k === "name" || k === "region" ? 1 : -1; }
        renderRegionRows();
      });
    });
    C.hbarChart("chart-top10", S.provinces.slice(0, 10).map(function (p) {
      return { label: p.name, value: p.gdp };
    }), { unit: "¥bn", title: "Top 10 provinces by GDP, 2024 (¥ billion)" });
    renderRegionRows();
  }

  function renderRegionRows() {
    var body = document.getElementById("region-body");
    var caption = document.getElementById("region-caption");
    if (!body) return;
    var rows = S.provinces.filter(function (p) {
      if (regionFilter !== "All" && p.region !== regionFilter) return false;
      if (regionQuery && p.name.toLowerCase().indexOf(regionQuery.trim().toLowerCase()) === -1) return false;
      return true;
    });
    rows.sort(function (a, b) {
      var av = sortKey === "share" ? a.gdp : a[sortKey];
      var bv = sortKey === "share" ? b.gdp : b[sortKey];
      if (typeof av === "string") return sortDir * av.localeCompare(bv);
      return sortDir * (av - bv);
    });
    var total = 134908.35;
    body.innerHTML = rows.map(function (p, i) {
      var share = (p.gdp / total * 100);
      var cls = p.growth >= 5 ? "pos" : p.growth < 3.5 ? "neg" : "";
      return "<tr><td>" + esc(p.name) + "</td><td>" + esc(p.region) + "</td>" +
        '<td class="num">' + p.gdp.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "</td>" +
        '<td class="num">' + share.toFixed(2) + "%</td>" +
        '<td class="num ' + cls + '">+' + p.growth.toFixed(1) + "%</td></tr>";
    }).join("") || '<tr><td colspan="5">No provinces match that search.</td></tr>';
    if (caption) {
      caption.textContent = rows.length + " of 31 regions" +
        (regionFilter !== "All" ? " · " + regionFilter : "") +
        (regionQuery ? ' · matching "' + regionQuery + '"' : "");
    }
  }

  /* ---------------- Sources ---------------- */
  function renderSources() {
    var html = pageHead(
      "Data & sources",
      "Every figure on this site comes from an official publication. " +
      "This page lists the sources, explains the methods, and says what " +
      "was revised and what is still preliminary."
    );
    html += '<div class="section"><h2>Sources</h2><ol class="source-list">' +
      '<li><span class="src-name">National Bureau of Statistics of China</span> — ' +
      "Statistical Communiqué of the People's Republic of China on the 2024 " +
      "National Economic and Social Development (28 February 2025). GDP, population, " +
      "prices, employment, income, trade and fiscal figures.</li>" +
      '<li><span class="src-name">National Bureau of Statistics of China</span> — ' +
      "press release, “National economy witnessed steady progress amidst stability " +
      "with major development targets achieved successfully in 2024” (17 January 2025).</li>" +
      '<li><span class="src-name">National Bureau of Statistics of China</span> — ' +
      "“Households' Income and Consumption Expenditure in 2024” (January 2025). " +
      "Disposable income by urban and rural residence, from a survey of 160,000 households.</li>" +
      '<li><span class="src-name">Provincial bureaus of statistics</span> — ' +
      "2024 provincial statistical communiqués (January–February 2025) for all 31 " +
      "provincial-level regions' GDP.</li>" +
      '<li><span class="src-name">Ministry of Education</span> — 2024 education ' +
      "statistics: higher-education enrolment and compulsory-education rates.</li>" +
      '<li><span class="src-name">National Health Commission</span> — life expectancy ' +
      "at birth, 79.0 years in 2024; hospital beds per 1,000 people, 2023.</li>" +
      '<li><span class="src-name">Ministry of Human Resources and Social Security</span> — ' +
      "basic pension insurance participants at end-2024.</li>" +
      "</ol></div>";
    html += '<div class="section"><h2>Methods and notes</h2><ul class="method-note">' +
      "<li><strong>Real vs nominal.</strong> Growth rates are at constant prices (real) " +
      "unless labelled nominal. Nominal income growth in 2024 was 5.3%; after " +
      "deducting price changes it was 5.1%.</li>" +
      "<li><strong>Revisions.</strong> National GDP for 2023 was revised to ¥129.43 trillion " +
      "after the 5th national economic census; 2024 GDP of ¥134.91 trillion is preliminary " +
      "and will be revised. Provincial GDP is preliminary and the sum of the 31 regions " +
      "differs slightly from national GDP, as it does every year.</li>" +
      "<li><strong>Population.</strong> Year-end population is the usually-resident " +
      "population. The 2020 figure (1,411.78 million) reflects the 7th national census.</li>" +
      "<li><strong>Unemployment.</strong> The surveyed urban unemployment rate is a monthly " +
      "sample survey; 5.1% is the 2024 annual average. It is not the registered rate.</li>" +
      "<li><strong>Exchange rate.</strong> The 2024 average rate was ¥7.1217 per US$1 (NBS). " +
      "Dollar figures on this site are conversions at that rate, not official dollar data.</li>" +
      "<li><strong>What is not here.</strong> Hong Kong, Macao and Taiwan publish their own " +
      "statistics and are not in the 31-region provincial table. This site is an " +
      "independent presentation of official figures; it is not affiliated with the NBS.</li>" +
      "</ul></div>";
    html += '<div class="callout"><p><strong>Corrections.</strong> If an official figure is ' +
      "revised, this page is where the change is noted. The data on this site was " +
      "last checked against the NBS releases of January–February 2025.</p></div>";
    root.innerHTML = html;
  }

  /* ---------------- Router ---------------- */
  function route() {
    var hash = window.location.hash || "#/overview";
    var known = ROUTES.some(function (r) { return r.hash === hash; });
    if (!known) hash = "#/overview";
    setActiveNav(hash);
    window.scrollTo(0, 0);
    if (hash === "#/economy") renderEconomy();
    else if (hash === "#/population") renderPopulation();
    else if (hash === "#/employment") renderEmployment();
    else if (hash === "#/regions") renderRegions();
    else if (hash === "#/sources") renderSources();
    else renderOverview();
  }

  window.addEventListener("hashchange", route);
  route();
})();
