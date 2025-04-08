// Slightly modified version of
// https://www.khanacademy.org/computer-programming/secret-anaglyph-message/5395038998921216
// to inject a QR code into the message. Can be run on that site
// and the image saved from there

// Type YOUR MESSAGE (capitals and numbers only)
var message = 'OFFICE BOOKCASE';
var message2 = '     FAR SIDE';

// Select size of a pixel
var pixel = 4;

// Select the distance between edge of the image and the text
var padding = 25;
var padding2 = 24;

// Select difficulty
var difficulty = 0;

//0=easy, 4=ballanced, 10=difficult, 20=impossible, 50=random

//----- CODE -----

//coor intervals for red and cyan spectrum
colorMode(HSB);
var redTop = 55;
var blueLow = 75;
var blueTop = 190;
var purpleLow = 200;

//initial cursor position
var typingPos = [padding + 10, padding];
var typingPos2 = [padding2 - 1, padding2];

var odstin = random() * 255;
var satur = 255;

noStroke();

var MessageX = [];
var MessageY = [];

var Message2X = [];
var Message2Y = [];

//Symbols graphics
{
  var Ax = [-4, -3, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 1];
  var Ay = [4, 3, 3, 2, 4, 7, 2, 5, 6, 1, 2, 3, 4];
  var Bx = [-4, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 2, 2];
  var By = [4, 3, 5, 2, 6, 1, 3, 6, 0, 4, 5, 1, 4, 2, 3];
  var Cx = [-3, -3, -3, -2, -2, -1, -1, 0, 1, 2, 2];
  var Cy = [3, 4, 5, 2, 6, 1, 6, 1, 1, 2, 3];
  var Dx = [-4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2];
  var Dy = [4, 3, 5, 2, 6, 1, 6, 0, 5, 1, 4, 2, 3];
  var Ex = [-4, -3, -3, -2, -2, -1, -1, -1, 0, 0, 1, 2, 3];
  var Ey = [4, 3, 5, 2, 6, 1, 3, 7, 0, 4, 1, 2, 3];
  var Fx = [-4, -3, -2, -1, -1, 0, 0, 1, 2, 3];
  var Fy = [4, 3, 2, 1, 3, 0, 4, 1, 2, 3];
  var Gx = [-3, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 2, 2];
  var Gy = [3, 4, 5, 2, 6, 1, 4, 6, 1, 5, 6, 1, 2, 3];
  var Hx = [-4, -3, -2, -2, -1, -1, -1, 0, 0, 1, 2];
  var Hy = [4, 3, 2, 6, 1, 3, 5, 0, 4, 3, 2];
  var Ix = [-4, -3, -2, -1, 0];
  var Iy = [4, 3, 2, 1, 0];
  var Jx = [-3, -3, -3, -2, -1, 0, 0, 1, 1, 2, 2, 3];
  var Jy = [3, 4, 5, 6, 6, 0, 6, 1, 5, 2, 4, 3];
  var Kx = [-4, -3, -2, -2, -1, -1, -1, -1, 0, 0, 1, 2];
  var Ky = [4, 3, 2, 6, 1, 3, 4, 5, 0, 3, 3, 2];
  var Lx = [-4, -3, -3, -2, -2, -1, 0];
  var Ly = [4, 3, 5, 2, 6, 1, 0];
  var Mx = [-4, -3, -2, -1, -1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3];
  var My = [4, 3, 2, 1, 7, 0, 1, 2, 3, 6, 3, 5, 3, 4, 3];
  var Nx = [-4, -3, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 2, 3];
  var Ny = [4, 3, 2, 1, 4, 5, 6, 7, 0, 1, 2, 3, 6, 5, 4, 3];
  var Ox = [-3, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 2];
  var Oy = [3, 4, 5, 2, 6, 1, 6, 1, 6, 1, 5, 2, 3, 4];
  var Px = [-4, -3, -2, -1, -1, 0, 0, 1, 1, 2, 2];
  var Py = [4, 3, 2, 1, 3, 0, 4, 1, 4, 2, 3];
  var Qx = [-3, -3, -3, -2, -2, -1, -1, -1, -1, 0, 0, 1, 1, 2, 2, 2];
  var Qy = [3, 4, 5, 2, 6, 1, 5, 6, 7, 1, 6, 1, 5, 2, 3, 4];
  var Rx = [-4, -3, -2, -1, -1, -1, -1, -1, -1, 0, 0, 1, 1, 2, 2];
  var Ry = [4, 3, 2, 1, 3, 4, 5, 6, 7, 0, 4, 1, 4, 2, 3];
  var Sx = [-3, -3, -2, -1, -1, -1, -1, 0, 0, 0, 0, 1, 2, 2];
  var Sy = [4, 5, 6, 1, 2, 3, 6, 1, 4, 5, 6, 1, 2, 3];
  var Tx = [-3, -2, -1, 0, 0, 1, 2];
  var Ty = [5, 4, 3, 0, 2, 1, 2];
  var Ux = [-3, -3, -3, -2, -2, -1, -1, 0, 0, 1, 2, 3];
  var Uy = [3, 4, 5, 2, 6, 1, 6, 0, 6, 5, 4, 3];
  var Vx = [-2, -2, -2, -2, -1, -1, -1, -1, 0, 0, 1, 2, 3];
  var Vy = [3, 4, 5, 6, 1, 2, 3, 5, 0, 5, 4, 4, 3];
  var Wx = [-3, -3, -2, -2, -1, -1, -1, -1, 0, 0, 0, 1, 2, 3];
  var Wy = [3, 4, 2, 4, 1, 4, 5, 6, 0, 3, 6, 5, 4, 3];
  var Xx = [-4, -3, -3, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 2, 2, 3];
  var Xy = [4, 3, 4, 3, 1, 2, 3, 6, 7, 0, 1, 4, 5, 6, 4, 3, 4, 3];
  var Yx = [-3, -2, -1, 0, 0, 0, 0, 1, 2, 3];
  var Yy = [5, 4, 4, 0, 1, 2, 3, 3, 3, 3];
  var Zx = [-4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3];
  var Zy = [4, 4, 5, 4, 6, 4, 7, 0, 3, 1, 3, 2, 3, 3];
  var n0x = [
    -4, -3, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3,
  ];
  var n0y = [4, 3, 4, 5, 2, 4, 6, 1, 4, 6, 1, 3, 6, 1, 3, 5, 2, 3, 4, 3];
  var n1x = [-3, -2, -1, -1, -1, 0, 0, 1, 1, 2];
  var n1y = [5, 6, 2, 5, 7, 2, 4, 2, 3, 2];
  var n2x = [-4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2];
  var n2y = [4, 4, 5, 4, 6, 4, 7, 1, 4, 1, 4, 2, 3];
  var n3x = [-3, -3, -2, -1, 0, 0, 0, 0, 1, 1, 2, 2, 2];
  var n3y = [4, 5, 6, 6, 1, 4, 5, 6, 1, 4, 2, 3, 4];
  var n4x = [-2, -2, -1, -1, -1, 0, 0, 1, 2];
  var n4y = [2, 6, 1, 3, 5, 0, 4, 3, 2];
  var n5x = [-4, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 2];
  var n5y = [4, 5, 2, 6, 1, 3, 6, 0, 4, 5, 1, 2];
  var n6x = [-3, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 0, 1, 2, 2];
  var n6y = [3, 4, 5, 2, 3, 6, 1, 3, 6, 1, 4, 5, 6, 1, 2, 3];
  var n7x = [-3, -2, -1, 0, 0, 1, 1, 2];
  var n7y = [5, 4, 3, 0, 3, 1, 3, 2];
  var n8x = [-3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 2, 2];
  var n8y = [4, 5, 3, 6, 2, 3, 6, 1, 4, 5, 1, 4, 2, 3];
  var n9x = [-3, -3, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2];
  var n9y = [4, 5, 6, 2, 3, 6, 1, 4, 6, 1, 4, 5, 2, 3, 4];
}
var addSymbol = function (symbolX, symbolY) {
  var symbolSize = 0;
  for (var i = 0; i < symbolX.length; i++) {
    MessageX.push(symbolX[i] + typingPos[0]);
    MessageY.push(symbolY[i] + typingPos[1]);
    symbolSize = max(symbolSize, symbolX[i] + symbolY[i]);
  }
  typingPos = [
    typingPos[0] + round(symbolSize / 2) + 2,
    typingPos[1] + round(symbolSize / 2) + 2,
  ];
};

