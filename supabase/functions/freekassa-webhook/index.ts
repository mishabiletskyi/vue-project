// supabase/functions/freekassa-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

async function createMD5(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('MD5', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  try {
    // 1. Отримуємо дані від FreeKassa
    const formData = await req.formData();
    const merchant_id = formData.get('MERCHANT_ID');
    const amount = formData.get('AMOUNT');
    const intid = formData.get('intid');
    const merchant_order_id = formData.get('MERCHANT_ORDER_ID'); // Це наш order_USERID_TIMESTAMP
    const p_email = formData.get('P_EMAIL');
    const cur_id = formData.get('CUR_ID');
    const sign = formData.get('SIGN');

    console.log("FreeKassa notification:", { merchant_order_id, amount, sign });

    // 2. Перевіряємо підпис (Безпека!)
    const secret2 = Deno.env.get('FREEKASSA_SECRET_2');
    if (!secret2) throw new Error('Secret 2 not set');

    // Формула підпису FreeKassa для оповіщення: MERCHANT_ID:AMOUNT:SECRET_2:MERCHANT_ORDER_ID
    const signString = `${merchant_id}:${amount}:${secret2}:${merchant_order_id}`;
    const mySign = await createMD5(signString);

    if (mySign !== sign) {
      console.error("Wrong signature!", { received: sign, expected: mySign });
      return new Response('WRONG SIGN', { status: 400 });
    }

    // 3. Парсимо ID користувача з номеру замовлення
    // order_id у нас виглядає як "order_USER-UUID_TIMESTAMP"
    const parts = merchant_order_id?.toString().split('_');
    const userId = parts?.[1];

    if (!userId) {
       return new Response('NO USER ID', { status: 400 });
    }

    // 4. Поповнюємо баланс в базі
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Отримуємо поточний баланс
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('balance')
      .eq('id', userId)
      .single();

    if (fetchError) {
        console.error("User not found");
        return new Response('USER NOT FOUND', { status: 400 });
    }

    const newBalance = (profile.balance || 0) + Number(amount);

    // Оновлюємо баланс
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ balance: newBalance })
      .eq('id', userId);

    if (updateError) {
        console.error("DB Update failed", updateError);
        return new Response('DB ERROR', { status: 500 });
    }

    // 5. Записуємо транзакцію в історію
    await supabase.from('transactions').insert({
        user_id: userId,
        type: 'deposit',
        amount: Number(amount),
        status: 'completed',
        description: `FreeKassa Topup (Order ${merchant_order_id})`
    });

    // 6. Відповідаємо "YES" (це обов'язково для FreeKassa)
    return new Response('YES', { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response('ERROR', { status: 500 });
  }
})