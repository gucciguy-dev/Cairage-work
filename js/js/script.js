document.getElementById('addCarBtn').addEventListener('click', () => {
    const make = document.getElementById('carMake').value;
    const model = document.getElementById('model-select').value;
    const imageInput = document.getElementById('carImage');

    if (make && model && imageInput.files.length > 0) {
        const imageFile = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const carCard = document.createElement('div');
            carCard.className = 'car-card card';
            carCard.innerHTML = `
                <div class="card-content">
                    <a href="Car.html" class="car-link">
                        <img src="${e.target.result}" alt="${model}" class="car-image">
                        <h2 class="car-name">${make} ${model}</h2>
                    </a>
                    <div class="car-info">
                        <h3>Performance mod checklist</h3>
                        <ul id="checklist">
                            <li><input type="checkbox" id="item1"> Cold air intake</li>
                            <li><input type="checkbox" id="item2"> Aftermarket suspension</li>
                            <li><input type="checkbox" id="item3"> Aftermarket exhaust</li>
                            <li><input type="checkbox" id="item4"> Performance cams</li>
                            <li><input type="checkbox" id="item5"> Performance brakes</li>
                            <li><input type="checkbox" id="item6"> Tune</li>
                        </ul>
                    </div>
                </div>
            `;
            // Append the new car card to your card container
            document.getElementById('card-container').appendChild(carCard);
        };
        reader.readAsDataURL(imageFile); // Read the image file
    }
});

document.querySelectorAll('.car-link').forEach(link => {
  link.addEventListener('click', (event) => {
      // Prevent default link behavior
      event.preventDefault();

      // Find the parent card to access car details
      const card = link.closest('.car-card');
      const carName = card.querySelector('.car-name').textContent;
      const carImage = card.querySelector('.car-image').src;

      // Set random values for other properties
      const horsepower = Math.floor(Math.random() * 100) + 150;
      const speed = Math.floor(Math.random() * 100) + 80;
      const mpg = Math.floor(Math.random() * (45 - 20) + 20); // No decimals
      const tankSize = (Math.random() * (16 - 11) + 11).toFixed(1); // One decimal
      const wheel = Math.floor(Math.random() * (19 - 15 + 1) + 15); // No decimals
      const mileage = Math.floor(Math.random() * (350000 - 5000 + 1) + 5000);
      const engines = ['inline-4', 'v-6', 'inline-6', 'inline-5', 'v-8'];
      const engine = engines[Math.floor(Math.random() * engines.length)];      

      // Save details to localStorage
      localStorage.setItem('carName', carName);
      localStorage.setItem('carImage', carImage);
      localStorage.setItem('horsepower', horsepower);
      localStorage.setItem('speed', speed);
      localStorage.setItem('mpg', mpg);
      localStorage.setItem('tankSize', tankSize);
      localStorage.setItem('wheel', wheel);
      localStorage.setItem('mileage', mileage);
      localStorage.setItem('engine', engine);

      // Redirect to the second page
      window.location.href = link.href; // Use the href of the clicked link
  });
});




