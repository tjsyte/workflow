# Workflow Management Web Application - Front End

This project is a modern, responsive Workflow Management Web Application built using React, Tailwind CSS, TypeScript, and Vite. The app is designed to enhance business productivity by managing tasks, generating invoices, raising requests, and automating workflows.

### Live Demo:
[workflowph.netlify.app](https://workflowph.netlify.app)

## Features

- **Modern UI**: Responsive layout with sidebar navigation.
- **Light/Dark Mode**: Customizable themes with persistence using local storage.
- **Dashboard**: Displays statistics and tracks activity.
- **Routing**: Navigation between features using React Router.
- **Type Safety**: Implemented with TypeScript for reliable code.
- **Icon Library**: Uses Lucide React for modern icons.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Persistence**: Local Storage for theme and other data

## Getting Started

### Prerequisites
Ensure you have the following installed:

- Node.js (LTS version recommended)
- npm or yarn

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd workflow
```

Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and visit ```http://localhost:5173``` to view the application.

## Build for Production

To create an optimized build for production:

```bash
npm run build
```

The build files will be located in the ```dist``` directory.

## Linting

To lint the codebase:

```bash
npm run lint
```

## Project Structure:

Project Structure:
├── dist/                  # Build output directory
├── src/                   # Source code directory
├── eslint.config.js       # ESLint configuration
├── index.html             # Main HTML file
├── package-lock.json      # Lock file for dependencies
├── package.json           # Project configuration and dependencies
├── postcss.config.js      # PostCSS configuration for Tailwind CSS
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.app.json      # TypeScript configuration for the app
├── tsconfig.json          # Root TypeScript configuration
├── tsconfig.node.json     # TypeScript configuration for Node.js
└── vite.config.ts         # Vite configuration

## Planned Features

- **Tasks Management**: Create, update, and delete tasks with local storage persistence.
- **Invoice Generator**: Generate and download invoices as PDF files.
- **Request Submission**: Form for raising business requests.
- **Status Tracker**: Visual tracking for task/application statuses.
- **Automation Suggestions**: Identify redundant tasks and suggest improvements.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:  
   `git checkout -b feature-name`
3. Commit your changes:  
   `git commit -m 'Add feature-name'`
4. Push to the branch:  
   `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the MIT License.

Happy coding! 🎉
