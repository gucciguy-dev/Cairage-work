const car = document.getElementById('car');
const icons = document.querySelectorAll('.info-icon');

// Areas of the car corresponding to mod suggestions
const areas = [
    { id: 'hood-popup', bounds: { x: [0.07, 0.3], y: [0.25, 0.55] }, icon: 'hood-icon' },
    { id: 'roof-popup', bounds: { x: [0.7, 0.98], y: [0.2, 0.3] }, icon: 'roof-icon' },
    { id: 'front-wheel-popup', bounds: { x: [0.2, 0.6], y: [0.55, 0.85] }, icon: 'front-wheel-icon' },
    { id: 'rear-wheel-popup', bounds: { x: [0.65, 0.98], y: [0.5, 0.99] }, icon: 'rear-wheel-icon' },
];

// Function to show the correct popup
function showPopup(areaId) {
    areas.forEach(area => {
        document.getElementById(area.id).style.display = area.id === areaId ? 'block' : 'none';
    });
}

// Function to hide all popups
function hidePopups() {
    areas.forEach(area => {
        document.getElementById(area.id).style.display = 'none';
    });
}

// Add mousemove event to the car image
car.addEventListener('mousemove', function (e) {
    const rect = car.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    let popupShown = false;
    areas.forEach(area => {
        if (x >= area.bounds.x[0] && x <= area.bounds.x[1] && y >= area.bounds.y[0] && y <= area.bounds.y[1]) {
            showPopup(area.id);
            popupShown = true;
        }
    });

    if (!popupShown) hidePopups();
});

// Add hover events to the icons
icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        const area = areas.find(area => area.icon === icon.id);
        if (area) showPopup(area.id);
    });

    icon.addEventListener('mouseleave', hidePopups);
});

// Hide popups when the mouse leaves the car image
car.addEventListener('mouseleave', hidePopups);


window.addEventListener('load', () => {
  const carName = localStorage.getItem('carName');
  const carImage = localStorage.getItem('carImage');
  const horsepower = localStorage.getItem('horsepower');
  const speed = localStorage.getItem('speed');
  const mpg = localStorage.getItem('mpg');
  const tankSize = localStorage.getItem('tankSize');
  const wheel = localStorage.getItem('wheel');
  const mileage = localStorage.getItem('mileage');
  const engine = localStorage.getItem('engine');
  // Update your HTML elements with this data
  document.querySelector('.car-name').textContent = carName;
  document.querySelector('.car-outline').src = carImage;
  document.querySelector('.car-horsepower').textContent = `Horsepower: ${horsepower} hp`;
  document.querySelector('.car-speed').textContent = `Top speed: ${speed} mph`;
  document.querySelector('.car-mpg').textContent = `Miles/gallon: ${mpg} mpg`;
  document.querySelector('.tank-size').textContent = `Gas tank capacity: ${tankSize} gallons`;
  document.querySelector('.wheel').textContent = `Wheel size: ${wheel} inches`;
  document.querySelector('.miles').textContent = `Current mileage: ${mileage} miles`;
  document.querySelector('.engine').textContent = `Engine configuration: ${engine}`;
  // You can also update other elements with the random values if needed
});
