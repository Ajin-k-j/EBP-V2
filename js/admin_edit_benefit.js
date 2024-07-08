import { db } from './firebase/firebaseConfig.js';
import { fetchData, benefits } from './firebase/firebaseData.js';
import { collection,where, addDoc, query, orderBy, limit, getDocs,getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
let id = params.get('id');
//for testing 
// let id = '2';
//Initialize Quill editor
var quill = new Quill('#editor-container', {
    theme: 'snow'
});

// to populate the texboxes and inputs
document.addEventListener('DOMContentLoaded', async () => {
    const loadingAnimation = document.getElementById('loading-animation');
    // Show loading animation initially
    loadingAnimation.style.display = 'flex';

    //fetching data
    await fetchData();

    // Hide loading animation after everything is loaded
    loadingAnimation.style.display = 'none';

    const form = document.getElementById('benefit-form');
    var benefitData = benefits.find(item => item.id === parseInt(id,10));
    // displaying the benefit data in the form
    const beneftiName = document.getElementById('benefit-name')
    const description = document.getElementById('description')
    const button = document.getElementById('dropdownButton');
    beneftiName.value = benefitData.name
    description.value = benefitData.description
    button.textContent = benefitData.categoryId
    quill.root.innerHTML = benefitData.content

    iconSearchFunction();
    if(benefitData.faqs){
        showFaqs(benefitData);
        deleteFunctionToButtons();
    }
    addFaqs();
    dropdownFunctions();
    form.addEventListener('submit', submitEdits);
});

//to show the faqs of the benefit in hand
function showFaqs(benefitData){
    const faqContainer = document.getElementById("faqs-container")
    let faqHtmlData = '';
    benefitData.faqs.forEach((items)=>{
        faqHtmlData = `<div class="faq border border-danger rounded p-3 mb-3">
                            <label>Question:</label>
                            <input type="text" name="faq-question" class="form-control faq-question" required value="${items.question}">
                            <label>Answer:</label>
                            <textarea name="faq-answer"  class="faq-answer rounded" required>${items.answer}</textarea>
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
        let newFaq =    `<div class="faq"">
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
//dropdown category menu functionality
function dropdownFunctions(){
    document.querySelectorAll('.dropdown-item').forEach(function(item) {
        item.addEventListener('click', function(event) {
            const button = document.getElementById('dropdownButton');
            button.textContent = event.target.textContent;
        });
    });
}
//to update the data into the database once the submit button is pressed
async function  submitEdits(event){
    event.preventDefault();
    let faqArray = pushFaqToDb();
    const q = query(collection(db, "benefits"), where("id", "==", parseInt(id,10)));
    try {
        // Get query snapshot
        const querySnapshot = await getDocs(q);
        // Update the document if it exists
        querySnapshot.forEach(async (doc) => {
            await setDoc(doc.ref, {
                name: document.getElementById('benefit-name').value,
                icon: document.getElementById('icon-search').value,
                description: document.getElementById('description').value,
                content: quill.root.innerHTML,
                categoryId : document.getElementById('dropdownButton').textContent,
                faqs : faqArray
            }, { merge: true }); // Use merge option to merge new data with existing document
        });
        console.log("Document updated successfully!");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}
//function to add faq data into the object to be updated into database
function pushFaqToDb(){
    let faqArray = [];
    const faqElements = document.querySelectorAll('.faq');
    faqElements.forEach(faqElement => {
        const question = faqElement.querySelector('input[name="faq-question"]').value;
        const answer = faqElement.querySelector('textarea[name="faq-answer"]').value;
        faqArray.push({ question, answer });
    });
  return faqArray;
}



