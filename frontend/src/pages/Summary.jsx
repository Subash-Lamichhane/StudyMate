import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { FaQuestion } from 'react-icons/fa';
import './css/Summary.css'
const Summary = () => {
    const location = useLocation();
    const summaryData = location.state?.response || [];
    const pdffile = location.state?.selectedFile;
    const tagsData = location.state?.tagData;
    const titleData = location.state?.title;
    const totalPages = location.state?.totalPages;
    const uniqueTags = [...new Set(tagsData)];

    const [summary, setSummary] = useState(summaryData);
    const [question, setQuestion] = useState('');
    const [qnans, setQnans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageno, setPageNo] = useState(0);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [nextPageText, setNextPageText] = useState("Next Page >");
    const [tourVisible, setTourVisible] = useState(true);

    const capitalizeTitle = (title) => {
        if (typeof title !== 'string') {
            return ''; // Or handle the case where title is not a string as needed
        }
        return title
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const title = capitalizeTitle(titleData);

    const handleNextPage = async () => {
        setSummaryLoading(true);

        if (totalPages > (pageno + 1)) {
            setPageNo(pageno + 1);

            const formDataSummary = new FormData();
            formDataSummary.append('file', pdffile);
            formDataSummary.append('page_no', pageno + 1);

            const response = await axios.post('http://localhost:3000/get_summary/', formDataSummary, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            setSummary(response.data.responseText);
            console.log(summary);
        } else {
            setNextPageText("End of PDF");
        }
        setSummaryLoading(false);
    };

    const askAIHandler = async () => {
        if (question.trim()) {
            const formDataSummary = new FormData();
            formDataSummary.append('file', pdffile);
            formDataSummary.append('question', question);
            formDataSummary.append('page_no', pageno);

            setLoading(true);
            const response = await axios.post('http://localhost:3000/get_answer/', formDataSummary, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            console.log(response);
            const qnan = [question, response.data.responseText];
            setQnans([qnan, ...qnans]);
            setQuestion('');
        }
    };

    const startTour = () => {
        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                cancelIcon: {
                    enabled: true
                },
                classes: 'shadow-md bg-purple-dark',
                scrollTo: { behavior: 'smooth', block: 'center' }
            }
        });

        tour.addStep({
            id: 'summary-title',
            title: "Title of PDF content",
            text: 'This is the title of the summary.',
            attachTo: {
                element: '.summary-title',
                on: 'bottom'
            },
            buttons: [
                {
                    text: 'Next',
                    action: tour.next
                }
            ]
        });

        tour.addStep({
            id: 'summary-content',
            title: "Summary",
            text: 'Here you can see the summary content of your PDF.',
            scrollTo: { behavior: "smooth", block: "center" },
            attachTo: {
                element: '.summary-content',
                on: 'top'
            },
            buttons: [
                { text: "Back", action: tour.back },
                { text: 'Next', action: tour.next }
            ]
        });
        tour.addStep({
            id: 'next-page',
            title: "Next Page",
            text: 'You can click here to get summary of next page of PDF.',
            scrollTo: { behavior: "smooth", block: "center" },
            attachTo: {
                element: '#next-page',
                on: 'top'
            },
            buttons: [
                { text: "Back", action: tour.back },
                { text: 'Next', action: tour.next }
            ]
        });

        tour.addStep({
            id: 'ask-ai',
            title: "Ask AI",
            text: 'If you do not understand something, you can ask it to AI.',
            scrollTo: { behavior: "smooth", block: "center" },
            attachTo: {
                element: '.ask-ai',
                on: 'top'
            },
            buttons: [
                { text: "Back", action: tour.back },
                { text: 'Next', action: tour.next }
            ]
        });

        tour.addStep({
            id: 'ai-answers',
            title: "Answers",
            text: 'This section shows the AI\'s answers to your questions.',
            scrollTo: { behavior: "smooth", block: "center" },
            attachTo: {
                element: '.ai-answers',
                on: 'top'
            },
            buttons: [
                { text: "Back", action: tour.back },
                {
                    text: 'Finish',
                    action: tour.complete
                }
            ]
        });

        tour.on('complete', () => {
            setTourVisible(true);
        });

        tour.start();
        setTourVisible(false);
    };

    useEffect(() => {
        // Any side effects when tourVisible changes can be handled here
    }, [tourVisible]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="tracking-wide md:mx-32 px-4 py-12 md:px-6 lg:py-16 mt-20">
                <div className="space-y-12">
                    <div className="text-center">
                        <h1 className="summary-title text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            {title}
                        </h1>
                        <div className="tags mt-6 flex flex-wrap justify-center gap-2">
                            {uniqueTags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md mr-2">
                                    {tag.replace(/"/g, '')}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="summary-content">
                        <h2 className="text-3xl font-bold tracking-tighter">Summary</h2>
                        {summaryLoading ? (
                            <div className="flex flex-1 items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                                <button
                                    disabled
                                    type="button"
                                    className="py-4 px-8 text-lg font-medium text-gray-900 bg-white rounded-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 inline-flex items-center"
                                >
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-6 h-6 mr-4 text-gray-200 animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="#1C64F2"
                                        />
                                    </svg>
                                    Generating Summary...
                                </button>
                            </div>
                        ) : (
                            <ul className="list-disc text-xl text-gray-600 pt-4">
                                {summary.map((item, index) => (
                                    <li key={index} className="mb-2">{item}</li>
                                ))}
                            </ul>
                        )}
                        <div className='text-center my-5 text-gray-500 text-lg'>{"<---"} Page: {pageno + 1} {"--->"}</div>
                        <div className="flex justify-center items-center">
                            <button id='next-page' className='bg-black text-white rounded-lg py-2 px-4 font-[500]' onClick={handleNextPage}>{nextPageText}</button>
                        </div>
                    </div>
                    <div className="ask-ai">
                        <h2 className="text-3xl font-bold tracking-tighter">Ask Questions Regarding PDF To AI</h2>
                        <div className="mt-4 grid w-full max-w-md gap-4">
                            <input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Type your question here..."
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                            />
                            <button
                                onClick={askAIHandler}
                                className="w-full inline-flex justify-center px-4 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="ai-answers">
                        <h2 className="text-3xl font-bold tracking-tighter">Answer To Questions Asked (AI)</h2>
                        {loading && (
                            <div className="flex flex-1 items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                                <button
                                    disabled
                                    type="button"
                                    className="py-4 px-8 text-lg font-medium text-gray-900 bg-white rounded-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 inline-flex items-center"
                                >
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-6 h-6 mr-4 text-gray-200 animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="#1C64F2"
                                        />
                                    </svg>
                                    Generating answers...
                                </button>
                            </div>
                        )}
                        <div className="mt-4 space-y-4">
                            {qnans.map((q, index) => (
                                <div key={index} className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                                    <h3 className='text-2xl font-[500] tracking-tighter'>{q[0]}</h3>
                                    <p className="text-lg text-gray-600">
                                        {q[1]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            {tourVisible && (
                <div className="fixed bottom-5 right-5">
                    <button
                        onClick={startTour}
                        className="fixed bottom-10 right-14 z-50 p-4 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 hover:text-gray-100 transition-colors flex items-center justify-center"
                    >
                        <FaQuestion size={24} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Summary;
