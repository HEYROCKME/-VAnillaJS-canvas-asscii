const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const image1 = new Image();
image1.src = "../img/ALWN1426.JPG";
image1.height = window.innerWidth * 0.5;
image1.width = image1.height * 1.333;

const inputSlider = document.getElementById("resolution");
const inputLabel = document.getElementById("res-lab");

inputSlider.addEventListener("change", () => handleSlider());

class Cell {
  constructor(x, y, symbol, color) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillText(this.symbol, this.x, this.y);
  }
}

class AsciiFX {
  #imageCellArr = [];
  #symbols = [];
  #pixels = [];
  #ctx;
  #width;
  #height;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;

    this.#ctx.drawImage(image1, 0, 0, this.#width, this.#height);
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
    console.log(this.#pixels);
  }

  #convertToSymbol(g) {
    if (g > 250) return "!";
    else if (g > 240) return "*";
    else if (g > 220) return "^";
    else if (g > 200) return "$";
    else if (g > 180) return "£";
    else if (g > 160) return ".";
    else if (g > 140) return "_";
    else if (g > 120) return "?";
    else if (g > 100) return "+";
    else if (g > 80) return "~";
    else if (g > 60) return "$";
    else if (g > 40) return "µ";
    else if (g > 20) return ",";
    else return "";
  }
  #scanImage(cellSize) {
    this.#imageCellArr = [];

    // Fist loop maps thru y(height) coordinates
    for (let y = 0; y < this.#pixels.height; y += cellSize) {
      // On each Y coordiante loop thru related X cordiantes
      for (let x = 0; x < this.#pixels.width; x += cellSize) {
        const posX = x * 4; // 4 because of single pixel(RGBA)
        const posY = y * 4; // pixel(RGBA)
        const pos = posY * this.#pixels.width + posX; //all completed Rows

        if (this.#pixels.data[pos + 3] > 128) {
          const red = this.#pixels.data[pos];
          const green = this.#pixels.data[pos + 1];
          const blue = this.#pixels.data[pos + 2];
          const total = red + green + blue;
          const averageColorValue = total / 3;
          const color = `rgb(${red}, ${green}, ${blue} )`;
          const symbol = this.#convertToSymbol(averageColorValue);

          this.#imageCellArr.push(new Cell(x, y, symbol, color));
        }
      }
    }

    console.log(this.#imageCellArr);
  }

  #drawASCII() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    this.#imageCellArr.forEach((cell) => {
      cell.draw(this.#ctx);
    });
  }
  draw(cellSize) {
    this.#scanImage(cellSize);
    this.#drawASCII();
  }
}

let effect;

function handleSlider() {
  if (inputSlider.value == 1) {
    inputLabel.innerHTML = "Original Image";
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  } else {
    inputLabel.innerHTML = `Resolution: ${inputSlider.value}px`;
    effect.draw(parseInt(inputSlider.value));
  }
}
image1.onload = init = () => {
  canvas.width = image1.width;
  canvas.height = image1.height;
  //   ctx.drawImage(image1, 0, 0, image1.width, image1.height);
  effect = new AsciiFX(ctx, image1.width, image1.height);
  effect.draw(3);
};
