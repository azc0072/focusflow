export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const key = process.env.ANTHROPIC_API_KEY;
  console.log('Key starts with:', key ? key.substring(0, 10) : 'UNDEFINED');
  
  const { messages } = req.body;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: 'Eres un asistente de estudio amable y conciso. Responde siempre en el idioma del estudiante.',
        messages,
      }),
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
