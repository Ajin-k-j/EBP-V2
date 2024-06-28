
const benefits = [
    {
        category: "Statutory Benefits",
        name: "Employees' Provident Fund (EPF)",
        description: "A social security benefit for employees.",
        details: `Eligibility: Mandatory for organizations with 20 or more employees.
                  Contribution: Both employee and employer contribute 12% of the employee’s monthly salary.
                  Voluntary Provident Fund: Employees can contribute up to 100% of their basic salary and DA.
                  How to Avail: Automatically deducted and managed by the employer.`
    },
    {
        category: "Statutory Benefits",
        name: "Employees' State Insurance Scheme (ESI)",
        description: "Provides medical, maternity, disability, and dependents benefits.",
        details: `Eligibility: Mandatory for employees earning up to INR 21,000 per month.
                  Contribution: Employee contributes 0.75% and employer contributes 3.25%.
                  How to Avail: Automatically deducted and managed by the employer.`
    },
    {
        category: "Statutory Benefits",
        name: "Labour Welfare Fund",
        description: "Provides various welfare benefits including pensions and maternity benefits.",
        details: `Contribution: INR 50 per month.
                  How to Avail: Automatically deducted and managed by the employer.`
    },
    {
        category: "Statutory Benefits",
        name: "Statutory Leaves",
        description: "Various types of statutory leaves.",
        details: `Types of Leaves:
                  - Sick Leave (12 days)
                  - Casual Leave (12 days)
                  - Privilege/Earned Leave (12 days)
                  - National and Regional Holidays (10 days)
                  - Bereavement Leave (2 days)
                  - Maternity Leave (26 weeks)
                  - Paternity Leave (3 days)
                  How to Avail: Through leave application process in the employee portal.`
    },
    {
        category: "Statutory Benefits",
        name: "Gratuity",
        description: "A lump sum payment to employees who have served for at least 5 years.",
        details: `Calculation: (Last drawn Basic + DA) * 15/26 * Number of years of service.
                  How to Avail: Automatically processed upon eligibility.`
    },
    {
        category: "Tax-saving Benefits",
        name: "Meal and Fuel Cards",
        description: "Tax-free benefits under the old tax regime.",
        details: `Providers: Happay and Sodexo.
                  Options:
                  - Meal Cards: Rs. 1000, Rs. 2200, Rs. 3000/month
                  - Fuel Cards: Rs. 900 (two-wheeler), Rs. 1800 (small car), Rs. 2400 (large car)
                  How to Avail: Register quarterly; employee must own the vehicle for fuel card.`
    },
    {
        category: "Tax-saving Benefits",
        name: "Leave Travel Allowance (LTA)",
        description: "Tax exemptions for travel expenses during leave.",
        details: `Eligibility: Exemptions up to 10% of basic salary; domestic travel only.
                  How to Avail: Submit proofs of travel expenses.`
    },
    {
        category: "Tax-saving Benefits",
        name: "Mobile/Internet Allowance",
        description: "Tax exemption for employees using mobile/internet for work.",
        details: `Eligibility: Employee must have the connection in their name.
                  How to Avail: Submit monthly claims up to Rs. 1500.`
    },
    {
        category: "Tax-saving Benefits",
        name: "National Pension Scheme (NPS)",
        description: "A voluntary retirement saving scheme.",
        details: `Contribution: Employer can contribute up to 10% of annual basic pay.
                  How to Avail: Register through HDFC or provide existing NPS account details.`
    },
    {
        category: "Other Benefits",
        name: "Group Medical Insurance (GMC)",
        description: "Covers hospitalization expenses.",
        details: `Coverage: Employee, spouse, and three children.
                  How to Avail: E-cards available on MediAssist portal.`
    },
    {
        category: "Other Benefits",
        name: "Voluntary Parents Policy",
        description: "Additional coverage for parents and in-laws.",
        details: `Coverage: Sum insured between 2 lakhs to 2.5 lakhs.
                  How to Avail: Opt-in during joining month or policy renewal.`
    },
    {
        category: "Other Benefits",
        name: "Bereavement Support Policy",
        description: "Financial support for the family of a deceased employee.",
        details: `Eligibility: Excludes suicide cases.
                  How to Avail: Nominee form filled during onboarding.`
    },
    {
        category: "Other Benefits",
        name: "Earned Leave Encashment",
        description: "Encashment of up to 20 leaves per year.",
        details: `Eligibility: Employees who have completed 3 years of service.
                  How to Avail: Through leave encashment application.`
    },
    {
        category: "Other Benefits",
        name: "Paternity Leaves",
        description: "3 days of paid leave.",
        details: `Eligibility: Up to 2 childbirths during the service.
                  How to Avail: Through leave application process.`
    },
    {
        category: "Other Benefits",
        name: "Work from Home Facility",
        description: "Flexible work arrangement.",
        details: `Eligibility: Approved on request.
                  How to Avail: Through work from home request.`
    },
    {
        category: "Other Benefits",
        name: "Flexible Working Arrangements",
        description: "Flexible work hours depending on the project.",
        details: `How to Avail: Through discussion with project manager.`
    },
    {
        category: "Other Benefits",
        name: "Salary Advance/Loans",
        description: "Financial assistance for emergencies.",
        details: `How to Avail: Through salary advance or loan request.`
    },
    {
        category: "Other Benefits",
        name: "Employee Stock Option Plan (ESOP)",
        description: "Shares in the company offered to employees.",
        details: `How to Avail: Through ESOP registration process.`
    },
    {
        category: "Other Benefits",
        name: "Wellness Sessions",
        description: "Monthly wellness sessions for employees.",
        details: `How to Avail: Participation in scheduled sessions.`
    },
    {
        category: "Other Benefits",
        name: "Team Workcations",
        description: "Team outings for collaboration and relaxation.",
        details: `How to Avail: Through team leader.`
    },
    {
        category: "Other Benefits",
        name: "Relocation Allowance",
        description: "Financial support for relocating employees.",
        details: `How to Avail: Through relocation request.`
    },
    {
        category: "Other Benefits",
        name: "Joining Bonus",
        description: "Bonus offered to new employees.",
        details: `How to Avail: Automatically provided upon joining.`
    },
    {
        category: "Other Benefits",
        name: "Loyalty Awards",
        description: "Rewards for long-term service.",
        details: `How to Avail: Automatically provided based on service duration.`
    },
    {
        category: "Other Benefits",
        name: "Annual Gifts",
        description: "Yearly gifts for employees.",
        details: `How to Avail: Distributed annually.`
    }
];

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
