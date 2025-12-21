import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function createMD5(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('MD5', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') { return new Response('ok', { headers: corsHeaders }) }

  try {
    const { amount, userId } = await req.json()
    
    // Беремо Merchant ID та Секретне слово 1
    const merchantId = Deno.env.get('FREEKASSA_MERCHANT_ID') // Переконайся що зберіг його
    const secretWord1 = Deno.env.get('FREEKASSA_SECRET_1')

    if (!merchantId || !secretWord1) { throw new Error('FreeKassa keys not set') }

    const orderId = `order_${userId}_${Date.now()}`
    const currency = 'RUB'; // FreeKassa приймає RUB нормально
    
    // Формула підпису для створення посилання: md5(merchant_id:amount:secret1:currency:order_id)
    const signString = `${merchantId}:${amount}:${secretWord1}:${currency}:${orderId}`;
    const sign = await createMD5(signString);

    // Генеруємо посилання
    // currency=RUB, em (email) - не обов'язково
    const payUrl = `https://pay.freekassa.ru/?m=${merchantId}&oa=${amount}&o=${orderId}&s=${sign}&currency=${currency}`;

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