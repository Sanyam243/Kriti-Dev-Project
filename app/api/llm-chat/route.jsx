import { NextResponse } from "next/server";
import { chatSession } from "../../components/llm/LLM"

export async function POST(req){

    const {prompt} =  await req.json()
    try{
        const data = await chatSession.sendMessage(prompt);
        const AiResponse = data.response.text();
        return NextResponse.json({AiResponse})

    }catch(e){
        console.log(e)
    }

}