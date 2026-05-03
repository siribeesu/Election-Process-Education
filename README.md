# 🗳️ Election Hub: Civic Education Platform

Election Hub is a professional, high-fidelity educational platform designed to empower Indian citizens with accurate, nonpartisan information about the democratic process. From voter registration guides to AI-powered civic assistance, the platform serves as a comprehensive resource for the world's largest democracy.

![Platform Preview](https://images.unsplash.com/photo-1590481075326-062e3160a377?auto=format&fit=crop&q=80&w=2070)

## ✨ Features

- **🚶 Voter Journey**: A step-by-step interactive guide for first-time and experienced voters.
- **🛡️ Myth Busters**: Real-time debunking of common election misinformation with official sources.
- **🤖 AI Civic Assistant**: A Gemini 2.0-powered chatbot providing nonpartisan answers to complex voting queries.
- **📝 Adaptive Quiz**: A dynamic testing system to help users assess their civic knowledge.
- **📍 Polling Place Finder**: State-specific resources to help users find where to cast their vote.
- **📊 Candidate Comparison**: Tools to help users research candidates via official ECI data.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Accessibility**: Radix UI Primitives

### Backend
- **Server**: Node.js + Express 5
- **AI Integration**: Google Gemini 2.0 SDK (`@google/genai`)
- **Logging**: Pino (Structured Logging)
- **Validation**: Zod (Schema-based request validation)
- **Database**: Google Firestore

### Infrastructure
- **Hosting**: Firebase Hosting
- **Monorepo**: pnpm Workspaces
- **Testing**: Vitest + Testing Library + Supertest

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- pnpm 9+
- A Google Cloud Project with Gemini API enabled

### Installation

1. **Clone and Install**:
   ```bash
   git clone https://github.com/siribeesu/Election-Process-Education.git
   cd Election-Process-Education
   pnpm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the root with:
   ```env
   PORT=3000
   AI_INTEGRATIONS_GEMINI_API_KEY=your_gemini_key
   AI_INTEGRATIONS_GEMINI_BASE_URL=https://generativelanguage.googleapis.com
   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
   ```

3. **Run Development Mode**:
   ```bash
   pnpm dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## 🧪 Testing

The project maintains a rigorous testing standard across the stack:

```bash
# Run all tests
pnpm test

# Run frontend tests only
pnpm --filter @workspace/election-guide test

# Run backend integration tests
pnpm --filter @workspace/api-server test
```

## 📖 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - How to go live.
- [API Specification](./lib/api-spec/openapi.yaml) - OpenAPI 3.0 details.

## ⚖️ License

MIT License - See [LICENSE](LICENSE) for details.

---
*Built with ❤️ for Indian Democracy.*
