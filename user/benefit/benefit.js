import { fetchData, categories, benefits } from "/firebase/firebaseData.js";

const params = new URLSearchParams(window.location.search);
let id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  const loadingAnimation = document.getElementById("loading-animation");
  // Show loading animation initially
  loadingAnimation.style.display = "flex";
  // Fetch data from Firestore
  await fetchData();
  let myBenefits = benefits.sort((a, b) => b.views - a.views);
  const categoryData = categories.find((item) => item.id === id);
  const categoryOtherData = categories.filter((item) => item.id !== id);

  // Displaying names of category in the heading
  // document.querySelector(".headingBox h1").textContent = categoryData.name;
  // document.querySelector(".step:nth-of-type(1)").textContent =
  //   categoryOtherData[0].name;
  // document
  //   .querySelector(".step:nth-of-type(1)")
  //   .setAttribute(
  //     "href",
  //     `/user/benefit/benefit.html?id=${categoryOtherData[0].id}`
  //   );
  // document.querySelector(".step:nth-of-type(2)").textContent =
  //   categoryOtherData[1].name;
  // document
  //   .querySelector(".step:nth-of-type(2)")
  //   .setAttribute(
  //     "href",
  //     `/user/benefit/benefit.html?id=${categoryOtherData[1].id}`
  //   );

  // Hide loading animation after everything is loaded
  loadingAnimation.style.display = "none";

  createBenefitBox();
  howerOnHeading(myBenefits);
});

// Function to create the benefit boxes
function createBenefitBox() {
  const linkContainer = document.querySelectorAll(".popular-benefits");
  let htmlDataBenefit = "";
  let myBenefits = benefits.sort((a, b) => b.views - a.views);

  myBenefits.forEach((item) => {
    if (item.categoryId === id) {
      htmlDataBenefit += `
                <a href="/user/benefitDetails/benefitDetails.html?id=${item.id}">
                    <div class="benefit-card card">
                        <i class="fas ${item.icon} fa-2x"></i>
                        <h5>${item.name}</h5>
                    </div>
                </a>`;
    }
  });
  linkContainer[0].innerHTML = htmlDataBenefit;
}
// function to update the page when howering on a specific category and to go back to the current page when mouse leaves
function howerOnHeading(myBenefits){
  const headingElement = document.querySelectorAll('.step');
  headingElement.forEach(step =>{
    step.addEventListener('mouseover',()=>{
      const href = step.getAttribute('href');
      const categoryLinkId = href.split('=').pop();
      const linkContainer = document.querySelectorAll(".popular-benefits");
      let htmlDataBenefit = "";
      myBenefits.forEach((item) => {
        if (item.categoryId === categoryLinkId) {
          htmlDataBenefit += `
                    <a href="/user/benefitDetails/benefitDetails.html?id=${item.id}">
                        <div class="benefit-card card">
                            <i class="fas ${item.icon} fa-2x"></i>
                            <h5>${item.name}</h5>
                        </div>
                    </a>`;
        }
      })
      linkContainer[0].innerHTML = htmlDataBenefit;
    })
    step.addEventListener('mouseleave',createBenefitBox);
  })
}
