# CareerSync-AI

CareerSync-AI is a comprehensive platform designed to help users explore, compare, and plan their career pathways. It provides personalized recommendations, industry insights, skill development resources, and interactive tools for both learners and administrators.
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
