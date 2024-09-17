import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler = async (req: NextRequest, res: NextResponse) => {
  // console.log("req.json()>>",req.json())
  const { prompt } = await req.json();
  if (req.method === 'POST') {
    console.log("prompt.body>>", prompt);
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo", 
        prompt: prompt,
        max_tokens: 150,
      });

      console.log("req.response>>", response);
      return NextResponse.json({ message: response.choices[0].text });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return NextResponse.json({ error: error.message });
      } else {
        console.error("An unknown error occurred", error);
        return NextResponse.json({ error: 'An unknown error occurred '+error });
      }
    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' });
  }
};

export { handler as POST };
