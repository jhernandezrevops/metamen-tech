/**
 * Replicate Webhook Handler
 * 
 * Maneja callbacks de generación de imágenes de Replicate
 * @see https://replicate.com/docs/webhooks
 */

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log('Replicate webhook received:', body);

    // Verificar que el webhook es válido (idempotency)
    if (body.id) {
      // TODO: Verificar si ya procesamos este webhook (usar idempotency_keys table)
      // TODO: Guardar resultado de la generación de imagen
      // TODO: Actualizar estado del avatar
      console.log('Processing prediction:', body.id, 'Status:', body.status);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Replicate webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
