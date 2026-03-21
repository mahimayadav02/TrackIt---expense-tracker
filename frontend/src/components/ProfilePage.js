import { useMemo, useState } from "react";

function ProfilePage({ user, expenses, setUser }) {

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });

  const totalCredit = expenses
    .filter(e => e.type === "credit")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalDebit = expenses
    .filter(e => e.type === "debit")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalCredit - totalDebit;

  const mostSpent = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      if (e.type === "debit") {
        map[e.category] = (map[e.category] || 0) + e.amount;
      }
    });

    let maxCat = null;
    let maxVal = 0;

    for (let key in map) {
      if (map[key] > maxVal) {
        maxVal = map[key];
        maxCat = key;
      }
    }

    return { category: maxCat, amount: maxVal };
  }, [expenses]);

  const budgetLimit = 10000;
  const usedPercent = Math.min((totalDebit / budgetLimit) * 100, 100);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  // ✅ LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-6">

          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
            {formData.name?.[0] || "U"}
          </div>

          <div>
            {isEditing ? (
              <>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded mb-1"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded"
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">
                  {formData.name}
                </h2>
                <p className="text-gray-500">
                  {formData.email}
                </p>
              </>
            )}
          </div>

        </div>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Edit Profile
          </button>
        )}

      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-6 mb-8">

        <div>
          <p className="text-gray-500 text-sm">Phone</p>
          {isEditing ? (
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border px-2 py-1 rounded"
            />
          ) : (
            <p className="font-medium">
              {formData.phone || "Not added"}
            </p>
          )}
        </div>

        <div>
          <p className="text-gray-500 text-sm">Username</p>
          <p className="font-medium">
            @{formData.name?.toLowerCase().replace(/\s/g, "") || "username"}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Joined</p>
          <p className="font-medium">March 2026</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Last Login</p>
          <p className="font-medium">Today</p>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="p-4 border rounded-xl text-center">
          <p className="text-sm text-gray-500">Credited</p>
          <p className="text-green-600 font-semibold mt-1">
            ₹{totalCredit}
          </p>
        </div>

        <div className="p-4 border rounded-xl text-center">
          <p className="text-sm text-gray-500">Debited</p>
          <p className="text-red-500 font-semibold mt-1">
            ₹{totalDebit}
          </p>
        </div>

        <div className="p-4 border rounded-xl text-center">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-gray-800 font-semibold mt-1">
            ₹{balance}
          </p>
        </div>

      </div>

      {/* MOST SPENT */}
      <div className="mb-8 p-4 border rounded-xl">
        <p className="text-sm text-gray-500 mb-1">Most Spent Category</p>

        {mostSpent.category ? (
          <div className="flex justify-between">
            <span className="font-medium capitalize">
              {mostSpent.category}
            </span>
            <span className="text-red-500 font-semibold">
              ₹{mostSpent.amount}
            </span>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No data</p>
        )}
      </div>

      {/* BUDGET PROGRESS */}
      <div className="mb-8 p-4 border rounded-xl">

        <p className="text-sm text-gray-500 mb-2">
          Monthly Budget Usage
        </p>

        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-indigo-600 rounded-full"
            style={{ width: `${usedPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span>Used ₹{totalDebit}</span>
          <span>{Math.round(usedPercent)}%</span>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">

        <button className="px-4 py-2 border rounded-lg">
          Change Password
        </button>

        {/* ✅ FIXED LOGOUT */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 border rounded-lg hover:bg-red-100 hover:text-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default ProfilePage;