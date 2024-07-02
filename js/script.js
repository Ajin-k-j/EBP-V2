
document.addEventListener('DOMContentLoaded', () => {
    const popularBenefitsContainers = document.querySelectorAll('.popular-benefits');

    // Sort benefits by views in descending order
    const sortedBenefits = benefits.sort((a, b) => b.views - a.views);

    // Take only the top 8 elements
    const top8Benefits = sortedBenefits.slice(0, 8);

    // Update HTML elements with benefit values and IDs
    popularBenefitsContainers.forEach(popularBenefitsContainer => {
        const benefitCards = popularBenefitsContainer.querySelectorAll('.benefit-card');

        top8Benefits.forEach((benefit, index) => {
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
                card.href = `benefitDetails.html?id=${benefit.id}`;
            }
        });
    });
});




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
    const result = benefits.find(benefit => benefit.name.toLowerCase() === query);
    if (result) {
        alert(`${result.name}\n\nCategory: ${result.category}\nDescription: ${result.description}\nDetails: ${result.details}`);
    } else {
        alert('Benefit not found.');
    }
}
