# 🐾 Rover Sitter Discovery

**Sitters define their real working hours. Owners find sitters who are genuinely free.**

Rover's current availability system only allows sitters to mark full days as available or unavailable using predefined, non-customizable time windows. Furthermore, even those broad preferences are often ignored in search results. This leads to a frustrating experience where owners frequently contact sitters who aren't actually available, wasting everyone's time. 

**Rover Sitter Discovery** solves this problem by allowing sitters to define precise weekly schedules (with multiple time windows per day) and providing owners with a robust search engine that *only* returns sitters who are genuinely available during the exact requested timeframe.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React Native, Expo, Expo Router, TypeScript, Tailwind CSS |
| **Backend** | Python, Django, Django REST Framework |
| **Database** | PostgreSQL (hosted on Railway) |

---

## ✨ Features

### 🦮 For Sitters
* **Precise Scheduling:** Define a recurring weekly schedule with specific time windows (e.g., Mondays from 9:00 to 13:00, and 14:00 to 17:00).
* **Split Shifts:** Set multiple time windows per day to accurately reflect lunch breaks or split shifts.
* **Full Slot Management:** Full CRUD operations on availability slots — easily create, view, update, and delete your working hours.

### 🐶 For Owners
* **Accurate Search:** Search for available sitters by specific dates and exact time windows.
* **Smart Date Conversion:** The search engine automatically converts the selected date to a day of the week to match against sitter schedules.
* **Detailed Profiles:** Browse sitter profiles, including their bio, pricing, and location.

---

## 🔍 Search Logic

The search engine strictly returns sitters whose availability **completely covers** the time slot requested by the owner. 

> **Example:** If an owner searches for a sitter from **9:00 to 13:00**, a sitter available from **8:00 to 14:00** *will* appear in the results. However, a sitter available only from **10:00 to 12:00** *will not*.

---

## 📁 Project Structure

```text
rover-sitter-discovery/
│
├── backend/
│   ├── config/                 # Django project settings
│   ├── core/                   # Main app
│   │   ├── migrations/
│   │   ├── tests/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py
│   ├── Procfile
│   ├── requirements.txt
│   ├── runtime.txt
│   └── .env
│
├── frontend/
│   ├── app/                    # Expo Router (file-based routing)
│   │   ├── (owner)/
│   │   │   ├── search.tsx
│   │   │   └── sitters.tsx
│   │   ├── (sitter)/
│   │   │   ├── adjusted_availability.tsx
│   │   │   ├── availability.tsx
│   │   │   └── weekly_availability.tsx
│   │   ├── _layout.tsx
│   │   └── index.tsx           # Role Selector (entry point)
│   ├── assets/
│   ├── src/                    # Components, hooks, constants, theme
│   ├── App.tsx
│   ├── app.json
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 🚀 How to Run Locally

### 📋 Prerequisites
* **Python** 3.10+
* **Node.js** 18+
* **PostgreSQL** database running locally or remotely
* **Expo Go** app installed on your physical mobile device (for testing)

### ⚙️ Backend Setup

```bash
# Clone the repository
git clone [https://github.com/](https://github.com/)<your-username>/rover-sitter-discovery.git
cd rover-sitter-discovery/backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file in the /backend directory with the following:
# DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>
# ALLOWED_HOSTS=localhost,127.0.0.1

# Run database migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver
```

### 📱 Frontend Setup

```bash
# Open a new terminal and navigate to the frontend folder
cd rover-sitter-discovery/frontend

# Install dependencies
npm install

# Start the Expo development server
npx expo start
```

## 🧪 Testing

### Backend
The backend uses Django's built-in testing framework. To run the test suite, ensure your virtual environment is activated and run:

```bash
cd backend
python manage.py test
```

### Frontend
The frontend uses Jest for testing. To run the frontend test suite:

```bash
cd frontend
npm test
```

> **Note for Mobile Testing:** If you are running the frontend on a physical device using Expo Go, make sure to update the API base URL in `services/client.ts` (or your relevant API config file) to point to your computer's local IP address on the network (e.g., `http://192.168.1.X:8000`), rather than `localhost`.