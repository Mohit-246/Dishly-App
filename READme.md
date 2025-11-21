# Recipe App (Dishly)

A full-stack MERN recipe application with authentication, image uploads using Cloudinary, and beautiful UI built with React + Tailwind + Vite.

---

## 📌 Features

* User authentication (signup, login, JWT)
* Create, edit, delete recipes
* Upload recipe images using Cloudinary
* View author profiles
* Responsive UI with Tailwind CSS
* Backend built with Express & MongoDB

---

## 📸 Screenshots

Add screenshots by placing the images inside the `client/public` or root folder and referencing them like this:

```md
![Home Page](./screenshots/home.png)
![Recipe Page](./screenshots/recipe.png)
![Login Page](./screenshots/login.png)
```

Example preview placeholders:

![Preview Screenshot 1](./screenshots/preview1.png)
![Preview Screenshot 2](./screenshots/preview2.png)

> Create a `screenshots` folder in your project and add images there.

---

## 🚀 Tech Stack

### **Frontend**

* React
* React Router
* Tailwind CSS
* Vite

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* Multer for file uploads
* Cloudinary for image hosting
* JWT authentication

---

## 📂 Project Structure

```
ROOT
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
└── client
    ├── public
    ├── src
    │   ├── components
    │   ├── hooks
    │   ├── pages
    │   ├── context
    │   └── App.jsx
    └── package.json
```

---

## 🛠️ Setup Instructions

### **1. Clone the repository**

```bash
git clone <repo-url>
cd recipe-app
```

### **2. Install dependencies**

#### Backend:

```bash
cd server
npm install
```

#### Frontend:

```bash
cd client
npm install
```

### **3. Create a `.env` file in server**

```env
MONGO_URL=your_mongo_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **4. Start the development servers**

Backend:

```bash
cd server
npm run start
```

Frontend:

```bash
cd client
npm run dev
```

---

## 🤝 Contributing

Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under ISC.
