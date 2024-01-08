// Grid-container elem lekérése a HTML-ből
const container = document.getElementById('grid-container');

// Számokat tartalmazó tömb létrehozása 1-től 12-ig
const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

// Üres tömb a kattintott számok nyomon követésére
let clickedNumbers = [];

// Számok véletlenszerű összekeverése
for (let i = 0; i < 12; i++) {
  let pos1 = Math.floor(Math.random() * 12);
  let pos2 = Math.floor(Math.random() * 12);
  let temp = numbers[pos1];
  numbers[pos1] = numbers[pos2];
  numbers[pos2] = temp;
}

// Egyéb változók az időzítőhöz
let startTime;
let endTime;
let timerInterval;
let elapsedTime = 0;

// Idő mutató elem létrehozása
const timerDisplay = document.createElement('div');
timerDisplay.classList.add('timer');

// Az időzítő elem hozzáadása a body elejére az első kattintás után
let timerAdded = false;

// Minden számhoz létrehozunk egy dobozt és hozzáadjuk a grid-container-hez
for (let i = 0; i < 12; i++) {
  const box = createBox(numbers[i]);
  container.appendChild(box);
}

// Dobozelem létrehozása a megadott számmal
function createBox(number) {
  const box = document.createElement('div');
  box.classList.add('box');
  box.innerHTML = number;

  // Eseménykezelő hozzáadása: ha a dobozra kattintanak
  box.addEventListener('click', function () {
    // Ellenőrizzük, hogy a kattintott szám helyes sorrendben van-e
    if (parseInt(box.innerHTML) === clickedNumbers.length + 1) {
      if (!startTime && !timerAdded) {
        startTime = new Date().getTime(); // Az első kattintás időpontja
        document.body.insertBefore(timerDisplay, document.body.firstChild);
        timerAdded = true;
        timerInterval = setInterval(updateTimer, 100); // Időzítő létrehozása tizedes pontossággal
      }

      clickedNumbers.push(parseInt(box.innerHTML));
      box.style.visibility = 'hidden'; // A doboz elrejtése

      // Ha minden számot megfelelő sorrendben kattintottak meg
      if (clickedNumbers.length === numbers.length) {
        clearInterval(timerInterval); // Időzítő leállítása
        endTime = new Date().getTime(); // Az utolsó kattintás időpontja
        elapsedTime = (endTime - startTime) / 1000; // Eltelt idő másodpercekben

        alert(`Gratulálok! Nyertél!\nAz eltelt idő: ${elapsedTime.toFixed(1)} másodperc`);
        location.reload(); // Oldal újratöltése
      }
    } else {
      alert('Rossz sorrend! Próbáld újra!');
      location.reload(); // Ha rossz sorrendben kattintottak, az oldal újratöltése
    }
  });

  return box; // A dobozelem visszaadása
}

function updateTimer() {
  const currentTime = new Date().getTime(); // Jelenlegi időpont
  elapsedTime = (currentTime - startTime) / 1000; // Eltelt idő másodpercekben
  timerDisplay.textContent = `Eltelt idő: ${elapsedTime.toFixed(1)} másodperc`;
}
