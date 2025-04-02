# Historical Job System

This project is designed to manage historical job data and integrate with XactAnalysis. It provides a simple interface for interacting with job estimates and stores historical job data in a PostgreSQL database.

## Features

- **Estimate Interface**: Interact with job data through a functional interface.
- **Historical Job Data Storage**: Store and retrieve historical job data efficiently.
- **XactAnalysis Integration**: Seamlessly integrate with XactAnalysis for job data processing.

## Tech Stack

- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Optional Frontend**: React

## Project Structure

```
historical-job-system
├── src
│   ├── controllers          # Contains controllers for handling requests
│   ├── models               # Contains models for database interaction
│   ├── routes               # Contains route definitions
│   ├── services             # Contains services for business logic
│   └── app.js               # Entry point of the application
├── package.json             # NPM configuration file
├── .env                     # Environment variables
├── README.md                # Project documentation
└── database
    └── schema.sql          # SQL schema for database setup
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd historical-job-system
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up the database**:
   - Create a PostgreSQL database and configure the connection string in the `.env` file.
   - Run the SQL schema in `database/schema.sql` to set up the required tables.

4. **Start the application**:
   ```
   npm start
   ```

## Usage

- Use the defined routes to interact with job estimates and historical data.
- Integrate with XactAnalysis using the provided endpoints.

## Feedback

For any feedback or contributions, please open an issue or pull request in the repository.