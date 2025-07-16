// Sample category data
const categories = [
  {
    name: 'Tops',
    count: 120,
    image: 'pexels-j-meza-photography-20715718-14693901'
  },
  {
    name: 'Bottoms',
    count: 85,
    image: 'https://source.unsplash.com/400x300/?jeans'
  },
  {
    name: 'Dresses',
    count: 60,
    image: 'https://source.unsplash.com/400x300/?dress'
  },
  {
    name: 'Outerwear',
    count: 45,
    image: 'https://source.unsplash.com/400x300/?jacket'
  },
  {
    name: 'Accessories',
    count: 50,
    image: 'https://source.unsplash.com/400x300/?accessories'
  },
  {
    name: 'Footwear',
    count: 72,
    image: 'https://source.unsplash.com/400x300/?shoes'
  }
];

// Inject cards into the DOM
const grid = document.getElementById('categories-grid');

categories.forEach(cat => {
  const card = document.createElement('a');
  card.className = 'category-card';
  card.href = `#${cat.name.toLowerCase()}`;
  card.innerHTML = `
    <img src="${cat.image}" alt="${cat.name}" class="category-image" />
    <div class="category-info">
      <h3 class="category-name">${cat.name}</h3>
      <p class="category-count">${cat.count} items</p>
    </div>
  `;
  grid.appendChild(card);
});
