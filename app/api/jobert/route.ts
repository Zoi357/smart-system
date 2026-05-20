import { NextRequest, NextResponse } from "next/server";

/* ── Gemini REST endpoint ── */
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

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
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    /* build conversation history for Gemini */
    const contents = [
      /* inject system prompt as first user turn */
      {
        role: "user",
        parts: [{ text: `[SYSTEM INSTRUCTIONS - follow these always]\n${SYSTEM_PROMPT}` }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am JOBERT, the INFORM Assistant at Benedicto College. I will only answer questions about the INFORM system and Benedicto College. How can I help you?" }],
      },
      /* add conversation history */
      ...(history || []).slice(-6).map((m: { role: string; text: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
      /* current message */
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
          topP: 0.9,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini API error:", err);
      return NextResponse.json({ error: "Gemini API error" }, { status: 500 });
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("JOBERT route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
