import { useState } from "react";
import api from "../api";   // ✅ changed

function AddExpense({ refreshExpenses, user }) {

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("debit");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) return;

    try {
      await api.post(   // ✅ changed
        `/expenses/${user.id}`,   // ✅ removed localhost
        {
          category,
          amount,
          date,
          type,
          description
        }
      );

      setCategory("");
      setAmount("");
      setDate("");
      setType("debit");
      setDescription("");

      refreshExpenses();

    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div>

      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Add Expense
      </h2>

      <form onSubmit={handleSubmit} className="flex items-center gap-6 flex-wrap">

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-b outline-none px-2 py-1 text-sm"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border-b outline-none px-2 py-1 text-sm"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-b outline-none px-2 py-1 text-sm w-40"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border-b outline-none px-2 py-1 text-sm"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-sm bg-transparent outline-none"
        >
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>

        <button
          type="submit"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          Add
        </button>

      </form>

    </div>
  );
}

export default AddExpense;