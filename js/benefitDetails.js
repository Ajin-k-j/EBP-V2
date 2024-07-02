//Initialize Quill editor
// document.addEventListener("DOMContentLoaded", function() {
//     var quill = new Quill('#editor-container', {
//       theme: 'snow'
//     });

//   // Get the display content button and output div
//   var displayContentBtn = document.getElementById('display-content-btn');
//   var outputDiv = document.getElementById('output');

//   // Add click event listener to the button
//   displayContentBtn.addEventListener('click', function() {
//     // Get the HTML content from the editor
//     var content = quill.root.innerHTML;
//     console.log(content);
//     // Display the content in the output div
//     outputDiv.innerHTML = content;
//   });

// });
console.log("hello ok ane");
document.addEventListener("DOMContentLoaded", () => {
  const benefitsMenu = document.getElementById('benefit-menu');
  const benefitTitle = document.getElementById('benefit-title');
  const description = document.getElementById('description');
  const benefitContent = document.getElementById('benefit-content');
  const faqContainer = document.getElementById('accordionContainer');

  // Populate the menu
  benefits.forEach(benefit => {
      const menuItem = document.createElement('li');
      menuItem.classList.add('nav-item', 'navItem');
      menuItem.innerHTML = `<a class="nav-link" href="?id=${benefit.id}">${benefit.name}</a>`;
      benefitsMenu.appendChild(menuItem);
  });

  // Function to display benefit details
  function displayBenefitDetails(benefitId) {
      const benefit = benefits.find(b => b.id === benefitId);
      if (benefit) {
          const categoryId = benefit.categoryId;
          const category = getCategoryById(categoryId);
          if (category) {
            const banner = document.querySelector('.leftNavBanner');
            const iconElement = banner.querySelector('i');
            const nameElement = banner.querySelector('h1');
    
            // Update icon class and name
            iconElement.className = category.icon;
            nameElement.textContent = category.name;
          } else {
              console.error(`Category with id ${categoryId} not found.`);
          }

          benefitTitle.textContent = benefit.name;
          description.textContent = benefit.content;
          benefitContent.innerHTML = benefit.content;
          

          // Clear and populate FAQs
          faqContainer.innerHTML = '';
          benefit.faqs.forEach((faq, index) => {
              const faqItem = document.createElement('div');
              faqItem.classList.add('accordion-item');
              faqItem.innerHTML = `
                  <h2 class="accordion-header" id="heading${index}">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                          ${faq.question}
                      </button>
                  </h2>
                  <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                          ${faq.answer}
                      </div>
                  </div>
              `;
              faqContainer.appendChild(faqItem);
          });
      }
  }

  // Function to get the benefit ID from the URL
  function getBenefitIdFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
  }

  // Get benefit ID from URL and display corresponding details
  const benefitId = getBenefitIdFromURL();
  if (benefitId) {
      displayBenefitDetails(benefitId);
  } else if (benefits.length > 0) {
      displayBenefitDetails(benefits[0].id);
  }
});

// Function to get category details by categoryId
function getCategoryById(categoryId) {
  return categories.find(category => category.id === categoryId);
}




// window.onload = function () {
//   function loadBenefitDetails(benefitId) {
//     const benefitDetailsContainer = document.getElementById('benefit-details');
//     const faqAccordion = document.getElementById('faq-accordion');

//     firestore.collection('benefits').doc(benefitId).get().then(doc => {
//       if (!doc.exists) {
//         console.error('No such document!');
//         return;
//       }

//       const benefit = doc.data();
//       benefitDetailsContainer.innerHTML = `
//         <h1>${benefit.name}</h1>
//         <i class="${benefit.icon}"></i>
//         <div>${benefit.content}</div>
//       `;

//       faqAccordion.innerHTML = benefit.faqs.map((faq, index) => `
//         <div class="accordion-item">
//           <h2 class="accordion-header" id="heading${index}">
//             <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
//               ${faq.question}
//             </button>
//           </h2>
//           <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#faq-accordion">
//             <div class="accordion-body">
//               ${faq.answer}
//             </div>
//           </div>
//         </div>
//       `).join('');
//     }).catch(error => {
//       console.error('Error fetching benefit details:', error);
//     });
//   }
// };