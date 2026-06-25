/**
 * Vragenlijst data voor de Zelfevaluatie app.
 * Gebaseerd op de originele Excel-bestanden:
 *   - Q-TL_ER_competentieroos.xlsx (Explorers & Roverscouts)
 *   - Q-TL_BWS_competentieroos.xlsx (Bevers, Welpen & Scouts)
 *
 * Structuur:
 *   3 Hoofdtaken → 9 Modules → 27 Vragen per dataset
 *   Elke module heeft een maxScore uit de Score-tab van de Excel.
 */

const DATASETS = {
  explorers: {
    label: "Explorers & Roverscouts",
    subtitle: "Leeftijd: 16–18 jaar & 18+",

    hoofdtaken: [
      { id: 1, title: "Coördinerende en teamgerichte taken" },
      { id: 2, title: "Kwaliteitsbewaking team en activiteitenprogramma" },
      { id: 3, title: "Vertegenwoordiging team binnen en buiten groep" },
    ],

    modules: [
      { id: "mod1",  nummer: 1,  hoofdtaakId: 2, title: "Spelvisie en spelaanbod",                 color: "#FF0000", maxScore: 10 },
      { id: "mod3",  nummer: 3,  hoofdtaakId: 2, title: "Scouting Academy",                        color: "#FF0000", maxScore: 20 },
      { id: "mod4",  nummer: 4,  hoofdtaakId: 2, title: "Leeftijdseigen kenmerken",                 color: "#FF0000", maxScore: 5  },
      { id: "mod6",  nummer: 6,  hoofdtaakId: 1, title: "Programmeren",                             color: "#1A368D", maxScore: 5  },
      { id: "mod7",  nummer: 7,  hoofdtaakId: 1, title: "Motivatietechnieken en groepsproces",       color: "#1A368D", maxScore: 5  },
      { id: "mod8",  nummer: 8,  hoofdtaakId: 1, title: "Veiligheid",                               color: "#1A368D", maxScore: 20 },
      { id: "mod10", nummer: 10, hoofdtaakId: 2, title: "Gewenst gedrag",                           color: "#FF0000", maxScore: 10 },
      { id: "mod11", nummer: 11, hoofdtaakId: 2, title: "Evalueren",                                color: "#FF0000", maxScore: 10 },
      { id: "mod12", nummer: 12, hoofdtaakId: 3, title: "Gespreks- en overlegvaardigheden",          color: "#31A529", maxScore: 15 },
    ],

    questions: [
      // ── Module 1: Spelvisie en spelaanbod (Hoofdtaak 2) ──
      { id: 1,  moduleId: "mod1",  text: "Belang van de kwaliteit van het activiteitenprogramma." },
      { id: 2,  moduleId: "mod1",  text: "Bewaken kwalititeit van het activiteitenprogramma samen met jongeren, rekening houdend met de progressiematrix." },

      // ── Module 3: Scouting Academy (Hoofdtaak 2) ──
      { id: 3,  moduleId: "mod3",  text: "Actieve rol aannemen in begeleiding nieuwe teamleden of coaches/adviseurs tijdens introductiefase." },
      { id: 4,  moduleId: "mod3",  text: "Kwaliteit leidingteam bewaken, in overleg met team" },
      { id: 5,  moduleId: "mod3",  text: "Kwaliteit leidingteam verbeteren, in overleg met team" },
      { id: 6,  moduleId: "mod3",  text: "Kwaliteit leidingteam (explo) of speltak (rover) bewaken, in overleg met groeps- en praktijkbegeleider" },
      { id: 7,  moduleId: "mod3",  text: "Kwaliteit leidingteam (explo) of speltak (rover) verbeteren, in overleg met groeps- en praktijkbegeleider" },
      { id: 8,  moduleId: "mod3",  text: "Ontwikkelplan team opstellen, in overleg met groeps- em praktijkbegeleider" },

      // ── Module 4: Leeftijdseigen kenmerken (Hoofdtaak 2) ──
      { id: 9,  moduleId: "mod4",  text: "Complexe leeftijds- en gedragskenmerken in de eigen en naastliggende speltak verklaren, rekening houdend met ontwikkeling brein." },

      // ── Module 6: Programmeren (Hoofdtaak 1) ──
      { id: 10, moduleId: "mod6",  text: "Periodiek planning taken en werkzaamheden maken (explo) of jongeren hierover adviseren (rover)." },

      // ── Module 7: Motivatietechnieken en groepsproces (Hoofdtaak 1) ──
      { id: 11, moduleId: "mod7",  text: "Bevorderen samenwerking leidingteam, zowel voor jeugdleden als voor leiding onderling." },
      { id: 12, moduleId: "mod7",  text: "Bevorderen taakverdeling leidingteam, zowel voor jeugdleden als voor leiding onderling." },
      { id: 13, moduleId: "mod7",  text: "Bevorderen gezamenlijke verantwoordelijkheid leidingteam, zowel voor jeugdleden als voor leiding onderling." },

      // ── Module 8: Veiligheid (Hoofdtaak 1) ──
      { id: 14, moduleId: "mod8",  text: "Tonen daadkracht ten aanzien van veiligheid en optreden indien nodig." },
      { id: 15, moduleId: "mod8",  text: "Leiderschap tonen bij crisis" },
      { id: 16, moduleId: "mod8",  text: "Aanpassen eigen houding situatie van het moment." },
      { id: 17, moduleId: "mod8",  text: "Aanpassen eigen gedrag situatie van het moment." },
      { id: 18, moduleId: "mod8",  text: "Juist afhandelen ongeval richting jeugdlid en ouders, in samenwerking met groepsbestuur." },

      // ── Module 10: Gewenst gedrag (Hoofdtaak 2) ──
      { id: 19, moduleId: "mod10", text: "Binnen leidingteam (explo) of de speltak (rover) reflecteren op elkaars houding en gedrag." },
      { id: 20, moduleId: "mod10", text: "Stimuleren en motiveren explorers, teamleden of roverscouts in houdig en gedrag goed voorbeeld te geven." },

      // ── Module 11: Evalueren (Hoofdtaak 2) ──
      { id: 21, moduleId: "mod11", text: "Initiatief (regelmatig) teamoverleg en evaluatie explorers en leidingteam (explo) of stambestuur, coaches en medeadviseurs (rovers)." },
      { id: 22, moduleId: "mod11", text: "Zorgen zinvol overleg/evaluatie voor samenwerking en kwaliteit van spel." },

      // ── Module 12: Gespreks- en overlegvaardigheden (Hoofdtaak 3) ──
      { id: 23, moduleId: "mod12", text: "Actief participeren in overleg met eigen inbreng en afstemmig." },
      { id: 24, moduleId: "mod12", text: "Inzien noodzaak juiste taakverdeling." },
      { id: 25, moduleId: "mod12", text: "Eigen werkzaamheden afstemmen met overige teamleden." },
      { id: 26, moduleId: "mod12", text: "Op bekwame wijze speleenheid vertegenwoordigen binnen groep (contacten andere teamleiders, aanspreekpunt ouders/jongeren hierover adviseren)." },
      { id: 27, moduleId: "mod12", text: "Op bekwame wijze speleenheid vertegenwoordigen buiten groep (contacten teamleiders andere groepen, regio)." },
    ],
  },

  bevers: {
    label: "Bevers, Welpen & Scouts",
    subtitle: "Leeftijd: 6–11 jaar & 11–16 jaar",

    hoofdtaken: [
      { id: 1, title: "Coördinerende en teamgerichte taken" },
      { id: 2, title: "Kwaliteitsbewaking team en activiteitenprogramma" },
      { id: 3, title: "Vertegenwoordiging team binnen en buiten groep" },
    ],

    modules: [
      { id: "mod1",  nummer: 1,  hoofdtaakId: 2, title: "Spelvisie en spelaanbod",                 color: "#FF0000", maxScore: 10 },
      { id: "mod3",  nummer: 3,  hoofdtaakId: 2, title: "Scouting Academy",                        color: "#FF0000", maxScore: 20 },
      { id: "mod4",  nummer: 4,  hoofdtaakId: 2, title: "Leeftijdseigen kenmerken",                 color: "#FF0000", maxScore: 5  },
      { id: "mod6",  nummer: 6,  hoofdtaakId: 1, title: "Programmeren",                             color: "#1A368D", maxScore: 5  },
      { id: "mod7",  nummer: 7,  hoofdtaakId: 1, title: "Motivatietechnieken en groepsproces",       color: "#1A368D", maxScore: 5  },
      { id: "mod8",  nummer: 8,  hoofdtaakId: 1, title: "Veiligheid",                               color: "#1A368D", maxScore: 20 },
      { id: "mod10", nummer: 10, hoofdtaakId: 2, title: "Gewenst gedrag",                           color: "#FF0000", maxScore: 10 },
      { id: "mod11", nummer: 11, hoofdtaakId: 2, title: "Evalueren",                                color: "#FF0000", maxScore: 10 },
      { id: "mod12", nummer: 12, hoofdtaakId: 3, title: "Gespreks- en overlegvaardigheden",          color: "#31A529", maxScore: 15 },
    ],

    questions: [
      // ── Module 1: Spelvisie en spelaanbod (Hoofdtaak 2) ──
      { id: 1,  moduleId: "mod1",  text: "Belang van de kwaliteit van het activiteitenprogramma." },
      { id: 2,  moduleId: "mod1",  text: "Bewaken kwalititeit van het activiteitenprogramma, rekening houdend met de progressiematrix." },

      // ── Module 3: Scouting Academy (Hoofdtaak 2) ──
      { id: 3,  moduleId: "mod3",  text: "Actieve rol aannemen in begeleiding nieuwe teamleden tijdens introductiefase." },
      { id: 4,  moduleId: "mod3",  text: "Kwaliteit leidingteam bewaken, in overleg met team" },
      { id: 5,  moduleId: "mod3",  text: "Kwaliteit leidingteam verbeteren, in overleg met team" },
      { id: 6,  moduleId: "mod3",  text: "Kwaliteit leidingteam bewaken, in overleg met groeps- en praktijkbegeleider" },
      { id: 7,  moduleId: "mod3",  text: "Kwaliteit leidingteam verbeteren, in overleg met groeps- en praktijkbegeleider" },
      { id: 8,  moduleId: "mod3",  text: "Ontwikkelplan team opstellen, in overleg met groeps- em praktijkbegeleider" },

      // ── Module 4: Leeftijdseigen kenmerken (Hoofdtaak 2) ──
      { id: 9,  moduleId: "mod4",  text: "Complexe leeftijds- en gedragskenmerken in de eigen en naastliggende speltak verklaren, rekening houdend met ontwikkeling brein." },

      // ── Module 6: Programmeren (Hoofdtaak 1) ──
      { id: 10, moduleId: "mod6",  text: "Periodiek planning taken en werkzaamheden maken." },

      // ── Module 7: Motivatietechnieken en groepsproces (Hoofdtaak 1) ──
      { id: 11, moduleId: "mod7",  text: "Bevorderen samenwerking leidingteam, zowel voor jeugdleden als voor leiding onderling." },
      { id: 12, moduleId: "mod7",  text: "Bevorderen taakverdeling leidingteam, zowel voor jeugdleden als voor leiding onderling." },
      { id: 13, moduleId: "mod7",  text: "Bevorderen gezamenlijke verantwoordelijkheid leidingteam, zowel voor jeugdleden als voor leiding onderling." },

      // ── Module 8: Veiligheid (Hoofdtaak 1) ──
      { id: 14, moduleId: "mod8",  text: "Tonen daadkracht ten aanzien van veiligheid en optreden indien nodig." },
      { id: 15, moduleId: "mod8",  text: "Leiderschap tonen bij crisis" },
      { id: 16, moduleId: "mod8",  text: "Aanpassen eigen houding situatie van het moment." },
      { id: 17, moduleId: "mod8",  text: "Aanpassen eigen gedrag situatie van het moment." },
      { id: 18, moduleId: "mod8",  text: "Juist afhandelen ongeval richting jeugdlid en ouders, in samenwerking met groepsbestuur." },

      // ── Module 10: Gewenst gedrag (Hoofdtaak 2) ──
      { id: 19, moduleId: "mod10", text: "Binnen leidingteam reflecteren op elkaars houding en gedrag." },
      { id: 20, moduleId: "mod10", text: "Stimuleren en motiveren teamleden in houdig en gedrag goed voorbeeld te geven." },

      // ── Module 11: Evalueren (Hoofdtaak 2) ──
      { id: 21, moduleId: "mod11", text: "Initiatief (regelmatig) teamoverleg en evaluatie leidingteam." },
      { id: 22, moduleId: "mod11", text: "Zorgen zinvol overleg/evaluatie voor samenwerking en kwaliteit van spel." },

      // ── Module 12: Gespreks- en overlegvaardigheden (Hoofdtaak 3) ──
      { id: 23, moduleId: "mod12", text: "Actief participeren in overleg met eigen inbreng en afstemmig." },
      { id: 24, moduleId: "mod12", text: "Inzien noodzaak juiste taakverdeling." },
      { id: 25, moduleId: "mod12", text: "Eigen werkzaamheden afstemmen met overige teamleden." },
      { id: 26, moduleId: "mod12", text: "Op bekwame wijze speleenheid vertegenwoordigen binnen groep (contacten andere teamleiders, aanspreekpunt ouders)." },
      { id: 27, moduleId: "mod12", text: "Op bekwame wijze speleenheid vertegenwoordigen buiten groep (contacten teamleiders andere groepen, regio)." },
    ],
  },
};
