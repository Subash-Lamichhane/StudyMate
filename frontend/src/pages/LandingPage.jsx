import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import landing_image from "../assets/images/landing.png"
import Footer from "../components/Footer"
import FAQ from "../components/FAQ"
import { motion } from 'framer-motion'
import ReactTypingEffect from 'react-typing-effect';

export default function LandingPage() {

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header>
                <Navbar />
            </header>
            <main className="flex-1">
                <section className="w-full py-24 md:py-24 lg:py-32 xl:py-32 bg-[#d0c8b5] md:px-32">
                    <motion.div
                        className="container px-4 md:px-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <motion.div
                                className="flex flex-col justify-center space-y-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Your Ultimate Study Companion
                                        <div className="text-orange-700">
                                            <ReactTypingEffect
                                                speed={300}
                                                text={["Summarize", "Revise", "Generate FlashCards"]}
                                            />
                                        </div>
                                    </h1>
                                    <p className="max-w-[600px] text-gray-600 md:text-xl pt-3">
                                    StudyMate uses advanced AI algorithms from llm to quickly summarize PDF articles, extract key keywords, answer questions about the content, and generate educational flashcards. Save time and gain deeper insights with our powerful tools.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                                    <motion.div
                                        initial={{ scale: 0.9 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 70 }}
                                    >
                                        <Link
                                            className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-10 text-base font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                            to='home'
                                        >
                                            Try It Now
                                        </Link>
                                    </motion.div>
                                    <motion.div
                                        initial={{ scale: 0.9 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 70 }}
                                    >
                                        <Link
                                            className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-10 text-base font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                            to='/about'
                                        >
                                            Learn More
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.img
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                                height="550"
                                src={landing_image}
                                width="550"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.7 }}
                            />
                        </div>
                    </motion.div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 md:px-32">
                    <motion.div
                        className="container px-4 md:px-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
                            <motion.div
                                className="flex flex-col items-center justify-center space-y-4 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <BookIcon className="h-12 w-12 text-gray-500" />
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">PDF Summarization</h3>
                                    <p className="text-gray-500">
                                        The AI-powered tool quickly summarizes the key points of any PDF article, saving you time and effort.
                                    </p>
                                    <Link
                                        className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline underline-offset-4"
                                        to='/about'
                                    >
                                        Learn More
                                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center justify-center space-y-4 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, duration: 0.7 }}
                            >
                                <TagIcon className="h-12 w-12 text-gray-500" />
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">Keyword Extraction</h3>
                                    <p className="text-gray-500">
                                        The AI algorithms identify the most important keywords in any PDF, helping you quickly understand the content.
                                    </p>
                                    <Link
                                        className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline underline-offset-4"
                                        to='/about'
                                    >
                                        Learn More
                                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center justify-center space-y-4 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.9, duration: 0.7 }}
                            >
                                <MailQuestionIcon className="h-12 w-12 text-gray-500" />
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">Question Answering</h3>
                                    <p className="text-gray-500">
                                        The AI-powered question answering tool can provide detailed answers to your questions about any PDF content.
                                    </p>
                                    <Link
                                        className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline underline-offset-4"
                                        to='/about'
                                    >
                                        Learn More
                                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center justify-center space-y-4 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.1, duration: 0.7 }}
                            >
                                <CardsIcon className="h-12 w-12 text-gray-500" />
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">FlashCard Generation</h3>
                                    <p className="text-gray-500">
                                        Automatically generate flashcards from any PDF content, making it easier to study and retain information.
                                    </p>
                                    <Link
                                        className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline underline-offset-4"
                                        to='/about'
                                    >
                                        Learn More
                                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <FAQ />
                </motion.div>
            </main>
            <Footer />
        </div>
    )
}

function ArrowRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}

function BookIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
    )
}

function MailQuestionIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            <path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" />
            <path d="M20 22v.01" />
        </svg>
    )
}

function TagIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
        </svg>
    )
}

function CardsIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 3h-1a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v7" />
        </svg>
    )
}
