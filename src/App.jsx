import { useState } from "react";
import Form from "./form"
import './App.css'
import MessageList from "./MessageList"

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">A place to share</p>
        <h1>Pagier messages</h1>
        <p>Leave a note and see what others have shared.</p>
      </header>
      <section className="composer-card" aria-label="Write a message">
        <Form onMessageSubmitted={() => setRefreshKey((key) => key + 1)} />
      </section>
      <MessageList refreshKey={refreshKey} />
    </main>
  )
}

export default App
