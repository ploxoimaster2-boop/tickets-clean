export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://ticketscloud.com/api/v1/frontend/events?org=5ca8f7c342674e000cc98848"
    );

    const data = await response.json();

    const events = data.events || [];

    const now = new Date();

    const futureEvents = events.filter(function (event) {
      if (!event.date) return false;
      return new Date(event.date) > now;
    });

    res.status(200).json({ sessions: futureEvents });

  } catch (err) {
    res.status(500).json({
      error: "Ошибка",
      details: err.message
    });
  }
}
