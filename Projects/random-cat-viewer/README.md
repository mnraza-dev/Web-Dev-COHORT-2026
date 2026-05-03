
# 🐱 Random Cat Viewer

A modern React app that fetches and displays random cat images with a smooth, production-ready UI. Built with performance, UX, and clean architecture in mind.

Currently, two official plugins are available:
## 🚀 Features
#### 🎯 Fetch random cat images from API
#### ⚡ Skeleton loader (no layout shift)
#### 🔁 Retry mechanism on failure
#### ⏳ Loading & error state handling
#### 🎨 Modern UI with TailwindCSS
#### 🧠 Clean component architecture
## 🛠 Tech Stack
#### ⚛️ React (Hooks)
#### 💨 TailwindCSS
#### 🌐 Fetch API
#### 🧩 Functional Components

## Expanding the ESLint configuration
```bash
📂 Project Structure
src/
│
├── components/
│   ├── CatCard.jsx
│   ├── Skeleton.jsx
│
├── App.jsx
├── main.jsx
```
### ⚙️ Installation & Setup

#####  Clone repo
```bash 
git clone  https://github.com/mnraza-dev/random-cat-viewer.git
```
## Start development server
```bash
npm run dev
```
## 🌐 API Used
Random Cat API
https://api.freeapi.app/api/v1/public/cats/cat/random

## 💡 Usage
```javascript 
<CatCard
  data={{
    image,
    loading,
    error,
    getRandomCatImage
  }}
/>
```
#### 🧑‍💻 Author - MN Raza
#### ⭐ Contribute
Feel free to fork, improve, and submit PRs!

📜 License -
MIT License