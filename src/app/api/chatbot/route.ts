import { NextResponse } from 'next/server';
import { chatMessageSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = chatMessageSchema.parse(body);
    
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reply = `I'm Sai's AI assistant. I received your message: "${message}". In a full implementation, I would use RAG to fetch context and generate a response based on Sai's portfolio.`;
        const chunks = reply.split(' ');
        
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk + ' '));
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
