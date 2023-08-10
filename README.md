# XSIS Testing

This project is a testing API for PT XSIS

## Prerequisites

Before running the project locally, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org) (v18 or higher)
- [MySQL](https://www.mysql.com/) database

## Getting Started

To get the project up and running locally, follow these steps:

1. **Create the Database:**

    - Create a new database named `xsis_testing`.
    - Import the SQL file located in `/src/db/xsis_testing.sql` into the database.

2. **Install Dependencies:**

    Open a terminal and navigate to the project directory. Run the following command to install the required dependencies:

    ```bash
    npm install

3. **Copy Environment:**

    - Copy the .env.example to your .env file.

4. **Generate Prisma Client:**

    Run the following command to generate the Prisma client:

    ```bash
    npx prisma generate   

5. **Run the Project:**

    - Start the project by running the following command:

    ```bash
    npm run dev

    This will start the development server. The project will be accessible at http://localhost:7000.

6. **Test the Project:**

    - Test the project by running the following command:

    ```bash
    npm run test

    This will test the apps.