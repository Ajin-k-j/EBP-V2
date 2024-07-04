const categoriesForm = document.getElementById('categoriesForm');

categoriesForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const categoryId = categoriesForm['categoryId'].value;
  const categoryName = categoriesForm['categoryName'].value;
  const categoryIcon = categoriesForm['categoryIcon'].value;
  const categoryDescription = categoriesForm['categoryDescription'].value;

  try {
    // Add category to Firestore
    const categoriesRef = db.collection('categories');
    await categoriesRef.doc(categoryId).set({
      id: categoryId,
      name: categoryName,
      icon: categoryIcon,
      description: categoryDescription
    });

    alert('Category added successfully!');
    categoriesForm.reset();
  } catch (error) {
    console.error('Error adding category: ', error);
    alert('Error adding category. Check console for details.');
  }
});
