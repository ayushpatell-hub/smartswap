import { NextResponse } from "next/server"
import twilio from "twilio"

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function POST(req: Request) {
  try {
    const { phone } = await req.json()

    if (!phone) {
      return NextResponse.json({ error: "Phone number required" }, { status: 400 })
    }

    // Format to E.164 for India
    const formatted = phone.startsWith("+") ? phone : `+91${phone.replace(/\s/g, "")}`

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID!)
      .verifications.create({
        to: formatted,
        channel: "sms",
      })

    return NextResponse.json({ success: true, status: verification.status })

  } catch (error: any) {
    console.error("Twilio Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
