// src/components/bot/chat-core.ts
export type Msg = {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
  };
  
  export type BotEvent = {
    type: "open" | "send" | "success" | "error";
    at: number;
    meta?: Record<string, unknown>;
  };
  
  interface BotResponse {
    reply?: string;
  }
  
  export async function sendToBot(messages: Msg[]): Promise<string> {
    const url = import.meta.env.VITE_GHEBOT_WEBHOOK as string | undefined;
    if (!url) throw new Error("Falta VITE_GHEBOT_WEBHOOK");
  
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
  
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
    const data: BotResponse = await res.json();
    return data.reply ?? "No tengo respuesta por ahora.";
  }
  