//Message construtcion
for (var i = 0; i < message.length; i++) {
  switch (message[i]) {
    case 'A':
      addSymbol(Ax, Ay);
      break;
    case 'B':
      addSymbol(Bx, By);
      break;
    case 'C':
      addSymbol(Cx, Cy);
      break;
    case 'D':
      addSymbol(Dx, Dy);
      break;
    case 'E':
      addSymbol(Ex, Ey);
      break;
    case 'F':
      addSymbol(Fx, Fy);
      break;
    case 'G':
      addSymbol(Gx, Gy);
      break;
    case 'H':
      addSymbol(Hx, Hy);
      break;
    case 'I':
      addSymbol(Ix, Iy);
      break;
    case 'J':
      addSymbol(Jx, Jy);
      break;
    case 'K':
      addSymbol(Kx, Ky);
      break;
    case 'L':
      addSymbol(Lx, Ly);
      break;
    case 'M':
      addSymbol(Mx, My);
      break;
    case 'N':
      addSymbol(Nx, Ny);
      break;
    case 'O':
      addSymbol(Ox, Oy);
      break;
    case 'P':
      addSymbol(Px, Py);
      break;
    case 'Q':
      addSymbol(Qx, Qy);
      break;
    case 'R':
      addSymbol(Rx, Ry);
      break;
    case 'S':
      addSymbol(Sx, Sy);
      break;
    case 'T':
      addSymbol(Tx, Ty);
      break;
    case 'U':
      addSymbol(Ux, Uy);
      break;
    case 'V':
      addSymbol(Vx, Vy);
      break;
    case 'W':
      addSymbol(Wx, Wy);
      break;
    case 'X':
      addSymbol(Xx, Xy);
      break;
    case 'Y':
      addSymbol(Yx, Yy);
      break;
    case 'Z':
      addSymbol(Zx, Zy);
      break;
    case '0':
      addSymbol(n0x, n0y);
      break;
    case '1':
      addSymbol(n1x, n1y);
      break;
    case '2':
      addSymbol(n2x, n2y);
      break;
    case '3':
      addSymbol(n3x, n3y);
      break;
    case '4':
      addSymbol(n4x, n4y);
      break;
    case '5':
      addSymbol(n5x, n5y);
      break;
    case '6':
      addSymbol(n6x, n6y);
      break;
    case '7':
      addSymbol(n7x, n7y);
      break;
    case '8':
      addSymbol(n8x, n8y);
      break;
    case '9':
      addSymbol(n9x, n9y);
      break;
    default:
      typingPos[0] += 4;
      typingPos[1] += 4;
  }
}

