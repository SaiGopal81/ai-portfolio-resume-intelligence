# AI Data Engineer Portfolio

A premium, highly-interactive personal portfolio built specifically for an AI Data Engineer. This project features a stunning dark-mode aesthetic, glowing neon accents, scroll-reveal animations, and an embedded "Resume Studio" to showcase both engineering expertise and UI design capabilities.

## 🚀 Key Features

*   **Modern Aesthetics:** Deep navy background with vibrant cyan/purple accents, particle backgrounds, and glassmorphic glowing cards.
*   **Live GitHub Integration:** Dynamically fetches public repository counts and stars using the GitHub API.
*   **Resume Studio:** An interactive module mimicking an ATS (Applicant Tracking System), powered by Groq's `llama-3.1-8b-instant` AI model, allowing recruiters to instantly analyze and compare resumes against Job Descriptions.
*   **Dynamic Project Pages:** Individual, highly detailed route pages (`/projects/[slug]`) for each featured project containing architecture flows and technical problem statements.
*   **Journey Timeline:** A sleek visual timeline detailing career progression and technical milestones.
*   **AI Chatbot:** An embedded floating chatbot (stubbed for backend connection) to answer recruiter questions dynamically.

## 🛠 Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/) & React Icons
*   **Animations:** Framer Motion (via Tailwind utilities and custom CSS)
*   **Backend:** Next.js API Routes (Serverless)

## 💻 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. Clone the repository or extract the ZIP file.
2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

Rename `.env.example` to `.env` and fill in the required variables (e.g., your Resend API key for the contact form).

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

## 📁 Project Structure

Please see `DOCUMENTATION.md` for a detailed breakdown of the codebase architecture and customization instructions.

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). Simply push the code to a GitHub repository and import it into Vercel for automatic CI/CD deployments. (See `DEPLOYMENT.md` for more details).
