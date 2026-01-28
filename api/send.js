export default async function handler(req, res) {
    // 1. মেথড চেক
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    // 2. টোকেন চেক
    const token = process.env.MY_SECRET_TOKEN;
    if (!token) {
        return res.status(500).json({ success: false, message: 'Server Config Error: Token Missing' });
    }

    // 3. নাম্বার ঠিক করা
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ success: false, message: 'Phone number missing' });
    }

    let finalPhone = phone.replace(/[^0-9]/g, '');
    if (finalPhone.startsWith('01')) finalPhone = '88' + finalPhone;
    if (finalPhone.startsWith('1')) finalPhone = '880' + finalPhone;

    // 4. ডাটা রেডি করা
    const data = {
        name: "User",
        mobile: finalPhone,
        fb_id: "https://webapp.ft.education/auth/registration"
    };

    try {
        // 5. আসল সার্ভারে রিকোয়েস্ট পাঠানো
        const response = await fetch("https://webapp.ft.education/auth/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K)",
                "X-Inertia": "true",
                "X-XSRF-TOKEN": token
            },
            body: JSON.stringify(data)
        });

        // 6. ফলাফল পাঠানো
        if (response.status === 200 || response.status === 302) {
            return res.status(200).json({ success: true, message: "OTP Sent Successfully! 🔥" });
        } else {
            return res.status(400).json({ success: false, message: "Failed! Status: " + response.status });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
                                         }
