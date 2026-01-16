import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function createSHA256(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') { return new Response('ok', { headers: corsHeaders }) }

  try {
    const { amount, userId } = await req.json()
    
    // Отримуємо ключ
    const secretKey = Deno.env.get('INTERNAL_SECRET_KEY')
    
    // 👇👇👇 ТУТ БУЛА ПОМИЛКА. СТАВИМО ПОСИЛАННЯ НА AZURE 👇👇👇
    const bookstoreUrl = "https://cristo-tales-api.graypebble-a77dafcc.westeurope.azurecontainerapps.io/payment/checkout"; 

    if (!secretKey) { throw new Error('INTERNAL_SECRET_KEY not set in Supabase') }

    // Перетворюємо amount на рядок явно, щоб точно співпало з Python
    const amountStr = String(amount);

    // Формуємо рядок: userId:amount:secretKey
    // Це має бути ідентично тому, як в Python: f"{user_id}:{amount}:{INTERNAL_SECRET_KEY}"
    const signString = `${userId}:${amountStr}:${secretKey}`;
    
    const sign = await createSHA256(signString);

    // Генеруємо фінальне посилання
    const payUrl = `${bookstoreUrl}?amount=${amountStr}&user_id=${userId}&sign=${sign}`;

    console.log(`Generated Link: ${payUrl}`);

    return new Response(JSON.stringify({ pay_url: payUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})