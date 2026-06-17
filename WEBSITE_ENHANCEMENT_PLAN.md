# FinCalcHub Enhancement Plan

## Objective
Preserve the existing FinCalcHub platform and extend it to deliver a stronger financial website experience with improved navigation, calculator coverage, planning tools, and future-ready SEO/content strategy.

## What was improved
- Added new routes for existing unused calculators:
  - `/calculators/goal-planner`
  - `/calculators/inflation`
  - `/calculators/cagr`
  - `/calculators/ppf`
  - `/calculators/epf`
- Added flagship route:
  - `/gps` → `PersonalFinanceGPS`
- Extended calculator navigation links to include all available calculators and the GPS module.
- Added homepage CTA buttons for faster user discovery.
- Updated README to reflect new features.

## Current route map
- `/` → Home
- `/gps` → Personal Finance GPS
- `/calculators` → Calculator hub
- `/calculators/loan` → Loan Calculator
- `/calculators/sip` → SIP Calculator
- `/calculators/retirement` → Retirement Planner
- `/calculators/emi` → EMI / Loan Calculator
- `/calculators/tax` → Tax Calculator
- `/calculators/growth` → Investment Growth Calculator
- `/calculators/insurance` → Insurance Premium Calculator
- `/calculators/goal-planner` → Goal Planner
- `/calculators/inflation` → Inflation Calculator
- `/calculators/cagr` → CAGR Calculator
- `/calculators/ppf` → PPF Calculator
- `/calculators/epf` → EPF Calculator
- `/education` → Educational Content
- `/instruments` → Investment Instruments
- `/glossary` → Glossary
- `/strategies` → Fund Growth Strategies

## Next recommended priorities
1. Add SEO page metadata and schema for each route.
2. Add lazy-loading for heavy chart pages to improve bundle size.
3. Create a Learning Hub route and content sitemap.
4. Add monetization readiness: lead capture, affiliate sections, and premium upgrades.
5. Improve mobile responsiveness and accessibility across form fields.

## Notes
- `npm run build` completed successfully.
- The app preserves all current URLs and extends functionality without removing existing features.
