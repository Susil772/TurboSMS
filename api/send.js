export default async function handler(req, res) {
    // অন্য কেউ যাতে আপনার ব্রিজ ইউজ করতে না পারে, তাই একটা সিক্রেট চাবি
    const myKey = "AMAR_GOPON_PASS_1234"; 

    // InfinityFree থেকে আসা চাবি চেক করা
    if (req.query.secret !== myKey) {
        return res.status(401).json({ error: "চুরি করার চেষ্টা করবেন না!" });
    }

    const { number, amount } = req.query;

    // আসল API (Port 81) - এটা সার্ভারের ভেতর লুকানো থাকবে
    const targetUrl = `https://premium.jubairbro.store:81/api/api?key=app&num=${number}&amount=${amount}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.text(); // Jubair API যা দিবে তাই
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to Port 81" });
    }
}
