# Capstone-Project

A simple full stack social media web application built with React, Node.js/Express, and MongoDB. This application mirrors the functionality and design of Twitter as a learning project.

This project was developed as part of a Capstone Project for a Web Development course.

## Overview

The project is a full stack application that allows users to create accounts, post text-based content, and like/comment on posts.

## Features

- User registration and login
- Post creation
- Post likes and comments
- Responsive UI

## Technologies Used

### **Frontend**

- React
- React Router
- Material UI

### **Backend**

- Node.js
- Express
- MongoDB
- JSON Web Tokens

### **Development Tools**

- Docker
- Prettier
- Git & Github

## Installation

Assuming you have Node.js, npm and Docker installed, follow these steps to set up the project **locally**:

1. Clone the repository

```bash
git clone https://github.com/JunoCatto/Capstone-Project.git
```

**Backend**

2. Run the docker compose file in the root directory

```bash
docker compose up -d
```

**Frontend**

3. Navigate to the client directory and install dependencies

```bash
cd client
npm install
npm run dev
```

Once running in the browser, you can access both the front and backend in browser

```bash
http://localhost:5173 # Frontend
http://localhost:5000 # Backend
```

## Possible future improvements

- Add the ability to remove/edit posts
- Add the ability to follow other users
- Add a search bar to the feed to find user's posts
- Fix user profile pictures, as right now if the file is too large it won't upload.
