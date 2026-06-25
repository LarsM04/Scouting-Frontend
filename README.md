# Zelfevaluatie Teamleider Scouting

Welkom bij de **Zelfevaluatie-tool voor teamleiders bij Scouting**. Deze applicatie is ontworpen om teamleiders te helpen zichzelf te beoordelen op verschillende competenties zoals coördinatie, kwaliteitsbewaking en vertegenwoordiging.

## Inhoudsopgave
- [Over het project](#over-het-project)
- [Kenmerken](#kenmerken)
- [Gebruikte Technologieën](#gebruikte-technologieën)
- [Installatie & Gebruik](#installatie--gebruik)
- [Bestandsstructuur](#bestandsstructuur)

## Over het project
Dit project biedt een interactieve en gebruiksvriendelijke webapplicatie waarin teamleiders van verschillende speltakken (bijv. Bevers, Welpen, Scouts, Explorers en Roverscouts) een vragenlijst kunnen doorlopen. De applicatie berekent vervolgens een score op basis van de gegeven antwoorden en biedt een gedetailleerd overzicht per hoofdtaak.

**Belangrijk uitgangspunt:** Het hoofddoel van dit project was het succesvol inzetten en verkennen van een CSS-framework voor de frontend. Hiervoor is nadrukkelijk gebruikgemaakt van **Bootstrap 5**.

## Kenmerken
- **Verschillende Speltakken:** Kies een vragenlijst die past bij de juiste leeftijdsgroep.
- **Lokale Opslag (Local Storage):** Voortgang wordt automatisch lokaal in de browser opgeslagen. De gebruiker kan later terugkomen om de evaluatie verder in te vullen.
- **Gewogen Scores:** Antwoorden worden gewogen en vertaald naar toegankelijke en duidelijke resultaten (Goed, In ontwikkeling, Aandachtspunt).
- **Resultaten Delen:** Deel de resultaten eenvoudig via het deelsysteem van het apparaat (indien ondersteund) of kopieer ze naar het klembord om met een begeleider te delen.
- **Responsive Design:** Geoptimaliseerd voor gebruik op zowel mobiel als desktop, volledig aangedreven door het Bootstrap grid-systeem.

## Gebruikte Technologieën
Dit project is primair gebouwd rondom **Bootstrap 5** om snel een robuuste en responsieve interface neer te zetten.
- **Bootstrap 5** (via CDN): Het hoofdframework van de applicatie. Vrijwel de gehele lay-out en UI is opgebouwd met Bootstrap componenten en utility classes.
- **HTML5** voor de structuur.
- **CSS3** voor de styling. In `style.css` is custom styling toegepast om de Bootstrap-basis precies aan te laten sluiten op de specifieke Scouting-huisstijl.
- **Vanilla JavaScript** (ES5/ES6) voor alle logica, scoreberekeningen en het beheren van de state.

## Installatie & Gebruik
Omdat dit een Vanilla frontend-applicatie is, zijn er geen installatiestappen (zoals `npm install` of `npm run dev`) nodig. 

1. Download of clone deze repository naar je lokale machine.
2. Open het bestand `index.html` in een moderne webbrowser (Chrome, Firefox, Safari, Edge).
3. De applicatie werkt direct en slaat data lokaal op.

## Bestandsstructuur
- `index.html` - De hoofdstructuur van de applicatie (bevat de verschillende weergaveschermen).
- `script.js` - De JavaScript logica voor navigatie, voortgang, berekeningen en opslag.
- `questions.js` - Bevat de datasets (vragen en modules) voor de verschillende speltakken.
- `style.css` - Custom styling bovenop Bootstrap 5.
- `Assets/` - Bevat afbeeldingen en huisstijlelementen van Scouting.
- `plan van aanpak scouting- Lars Mudde.pdf` - Projectdocumentatie / Plan van Aanpak.