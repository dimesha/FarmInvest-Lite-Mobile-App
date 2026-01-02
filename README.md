# FarmInvest-Lite-Mobile-App
FarmInvest Lite is a small Expo App (single-screen + detail) that lists investments and  allows creating a new investment locally
## frontend project structure
androidApp/
├── src/
│   ├── components/
│   │   ├── InvestmentItem.tsx
│   │   ├── InvestmentList.tsx
│   │   ├── NewInvestmentModal.tsx
│   │   └── LoadingErrorState.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── investment.ts
│   └── utils/
├── __tests__/
│   └── InvestmentList.test.tsx
├── App.tsx
└── README.md
## Backend Project Structure
backend/
 ├── index.js
 ├── server.js
 ├── schema.sql
 ├── seed.sql
 ├── .env