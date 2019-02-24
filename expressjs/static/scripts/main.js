$(document).ready(() => {
    $(".delete-user").on("click", deleteUser);
});

function deleteUser() {
    const confirmation = confirm("Are you sure?");

    if (confirmation) {
        /* make ajax request to delete route */
        $.ajax({
            type: "DELETE",
            /* $(this) because we want the one that was clicked */
            url: "/users/delete/"+$(this).data("id"),
        }).done((res) => {
            window.location.replace("/");
        });
        /* somehow, the first redirect does not work */
        window.location.replace("/");
    } else {
        return false;
    }
}
