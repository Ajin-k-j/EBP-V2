document.addEventListener("DOMContentLoaded", () => {
  // Get benefit ID from URL and display corresponding details
  const benefitId: string | null = getBenefitIdFromURL();

  if (benefitId) {
    // Display benefit details
    displayBenefitDetails(benefitId);
    // Populate nav banner
    populateNavbanner(benefitId);
    // Populate the menu
    populateMenu(benefitId);
  }
});

// Function to get the benefit ID from the URL
function getBenefitIdFromURL(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Get benefit by benefit id
function getBenefitById(benefitId: string): Benefit | undefined {
  return benefits.find((b) => b.id === benefitId);
}

// Get category details by categoryId
function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((category) => category.id === categoryId);
}

// Populate nav banner
function populateNavbanner(benefitId: string) {
  const benefit: Benefit | undefined = getBenefitById(benefitId);
  if (benefit) {
    const category: Category | undefined = getCategoryById(benefit.categoryId);
    if (category) {
      const banner: HTMLElement | null =
        document.querySelector(".leftNavBanner");
      const iconElement: HTMLElement | null | undefined =
        banner?.querySelector("i");
      const nameElement: HTMLElement | null | undefined =
        banner?.querySelector("h1");
      // Update icon class and name
      if (iconElement) {
        iconElement.className = category.icon;
      }
      if (nameElement) {
        nameElement.textContent = category.name;
      }
    } else {
      console.error(
        `Category with id ${getBenefitById(benefitId)?.categoryId} not found.`
      );
    }
  }
}

// Populate the menu
function populateMenu(benefitId: string) {
  const benefitsMenu: HTMLElement | null =
    document.getElementById("benefit-menu");
  benefits.forEach((benefit) => {
    if (benefit.categoryId === getBenefitById(benefitId)?.categoryId) {
      const menuItem: HTMLElement = document.createElement("li");
      menuItem.classList.add("nav-item", "navItem");
      if (benefit.id === benefitId) {
        menuItem.innerHTML = `<a class="nav-link leftNavActive" href="?id=${benefit.id}">${benefit.name}</a>`;
      } else {
        menuItem.innerHTML = `<a class="nav-link" href="?id=${benefit.id}">${benefit.name}</a>`;
      }
      benefitsMenu?.appendChild(menuItem);
    }
  });
}

// Function to display benefit details
function displayBenefitDetails(benefitId: string) {
  const benefitTitle: HTMLElement | null =
    document.getElementById("benefit-title");
  const description: HTMLElement | null =
    document.getElementById("description");
  const benefitContent: HTMLElement | null =
    document.getElementById("benefit-content");
  const faqContainer: HTMLElement | null =
    document.getElementById("accordionContainer");
  const benefit: Benefit | undefined = getBenefitById(benefitId);
  if (benefit) {
    if (benefitTitle && description && benefitContent) {
      benefitTitle.textContent = benefit.name;
      description.textContent = benefit.description;
      benefitContent.innerHTML = benefit.content;
    }

    // Clear and populate FAQs
    if (faqContainer) {
      faqContainer.innerHTML = "";
    }
    benefit.faqs.forEach((faq, index) => {
      const faqItem: HTMLElement = document.createElement("div");
      faqItem.classList.add("accordion-item");
      faqItem.innerHTML = `
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                        ${faq.question}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionContainer">
                    <div class="accordion-body">
                        ${faq.answer}
                    </div>
                </div>
            `;
      faqContainer?.appendChild(faqItem);
    });
  }
}
