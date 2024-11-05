document.addEventListener("DOMContentLoaded", function () {
    // Array of checklist item IDs
    const checklistItems = ["item1", "item2", "item3", "item4", "item5", "item6"];

    // Load saved checklist state from localStorage
    checklistItems.forEach(function (item) {
        const checkbox = document.getElementById(item);
        const isChecked = localStorage.getItem(item) === "true"; // Get stored state

        if (isChecked) {
            checkbox.checked = true; // Set checkbox state based on stored value
        }

        // Add an event listener to each checkbox to save its state
        checkbox.addEventListener("change", function () {
            localStorage.setItem(item, checkbox.checked); // Save checkbox state
        });
    });
});
