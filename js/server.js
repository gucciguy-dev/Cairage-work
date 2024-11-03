// Replace 'YourAppId' and 'YourRestApiKey' with your actual keys from Back4App
const appId = 'CfC2H5Fp68i7WURBgOJSOKxRLmDX9T5kJW8UEJjX';
const apiKey = 'TnvPvp2qpkmW8t72Km94YmBpASSFNOAercGT8fSw';
const serverUrl = 'https://parseapi.back4app.com';

console.log("Initializing Parse with App ID:", appId);
console.log("Server URL:", serverUrl);
Parse.initialize(appId, apiKey);
Parse.serverURL = serverUrl;
console.log("Parse initialized successfully.");

async function loadCarMakes() {
  try {
      const query = new Parse.Query("Car_Model_List");
      query.select("Make"); // Only select the 'Make' column
      query.limit(1000); // Set the maximum number of results per query
      let allMakes = [];
      let skip = 0;

      // Fetch all makes in batches
      while (true) {
          query.skip(skip); // Skip the number of results fetched so far
          const results = await query.find();
          if (results.length === 0) break; // Exit loop if no more results

          // Get unique makes from current batch
          const makes = results.map(result => result.get('Make'));
          allMakes = allMakes.concat(makes); // Add to allMakes array
          skip += results.length; // Update the skip value
      }

      // Remove duplicates and sort
      const uniqueMakes = [...new Set(allMakes)].sort();
      const makeSelect = document.getElementById('carMake');
      makeSelect.innerHTML = ''; // Clear previous options

      uniqueMakes.forEach(make => {
          const option = document.createElement('option');
          option.value = make;
          option.textContent = make;
          makeSelect.appendChild(option);
      });

      console.log("Car Makes Loaded:", uniqueMakes); // Log the loaded makes
  } catch (error) {
      console.error("Error while fetching makes:", error);
  }
}

async function loadCarModels(selectedMake) {
  try {
      const query = new Parse.Query("Car_Model_List");
      query.equalTo("Make", selectedMake); // Filter by selected make
      const results = await query.find();

      // Log results for debugging
      console.log(`Models for ${selectedMake}:`, results);

      const modelSelect = document.getElementById('model-select');
      modelSelect.innerHTML = ''; // Clear existing options

      const uniqueModels = new Set(); // Use a Set to avoid duplicates

      results.forEach(car => {
          const modelName = car.get('Model'); // Assuming 'Model' is the column name
          if (modelName) { // Check if modelName is not null or undefined
              uniqueModels.add(modelName); // Add to the Set
          }
      });

      // Add unique models to the select element
      uniqueModels.forEach(modelName => {
          const option = document.createElement('option');
          option.value = modelName;
          option.textContent = modelName;
          modelSelect.appendChild(option);
      });
  } catch (error) {
      console.error('Error while fetching models:', error);
  }
}


// Event listener for make selection change
document.getElementById('carMake').addEventListener('change', (event) => {
  const selectedMake = event.target.value;
  loadCarModels(selectedMake);
});

// Call to load makes on page load
document.addEventListener('DOMContentLoaded', () => {
  loadCarMakes(); // Ensure this is called on page load
});
