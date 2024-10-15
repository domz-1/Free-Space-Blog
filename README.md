![image](https://github.com/user-attachments/assets/3efae89f-a1f1-4d14-bfc0-c794f17d0100)


# Blog React Vite Project

This project is a blog application built with React and Vite, featuring user authentication, protected routes, and CRUD operations for blog posts.

## Demo

You can view a live demo of the project here: [https://domz-blog.netlify.app/](https://domz-blog.netlify.app/)

## Technologies Used

- **React** (v18.3.1): A JavaScript library for building user interfaces.
- **Vite** (v5.4.8): A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **React Router** (v6.26.2): Declarative routing for React applications.
- **Redux Toolkit** (v2.2.8): The official, opinionated, batteries-included toolset for efficient Redux development.
- **Material-UI** (v6.1.3): A popular React UI framework implementing Google's Material Design.
- **Firebase** (v10.14.0): A platform for building web and mobile applications.
- **Formik** (v2.4.6): An open source form library for React.
- **Yup** (v1.4.0): A JavaScript schema builder for value parsing and validation.
- **Sass** (v1.79.5): A preprocessor scripting language that is interpreted or compiled into CSS.

## Project Structure

The project includes the following main components:

- `CreatePost.jsx`: Handles the creation of new blog posts.
- `EditPage.jsx`: Allows editing of existing blog posts.
- `Home.jsx`: The main landing page of the blog.
- `Login.jsx`: Manages user authentication.
- `NavBar.jsx`: Navigation component for the application.
- `ProtectedRoutes.jsx`: Implements route protection for authenticated users.
- `SignUp.jsx`: Handles new user registration.

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint for code linting.
- `npm run preview`: Locally preview the production build.

## Development

This project uses ESLint for code linting. Make sure to run `npm run lint` before committing your changes.

## Deployment

To deploy the application, run `npm run build` to create a production-ready build. The output will be in the `dist` folder, which can be deployed to your hosting platform of choice.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
