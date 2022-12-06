// smoothen transition animation for mobile application
// reference: www.w3school.com
function smoothTransition() {
    window.scrollTo({
    top: 1000,
    behavior: 'smooth'
    });
}
// drop shawdow of the pet photo element
const dropShadow = document.getElementById('pet_avatar');


dropShadow.style.boxShadow = '10px 10px 5px 0px rgba(0,0,0,0.75)';

if (myDiv) {
    myDiv.style.boxShadow = '10px 10px 5px 0px rgba(0,0,0,0.75)';
  }