"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Screen = "register" | "register-otp" | "login" | "login-otp";

function OtpInput({ onComplete, onChange }: { onComplete: () => void; onChange: (val: string) => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      digits.forEach((d, i) => { if (i < 6) updated[i] = d; });
      setOtp(updated);
      onChange(updated.join(""));
      const lastIndex = Math.min(digits.length - 1, 5);
      refs.current[lastIndex]?.focus();
      return;
    }
    updated[index] = value;
    setOtp(updated);
    onChange(updated.join(""));
    if (value && index < 5) refs.current[index + 1]?.focus();
  }, [otp, onChange]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const updated = [...otp];
      if (updated[index]) { updated[index] = ""; setOtp(updated); onChange(updated.join("")); }
      else if (index > 0) { updated[index - 1] = ""; setOtp(updated); onChange(updated.join("")); refs.current[index - 1]?.focus(); }
    } else if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    else if (e.key === "ArrowRight" && index < 5) refs.current[index + 1]?.focus();
  }, [otp, onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const updated = ["", "", "", "", "", ""];
    pasted.split("").forEach((d, i) => { updated[i] = d; });
    setOtp(updated);
    onChange(updated.join(""));
    refs.current[Math.min(pasted.length - 1, 5)]?.focus();
  }, [onChange]);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 justify-center">
        {otp.map((digit, i) => (
          <input key={i} ref={(el) => { refs.current[i] = el; }}
            type="text" inputMode="numeric" maxLength={6} value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onClick={() => refs.current[i]?.select()}
            className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 outline-none bg-[#1a2235] text-white
              ${digit ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20" : "border-white/10 focus:border-yellow-400/60 focus:bg-yellow-400/5"}`} />
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {otp.map((digit, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-300 ${digit ? "w-6 bg-yellow-400" : "w-2 bg-white/10"}`} />
        ))}
      </div>
    </div>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("register");
  const [reg, setReg] = useState({ name: "", email: "", phone: "" });
  const [loginMethod, setLoginMethod] = useState<"phone" | "gmail" | null>(null);
  const [loginPhone, setLoginPhone] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpValue, setOtpValue] = useState("");

  const goHome = () => router.push("/");

  const regValid = reg.name.trim() && reg.email.includes("@") && reg.phone.length === 10;
  const loginValid =
    (loginMethod === "phone" && loginPhone.length === 10) ||
    (loginMethod === "gmail" && loginEmail.includes("@"));

  // Send OTP via Twilio
  const sendOtp = async (phone: string) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ OTP sent to your phone!");
      } else {
        setMessage("⚠️ Could not send OTP. Try again.");
      }
    } catch {
      setMessage("⚠️ Error sending OTP.");
    }
    setLoading(false);
  };

  // Verify OTP via Twilio
  const verifyOtp = async (phone: string, code: string) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (data.success) {
        return true;
      } else {
        setMessage("❌ Wrong OTP! Please try again.");
        return false;
      }
    } catch {
      setMessage("⚠️ Error verifying OTP.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Save user to Supabase after verified
  const saveUser = async () => {
    try {
      await supabase.from("user").insert([{ Name: reg.name, Email: reg.email, Phone: reg.phone }]);
    } catch (err) {
      console.error("Supabase error:", err);
    }
  };

const handleRegisterSendOtp = async () => {
    if (!regValid) return;
    setLoading(true);
    setMessage("");

    // Check if phone already exists
    const { data: phoneCheck } = await supabase
      .from("user")
      .select("Phone")
      .eq("Phone", reg.phone)
      .single();

    if (phoneCheck) {
      setMessage("❌ This phone number is already registered. Please Sign In.");
      setLoading(false);
      return;
    }

    // Check if email already exists
    const { data: emailCheck } = await supabase
      .from("user")
      .select("Email")
      .eq("Email", reg.email)
      .single();

    if (emailCheck) {
      setMessage("❌ This email is already registered. Please Sign In.");
      setLoading(false);
      return;
    }

    setLoading(false);
    await sendOtp(reg.phone);
    setScreen("register-otp");
  };

  const handleRegisterVerify = async () => {
    if (otpValue.length !== 6) { setMessage("Please enter 6-digit OTP"); return; }
    const ok = await verifyOtp(reg.phone, otpValue);
    if (ok) {
      await saveUser();
      setMessage("✅ Account created!");
      setOtpValue("");
      setTimeout(() => goHome(), 800);
    }
  };

  const handleLoginSendOtp = async () => {
    if (!loginValid) return;
    setLoading(true);
    setMessage("");

    if (loginMethod === "phone") {
      // Check if phone exists
      const { data: phoneCheck } = await supabase
        .from("user")
        .select("Phone")
        .eq("Phone", loginPhone)
        .single();

      if (!phoneCheck) {
        setMessage("❌ No account found with this number. Please Register first.");
        setLoading(false);
        return;
      }
    }

    if (loginMethod === "gmail") {
      // Check if email exists
      const { data: emailCheck } = await supabase
        .from("user")
        .select("Email")
        .eq("Email", loginEmail)
        .single();

      if (!emailCheck) {
        setMessage("❌ No account found with this email. Please Register first.");
        setLoading(false);
        return;
      }

      // Get phone linked to this email for OTP
      const { data: userData } = await supabase
        .from("user")
        .select("Phone")
        .eq("Email", loginEmail)
        .single();

      if (userData?.Phone) {
        setLoginPhone(userData.Phone);
        setLoading(false);
        await sendOtp(userData.Phone);
        setScreen("login-otp");
        return;
      }
    }

    setLoading(false);
    await sendOtp(loginPhone);
    setScreen("login-otp");
  };

  const handleLoginVerify = async () => {
    if (otpValue.length !== 6) { setMessage("Please enter 6-digit OTP"); return; }
    const ok = await verifyOtp(loginPhone, otpValue);
    if (ok) {
      setMessage("✅ Logged in!");
      setOtpValue("");
      setTimeout(() => goHome(), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-100px left-1/2 -translate-x-1/2 w-500px h-500px bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-80px right-1/4 w-350px h-350px bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      {[0,1,2,3,4].map((i) => (
        <span key={i} className="absolute text-yellow-400/10 font-bold pointer-events-none select-none"
          style={{ fontSize: `${1.2+i*0.4}rem`, left: `${8+i*18}%`, top: `${15+(i%3)*25}%`,
            animation: `float ${4+i}s ease-in-out infinite`, animationDelay: `${i*0.6}s` }}>₹</span>
      ))}

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-linear-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">₹</span>
            </div>
            <span className="text-white font-bold text-2xl tracking-wide">Smart<span className="text-yellow-400">Swap</span></span>
          </div>
          <p className="text-gray-400 text-sm">Exchange Cash & Digital Money — Instantly</p>
        </div>

        <div className="bg-[#0f1623] border border-white/10 rounded-2xl p-8 shadow-2xl">

          {/* ══ REGISTER ══ */}
          {screen === "register" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-white text-xl font-bold mb-1">Create Account ✨</h2>
                <p className="text-gray-400 text-sm">Join thousands using SmartSwap across India</p>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-1.5">Full Name</label>
                <input type="text" placeholder="Rahul Sharma" value={reg.name}
                  onChange={(e) => setReg({ ...reg, name: e.target.value })}
                  className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50 transition-all" />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-1.5">Gmail / Email</label>
                <input type="email" placeholder="rahul@gmail.com" value={reg.email}
                  onChange={(e) => setReg({ ...reg, email: e.target.value })}
                  className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50 transition-all" />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-1.5">Phone Number</label>
                <div className="flex gap-2">
                  <div className="bg-[#1a2235] border border-white/10 rounded-xl px-3 flex items-center text-gray-300 text-sm min-w-72px justify-center">🇮🇳 +91</div>
                  <input type="tel" maxLength={10} placeholder="10-digit number" value={reg.phone}
                    onChange={(e) => setReg({ ...reg, phone: e.target.value.replace(/\D/g, "") })}
                    className="flex-1 bg-[#1a2235] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50 transition-all" />
                </div>
              </div>

              <button onClick={handleRegisterSendOtp} disabled={!regValid || loading}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  regValid && !loading ? "bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg shadow-yellow-400/25" : "bg-yellow-400/20 text-yellow-400/40 cursor-not-allowed"}`}>
                {loading ? "Sending OTP..." : "Send OTP to Phone →"}
              </button>

              {message && <p className="text-center text-sm text-yellow-400">{message}</p>}

              <p className="text-center text-gray-500 text-sm">
                Already have an account?{" "}
                <button onClick={() => setScreen("login")} className="text-yellow-400 font-semibold hover:underline">Sign In</button>
              </p>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-gray-600 text-xs">or</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <button onClick={goHome}
                className="w-full py-3 rounded-xl border border-white/10 text-gray-400 text-sm hover:border-yellow-400/30 hover:text-yellow-400 transition-all font-medium">
                👀 Continue without Registration
              </button>
            </div>
          )}

          {/* ══ REGISTER OTP ══ */}
          {screen === "register-otp" && (
            <div className="space-y-6">
              <button onClick={() => setScreen("register")}
                className="text-gray-500 text-sm hover:text-gray-300 flex items-center gap-1">← Back</button>
              <div>
                <h2 className="text-white text-xl font-bold mb-1">Verify Phone 🔐</h2>
                <p className="text-gray-400 text-sm">Real OTP sent to <span className="text-white font-medium">+91 {reg.phone}</span></p>
              </div>

              <div className="bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3">
                <p className="text-green-400 text-xs font-medium">📱 Check your phone for the real OTP!</p>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-4">Enter 6-digit OTP</label>
                <OtpInput onComplete={handleRegisterVerify} onChange={setOtpValue} />
              </div>

              {message && (
                <p className={`text-center text-sm font-medium ${message.includes("✅") ? "text-green-400" : "text-red-400"}`}>{message}</p>
              )}

              <button onClick={handleRegisterVerify} disabled={loading}
                className="w-full py-3 bg-yellow-400 text-black rounded-xl font-bold text-sm hover:bg-yellow-300 transition-all shadow-lg disabled:opacity-50">
                {loading ? "Verifying..." : "Verify & Create Account ✓"}
              </button>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Didn't receive OTP?</span>
                <button onClick={() => sendOtp(reg.phone)} className="text-yellow-400 hover:underline font-medium">Resend OTP</button>
              </div>
            </div>
          )}

          {/* ══ LOGIN ══ */}
          {screen === "login" && (
            <div className="space-y-5">
              <button onClick={() => setScreen("register")}
                className="text-gray-500 text-sm hover:text-gray-300 flex items-center gap-1">← Back</button>
              <div>
                <h2 className="text-white text-xl font-bold mb-1">Welcome back 👋</h2>
                <p className="text-gray-400 text-sm">Choose how you want to sign in</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(["phone", "gmail"] as const).map((method) => (
                  <button key={method} onClick={() => setLoginMethod(method)}
                    className={`py-4 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center gap-2 ${
                      loginMethod === method ? "bg-yellow-400/15 border-yellow-400 text-yellow-400" : "bg-[#1a2235] border-white/10 text-gray-400 hover:border-white/20"}`}>
                    <span className="text-2xl">{method === "phone" ? "📱" : "✉️"}</span>
                    {method === "phone" ? "Phone Number" : "Gmail"}
                  </button>
                ))}
              </div>

              {loginMethod === "phone" && (
                <div>
                  <label className="text-gray-300 text-sm font-medium block mb-1.5">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="bg-[#1a2235] border border-white/10 rounded-xl px-3 flex items-center text-gray-300 text-sm min-w-72px justify-center">🇮🇳 +91</div>
                    <input type="tel" maxLength={10} placeholder="10-digit number" value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 bg-[#1a2235] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50 transition-all" />
                  </div>
                </div>
              )}

              {loginMethod === "gmail" && (
                <div>
                  <label className="text-gray-300 text-sm font-medium block mb-1.5">Gmail Address</label>
                  <input type="email" placeholder="rahul@gmail.com" value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#1a2235] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400/50 transition-all" />
                </div>
              )}

              {loginMethod && (
                <button onClick={handleLoginSendOtp} disabled={!loginValid || loading}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    loginValid && !loading ? "bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg shadow-yellow-400/25" : "bg-yellow-400/20 text-yellow-400/40 cursor-not-allowed"}`}>
                  {loading ? "Sending OTP..." : "Send OTP →"}
                </button>
              )}

              {message && <p className="text-center text-sm text-yellow-400">{message}</p>}

              <p className="text-center text-gray-500 text-sm">
                New to SmartSwap?{" "}
                <button onClick={() => setScreen("register")} className="text-yellow-400 font-semibold hover:underline">Create Account</button>
              </p>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-gray-600 text-xs">or</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <button onClick={goHome}
                className="w-full py-3 rounded-xl border border-white/10 text-gray-400 text-sm hover:border-yellow-400/30 hover:text-yellow-400 transition-all font-medium">
                👀 Continue without Registration
              </button>
            </div>
          )}

          {/* ══ LOGIN OTP ══ */}
          {screen === "login-otp" && (
            <div className="space-y-6">
              <button onClick={() => setScreen("login")}
                className="text-gray-500 text-sm hover:text-gray-300 flex items-center gap-1">← Back</button>
              <div>
                <h2 className="text-white text-xl font-bold mb-1">Verify OTP 🔐</h2>
                <p className="text-gray-400 text-sm">
                  Real OTP sent to <span className="text-white font-medium">+91 {loginPhone}</span>
                </p>
              </div>

              <div className="bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3">
                <p className="text-green-400 text-xs font-medium">📱 Check your phone for the real OTP!</p>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-4">Enter 6-digit OTP</label>
                <OtpInput onComplete={handleLoginVerify} onChange={setOtpValue} />
              </div>

              {message && (
                <p className={`text-center text-sm font-medium ${message.includes("✅") ? "text-green-400" : "text-red-400"}`}>{message}</p>
              )}

              <button onClick={handleLoginVerify} disabled={loading}
                className="w-full py-3 bg-yellow-400 text-black rounded-xl font-bold text-sm hover:bg-yellow-300 transition-all shadow-lg disabled:opacity-50">
                {loading ? "Verifying..." : "Verify & Sign In ✓"}
              </button>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Didn't receive OTP?</span>
                <button onClick={() => sendOtp(loginPhone)} className="text-yellow-400 hover:underline font-medium">Resend OTP</button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">🔐 256-bit encrypted · RBI compliant · Made in India 🇮🇳</p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.1; }
          50% { transform: translateY(-18px); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}