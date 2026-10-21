import { useEffect, useState } from "react";

function MessageList({ refreshKey }) {
  const [messages, setMessages] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://pagier-6d44a-default-rtdb.asia-southeast1.firebasedatabase.app/message.json"
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Unable to fetch messages.");
        }
        setMessages(data || {});
        setError("");
      } catch (error) {
        setError(error.message || "Unable to fetch messages.");
      }
    };

    fetchMessages();
  }, [refreshKey]);

  return (
    <section className="messages-section">
      <h2>Recent messages</h2>
      {error && <p role="alert">{error}</p>}
      {Object.entries(messages).map(([id, item]) => {
        const sentAt = item.createdAt ? new Date(item.createdAt) : null;
        const hasTimestamp = sentAt && !Number.isNaN(sentAt.getTime());

        return (
          <article className="message-card" key={id}>
            <h3>{item.name}</h3>
            {hasTimestamp && (
              <time className="message-time" dateTime={sentAt.toISOString()}>
                {sentAt.toLocaleString()}
              </time>
            )}
            <p>{item.message}</p>
          </article>
        );
      })}
    </section>
  );
}

export default MessageList;
