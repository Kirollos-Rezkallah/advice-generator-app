import { useEffect, useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [advice, setAdvice] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.adviceslip.com/advice");
        if (!res.ok)
          throw new Error("Something went wrong with fetching advice");
        const data = await res.json();
        setId(data.slip.id);
        setAdvice(data.slip.advice);
        console.dir(data);
      } catch (e) {
        console.error(e);
        throw new Error("Error in fetching advice, try again");
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        <p className="advice-number">{`advice #${id}`}</p>
        <p className="advice">{`“${advice}”`}</p>
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
      <button className="new-advice">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        </svg>
      </button>
    </>
  );
}

export default App;