//Message typing
var hledej = function (pozX, pozY) {
  for (var k = 0; k < MessageX.length; k++) {
    if (MessageX[k] === pozX && MessageY[k] === pozY) {
      return true;
    }
  }
  return false;
};
var selectCyan = function () {
  odstin = random() * 255;
  satur = 255;
  while (odstin < blueLow || odstin > blueTop) {
    odstin = random() * 255;
  }
};
var selectRed = function () {
  odstin = random() * 255;
  while (odstin > redTop && odstin < purpleLow) {
    odstin = random() * 255;
  }
  satur = random() * 8;
  if (satur > 1) {
    satur = 255;
  }
};
var pom = 0;
for (var i = 0; i < width / pixel; i++) {
  for (var j = 0; j < width / pixel; j++) {
    odstin = random() * 255;
    satur = 255;
    pom = random() * 100;
    if (hledej(i, j)) {
      if (pom > difficulty) {
        selectCyan();
      } else {
        selectRed();
      }
    } else if (
      (abs(i - j) < 11 &&
        abs(i * pixel + j * pixel - width) < width - 1.9 * pixel * padding) ||
      odstin < 155
    ) {
      if (pom > difficulty) {
        selectRed();
      } else {
        selectCyan();
      }
    } else {
      if (pom < 50) {
        selectCyan();
      } else {
        selectRed();
      }
    }
    fill(odstin, satur, 255);
    rect(pixel * i, pixel * j, pixel, pixel);
  }
}

