import { useMemo } from "react";

function InsightsPage({ expenses }) {

  const totalDebit = expenses
    .filter(e => e.type === "debit")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalCredit = expenses
    .filter(e => e.type === "credit")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalCredit - totalDebit;

  // 🔥 CATEGORY MAP
  const categoryMap = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      if (e.type === "debit") {
        map[e.category] = (map[e.category] || 0) + e.amount;
      }
    });
    return map;
  }, [expenses]);

  // 🔥 TOP 3 CATEGORIES
  const topCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // 🔥 MOST SPENT
  const mostSpent = topCategories[0];

  // 🔥 MONTHLY SPENDING
  const currentMonth = new Date().getMonth();

  const thisMonth = expenses
    .filter(e => new Date(e.date).getMonth() === currentMonth && e.type === "debit")
    .reduce((sum, e) => sum + e.amount, 0);

  const lastMonth = expenses
    .filter(e => new Date(e.date).getMonth() === currentMonth - 1 && e.type === "debit")
    .reduce((sum, e) => sum + e.amount, 0);

  const diff = thisMonth - lastMonth;
  const percent = lastMonth ? ((diff / lastMonth) * 100).toFixed(0) : 0;

  // 🔥 AVG DAILY SPEND
  const days = new Date().getDate();
  const avgDaily = Math.round(thisMonth / days);

  return (
    <div className="space-y-6">

      {/* TOP STATS */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl border text-center">
          <p className="text-gray-500 text-sm">Balance</p>
          <p className="text-gray-800 text-xl font-semibold mt-1">
            ₹{balance}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border text-center">
          <p className="text-gray-500 text-sm">This Month</p>
          <p className="text-red-500 text-xl font-semibold mt-1">
            ₹{thisMonth}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border text-center">
          <p className="text-gray-500 text-sm">Avg Daily</p>
          <p className="text-indigo-600 text-xl font-semibold mt-1">
            ₹{avgDaily}
          </p>
        </div>

      </div>

      {/* TOP CATEGORIES */}
      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">Top Categories</h3>

        {topCategories.map(([cat, amt], i) => (
          <div key={i} className="flex justify-between py-2 border-b last:border-none">
            <span className="capitalize">{cat}</span>
            <span className="text-red-500 font-medium">₹{amt}</span>
          </div>
        ))}
      </div>

      {/* SMART INSIGHTS */}
      <div className="bg-white p-6 rounded-2xl border space-y-2">

        <h3 className="font-semibold mb-2">Insights</h3>

        {mostSpent && (
          <p className="text-gray-700">
            You spend the most on <b className="capitalize">{mostSpent[0]}</b>.
          </p>
        )}

        <p className="text-gray-700">
          Your spending is{" "}
          <b className={diff >= 0 ? "text-red-500" : "text-green-600"}>
            {diff >= 0 ? "higher" : "lower"}
          </b>{" "}
          by {Math.abs(percent)}% compared to last month.
        </p>

        <p className="text-gray-700">
          On average, you spend <b>₹{avgDaily}</b> per day this month.
        </p>

      </div>

    </div>
  );
}

export default InsightsPage;