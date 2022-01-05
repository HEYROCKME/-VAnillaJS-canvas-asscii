const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const image1 = new Image();
image1.src = "../img/ALWN1426.JPG";
image1.height = 500;
image1.width = image1.height * 1.333;

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
  }
}

let effect;

image1.onload = init = () => {
  canvas.width = image1.width;
  canvas.height = image1.height;
  //   ctx.drawImage(image1, 0, 0, image1.width, image1.height);
  effect = new AsciiFX(ctx, image1.width, image1.height);
};
