# CareerSync-AI
CareerSync-AI is a comprehensive platform designed to help users explore, compare, and plan their career pathways. It provides personalized recommendations, industry insights, skill development resources, and interactive tools for both learners and administrators.


## Recent Updates & Improvements

This project has seen several important enhancements and new features:

- **AI Chatbot Integration:** The chatbot now provides instant answers and guidance, leveraging advanced AI for personalized support. Navigation commands are supported for seamless user experience.
- **Roadmap Generator (Gemini API):** Users can generate personalized learning and career roadmaps using the Gemini API, with results stored in MongoDB for tracking and retrieval.
- **Course Enrollment Logic:** Improved backend logic for course enrollment and cart management, including robust error handling and toggling enrollment status.
- **Career Assessment Test:** Expanded and refined predefined questions for the career test, offering more accurate recommendations.
- **Admin Tools:** Enhanced admin dashboard for secure management of courses, resources, and pathway content.
- **Frontend Enhancements:** UI improvements across components (CareerPathways, ComparisonTool, ResourceCard, etc.) for better usability and visual appeal.
- **Industry Trends & Skill Hub:** Updated content and resources to reflect the latest industry insights and skill development opportunities.
- **Error Handling:** Improved error boundaries and feedback for both client and server operations.
- **Code Quality:** Updated ESLint configuration and refactored code for maintainability.

These updates make CareerSync-AI a more robust, user-friendly, and feature-rich platform for career planning and development.

## Features

- **Career Pathways Explorer:** Browse and compare various career paths with detailed information and visualizations.
- **Skill Hub:** Access curated resources to develop relevant skills for your chosen career.
- **Industry Trends:** Stay updated with the latest trends and insights in different industries.
- **Roadmap Generator:** Create personalized learning and career roadmaps.
- **Comparison Tool:** Compare courses, pathways, and resources side-by-side.
- **Chatbot:** Get instant answers and guidance using AI-powered chat.
- **Admin Dashboard:** Manage courses, resources, and pathway content securely.

## Project Structure

```
client/
  src/
    components/
    pages/
    services/
  public/
  index.html
  package.json
  vite.config.js
server/
  app.js
  config/
  models/
  routes/
  package.json
```

## Technologies Used

- **Frontend:** React, Vite, Clerk authentication, Gemini API
- **Backend:** Node.js, Express, MongoDB
- **Other:** Email integration, Admin tools

## Environment Variables

Set the following variables in your `.env` files:

```
VITE_API_URL=<your_backend_url>
VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_key>
VITE_ADMIN_NAME=<admin_name>
VITE_EMAIL_USER=<email_user>
VITE_EMAIL_PASS=<email_pass>
VITE_GEMINI_API_KEY=<gemini_api_key>
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kg3540213/CarrerSync-AI.git
   ```
2. **Install dependencies:**
   - For client:
     ```bash
     cd client
     npm install
     ```
   - For server:
     ```bash
     cd server
     npm install
     ```
3. **Configure environment variables:**
   - Add your keys and credentials to `.env` files in both `client` and `server` folders.
4. **Run the project:**
   - Start the backend:
     ```bash
     npm start
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

For more information, visit the [GitHub repository](https://github.com/kg3540213/CarrerSync-AI).
