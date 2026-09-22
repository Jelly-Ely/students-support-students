/* ==================================================
   TEAM PAGE
================================================== */

const searchInput = document.querySelector("#mentor-search");
const filter = document.querySelector("#mentor-filter");

const mentorCards = document.querySelectorAll(".mentor-card");

const emptyMessage = document.querySelector(
    "#team-empty-message"
);

function filterMentors() {

    const search =
        searchInput.value.toLowerCase().trim();

    const selected =
        filter.value.toLowerCase();

    let visibleCards = 0;

    mentorCards.forEach(card => {

        const name =
            card.dataset.name;

        const school =
            card.dataset.school;

        const major =
            card.dataset.major;

        const tags =
            card.dataset.tags;

        const matchesSearch =
            name.includes(search) ||
            school.includes(search) ||
            major.includes(search) ||
            tags.includes(search);

        const matchesFilter =
            selected === "all" ||
            tags.includes(selected);

        if (matchesSearch && matchesFilter) {

            card.style.display = "block";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });

    if (visibleCards === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

}

searchInput.addEventListener(
    "input",
    filterMentors
);

filter.addEventListener(
    "change",
    filterMentors
);
