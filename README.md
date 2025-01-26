# SwampHacksX - Pill Pal

## Table of Contents

1. [Overview](#overview)
2. [The Problem](#the-problem)
3. [The Solution](#the-solution)
4. [Installation](#installation)
    - [Backend](#backend)
    - [Frontend](#frontend)
5. [Technology Stack](#technology-stack)

---

## Overview

It’s already hard enough when ADHD takes a toll on your productivity—now throw in the challenge of figuring out when your medication will kick in, when they’ll wear off, or why you’re still awake at 2 a.m. after taking a late dose. That’s where Pill Pal comes in. 

Pill Pal uses historical healthcare data and trends on ADHD medication effectiveness to inform a future-focused solution that focuses on visualizing effectiveness overtime in a scalable, scrollable flow chart tailored to the user’s selection of medication type, dosage, and time taken. Beyond visualization, Pill Pal enhances the user experience by suggesting ideal sleep times, offering secure account registration and login to track medication history, enabling custom reminders, and managing overlapping medication schedules to make ADHD medication management effortless and personalized. Pill Pal can serve as a scalable solution to include other medications and become a mobile app for even easier access in the future. 

---

## The Problem
Managing ADHD medications presents significant challenges:
- Forgetting to take medications disrupts productivity and effectiveness.
- Lack of insight into peak effectiveness hours impacts daily planning.
- Medications can interfere with sleep when taken at suboptimal times.

---

## The Solution
**Pill Pal** provides a data-driven solution that visualizes medication effectiveness, helping users:
- Identify peak productive hours.
- Plan optimal times for doses.
- Ensure restful sleep without medication interference.

---

## Installation

### Backend

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

### Frontend
```bash
cd frontend
npm i
npm run dev
```

---

## Technology Stack

- **Languages:** JavaScript and Typescript.
- **Frameworks/Libraries:** MongoDB, Express.js, React, Node.js (MERN stack).
- **Hosting:** GitHub Pages.
- **Tools:** Visual Studio Code, Git, GitHub.

---
