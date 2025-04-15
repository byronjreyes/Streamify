# 🎬 **Streamify**

**Streamify** is a modern streaming platform that allows users to explore movies and TV series with a sleek, responsive design. It offers real-time data from the TMDB API and embedded video streaming from vidsrc.me, providing users with an immersive entertainment experience.

## 🚀 **Live Demo**
[Streamify Live](https://streamifyph.vercel.app/)

## 📸 **Preview**
![{47C50C56-771D-4577-94EE-9887A2B79CE2}](https://github.com/user-attachments/assets/9226839b-3221-4864-b98f-95a7684c4416)
![{9299CEDA-BD4B-4639-9A51-B8794548B0AB}](https://github.com/user-attachments/assets/b4b9980e-f0fc-4528-8a23-0fa186db2126)
![{421EE82C-38F0-4902-BE92-C64EEDB30105}](https://github.com/user-attachments/assets/31014ab8-7f23-4acd-923d-18deea8d1da8)

---

## 📂 **Features**
- 🎞️ Real-time movie and TV show data from TMDB API
- 🎬 Embedded video streaming for movies and TV shows
- 🎯 Auto-sliding banner for most popular movies
- 🔝 Top 10 trending section with interactive slider
- 📺 Grid layout for trending movies and TV shows
- 📑 Detailed modals for movie and TV show information
- 🌙 Modern dark theme inspired by Netflix

---

## 🔧 **Tech Stack**
- **React.js**
- **Vite**
- **Tailwind CSS**
- **TMDB API** (for movie and TV show data)
- **vidsrc.me API** (for video streaming)

---

## ⚙️ **3️⃣ Create a .env File**
In the root directory of your project, create a .env file and add your TMDB API key:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```


## ⚙️ **Installation Guide**

### 1️⃣ **Clone the Repository**
First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/streamify.git
cd streamify
```

### **2️⃣ Install Dependencies**
Make sure you have Node.js and npm installed. If not, you can download them from Node.js Official Website.

Then, install the necessary dependencies:
```bash
npm install
```


### **3️⃣ Create a .env File**
### **🔑 Where to Get Your TMDB API Key?**

In the root directory of your project, create a .env file and add your TMDB API key:
```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

- **Visit The Movie Database (TMDB) and create a free account.**
- **Go to your account settings and navigate to the API section.**
- **Apply for an API key by following their instructions.**
- **Copy your API key and paste it into the .env file as shown above.**



### **4️⃣ Run the Development Server**

To start the application locally, run:
```bash
npm run dev
```
Once the server is running, visit http://localhost:5173 in your browser.

### **5️⃣ Build for Production**

To build the application for production deployment, use the following command:
```bash
npm run build
```

This will generate an optimized production build in the dist/ directory.

### **✅ Troubleshooting Tips**

- **Make sure your API key is correctly placed in the .env file.**
- **Check if all dependencies are properly installed by running npm install.**
- **Verify that the TMDB API service is running and accessible.**
