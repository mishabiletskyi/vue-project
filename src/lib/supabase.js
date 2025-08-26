const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function saveUser(data) {
  const url = `${SUPABASE_URL}/rest/v1/users`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation' // або return=minimal, якщо не треба відповідь
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      console.error('Failed to save user data', await res.text())
    }
  } catch (err) {
    console.error('Error saving user data', err)
  }
}

export default {
  saveUser
}
