const radioButtons = document.getElementsByClassName("radio-button");
const initialToggledRB = document.querySelector(".radio-button.toggled");
const firstPageTemplate = document.getElementsByTagName("template")[0];
const secondPageTemplate = document.getElementsByTagName("template")[1];
const skillsGrid = document.getElementById("skills-grid");
const title = document.querySelector("#skills-description h1");
const sentence = document.querySelector("#skills-description p");

const descriptions = [
  `I call these markup and programming languages as my primary weapons
because these are usually my go to weapons for development. HTML and
CSS for front-end, JavaScript for web app interaction as well as for
asyncronous API requests. C for low level craziness, Python for lazy
developer mode and some magical stuff, and PHP for backend.`,
  `Throughout my experience as a developer, I have experimented with a wide range of frameworks, libraries, and databases. Some of these tools were employed in the course of school projects and activities, while others were explored purely out of curiosity. Regardless of their origin, each of these resources has proven invaluable in helping me start new projects quickly and efficiently, without the need to create everything from scratch.`,
];

let previousToggledRB = initialToggledRB;
for (let button of radioButtons) {
  button.parentNode.addEventListener("click", (event) => {
    if (event.target.children[0] !== previousToggledRB) {
      event.target.children[0].classList.toggle("toggled");
      previousToggledRB.classList.toggle("toggled");
      previousToggledRB = event.target.children[0];
    }

    if (previousToggledRB === radioButtons[0]) {
      skillsGrid.removeChild(skillsGrid.children[0]);
      skillsGrid.insertBefore(
        firstPageTemplate.content.cloneNode(true),
        skillsGrid.children[0]
      );
      title.innerHTML = "My Primary <span>weapons</span>";
      sentence.textContent = descriptions[0];
    } else if (previousToggledRB === radioButtons[1]) {
      skillsGrid.removeChild(skillsGrid.children[0]);
      skillsGrid.insertBefore(
        secondPageTemplate.content.cloneNode(true),
        skillsGrid.children[0]
      );
      title.innerHTML = "My Secondary <span>weapons</span>";
      sentence.textContent = descriptions[1];
    }
  });
}
