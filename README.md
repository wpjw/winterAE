# Dungeons & Dragons Encounter Builder

This project is a Dungeons & Dragons encounter builder that utilizes the Open5e API (https://open5e.com/) to create and manage encounters. Users can select monsters, build encounters, and retrieve relevant data to enhance their gaming experience.

## Project Structure

- **src/**: Contains the source code for the application.
  - **api/**: Functions to interact with the Open5e API.
    - `open5e.ts`: Contains `fetchMonsters` function.
  - **components/**: React components for the application.
    - `EncounterBuilder.tsx`: The main component for building encounters.
    - `MonsterSection.tsx`: Component for loading and displaying monsters by Challenge Rating (CR).
    - `PartyMember.tsx`: Component for managing party members.
  - **services/**: Services related to encounter management.
    - `encounterService.ts`: Functions like `createEncounter` and `getEncounterDetails`.
  - **utils/**: Utility functions for various tasks.
    - `helpers.ts`: Functions like `calculateChallengeRating` and `formatMonsterData`.
  - `App.tsx`: The main application component.
  - `index.tsx`: The entry point of the application.
  - `App.css`: CSS file for styling the application.
  - `index.css`: CSS file for global styles.
  - `App.test.tsx`: Test file for the main application component.
  - `setupTests.tsx`: Setup file for testing.
  - `reportWebVitals.tsx`: File for reporting web vitals.

- **public/**: Contains public assets.
  - `index.html`: The main HTML file for the application.
  - `manifest.json`: Web app manifest file.
  - `robots.txt`: Robots exclusion file.

- **tsconfig.json**: TypeScript configuration file.

- **package.json**: npm configuration file.

- **.gitignore**: Git ignore file.

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```sh
   cd dnd-encounter-builder
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm start
   ```

## Usage

Once the application is running, you can use the Encounter Builder to select monsters and create encounters. The application will fetch data from the Open5e API to provide you with the necessary information.

### Selecting Monsters

- The application displays sections for different Challenge Ratings (CR).
- Click on a section to load and display monsters with the selected CR.
- Click on a monster to add it to the encounter.

### Managing Party Members

- Add party members and set their levels.
- The application calculates the experience budget based on the party members' levels.

### Creating Encounters

- The application calculates the total experience of the selected monsters.
- The encounter difficulty is determined based on the experience budget and the total monster experience.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.