document.addEventListener("DOMContentLoaded", () => {
    const goalForm = document.getElementById("goalForm");
    const goalGrid = document.getElementById("goalGrid");
    const goalDetails = document.getElementById("goalDetails");
    const tabButtons = document.querySelectorAll(".tab-button");
    let selectedGoal = null;

    goalForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const goal = {
            name: document.getElementById("goalName").value.trim(),
            targetAmount: Number(document.getElementById("targetAmount").value),
            timePeriod: Number(document.getElementById("timePeriod").value),
            timeUnit: document.getElementById("timeUnit").value,
            paymentInterval: document.getElementById("paymentInterval").value
        };
        if (!goal.name || !Number.isFinite(goal.targetAmount) || goal.targetAmount <= 0 ||
            !Number.isFinite(goal.timePeriod) || goal.timePeriod <= 0) {
            return;
        }

        const goalCard = document.createElement("div");
        goalCard.classList.add("goal-card", "progress-0");
        const title = document.createElement("h3");
        title.textContent = goal.name;
        goalCard.appendChild(title);
        goalCard.addEventListener("click", () => showGoalDetails(goal));
        goalGrid.appendChild(goalCard);

        goalForm.reset();
    });

    function showGoalDetails(goal) {
        selectedGoal = goal;
        const details = document.createElement("div");
        details.classList.add("details-content");
        const savedAmount = 200;
        const detailValues = [
            ["Target Amount:", `$${goal.targetAmount}`],
            ["Time Period:", `${goal.timePeriod} ${goal.timeUnit}`],
            ["Payment Interval:", goal.paymentInterval],
            ["Saved Amount:", `$${savedAmount}`],
            ["Remaining Amount:", `$${goal.targetAmount - savedAmount}`]
        ];

        const heading = document.createElement("h2");
        heading.textContent = goal.name;
        details.appendChild(heading);
        detailValues.forEach(([label, value]) => {
            const paragraph = document.createElement("p");
            const strong = document.createElement("strong");
            strong.textContent = label;
            paragraph.append(strong, ` ${value}`);
            details.appendChild(paragraph);
        });

        const status = document.createElement("div");
        status.classList.add("status-content");
        const statusHeading = document.createElement("h3");
        statusHeading.textContent = "Payment Status";
        status.appendChild(statusHeading);

        goalDetails.replaceChildren(details, status);
        updateActiveTab("details");
    }

    function updateActiveTab(tabName) {
        tabButtons.forEach(button => {
            button.classList.toggle("active", button.dataset.tab === tabName);
        });
        const details = goalDetails.querySelector(".details-content");
        const status = goalDetails.querySelector(".status-content");
        if (details) details.classList.toggle("active", tabName === "details");
        if (status) status.classList.toggle("active", tabName === "status");
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (selectedGoal) updateActiveTab(button.dataset.tab);
        });
    });
});
