export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({ 
    success: true,
    message: 'API is working!',
    method: req.method,
    hasResendKey: !!process.env.RESEND_API_KEY,
    timestamp: new Date().toISOString()
  });
}