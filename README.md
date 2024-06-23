
# PennyPinch - Personal Expense Tracker

Welcome to PennyPinch, a financial personal expense tracker built with Expo React Native, PostgreSQL, Node.js, and Express.js.

## Tech Stack
- **Frontend:** Expo React Native
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Database Management:** pgAdmin 4

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

### PostgreSQL Database and pgAdmin 4

#### PostgreSQL Installation

1. **Download PostgreSQL:**
   - Go to [PostgreSQL Downloads](https://www.postgresql.org/download/) and select the appropriate installer for your operating system.

2. **Install PostgreSQL:**
   - Run the installer and follow the installation wizard instructions.
   - During installation, set a password for the default \`postgres\` user (superuser).

#### pgAdmin 4 Installation

1. **Download pgAdmin 4:**
   - Visit the [pgAdmin 4 Download](https://www.pgadmin.org/download/) page.
   - Select the installer for your operating system (Windows, macOS, or Linux).

2. **Install pgAdmin 4:**
   - Run the installer and follow the installation instructions provided.
   - Launch pgAdmin 4 after installation completes.

#### Configuring PostgreSQL

1. **Connect pgAdmin 4 to PostgreSQL:**
   - Open pgAdmin 4.
   - Right-click on "Servers" and select "Create" > "Server..."
   - Enter the following details:
     - **Name:** Give your server a name (e.g., PostgreSQL).
     - **Host name/address:** \`localhost\` (if PostgreSQL is installed locally).
     - **Port:** \`5432\` (or the port PostgreSQL is configured to use).
     - **Username:** \`postgres\` (or your configured superuser username).
     - **Password:** (Enter the password you set during PostgreSQL installation).
   - Click "Save" to connect to the PostgreSQL server.

### Running the Application

#### Client Side (Expo)

1. **Start the Expo server:**
   ```bash
   cd client
   expo start
   ```
   - This will start the Expo development server. You can then open your Expo app on your iOS or Android device, or use an emulator to preview the app.

#### Server Side (Node.js)

1. **Start the Node.js server:**
   ```bash
   cd server
   nodemon index.js
   ```
   - This will start the Node.js server using \`nodemon\`, which automatically restarts the server when changes are detected in the source code.

## Notes
- Make sure PostgreSQL is installed and properly configured on your machine or server before running the Node.js server. Adjust the database connection settings in \`server/index.js\` accordingly.

## Additional Information
For more detailed instructions on using Expo, Node.js, PostgreSQL, and pgAdmin 4, refer to their respective documentation:
- [Expo Documentation](https://docs.expo.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)

