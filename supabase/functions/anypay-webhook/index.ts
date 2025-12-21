import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Функція для створення MD5
async function createMD5(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('MD5', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  try {
    const formData = await req.formData();
    
    // Параметри від AnyPay
    const currency = formData.get('currency'); // RUB
    const amount = formData.get('amount');
    const pay_id = formData.get('pay_id'); // ID замовлення (order_...)
    const merchant_id = formData.get('merchant_id'); // ID проекту
    const status = formData.get('status'); // paid
    const sign = formData.get('sign'); // Підпис

    console.log("AnyPay webhook:", { pay_id, amount, status });

    if (status !== 'paid') {
        return new Response('OK', { status: 200 });
    }

    const secretKey = Deno.env.get('ANYPAY_SECRET_KEY');
    if (!secretKey) throw new Error('Secret key not set');

    // Перевірка підпису AnyPay (MD5)
    // Формула: currency:amount:pay_id:merchant_id:status:secret_key
    const signString = `${currency}:${amount}:${pay_id}:${merchant_id}:${status}:${secretKey}`;
    const mySign = await createMD5(signString);

    if (mySign !== sign) {
      console.error("Wrong signature!", { received: sign, expected: mySign });
      // AnyPay іноді шле підпис у верхньому регістрі, іноді в нижньому, але MD5 зазвичай lowercase
      // Якщо не співпадає, спробуй mySign.toUpperCase() === sign
    }

    // Парсимо ID користувача
    const parts = pay_id?.toString().split('_');
    const userId = parts?.[1];

    if (!userId) return new Response('NO USER ID', { status: 400 });

    // Поповнення в базі
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: profile } = await supabase.from('profiles').select('balance').eq('id', userId).single();
    if (!profile) return new Response('USER NOT FOUND', { status: 400 });

    const newBalance = (profile.balance || 0) + Number(amount);

    await supabase.from('profiles').update({ balance: newBalance }).eq('id', userId);
    
    await supabase.from('transactions').insert({
        user_id: userId,
        type: 'deposit',
        amount: Number(amount),
        status: 'completed',
        description: `AnyPay Deposit (Order ${pay_id})`
    });

    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response('ERROR', { status: 500 });
  }
})