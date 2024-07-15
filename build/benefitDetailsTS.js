"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Get benefit ID from URL and display corresponding details
    const benefitId = getBenefitIdFromURL();
    if (benefitId) {
        // Display benefit details
        displayBenefitDetails(benefitId);
        // Populate nav banner
        populateNavbanner(benefitId);
        // Populate the menu
        populateMenu(benefitId);
    }
});
// Function to get the benefit ID from the URL
function getBenefitIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}
// Get benefit by benefit id
function getBenefitById(benefitId) {
    return benefits.find((b) => b.id === benefitId);
}
// Get category details by categoryId
function getCategoryById(categoryId) {
    return categories.find((category) => category.id === categoryId);
}
// Populate nav banner
function populateNavbanner(benefitId) {
    var _a;
    const benefit = getBenefitById(benefitId);
    if (benefit) {
        const category = getCategoryById(benefit.categoryId);
        if (category) {
            const banner = document.querySelector(".leftNavBanner");
            const iconElement = banner === null || banner === void 0 ? void 0 : banner.querySelector("i");
            const nameElement = banner === null || banner === void 0 ? void 0 : banner.querySelector("h1");
            // Update icon class and name
            if (iconElement) {
                iconElement.className = category.icon;
            }
            if (nameElement) {
                nameElement.textContent = category.name;
            }
        }
        else {
            console.error(`Category with id ${(_a = getBenefitById(benefitId)) === null || _a === void 0 ? void 0 : _a.categoryId} not found.`);
        }
    }
}
// Populate the menu
function populateMenu(benefitId) {
    const benefitsMenu = document.getElementById("benefit-menu");
    benefits.forEach((benefit) => {
        var _a;
        if (benefit.categoryId === ((_a = getBenefitById(benefitId)) === null || _a === void 0 ? void 0 : _a.categoryId)) {
            const menuItem = document.createElement("li");
            menuItem.classList.add("nav-item", "navItem");
            if (benefit.id === benefitId) {
                menuItem.innerHTML = `<a class="nav-link leftNavActive" href="?id=${benefit.id}">${benefit.name}</a>`;
            }
            else {
                menuItem.innerHTML = `<a class="nav-link" href="?id=${benefit.id}">${benefit.name}</a>`;
            }
            benefitsMenu === null || benefitsMenu === void 0 ? void 0 : benefitsMenu.appendChild(menuItem);
        }
    });
}
// Function to display benefit details
function displayBenefitDetails(benefitId) {
    const benefitTitle = document.getElementById("benefit-title");
    const description = document.getElementById("description");
    const benefitContent = document.getElementById("benefit-content");
    const faqContainer = document.getElementById("accordionContainer");
    const benefit = getBenefitById(benefitId);
    if (benefit) {
        if (benefitTitle && description && benefitContent) {
            benefitTitle.textContent = benefit.name;
            description.textContent = benefit.description;
            benefitContent.innerHTML = benefit.content;
        }
        // Clear and populate FAQs
        if (faqContainer) {
            faqContainer.innerHTML = "";
        }
        benefit.faqs.forEach((faq, index) => {
            const faqItem = document.createElement("div");
            faqItem.classList.add("accordion-item");
            faqItem.innerHTML = `
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                        ${faq.question}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionContainer">
                    <div class="accordion-body">
                        ${faq.answer}
                    </div>
                </div>
            `;
            faqContainer === null || faqContainer === void 0 ? void 0 : faqContainer.appendChild(faqItem);
        });
    }
}
