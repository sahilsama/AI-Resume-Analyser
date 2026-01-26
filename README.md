<img width="1888" height="844" alt="image" src="https://github.com/user-attachments/assets/e6a74fe5-003b-482d-9bf4-b613624da7eb" />

## Welcome to AI ATS!

An intelligent web application that analyzes resumes using AI to provide detailed feedback, scoring, and insights to help job seekers improve their resumes and increase their chances of landing interviews.

## Features

- 📄 **Resume Upload**: Support for PDF resume uploads
- 🤖 **AI-Powered Analysis**: Leverages advanced AI to analyze resume content, structure, and keywords
- 📊 **Scoring System**: Provides an overall score with visual indicators
- 📋 **Detailed Feedback**: Offers actionable suggestions for improvement
- 🔐 **User Authentication**: Secure login system for personalized experience
- 🎨 **Modern UI**: Clean, responsive interface built with React and TailwindCSS
- ⚡ **Fast Performance**: Built with Vite for rapid development and optimized builds
- 🐳 **Docker Support**: Easy containerization for deployment

## Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS
- **Routing**: React Router
- **Build Tool**: Vite
- **AI Integration**: Custom AI analysis (via Puter.js for cloud processing)
- **PDF Processing**: PDF.js worker for handling PDF files
- **Deployment**: Docker, Node.js

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sahilsama/AI-Resume-Analyser.git
cd AI-Resume-Analyser
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Usage

1. **Sign Up/Login**: Create an account or log in to access the analyzer
2. **Upload Resume**: Use the file uploader to select and upload your PDF resume
3. **View Analysis**: Review your resume score and detailed feedback
4. **Improve**: Use the suggestions to enhance your resume

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t ai-resume-analyser .
```

2. Run the container:
```bash
docker run -p 3000:3000 ai-resume-analyser
```

The application will be available at `http://localhost:3000`.

### Supported Platforms

The containerized application can be deployed to:
- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Manual Deployment

Deploy the contents of the `build/` directory to your hosting platform.

## Project Structure

```
├── app/
│   ├── components/     # Reusable UI components
│   ├── routes/         # Page routes
│   ├── lib/            # Utility functions and API integrations
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
├── types/              # Global type definitions
└── Dockerfile          # Docker configuration
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
