import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FlashCard = ({ flashInfo }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashInfo.length);
        setShowAnswer(false);
    };

    const handlePreviousClick = () => {
        if (currentIndex === 0) {
            setCurrentIndex(flashInfo.length - 1);
        } else {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
        setShowAnswer(false);
    };

    const handleFlipClick = () => {
        setShowAnswer((prevShowAnswer) => !prevShowAnswer);
    };

    const currentCard = flashInfo[currentIndex];

    return (
        <div className="w-full flex justify-center items-center p-6">
            <div
                className="bg-black text-white rounded-full mx-10 w-[2.5rem] h-[2.5rem] flex justify-center items-center cursor-pointer"
                onClick={handlePreviousClick}
            >
                <IoIosArrowBack className="text-3xl text-white" />
            </div>

            <div className="mx-5 relative w-[30rem] h-[26rem]">
                <AnimatePresence initial={false} mode="wait">
                    {!showAnswer ? (
                        <motion.div
                            key="question"
                            initial={{transform: "rotateY(90deg)" }}
                            animate={{ transform: "rotateY(0deg)" }}
                            exit={{ transform: "rotateY(-90deg)" }}
                            transition={{ duration: 0.4 }}
                            className="absolute w-full h-full bg-[#fe4a49] rounded-3xl flex justify-center items-center flex-col"
                        >
                            <div className="justify-between h-[10%] flex w-full">
                                <div className="bg-white w-24 h-full rounded-tl-2xl flex justify-center items-center text-lg font-bold">
                                    Card {currentIndex + 1}
                                </div>
                            </div>
                            <div className="h-[65%] grid grid-rows-5 items-center text-2xl font-bold text-white px-8 text-center flex-col pb-12 pt-5">
                                <div className="mb-14 text-4xl text-gray-100 row-span-2">Question:</div>
                                <div className="row-span-3">{currentCard.question}</div>
                            </div>
                            <div className="h-[25%] flex justify-center items-center">
                                <button
                                    className="bg-white text-xl w-32 h-10 rounded-3xl font-bold tracking-wider"
                                    onClick={handleFlipClick}
                                >
                                    FLIP
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="answer"
                            initial={{  transform: "rotateY(90deg)" }}
                            animate={{ transform: "rotateY(0deg)" }}
                            exit={{ transform: "rotateY(-90deg)" }}
                            transition={{ duration: 0.4 }}
                            className="absolute w-full h-full bg-[#c9c4ed] rounded-3xl flex justify-center items-center flex-col"
                        >
                            <div className="justify-between h-[10%] flex w-full">
                                <div className="bg-white w-24 h-full rounded-tl-2xl flex justify-center items-center text-lg font-bold">
                                    Card {currentIndex + 1}
                                </div>
                            </div>
                            <div className="h-[65%] grid grid-rows-5 items-center text-xl font-bold text-black px-8 text-center flex-col pb-12 pt-5">
                                <div className="mb-14 text-4xl text-gray-600 row-span-2">Answer:</div>
                                <div className="row-span-3">{currentCard.answer}</div>
                            </div>
                            <div className="h-[25%] flex justify-center items-center">
                                <button
                                    className="bg-white text-xl w-32 h-10 rounded-3xl font-bold tracking-wider"
                                    onClick={handleFlipClick}
                                >
                                    FLIP
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div
                className="bg-black text-white rounded-full mx-10 w-[2.5rem] h-[2.5rem] flex justify-center items-center cursor-pointer"
                onClick={handleNextClick}
            >
                <IoIosArrowForward className="text-3xl" />
            </div>
        </div>
    );
};

export default FlashCard;
