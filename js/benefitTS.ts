let id: string | null = new URLSearchParams(window.location.search).get("id");

document.addEventListener("DOMContentLoaded", () => {
  const categoryData = categories.find((item) => item.id === id);
  const categoryOtherData = categories.filter((item) => item.id !== id);

  // displaying names of category in the heading
  let headingBoxH1: HTMLElement | null =
    document.querySelector(".headingBox h1");
  if (headingBoxH1) {
    headingBoxH1.textContent = categoryData.name;
  }
  let sideHeadingBoxes: NodeListOf<HTMLAnchorElement> =
    document.querySelectorAll(".sideHeadingBox");
  if (sideHeadingBoxes.length > 0) {
    sideHeadingBoxes[0].textContent = categoryOtherData[0].name;
    sideHeadingBoxes[0].href = `/benefit.html?id=${categoryOtherData[0].id}`;
  }
  if (sideHeadingBoxes.length > 1) {
    sideHeadingBoxes[1].textContent = categoryOtherData[1].name;
    sideHeadingBoxes[1].href = `/benefit.html?id=${categoryOtherData[1].id}`;
  }
  createBenefitBox();
});

// function to create the benefit boxes
function createBenefitBox() {
  const linkContainer: HTMLElement[] = Array.from(
    document.getElementsByClassName("popular-benefits")
  ) as HTMLElement[];
  let htmlDataBenefit: string = "";
  let myBenefits = benefits.sort((a, b) => b.views - a.views);
  myBenefits.forEach((item) => {
    if (item.categoryId === id) {
      htmlDataBenefit += `<a href="./benefitDetails.html?id=${item.id}">
                              <div class="benefit-card card">
                                <i class="fas ${item.icon} fa-2x"></i>
                                <h5>${item.name}</h5>
                              </div>
                            </a>`;
    }
  });
  linkContainer[0].innerHTML = htmlDataBenefit;
}
