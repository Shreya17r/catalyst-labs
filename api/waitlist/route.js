import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, childAge, product, deposit } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // ─── Log to console (always works, no setup needed) ───
    console.log('New waitlist signup:', { firstName, lastName, email, childAge, product, deposit })

    // ─── Send confirmation email via Resend ───────────────
    // 1. Sign up at resend.com (free)
    // 2. Get your API key
    // 3. Add to .env.local:  RESEND_API_KEY=re_xxxxxxxxxxxx
    // 4. Add your verified sender: RESEND_FROM=hello@catalystlabs.in
    // Uncomment the block below once you have your key:

    /*
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'Catalyst Labs <hello@catalystlabs.in>',
      to: email,
      subject: "You're on the list — Catalyst Labs 🪵",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1A0C04">
          <h2 style="font-size:28px;font-weight:300;margin-bottom:8px">You're in, ${firstName}.</h2>
          <p style="color:#5C3C22;line-height:1.7;margin-bottom:20px">
            Your spot for the Catalyst Labs first batch is reserved.<br>
            We'll reach out with your ship date closer to launch.
          </p>
          <p style="color:#5C3C22;line-height:1.7"><strong>What you reserved:</strong> ${product || 'To be confirmed'}</p>
          <p style="color:#5C3C22;line-height:1.7"><strong>Deposit:</strong> ₹${deposit}</p>
          <hr style="border:none;border-top:1px solid #E8E0D4;margin:24px 0"/>
          <p style="font-size:13px;color:#9C7A58">Questions? Just reply to this email.<br>— Shreya & Susheel, Catalyst Labs</p>
        </div>
      `,
    })
    */

    // ─── Save to Google Sheets (optional) ────────────────
    // See: https://docs.google.com/spreadsheets → Extensions → Apps Script
    // Or use a simple Google Form POST approach.

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
