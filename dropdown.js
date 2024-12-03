// JavaScript to toggle the dropdown visibility
document.querySelector('.projects-dropdown-toggle > a').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default action (page reload)
    const parentLi = event.target.parentNode;
    parentLi.classList.toggle('active-dropdown');
});
