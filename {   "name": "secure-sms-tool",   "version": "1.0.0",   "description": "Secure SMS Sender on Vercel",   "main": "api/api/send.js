export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { phone } = req.body;
    let finalPhone = phone.replace(/[^0-9]/g, '');
    if (finalPhone.startsWith('01')) finalPhone = '88' + finalPhone;
    if (finalPhone.startsWith('1')) finalPhone = '880' + finalPhone;

    const token = process.env.MY_SECRET_TOKEN; 

    const data = {
        name: "User",
        mobile: finalPhone,
        fb_id: "https://webapp.ft.education/auth/registration"
    };

    try {
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

        if (response.status === 200 || response.status === 302) {
            return res.status(200).json({ success: true, message: "Code Sent Successfully! 🔥" });
        } else {
            return res.status(400).json({ success: false, message: "Failed! Code: " + response.status });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}
