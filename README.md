# SwampHacksX - Pill Pal 💊  
[Pill Pal Devpost](https://devpost.com/software/pill-pal-x81rk6)

## Table of Contents  

1. [💊 What is Pill Pal?](#what-is-pill-pal)  
2. [🚨 The Problem](#-the-problem)  
3. [💡 How Pill Pal Helps](#-how-pill-pal-helps)  
4. [⚙️ How to Set Up](#️-how-to-set-up)  
    - [🔧 Backend](#-backend)  
    - [🖥️ Frontend](#-frontend)  
5. [🔍 Technology Stack](#-technology-stack)

---

## 💊 What is Pill Pal?

It’s already hard enough when ADHD takes a toll on your productivity—now throw in the challenge of figuring out when your medication will kick in, when they’ll wear off, or why you’re still awake at 2 a.m. after taking a late dose. That’s where Pill Pal comes in. 

Pill Pal uses historical healthcare data and trends on ADHD medication effectiveness to inform a future-focused solution that focuses on visualizing effectiveness overtime in a scalable, scrollable flow chart tailored to the user’s selection of medication type, dosage, and time taken. 

Pill Pal also:  
- Suggests ideal sleep times.
- Tracks medication history securely through user accounts. 
- Offers custom reminders.
- Manages overlapping medications.

In the future, Pill Pal could expand to include other medications and even become a mobile app for easier access.

---

## 🚨 The Problem
Managing ADHD medications presents significant challenges:
- Forgetting to take medications disrupts productivity and effectiveness.
- Lack of insight into peak effectiveness hours impacts daily planning.
- Medications can interfere with sleep when taken at suboptimal times.

---

## 💡 How Pill Pal Helps
**Pill Pal** provides a data-driven solution that visualizes medication effectiveness, helping users:
- Identify peak productive hours.
- Plan optimal times for doses.
- Ensure restful sleep without medication interference.

---

## ⚙️ How to Set Up

### 🔧 Backend

1. Add .env file

```bash
cd backend
.touch .env

```

```.env
MONGODB_URI=mongodb+srv://mboughton17:swamphacks@cluster0.98yiv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
```

2. Install dependencies

```bash 
npm i
npm run dev
```

### 🖥️ Frontend
```bash
cd frontend
npm i
npm run dev
```

---

## 🔍 Technology Stack

- **Languages:** JavaScript and Typescript.
- **Frameworks/Libraries:** MongoDB, Express.js, React, Node.js (MERN stack).
- **Hosting:** GitHub Pages.
- **Tools:** Visual Studio Code, Git, GitHub.

---
