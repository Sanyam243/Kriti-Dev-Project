
import { NextResponse } from "next/server";
import { genAiCode } from "../../components/llm/LLM";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
           console.log(prompt);
        const data = await genAiCode.sendMessage(prompt);

        // Await the response text properly
        const AiResponse = await data.response.text();

         // Clean the string by removing ```json and ``` wrappers
        const updatedResponse = AiResponse.replace(/```json/g, '').replace(/```/g, '').trim();

        // Parse the JSON string
        let parsedData;
        try {
            parsedData = JSON.parse(updatedResponse);
        } catch (parseError) {
            console.error("JSON Parsing Error:", parseError, "Response:", updatedResponse);
             
            return NextResponse.json({ error: "Invalid JSON response from AI" }, { status: 500 });
        }

      // Return the parsed data as a JSON response
        return NextResponse.json(parsedData);
    } catch (e) {
        console.error("Error in API handler:", e);
        return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
    }
}


