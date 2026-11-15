document.addEventListener("DOMContentLoaded", () => {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let chartInstance = null;

  const form = document.getElementById("expenseForm");
  const transactionsList = document.getElementById("transactionsList");
  const totalSpentElement = document.querySelector(".stat-value");
  const transactionCountElement = document.querySelectorAll(".stat-value")[1];

  // Initialize Chart
  const chartCanvas = document.getElementById("expenseChart");
  const ctx = chartCanvas ? chartCanvas.getContext("2d") : null;

  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function () {
      dropdownMenu.style.display = "none";
    });
  }

  // Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const expenseName = document.getElementById("expenseName").value;
    const expenseAmount = parseFloat(
      document.getElementById("expenseAmount").value
    );
    const expenseCategory = document.getElementById("expenseCategory").value;

    if (!expenseName || !Number.isFinite(expenseAmount) || expenseAmount <= 0 || !expenseCategory) {
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
    if (!ctx || !window.Chart) return;
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

let editingRecurringExpense = null;

// Tab switching logic
function showTab(id) {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.expenses_list');

    tabs.forEach(tab => tab.classList.remove('active'));
    sections.forEach(section => section.style.display = 'none');

    const activeTab = document.querySelector(`.tab[onclick="showTab('${id}')"]`);
    const activeSection = document.getElementById(id);
    if (activeTab && activeSection) {
        activeTab.classList.add('active');
        activeSection.style.display = 'block';
    }
}

// Show/hide modal
function toggleExpenseForm(show) {
    const modal = document.getElementById('addExpenseForm');
    if (!modal) return;
    modal.style.display = show ? 'flex' : 'none';

    if (show) {
        document.getElementById('recurringExpenseName').value = '';
        document.getElementById('recurringExpenseAmount').value = '';
        document.getElementById('recurringExpenseDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('recurringExpenseType').value = '';
    } else {
        editingRecurringExpense = null;
    }
}

// Add expense to the selected section
function addExpense() {
    const nameInput = document.getElementById('recurringExpenseName');
    const amountInput = document.getElementById('recurringExpenseAmount');
    const dateInput = document.getElementById('recurringExpenseDate');
    const typeInput = document.getElementById('recurringExpenseType');
    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    const type = typeInput.value;

    if (!name || !Number.isFinite(amount) || amount <= 0 || !date || !type) {
        alert("Please enter a name, a positive amount, a date, and an interval.");
        return;
    }

    const section = document.getElementById(type);
    if (!section) {
        alert("Please select a valid expense interval.");
        return;
    }

    if (editingRecurringExpense) {
        const oldGroup = editingRecurringExpense.closest('.expenses_group');
        editingRecurringExpense.remove();
        if (oldGroup && !oldGroup.querySelector('li')) oldGroup.remove();
    }

    section.style.display = 'block';

    // Remove 'Nothing yet 👀' if it exists
    const msg = section.querySelector('.no-expense-msg');
    if (msg) msg.remove();

    // Check for existing group
    let group = section.querySelector(`.expenses_group[data-date="${date}"]`);
    if (!group) {
        group = document.createElement('div');
        group.className = 'expenses_group';
        group.setAttribute('data-date', date);
        group.innerHTML = `
            <div class="group_header">
                <strong>${new Date(date).toDateString()}</strong>
            </div>
            <ul></ul>
        `;
        section.appendChild(group);
    }

    const ul = group.querySelector('ul');
    const li = document.createElement('li');
    li.dataset.name = name;
    li.dataset.amount = amount.toFixed(2);
    const nameElement = document.createElement('span');
    nameElement.textContent = name;
    const amountElement = document.createElement('span');
    amountElement.textContent = `$${amount.toFixed(2)}`;
    const editButton = document.createElement('span');
    editButton.className = 'edit-btn';
    editButton.textContent = '✎';
    editButton.setAttribute('role', 'button');
    editButton.tabIndex = 0;
    editButton.setAttribute('aria-label', `Edit ${name}`);
    editButton.addEventListener('click', () => editExpense(editButton));
    editButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            editExpense(editButton);
        }
    });
    li.append(nameElement, amountElement, editButton);
    ul.appendChild(li);

    editingRecurringExpense = null;
    toggleExpenseForm(false);
}

// Edit existing expense
function editExpense(button) {
    const li = button.closest('li');
    const group = li ? li.closest('.expenses_group') : null;
    const section = li ? li.closest('.expenses_list') : null;
    if (!li || !group || !section) return;

    toggleExpenseForm(true);
    document.getElementById('recurringExpenseName').value = li.dataset.name;
    document.getElementById('recurringExpenseAmount').value = li.dataset.amount;
    document.getElementById('recurringExpenseDate').value = group.dataset.date;
    document.getElementById('recurringExpenseType').value = section.id;
    editingRecurringExpense = li;
}

// Default show first tab
document.addEventListener("DOMContentLoaded", () => {
    showTab('daily');
});
