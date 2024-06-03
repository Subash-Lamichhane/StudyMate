const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { OpenAI } = require('openai')
const app = express();
const port = 3000;
require('dotenv').config({ path: './.env.local' });

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Enable CORS
app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/process_pdf', upload.single('file'), async (req, res) => {
    try {
        console.log('Received request:', req.body);
        const file = req.file;
        // const functionName = req.body.function_name;
        const pageNumber = parseInt(req.body.page_no);

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        if (isNaN(pageNumber) || pageNumber < 0) {
            return res.status(400).json({ error: 'Invalid page number.' });
        }

        const dataBuffer = fs.readFileSync(file.path);

        // Extract text from PDF
        const data = await pdfParse(dataBuffer);

        // Ensure we split pages correctly
        
        const pages = data.text.split(/(?=Page \d+ of \d+)/g).map(page => page.replace(/Page \d+ of \d+/, '').trim());

        if (pageNumber > pages.length) {
            fs.unlinkSync(file.path); // Clean up the uploaded file
            return res.status(400).json({ error: 'Page number out of range.' });
        }

        const format = {
            "title": "title here",
            "tags": ["keyword1", "keyword2"],
            "summary": ["point1", "point2"],
        }
        const prompt = `Give me title, summary in points and keyword of given text: ${pages[pageNumber]} in format ${format}. You can give multiple keywords and summary points. Only give me json do not give me any other things.`
        const result = await model.generateContent(prompt);
        const aiResponse = await result.response;
        // console.log(aiResponse.text())
        // const aiResponse = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [{ role: "system", content: prompt}],
        //   });

        // console.log(aiResponse)
        // if (functionName === 'get_summary') {
        const pageText = pages[pageNumber];
        responseText = aiResponse.text(); // Replace with actual summary logic
        responseText = JSON.parse(responseText.replace(/```json\n|\n```/g, ''));

        // } else {
        //     responseText = 'Invalid function name';
        // }

        // Clean up the uploaded file
        fs.unlinkSync(file.path);
        const totalPages = pages.length
        res.json({ responseText, totalPages });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the PDF file.' });
    }
});


app.post('/get_summary', upload.single('file'), async (req, res) => {
    try {
        console.log('Received request:', req.body);
        const file = req.file;
        const pageNumber = parseInt(req.body.page_no);

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        if (isNaN(pageNumber) || pageNumber < 0) {
            return res.status(400).json({ error: 'Invalid page number.' });
        }

        const dataBuffer = fs.readFileSync(file.path);

        // Extract text from PDF
        const data = await pdfParse(dataBuffer);

        // Ensure we split pages correctly
        const pages = data.text.split(/(?=Page \d+ of \d+)/g).map(page => page.replace(/Page \d+ of \d+/, '').trim());

        if (pageNumber > pages.length) {
            fs.unlinkSync(file.path); // Clean up the uploaded file
            return res.status(400).json({ error: 'Page number out of range.' });
        }

        const prompt = `Give me array of summary of given text: ${pages[pageNumber]} in format ${["point1","point2"]} which is array. You can give multiple summary points. Only give me array and do not give me any other things and do not give me things like ${"*"}.`
        const result = await model.generateContent(prompt);
        const aiResponse = await result.response;

        // console.log(aiResponse.text())

        const pageText = pages[pageNumber];
        responseText = aiResponse.text(); // Replace with actual summary logic
        responseText = JSON.parse(responseText.replace(/```json\n|\n```/g, ''));
        // Clean up the uploaded file
        fs.unlinkSync(file.path);

        res.json({ responseText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the PDF file.' });
    }
});

app.post('/get_answer', upload.single('file'), async (req, res) => {
    try {
        console.log('Received request:', req.body);
        const file = req.file;
        const question = req.body.question;
        const pageNumber = parseInt(req.body.page_no);

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        if (isNaN(pageNumber) || pageNumber < 0) {
            return res.status(400).json({ error: 'Invalid page number.' });
        }

        const dataBuffer = fs.readFileSync(file.path);

        // Extract text from PDF
        const data = await pdfParse(dataBuffer);

        // Ensure we split pages correctly
        const pages = data.text.split(/(?=Page \d+ of \d+)/g).map(page => page.replace(/Page \d+ of \d+/, '').trim());

        if (pageNumber > pages.length) {
            fs.unlinkSync(file.path); // Clean up the uploaded file
            return res.status(400).json({ error: 'Page number out of range.' });
        }

        const pageText = sanitizeString(pages[pageNumber]);

        const prompt = `Based on the following text, answer the question in a safe and respectful manner. Text: "${pageText}". Question: "${sanitizeString(question)}". Only provide the answer text, without any additional commentary.`;

        const result = await model.generateContent(prompt);
        const aiResponse = await result.response;

        console.log(aiResponse.text());

        const responseText = aiResponse.text(); // Replace with actual summary logic

        // Clean up the uploaded file
        fs.unlinkSync(file.path);

        res.json({ responseText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the PDF file.' });
    }
});

function sanitizeString(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


app.post('/get_cards', upload.single('file'), async (req, res) => {
    try {
        console.log('Received request:', req.body);
        const file = req.file;
        // const pageNumber = parseInt(req.body.page_no);

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const dataBuffer = fs.readFileSync(file.path);

        // Extract text from PDF
        const data = await pdfParse(dataBuffer);

        if (data.text.split(/\s+/).length > 5000) {
            // If it does, keep only the first 3000 words
            data.text = data.text.split(/\s+/).slice(0, 5000).join(' ');
        }

        const format = [{
            "question":"Question1",
            "answer":"Answer1"
        },
        {
            "question":"Question1",
            "answer":"Answer1"
        }]
        
        const prompt = `Use text: \n ${sanitizeString(data.text)} as context and provide me 10 question and answers in format: ${format}. \n This is for flashcard generation. Ensure that the output is in valid JSON format without any non-JSON text or numbering. If it's not possible to generate flashcards from the context, provide an empty array without attempting to fabricate answers or extract information from unrelated sources. Remember you must provide question and answer related to above given text.`

        const result = await model.generateContent(prompt);
        const aiResponse = await result.response;

        console.log(aiResponse.text())

        responseText = aiResponse.text(); // Replace with actual summary logic
        // responseText = JSON.parse(responseText.replace(/```json\n|\n```/g, ''));
        responseText = JSON.parse(responseText);
        // Clean up the uploaded file
        fs.unlinkSync(file.path);

        res.json({ responseText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the PDF file.' });
    }
});
function sanitizeString(str) {
    // Replace this with your desired sanitization logic
    // For example, you can use a library like 'sanitize-html' or 'dompurify'
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
