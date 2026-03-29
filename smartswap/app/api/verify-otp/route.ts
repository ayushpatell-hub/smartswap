import { NextResponse } from "next/server"
import twilio from "twilio"

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json()

    if (!phone || !code) {
      return NextResponse.json({ error: "Phone and code required" }, { status: 400 })
    }

    const formatted = phone.startsWith("+") ? phone : `+91${phone.replace(/\s/g, "")}`

    const result = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID!)
      .verificationChecks.create({
        to: formatted,
        code: code,
      })

    if (result.status === "approved") {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

  } catch (error: any) {
    console.error("Twilio Verify Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}