// import { benefits } from './data.js';
import { db } from '/js/firebase/firebaseConfig.js';
import { fetchData, categories, benefits} from './firebase/firebaseData.js';
import { collection, addDoc, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async() => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    await fetchData();

    const benefitSelect = document.getElementById('benefit-select');

    // Populate the select element with benefit names
    benefits.forEach(benefit => {
        console.log(id);
        if(benefit.categoryId === id){
            const option = document.createElement('option');
            option.value = benefit.id;
            option.textContent = benefit.name;
            benefitSelect.appendChild(option);
        }
    });

    document.getElementById('delete-benefit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedBenefitId = benefitSelect.value;
        if (selectedBenefitId !== 'Choose') {
            // Find the index of the selected benefit
            const benefitIndex = benefits.findIndex(b => b.id === selectedBenefitId);

            if (benefitIndex !== -1) {
                const benefitName = benefits[benefitIndex].name;
                // Remove the selected benefit from the array
                benefits.splice(benefitIndex, 1);
                // Reflect changes in the select element
                benefitSelect.options[benefitSelect.selectedIndex].remove();
                benefitSelect.selectedIndex = 0;

                alert(`Benefit "${benefitName}" deleted successfully.`);
            } else {
                alert('Benefit not found.');
            }
        } else {
            alert('Please choose a benefit to delete.');
        }
    });
});