//**********************************
//**********************************
//**********************************
//**********************************
//Symbols graphics
{
  var Ax = [-4, -3, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 1];
  var Ay = [4, 3, 3, 2, 4, 7, 2, 5, 6, 1, 2, 3, 4];
  var Bx = [-4, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 2, 2];
  var By = [4, 3, 5, 2, 6, 1, 3, 6, 0, 4, 5, 1, 4, 2, 3];
  var Cx = [-3, -3, -3, -2, -2, -1, -1, 0, 1, 2, 2];
  var Cy = [3, 4, 5, 2, 6, 1, 6, 1, 1, 2, 3];
  var Dx = [-4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2];
  var Dy = [4, 3, 5, 2, 6, 1, 6, 0, 5, 1, 4, 2, 3];
  var Ex = [-4, -3, -3, -2, -2, -1, -1, -1, 0, 0, 1, 2, 3];
  var Ey = [4, 3, 5, 2, 6, 1, 3, 7, 0, 4, 1, 2, 3];
  var Fx = [-4, -3, -2, -1, -1, 0, 0, 1, 2, 3];
  var Fy = [4, 3, 2, 1, 3, 0, 4, 1, 2, 3];
  var Gx = [-3, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 2, 2];
  var Gy = [3, 4, 5, 2, 6, 1, 4, 6, 1, 5, 6, 1, 2, 3];
  var Hx = [-4, -3, -2, -2, -1, -1, -1, 0, 0, 1, 2];
  var Hy = [4, 3, 2, 6, 1, 3, 5, 0, 4, 3, 2];
  var Ix = [-4, -3, -2, -1, 0];
  var Iy = [4, 3, 2, 1, 0];
  var Jx = [-3, -3, -3, -2, -1, 0, 0, 1, 1, 2, 2, 3];
  var Jy = [3, 4, 5, 6, 6, 0, 6, 1, 5, 2, 4, 3];
  var Kx = [-4, -3, -2, -2, -1, -1, -1, -1, 0, 0, 1, 2];
  var Ky = [4, 3, 2, 6, 1, 3, 4, 5, 0, 3, 3, 2];
  var Lx = [-4, -3, -3, -2, -2, -1, 0];
  var Ly = [4, 3, 5, 2, 6, 1, 0];
  var Mx = [-4, -3, -2, -1, -1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3];
  var My = [4, 3, 2, 1, 7, 0, 1, 2, 3, 6, 3, 5, 3, 4, 3];
  var Nx = [-4, -3, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 2, 3];
  var Ny = [4, 3, 2, 1, 4, 5, 6, 7, 0, 1, 2, 3, 6, 5, 4, 3];
  var Ox = [-3, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 2];
  var Oy = [3, 4, 5, 2, 6, 1, 6, 1, 6, 1, 5, 2, 3, 4];
  var Px = [-4, -3, -2, -1, -1, 0, 0, 1, 1, 2, 2];
  var Py = [4, 3, 2, 1, 3, 0, 4, 1, 4, 2, 3];
  var Qx = [-3, -3, -3, -2, -2, -1, -1, -1, -1, 0, 0, 1, 1, 2, 2, 2];
  var Qy = [3, 4, 5, 2, 6, 1, 5, 6, 7, 1, 6, 1, 5, 2, 3, 4];
  var Rx = [-4, -3, -2, -1, -1, -1, -1, -1, -1, 0, 0, 1, 1, 2, 2];
  var Ry = [4, 3, 2, 1, 3, 4, 5, 6, 7, 0, 4, 1, 4, 2, 3];
  var Sx = [-3, -3, -2, -1, -1, -1, -1, 0, 0, 0, 0, 1, 2, 2];
  var Sy = [4, 5, 6, 1, 2, 3, 6, 1, 4, 5, 6, 1, 2, 3];
  var Tx = [-3, -2, -1, 0, 0, 1, 2];
  var Ty = [5, 4, 3, 0, 2, 1, 2];
  var Ux = [-3, -3, -3, -2, -2, -1, -1, 0, 0, 1, 2, 3];
  var Uy = [3, 4, 5, 2, 6, 1, 6, 0, 6, 5, 4, 3];
  var Vx = [-2, -2, -2, -2, -1, -1, -1, -1, 0, 0, 1, 2, 3];
  var Vy = [3, 4, 5, 6, 1, 2, 3, 5, 0, 5, 4, 4, 3];
  var Wx = [-3, -3, -2, -2, -1, -1, -1, -1, 0, 0, 0, 1, 2, 3];
  var Wy = [3, 4, 2, 4, 1, 4, 5, 6, 0, 3, 6, 5, 4, 3];
  var Xx = [-4, -3, -3, -2, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 1, 2, 2, 3];
  var Xy = [4, 3, 4, 3, 1, 2, 3, 6, 7, 0, 1, 4, 5, 6, 4, 3, 4, 3];
  var Yx = [-3, -2, -1, 0, 0, 0, 0, 1, 2, 3];
  var Yy = [5, 4, 4, 0, 1, 2, 3, 3, 3, 3];
  var Zx = [-4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3];
  var Zy = [4, 4, 5, 4, 6, 4, 7, 0, 3, 1, 3, 2, 3, 3];
  var n0x = [
    -4, -3, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3,
  ];
  var n0y = [4, 3, 4, 5, 2, 4, 6, 1, 4, 6, 1, 3, 6, 1, 3, 5, 2, 3, 4, 3];
  var n1x = [-3, -2, -1, -1, -1, 0, 0, 1, 1, 2];
  var n1y = [5, 6, 2, 5, 7, 2, 4, 2, 3, 2];
  var n2x = [-4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2];
  var n2y = [4, 4, 5, 4, 6, 4, 7, 1, 4, 1, 4, 2, 3];
  var n3x = [-3, -3, -2, -1, 0, 0, 0, 0, 1, 1, 2, 2, 2];
  var n3y = [4, 5, 6, 6, 1, 4, 5, 6, 1, 4, 2, 3, 4];
  var n4x = [-2, -2, -1, -1, -1, 0, 0, 1, 2];
  var n4y = [2, 6, 1, 3, 5, 0, 4, 3, 2];
  var n5x = [-4, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 2];
  var n5y = [4, 5, 2, 6, 1, 3, 6, 0, 4, 5, 1, 2];
  var n6x = [-3, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 0, 1, 2, 2];
  var n6y = [3, 4, 5, 2, 3, 6, 1, 3, 6, 1, 4, 5, 6, 1, 2, 3];
  var n7x = [-3, -2, -1, 0, 0, 1, 1, 2];
  var n7y = [5, 4, 3, 0, 3, 1, 3, 2];
  var n8x = [-3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 2, 2];
  var n8y = [4, 5, 3, 6, 2, 3, 6, 1, 4, 5, 1, 4, 2, 3];
  var n9x = [-3, -3, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2];
  var n9y = [4, 5, 6, 2, 3, 6, 1, 4, 6, 1, 4, 5, 2, 3, 4];
}
var addSymbol = function (symbolX, symbolY) {
  var symbolSize = 0;
  for (var m = 0; m < symbolX.length; m++) {
    MessageX.push(symbolX[m] + typingPos2[0]);
    MessageY.push(symbolY[m] + typingPos2[1]);
    symbolSize = max(symbolSize, symbolX[m] + symbolY[m]);
  }
  typingPos2 = [
    typingPos2[0] + round(symbolSize / 2) + 2,
    typingPos2[1] + round(symbolSize / 2) + 2,
  ];
};

