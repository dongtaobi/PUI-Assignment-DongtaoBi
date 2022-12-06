function toggleDetails() {
       // Get the details element
       let details = document.getElementById("details")
       // If the details are currently hidden, show them
       if (details.style.display === "none") {
         details.style.display = "block";
   }
       // Otherwise, hide them
       else {
         details.style.display = "none";
   }
}

// Get the icon element
let icon = document.querySelector("#details");
console.log(icon);
// Attach a click event listener to the icon
icon.addEventListener("click", function() {
  // Call the function when the icon is clicked
  toggleDetails();
  console.log("details expanded");
});