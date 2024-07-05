const params = new URLSearchParams(window.location.search);
let id = params.get('id');
//for testing 
// let id = 'epf'
//Initialize Quill editor
var quill = new Quill('#editor-container', {
    theme: 'snow'
});

// to populate the texboxes and inputs
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('category').setAttribute("value",id);
    document.getElementById('category').setAttribute("placeholder",id);

    iconSearchFunction();
    deleteFunctionToButtons();
    addFaqs();
    dropdownFunctions();
    
});

document.getElementById('benefit-form').addEventListener('submit', function(event) {
    const benefitName = document.getElementById('benefit-name').value;
    const icon = document.getElementById('icon-search').value;
    const description = document.getElementById('description').value;
    const categoryId = document.getElementById('category').value;
    
    const content = quill.root.innerHTML;

    // Collect FAQs
    const faqs = [];
    document.querySelectorAll('.faq').forEach((faqElement) => {
        const question = faqElement.querySelector('input[name="faq-question"]').value;
        const answer = faqElement.querySelector('textarea[name="faq-answer"]').value;
        faqs.push({ question: question, answer: answer });
    });

    // Create a benefit object
    const benefit = {
        name: benefitName,
        icon: icon,
        description: description,
        content: content,
        faqs: faqs,
        categoryId: categoryId,
        views: 0
    };
    alert(JSON.stringify(benefit, null, 2));
    console.log(benefit);
});

//need some modifications
function deleteFunctionToButtons(){
    document.querySelectorAll('.remove-faq').forEach((button) => {
        button.addEventListener('click', function(event) {
            event.target.closest(".faq").remove();
        });
    });
}
//to add faqs 
function addFaqs(){
    const addFaqButton = document.getElementById("add-faq")
    const faqContainer = document.getElementById("faqs-container")
    addFaqButton.addEventListener("click",()=>{
        let newFaq = `<div class="faq border border-danger p-3 rounded-2 mb-2">
                        <div class="mb-3 row">
                            <label class="col-sm-2">Question:</label>
                            <div class="col-sm-10">
                                <input type="text" name="faq-question" class="form-control" required placeholder="Add the FAQ question...">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2">Answer:</label>
                            <div class="col-sm-10">
                                <textarea name="faq-answer" class="rounded" placeholder="Add the FAQ answer..." required></textarea>
                            </div>
                        </div>
                        <button type="button" class="remove-faq btn btn-outline-danger">Remove FAQ</button>
                    </div>`
        faqContainer.insertAdjacentHTML("beforeend", newFaq)
        deleteFunctionToButtons();
    })
    
}
//to search icons
function iconSearchFunction(){
    const iconSearch = document.getElementById('icon-search');
    const iconRecommendations = document.getElementById('icon-recommendations');

    iconSearch.addEventListener('input', () => {
        const searchTerm = iconSearch.value.toLowerCase();
        iconRecommendations.innerHTML = '';

        if (searchTerm.length > 0) {
            const filteredIcons = icons.filter(icon => icon.toLowerCase().includes(searchTerm));
            filteredIcons.forEach(icon => {
                const iconItem = document.createElement('div');
                iconItem.className = 'icon-item icon-container';
                iconItem.innerHTML = `<i class="${icon}"></i> ${icon}`;
                iconItem.addEventListener('click', () => {
                    iconSearch.value = icon;
                    iconRecommendations.innerHTML = '';
                });
                iconRecommendations.appendChild(iconItem);
            });
        }
    });

    document.addEventListener('click', (event) => {
        if (!iconSearch.contains(event.target) && !iconRecommendations.contains(event.target)) {
            iconRecommendations.innerHTML = '';
        }
    });
}
