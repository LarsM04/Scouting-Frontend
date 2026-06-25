/* ============================================================
   Zelfevaluatie Scouting — Vanilla-JS logica
   ============================================================
   Werkt samen met:
     • questions.js  → bevat het object DATASETS met vragen & modules
     • index.html    → bevat de HTML-schermen
     • style.css     → aangepaste stijlen bovenop Bootstrap 5
   ============================================================ */

(function () {
  "use strict";

  // ─── Constanten ─────────────────────────────────────────────
  var STORAGE_ANSWERS = "scouting_eval_answers";
  var STORAGE_DATASET = "scouting_eval_dataset";

  var SCALE_LABELS = { 1: "Nooit", 2: "Zelden", 3: "Soms", 4: "Vaak", 5: "Altijd" };

  // ─── State ──────────────────────────────────────────────────
  var currentDatasetKey = "explorers";   // "explorers" of "bevers"
  var answers = {};                      // { questionId: waarde }
  var currentIndex = 0;                  // huidige vraagindex (invulscherm)

  // ─── Helpers ────────────────────────────────────────────────
  /** Huidige dataset ophalen */
  function ds() {
    return DATASETS[currentDatasetKey];
  }

  /** Kleur op basis van percentage (toegankelijk voor tekst/contrast) */
  function getColor(pct) {
    if (pct > 60) return "#146c43"; // Toegankelijk groen
    if (pct >= 30) return "#9a4e00"; // Toegankelijk oranje/bruin
    return "#b02a37"; // Toegankelijk rood
  }

  /** Label op basis van percentage */
  function getLabel(pct) {
    if (pct > 60) return "Goed";
    if (pct >= 30) return "In ontwikkeling";
    return "Aandachtspunt";
  }

  /** Status-key bepalen */
  function getStatus(pct, modAnswered) {
    if (modAnswered === 0) return "neutral";
    if (pct > 60) return "success";
    if (pct >= 30) return "warning";
    return "danger";
  }

  /** Toegankelijke versie van een brand-kleur voor tekst */
  function getAccessibleBrandColor(hexColor) {
    if (hexColor === "#31A529") return "#146c43";
    if (hexColor === "#FF0000") return "#b02a37";
    return hexColor;
  }

  /** Emoji op basis van percentage */
  function getEmoji(pct) {
    if (pct > 80) return "🌟";
    if (pct > 60) return "👍";
    if (pct >= 30) return "📈";
    return "💪";
  }

  /** Antwoorden opslaan in localStorage */
  function saveAnswers() {
    try {
      localStorage.setItem(STORAGE_ANSWERS + "_" + currentDatasetKey, JSON.stringify(answers));
    } catch (e) { /* negeer */ }
  }

  /** Antwoorden laden uit localStorage */
  function loadAnswers(key) {
    try {
      var raw = localStorage.getItem(STORAGE_ANSWERS + "_" + key);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  /** Aantal beantwoorde vragen */
  function answeredCount() {
    return Object.keys(answers).length;
  }

  // ─── Score berekening (gewogen) ─────────────────────────────
  /**
   * Bereken de gewogen score voor een module.
   * De maxScore per module komt uit de Excel Score-tab.
   * Percentage = (som antwoorden / (aantal vragen × 5)) × 100
   * Gewogen punten = (som antwoorden / (aantal vragen × 5)) × maxScore
   */
  function calcModuleScore(mod, questions) {
    var modQ = questions.filter(function (q) { return q.moduleId === mod.id; });
    var rawMax = modQ.length * 5;
    var rawScore = modQ.reduce(function (s, q) { return s + (answers[q.id] || 0); }, 0);
    var modAnswered = modQ.filter(function (q) { return answers[q.id] !== undefined; }).length;
    var pct = rawMax > 0 ? Math.round((rawScore / rawMax) * 100) : 0;
    var weightedScore = rawMax > 0 ? (rawScore / rawMax) * mod.maxScore : 0;

    return {
      modQ: modQ,
      rawScore: rawScore,
      rawMax: rawMax,
      modAnswered: modAnswered,
      pct: pct,
      weightedScore: weightedScore,
      maxScore: mod.maxScore,
    };
  }

  /**
   * Bereken de gewogen totaalscore.
   * Totaal = som van alle gewogen modulescores.
   * TotaalMax = som van alle maxScores = 100.
   */
  function calcTotalScore() {
    var data = ds();
    var totalMax = 0;
    var totalWeighted = 0;

    data.modules.forEach(function (mod) {
      var result = calcModuleScore(mod, data.questions);
      totalMax += mod.maxScore;
      totalWeighted += result.weightedScore;
    });

    return {
      weighted: totalWeighted,
      max: totalMax,
      pct: totalMax > 0 ? Math.round((totalWeighted / totalMax) * 100) : 0,
    };
  }

  // ─── Schermen wisselen ──────────────────────────────────────
  var screens = ["select-screen", "overview-screen", "input-screen", "results-screen"];

  function showScreen(id) {
    screens.forEach(function (s) {
      document.getElementById(s).classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    // Navbar tonen/verbergen
    document.getElementById("app-navbar").style.display = id === "select-screen" ? "none" : "";

    // Reset-knop tonen als er antwoorden zijn
    document.getElementById("btn-reset").style.display = answeredCount() > 0 ? "" : "none";
  }

  // ─── 1. SELECT-SCHERM ──────────────────────────────────────
  function selectDataset(key) {
    currentDatasetKey = key;
    localStorage.setItem(STORAGE_DATASET, key);
    answers = loadAnswers(key);
    renderOverview();
    showScreen("overview-screen");
  }

  // ─── 2. OVERZICHTSSCHERM ───────────────────────────────────
  function renderOverview() {
    var data = ds();
    var modules = data.modules;
    var hoofdtaken = data.hoofdtaken;
    var questions = data.questions;
    var totalQ = questions.length;
    var answered = answeredCount();

    // Badge
    document.getElementById("ov-badge").textContent = data.label;

    // Totale voortgang
    var ovOverall = document.getElementById("ov-overall");
    if (answered > 0) {
      ovOverall.style.display = "";
      var total = calcTotalScore();

      document.getElementById("ov-overall-pct").textContent = total.pct + "%";
      document.getElementById("ov-overall-pct").style.color = getColor(total.pct);
      document.getElementById("ov-overall-count").textContent = answered + " van " + totalQ + " vragen beantwoord";
      document.getElementById("ov-overall-bar").style.width = Math.round((answered / totalQ) * 100) + "%";
      document.getElementById("ov-overall-bar").style.backgroundColor = "#1A368D";
    } else {
      ovOverall.style.display = "none";
    }

    // Module-kaarten gegroepeerd per hoofdtaak
    var container = document.getElementById("ov-modules");
    container.innerHTML = "";

    hoofdtaken.forEach(function (ht) {
      // Hoofdtaak header
      var htHeader = document.createElement("div");
      htHeader.className = "hoofdtaak-header mt-3";
      htHeader.textContent = "Hoofdtaak " + ht.id + ": " + ht.title;
      container.appendChild(htHeader);

      // Modules binnen deze hoofdtaak
      var htModules = modules.filter(function (m) { return m.hoofdtaakId === ht.id; });

      htModules.forEach(function (mod) {
        var result = calcModuleScore(mod, questions);
        var status = getStatus(result.pct, result.modAnswered);
        var badgeLabel = result.modAnswered > 0 ? getLabel(result.pct) : "Nog niet gestart";
        var badgeClass = "badge-status-" + status;
        var scoreText = result.modAnswered > 0 ? result.pct + '%' : '–';
        var scoreClass = "text-status-" + status;
        var progressBgClass = "bg-status-" + status;
        var progressWidth = result.modAnswered > 0 ? result.pct : 0;

        var card = document.createElement("div");
        card.className = "card module-card status-card-" + status;
        card.innerHTML =
          '<div class="card-body">' +
            '<div class="d-flex justify-content-between align-items-center mb-2">' +
              '<div>' +
                '<span class="fw-semibold" style="font-size:1rem;color:#212529">' + mod.title + '</span>' +
                '<div class="text-muted text-xs mt-1">' + result.modAnswered + '/' + result.modQ.length + ' vragen · max ' + mod.maxScore + ' punten</div>' +
              '</div>' +
              '<div class="d-flex align-items-center gap-2">' +
                '<span class="badge rounded-pill ' + badgeClass + '" style="font-size:.72rem">' + badgeLabel + '</span>' +
                '<span class="fw-bold ' + scoreClass + '" style="font-size:1.25rem;letter-spacing:-0.02em">' +
                  scoreText +
                '</span>' +
              '</div>' +
            '</div>' +
            '<div class="progress">' +
              '<div class="progress-bar ' + progressBgClass + '" style="width:' + progressWidth + '%"></div>' +
            '</div>' +
          '</div>';

        container.appendChild(card);
      });
    });

    // Knoptekst
    var btnStart = document.getElementById("btn-start");
    if (answered === 0) {
      btnStart.textContent = "Starten met invullen";
    } else if (answered < totalQ) {
      btnStart.textContent = "Verder invullen";
    } else {
      btnStart.textContent = "Antwoorden bekijken";
    }

    // Opgeslagen-melding
    document.getElementById("ov-saved-msg").style.display = answered > 0 ? "" : "none";
  }

  // ─── 3. INVULSCHERM ────────────────────────────────────────
  function startInput() {
    var questions = ds().questions;
    // Begin bij eerste onbeantwoorde vraag
    var first = questions.findIndex(function (q) { return answers[q.id] === undefined; });
    currentIndex = first === -1 ? 0 : first;
    renderInput();
    showScreen("input-screen");
  }

  function renderInput() {
    var data = ds();
    var questions = data.questions;
    var modules = data.modules;
    var hoofdtaken = data.hoofdtaken;
    var q = questions[currentIndex];
    var mod = modules.find(function (m) { return m.id === q.moduleId; });
    var ht = hoofdtaken.find(function (h) { return h.id === mod.hoofdtaakId; });
    var modQuestions = questions.filter(function (qq) { return qq.moduleId === q.moduleId; });
    var modIndex = modQuestions.findIndex(function (qq) { return qq.id === q.id; });
    var isLast = currentIndex === questions.length - 1;
    var selected = answers[q.id];

    // Teller
    document.getElementById("inp-counter").textContent = (currentIndex + 1) + " / " + questions.length;

    // Progress bar
    var pct = Math.round((answeredCount() / questions.length) * 100);
    document.getElementById("inp-progress").style.width = pct + "%";

    // Module badge
    var badge = document.getElementById("inp-module-badge");
    badge.textContent = mod.title;
    var safeColor = getAccessibleBrandColor(mod.color);
    badge.style.backgroundColor = safeColor + "12";
    badge.style.color = safeColor;
    badge.style.border = "1.5px solid " + safeColor + "25";

    // Taak-info
    document.getElementById("inp-task-info").textContent =
      ht.title + " — " + mod.title + " · vraag " + (modIndex + 1) + " van " + modQuestions.length;

    // Vraagtekst
    document.getElementById("inp-question").textContent = q.text;

    // Scale-knoppen
    var scaleContainer = document.getElementById("inp-scale");
    scaleContainer.innerHTML = "";
    for (var v = 1; v <= 5; v++) {
      (function (val) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn scale-btn " + (selected === val ? "btn-primary" : "btn-outline-secondary");
        btn.textContent = val;
        btn.addEventListener("click", function () {
          answers[q.id] = val;
          saveAnswers();
          renderInput();
        });
        scaleContainer.appendChild(btn);
      })(v);
    }

    // Scale-label
    var labelEl = document.getElementById("inp-scale-label");
    if (selected !== undefined) {
      labelEl.style.display = "";
      labelEl.textContent = SCALE_LABELS[selected];
    } else {
      labelEl.style.display = "none";
    }

    // Volgende-knop
    var btnNext = document.getElementById("btn-next");
    btnNext.disabled = selected === undefined;
    btnNext.textContent = isLast ? "Bekijk resultaten" : "Volgende vraag";

    // Hint
    document.getElementById("inp-hint").style.display = selected === undefined ? "" : "none";
  }

  function handleNext() {
    var questions = ds().questions;
    if (currentIndex === questions.length - 1) {
      renderResults();
      showScreen("results-screen");
    } else {
      currentIndex++;
      renderInput();
    }
  }

  function handlePrev() {
    if (currentIndex === 0) {
      renderOverview();
      showScreen("overview-screen");
    } else {
      currentIndex--;
      renderInput();
    }
  }

  // ─── 4. RESULTATENSCHERM ───────────────────────────────────
  function renderResults() {
    var data = ds();
    var modules = data.modules;
    var hoofdtaken = data.hoofdtaken;
    var questions = data.questions;

    // Badge
    document.getElementById("res-badge").textContent = data.label;

    // Datum
    document.getElementById("res-date").textContent =
      new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

    // Totaalscore (gewogen)
    var total = calcTotalScore();

    document.getElementById("res-pct").textContent = total.pct + "%";
    document.getElementById("res-pct").style.color = getColor(total.pct);
    document.getElementById("res-emoji").textContent = getEmoji(total.pct);
    document.getElementById("res-label").textContent = getLabel(total.pct);
    document.getElementById("res-label").style.color = getColor(total.pct);

    // Hero-achtergrond
    var hero = document.getElementById("res-hero");
    hero.style.background = "linear-gradient(135deg, " + getColor(total.pct) + "15, " + getColor(total.pct) + "05)";

    // Module-scores gegroepeerd per hoofdtaak
    var container = document.getElementById("res-modules");
    container.innerHTML = "";

    hoofdtaken.forEach(function (ht) {
      // Hoofdtaak header
      var htHeader = document.createElement("div");
      htHeader.className = "hoofdtaak-header mt-3";
      htHeader.textContent = "Hoofdtaak " + ht.id + ": " + ht.title;
      container.appendChild(htHeader);

      // Modules binnen deze hoofdtaak
      var htModules = modules.filter(function (m) { return m.hoofdtaakId === ht.id; });

      // Subtotaal voor deze hoofdtaak
      var htWeighted = 0;
      var htMax = 0;

      htModules.forEach(function (mod) {
        var result = calcModuleScore(mod, questions);
        htWeighted += result.weightedScore;
        htMax += mod.maxScore;

        var status = getStatus(result.pct, result.modAnswered);
        var badgeLabel = result.modAnswered > 0 ? getLabel(result.pct) : "Nog niet gestart";
        var badgeClass = "badge-status-" + status;
        var scoreText = result.modAnswered > 0 ? result.pct + '%' : '–';
        var scoreClass = "text-status-" + status;
        var progressBgClass = "bg-status-" + status;
        var progressWidth = result.modAnswered > 0 ? result.pct : 0;

        var div = document.createElement("div");
        div.className = "mb-4";
        div.innerHTML =
          '<div class="d-flex justify-content-between align-items-baseline mb-2">' +
            '<span class="fw-semibold" style="font-size:.95rem;color:#212529">' + mod.title + '</span>' +
            '<div class="d-flex align-items-center gap-2">' +
              '<span class="badge rounded-pill ' + badgeClass + '" style="font-size:.72rem">' + badgeLabel + '</span>' +
              '<span class="fw-bold ' + scoreClass + '" style="font-size:1.1rem">' + scoreText + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="progress">' +
            '<div class="progress-bar ' + progressBgClass + '" style="width:' + progressWidth + '%"></div>' +
          '</div>';

        container.appendChild(div);
      });

      // Subtotaal per hoofdtaak
      var htPct = htMax > 0 ? Math.round((htWeighted / htMax) * 100) : 0;
      var subtotalDiv = document.createElement("div");
      subtotalDiv.className = "d-flex justify-content-between align-items-center mb-4 py-3 px-3";
      subtotalDiv.style.cssText = "background:#f8f9fa;border:1px solid #e9ecef;border-radius:12px;font-size:.9rem";
      subtotalDiv.innerHTML =
        '<span class="text-muted fw-semibold">Subtotaal hoofdtaak ' + ht.id + '</span>' +
        '<span class="fw-bold text-status-' + getStatus(htPct, 1) + '" style="font-size:1.05rem">' + (Math.round(htWeighted * 10) / 10) + ' / ' + htMax + ' (' + htPct + '%)</span>';
      container.appendChild(subtotalDiv);
    });
  }

  function handleShare() {
    var data = ds();
    var modules = data.modules;
    var hoofdtaken = data.hoofdtaken;
    var questions = data.questions;
    var total = calcTotalScore();

    var lines = [
      "Zelfevaluatie Teamleider Scouting — " + data.label,
      "Totaalscore: " + total.pct + "% (" + Math.round(total.weighted * 10) / 10 + " / " + total.max + " punten)",
      ""
    ];

    hoofdtaken.forEach(function (ht) {
      lines.push("── " + ht.title + " ──");
      var htModules = modules.filter(function (m) { return m.hoofdtaakId === ht.id; });
      htModules.forEach(function (mod) {
        var result = calcModuleScore(mod, questions);
        lines.push("  " + mod.title + ": " + result.pct + "% (" + getLabel(result.pct) + ")");
      });
      lines.push("");
    });

    lines.push("Datum: " + new Date().toLocaleDateString("nl-NL"));

    var text = lines.join("\n");

    if (navigator.share) {
      navigator.share({ title: "Zelfevaluatie Scouting", text: text }).catch(function () {});
    } else {
      navigator.clipboard.writeText(text).then(function () {
        alert("Resultaten gekopieerd naar klembord!");
      });
    }
  }

  // ─── Reset & wissel ────────────────────────────────────────
  function handleReset() {
    if (confirm("Wil je alle antwoorden wissen en opnieuw beginnen?")) {
      answers = {};
      saveAnswers();
      renderOverview();
      showScreen("overview-screen");
    }
  }

  function handleSwitch() {
    localStorage.removeItem(STORAGE_DATASET);
    showScreen("select-screen");
  }

  // ─── Event listeners ──────────────────────────────────────
  document.getElementById("btn-select-explorers").addEventListener("click", function () { selectDataset("explorers"); });
  document.getElementById("btn-select-bevers").addEventListener("click", function () { selectDataset("bevers"); });
  document.getElementById("btn-start").addEventListener("click", startInput);
  document.getElementById("btn-next").addEventListener("click", handleNext);
  document.getElementById("btn-prev").addEventListener("click", handlePrev);
  document.getElementById("btn-share").addEventListener("click", handleShare);
  document.getElementById("btn-retake").addEventListener("click", function () {
    startInput();
  });
  document.getElementById("btn-reset").addEventListener("click", handleReset);
  document.getElementById("btn-switch").addEventListener("click", handleSwitch);

  // ─── Init: eerder opgeslagen dataset herstellen ───────────
  (function init() {
    var saved = localStorage.getItem(STORAGE_DATASET);
    if (saved === "explorers" || saved === "bevers") {
      currentDatasetKey = saved;
      answers = loadAnswers(saved);
      renderOverview();
      showScreen("overview-screen");
    } else {
      showScreen("select-screen");
    }
  })();
})();
