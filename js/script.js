// Initialize Materialize components
$(document).ready(function(){
    $('.parallax').parallax();
    $('.modal').modal();
    $('.sidenav').sidenav();
    $('.slider').slider({fullWidth: true});
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });
});

// Function to toggle the info modal
function toggleModal() {
    var modal = $('#modal3');
    var instance = M.Modal.getInstance(modal);
    instance.open();
    return false; // Prevent default link behavior
}
