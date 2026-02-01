# SkillSnap - Advanced Technical Skills Assessment Platform

SkillSnap is a modern, full-stack assessment platform designed to validate technical skills through interactive coding challenges and quizzes. It features real-time code execution, secure authentication, and verifiable certification.

![SkillSnap Banner](https://via.placeholder.com/1200x400?text=SkillSnap+Assessment+Platform)

## 🚀 Key Features

*   **Multi-Language Code Execution**: safely execute user code (JavaScript, Python) against hidden test cases using **Judge0**.
*   **Diverse Learning Paths**: Structured assessments for **JavaScript, Python, React, Node.js, and SQL**.
*   **Secure Authentication**: Firebase Authentication integration for secure Signup/Login and session management.
*   **Real-Time Assessment Engine**:
    *   Timed assessments with auto-submit.
    *   Split-screen interface (Problem vs. Code Editor).
    *   Console output streaming.
*   **Verifiable Certificates**: Dynamic certificate generation with unique verification IDs.
*   **Modern UI/UX**: Built with React, Tailwind CSS, Framer Motion, and Lucide Icons for a premium dark/light mode experience.

---

## 🏗️ Technical Architecture

SkillSnap follows a **Service-Oriented Architecture (SOA)** with a clear separation between the frontend client, backend API, and execution sandbox.

### 1. Frontend Client
*   **Framework**: React (Vite/CRA)
*   **State Management**: Context API (`AuthContext`, `AssessmentContext`)
*   **Styling**: Tailwind CSS v3, `clsx`, `tailwind-merge`
*   **Routing**: React Router v6

### 2. Backend API (Node.js/Express)
*   **Role**: Orchestrates data flow between Client and Database.
*   **Database**: **Google Cloud Firestore** (NoSQL) for flexible schema design (Skills, Assessments, Users).
*   **Security**: Middleware verifies Firebase Auth tokens.

### 3. Code Execution Sandbox (Judge0)
*   **Role**: Safely runs untrusted user code in isolated Docker containers.
*   **Security**: Prevents malicious code from impacting the host server.
*   **Integration**: Backend pushes code + test cases -> Judge0 -> Returns `stdout`/`stderr` or `Verdict`.

### 4. Database Schema (Firestore)
*   **`users`**: User profiles and assessment history.
*   **`skills`**: Metadata for available skills (e.g., JS, Python).
*   **`assessments`**: Question banks (MCQ + Code problems).
*   **`problems`**: Hidden test cases for coding challenges (strictly backend-only).

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js | UI Library |
| | Tailwind CSS | Utility-first CSS framework |
| | Monaco Editor | VS Code-like editor implementation |
| | Axios | HTTP Client |
| **Backend** | Node.js + Express | API Server |
| **Database** | Firestore | NoSQL Cloud Database |
| **Auth** | Firebase Auth | Identity Provider |
| **Execution** | Judge0 (Docker) | Sandboxed Code Runner |
| **DevOps** | Docker | Containerization |

---

## 📦 Installation & Setup

### Prerequisites
*   Node.js v16+
*   Docker (for local Judge0 instance)
*   Firebase Project (Credentials)

### 1. Frontend Setup
```bash
# Clone repository
git clone https://github.com/OmAnand857/SkillSnap-frontend.git
cd skillsnap-frontend

# Install Dependencies
npm install

# Start Development Server
npm start
```

### 2. Backend Setup
(Assuming backend is in a parallel directory)
```bash
cd ../skillsnap-backend
npm install
# Add serviceAccountKey.json for Firebase Admin
node server.js
```

### 3. Database Seeding
The project includes an automated script to populate Firestore with initial skills and questions.
See `db_seed.md` for the script and instructions.

---

## 🔒 Security & Code execution

### How Safe Execution Works
1.  User submits code via Fronted.
2.  Backend appends **Hidden Test Cases** from Firestore (never exposed to client).
3.  Combined payload is sent to **Judge0** container.
4.  Judge0 runs code in a restricted sandbox (limits memory, CPU, networking).
5.  Results are compared against expected execution outputs.
6.  Only the final `Passed/Failed` verdict and public console log is returned to the user.

---

## 🤝 Contributing
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
