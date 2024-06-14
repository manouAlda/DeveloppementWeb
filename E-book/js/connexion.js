document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("defautOuvert").click();
});

function ouvrirTab(evt, tabName) {
    var i, tabcontenu;

    tabcontenu = document.getElementsByClassName("tabcontenu");
    for (i = 0; i < tabcontenu.length; i++) {
        tabcontenu[i].style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
}
