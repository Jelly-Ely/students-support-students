/* ==================================================
   STUDENTS SUPPORT STUDENTS
   Resources Page Search
================================================== */

const resourceSearch = document.querySelector("#resource-search");
const resourceItems = document.querySelectorAll(".resource-search-item");
const resourceSections = document.querySelectorAll(".resource-section");
const featuredSection = document.querySelector(".featured-resources");
const emptySection = document.querySelector("#resource-empty-section");

function updateResourceSearch() {
    if (!resourceSearch) return;

    const searchTerm = resourceSearch.value.toLowerCase().trim();
    let totalVisible = 0;

    resourceItems.forEach((item) => {
        const searchableText = item.dataset.search || "";
        const matchesSearch = searchableText.includes(searchTerm);

        item.classList.toggle("resource-hidden", !matchesSearch);

        if (matchesSearch) {
            totalVisible++;
        }
    });

    resourceSections.forEach((section) => {
        const visibleItems = section.querySelectorAll(
            ".resource-search-item:not(.resource-hidden)"
        );

        section.classList.toggle(
            "resource-section-hidden",
            visibleItems.length === 0
        );
    });

    if (featuredSection) {
        const visibleFeaturedItems = featuredSection.querySelectorAll(
            ".resource-search-item:not(.resource-hidden)"
        );

        featuredSection.classList.toggle(
            "resource-section-hidden",
            searchTerm !== "" && visibleFeaturedItems.length === 0
        );
    }

    if (emptySection) {
        emptySection.classList.toggle(
            "visible",
            searchTerm !== "" && totalVisible === 0
        );
    }
}

if (resourceSearch) {
    resourceSearch.addEventListener("input", updateResourceSearch);
}