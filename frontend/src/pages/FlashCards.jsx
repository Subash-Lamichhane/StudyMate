import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FlashCard from '../components/Card';
import Footer from '../components/Footer';

const FlashCards = () => {
  const location = useLocation();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    if (location.state && location.state.flashcards) {
      setFlashcards(location.state.flashcards);
    }
  }, [location.state]);

  // Check if flashcards array is empty
  if (flashcards.length === 0) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"><Navbar /><div>No flashcards available.</div></div>;
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full flex flex-col py-8 px-32">
        <h1 className="text-4xl font-bold mb-4">Flashcards</h1>
        <p className="text-lg text-gray-700 mb-8">Test your knowledge with the flashcards below. Flip the cards to see the answers.</p>
        <div className="w-full flex flex-col items-center">
          <FlashCard flashInfo={flashcards.responseText}></FlashCard>
        </div>
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default FlashCards;
