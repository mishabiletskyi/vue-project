import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, userId } = await req.json()
    
    const merchantId = Deno.env.get('PAYKASSA_MERCHANT_ID')
    const secretWord = Deno.env.get('PAYKASSA_SECRET_WORD')

    if (!merchantId || !secretWord) {
      throw new Error('Merchant ID or Secret Word not set')
    }

    const orderId = `order_${userId}_${Date.now()}`
    
    // 1. КОНВЕРТАЦІЯ (RUB -> USDT)
    // Оскільки PayKassa вимагає конкретну крипту.
    // Приблизний курс 100.
    const amountUSDT = (Number(amount) / 100).toFixed(2);

    const formData = new URLSearchParams();
    formData.append('func', 'sci_create_order');
    formData.append('sci_id', merchantId);
    formData.append('sci_key', secretWord);
    formData.append('amount', amountUSDT);
    formData.append('currency', 'USDT'); 
    formData.append('order_id', orderId);
    formData.append('comment', 'Topup');
    
    // 2. ВКАЗУЄМО СИСТЕМУ (ОБОВ'ЯЗКОВО!)
    // 30 - це ID для USDT TRC20
    // Це виправить помилку "Empty: system_id"
    formData.append('system', '30'); 
    
    formData.append('phone', 'false');
    formData.append('test', 'false');

    console.log("Sending API request for USDT...");

    // Використовуємо .app домен (щоб не було 403)
    const response = await fetch("https://paykassa.app/sci/0.4/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: formData,
    });

    const resultText = await response.text();
    
    let result;
    try {
        result = JSON.parse(resultText);
    } catch (e) {
        throw new Error(`PayKassa Error: ${resultText}`);
    }

    if (result.error) {
      throw new Error(result.message || "API Error");
    }

    return new Response(JSON.stringify({ pay_url: result.data.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})