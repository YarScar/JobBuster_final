# JobBuster

JobBuster is a React-based web application designed to help users search and track job opportunities in a clean, modern interface.  
It features a **Home page** with a job listings section, an **About page** with app details, a **Contact page** for reaching out, and a **Sign Up page** for user registration.

---

## ✨ Features

### 1. **Home Page**
- A search bar where users can input a job keyword and location.
- Dynamically generated job cards based on the search results.
- Integration with OpenAI's API to fetch job listings from verified businesses (1-5 years old).
- Error handling for invalid searches or failed API calls.

### 2. **Sign Up Page**
- A user-friendly sign-up form where users can create an account.
- Includes fields for:
  - Name
  - Email
  - Password
- **Validation**:
  - All fields are required.
  - Email must be in a valid format.
  - Password must be at least 8 characters long.
- Displays error messages for invalid inputs.

### 3. **About Page**
- Provides details about the mission, vision, and purpose of JobBuster.
- Styled with `info-card` components for a clean and modern look.

### 4. **Contact Page**
- Includes a placeholder profile image and a clickable email link.
- Styled with hover effects for interactive design.

### 5. **Dark Mode**
- Users can toggle between light and dark mode.
- The theme preference is saved in `localStorage` and applied automatically on subsequent visits.

### 6. **Job Assistant**
- A conversational UI component that provides career advice, resume tips, and job search strategies.
- Powered by OpenAI's API for intelligent responses.
- Includes quick prompts for common questions.

---

## 🛠️ Tech Stack

- **React** (via Vite)
- **React Router DOM** for page navigation
- **React Query** for data fetching and caching
- **OpenAI API** for job generation and conversational assistant
- **CSS** for styling and responsive layout
- **Git + GitHub** for version control

---

## 📂 Project Structure
