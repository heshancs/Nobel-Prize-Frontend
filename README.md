# Project Title

Welcome to the Nobel Prize Frontend project! This project is a React application built with Vite and TypeScript, designed to showcase Nobel Prize-related content. It uses MUI for styling, and features user authentication and access management with Keycloak, including Google reCAPTCHA for security. The application also supports light and dark themes using a custom ThemeContext.


## Authors

- [Heshan Jayasinghe](https://github.com/heshancs)

## Technologies Used

**React:** A JavaScript library for building user interfaces.

**Vite:** A fast build tool and development server for modern web projects.

**TypeScript:** A superset of JavaScript that adds static types.

**MUI:** A popular React UI framework for building responsive, accessible, and customizable components.

**Keycloak:** An open-source identity and access management solution.

**Google reCAPTCHA:** A service to protect your site from spam and abuse.


## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/nobel-prize-frontend.git
```

2. Install the dependencies:

```bash
npm install
```

3. Rename the .env.example file to .env and configure your environment variables:



```bash
mv .env.example .env
```

4. Rename the .env.example file to .env and configure your environment variables:



```bash
npm run dev
```
    
    
## Screenshots

![App Screenshot - Light](https://asset.cloudinary.com/dyldogaxt/74c7a11d2485508037871152db19b380)

![App Screenshot - Dark](https://asset.cloudinary.com/dyldogaxt/eb83b5caedce549da523268c872b3b30)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_KEYCLOAK_URL`

`VITE_KEYCLOAK_REALM`

`VITE_KEYCLOAK_CLIENT`

`VITE_NOBEL_PRIZE_BASE_URL`

`VITE_APP_BASE_URL`

