# Human Rights Incidents Dashboard - Web Application

A React-based web application for tracking and visualizing human rights incidents.

## Tech Stack
- React 18.3
- TypeScript
- Vite
- Tailwind CSS
- Chart.js
- Ant Design
- Zustand (State Management)
- Axios (HTTP Client)

## Project Structure

```
web/
├── src/
│ ├── api/
│ │ └── axios.ts # Axios instance with auth interceptors
│ ├── common/
│ │ ├── components/ # Shared components (e.g., LabeledSelect)
│ │ └── utils/ # Utility functions
│ ├── components/
│ │ ├── ui/ # Base UI components
│ │ │ ├── Button.tsx
│ │ │ └── Input.tsx
│ │ ├── BarsChart.tsx # Bar chart visualization
│ │ ├── Dashboard.tsx # Main dashboard view
│ │ ├── FileUpload.tsx # CSV file upload component
│ │ ├── IncidentForm.tsx # Form for manual incident entry
│ │ └── SpeedometerChart.tsx
│ ├── lib/
│ │ └── utils.ts # Utility functions
│ ├── pages/
│ │ └── Login.tsx # Authentication page
│ ├── store/
│ │ └── authStore.ts # Authentication state management
│ ├── App.tsx # Main application component
│ └── main.tsx # Application entry point

```

## Features

1. **Authentication**
   - Login/Signup functionality
   - Token-based authentication
   - Protected routes

2. **Dashboard**
   - Real-time data visualization
   - Multiple chart types:
     - Bar charts for incident types
     - Location distribution
     - Country-wise breakdown
   - Configurable polling interval

3. **Data Input**
   - CSV file upload with validation
   - Manual incident entry form with fields for:
     - Incident type
     - Location (Country, City)
     - Where the incident occurred (Home, School, Work, etc.)
     - Demographics (Age, Gender)
     - Date (Month, Year)

4. **UI Components**
   - Custom styled buttons
   - Form inputs
   - Select dropdowns
   - Loading states
   - Error handling

## Styling
- Custom color scheme:
  - Primary: #168AAD
  - Secondary: #184E77
  - Accent: #34A0A4
  - Background: #D9ED92
- Responsive design
- Tailwind CSS for styling
- Custom UI components with consistent theming

## Configuration
- Environment variables for API endpoints
- ESLint configuration for code quality
- PostCSS setup for CSS processing
- TypeScript configuration

## Development Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## Dependencies
```json
{
  "dependencies": {
    "antd": "^5.24.0",
    "axios": "^1.6.7",
    "chart.js": "^4.4.2",
    "react": "^18.3.1",
    "react-router-dom": "^6.22.3",
    "zustand": "^4.5.2"
  }
}
```