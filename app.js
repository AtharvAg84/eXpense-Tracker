document.addEventListener("DOMContentLoaded", () => {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let chartInstance = null;

  const form = document.getElementById("expenseForm");
  const transactionsList = document.getElementById("transactionsList");
  const totalSpentElement = document.querySelector(".stat-value");
  const transactionCountElement = document.querySelectorAll(".stat-value")[1];

  // Initialize Chart
  const ctx = document.getElementById("expenseChart").getContext("2d");

  // Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const expenseName = document.getElementById("expenseName").value;
    const expenseAmount = parseFloat(
      document.getElementById("expenseAmount").value
    );
    const expenseCategory = document.getElementById("expenseCategory").value;

    if (!expenseName || !expenseAmount) {
      showErrorToast("Please fill in all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: expenseAmount,
      category: expenseCategory,
      date: new Date().toISOString(),
    };

    expenses.push(newExpense);
    updateLocalStorage();
    updateUI();
    form.reset();
    showSuccessToast("Expense added successfully");
  });

  // Update UI
  function updateUI() {
    renderTransactions();
    updateStats();
    updateChart(); // Existing Doughnut Chart
    updateCategorySection(); // ✅ Update categories dynamically
  }

  // Render Transactions
  function renderTransactions() {
    transactionsList.innerHTML = "";
    expenses.forEach((expense) => {
      const transactionEl = document.createElement("div");
      transactionEl.className = "transaction-item";
      transactionEl.innerHTML = `
                <div>
                    <h3>${expense.name}</h3>
                    <small>${new Date(expense.date).toLocaleDateString()} • ${
        expense.category
      }</small>
                </div>
                <div>
                    <span class="amount">$${expense.amount.toFixed(2)}</span>
                    <button class="delete-btn" data-id="${
                      expense.id
                    }">×</button>
                </div>
            `;
      transactionsList.appendChild(transactionEl);
    });

    // Add delete event listeners
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", deleteExpense);
    });
  }

  // Delete Expense
  function deleteExpense(e) {
    const id = parseInt(e.target.dataset.id);
    expenses = expenses.filter((expense) => expense.id !== id);
    updateLocalStorage();
    updateUI();
    showSuccessToast("Expense deleted");
  }

  // Update Statistics
  function updateStats() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalSpentElement.textContent = `$${total.toFixed(2)}`;
    transactionCountElement.textContent = expenses.length;
  }

  // Update Categories Section
  function updateCategorySection() {
    const categoryElements = {
      food: document.getElementById("food_drinks"),
      transport: document.getElementById("transport"),
      housing: document.getElementById("housing"),
      entertainment: document.getElementById("entertainment"),
      utilities: document.getElementById("utilities"),
      shopping: document.getElementById("shopping"),
      groceries: document.getElementById("groceries"),
      "health & fitness": document.getElementById("health_fitness"),
    };

    // Reset all category amounts to 0 before recalculating
    for (let key in categoryElements) {
      categoryElements[key].textContent = `$0.00`;
    }

    // Calculate total per category
    const categoryTotals = expenses.reduce((totals, expense) => {
      if (!totals[expense.category]) {
        totals[expense.category] = 0;
      }
      totals[expense.category] += expense.amount;
      return totals;
    }, {});

    // Update UI for each category
    for (let category in categoryTotals) {
      if (categoryElements[category]) {
        categoryElements[category].textContent = `$${categoryTotals[
          category
        ].toFixed(2)}`;
      }
    }
  }

  // Update Chart
  function updateChart() {
    if (chartInstance) chartInstance.destroy();

    const categories = [
      ...new Set(expenses.map((expense) => expense.category)),
    ];
    const data = categories.map((category) => {
      return expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);
    });

    chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: categories,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#10b981",
              "#ff5e57",
              "#f97316",
              "#22d3ee",
              "#6366f1",
              "#a855f7",
              "#ec4899",
              "#f59e0b",
            ],
            borderWidth: 0,
            hoverOffset: 20,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#f8fafc",
            },
          },
        },
        animation: {
          duration: 1000,
          easing: "easeInOutQuart",
        },
      },
    });
  }
  

  // Helper Functions
  function updateLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function showSuccessToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast success";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  function showErrorToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast error";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // Initial UI Update
  updateUI();
});
