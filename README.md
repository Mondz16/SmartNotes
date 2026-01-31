# 📝 Smart Notes — Full-Stack Note-Taking App

> “A place where your ideas meet structure — secure, fast, and accessible anywhere.”

---

## 🎯 Project Overview

Smart Notes is a **full-stack note-taking application** for developers and creators who want to **securely save, manage, and organize their notes**.  

This project is a learning playground for **C#, .NET 10, React, JWT authentication, and Docker-based CI/CD**. It’s structured for **real-world development and deployment**.

---

## 🚀 Features

- **User Authentication**
  - Register & Login with **JWT-based security**
  - Passwords hashed using **BCrypt**
- **Notes Management**
  - Create, Read, Update, Delete (CRUD) notes
  - Each user sees **only their own notes**
- **Modern Frontend**
  - **React + Vite** for fast, interactive UI
  - Responsive, clean design for desktop & mobile
- **Full-Stack Architecture**
  - **.NET 10 Web API** backend
  - React frontend served via **Nginx in Docker**
- **DevOps Ready**
  - Dockerized backend & frontend
  - GitHub Actions CI pipeline for build & test
  - Ready for **docker-compose orchestration**

---

## 🛠 Tech Stack

| Layer         | Technology & Version                   |
|---------------|---------------------------------------|
| Backend       | .NET 10 LTS, C#                        |
| API           | ASP.NET Web API, JWT Authentication    |
| Database      | SQLite (or any relational DB)          |
| Frontend      | React 18, Vite, TailwindCSS            |
| Containerization | Docker, Nginx                          |
| DevOps        | GitHub Actions CI/CD, Docker Compose   |

---

React UI │ (Frontend)
.NET 10 API │(Backend) │
| |
| |
Served via Nginx JWT Auth
| |
Docker Container SQLite DB

> Frontend talks to the backend via REST API. Each request includes a **JWT token** for authentication.

---

## 🐳 Running Locally with Docker

### 1️⃣ Clone the repo
```bash
git clone https://github.com/<your-username>/smart-notes.git
cd smart-notes

cd backend
docker build -t smart-notes-backend .

cd ../frontend
docker build -t smart-notes-frontend .

docker run -p 5164:8080 smart-notes-backend
docker run -p 3000:80 smart-notes-frontend

docker-compose up

