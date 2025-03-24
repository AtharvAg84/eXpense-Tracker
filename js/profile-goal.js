document.addEventListener("DOMContentLoaded", () => {
    const goalForm = document.getElementById("goalForm");
    const goalGrid = document.getElementById("goalGrid");
    const goalDetails = document.getElementById("goalDetails");
    const tabButtons = document.querySelectorAll(".tab-button");

    goalForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const goalName = document.getElementById("goalName").value;
        const targetAmount = document.getElementById("targetAmount").value;

        const goalCard = document.createElement("div");
        goalCard.classList.add("goal-card", "progress-0");
        goalCard.innerHTML = `<h3>${goalName}</h3>`;
        goalCard.addEventListener("click", () => showGoalDetails(goalName, targetAmount, goalCard));
        goalGrid.appendChild(goalCard);

        goalForm.reset();
    });

    function showGoalDetails(name, amount, card) {
        // Example: Fetching more details (in a real case, these would come from the form inputs)
        const timePeriod = "12 Months";
        const interval = "Monthly";
        const savedAmount = 200;  // Placeholder
        const remaining = amount - savedAmount;
    
        goalDetails.innerHTML = `
            <div class="details-content active">
                <h2>${name}</h2>
                <p><strong>Target Amount:</strong> $${amount}</p>
                <p><strong>Time Period:</strong> ${timePeriod}</p>
                <p><strong>Payment Interval:</strong> ${interval}</p>
                <p><strong>Saved Amount:</strong> $${savedAmount}</p>
                <p><strong>Remaining Amount:</strong> $${remaining}</p>
            </div>
            <div class="status-content">
                <h3>Payment Status</h3>
            </div>
        `;
    
        tabButtons.forEach(btn => btn.addEventListener("click", function() {
            document.querySelector(".details-content").classList.toggle("active");
            document.querySelector(".status-content").classList.toggle("active");
        }));
    }    
});
