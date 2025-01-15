# Grid Master: React Frontend

Welcome to **Grid Master**, a feature-rich, mobile-responsive React application designed for managing grids and user profiles. This README provides an overview of the app's functionality, architecture, and key modules.

---
# Live Demo

For live demo [Click here](https://grid-master-app.vercel.app/).  

## Features Overview

### 1. **Authentication**  
- **Login:** Secure login functionality with form validation.  
- **Signup:** User registration with field validations using Yup and React Hook Form.  
- **Forgot Password:** Password recovery flow integrated with backend support.  
- **Google Login:** Login using Google OAuth for a seamless experience.  

### 2. **Route Protection**  
- Routes are protected to ensure pages are only accessible after successful login.  
- Redirection to the login page for unauthenticated users.  

### 3. **Mobile Responsive Design**  
- Fully optimized for mobile and desktop screens.  
- UI components styled with MUI to ensure responsiveness.  

### 4. **Main Pages**
#### **Grid Management**
- **Grid List View:**  
  Displays all created grids with server-side pagination.  
  "View More" button to fetch additional grids.  
  Allows adding a new grid by providing:
  - Name
  - Description
  - File upload
  - Associated actions  

- **Grid Data Page:**  
  Displays the selected grid’s data using AG Grid.  
  - **Features:**  
    - Server-side pagination for efficient data handling.  
    - Global search functionality.  
    - Column-level filtering.  
    - Action section displaying selected actions during grid creation.  
    - Options to delete or edit records.  

#### **User Profile**  
- View user profile details.  

---

## Key Technologies Used

### 1. **React**  
- Component-based architecture for a modular and reusable codebase.  

### 2. **MUI (Material-UI)**  
- Provides a professional design and layout for the application.  

### 3. **AG Grid**  
- Powerful grid system for displaying and managing grid data.  
- Supports pagination, filtering, and custom actions.  

### 4. **Redux**  
- Manages global user state, including authentication status and user details.  

### 5. **React Hook Form + Yup**  
- Simplifies form handling with schema-based validation.  

### 6. **Firebase**  
- Handles file uploads for grid creation.  

### 7. **Google OAuth**  
- Simplifies user authentication with Google login integration.  

### 8. **Custom Hooks**  
- **`usePagination` Hook:** Streamlines server-side pagination across the app.  

### 9. **API Wrapper**  
- Centralized handler for API calls to communicate with the backend efficiently.  

---

## Folder Structure

```plaintext
src
├── components       # Reusable UI components (e.g., forms, modals, buttons)
├── pages            # Main pages (Grid, Grid Data, User Profile)
├── hooks            # Custom hooks (e.g., usePagination)
├── store            # Redux slices and configuration
├── services         # API wrapper for backend communication
├── utils            # Helper functions and utilities
├── App.js           # Main app entry point
├── index.js         # Application root
```

---

## Environment Variables

The application requires the following environment variables:  

| Variable              | Description                             |
|-----------------------|-----------------------------------------|
| `REACT_APP_BASE_URL`  | Base URL for backend API communication |

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/grid-master.git
   ```

2. Navigate to the project directory:
   ```bash
   cd grid-master
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Create a `.env` file and add the required environment variable:
   ```plaintext
   REACT_APP_BASE_URL=http://localhost:8080/api/v1
   ```

5. Start the development server:
   ```bash
   yarn start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Core Modules and Features

### 1. **Authentication**
- **Backend Integration:** Communicates with endpoints such as `/login`, `/signup`, and `/recover-acc`.  
- **Google OAuth:** Facilitated by Firebase for a seamless login experience.  

### 2. **Grid Management**
- Uses AG Grid for robust data handling and display.  
- Server-side pagination integrated with `usePagination`.  
- Global and column-level filtering for advanced search functionality.  

### 3. **User Profile**
- Provides a user-friendly interface to view profile details.  

---

## Backend Integration

- This application communicates with the **Grid Master Backend**, built with Node.js, Express, and TypeScript.  
- For backend setup and detailed information, refer to the [backend README](https://github.com/ABDULLAH-SALEEM/grid-master-backend).  

---

## Contributing

1. Fork the repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add your message here"
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature/your-feature-name
   ```  
5. Submit a pull request.  

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.  

---

## Contact

For queries, reach out to the **Grid Master** development team at:  
**Email:** saleemabdullah764@gmail.com  

Enjoy using **Grid Master**! 🚀
