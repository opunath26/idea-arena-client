🚀 IdeaArena | Innovation & Contest Management Platform
IdeaArena is a sophisticated multi-vendor contest platform where creativity meets opportunity. It allows innovators to showcase their ideas, creators to host diverse challenges, and administrators to oversee a thriving ecosystem. Whether it’s article writing, business strategies, or creative design, IdeaArena is the ultimate hub for competition and excellence.

🔗 Live Links
Live Site: https://idea-arena-74762.web.app

Client Repository: [GitHub Link](https://github.com/opunath26/idea-arena-client.git)

Server Repository: [GitHub Link](https://github.com/opunath26/idea-arena-server.git)

✨ Key Features
🛡️ Role-Based Access Control: Dedicated and secure dashboards for Users, Creators, and Admins with specific permissions.

💳 Secure Payment Integration: Integrated Stripe API for secure contest registration fees and transaction management.

🔍 Dynamic Filtering & Search: Real-time search by contest name and category-based filtering using an intuitive tab system.

⏱️ Real-time Countdown Timer: Live deadline tracking for each contest to create urgency and keep participants informed.

🏆 Winner Management: A streamlined process for Creators to review submissions and declare winners, automatically updating the public UI.

📈 Visual Analytics: Personalized user profiles featuring dynamic Pie Charts (Recharts) to visualize win/loss ratios and participation stats.

🥇 Global Leaderboard: A dynamic ranking system showcasing top performers based on their total contest wins.

⚡ High Performance: Optimized data management using TanStack Query for efficient caching, synchronization, and state handling.

📝 Task Submission System: A seamless modal-based interface for participants to submit project links and track their status.

📱 Responsive & Modern UI: A fully mobile-responsive design built with Tailwind CSS and DaisyUI for a premium user experience.

🛠️ Robust Admin Tools: Full control over user roles, contest approvals, and content moderation to ensure platform integrity.

🛠️ Technologies Used
Frontend:
Core: React.js

State & Data Fetching: TanStack Query (React Query)

Styling: Tailwind CSS & DaisyUI

Forms: React Hook Form

Charts: Recharts

Routing: React Router DOM

Backend:
Environment: Node.js

Framework: Express.js

Database: MongoDB

Security: JSON Web Token (JWT)

Authentication: Firebase Auth

Payments: Stripe API

🚀 Local Installation Guide
Clone the Repository:

Bash

git clone https://github.com/opunath26/idea-arena-client.git
Install Dependencies:

Bash

# For Client
cd client
npm install

# For Server
cd ../server
npm install
Setup Environment Variables (.env):

Create a .env file in both the client and server directories.

Add your Firebase Config, MongoDB URI, Stripe Secret Key, and JWT Secret.

Run the Application:

Bash

# Start Server
npm start

# Start Client
npm run dev

📬 Contact
Developer Email - aputhecoder@gmail.com