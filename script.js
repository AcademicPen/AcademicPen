// You can add any interactive functionality here if needed
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
});

document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const pagesInput = document.querySelector("#pages");
    const academicLevelSelect = document.querySelector("#academic-level");
    const paperTypeSelect = document.querySelector("#paper-type");
    const urgencySelect = document.querySelector("#urgency");
    const quotePrice = document.querySelector(".quote-price");
    const orderButton = document.querySelector(".order-btn");

    // Pricing variables
    const basePricePerPage = {
        "High School": 15,
        "College": 15,
        "University": 15,
        "Masters": 15,
        "PhD": 15
    };

    const deadlineMultiplier = {
        "12 Hours": 1.0,
        "24 Hours": 1.0,
        "3 Days": 1.0,
        "1 Week": 1.0,
        "2 Weeks": 1.0
    };

    // Function to calculate price
    function calculatePrice() {
        let pageCount = parseInt(pagesInput.value, 10);
        let academicLevel = academicLevelSelect.value;
        let urgency = urgencySelect.value;

        if (isNaN(pageCount) || pageCount < 1) {
            pageCount = 1;
            pagesInput.value = pageCount;
        }

        let basePrice = basePricePerPage[academicLevel] || 15;
        let multiplier = deadlineMultiplier[urgency] || 1;

        let totalPrice = pageCount * basePrice * multiplier;
        quotePrice.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Add event listeners for inputs
    pagesInput.addEventListener("input", calculatePrice);
    academicLevelSelect.addEventListener("change", calculatePrice);
    urgencySelect.addEventListener("change", calculatePrice);

    // Order button navigation
    orderButton.addEventListener("click", function () {
        let academicLevel = academicLevelSelect.value;
        let paperType = paperTypeSelect.value;
        let pageCount = pagesInput.value;
        let urgency = urgencySelect.value;
        let price = quotePrice.textContent.replace("$", "");

        // Construct URL with parameters
        let orderUrl = `orderform.html?academic=${encodeURIComponent(academicLevel)}&paper=${encodeURIComponent(paperType)}&pages=${pageCount}&urgency=${encodeURIComponent(urgency)}&price=${price}`;

        // Redirect to order page
        window.location.href = orderUrl;
    });

    // Ensure price updates on page load
    calculatePrice();
});
