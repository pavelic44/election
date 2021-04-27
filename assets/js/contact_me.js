$(function () {

    var form = document.getElementById("contactForm");

    async function handleSubmit(event) {
        event.preventDefault();
        var data = new FormData(event.target);
        var firstName = $("input#name").val();

        fetch("https://formspree.io/f/xvodgeeq", {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                $("#success").html("<div class='alert alert-success'>");
                $("#success > .alert-success")
                    .html(
                        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                    )
                    .append("</button>");
                $("#success > .alert-success").append(
                    "<strong>Your message has been sent. </strong>"
                );
                $("#success > .alert-success").append("</div>");
                //clear all fields
                $("#contactForm").trigger("reset");
            } else {
                $("#success").html("<div class='alert alert-danger'>");
                $("#success > .alert-danger")
                    .html(
                        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                    )
                    .append("</button>");
                $("#success > .alert-danger").append(
                    $("<strong>").text(
                        "Sorry " +
                        firstName +
                        ", it seems that my mail server is not responding. Please try again later!"
                    )
                );
                $("#success > .alert-danger").append("</div>");
                //clear all fields
                $("#contactForm").trigger("reset");
            }
        }).catch(error => {
            // Fail message
            $("#success").html("<div class='alert alert-danger'>");
            $("#success > .alert-danger")
                .html(
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                )
                .append("</button>");
            $("#success > .alert-danger").append(
                $("<strong>").text(
                    "Sorry " +
                    firstName +
                    ", it seems that my mail server is not responding. Please try again later!"
                )
            );
            $("#success > .alert-danger").append("</div>");
            //clear all fields
            $("#contactForm").trigger("reset");
        });
    }

    $("#contactForm input,#contactForm textarea")
        .not('[type=submit]')
        .jqBootstrapValidation({
            preventSubmit: true,
            submitError: function ($form, event, errors) {

            },
            submitSuccess: function ($form, event) {
                handleSubmit(event);
            },
            filter: function () {
                return $(this).is(":visible");
            },
        });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