//Message2 construtcion
for (var m = 0; m < message2.length; m++) {
  switch (message2[m]) {
    case 'A':
      addSymbol(Ax, Ay);
      break;
    case 'B':
      addSymbol(Bx, By);
      break;
    case 'C':
      addSymbol(Cx, Cy);
      break;
    case 'D':
      addSymbol(Dx, Dy);
      break;
    case 'E':
      addSymbol(Ex, Ey);
      break;
    case 'F':
      addSymbol(Fx, Fy);
      break;
    case 'G':
      addSymbol(Gx, Gy);
      break;
    case 'H':
      addSymbol(Hx, Hy);
      break;
    case 'I':
      addSymbol(Ix, Iy);
      break;
    case 'J':
      addSymbol(Jx, Jy);
      break;
    case 'K':
      addSymbol(Kx, Ky);
      break;
    case 'L':
      addSymbol(Lx, Ly);
      break;
    case 'M':
      addSymbol(Mx, My);
      break;
    case 'N':
      addSymbol(Nx, Ny);
      break;
    case 'O':
      addSymbol(Ox, Oy);
      break;
    case 'P':
      addSymbol(Px, Py);
      break;
    case 'Q':
      addSymbol(Qx, Qy);
      break;
    case 'R':
      addSymbol(Rx, Ry);
      break;
    case 'S':
      addSymbol(Sx, Sy);
      break;
    case 'T':
      addSymbol(Tx, Ty);
      break;
    case 'U':
      addSymbol(Ux, Uy);
      break;
    case 'V':
      addSymbol(Vx, Vy);
      break;
    case 'W':
      addSymbol(Wx, Wy);
      break;
    case 'X':
      addSymbol(Xx, Xy);
      break;
    case 'Y':
      addSymbol(Yx, Yy);
      break;
    case 'Z':
      addSymbol(Zx, Zy);
      break;
    case '0':
      addSymbol(n0x, n0y);
      break;
    case '1':
      addSymbol(n1x, n1y);
      break;
    case '2':
      addSymbol(n2x, n2y);
      break;
    case '3':
      addSymbol(n3x, n3y);
      break;
    case '4':
      addSymbol(n4x, n4y);
      break;
    case '5':
      addSymbol(n5x, n5y);
      break;
    case '6':
      addSymbol(n6x, n6y);
      break;
    case '7':
      addSymbol(n7x, n7y);
      break;
    case '8':
      addSymbol(n8x, n8y);
      break;
    case '9':
      addSymbol(n9x, n9y);
      break;
    default:
      typingPos2[0] += 4;
      typingPos2[1] += 4;
  }
}

