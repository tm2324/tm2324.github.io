const col1 = document.getElementById('col1');
const col2 = document.getElementById('col2');
const style = window.getComputedStyle(document.body);

function getPath() {
  var folder = (window.location.pathname.split('./')[0]);
  return window.location.hostname + folder;
}

//console.log(getPath())
const TM = "TypeMedia2324"

// Generate vibrant random color
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 90;
  const lightness = 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// People data
const people = [
  { name: "Ando", full: "Anne-Dauphine Borione", project: "Dargon", svg: "svg/ando.svg", color: style.getPropertyValue('--Ando') },
  { name: "Betsy", full: "Betsy Schuster", project: "Antiphony", svg: "svg/betsy.svg", color: style.getPropertyValue('--Betsy') },
  { name: "Fabio", full: "Fabio Pop", project: "Normavaganza", svg: "svg/fabio.svg", color: style.getPropertyValue('--Fabio') },
  { name: "Hanna", full: "Hanna Boslau", project: "Kompas", svg: "svg/hanna.svg", color: style.getPropertyValue('--Hanna') },
  { name: "Miha", full: "Mihael Šandro", project: "Ritko", svg: "svg/miha.svg", color: style.getPropertyValue('--Miha') },
  { name: "Nina", full: "Nina Faulhaber", project: "Drape", svg: "svg/nina.svg", color: style.getPropertyValue('--Nina') },
  { name: "Zhenya", full: "Zhenya Spizhovyi", project: "Bibubator", svg: "svg/zhenya.svg", color: style.getPropertyValue('--Zhenya') },
  { name: "Ben", full: "Benjamin Rouzaud", project: "Skeed", svg: "svg/ben.svg", color: style.getPropertyValue('--Ben') },
  { name: "Ceci", full: "Cecilia del Castillo Daza", project: "Ánima", svg: "svg/ceci.svg", color: style.getPropertyValue('--Ceci') },
  { name: "Felix", full: "Felix Bamforth", project: "Aerograf", svg: "svg/felix.svg", color: style.getPropertyValue('--Felix') },
  { name: "Max", full: "Max Holl", project: "Magsine", svg: "svg/max.svg", color: style.getPropertyValue('--Max') },
  { name: "Mint", full: "Mint Tantisuwanna", project: "Pristine", svg: "svg/mint.svg", color: style.getPropertyValue('--Mint') },
  { name: "Pauline", full: "Pauline Fourest", project: "Disway", svg: "svg/pauline.svg", color: style.getPropertyValue('--Pauline') },
  // { name: "TM", full: "Type and Media", project: "", svg: "svg/TM.svg", color: style.getPropertyValue('--TM') }
  { name: "TM", full: "Type and Media", project: "About", color: style.getPropertyValue('--TM') }
];


svg = `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><line x1="15" y1="15" x2="35" y2="35"></line><line x1="15" y1="35" x2="35" y2="15"></line></svg>`;

// the next couple of lines prevent transitions on doc load
const body = document.querySelector('body');
body.classList.add('preload');
window.addEventListener('load', function() {
  body.classList.remove('preload');
});

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 2; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function gray(i){
  maxWhite = 250;
  mod = 3;
  delta = 10;
  grayValue = maxWhite - (i % mod)*delta;
  
  return grayValue;
}

