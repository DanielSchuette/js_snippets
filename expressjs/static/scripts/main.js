$(document).ready(() => {
    $(".delete-user").on("click", deleteUser);
});

function deleteUser() {
    const confirmation = confirm("Are you sure?");

    if (confirmation) {
        /* make ajax request to delete route */
        $.ajax({
            type: "DELETE",
            url: "/users/delete/"+$(".delete-user").data("id"),
        }).done((res) => {
            window.location.replace("/");
        });
    } else {
        return false;
    }
}
