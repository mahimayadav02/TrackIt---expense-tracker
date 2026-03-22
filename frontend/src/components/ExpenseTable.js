import api from "../api";   // ✅ changed
import { Trash2 } from "lucide-react";

function ExpenseTable({ expenses, refreshExpenses }) {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this expense?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/expenses/${id}`);   // ✅ changed
      refreshExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-gray-400 text-sm text-center py-10">
        No expenses found
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">

      <table className="w-full text-left border-collapse">

        <thead>
          <tr className="text-gray-500 text-sm">
            <th className="pb-4 font-medium">Date</th>
            <th className="pb-4 font-medium">Type</th>
            <th className="pb-4 font-medium">Category</th>
            <th className="pb-4 font-medium">Description</th>
            <th className="pb-4 font-medium text-right">Amount</th>
            <th className="pb-4"></th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp, index) => {

            return (
              <tr
                key={exp.id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} text-sm`}
              >

                <td className="py-4 text-gray-700">
                  {exp.date ? new Date(exp.date).toLocaleDateString() : "-"}
                </td>

                <td className="py-4 text-gray-800 font-medium">
                  {exp.type || "-"}
                </td>

                <td className="py-4 text-gray-700">
                  {exp.category || "-"}
                </td>

                <td className="py-4 text-gray-900">
                  {exp.description || "—"}
                </td>

                <td
                  className={`py-4 text-right font-semibold ${
                    exp.type === "credit"
                      ? "text-green-600"
                      : exp.type === "debit"
                      ? "text-red-500"
                      : "text-gray-800"
                  }`}
                >
                  ₹{exp.amount ?? 0}
                </td>

                <td className="py-4 text-right">
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>

    </div>
  );
}

export default ExpenseTable;