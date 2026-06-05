export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messageId } = req.body;
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!messageId) return res.status(400).json({ success: false });

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${TOKEN}/deleteMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, message_id: messageId }),
    });
    const tgData = await tgRes.json();
    return res.status(200).json({ success: tgData.ok });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