// Populate boxes dynamically
function populate() {
  shuffle(people);

  col1.innerHTML = '';
  col2.innerHTML = '';

  people.forEach((person, index) => {
    const box = document.createElement('div');
    const img = document.createElement('img');

    box.className = 'box';
    box.setAttribute('data-name', person.name);
    box.setAttribute('data-color', person.color);

    img.alt = person.name;

    // do SVGs and the black overfill unless it's for TM, the last member of people
    if(index != people.length-1) {
      // black fill fix
      img.src = person.svg;
      img.classList.add("black");
      box.appendChild(img);
    }
    else{
      const TMbox = document.createElement('div');
      TMbox.style.transform = 'translateY(8px)';
      box.appendChild(TMbox)
      // TMbox.innerText = person.name;
      // TMbox.className = "TMvar";

      TMbox.style.minWidth = "75%";
      TMbox.style.maxWidth = "80%";

      const animation = lottie.loadAnimation({
        container: TMbox,
        renderer: 'svg',
        autoplay: false,
        // loop: true, // in case of looping, duh
        loop: false,
        // path: '/assets/TMloop.json' // looping thing
        path: './assets/TMtoggle.json' // toggling thing
      });

      // LOOP if we want to LOOP it instead
      // TMbox.addEventListener('mouseenter', () => {
      //   animation.play(); // start from beginning
      // });
      // // 4. Optionally stop/reset when hover ends
      // TMbox.addEventListener('mouseleave', () => {
      //   animation.pause(); // stops at current frame
      //   // or reset to start: animation.goToAndStop(0, true);
      // });

      // TOGGLE
      let isToggled = false;
      animation.setSpeed(3);

      // On hover in
      box.addEventListener('mouseenter', () => {
        if (!isToggled) {
          animation.setDirection(1);
          animation.play();
          isToggled = true;
        } else {
          animation.setDirection(-1);
          animation.play();
          isToggled = false;
        }
      });

      // On hover out
      box.addEventListener('mouseleave', () => {
        if (!isToggled) {
          animation.setDirection(1);
          animation.play();
          isToggled = true;
        } else {
          animation.setDirection(-1);
          animation.play();
          isToggled = false;
        }
      });

    }

    // random gray bg
    currGray = `rgb(${gray(index)},${gray(index)},${gray(index)})`
    box.style.backgroundColor = currGray;
    box.setAttribute('data-gray', currGray);
    
    if (index % 2 === 0) {
      col1.appendChild(box);
    } else {
      col2.appendChild(box);
    }
  });
}

// Reset everything
function resetAll() {
  const allBoxes = document.querySelectorAll('.box');

  allBoxes.forEach((box, index) => {
    box.classList.remove('expanded-box');
    currGray = box.getAttribute('data-gray');

    // random gray bg
    box.style.backgroundColor = currGray;
    

    box.querySelectorAll('.caption, .read-more').forEach(el => {
      el.classList.remove('fade-in');
      setTimeout(() => el.remove(), 400);
    });

  });

  col1.classList.remove('expanded-column');
  col2.classList.remove('expanded-column');
}

// Attach event listeners
function attachListeners() {
  const boxes = document.querySelectorAll('.box');

  boxes.forEach((box, index) => {
    const person = box.getAttribute('data-name');
    const personColor = box.getAttribute('data-color');
    const currGray = box.getAttribute('data-gray');

    box.addEventListener('click', () => {
      const parentCol = box.parentElement;
      const isExpanded = box.classList.contains('expanded-box');

      resetAll();

      if (!isExpanded) {
        box.classList.add('expanded-box');
        parentCol.classList.add('expanded-column');

        // own color
        box.style.backgroundColor = personColor;

        const personData = people.find(p => p.name === person);

        const project = document.createElement('div');
        project.className = 'caption top left';
        project.innerHTML = `<em>${personData.project}</em><br>${personData.full}`;

        const closeButton = document.createElement('div');
        closeButton.className = 'caption top right';

        // closeButton.innerHTML = svg;
        closeButton.innerHTML = `<span class="X">×</span>`;

        const button = document.createElement('a');
        button.className = 'caption see-more btm left';
        personName = person.toLowerCase().replace(/\s+/g, '');

        projectName = personData.project;
        
        if (projectName == "Ánima") {
          projectName = "anima";
        } else {
          projectName = projectName.toLowerCase();
        }

        if (person != TM) {
          box.appendChild(project);
          box.appendChild(closeButton);
          button.href = `${personName}/${projectName}.html`;
          button.textContent = '→ See more';
          box.appendChild(button);
        } else {
          button.href = "tm/tm-page.html";
          button.textContent = '→ About the year';
          box.appendChild(button);
        }

        setTimeout(() => {
          project.classList.add('fade-in');
          closeButton.classList.add('fade-in');
          button.classList.add('fade-in');
        }, 10);
      }
    });

    box.addEventListener("mouseenter", function( event ) {
      const isExpanded = box.classList.contains('expanded-box');
        box.style.backgroundColor = personColor;
   });

    box.addEventListener("mouseleave", function( event ) {
      const isExpanded = box.classList.contains('expanded-box');

      box.style.backgroundColor = currGray;
      
      if(isExpanded){
        box.style.backgroundColor = personColor;
      }
    });
  });

}

// Initialize
populate();
attachListeners();
