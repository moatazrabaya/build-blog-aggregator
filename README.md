# 📰 Blog Aggregator CLI

A command-line application that aggregates blog posts from multiple RSS feeds, allows users to follow/unfollow feeds, and browse collected content.

---

## 📌 Overview

**Blog Aggregator CLI** is a Node.js + TypeScript application that:

* Fetches blog posts from RSS feeds
* Stores them in a PostgreSQL database
* Lets users manage feeds and subscriptions
* Provides CLI commands to browse posts

It is designed as a **backend-focused project** demonstrating:

* Database design & ORM usage (Drizzle ORM)
* RSS parsing
* CLI architecture
* User & feed relationships

---

## ⚙️ Tech Stack

* **Node.js + TypeScript**
* **PostgreSQL**
* **Drizzle ORM**
* **tsx** (runtime for TS)
* **fast-xml-parser** (RSS parsing)

---

## 🧠 How the Project Works

### 1. Core Flow

1. User registers/logs in
2. User adds RSS feeds
3. App periodically aggregates posts from feeds
4. Posts are stored in the database
5. User browses posts via CLI

---

### 2. Architecture

```
src/
│
├── commands/        # CLI commands (user, feeds, browsing)
├── lib/
│   ├── db/          # Database config, schema, queries
│   ├── rss.ts       # RSS fetching & parsing
│   └── follow.ts    # Feed follow logic
│
├── middlewares/     # Auth middleware
├── config.ts        # App config
└── index.ts         # Entry point
```

---

### 3. Key Components

#### 📦 Commands System

Each CLI command is modular:

* `users/` → register, login, reset
* `feeds/` → add feeds, list feeds
* `follow/unfollow` → manage subscriptions
* `browse` → view posts
* `agg` → run aggregation

---

#### 🗄️ Database Layer

Using **Drizzle ORM**:

* Schema defined in `schema.ts`
* Queries organized in:

  * `users.ts`
  * `feeds.ts`
  * `posts.ts`
  * `feed_follows.ts`

---

#### 🌐 RSS Aggregation

* Implemented in `rss.ts`
* Uses `fast-xml-parser`
* Fetches RSS feeds and extracts:

  * Title
  * Link
  * Publication date
  * Description

---

#### 🔁 Aggregation Process

The `agg` command:

1. Reads all feeds from DB
2. Fetches RSS data
3. Parses posts
4. Inserts new posts into DB
5. Avoids duplicates

---

#### 👤 Authentication

* Middleware: `loggedIn_middleware.ts`
* Ensures certain commands require login

---

## 🚀 Features

* ✅ User registration & login
* ✅ Add RSS feeds
* ✅ Follow/unfollow feeds
* ✅ Aggregate posts from feeds
* ✅ Browse posts
* ✅ Persistent storage with PostgreSQL

---

## 🛠️ Installation & Setup

### 1. Clone the Project

```bash
git clone <your-repo-url>
cd BuildBlogAggregator_Project
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment

Create a `.env` file (if needed) with:

```env
DATABASE_URL=postgres://user:password@localhost:5432/dbname
```

---

### 4. Run Migrations

```bash
npm run generate
npm run migrate
```

---

### 5. Start the App

```bash
npm start
```

---

## ▶️ Usage Guide

### 👤 User Commands

```bash
npm start register <username>
npm start login <username>
npm start reset
```

---

### 📰 Feed Commands

```bash
npm start addfeed <name> <url>
npm start feeds
```

---

### 🔔 Follow System

```bash
npm start follow <feed_id>
npm start unfollow <feed_id>
npm start following
```

---

### 🔄 Aggregation

```bash
npm start agg
```

Fetches posts from all feeds.

---

### 📖 Browse Posts

```bash
npm start browse
```

Displays posts from followed feeds.

---

## 📂 Project Structure (Detailed)

* `index.ts` → Entry point, CLI runner
* `commands/` → Command handlers
* `lib/db/` → DB connection, schema, queries
* `lib/rss.ts` → RSS parsing logic
* `middlewares/` → Auth checks

---

## 🧪 Database Design (Simplified)

Tables likely include:

* **users**
* **feeds**
* **posts**
* **feed_follows**

Relationships:

* User ↔ Feeds (many-to-many via follows)
* Feed → Posts (one-to-many)

---

## 🙌 Final Notes

This project is ideal for learning:

* Backend development
* Data modeling
* Working with real-world data (RSS feeds)

---
