# DevTinder - Developer Dating Application 💻❤️

A full-stack dating application for developers built with React, Node.js, MongoDB, and Socket.io. Connect with fellow developers, send connection requests, and chat in real-time!

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features Implementation](#key-features-implementation)
- [Deployment](#deployment)

## ✨ Features

### User Management
- 🔐 User authentication (Login/Signup)
- 👤 Profile management with edit capabilities
- 🚪 Secure logout functionality
- 🔒 Protected routes (login required)

### Social Features
- 📱 User feed with profile cards
- ➡️ Send connection requests
- ✅ Accept/Reject connection requests
- 👥 View all connections
- 📬 View pending connection requests
- 🚫 Ignore users from feed

### Communication
- 💬 Real-time chat using WebSockets (Socket.io)
- 📧 Automated email notifications via AWS SES
- 🔔 Toast notifications for user actions

### Premium Features
- 💳 Razorpay payment gateway integration
- 👑 Premium membership plans
- 📊 Order management and tracking

### Automation
- ⏰ Scheduled cron jobs for daily notifications
- 📨 Bulk email sending for connection requests
- 🤖 Automated webhook handling

## 🛠️ Tech Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + DaisyUI
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Real-time:** Socket.io Client

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Real-time:** Socket.io
- **Process Manager:** PM2

### Third-Party Services
- **Payments:** Razorpay
- **Email:** AWS SES
- **Hosting:** AWS EC2
- **CDN/DNS:** Cloudflare
- **Domain:** GoDaddy
- **SSL:** Cloudflare SSL

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.17.0 or higher)
- MongoDB instance
- npm or yarn
- Git

### Installation

#### Frontend Setup

```bash
# Clone the repository
git clone <repository-url>
cd devtinder-web

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables
VITE_BASE_URL=http://localhost:7777

# Start development server
npm run dev
```

#### Backend Setup

```bash
# Navigate to backend directory
cd devtinder-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables
PORT=7777
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region

# Start the server
npm start
```

## 📁 Project Structure

```
devtinder-web/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── Footer.jsx
│   │   ├── UserCard.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Feed.jsx
│   │   ├── Login.jsx
│   │   ├── Connections.jsx
│   │   ├── Profile.jsx
│   │   ├── ConnectionRequests.jsx
│   │   ├── Chat.jsx
│   │   └── Premium.jsx
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   ├── utils/
│   │   ├── constants.js
│   │   └── axios.js
│   └── App.jsx
└── ...
```

## 🔑 Key Features Implementation

### Authentication & Authorization

```javascript
// Protected routes implementation
- Login required for all routes except /login
- JWT token validation
- Automatic redirect to /login if unauthorized
- Credentials included in axios requests
```

### State Management with Redux

```javascript
// Redux store configuration
- User slice for authentication state
- Feed slice for user cards
- Connections slice for user connections
- Connection requests slice
```

### CORS Configuration

```javascript
// Backend CORS setup
origin: "http://localhost:5173", // Frontend URL
credentials: true
```

### Axios Configuration

```javascript
// All API calls with credentials
axios.get(url, { withCredentials: true })
axios.post(url, data, { withCredentials: true })
```

## 🌐 Deployment

### AWS EC2 Deployment Steps

#### 1. Server Setup

```bash
# Connect to EC2 instance
chmod 400 devTinder-secret.pem
ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com

# Install Node.js v16.17.0
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone <repository-url>
```

#### 2. Frontend Deployment

```bash
# Build frontend
npm install
npm run build

# Install Nginx
sudo apt update
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Deploy build files
sudo cp -r dist/* /var/www/html/

# Enable port 80 in AWS Security Group
```

#### 3. Backend Deployment

```bash
# Update MongoDB connection
# Allow EC2 public IP in MongoDB Atlas

# Install PM2 globally
npm install pm2 -g

# Start application with PM2
pm2 start npm --name "devTinder-backend" -- start

# PM2 commands
pm2 logs                    # View logs
pm2 list                    # List all processes
pm2 stop devTinder-backend  # Stop application
pm2 delete devTinder-backend # Delete process
pm2 flush devTinder-backend  # Clear logs
```

**Documentation:**
- [Razorpay Node.js Integration](https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/)
- [Webhook Validation](https://razorpay.com/docs/webhooks/validate-test/)

### Chat Features

- ✅ One-on-one real-time messaging
- ✅ Message persistence in MongoDB
- ✅ Chat history retrieval
- 🔄 **TODO:** Authentication in WebSockets
- 🔄 **TODO:** Friend verification before messaging
- 🔄 **TODO:** Online status indicator
- 🔄 **TODO:** Last seen timestamp
- 🔄 **TODO:** Message limit/pagination

## 🎨 UI Components

### Component List

- **NavBar:** Navigation with user authentication state
- **Footer:** Application footer
- **UserCard:** Display user profile on feed
- **ConnectionCard:** Show connection details
- **RequestCard:** Display connection requests
- **ChatWindow:** Real-time messaging interface
- **PremiumCard:** Payment and subscription UI

### Styling

```
Tailwind CSS + DaisyUI for rapid UI development
Responsive design for mobile and desktop
Toast notifications for user feedback
```

### Features
- 🔄 Online/offline status indicator
- 🔄 Last seen timestamp
- 🔄 Message pagination/limiting
- 🔄 Typing indicators
- 🔄 Read receipts

## 🙏 Acknowledgments

- AWS SES Documentation
- Razorpay Documentation
- Socket.io Documentation
- MongoDB Atlas
- Cloudflare

---

**Happy Coding!** 💻❤️

*Connect with developers worldwide on DevTinder!*
