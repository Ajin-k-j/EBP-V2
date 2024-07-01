document.addEventListener('DOMContentLoaded', () => {
    const benefits = [
        { id: 1, name: 'Health Insurance' },
        { id: 2, name: 'Paid Time Off' },
        { id: 3, name: 'Retirement Plan' },
        { id: 4, name: 'Work from Home' },
        { id: 5, name: 'Gym Membership' },
        { id: 6, name: 'Professional Development' },
        { id: 7, name: 'Life Insurance' },
        { id: 8, name: 'Dental Insurance' },
        { id: 9, name: 'Vision Insurance' },
        { id: 10, name: 'Mental Health Support' },
        { id: 11, name: 'Flexible Schedule' },
        { id: 12, name: 'Commuter Benefits' },
        { id: 13, name: 'Pet Insurance' },
        { id: 14, name: 'Paid Parental Leave' },
        { id: 15, name: 'Stock Options' },
        { id: 16, name: 'Employee Discounts' },
        { id: 17, name: 'Tuition Reimbursement' },
        { id: 18, name: 'On-site Childcare' },
        { id: 19, name: 'Housing Allowance' },
        { id: 20, name: 'Annual Bonus' }
    ];

    const benefitSelect = document.getElementById('benefit-select');

    benefits.forEach(benefit => {
        const option = document.createElement('option');
        option.value = benefit.id;
        option.textContent = benefit.name;
        benefitSelect.appendChild(option);
    });

    document.getElementById('delete-benefit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedBenefit = benefitSelect.value;
        if (selectedBenefit !== 'Choose') {
            const benefitName = benefits.find(b => b.id == selectedBenefit).name;
            alert(`Benefit "${benefitName}" deleted successfully.`);
            benefitSelect.selectedIndex = 0;
        } else {
            alert('Please choose a benefit to delete.');
        }
    });
});
