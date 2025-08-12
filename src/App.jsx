import { useEffect, useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchData() {
    let timeoutId;
    try {
      setError("");
      setIsLoading(true);

      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Something went wrong with fetching advice");

      const data = await res.json();
      setId(data.slip.id);
      setAdvice(data.slip.advice);
    } catch (e) {
      if (e.name === "AbortError") {
        setError("Request timeout");
      } else setError(e.message);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        {error && <Error message={error} />}
        {!error && isLoading && <Loading />}
        {!error && !isLoading && (
          <>
            <p
              className="advice-number"
              aria-live="polite">{`advice #${id}`}</p>
            <p className="advice">{`“${advice}”`}</p>
          </>
        )}
        <svg
          className="border"
          width="444"
          height="16"
          xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
            <g transform="translate(212)" fill="#CEE3E9">
              <rect width="6" height="16" rx="3" />
              <rect x="14" width="6" height="16" rx="3" />
            </g>
          </g>
        </svg>
      </div>
      <button
        className="new-advice"
        onClick={fetchData}
        disabled={isLoading}
        type="button">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        </svg>
      </button>
    </>
  );
}

function Loading() {
  return (
    <p className="advice" aria-live="polite">
      Loading...
    </p>
  );
}

function Error({ message }) {
  return (
    <div className="advice" role="alert">
      {message + ", try again."}
    </div>
  );
}

export default App;