//Message2 typing
var hledej2 = function (pozX, pozY) {
  for (var n = 0; n < MessageX.length; n++) {
    if (MessageX[n] === pozX && MessageY[n] === pozY) {
      return true;
    }
  }
  return false;
};
var selectCyan = function () {
  odstin = random() * 255;
  satur = 255;
  while (odstin < blueLow || odstin > blueTop) {
    odstin = random() * 255;
  }
};
var selectRed = function () {
  odstin = random() * 255;
  while (odstin > redTop && odstin < purpleLow) {
    odstin = random() * 255;
  }
  satur = random() * 8;
  if (satur > 1) {
    satur = 255;
  }
};
var pom = 0;
for (var i = 0; i < width / pixel; i++) {
  for (var j = 0; j < width / pixel; j++) {
    odstin = random() * 255;
    satur = 255;
    pom = random() * 100;
    if (hledej2(i, j)) {
      if (pom > difficulty) {
        selectCyan();
      } else {
        selectRed();
      }
    } else if (
      (abs(i - j) < 12 &&
        abs(i * pixel + j * pixel - width) < width - 2.3 * pixel * padding2) ||
      odstin < 155
    ) {
      if (pom > difficulty) {
        selectRed();
      } else {
        selectCyan();
      }
    } else {
      if (pom < 50) {
        selectCyan();
      } else {
        selectRed();
      }
    }
    fill(odstin, satur, 255);
    rect(pixel * i, pixel * j, pixel, pixel);
  }
}
colorMode(RGB);

var qr = [
  0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1,
  0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,
  0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0,
  0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1,
  1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1,
  1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0,
  0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1,
  1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0,
  1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0,
  1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1,
  1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1,
  1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0,
  1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0,
  0,
];

var lightQR = [
  [239, 132, 50],
  [239, 132, 50],
  [241, 155, 56],
  [241, 155, 56],
  [5, 255, 229],
  [252, 253, 253],
  [46, 254, 1],
  // [0,254,145],
];
var darkQR = [
  [23, 61, 245],
  [234, 51, 56],
  [234, 51, 56],
  [234, 51, 183],
  [109, 18, 245],
];

for (var i = 0; i < qr.length; i++) {
  var x = i % 25;
  var y = Math.floor(i / 25);
  var rand = Math.random();
  var qrCol;
  if (qr[i] === 0) {
    qrCol = darkQR[Math.floor(Math.random() * darkQR.length)];
  } else {
    qrCol = lightQR[Math.floor(Math.random() * lightQR.length)];
  }
  fill(qrCol[0], qrCol[1], qrCol[2]);
  rect(304 + pixel * x, 124 + pixel * y, pixel, pixel);
}
