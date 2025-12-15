# Jule-Jeopardy Projekt Dokumentation

## 📋 Indholdsfortegnelse
- [Projektsammenfatning](#projektsammenfatning)
- [UX Tanker og Design](#ux-tanker-og-design)
- [Repository Link](#repository-link)
- [UI Skitser](#ui-skitser)
- [Flowchart](#flowchart)

---

## 🎯 Projektsammenfatning

Jule-Jeopardy er en interaktiv juletemaebaseret quiz-applikation inspireret af det klassiske Jeopardy-spilformat. Projektet er udviklet som en React-baseret webapplikation, der giver familier og venner mulighed for at konkurrere i en festlig julekonkurrence.

### Hovedfunktioner
- **Dynamisk spilopsætning**: Brugere kan vælge mellem forskellige spil og tilpasse holdopsætning
- **Kategori-baserede spørgsmål**: Organiserede spørgsmål i forskellige kategorier med stigende pointværdier
- **Holdadministration**: Opret og administrer flere hold med pointstyring
- **Admin-panel**: CMS-lignende interface til at administrere kategorier og spørgsmål
- **Juletemapik**: Festlig UI med juledekoration, snefald-effekter og juletema

### Projektets Formål
Applikationen er designet til at:
- Skabe en underholdende og interaktiv juleaktivitet
- Muliggøre nem opsætning og administration af quizspil
- Give en intuitiv og visuelt tiltalende brugeroplevelse
- Understøtte konkurrence mellem flere hold

---

## 🎨 UX Tanker og Design

### Designfilosofi
Projektet følger en brugercentreret designtilgang med fokus på enkelhed, tilgængelighed og festlig stemning.

#### Kerneprincipper

**1. Intuitive Navigation**
- Klare call-to-action knapper på forsiden ("Opstilling")
- Nem adgang til admin-funktioner via tandhjulsikon
- Tilbage-knapper på alle undersider for nem navigation
- Breadcrumb-navigation i admin-panelet

**2. Visuelt Hierarki**
- Tydelig typografi med store, læsbare overskrifter
- Farvekontraster der sikrer læsbarhed
- Visuel adskillelse mellem forskellige sektioner
- Animationer der guider brugerens opmærksomhed

**3. Festlig Stemning**
- Juletemaebaseret farveskema (røde, grønne og hvide nuancer)
- Dekorativ grafik (julekugler, grangrene, snefald)
- Animerede elementer der skaber liv og dynamik
- Behagelig og indbydende æstetik

**4. Responsiv Design**
- Tilpasset til forskellige skærmstørrelser
- Mobile-first tilgang til layout
- Touch-venlige interaktionselementer

### Brugerrejse

#### Primær Flow
```
Forside → Spilvalg → Holdopsætning → Spilbræt → Spørgsmål → Podium
```

#### Admin Flow
```
Admin Login → Dashboard → Kategoristyring/Spørgsmålsstyring → Rediger/Opret
```

### Interaktionsdesign

**Feedback Mekanismer**
- Hover-effekter på alle interaktive elementer
- Modal-vinduer til spørgsmål og bekræftelser
- Animeret point-tæller ved korrekte/forkerte svar
- Visuel feedback ved valg af spørgsmål

**Fejlhåndtering**
- Klare fejlmeddelelser
- Fallback-visninger ved manglende data
- Loading-states under datahentning

### Tilgængelighed
- Semantisk HTML-struktur
- ARIA-labels på interaktive elementer
- Keyboard-navigation support
- Høj kontrast for læsbarhed

---

## 🔗 Repository Link

**GitHub Repository**: [https://github.com/MathiasBoll/jule-jeopardy]

---

## 🖼️ UI Skitser

### Figma Design
Projektet er designet i Figma med detaljerede wireframes og UI-komponenter.

**Figma Link**: [Jeopardy Design i Figma](https://www.figma.com/design/7OXpdw1J8vf5MdKROrsOl7/Jeopardy?node-id=0-1&t=j0Azz9IHh0rZZMUC-1)

---

## 📊 Flowchart

---

## 📁 Projektstruktur

```
jule-jeopardy/
├── src/
│   ├── pages/          # Alle sider
│   ├── components/     # Genanvendelige komponenter
│   ├── context/        # Context providers
│   ├── hooks/          # Custom hooks
│   ├── api/            # API services
│   ├── assets/         # Billeder og ikoner
│   └── styles/         # Globale styles
├── design/             # Design filer
│   ├── figma/          # Figma links
│   └── wireframes/     # Wireframe sketches
├── docs/               # Dokumentation
└── public/             # Statiske filer
```

---

## 🚀 Komme i Gang

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build til produktion
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## 👥 Udviklet af

### Albina Biriukova
- **Idéudvikling**: Kom med hovedidéen og kernefunktioner til projektet
- **UI/UX Design**: Lavede Figma-designs og designsystem
- **Visuelt**: Stod for det grafiske udtryk og juletemaet

### Mathias Boll
- **Figma Design**: Hjalp med UI-komponenter og design
- **GitHub Setup**: Satte repository op og administrerede Git
- **Projektstruktur**: Fik strukturen, dependencies og Vite-config på plads
- **Generel hjælp**: Hjalp med smårettelser og kodereview

### Oleg Troian
- **Admin-panel**: Udviklede hele admin-dashboard og CMS
- **CRUD Funktioner**: Lavede alt kategoristyring og spørgsmålsadministration
- **Admin Sider**: AdminHome, AdminCategories, AdminQuestions, og AdminQuestionEdit
- **API Services**: gameService.js og teamService.js

### Siv Hede Vollbrecht
- **Spilmekanik**: Hele gameplay-logikken og hvordan spillet fungerer
- **Hold-system**: Holdopsætning, point-system og visning af teams
- **Game Sider**: GamePlay, TeamSetup, GameBoard, Podium
- **Al Styling**: CSS, animationer og responsivt design på hele projektet
- **UI Komponenter**: Modal, Snowfall, AnimatedCount, CountUp

### Tor Ørum
- **Idéudvikling**: Bidrog til konceptet og projektets retning
- **Wireframes**: Lavede de første skitser
- **Forside**: Udviklede Home-siden med navigation og grafik


---

**Semester Opgave** - Jule-Jeopardy  
**Dato**: December 2025

---

*God jul og god fornøjelse med Jule-Jeopardy! 🎄✨*
