import React, { useContext } from "react";
import { UserContext } from "../../context/Context";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", emoji: "☀️" };
  if (hour < 17) return { text: "Good Afternoon", emoji: "🌤️" };
  if (hour < 21) return { text: "Good Evening", emoji: "🌅" };
  return { text: "Good Night", emoji: "🌙" };
};

const getFinancialTip = (balance, income, expense) => {
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;
  if (savingsRate > 50) return "Excellent savings! You're building wealth fast. 🚀";
  if (savingsRate > 30) return "Great job! You're saving more than 30% of your income. 💪";
  if (savingsRate > 10) return "Good start! Try to push your savings above 30%. 📈";
  if (savingsRate > 0) return "Your savings rate is low. Consider cutting some expenses. ⚠️";
  return "You're spending more than you earn. Time to review your budget! 🔍";
};

const WelcomeBanner = ({ totalBalance, totalIncome, totalExpense }) => {
  const { user } = useContext(UserContext);
  const greeting = getGreeting();
  const firstName = user?.fullName?.split(" ")[0] || "there";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tip = getFinancialTip(totalBalance, totalIncome, totalExpense);

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 mb-6 border"
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(99,102,241,0.04) 50%, rgba(244,63,94,0.04) 100%)",
        borderColor: "rgba(139,92,246,0.12)",
      }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.07] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8B5CF6, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full opacity-[0.05] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F43F5E, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{greeting.emoji}</span>
            <h1 className="text-2xl font-bold dark:text-white text-gray-800">
              {greeting.text}, {firstName}!
            </h1>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-3">
            {today}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            {tip}
          </p>
        </div>

        {/* Quick stat pill */}
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-xl border self-start"
          style={{
            background: "rgba(139,92,246,0.06)",
            borderColor: "rgba(139,92,246,0.12)",
          }}
        >
          <div className="text-center">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">
              Savings Rate
            </p>
            <p
              className="text-xl font-bold"
              style={{
                color:
                  totalIncome > 0 &&
                  ((totalIncome - totalExpense) / totalIncome) * 100 > 30
                    ? "#22c55e"
                    : totalIncome > 0 &&
                      ((totalIncome - totalExpense) / totalIncome) * 100 > 0
                    ? "#f97316"
                    : "#f43f5e",
              }}
            >
              {totalIncome > 0
                ? `${Math.round(
                    ((totalIncome - totalExpense) / totalIncome) * 100
                  )}%`
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
