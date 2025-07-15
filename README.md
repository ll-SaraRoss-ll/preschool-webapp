
```markdown

# Preschool Student Management Web App

This is a web-based API for managing preschool student records, announcements, and parent-teacher communication. It uses Express, Mongoose, and MongoDB Atlas to provide a full-stack backend service.

---

## Tech Stack

- Node.js  
- Express  
- MongoDB Atlas (cloud-hosted)  
- Mongoose (ODM)  
- dotenv (environment variables)  
- nodemon (development auto-reload)  

---

## Prerequisites

- Node.js v14+  
- NPM or Yarn  
- A MongoDB Atlas free-tier cluster  
- A database user with read/write access  

---

## Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/ll-SaraRoss-ll/preschool-webapp.git
   cd preschool-webapp
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure environment**  
   - Copy the example file and fill in your Atlas credentials:  
     ```bash
     cp .env.example .env
     ```  
   - Edit `.env` and set your `MONGO_URI`:  
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
     ```

---

## Running the App

```bash
npm run dev
```

- Starts the server on `http://localhost:3000`  
- Uses `nodemon` for auto-reload on file changes  

---

## API Endpoints

Base URL: `http://localhost:3000/api/students`

| Method | Endpoint               | Description                         | Request Body                   |
| ------ | ---------------------- | ----------------------------------- | ------------------------------ |
| GET    | `/`                    | List all students                   | —                              |
| GET    | `/:id`                 | Get one student by MongoDB `_id`    | —                              |
| POST   | `/`                    | Create a new student                | `{ name, age, class }`         |
| PUT    | `/:id`                 | Update an existing student by `_id` | Any subset of `{ name, age, class }` |
| DELETE | `/:id`                 | Remove a student by `_id`           | —                              |

---

### Example Requests

**Create**  
```bash
curl --request POST http://localhost:3000/api/students \
  --header "Content-Type: application/json" \
  --data '{"name":"Alice","age":5,"class":"K5"}'
```

**Fetch All**  
```bash
curl http://localhost:3000/api/students
```

**Fetch One**  
```bash
curl http://localhost:3000/api/students/60f8c2b1e1a4b921d8e3fabc
```

---

## Testing with Postman

1. Import the above endpoints as a Postman collection.  
2. For each request, select the proper HTTP method and set the URL.  
3. In **Body → raw → JSON**, paste sample data for POST/PUT calls.  
4. Verify status codes and response bodies.

---

## Project Structure

```
preschool-webapp/
├── models/
│   └── Student.js         # Mongoose schema
├── routes/
│   └── students.js        # Express route handlers
├── middleware/
│   └── errorHandler.js    # Centralized error handling
├── .env                   # Environment variables (ignored by Git)
├── .env.example           # Example env file
├── server.js              # App entry point
├── package.json
└── README.md
```

---

## Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/xyz`)  
3. Commit your changes (`git commit -m "feat: add xyz"`)  
4. Push to your branch (`git push origin feature/xyz`)  
5. Open a Pull Request

---

