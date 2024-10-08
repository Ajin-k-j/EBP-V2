import { forceFetchData, benefits } from '/firebase/firebaseData.js';

window.onload = async () => {
    const loadingAnimation = document.getElementById('loading-animation');

    // Show loading animation initially
    loadingAnimation.style.display = 'flex';

    // Fetch data from Firestore
    await forceFetchData();

    // Hide loading animation after everything is loaded
    loadingAnimation.style.display = 'none';
    document.getElementById("body").style.display = 'block';

    // Initialize benefits display after hiding loading animation
    // initBenefitsDisplay(benefits);

    //Load benefits function : loadBenefits(category Id, html Container)
    loadBenefits("statutory-benefits", "statuatoryBenefits");
    loadBenefits("tax-saving-benefits", "taxSavingBenefits");
    loadBenefits("supplementary-benefits", "supplementaryBenefits");
};

// Function to sort benefits by views in descending order
function sortBenefitsByViews(benefits) {
    return benefits.sort((a, b) => b.views - a.views);
}

// Function to get the top N benefits
function getTopBenefits(benefits, count) {
    return benefits.slice(0, count);
}

// Function to update HTML elements with benefit values and IDs
function updateBenefitCards(container, benefits) {
    const benefitCards = container.querySelectorAll('.benefit-card');

    benefits.forEach((benefit, index) => {
        const card = benefitCards[index];
        if (card) {
            const icon = card.querySelector('.icon');
            const title = card.querySelector('h5');

            if (icon) {
                icon.className = benefit.icon + ' icon';
            }

            if (title) {
                title.textContent = benefit.name;
            }

            // Set href with benefitDetails.html and ID
            card.href = `/user/benefitDetails/benefitDetails.html?id=${benefit.id}`;
        }
    });
}

// Function to initialize the benefits display
function initBenefitsDisplay(benefits) {
    const popularBenefitsContainers = document.querySelectorAll('.popular-benefits');

    // Sort benefits by views and get the top 8
    const sortedBenefits = sortBenefitsByViews(benefits);
    const top8Benefits = getTopBenefits(sortedBenefits, 8);

    // Update each container with the top 8 benefits
    popularBenefitsContainers.forEach(container => {
        updateBenefitCards(container, top8Benefits);
    });
}

const searchInput = document.getElementById('benefit-search');
const recommendations = document.getElementById('recommendations');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    recommendations.innerHTML = '';
    if (query) {
        const filteredBenefits = benefits.filter(benefit => benefit.name.toLowerCase().includes(query));
        filteredBenefits.forEach(benefit => {
            const div = document.createElement('div');
            div.className = 'recommendation-item';
            div.textContent = benefit.name;
            div.addEventListener('click', () => {
                searchInput.value = benefit.name;
                recommendations.innerHTML = '';
            });
            recommendations.appendChild(div);
        });
    }
});

function performSearch() {
    const query = searchInput.value.toLowerCase();
    const modalBody = document.getElementsByClassName("modal-body");
    if (query) {
        const result = benefits.find(benefit => benefit.name.toLowerCase() === query);
        if (result) {
            window.location.href = `/user/benefitDetails/benefitDetails.html?id=${result.id}`;
        } else {
            // alert('Benefit not found.');
            $("#exampleModal1").modal("show");
             modalBody[0].textContent = "Benefit not found.";
        }
    }
    else{
        $("#exampleModal1").modal("show");
        modalBody[0].textContent = "Enter a valid input.";
    }
    
}
// Expose performSearch to the global scope
window.performSearch = performSearch;

//Load benefits funtion
function loadBenefits(categoryId, container){
    let benefitByCategory = benefits.filter((item) => item.categoryId == categoryId);
    let sortedBenefits = benefitByCategory.sort((a, b) => b.views - a.views);
    sortedBenefits.forEach((item) => {
        // Create a temporary div to hold the HTML string
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="/user/benefitDetails/benefitDetails.html?id=${item.id}">
                ${item.name}
            </a>`;
        //<i class="fas ${item.icon} fa-2x"></i>
        // Append the new HTML element to the target container
        document.getElementById(container).appendChild(listItem);
    })
}