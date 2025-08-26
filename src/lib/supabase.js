const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function saveDeposit(data) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Supabase credentials are missing')
    return
  }

  const url = `${SUPABASE_URL}/rest/v1/deposits`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      console.error('Failed to save deposit', await res.text())
    }
  } catch (err) {
    console.error('Error saving deposit', err)
  }
}
