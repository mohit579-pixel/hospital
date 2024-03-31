# MediConnect
Problem Statement: Create a secure web platform for healthcare institutions to streamline the appointment scheduling process, optimize resource allocation, and minimize patient wait times. The solution should integrate with existing electronic health record systems, prioritize appointments based on urgency, and offer patients the flexibility to book appointments online.

# Features
User Registration and Authentication: Patients and specialists can register and log in securely.
Appointment Booking System: Patients can schedule appointments with specialists based on their availability.
Ambulance Tracking System: GPS technology integrated with Google Maps API enables tracking of ambulance locations in real-time.

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Real-time Communication:** Socket.IO
- **Ambulance Tracking:** GPS integrated with Google Maps API

# Setup Instructions
Vedio Link : https://drive.google.com/file/d/1F1l-_IbdKByoElez3mpghUweri6yU4GQ/view?usp=drive_link


Deploy Link: https://hospital-bbha.onrender.com


OR
Clone the repository:
```
git clone https://github.com/yourusername/telemedicine-platform.git
```

cd telemedicine-platform
Install dependencies:
```
npm install
```

Configure environment variables:

Create a .env file in the root directory and specify the following variables:

```

PORT=3000
MONGODB_URI=mongodb://localhost:27017/telemedicine
```
Replace mongodb://localhost:27017/telemedicine with your MongoDB connection URI.

Start the server:

```
npm start
```
Access the application:

Open a web browser and navigate to 

```
http://localhost:3000.
```

