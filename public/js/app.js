$("#scrapeESPN").on("click", function() {
    $.get("/scrape", refresh);
});




function refresh() {
    setTimeout(function() {
        window.location.href = "/";
    }, 1000);
}