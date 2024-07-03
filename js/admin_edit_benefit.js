// const params = new URLSearchParams(window.location.search);
// let id = params.get('id');
let id = 'epf'
//Initialize Quill editor
var quill = new Quill('#editor-container', {
    theme: 'snow'
});
var benefitData = benefits.find(item => item.id === id);

// to populate the texboxes and inputs
document.addEventListener('DOMContentLoaded', () => {
    const beneftiName = document.getElementById('benefit-name')
    const description = document.getElementById('description')
    const faqQuestion = document.getElementById('faq-question')
    const faqAnswer = document.getElementById('faq-answer')

    beneftiName.value = benefitData.name
    description.value = benefitData.description
    quill.root.innerHTML = benefitData.content
    showFaqs();
});

function showFaqs(){
    const faqContainer = document.getElementById("faqs-container")
    let faqHtmlData = '';
    benefitData.faqs.forEach((items)=>{
        faqHtmlData += `<div class="faq">
                            <label>Question:</label>
                            <input type="text" name="faq-question" class="form-control faq-question" required value="${items.question}">
                            <label>Answer:</label>
                            <textarea name="faq-answer"  class="faq-answer" required>${items.answer}</textarea>
                            <button type="button" class="remove-faq btn btn-outline-danger">Remove FAQ</button>
                        </div>`;
    })
    faqContainer.innerHTML = faqHtmlData;
    addEventListenersToButtons();
}

//need some modifications
function addEventListenersToButtons(){
    document.querySelectorAll('.remove-faq').forEach((button, indexOfFaq) => {
        button.addEventListener('click', function(event) {
            // const faqId = this.getAttribute('data-id');
            // document.getElementById(`faq-${faqId}`).remove();
            event.target.closest(".faq").remove();
            benefitData.faqs.splice(indexOfFaq, 1)
            console.log(benefitData.faqs)
        });
    });
}

function addFaqs(){
    var numberOfFaq = document.getElementsByClassName("faq").length;
    faqContainer.innerHTML = `<div class="faq" id="faq-${numberOfFaq + 1}">
                                <label>Question:</label>
                                <input type="text" name="faq-question" class="form-control" id="faq-question${numberOfFaq + 1}" required value="${items.question}">
                                <label>Answer:</label>
                                <textarea name="faq-answer" id="faq-answer${idCount}" required>${items.answer}</textarea>
                                <button type="button" class="remove-faq btn btn-outline-danger" data-id="${idCount}">Remove FAQ</button>
                            </div>`
}


