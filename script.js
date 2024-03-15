document.addEventListener("DOMContentLoaded", function() {
    const calculateBtn = document.getElementById('calculate');
    const distanceInput = document.getElementById('distance');
    const modeSelect = document.getElementById('mode');
    const resultDiv = document.getElementById('result');
  
    calculateBtn.addEventListener('click', function() {
      const distance = parseFloat(distanceInput.value);
      const mode = modeSelect.value;
  
      if (!distance || distance <= 0) {
        resultDiv.textContent = "Please enter a valid distance.";
        return;
      }
  
      let emissions = 0;
  
      // Emission factors in grams of CO2e per passenger-kilometer
      const emissionFactors = {
        driving: 120,   // Example: Medium-sized petrol car with average occupancy
        transit: 60,    // Example: Public transit (bus or train) with average occupancy
        biking: 0,      // Biking is assumed to have no direct emissions
        walking: 0      // Walking is also assumed to have no direct emissions
      };
  
      // Additional factors for driving emissions (fuel type, vehicle efficiency, etc.)
      const drivingFactors = {
        petrol: 2.3,    // Emission factor in kg CO2 per liter of petrol
        diesel: 2.7     // Emission factor in kg CO2 per liter of diesel
      };
  
      // Additional factors for public transit emissions (electricity source, occupancy rates, etc.)
      const transitFactors = {
        electricity: 0.05,  // Emission factor in kg CO2 per kWh of electricity
        occupancy: 0.8       // Average occupancy rate for public transit vehicles
      };
  
      // Calculate emissions based on mode of transportation
      if (emissionFactors.hasOwnProperty(mode)) {
        if (mode === 'driving') {
          const fuelType = document.getElementById('fuel').value;
          const fuelEfficiency = parseFloat(document.getElementById('efficiency').value);
  
          if (fuelType === 'petrol') {
            emissions = (distance / fuelEfficiency) * drivingFactors.petrol * 1000; // Convert liters to milliliters
          } else if (fuelType === 'diesel') {
            emissions = (distance / fuelEfficiency) * drivingFactors.diesel * 1000; // Convert liters to milliliters
          } else {
            resultDiv.textContent = "Please select a valid fuel type for driving.";
            return;
          }
        } else if (mode === 'transit') {
          const electricitySource = document.getElementById('electricity').value;
          const occupancyRate = transitFactors.occupancy;
  
          emissions = (distance / occupancyRate) * emissionFactors[mode] * 1000; // Convert grams to milligrams
  
          // Adjust emissions based on electricity source for electric transit
          if (electricitySource === 'renewable') {
            emissions *= transitFactors.electricity; // Apply emission factor for renewable electricity
          }
        } else {
          emissions = distance * emissionFactors[mode];
        }
      } else {
        resultDiv.textContent = "Please select a valid mode of transportation.";
        return;
      }
  
      resultDiv.textContent = `Your ${mode} trip has emitted ${emissions.toFixed(2)} kg of CO2e.`;
    });
  });
  