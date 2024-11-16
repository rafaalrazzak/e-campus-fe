import { Question } from "@/types/quiz";

export const QUESTIONS: Question[] = [
    {
        id: "1",
        text: "What is the capital of France?",
        options: [
            { id: "a", text: "New York" },
            { id: "b", text: "London" },
            { id: "c", text: "Paris" },
            { id: "d", text: "Dublin" },
        ],
        correctAnswer: "c",
    },
    {
        id: "2",
        text: "What is 2 + 2?",
        options: [
            { id: "a", text: "4" },
            { id: "b", text: "21" },
            { id: "c", text: "Fish" },
            { id: "d", text: "Red" },
        ],
        correctAnswer: "a",
    },
    {
        id: "3",
        text: "What is the largest planet in our solar system?",
        options: [
            { id: "a", text: "Earth" },
            { id: "b", text: "Jupiter" },
            { id: "c", text: "Saturn" },
            { id: "d", text: "Mars" },
        ],
        correctAnswer: "b",
    },
    {
        id: "4",
        text: "What is the smallest country in the world?",
        options: [
            { id: "a", text: "Russia" },
            { id: "b", text: "Vatican City" },
            { id: "c", text: "Monaco" },
            { id: "d", text: "Nauru" },
        ],
        correctAnswer: "b",
    },
    {
        id: "5",
        text: "What is the hottest continent on Earth?",
        options: [
            { id: "a", text: "Africa" },
            { id: "b", text: "Antarctica" },
            { id: "c", text: "Asia" },
            { id: "d", text: "Europe" },
        ],
        correctAnswer: "a",
    },
];
