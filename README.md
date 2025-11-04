# Carbon NFT Booking Simulator

A modern, responsive web application that simulates the creation and minting of unique Carbon Offset NFTs. This project leverages the power of the Google Gemini API to generate AI-powered images and descriptions, providing a dynamic and engaging user experience for a simulated blockchain application.

![Carbon NFT Booking Screenshot](https://storage.googleapis.com/aistudio-o-prd-public-buckets/project-showcase/carbon-nft-booking.png)
*(You can replace this placeholder image with a screenshot or GIF of your running application!)*

---

## ✨ Features

- **🤖 AI-Powered NFT Generation**: Utilizes **Google Gemini** (`gemini-2.5-flash` for text and `imagen-4.0-generate-001` for images) to create unique, high-quality artwork and descriptions for each NFT based on user inputs.
- **🔐 Simulated Wallet Login**: A persistent, username-based login system that perfectly mimics a real dApp wallet connection without requiring MetaMask or a real blockchain. This allows for a seamless demonstration and user testing experience.
- **🖼️ Personalized NFT Dashboard**: After logging in, users have access to a personal dashboard displaying a gallery of all the NFTs they have "minted," tied to their unique username.
- ** minting Minting Flow**: A professional two-step process where users first generate a preview of their NFT, and then click to "mint" it to their personal collection.
- **💅 Modern & Responsive UI**: Features a sleek, dark theme with vibrant green accents, built with **Tailwind CSS** for a clean and professional look that adapts beautifully to any screen size.
- **📜 Detailed NFT View**: Includes a "Read More" modal that allows users to view the full, unabridged AI-generated description and other details of each NFT.
- **💾 Local Persistence**: Your simulated wallet address and all minted NFTs are saved in your browser's local storage, allowing you to log out and log back in to the same account.
- **✅ Polished User Feedback**: Custom, animated modals provide clear feedback for login and successful minting transactions.

## 🛠️ Technology Stack

- **Frontend**: [**React**](https://reactjs.org/) (with TypeScript)
- **Styling**: [**Tailwind CSS**](https://tailwindcss.com/)
- **AI Generation**: [**Google Gemini API**](https://ai.google.dev/)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Persistence**: Browser Local Storage

## 🚀 Getting Started

To run this project, you need a modern web browser and a Google Gemini API key.

### Configuration

This application requires a Google Gemini API key to function.

1.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  The application is designed to use an environment variable named `API_KEY`. Make sure this variable is available in the environment where you are running the project.

### Running the Application

Simply open the `index.html` file in a web browser. For the best experience, it's recommended to serve the files using a simple local server, but it can also be run directly from the filesystem.

## 🕹️ How to Use the Simulator

1.  **Connect Wallet**: Click the "Connect Wallet" button in the top-right corner.
2.  **Enter Username**: A login modal will appear. Enter any username (e.g., `my-collection`) to create or access your simulated wallet. Use the same username to log back in later.
3.  **Fill in Details**: Complete the form with a Project Name, Location, and the number of CO₂ Tons Offset.
4.  **Generate Preview**: Click the "Generate NFT Preview" button. The application will call the Gemini API to create a unique image and description.
5.  **Mint NFT**: Once the preview appears, review the details and click "Mint NFT".
6.  **Success!**: A success modal will confirm the mint. Your new NFT will now appear in the "My NFT Dashboard" section at the bottom of the page.
7.  **View Details**: Click "Read More" on any NFT with a long description to see its full details in a pop-up modal.

---

This project was created to demonstrate the integration of modern frontend technologies with powerful generative AI for creating compelling and interactive web applications.
