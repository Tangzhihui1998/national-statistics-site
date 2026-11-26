// Hand-rolled SVG charts. No libraries: every chart is plain SVG built
// from the data arrays in data.js. All charts scale to their container.
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    }
    if (parent) parent.appendChild(n);
    return n;
  }

  function text(parent, x, y, str, cls, anchor) {
    var t = el("text", { x: x, y: y, "class": cls || "axis-label" }, parent);
    if (anchor) t.setAttribute("text-anchor", anchor);
    t.textContent = str;
    return t;
  }

  // Nice axis steps: pick a round step so the top gridline sits above max.
  function niceMax(max) {
    var pow = Math.pow(10, Math.floor(Math.log10(max)));
    var n = max / pow;
    var step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
    return { max: step * pow, step: step * pow };
  }

  // Line chart with dots, value labels and a zero line when values go negative.
  function lineChart(containerId, series, opts) {
    var host = document.getElementById(containerId);
    if (!host) return;
    host.innerHTML = "";
    var W = 640, H = 300, padL = 46, padR = 14, padT = 18, padB = 34;
    var svg = el("svg", {
      viewBox: "0 0 " + W + " " + H, role: "img",
      "aria-label": opts.title || "line chart"
    }, host);
    svg.setAttribute("class", "chart-svg");
    var values = series.map(function (d) { return d.value; });
    var lo = Math.min.apply(null, values.concat([0]));
    var hi = Math.max.apply(null, values);
    if (hi - lo < 1) hi = lo + 1;
    var span = hi - lo;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    function X(i) { return padL + (series.length === 1 ? plotW / 2 : (i / (series.length - 1)) * plotW); }
    function Y(v) { return padT + (1 - (v - lo) / span) * plotH; }

    // Gridlines and y labels (4 steps).
    var steps = 4;
    for (var g = 0; g <= steps; g++) {
      var gv = lo + (span * g) / steps;
      var gy = Y(gv);
      el("line", { x1: padL, y1: gy, x2: W - padR, y2: gy, "class": "grid-line" }, svg);
      text(svg, padL - 8, gy + 4, fmtAxis(gv, opts.unit), "axis-label", "end");
    }
    // Zero line, emphasised when the series crosses zero.
    if (lo < 0 && hi > 0) {
      el("line", { x1: padL, y1: Y(0), x2: W - padR, y2: Y(0), "class": "zero-line" }, svg);
    }
    // Area fill under the line.
    var area = "M" + X(0) + "," + Y(series[0].value);
    series.forEach(function (d, i) { area += " L" + X(i) + "," + Y(d.value); });
    area += " L" + X(series.length - 1) + "," + Y(lo) + " L" + X(0) + "," + Y(lo) + " Z";
    el("path", { d: area, "class": "area-fill" }, svg);
    // The line itself.
    var path = "M" + X(0) + "," + Y(series[0].value);
    series.forEach(function (d, i) { path += " L" + X(i) + "," + Y(d.value); });
    el("path", { d: path, "class": "chart-line", fill: "none" }, svg);
    // Dots, labels and x labels.
    series.forEach(function (d, i) {
      var c = el("circle", { cx: X(i), cy: Y(d.value), r: 4.5, "class": "chart-dot" }, svg);
      var tip = document.createElementNS(NS, "title");
      tip.textContent = d.year + ": " + fmtValue(d.value, opts.unit);
      c.appendChild(tip);
      if (opts.showValues) {
        text(svg, X(i), Y(d.value) - 10, fmtValue(d.value, opts.unit), "value-label", "middle");
      }
      text(svg, X(i), H - 10, String(d.year), "axis-label", "middle");
    });
    if (opts.title) {
      var cap = document.createElement("div");
      cap.className = "chart-title";
      cap.textContent = opts.title;
      host.insertBefore(cap, svg);
    }
  }

  // Vertical bar chart.
  function barChart(containerId, series, opts) {
    var host = document.getElementById(containerId);
    if (!host) return;
    host.innerHTML = "";
    var W = 640, H = 300, padL = 46, padR = 14, padT = 26, padB = 34;
    var svg = el("svg", {
      viewBox: "0 0 " + W + " " + H, role: "img",
      "aria-label": opts.title || "bar chart"
    }, host);
    svg.setAttribute("class", "chart-svg");
    var maxV = Math.max.apply(null, series.map(function (d) { return d.value; }));
    var nice = niceMax(maxV);
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var slot = plotW / series.length;
    var bw = Math.min(46, slot * 0.62);
    for (var g = 0; g <= 4; g++) {
      var gv = (nice.max * g) / 4;
      var gy = padT + plotH - (gv / nice.max) * plotH;
      el("line", { x1: padL, y1: gy, x2: W - padR, y2: gy, "class": "grid-line" }, svg);
      text(svg, padL - 8, gy + 4, fmtAxis(gv, opts.unit), "axis-label", "end");
    }
    series.forEach(function (d, i) {
      var bh = (d.value / nice.max) * plotH;
      var x = padL + i * slot + (slot - bw) / 2;
      var y = padT + plotH - bh;
      var r = el("rect", { x: x, y: y, width: bw, height: bh, rx: 3, "class": "chart-bar" }, svg);
      var tip = document.createElementNS(NS, "title");
      tip.textContent = d.year + ": " + fmtValue(d.value, opts.unit);
      r.appendChild(tip);
      text(svg, x + bw / 2, y - 6, fmtValue(d.value, opts.unit), "value-label", "middle");
      text(svg, x + bw / 2, H - 10, String(d.year), "axis-label", "middle");
    });
    if (opts.title) {
      var cap = document.createElement("div");
      cap.className = "chart-title";
      cap.textContent = opts.title;
      host.insertBefore(cap, svg);
    }
  }

  // Horizontal bar chart for ranked lists (provinces).
  function hbarChart(containerId, items, opts) {
    var host = document.getElementById(containerId);
    if (!host) return;
    host.innerHTML = "";
    var rowH = 26, padL = 110, padR = 70, padT = 8;
    var W = 640, H = padT + items.length * rowH + 8;
    var svg = el("svg", {
      viewBox: "0 0 " + W + " " + H, role: "img",
      "aria-label": opts.title || "ranked bar chart"
    }, host);
    svg.setAttribute("class", "chart-svg");
    var maxV = Math.max.apply(null, items.map(function (d) { return d.value; }));
    items.forEach(function (d, i) {
      var y = padT + i * rowH;
      text(svg, padL - 8, y + 15, d.label, "axis-label", "end");
      var bw = ((W - padL - padR) * d.value) / maxV;
      var r = el("rect", { x: padL, y: y + 4, width: Math.max(bw, 2), height: 15, rx: 3, "class": "chart-bar" }, svg);
      var tip = document.createElementNS(NS, "title");
      tip.textContent = d.label + ": " + fmtValue(d.value, opts.unit);
      r.appendChild(tip);
      text(svg, padL + bw + 6, y + 16, fmtValue(d.value, opts.unit), "value-label", "start");
    });
    if (opts.title) {
      var cap = document.createElement("div");
      cap.className = "chart-title";
      cap.textContent = opts.title;
      host.insertBefore(cap, svg);
    }
  }

  function fmtValue(v, unit) {
    if (unit === "%") return (Math.round(v * 10) / 10) + "%";
    if (unit === "¥tn") return "¥" + v.toFixed(2) + "tn";
    if (unit === "¥bn") return "¥" + v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "bn";
    if (unit === "m") return v.toLocaleString("en-US", { maximumFractionDigits: 2 }) + "m";
    if (unit === "¥") return "¥" + Math.round(v).toLocaleString("en-US");
    return String(v);
  }

  function fmtAxis(v, unit) {
    if (unit === "%") return (Math.round(v * 10) / 10) + "%";
    if (unit === "¥tn") return "¥" + (Math.round(v * 100) / 100) + "tn";
    if (unit === "m") return Math.round(v).toLocaleString("en-US");
    if (unit === "¥") return "¥" + Math.round(v).toLocaleString("en-US");
    return String(Math.round(v * 10) / 10);
  }

  window.ChinaCharts = { lineChart: lineChart, barChart: barChart, hbarChart: hbarChart };
})();
