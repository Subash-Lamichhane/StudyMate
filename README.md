
---

# StudyMate: Your Interactive Study Companion
<p align="center">
    <a href="https://github.com/Subash-Lamichhane/StudyMate/" target="blank">
        <img src="https://img.shields.io/github/watchers/Subash-Lamichhane/StudyMate?style=for-the-badge&logo=appveyor" alt="Watchers"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/StudyMate/fork" target="blank">
        <img src="https://img.shields.io/github/forks/Subash-Lamichhane/StudyMate?style=for-the-badge&logo=appveyor" alt="Forks"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/StudyMate/stargazers" target="blank">
        <img src="https://img.shields.io/github/stars/Subash-Lamichhane/StudyMate?style=for-the-badge&logo=appveyor" alt="Star"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/StudyMate/issues" target="blank">
        <img src="https://img.shields.io/github/issues/Subash-Lamichhane/StudyMate?style=for-the-badge&logo=appveyor" alt="Issue"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/StudyMate/pulls" target="blank">
        <img src="https://img.shields.io/github/issues-pr/Subash-Lamichhane/StudyMate?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/>
    </a>
    <a href="https://github.com/Subash-Lamichhane/StudyMate/blob/master/LICENSE" target="blank">
        <img src="https://img.shields.io/github/license/Subash-Lamichhane/StudyMate?style=for-the-badge&logo=appveyor" alt="License" />
    </a>
</p>

## Overview

StudyMate is an innovative web application designed to enhance the learning experience by providing pagewise summaries of PDFs and generating interactive flashcards. With the integration of Shepherd.js, StudyMate offers a guided tour feature to help users navigate through the application's functionalities seamlessly. StudyMate makes it particularly useful for last-minute revision sessions, allowing users to quickly review key concepts and information in a structured manner.

## Key Features

### Interactive Guided Tour

StudyMate utilizes the Shepherd.js library to offer an interactive guided tour, ensuring that users can easily navigate and utilize the application's features. This guided tour provides step-by-step instructions and highlights key elements of the user interface, enhancing the overall user experience.

### PDF Pagewise Summary

Upload a PDF to StudyMate, and it will generate a pagewise summary of the content, helping users quickly grasp the main points without having to read through the entire document.

### Flashcards Generation

StudyMate allows users to create flashcards from the pdf content. Each flashcard contains a question on one side and the answer on the flip side, facilitating effective revision and learning.

### Question and Answer

Ask questions about the content and get answers instantly, leveraging the power of the Gemini API to provide accurate and contextual responses.

## Supported Platforms

StudyMate is a web-based application accessible on any modern web browser, making it versatile and easy to use across different devices and operating systems.

## Demo 
<video src="https://github.com/Subash-Lamichhane/StudyMate/assets/109226874/d433b126-d802-4baa-9a07-0a729e67d06d"></video>

## Getting Started

### Dependencies

- Node.js
- React
- Express
- Shepherd.js
- Gemini API

### Installation

#### Clone the Repository

```bash
git clone https://github.com/Subash-Lamichhane/StudyMate.git
```

#### Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd StudyMate/frontend
yarn
```

Start the development server:

```bash
yarn run dev
```

#### Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd ../server
yarn install
```

Set up the environment variables by creating a `.env.local` file in the server directory and add your Gemini API key:

```bash
API_KEY=AIzaS*************
```

Start the backend server:

```bash
yarn start
```

## Usage

Visit the frontend application by opening your browser and navigating to:

```
http://localhost:5173/
```

Ensure the backend server is running at:

```
http://localhost:3000
```

## Screenshots

<!-- Add your screenshots here -->
Landing Page:
![Landing1](https://github.com/Subash-Lamichhane/StudyMate/assets/109226874/c310e4b9-32ed-4bf0-9d78-7a308dec6104)

![Landing2](https://github.com/Subash-Lamichhane/StudyMate/assets/109226874/25b0012c-9558-4341-811e-1289b7f78066)

Home Page:
![HomePage](https://github.com/Subash-Lamichhane/StudyMate/assets/109226874/008b2f32-1fc8-4d46-bbef-c2b185bb8835)

Summary Page:
![SummaryPage1](https://github.com/Subash-Lamichhane/StudyMate/assets/109226874/f86fde3c-032f-4dd9-8156-b434518cf4b5)
<!-- ![SummaryPage1](https://github.com/Subash-Lamichhane/StudyMate/assets/109226874/89d27d65-38ed-46c9-a4fa-51e8c4371cfd) -->

Flashcards Page:
![Flashcards](https://github.com/Subash-Lamichhane/StudyMate/assets/109226874/4bb5f647-125f-476e-99a3-92872259ed65)

## Contributing

We welcome contributions from the community! If you'd like to contribute to StudyMate, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button on GitHub to create your copy.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/yourusername/StudyMate.git
   ```

3. **Create a Branch**:
   ```bash
   git checkout -b your-branch-name
   ```

4. **Make Changes**: Implement your changes.

5. **Commit Your Changes**:
   ```bash
   git commit -m "Description of your changes"
   ```

6. **Push Your Changes**:
   ```bash
   git push -u origin your-branch-name
   ```

7. **Create a Pull Request**: Submit your changes for review.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Shepherd.js](https://shepherdjs.dev/) for the interactive guided tour library
- [React](https://reactjs.org/) for the amazing JavaScript library
- [Node.js](https://nodejs.org/) for the robust JavaScript runtime
- [Express.js](https://expressjs.com/) for the minimalist web application framework
- [Gemini API](https://gemini.com/) for their powerful API integration

---

