# Nigeria Map Application

## Overview

This project is a modern, interactive web application designed to visualize geographical and demographic data related to Nigeria. Built with a robust and scalable technology stack, it provides a dynamic platform for exploring Nigerian states, their unique characteristics, and associated datasets. The application emphasizes a responsive user experience, ensuring accessibility and usability across various devices.

## Features

*   **Interactive Map Visualization:** A highly interactive map of Nigeria, allowing users to click on individual states to reveal detailed information.
*   **Rich UI Components:** Leverages the comprehensive Radix UI library for accessible, customizable, and aesthetically pleasing user interface elements, including accordions, alert dialogs, dropdown menus, dialogs, tooltips, switches, and sliders.
*   **Responsive Design:** Engineered with a mobile-first approach, ensuring optimal viewing and interaction experiences on desktops, tablets, and smartphones.
*   **Data-Driven Insights:** Integrates with Recharts for advanced data visualization capabilities, enabling the presentation of complex datasets in an easily digestible graphical format.
*   **Fluid Animations:** Incorporates Framer Motion to deliver smooth, engaging, and performant animations, enhancing the overall user experience.
*   **Efficient State Management:** Utilizes React Hooks and other best practices for robust and predictable state management, ensuring data consistency and application stability.
*   **Modern Development Workflow:** Powered by Vite, a next-generation frontend tooling, providing lightning-fast hot module replacement (HMR) and optimized build processes.
*   **Utility-First CSS:** Styled with Tailwind CSS, facilitating rapid UI development and ensuring a consistent design system across the application.

## Technologies Used

This project is built upon a modern JavaScript ecosystem, leveraging the following key technologies:

*   **React 19:** A declarative, component-based JavaScript library for building user interfaces.
*   **Vite 6:** A fast, opinionated build tool for modern web projects, offering an exceptional development experience.
*   **Tailwind CSS 4:** A utility-first CSS framework for rapidly building custom designs.
*   **Radix UI:** A collection of unstyled, accessible UI components for React.
*   **Framer Motion:** A production-ready motion library for React.
*   **Recharts:** A composable charting library built with React and D3.
*   **Zod:** A TypeScript-first schema declaration and validation library.
*   **React Hook Form:** A performant, flexible and extensible forms library with easy-to-use validation.
*   **Sonner:** An opinionated toast component for React.
*   **Lucide React:** A beautiful collection of open-source icons.
*   **date-fns:** A modern JavaScript date utility library.
*   **Embla Carousel React:** A carousel library for React.
*   **Next.js Themes:** A theme provider for Next.js applications.
*   **pnpm:** A fast, disk space efficient package manager.

## Project Structure

The project follows a standard React application structure, organized for maintainability and scalability:

```
nigeria-map-app/
├── public/
│   ├── nigeria_map.svg
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/             # Static assets like images
│   ├── components/         # Reusable React components
│   │   └── ui/             # Radix UI components and custom UI elements
│   ├── data/               # Data files (e.g., statesData.js)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions (e.g., utils.js)
│   ├── index.css
│   └── main.jsx
├── .eslintrc.js
├── jsconfig.json
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
└── index.html
```

*   `public/`: Contains static assets served directly by the web server.
*   `src/`: Houses the main application source code.
*   `src/components/ui/`: Contains UI components built using Radix UI and custom styles.
*   `src/data/`: Stores data files used by the application, such as geographical data for Nigerian states.
*   `src/hooks/`: Custom React hooks for encapsulating reusable logic.
*   `src/lib/`: Utility functions and helper modules.
*   `package.json`: Defines project metadata and lists dependencies.
*   `vite.config.js`: Configuration file for Vite.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js** (LTS version recommended)
*   **pnpm** (Package Manager for Node.js)

    If you don't have pnpm, you can install it globally using npm:
    ```bash
    npm install -g pnpm
    ```

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/smokemoha/nigeria-map-app.git  # Replace with actual repository URL
    cd nigeria-map-app
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

### Running the Application

To start the development server:

```bash
pnpm dev
```

This will launch the application in development mode, typically accessible at `http://localhost:5173`. The application will automatically reload if you make any changes to the source code.

### Building for Production

To build the application for production deployment:

```bash
pnpm build
```

This command will compile and optimize the application, placing the production-ready files in the `dist/` directory.

### Linting

To run ESLint to check for code quality and style issues:

```bash
pnpm lint
```

## Usage

Once the development server is running, open your web browser and navigate to `http://localhost:5173` (or the port indicated in your console).

Upon loading, you will see an interactive map of Nigeria. You can:

*   **Explore States:** Click on any state on the map to view detailed information, statistics, or associated data points. The application is designed to dynamically display relevant content based on your selection.
*   **Interact with UI Elements:** Utilize the various interactive components (e.g., dropdowns for filtering, sliders for adjusting parameters, dialogs for detailed views) to customize your data exploration experience.
*   **Data Visualization:** If integrated, charts and graphs will dynamically update to reflect the selected state or data filters, providing visual insights into the underlying data.

## Contributing

We welcome contributions to the Nigeria Map Application! To contribute, please follow these guidelines:

### Reporting Bugs and Suggesting Features

*   Before opening a new issue, please check the existing issues to see if your bug or feature request has already been reported.
*   When reporting a bug, provide clear and concise steps to reproduce the issue, expected behavior, and actual behavior. Include screenshots or error messages if possible.
*   When suggesting a new feature, describe the feature, its potential benefits, and any relevant use cases.

### Development Workflow

1.  **Fork the repository:** Click the 'Fork' button at the top right of the repository page on GitHub.
2.  **Clone your forked repository:**

    ```bash
    git clone https://github.com/your-username/nigeria-map-app.git  # Replace with your forked repository URL
    cd nigeria-map-app
    ```

3.  **Create a new branch:** Choose a descriptive name for your branch (e.g., `feature/add-data-filter`, `bugfix/fix-map-rendering`).

    ```bash
    git checkout -b feature/your-feature-name
    ```

4.  **Make your changes:** Implement your feature or bug fix. Ensure your code adheres to the project's coding standards and best practices.

5.  **Test your changes:** Thoroughly test your changes to ensure they work as expected and do not introduce new issues.

6.  **Commit your changes:** Write clear, concise, and descriptive commit messages. Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification if possible.

    ```bash
    git commit -m 



    feat: Add new data filtering option
    ```

7.  **Push your changes to your forked repository:**

    ```bash
    git push origin feature/your-feature-name
    ```

8.  **Open a Pull Request (PR):**
    *   Go to the original repository on GitHub.
    *   You will see a prompt to create a new pull request from your recently pushed branch.
    *   Provide a clear title and detailed description of your changes. Reference any related issues.
    *   Ensure all automated checks (if any) pass.

### Code Style

This project uses ESLint for code linting. Please ensure your code adheres to the configured style by running `pnpm lint` before committing.


## Contact

For any questions or inquiries, please open an issue on the GitHub repository.



