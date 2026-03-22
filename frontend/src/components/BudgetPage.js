import { useState, useEffect, useCallback } from "react";
import api from "../api";
import { Trash2 } from "lucide-react";

function BudgetPage({ expenses }) {

  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  // ✅ GET LOGGED IN USER
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBudgets = useCallback(async () => {
    try {
      const res = await api.get(`/budgets/${user?.id}`);
      setBudgets(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchBudgets();
    }
  }, [fetchBudgets]);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!category || !amount || !user?.id) return;

    try {
      await api.post(`/budgets/${user.id}`, {
        category,
        amount: Number(amount)
      });

      setCategory("");
      setAmount("");
      fetchBudgets();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this budget?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/budgets/${id}`);
      fetchBudgets();
    } catch (err) {
      console.error(err);
    }
  };

  const categories = [...new Set(expenses.map(e => e.category))];

  const getSpent = (cat) => {
    return expenses
      .filter(e => e.category === cat && e.type === "debit")
      .reduce((sum, e) => sum + e.amount, 0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">Set Budget</h2>

      <form onSubmit={handleAdd} className="flex gap-4 mb-8">

        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className={`px-4 py-2 border rounded-lg w-1/3 ${
            category ? "text-gray-800" : "text-gray-400"
          }`}
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          className="px-4 py-2 border rounded-lg w-1/3"
        />

        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Add
        </button>

      </form>

      <div className="space-y-4">

        {budgets.map((b) => {
          const spent = getSpent(b.category);
          const remaining = b.amount - spent;
          const percent = (spent / b.amount) * 100;

          return (
            <div key={b.id} className="border p-4 rounded-xl">

              <div className="flex justify-between items-center mb-2">

                <span className="font-medium">{b.category}</span>

                <div className="flex items-center gap-4">

                  <span>₹{b.amount}</span>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${Math.min(percent, 100)}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-sm">
                <span>Spent: ₹{spent}</span>
                <span>Remaining: ₹{remaining}</span>
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default BudgetPage;