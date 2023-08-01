$(document).ready(function() {
    $("#registrationForm").submit(function(event) {
        event.preventDefault();

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const image = $("#image")[0].files[0];

        if (!name) {
            alert("Please enter your name.");
            return;
        }

        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!image) {
            alert("Please select an image.");
            return;
        }


        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("image", image);

        $.ajax({
            url: "/register",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                alert("Registration successful!");
                $("#registrationForm")[0].reset();
            },
            error: function(err) {
                console.error("Error during registration:", err);
                alert("Registration failed!");
            }
        });
    });
});
