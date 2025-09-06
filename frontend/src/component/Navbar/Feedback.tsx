import  { useState } from "react";
import NavbarPage from "./NavbarPage";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for your feedback!\n" + feedback);
    setFeedback("");
  };

  return (
    <>
      <NavbarPage />
      <div className="max-w-xl mx-auto mt-8 p-8 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback ..."
            required
            className="w-full h-32 px-4 py-2 border rounded resize-none"
          />
          <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Feedback;
