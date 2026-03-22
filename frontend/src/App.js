import { useState, useEffect } from "react";
import api from "./api";   // ✅ CHANGED
import BudgetPage from "./components/BudgetPage";
import ProfilePage from "./components/ProfilePage";
import InsightsPage from "./components/InsightsPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

import ExpenseCharts from "./components/ExpenseCharts";
import ExpenseTable from "./components/ExpenseTable";
import AddExpense from "./components/AddExpense";

import {
  User,
  LayoutDashboard,
  Wallet,
  BarChart3,
  Settings
} from "lucide-react";

function App() {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showSignup, setShowSignup] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchExpenses = async () => {
    if (!user?.id) return;

    try {
      const response = await api.get(   // ✅ CHANGED
        `/expenses/${user.id}`          // ✅ CHANGED
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) {
    return showSignup ? (
      <SignupPage setShowSignup={setShowSignup} />
    ) : (
      <LoginPage setUser={setUser} setShowSignup={setShowSignup} />
    );
  }

  const totalBalance = expenses.reduce((sum, e) => {
    if (e.type === "credit") return sum + e.amount;
    if (e.type === "debit") return sum - e.amount;
    return sum;
  }, 0);

  const currentMonth = new Date().getMonth();
  const monthlyExpenses = expenses
    .filter(
      (e) =>
        new Date(e.date).getMonth() === currentMonth &&
        e.type === "debit"
    )
    .reduce((sum, e) => sum + e.amount, 0);


  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch =
      e.category?.toLowerCase().includes(search.toLowerCase()) ||
      e.description?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || e.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: "#FFF8F0" }}
    >

      {/* SIDEBAR */}
      <aside
        className="w-60 border-r flex flex-col justify-between p-6"
        style={{ backgroundColor: "#FCF8F8" }}
      >

        <div>
          <h2 className="text-2xl font-bold mb-10 text-indigo-600">
            TrackIt
          </h2>

          <div className="space-y-2">

            <SidebarItem icon={<User size={18} />} label="Profile"
              active={activePage === "profile"}
              onClick={() => setActivePage("profile")}
            />

            <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard"
              active={activePage === "dashboard"}
              onClick={() => setActivePage("dashboard")}
            />

            <SidebarItem icon={<Wallet size={18} />} label="Expenses"
              active={activePage === "expenses"}
              onClick={() => setActivePage("expenses")}
            />

            <SidebarItem icon={<BarChart3 size={18} />} label="Insights"
              active={activePage === "insights"}
              onClick={() => setActivePage("insights")}
            />

            <SidebarItem icon={<Wallet size={18} />} label="Budget"
              active={activePage === "budget"}
              onClick={() => setActivePage("budget")}
            />

          </div>
        </div>

        <SidebarItem icon={<Settings size={18} />} label="Settings" />
      </aside>

      {/* MAIN */}
      <main className="flex-1 px-12 py-12 overflow-y-auto">

        {activePage === "dashboard" && (
          <>
            <div className="flex justify-between items-start mb-10">

              <div>
                <p className="text-gray-600 text-lg font-semibold">
                  Total Balance
                </p>

                <h1 className="text-6xl font-extrabold text-gray-900 mt-2">
                  ₹{totalBalance}
                </h1>

                <p className="text-gray-600 mt-4 text-lg font-medium">
                  Monthly spent ₹{monthlyExpenses}
                </p>
              </div>

              <div className="flex flex-col gap-4 w-56 mr-8 mt-6">

                <button
                  onClick={() => setShowAddExpense(!showAddExpense)}
                  className="w-full px-6 py-3 rounded-xl bg-white border shadow-sm"
                >
                  Add Expense
                </button>

                <button className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white">
                  Generate Insights
                </button>

              </div>
            </div>

            {showAddExpense && (
              <div className="mb-6 bg-white p-6 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
                <AddExpense refreshExpenses={fetchExpenses} user={user} />
              </div>
            )}

            <div className="grid grid-cols-3 gap-6">

              <div className="col-span-2 bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-6">
                <h3 className="text-lg font-semibold mb-5">
                  Recent Expenses
                </h3>

                <ExpenseTable
                  expenses={expenses.slice(0, 5)}
                  refreshExpenses={fetchExpenses}
                />
              </div>

              <div className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-6">
                <h3 className="text-lg font-semibold mb-5">
                  Monthly Overview
                </h3>

                <ExpenseCharts expenses={expenses} />
              </div>

            </div>
          </>
        )}

        {activePage === "expenses" && (
          <div className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-6">

            <h2 className="text-xl font-semibold mb-6">
              Add Expense
            </h2>

            <div className="flex justify-between items-center mb-6">

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border rounded-lg w-[60%]"
              />

              <div className="flex gap-3 items-center">

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="all">All</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>

                <button
                  onClick={() => setShowAddExpense(!showAddExpense)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Add Expense
                </button>

              </div>
            </div>

            {showAddExpense && (
              <div className="mb-6">
                <AddExpense refreshExpenses={fetchExpenses} user={user} />
              </div>
            )}

            <ExpenseTable
              expenses={filteredExpenses}
              refreshExpenses={fetchExpenses}
            />

          </div>
        )}

        {activePage === "budget" && (
          <div className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-6">
            <BudgetPage expenses={expenses} />
          </div>
        )}

        {activePage === "profile" && (
          <div className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-6">
            <ProfilePage user={user} expenses={expenses} setUser={setUser} />
          </div>
        )}

        {activePage === "insights" && (
          <div className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] p-6">
            <InsightsPage expenses={expenses} />
          </div>
        )}

      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm
      ${
        active
          ? "bg-indigo-100 text-indigo-600 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

export default App;