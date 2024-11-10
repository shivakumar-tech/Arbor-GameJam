// Array to store registrations
let registrations = [];

// Function to navigate between steps
function showStep(stepId) {
    // Hide all steps
    document.querySelectorAll("div[id^='step']").forEach((step) => {
        step.classList.add("hidden");
    });

    // Show the selected step
    document.getElementById(stepId).classList.remove("hidden");
}

// Step 1: Next Button Click
document.getElementById("nextButton").addEventListener("click", () => {
    showStep("step2");
});

// Step 2: Previous and Next Button Click
document.getElementById("previousStep1").addEventListener("click", () => {
    showStep("step1");
});
document.getElementById("nextStep2").addEventListener("click", () => {
    showStep("step3");
});

// Step 3: Previous and Next Button Click
document.getElementById("previousStep2").addEventListener("click", () => {
    showStep("step2");
});
document.getElementById("nextStep3").addEventListener("click", () => {
    showStep("step4");
});

// Step 4: Previous and Submit Button Click
document.getElementById("previousStep3").addEventListener("click", () => {
    showStep("step3");
});

// Function to handle form submission
document.getElementById("submitButton").addEventListener("click", (e) => {
    e.preventDefault();

    // Get form data
    const email = document.getElementById("email").value;
    const teamName = document.getElementById("teamName").value;
    const teamMembers = document.getElementById("teamMembers").value;
    const member1 = document.getElementById("teamMember1").value;
    const member2 = document.getElementById("teamMember2").value || "NONE";
    const member3 = document.getElementById("teamMember3").value || "NONE";

    // Get selected participation categories
    const categories = Array.from(
        document.querySelectorAll("#step3 input[type='checkbox']:checked")
    ).map((checkbox) => checkbox.value);

    // Get selected team participation category (Senior/Junior)
    const participationCategory = document.querySelector(
        "#step4 input[type='radio']:checked"
    )?.value;

    // Validate required fields
    if (
        !email ||
        !teamName ||
        !teamMembers ||
        !member1 ||
        categories.length === 0 ||
        !participationCategory
    ) {
        alert("Please fill out all required fields.");
        return;
    }

    // Add data to registrations array
    const registrationData = {
        Email: email,
        TeamName: teamName,
        TeamMembers: teamMembers,
        Member1: member1,
        Member2: member2,
        Member3: member3,
        Categories: categories.join(", "),
        ParticipationCategory: participationCategory,
    };

    registrations.push(registrationData);

    // Display thank you message
    alert("Thank you for registering, " + teamName + "!");

    // Reset the form and show the first step
    document.getElementById("accountForm").reset();
    showStep("step1");
});

// Function to export registrations to Excel
function exportToExcel() {
    if (registrations.length === 0) {
        alert("No data available to export.");
        return;
    }

    try {
        // Convert the data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(registrations);

        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

        // Export the workbook
        XLSX.writeFile(workbook, "Designers_Odyssey_Registrations.xlsx");
    } catch (error) {
        console.error("Error exporting to Excel:", error);
        alert("Failed to export data. Please try again.");
    }
}

// Event listener for the Export to Excel button
document.getElementById("exportButton").addEventListener("click", exportToExcel);
