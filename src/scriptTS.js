"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { categories, benefits, users, icons } from './data';
var data_1 = require("../js/data");
// ... (rest of the code remains the same)
// Event listener for window onload
window.onload = function () {
    var loadingAnimation = document.getElementById('loading-animation');
    // Show loading animation initially
    loadingAnimation.style.display = 'flex';
    // Hide loading animation after everything is loaded
    loadingAnimation.style.display = 'none';
    // Initialize benefits display after hiding loading animation
    initBenefitsDisplay(data_1.benefits);
};
// Function to sort benefits by views in descending order
function sortBenefitsByViews(benefits) {
    return benefits.sort(function (a, b) { return b.views - a.views; });
}
// Function to get the top N benefits
function getTopBenefits(benefits, count) {
    return benefits.slice(0, count);
}
// Function to update HTML elements with benefit values and IDs
function updateBenefitCards(container, benefits) {
    var benefitCards = container.querySelectorAll('.benefit-card');
    benefits.forEach(function (benefit, index) {
        var card = benefitCards[index];
        if (card) {
            var icon = card.querySelector('.icon');
            var title = card.querySelector('h5');
            if (icon) {
                icon.className = benefit.icon + 'con';
            }
            if (title) {
                title.textContent = benefit.name;
            }
            // Set href with benefitDetails.html and ID
            card.href = "benefitDetails.html?id=".concat(benefit.id);
        }
    });
}
// Function to initialize the benefits display
function initBenefitsDisplay(benefits) {
    var popularBenefitsContainers = document.querySelectorAll('.popular-benefits');
    // Sort benefits by views and get the top 8
    var sortedBenefits = sortBenefitsByViews(benefits);
    var top8Benefits = getTopBenefits(sortedBenefits, 8);
    // Update each container with the top 8 benefits
    popularBenefitsContainers.forEach(function (container) {
        updateBenefitCards(container, top8Benefits);
    });
}
var searchInput = document.getElementById('benefit-search');
var recommendations = document.getElementById('recommendations');
searchInput.addEventListener('input', function () {
    var query = searchInput.value.toLowerCase();
    recommendations.innerHTML = '';
    if (query) {
        var filteredBenefits = data_1.benefits.filter(function (benefit) { return benefit.name.toLowerCase().includes(query); });
        filteredBenefits.forEach(function (benefit) {
            var div = document.createElement('div');
            div.className = 'ecommendation-item';
            div.textContent = benefit.name;
            div.addEventListener('click', function () {
                searchInput.value = benefit.name;
                recommendations.innerHTML = '';
            });
            recommendations.appendChild(div);
        });
    }
});
function performSearch() {
    var query = searchInput.value.toLowerCase();
    var result = data_1.benefits.find(function (benefit) { return benefit.name.toLowerCase() === query; });
    if (result) {
        window.location.href = "benefitDetails.html?id=".concat(result.id);
    }
    else {
        alert('Benefit not found.');
    }
}
