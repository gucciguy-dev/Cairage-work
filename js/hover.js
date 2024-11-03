// Select all elements with the class 'card' and loop through them
document.querySelectorAll('.card').forEach(card => {
    
  // Add a 'mousemove' event listener to each card
  card.addEventListener('mousemove', function(e) {
      
      // Get the card's bounding box (position and size relative to the viewport)
      const rect = card.getBoundingClientRect();
      
      // Calculate the mouse's x and y position relative to the card
      const x = e.clientX - rect.left; // e.clientX gives the horizontal position of the mouse
      const y = e.clientY - rect.top;  // e.clientY gives the vertical position of the mouse

      // Update the CSS custom properties (--mouse-x and --mouse-y) with the mouse position
      // This will adjust the position of the radial gradient
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
  });
});