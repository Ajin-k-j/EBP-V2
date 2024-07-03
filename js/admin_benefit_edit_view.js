// benefits.sort((a, b) => b.views - a.views);

// const popularBenefitsContainer = document.getElementById("popular-benefits");

// // Generate and insert benefit cards
// benefits.forEach((benefit) => {
//   const card = document.createElement("div");
//   card.className = "benefit-card";
//   card.innerHTML = `
//         <i class="${benefit.icon} fa-2x"></i>
//         <h5>${benefit.name}</h5>
//       `;
//   card.onclick = () => {
//     window.location.href = `/templates/admin/edit_benefit_form.html?id=${benefit.id}`;
//   };
//   popularBenefitsContainer.appendChild(card);
// });


// benefits.sort((a, b) => b.views - a.views);

// const popularBenefitsContainer = document.getElementById("popular-benefits");

// // Generate and insert benefit cards
// benefits.forEach((benefit) => {
//   const cardLink = document.createElement("a");
//   cardLink.href = `./benefitDetails.html?id=${benefit.id}`;

//   const card = document.createElement("div");
//   card.className = "benefit-card card";
//   card.innerHTML = `
//     <i class="fas ${benefit.icon} fa-2x"></i>
//     <h5>${benefit.name}</h5>
//   `;

//   cardLink.appendChild(card);
//   popularBenefitsContainer.appendChild(cardLink);
// });

// const params = new URLSearchParams(window.location.search);
// let id = params.get('id');
let id = 'statutory-benefits';
document.addEventListener('DOMContentLoaded', () => {
    const categoryData = categories.find(item => item.id === id);
    const categoryOtherData = categories.filter(item => item.id !== id);

//displaying names of catagory in the heading
    $(".headingBox h1").text(categoryData.name)
    $(".sideHeadingBox:eq(0)").html(categoryOtherData[0].name)
    $(".sideHeadingBox:eq(0)").attr("href", `./benefit.html?id=${categoryOtherData[0].id}`)
    $(".sideHeadingBox:eq(1)").html(categoryOtherData[1].name)
    $(".sideHeadingBox:eq(1)").attr("href", `./benefit.html?id=${categoryOtherData[1].id}`)
    createBenefitBox();
})

//function to create the benefit boxes
function createBenefitBox() {
    const linkContainer = document.getElementsByClassName('popular-benefits');
    let htmlDataBenefit = ''
    let myBenefits = benefits.sort((a, b) => b.views - a.views);
    myBenefits.forEach(item =>{
        if(item.categoryId === id){
            htmlDataBenefit += `<a href="./benefitDetails.html?id=${item.id}">
                                    <div class="benefit-card card">
                                        <i class="fas ${item.icon} fa-2x"></i>
                                        <h5>${item.name}</h5>
                                    </div>
                                </a>`
        }
    })
    linkContainer[0].innerHTML = htmlDataBenefit;
}

