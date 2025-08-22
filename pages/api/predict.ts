import type { NextApiRequest, NextApiResponse } from 'next'

// ⬇️ Yaha apna Hugging Face Space ka backend URL daalo
const API_URL = "https://<your-username>-health.hf.space/infer"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" })
  }

  const { symptoms } = req.body

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms })
    })

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch from backend" })
  }
}
