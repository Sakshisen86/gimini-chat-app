const API_KEY = "AIzaSyBgr-gswgFbI1BdvQQCypFokXeXonoYw-c";

async function runChat(prompt) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("✅ Gemini Response:", reply);
    return reply;
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    return "Something went wrong: " + error.message;
  }
}

export default runChat;
