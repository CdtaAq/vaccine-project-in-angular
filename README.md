# vaccine-project-in-angular



## Tech Stack
- Angular (Frontend)
- D3.js (Charts)
- Node.js/Express or Spring Boot (Backend API)
- MongoDB/PostgreSQL (Database)
- Docker for containerization

## Setup Steps
1. Clone repo: `git clone <repo-url>`
2. Install frontend dependencies: `cd frontend && npm install`
3. Install backend dependencies: `cd backend && npm install`
4. Run backend: `npm start` (or `./mvnw spring-boot:run`)
5. Run frontend: `ng serve --open`

## API Documentation
- **GET /reports** - Fetch all reports
  - Response:
    ```json
    [
      { "category": "Sales", "value": 100 },
      { "category": "Revenue", "value": 80 }
    ]
    ```
![Reports Chart](./screenshots/reports-chart.png)
