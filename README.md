
# PennyPinch - Personal Expense Tracker

Welcome to PennyPinch, a financial personal expense tracker built with Expo React Native, PostgreSQL, Node.js, and Express.js.

## Tech Stack
- **Frontend:** Expo React Native
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Installation

### Expo (Frontend)

1. **Install Node.js:**
   - Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

2. **Install Expo CLI:**
   ```bash
   npm install -g expo-cli
   ```

3. **Install project dependencies:**
   ```bash
   cd client
   npm install
   ```

### Node.js Server (Backend)

1. **Install Node.js:**
   - If not already installed, download Node.js from [nodejs.org](https://nodejs.org/).

2. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

## Running the Application

### Client Side (Expo)

1. **Start the Expo server:**
   ```bash
   cd client
   expo start
   ```
   - This will start the Expo development server. You can then open your Expo app on your iOS or Android device, or use an emulator to preview the app.

### Server Side (Node.js)

1. **Start the Node.js server:**
   ```bash
   cd server
   nodemon index.js
   ```
   - This will start the Node.js server using \`nodemon\`, which automatically restarts the server when changes are detected in the source code.

## Notes
- Make sure PostgreSQL is installed and properly configured on your machine or server before running the Node.js server. Adjust the database connection settings in \`server/index.js\` accordingly.

## Additional Information
For more detailed instructions on using Expo and Node.js, refer to their respective documentation:

- [Expo Documentation](https://docs.expo.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---


