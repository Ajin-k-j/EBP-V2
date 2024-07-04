const params = new URLSearchParams(window.location.search);
let id = params.get('id');
// let id = 'epf'
//Initialize Quill editor
var quill = new Quill('#editor-container', {
    theme: 'snow'
});
var benefitData = benefits.find(item => item.id === id);

// to populate the texboxes and inputs
document.addEventListener('DOMContentLoaded', () => {
    const beneftiName = document.getElementById('benefit-name')
    const description = document.getElementById('description')
    beneftiName.value = benefitData.name
    description.value = benefitData.description
    quill.root.innerHTML = benefitData.content

    iconSearchFunction();
    showFaqs();
    deleteFunctionToButtons();
    addFaqs();
});
//to show the faqs of the benefit in hand
function showFaqs(){
    const faqContainer = document.getElementById("faqs-container")
    let faqHtmlData = '';
    benefitData.faqs.forEach((items)=>{
        faqHtmlData = `<div class="faq">
                            <label>Question:</label>
                            <input type="text" name="faq-question" class="form-control faq-question" required value="${items.question}">
                            <label>Answer:</label>
                            <textarea name="faq-answer"  class="faq-answer" required>${items.answer}</textarea>
                            <button type="button" class="remove-faq btn btn-outline-danger">Remove FAQ</button>
                        </div>`;
        faqContainer.insertAdjacentHTML('beforeend', faqHtmlData);
    })
}

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
        let newFaq = `<div class="faq"">
                            <label>Question:</label>
                            <input type="text" name="faq-question" class="form-control" required placeholder="Add the FAQ question...">
                            <label>Answer:</label>
                            <textarea name="faq-answer" placeholder="Add the FAQ answer..." required></textarea>
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


