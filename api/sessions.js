export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://ticketscloud.com/widget/events?org=5ca8f7c342674e000cc98848"
    );

    const text = await response.text();

    // проверка: вдруг опять HTML
    if (text.startsWith("<")) {
      return res.status(500).json({
        error: "API вернул HTML, а не JSON",
        preview: text.slice(0, 200)
      });
    }

    const data = JSON.parse(text);

    const events = data.events || [];

    res.status(200).json({ sessions: events });

  } catch (err) {
    res.status(500).json({
      error: "Ошибка",
      details: err.message
    });
  }
}
