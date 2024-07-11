// Event listener for window onload
window.onload = () => {
    const loadingAnimation = document.getElementById('loading-animation') as HTMLElement;
  
    // Show loading animation initially
    loadingAnimation.style.display = 'flex';
  
    // Hide loading animation after everything is loaded
    loadingAnimation.style.display = 'none';
  
    // Initialize benefits display after hiding loading animation
    initBenefitsDisplay(benefits);
    const searchButton: HTMLElement | null = document.getElementById('searchButton');
    if (searchButton) {
      searchButton.addEventListener('click', performSearch);
}
  };
  
  // Function to sort benefits by views in descending order
  function sortBenefitsByViews(benefits: { views: number; icon: string; name: string; id: string }[]): { views: number; icon: string; name: string; id: string }[] {
    return benefits.sort((a, b) => b.views - a.views);
  }
  
  // Function to get the top N benefits
  function getTopBenefits(benefits: { views: number; icon: string; name: string; id: string }[], count: number): { views: number; icon: string; name: string; id: string }[] {
    return benefits.slice(0, count);
  }
  
  // Function to update HTML elements with benefit values and IDs
  function updateBenefitCards(container: HTMLElement, benefits: { icon: string, name: string, id: string }[]) {
    const benefitCards = container.querySelectorAll('.benefit-card') as NodeListOf<HTMLAnchorElement>;
  
    benefits.forEach((benefit, index) => {
      const card = benefitCards[index];
      if (card) {
        const icon = card.querySelector('.icon') as HTMLElement;
        const title = card.querySelector('h5') as HTMLElement;
  
        if (icon) {
          icon.className = benefit.icon + ' icon';//space is important here
        }
  
        if (title) {
          title.textContent = benefit.name;
        }
  
        // Set href with benefitDetails.html and ID
        card.href = `benefitDetails.html?id=${benefit.id}`;
      }
    });
  }
  
  // Function to initialize the benefits display
  function initBenefitsDisplay(benefits: { views: number, icon: string, name: string, id: string }[]) {
    const popularBenefitsContainers = document.querySelectorAll('.popular-benefits') as NodeListOf<HTMLElement>;
  
    // Sort benefits by views and get the top 8
    const sortedBenefits: { views: number; icon: string; name: string; id: string }[] = sortBenefitsByViews(benefits);
    const top8Benefits: { views: number; icon: string; name: string; id: string }[] = getTopBenefits(sortedBenefits, 8);
  
    // Update each container with the top 8 benefits
    popularBenefitsContainers.forEach(container => {
      updateBenefitCards(container, top8Benefits);
    });
  }
  
  const searchInput = document.getElementById('benefit-search') as HTMLInputElement;
  const recommendations = document.getElementById('recommendations') as HTMLElement;
  
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    recommendations.innerHTML = '';
    if (query) {
      const filteredBenefits = benefits.filter(benefit => benefit.name.toLowerCase().includes(query));
      filteredBenefits.forEach(benefit => {
        const div = document.createElement('div');
        div.className = 'ecommendation-item';
        div.textContent = benefit.name;
        div.addEventListener('click', () => {
          searchInput.value = benefit.name;
          recommendations.innerHTML = '';
        });
        recommendations.appendChild(div);
      });
    }
  });
  
  function performSearch() {
    const query = searchInput.value.toLowerCase();
    const result = benefits.find(benefit => benefit.name.toLowerCase() === query);
    if (result) {
      window.location.href = `benefitDetails.html?id=${result.id}`;
    } else {
      alert('Benefit not found.');
    }
  }