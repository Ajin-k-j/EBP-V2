const params = new URLSearchParams(window.location.search);
let id = params.get('id');

//setting link for delete benefit button
document.getElementById('deleteBenefit').setAttribute("href",`delete_benefit_form.html?id=${id}`);

document.addEventListener('DOMContentLoaded', () => {
    const categoryData = categories.find(item => item.id === id);
    const categoryOtherData = categories.filter(item => item.id !== id);

//displaying names of catagory in the heading
    $(".headingBox h1").text(categoryData.name)
    $(".sideHeadingBox:eq(0)").html(categoryOtherData[0].name)
    $(".sideHeadingBox:eq(0)").attr("href", `admin_benefit_edit_view.html?id=${categoryOtherData[0].id}`)
    $(".sideHeadingBox:eq(1)").html(categoryOtherData[1].name)
    $(".sideHeadingBox:eq(1)").attr("href", `admin_benefit_edit_view.html?id=${categoryOtherData[1].id}`)
    createBenefitBox();
})

//function to create the benefit boxes
function createBenefitBox() {
    const linkContainer = document.getElementsByClassName('popular-benefits');
    let htmlDataBenefit = ''
    let myBenefits = benefits.sort((a, b) => b.views - a.views);
    myBenefits.forEach(item =>{
        if(item.categoryId === id){
            htmlDataBenefit += `<a href="./admin_edit_benefit.html?id=${item.id}">
                                    <div class="benefit-card card">
                                        <i class="fas ${item.icon} fa-2x"></i>
                                        <h5>${item.name}</h5>
                                    </div>
                                </a>`
        }
    })
    linkContainer[0].innerHTML = htmlDataBenefit;
}