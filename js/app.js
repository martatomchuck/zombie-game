const board = document.querySelector(".board");
const crosshair = document.querySelector(".crosshair");
const scoreEl = document.querySelector(".score");


// Naliczanie punktacji
let score = 0;

function addScore(points) {
    score += points;
    scoreEl.innerText = score.toString().padStart(5, "0");
}


// Ustawienie celownika na kursor myszy
document.addEventListener("mousemove", function(e) {
    crosshair.style.left = e.pageX + "px";
    crosshair.style.top = e.pageY + "px";
});

// Mnożenie zombiaków
setInterval(function() {
    const div = document.createElement("div");
    div.classList.add("zombie");

    // Ustawienie zombie na różnychc pozycjach
    const min = 10;
    const max = 200;
    const position = Math.floor(Math.random()*(max-min+1)+min);
    div.style.bottom = position + "px";

    div.style.zIndex = max - position;

    // Ustawienie różnej prędkości
    {
        const min = 1.5;
        const max = 5;
        const time = Math.floor(Math.random()*(max-min+1)+min);
        div.style.animationDuration = `0.5s, ${time}s`
    }

    // Zróżnicowanie wielkości zombiaków
    {
        const min = 1;
        const max = 3;
        const size = Math.floor(Math.random()*(max-min+1)+min);
        const scale = 1 + size / 10;
        div.style.transform = `scale(${scale})`;
    }

    // Naprawa bug'a: kumulacja zombiaków po zmianie zakładki (następuje zatrzymanie animacji, zombiaki tworzą się w zaświatach a potem wychodzą wszystkie na raz)
    const zombies = board.querySelectorAll(".zombie");
    for (const el of zombies) {
        el.offsetLeft = el.offsetLeft;
    }

    // Usuwanie zombie po zakończeniu animacji
    div.addEventListener("animationend", function() {
        this.remove();
    })

    // Usuwanie po kliknięciu
    div.addEventListener("mousedown", function() {
        this.remove();
        addScore(15);
    })

    board.appendChild(div);
}, 500);

