import { NextResponse } from "next/server";
import { genAiCode } from "../../components/llm/LLM";

export async function POST(req) {
    const { prompt } = await req.json();

    try {
        const data = await genAiCode.sendMessage(prompt);

        // Await the response text properly
        const AiResponse = await data.response.text();

        // Clean the string by removing ```json and ``` wrappers
        const jsonString = AiResponse.replace(/```json/g, '').replace(/```/g, '').trim();

        // Parse the JSON string
        const parsedData = JSON.parse(jsonString);

        // Return the parsed data as a JSON response
        return NextResponse.json(parsedData);
    } catch (e) {
        console.error("Error parsing response:", e);
        return NextResponse.json({ error: "An error occurred while processing the request" }, { status: 500 });
    }
}
