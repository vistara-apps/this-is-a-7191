# SampleSync

SampleSync is a web application for remix artists to streamline sample licensing and protect their work.

## Overview

SampleSync provides a comprehensive platform for managing music samples, licensing, and royalty tracking. It helps artists navigate the complex world of sample clearance and rights management.

## Core Features

1. **Sample Marketplace**: Browse, preview, and instantly license pre-cleared samples.
2. **Sample Verification**: Scan tracks for uncleared samples before distribution.
3. **Concierge Service**: Get expert help with sample clearance and licensing.
4. **Rights Management**: Manage project rights, collaborators, and royalty splits.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **API Integration**: Fetch API with custom service layer
- **Styling**: Tailwind CSS with custom design system

## Project Structure

```
src/
├── components/         # UI components
│   ├── common/         # Shared components
│   └── layout/         # Layout components
├── context/            # Context providers for state management
├── models/             # Data models
├── pages/              # Page components
├── routes/             # Routing configuration
├── services/           # API services
├── utils/              # Utility functions
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## Data Models

- **User**: User account and subscription information
- **Sample**: Music sample metadata and licensing details
- **Project**: Music project with collaborators and samples
- **LicenseAgreement**: Sample license terms and payment details
- **RoyaltyStatement**: Royalty earnings and distribution details

## State Management

The application uses React Context API for state management:

- **AuthContext**: User authentication and profile
- **SampleContext**: Sample marketplace and user samples
- **ProjectContext**: User projects and collaborators
- **LicenseContext**: License agreements and payments

## API Integration

The application communicates with the backend API through a service layer:

- **api.js**: Base API service with error handling and authentication
- **authService.js**: Authentication and user profile management
- **sampleService.js**: Sample management and operations
- **projectService.js**: Project management and operations
- **licenseService.js**: License management and payments
- **conciergeService.js**: Concierge service requests and messages
- **royaltyService.js**: Royalty statements and earnings

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-org/samplesync.git
   cd samplesync
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Create a `.env` file with the following variables:
   ```
   VITE_API_BASE_URL=https://api.samplesync.com
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is proprietary and confidential. All rights reserved.

## Contact

For questions or support, please contact support@samplesync.com.

