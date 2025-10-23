# JobBuster

JobBuster is a modern job search application designed to help users find job opportunities, save their favorite jobs, and get career advice through an integrated chatbot assistant. The app features a sleek UI with dark mode support, persistent search history, and a favorites page for saved jobs.

## Features

- **Job Search**: Search for jobs by keyword and location.
- **Favorites**: Save jobs to a favorites page for easy access.
- **Chatbot Assistant**: Get career advice, resume tips, and interview preparation help.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Sign-Up Page**: Placeholder for user account creation.
- **Persistent Search History**: Search inputs and results are saved until cleared.

## Tech Stack

- **Frontend**: React, React Router, React Query
- **Styling**: CSS with custom themes and animations
- **Backend**: OpenAI API integration for job generation and chatbot responses

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/JobBuster.git
   cd JobBuster
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Usage

### Job Search
1. Enter a job title and location in the search bar.
2. Click "Search" to fetch job listings.
3. View job details by clicking on a job card.

### Favorites
1. Click the heart icon (💜) on a job card to save it to your favorites.
2. Access saved jobs on the "Favorites" page via the navigation bar.
3. Remove jobs from favorites by clicking the heart icon again.

### Chatbot Assistant
1. Open the chatbot by clicking the 🌷 icon.
2. Ask questions about career advice, resume tips, or interview preparation.
3. Use quick prompts for common queries.

### Dark Mode
1. Toggle dark mode using the ☀️/🌙 button in the top-right corner.

### Sign-Up
1. Visit the "Sign Up" page to view the placeholder for account creation.

## Project Structure

```
src/
├── api/                     # Backend API integrations
├── components/              # Reusable React components
├── context/                 # Context for global state management
├── hooks/                   # Custom React hooks
├── pages/                   # Page components for routing
├── styles/                  # CSS files for styling
├── App.jsx                  # Main app component
├── index.css                # Global styles
└── main.jsx                 # Entry point for React
```

## Key Files

- **`src/components/JobCard.jsx`**: Displays job details with "Apply" and "Favorites" buttons.
- **`src/pages/FavoritesPage.jsx`**: Lists saved jobs with options to remove them.
- **`src/components/JobAssistantChatBot.jsx`**: Chatbot for career advice and job search assistance.
- **`src/hooks/useJobGeneration.js`**: Custom hook for fetching job listings from the OpenAI API.

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key for job generation and chatbot responses.

## Future Enhancements

- Implement user authentication for personalized job searches.
- Add the ability to apply directly to jobs from the app.
- Improve chatbot responses with more context-aware suggestions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) for the API integration.
- [React Query](https://tanstack.com/query/latest) for efficient data fetching and caching.
- [React Router](https://reactrouter.com/) for seamless navigation.

---