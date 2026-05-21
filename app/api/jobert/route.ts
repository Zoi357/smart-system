import { NextRequest, NextResponse } from "next/server";

/* ── Ollama REST endpoint (local) ── */
const OLLAMA_URL = "http://localhost:11434/api/generate";

/* ── JOBERT system prompt ── */
const SYSTEM_PROMPT = `You are JOBERT, the official AI assistant of the INFORM Student Information System at Benedicto College (Cebu, Philippines).

Your role is to help students with questions about:
- How to log in (Student ID is a 9-digit number, numbers only)
- Viewing grades and understanding the Philippine grading scale (1.00 highest, 5.00 failed, 3.00 passing at 75%)
- Class schedule (Mon-Fri timetable)
- Tuition fees and payments
- Library books (borrowing, returning, due dates)
- Enrollment (currently open, deadline June 15, 2026)
- Requesting documents (TOR, Certificate of Enrollment, Good Moral, Diploma)
- Scholarships (Academic Excellence, Financial Assistance, Government Voucher)
- Lost ID replacement (go to Registrar, PHP 150 fee)
- Campus services (Clinic, Guidance Office, Canteen, Gym)
- Academic calendar (1st Sem: Aug 2025 - Jan 2026, 2nd Sem: Feb - Jun 2026)
- Admin access (separate login at /admin/login, for staff only)
- Contact info (Registrar: registrar@inform.edu, Room 101 Admin Bldg, Mon-Fri 8AM-5PM)
- IT Help Desk: helpdesk@inform.edu, Room 010 Admin Bldg
- Cashier: Room 102 Admin Bldg, Mon-Fri 8AM-4PM

Demo student accounts for testing:
- ID: 202400001, password: jamie123 (Jamie Santos, BSCS Year 2)
- ID: 202400002, password: maria456 (Maria Reyes, BSED Year 1)
- ID: 202400003, password: carlo789 (Carlo Dela Cruz, BSBA Year 3)
- ID: 202400004, password: ana2024 (Ana Villanueva, BSN Year 2)
- ID: 202400005, password: luis2024 (Luis Fernandez, BSCS Year 4)

Benedicto College offers:
- Academic Track and Technical Professional Track (SHS)
- Guaranteed No Tuition Fee for incoming Grade 11 students from public schools (SY 2026-2027)
- CESA Esports League teams: BC Cheetahs (MLBB) and BC Valorant team
- Website: https://benedictocollege.edu.ph
- Facebook: /BENEDICTO COLLEGE
- Phone: 032 345 6873
- Mobile: +63 908 899 8600

Rules:
- Only answer questions related to Benedicto College and the INFORM system
- If asked about something unrelated, politely say you can only help with INFORM and Benedicto College topics
- Keep answers concise and helpful
- Use a friendly, professional tone
- Format lists with line breaks for readability
- Always refer to yourself as JOBERT`;

export async function POST(req: NextRequest) {
  try {
    console.log("=== JOBERT API CALLED (Ollama) ===");
    
    const { message, history } = await req.json();
    console.log("Message received:", message);

    /* build conversation history for Ollama */
    const conversationHistory = (history || [])
      .slice(-6)
      .map((m: { role: string; text: string }) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
      .join("\n");

    const prompt = `${SYSTEM_PROMPT}

Conversation history:
${conversationHistory}

User: ${message}
Assistant:`;

    console.log("Sending request to Ollama API...");
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: prompt,
        stream: false,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(120000), // 2 minute timeout
    });

    console.log("Ollama API response status:", response.status);

    if (!response.ok) {
      const err = await response.text();
      console.error("Ollama API error response:", err);
      return NextResponse.json({ error: "Ollama API error", details: err }, { status: 500 });
    }

    const data = await response.json();
    console.log("Ollama API response received");
    
    const text = data?.response ?? "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply: text.trim() });
  } catch (err) {
    console.error("JOBERT route error:", err);
    return NextResponse.json({ error: "Internal server error", details: String(err) }, { status: 500 });
  }
}
