let Navbar = document.querySelector('.navbar');
let Fabars = document.querySelector('.fa-bars');


Fabars.onclick = () =>{
    Navbar.classList.toggle("active")
};



$(document).ready(function () {
    $('input[type="text"], input[type="email"], textarea').focus(function () {
        var background = $(this).attr('id');
        $('#' + background + '-form').addClass('formgroup-active');
        $('#' + background + '-form').removeClass('formgroup-error');
    });

    $('input[type="text"], input[type="email"], textarea').blur(function () {
        var background = $(this).attr('id');
        $('#' + background + '-form').removeClass('formgroup-active');
    });

    function errorfield(field) {
        $(field).addClass('formgroup-error');
    }

    $("#waterform").submit(function (event) {
        event.preventDefault(); // Prevent the form submission

        var valid = true;

        // Validate the name field
        if ($('#name').val() == "") {
            errorfield('#name-form');
            valid = false;
        }

        // Validate the email field using a regular expression
        var emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if ($('#email').val() == "" || !emailFormat.test($('#email').val())) {
            errorfield('#email-form');
            valid = false;
        }

        // Validate the message field
        if ($('#message').val() == "") {
            errorfield('#message-form');
            valid = false;
        }

        if (valid) {
            // All entries are correct
            alert('Your message has been sent. Thank you for contacting us!');
            // Clear the form fields
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        } else {
            // Display an error message
            alert('Please fill in all required fields and provide a valid email address.');
        }
    });

    // This part is for the button click
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function (event) {
        // Prevent the default button behavior
        event.preventDefault();

        // Trigger form submission
        $("#waterform").submit();
    });
});
