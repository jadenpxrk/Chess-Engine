/**
 * @brief chessEngine is the engine for the chess game
 * @param {*} sizeOfBoard is the size of the board in pixels
 * @param {*} lightSquare is the color of the light squares
 * @param {*} darkSquare is the color of the dark squares
 * @param {*} selectionColor is the color of the selected square
 * @param {*} nextSquareColor is the color of the next square when a move is made
 * @param {*} previousSquareColor is the color of the previous square when a move is made
 * @return {object} A chess engine object
 */
var chessEngine = function (
  sizeOfBoard,
  lightSquare,
  darkSquare,
  selectionColor,
  nextSquareColor,
  previousSquareColor
) {
  const COLORS = {
    white: "0",
    black: "1",
  };

  const PIECES = {
    // Empty
    e: 0,

    // Off-board
    o: 13,

    // White pieces
    P: 1,
    N: 2,
    B: 3,
    R: 4,
    Q: 5,
    K: 6,

    // Black pieces
    p: 7,
    n: 8,
    b: 9,
    r: 10,
    q: 11,
    k: 12,
  };

  const SQUARES = {
    a8: 0,
    b8: 1,
    c8: 2,
    d8: 3,
    e8: 4,
    f8: 5,
    g8: 6,
    h8: 7,
    a7: 16,
    b7: 17,
    c7: 18,
    d7: 19,
    e7: 20,
    f7: 21,
    g7: 22,
    h7: 23,
    a6: 32,
    b6: 33,
    c6: 34,
    d6: 35,
    e6: 36,
    f6: 37,
    g6: 38,
    h6: 39,
    a5: 48,
    b5: 49,
    c5: 50,
    d5: 51,
    e5: 52,
    f5: 53,
    g5: 54,
    h5: 55,
    a4: 64,
    b4: 65,
    c4: 66,
    d4: 67,
    e4: 68,
    f4: 69,
    g4: 70,
    h4: 71,
    a3: 80,
    b3: 81,
    c3: 82,
    d3: 83,
    e3: 84,
    f3: 85,
    g3: 86,
    h3: 87,
    a2: 96,
    b2: 97,
    c2: 98,
    d2: 99,
    e2: 100,
    f2: 101,
    g2: 102,
    h2: 103,
    a1: 112,
    b1: 113,
    c1: 114,
    d1: 115,
    e1: 116,
    f1: 117,
    g1: 118,
    h1: 119,
    noEnpassant: 120,
  };

  const COORDINATES = [
    "a8",
    "b8",
    "c8",
    "d8",
    "e8",
    "f8",
    "g8",
    "h8",
    "i8",
    "j8",
    "k8",
    "l8",
    "m8",
    "n8",
    "o8",
    "p8",
    "a7",
    "b7",
    "c7",
    "d7",
    "e7",
    "f7",
    "g7",
    "h7",
    "i7",
    "j7",
    "k7",
    "l7",
    "m7",
    "n7",
    "o7",
    "p7",
    "a6",
    "b6",
    "c6",
    "d6",
    "e6",
    "f6",
    "g6",
    "h6",
    "i6",
    "j6",
    "k6",
    "l6",
    "m6",
    "n6",
    "o6",
    "p6",
    "a5",
    "b5",
    "c5",
    "d5",
    "e5",
    "f5",
    "g5",
    "h5",
    "i5",
    "j5",
    "k5",
    "l5",
    "m5",
    "n5",
    "o5",
    "p5",
    "a4",
    "b4",
    "c4",
    "d4",
    "e4",
    "f4",
    "g4",
    "h4",
    "i4",
    "j4",
    "k4",
    "l4",
    "m4",
    "n4",
    "o4",
    "p4",
    "a3",
    "b3",
    "c3",
    "d3",
    "e3",
    "f3",
    "g3",
    "h3",
    "i3",
    "j3",
    "k3",
    "l3",
    "m3",
    "n3",
    "o3",
    "p3",
    "a2",
    "b2",
    "c2",
    "d2",
    "e2",
    "f2",
    "g2",
    "h2",
    "i2",
    "j2",
    "k2",
    "l2",
    "m2",
    "n2",
    "o2",
    "p2",
    "a1",
    "b1",
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "h1",
    "i1",
    "j1",
    "k1",
    "l1",
    "m1",
    "n1",
    "o1",
    "p1",
  ];

  // FEN of the starting position
  const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  const MATERIAL_WEIGHTS = [
    0, 100, 320, 330, 500, 900, 20000, -100, -320, -330, -500, -900, -20000,
  ];

  const PST_PAWNS = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    10,
    10,
    20,
    30,
    30,
    20,
    10,
    10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    5,
    5,
    10,
    25,
    25,
    10,
    5,
    5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    0,
    0,
    0,
    20,
    20,
    0,
    0,
    0,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    5,
    -5,
    -10,
    0,
    0,
    -10,
    -5,
    5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    5,
    10,
    10,
    -20,
    -20,
    10,
    10,
    5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
  ];

  const PST_KNIGHTS = [
    -50,
    -40,
    -30,
    -30,
    -30,
    -30,
    -40,
    -50,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -40,
    -20,
    0,
    0,
    0,
    0,
    -20,
    -40,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -30,
    0,
    10,
    15,
    15,
    10,
    0,
    -30,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -30,
    5,
    15,
    20,
    20,
    15,
    5,
    -30,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -30,
    0,
    15,
    20,
    20,
    15,
    0,
    -30,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -30,
    5,
    10,
    15,
    15,
    10,
    5,
    -30,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -40,
    -20,
    0,
    5,
    5,
    0,
    -20,
    -40,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -50,
    -40,
    -30,
    -30,
    -30,
    -30,
    -40,
    -50,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
  ];

  const PST_BISHOPS = [
    -20,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -20,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    0,
    0,
    0,
    0,
    0,
    0,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    0,
    5,
    10,
    10,
    5,
    0,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    5,
    5,
    10,
    10,
    5,
    5,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    0,
    10,
    10,
    10,
    10,
    0,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    10,
    10,
    10,
    10,
    10,
    10,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    5,
    0,
    0,
    0,
    0,
    5,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -20,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -20,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
  ];

  const PST_ROOKS = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    5,
    10,
    10,
    10,
    10,
    10,
    10,
    5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    0,
    0,
    0,
    5,
    5,
    0,
    0,
    0,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
  ];

  const PST_QUEENS = [
    -20,
    -10,
    -10,
    -5,
    -5,
    -10,
    -10,
    -20,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    0,
    0,
    0,
    0,
    0,
    0,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    0,
    5,
    5,
    5,
    5,
    0,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -5,
    0,
    5,
    5,
    5,
    5,
    0,
    -5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    0,
    0,
    5,
    5,
    5,
    5,
    0,
    -5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    5,
    5,
    5,
    5,
    5,
    0,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -10,
    0,
    5,
    0,
    0,
    0,
    0,
    -10,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    -20,
    -10,
    -10,
    -5,
    -5,
    -10,
    -10,
    -20,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
  ];

  const PST_KINGS = [
    // Point square table for the kings in the opening
    [
      -30,
      -40,
      -40,
      -50,
      -50,
      -40,
      -40,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -30,
      -40,
      -40,
      -50,
      -50,
      -40,
      -40,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -30,
      -40,
      -40,
      -50,
      -50,
      -40,
      -40,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -30,
      -40,
      -40,
      -50,
      -50,
      -40,
      -40,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -20,
      -30,
      -30,
      -40,
      -40,
      -30,
      -30,
      -20,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -10,
      -20,
      -20,
      -20,
      -20,
      -20,
      -20,
      -10,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      20,
      20,
      0,
      0,
      0,
      0,
      20,
      20,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      20,
      30,
      10,
      0,
      0,
      10,
      30,
      20,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
    ],

    // Point square table for the kings in the endgame
    [
      -50,
      -40,
      -30,
      -20,
      -20,
      -30,
      -40,
      -50,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -30,
      -20,
      -10,
      0,
      0,
      -10,
      -20,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -30,
      -10,
      20,
      30,
      30,
      20,
      -10,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -30,
      -10,
      30,
      40,
      40,
      30,
      -10,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -30,
      -10,
      30,
      40,
      40,
      30,
      -10,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -30,
      -10,
      20,
      30,
      30,
      20,
      -10,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -30,
      -30,
      0,
      0,
      0,
      0,
      -30,
      -30,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      -50,
      -30,
      -30,
      -30,
      -30,
      -30,
      -30,
      -50,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
      PIECES.o,
    ],
  ];

  // For Black, the PSTs are mirrored
  const MIRRORED = [
    SQUARES.a1,
    SQUARES.b1,
    SQUARES.c1,
    SQUARES.d1,
    SQUARES.e1,
    SQUARES.f1,
    SQUARES.g1,
    SQUARES.h1,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    SQUARES.a2,
    SQUARES.b2,
    SQUARES.c2,
    SQUARES.d2,
    SQUARES.e2,
    SQUARES.f2,
    SQUARES.g2,
    SQUARES.h2,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    SQUARES.a3,
    SQUARES.b3,
    SQUARES.c3,
    SQUARES.d3,
    SQUARES.e3,
    SQUARES.f3,
    SQUARES.g3,
    SQUARES.h3,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    SQUARES.a4,
    SQUARES.b4,
    SQUARES.c4,
    SQUARES.d4,
    SQUARES.e4,
    SQUARES.f4,
    SQUARES.g4,
    SQUARES.h4,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    SQUARES.a5,
    SQUARES.b5,
    SQUARES.c5,
    SQUARES.d5,
    SQUARES.e5,
    SQUARES.f5,
    SQUARES.g5,
    SQUARES.h5,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    SQUARES.a6,
    SQUARES.b6,
    SQUARES.c6,
    SQUARES.d6,
    SQUARES.e6,
    SQUARES.f6,
    SQUARES.g6,
    SQUARES.h6,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    SQUARES.a7,
    SQUARES.b7,
    SQUARES.c7,
    SQUARES.d7,
    SQUARES.e7,
    SQUARES.f7,
    SQUARES.g7,
    SQUARES.h7,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    SQUARES.a8,
    SQUARES.b8,
    SQUARES.c8,
    SQUARES.d8,
    SQUARES.e8,
    SQUARES.f8,
    SQUARES.g8,
    SQUARES.h8,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
  ];

  // Most Valuable Victim - Least Valuable Aggressor (MVV-LVA) table
  const MVVLVA = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 105, 205, 305, 405, 505, 605, 105,
    205, 305, 405, 505, 605, 0, 104, 204, 304, 404, 504, 604, 104, 204, 304,
    404, 504, 604, 0, 103, 203, 303, 403, 503, 603, 103, 203, 303, 403, 503,
    603, 0, 102, 202, 302, 402, 502, 602, 102, 202, 302, 402, 502, 602, 0, 101,
    201, 301, 401, 501, 601, 101, 201, 301, 401, 501, 601, 0, 100, 200, 300,
    400, 500, 600, 100, 200, 300, 400, 500, 600,

    0, 105, 205, 305, 405, 505, 605, 105, 205, 305, 405, 505, 605, 0, 104, 204,
    304, 404, 504, 604, 104, 204, 304, 404, 504, 604, 0, 103, 203, 303, 403,
    503, 603, 103, 203, 303, 403, 503, 603, 0, 102, 202, 302, 402, 502, 602,
    102, 202, 302, 402, 502, 602, 0, 101, 201, 301, 401, 501, 601, 101, 201,
    301, 401, 501, 601, 0, 100, 200, 300, 400, 500, 600, 100, 200, 300, 400,
    500, 600,
  ];

  // SEARCH CONSTANTS
  const MAX_PLY = 64;
  const INFINITY = 50000;
  const MATE_VALUE = 49000;
  const DO_NULL = 1;
  const NO_NULL = 0;

  // Chess board represented by a 1D array
  var board = [
    PIECES.r,
    PIECES.n,
    PIECES.b,
    PIECES.q,
    PIECES.k,
    PIECES.b,
    PIECES.n,
    PIECES.r,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.p,
    PIECES.p,
    PIECES.p,
    PIECES.p,
    PIECES.p,
    PIECES.p,
    PIECES.p,
    PIECES.p,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.e,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.P,
    PIECES.P,
    PIECES.P,
    PIECES.P,
    PIECES.P,
    PIECES.P,
    PIECES.P,
    PIECES.P,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.R,
    PIECES.N,
    PIECES.B,
    PIECES.Q,
    PIECES.K,
    PIECES.B,
    PIECES.N,
    PIECES.R,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
  ];

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   * Start of Engine Stuff
   *
   *
   *
   *
   *
   *
   *
   *
   */

  // Initializing variables for the chess board
  var side = COLORS.white;
  var enpassant = SQUARES.noEnpassant;
  var castle = 15;
  var fifty = 0;
  var hashKey = 0;
  var kingSquare = [SQUARES.e1, SQUARES.e8];

  // List of pieces
  var pieceList = {
    [PIECES.P]: 0,
    [PIECES.N]: 0,
    [PIECES.B]: 0,
    [PIECES.R]: 0,
    [PIECES.Q]: 0,
    [PIECES.K]: 0,
    [PIECES.p]: 0,
    [PIECES.n]: 0,
    [PIECES.b]: 0,
    [PIECES.r]: 0,
    [PIECES.q]: 0,
    [PIECES.k]: 0,

    pieces: new Array(13 * 10),
  };

  // Board moves stack
  var movesStack = [];

  // Plies
  var searchOne = 0;
  var gameOne = 0;

  // Fixed random seed
  var randomState = 2304203948;

  // Generates random 32-bit pseudo legal numbers
  function random() {
    var number = randomState;

    // 32-bit XOR shift
    number ^= number << 13;
    number ^= number >> 17;
    number ^= number << 5;
    randomState = number;

    return number;
  }

  // ZOBRIST HASHING
  // Initializing random keys for the hash board
  var pieceKeys = new Array(13 * 128);
  var castleKeys = new Array(16);
  var sideKey;

  /**
   * @brief initRandomKeys initializes the random keys for the hash board
   */
  function initRandomKeys() {
    for (var index = 0; index < 13 * 128; index++) pieceKeys[index] = random();
    for (var index = 0; index < 16; index++) castleKeys[index] = random();
    sideKey = random();
  }

  /**
   * @brief generateHashKey generates the hash key for the hash board
   * @return {number} The hash key for the hash board
   */
  function generateHashKey() {
    var finalKey = 0;

    // Loops through each square on the board
    // and gives each piece a random key
    for (var square = 0; square < 128; square++) {
      if ((square & 0x88) == 0) {
        var piece = board[square];
        if (piece != PIECES.e) finalKey ^= pieceKeys[piece * 128 + square];
      }
    }

    // Hash board state variables
    if (side == COLORS.white) finalKey ^= sideKey;
    if (enpassant != SQUARES.noEnpassant) finalKey ^= pieceKeys[enpassant];
    finalKey ^= castleKeys[castle];

    return finalKey;
  }

  /**
   * @brief resetBoard resets the chess board
   */
  function resetBoard() {
    // Restting the board position by looping through each file and rank
    for (var rank = 0; rank < 8; rank++) {
      for (var file = 0; file < 16; file++) {
        var square = rank * 16 + file;
        if ((square & 0x88) == 0) board[square] = PIECES.e;
      }
    }

    // Resetting board state variables
    side = -1;
    enpassant = SQUARES.noEnpassant;
    castle = 0;
    fifty = 0;
    hashKey = 0;
    kingSquare = [0, 0];
    movesStack = [];

    // Resetting the plies
    searchOne = 0;
    gameOne = 0;

    // Resetting the repetition table
    for (let i in repetitionTable) repetitionTable[i] = 0;
  }

  /**
   * @brief initializePieceList initializes the piece list
   */
  function initializePieceList() {
    for (var piece = PIECES.P; piece <= PIECES.k; piece++) pieceList[piece] = 0;

    for (var index = 0; index < pieceList.pieces.length; index++)
      pieceList.pieces[index] = 0;

    for (var square = 0; square < 128; square++) {
      if ((square & 0x88) == 0) {
        var piece = board[square];

        if (piece) {
          pieceList.pieces[piece * 10 + pieceList[piece]] = square;
          pieceList[piece]++;
        }
      }
    }
  }

  /**
   * @brief moveFromString will move a piece from a string
   * @param {*} moveString is the move string
   */
  function moveFromString(moveString) {
    let moveList = [];
    generateMoves(moveList);

    // Parsing moves into a string
    var previousSquare =
      moveString[0].charCodeAt() -
      "a".charCodeAt() +
      (8 - (moveString[1].charCodeAt() - "0".charCodeAt())) * 16;
    var nextSquare =
      moveString[2].charCodeAt() -
      "a".charCodeAt() +
      (8 - (moveString[3].charCodeAt() - "0".charCodeAt())) * 16;

    // Checking that the move is valid
    for (var count = 0; count < moveList.length; count++) {
      var move = moveList[count].move;
      var promotedPiece = 0;

      if (
        getMoveSource(move) == previousSquare &&
        getMoveTarget(move) == nextSquare
      ) {
        promotedPiece = getMovePromoted(move);
        // If the piece is promoting we check what it is promoting to, depending on the user's settings
        if (promotedPiece) {
          if (
            (promotedPiece == PIECES.N || promotedPiece == PIECES.n) &&
            moveString[4] == "n"
          )
            return move;
          else if (
            (promotedPiece == PIECES.B || promotedPiece == PIECES.b) &&
            moveString[4] == "b"
          )
            return move;
          else if (
            (promotedPiece == PIECES.R || promotedPiece == PIECES.r) &&
            moveString[4] == "r"
          )
            return move;
          else if (
            (promotedPiece == PIECES.Q || promotedPiece == PIECES.q) &&
            moveString[4] == "q"
          )
            return move;
          continue;
        }

        return move;
      }
    }
    return 0;
  }

  /**
   * @brief isSquareAttacked checks if a square is being attacked
   * @param {*} square is the square that is being checked
   * @param {*} side is the side that is attacking
   */
  function isSquareAttacked(square, side) {
    // Checking if the square is being attacked by a pawn
    for (let index = 0; index < 2; index++) {
      let nextSquare = square + pawnDirections.offsets[side][index];
      if (
        (nextSquare & 0x88) == 0 &&
        board[nextSquare] == pawnDirections.pawn[side]
      )
        return 1;
    }

    for (let piece in fixedPieces) {
      for (let index = 0; index < 8; index++) {
        let nextSquare = square + fixedPieces[piece].offsets[index];
        let targetPiece = board[nextSquare];
        if ((nextSquare & 0x88) == 0)
          if (targetPiece == fixedPieces[piece].side[side]) return 1;
      }
    }

    for (let piece in dynamicPieces) {
      for (let index = 0; index < 4; index++) {
        let nextSquare = square + dynamicPieces[piece].offsets[index];
        while ((nextSquare & 0x88) == 0) {
          var targetPiece = board[nextSquare];
          if (dynamicPieces[piece].side[side].includes(targetPiece)) return 1;
          if (targetPiece) break;
          nextSquare += dynamicPieces[piece].offsets[index];
        }
      }
    }

    return 0;
  }

  /**
   * @brief encodeMove will encode the move
   * @param {*} source is the square the piece is moving from
   * @param {*} target is the square the piece is moving to
   * @param {*} piece is the piece that was moved
   * @param {*} capture is the piece that was captured
   * @param {*} pawn is the pawn that was moved (if)
   * @param {*} enpassant is the enpassant square
   * @param {*} castling is the castling rights
   */
  function encodeMove(
    source,
    target,
    piece,
    capture,
    pawn,
    enpassant,
    castling
  ) {
    return (
      source |
      (target << 7) |
      (piece << 14) |
      (capture << 18) |
      (pawn << 19) |
      (enpassant << 20) |
      (castling << 21)
    );
  }

  function getMoveSource(move) {
    return move & 0x7f;
  }

  function getMoveTarget(move) {
    return (move >> 7) & 0x7f;
  }

  function getMovePromoted(move) {
    return (move >> 14) & 0xf;
  }

  function getMoveCapture(move) {
    return (move >> 18) & 0x1;
  }

  function getMovePawn(move) {
    return (move >> 19) & 0x1;
  }

  function getMoveEnpassant(move) {
    return (move >> 20) & 0x1;
  }

  function getMoveCastling(move) {
    return (move >> 21) & 0x1;
  }

  var knightOffsets = [33, 31, 18, 14, -33, -31, -18, -14];
  var bishopOffsets = [15, 17, -15, -17];
  var rookOffsets = [16, -16, 1, -1];
  var kingOffsets = [16, -16, 1, -1, 15, 17, -15, -17];

  var pawnDirections = {
    offsets: [
      [17, 15],
      [-17, -15],
    ],
    pawn: [PIECES.P, PIECES.p],
  };

  var fixedPieces = {
    knight: { offsets: knightOffsets, side: [PIECES.N, PIECES.n] },
    king: { offsets: kingOffsets, side: [PIECES.K, PIECES.k] },
  };

  var dynamicPieces = {
    bishop: {
      offsets: bishopOffsets,
      side: [
        [PIECES.B, PIECES.Q],
        [PIECES.b, PIECES.q],
      ],
    },
    rook: {
      offsets: rookOffsets,
      side: [
        [PIECES.R, PIECES.Q],
        [PIECES.r, PIECES.q],
      ],
    },
  };

  var specialMoves = {
    side: [
      {
        offset: [-17, -15],
        pawn: PIECES.P,
        target: -16,
        doubleTarget: -32,
        capture: [7, 12],
        rank7: [SQUARES.a7, SQUARES.h7],
        rank2: [SQUARES.a2, SQUARES.h2],
        promoted: [PIECES.Q, PIECES.R, PIECES.B, PIECES.N],
        king: PIECES.K,
        castling: [1, 2],
        empty: [SQUARES.f1, SQUARES.g1, SQUARES.d1, SQUARES.b1, SQUARES.c1],
        attacked: [SQUARES.e1, SQUARES.f1, SQUARES.d1],
        by: [COLORS.black, COLORS.white],
        castle: [SQUARES.e1, SQUARES.g1, SQUARES.c1],
      },
      {
        offset: [17, 15],
        pawn: PIECES.p,
        target: 16,
        doubleTarget: 32,
        capture: [1, 6],
        rank7: [SQUARES.a2, SQUARES.h2],
        rank2: [SQUARES.a7, SQUARES.h7],
        promoted: [PIECES.q, PIECES.r, PIECES.b, PIECES.n],
        king: PIECES.k,
        castling: [4, 8],
        empty: [SQUARES.f8, SQUARES.g8, SQUARES.d8, SQUARES.b8, SQUARES.c8],
        attacked: [SQUARES.e8, SQUARES.f8, SQUARES.d8],
        by: [COLORS.black, COLORS.white],
        castle: [SQUARES.e8, SQUARES.g8, SQUARES.c8],
      },
    ],
  };

  var castlingRights = [
    7,
    15,
    15,
    15,
    3,
    15,
    15,
    11,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    13,
    15,
    15,
    15,
    12,
    15,
    15,
    14,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
    PIECES.o,
  ];

  /**
   * @brief addMove adds a move to the move list
   * @param {*} moveList is the list the move is being added to
   * @param {*} move is the move that is being added
   */
  function addMove(moveList, move) {
    let moveScore = 0;

    if (getMoveCapture(move)) {
      moveScore =
        MVVLVA[board[getMoveSource(move)] * 13 + board[getMoveTarget(move)]];
      moveScore += 10000;
    } else {
      if (deadMoves[searchOne] == move) moveScore = 9000;
      else if (deadMoves[MAX_PLY + searchOne] == move) moveScore = 8000;
      else
        moveScore =
          polanMoves[board[getMoveSource(move)] * 128 + getMoveTarget(move)];
    }

    moveList.push({
      move: move,
      score: moveScore,
    });
  }

  /**
   * @brief generateMoves generates moves for the AI
   * @param {*} moveList is the list the moves are being added to
   */
  function generateMoves(moveList) {
    for (let piece = PIECES.P; piece <= PIECES.k; piece++) {
      for (let pieceIndex = 0; pieceIndex < pieceList[piece]; pieceIndex++) {
        let previousSquare = pieceList.pieces[piece * 10 + pieceIndex];

        if (board[previousSquare] == specialMoves.side[side].pawn) {
          let nextSquare = previousSquare + specialMoves.side[side].target;
          if ((nextSquare & 0x88) == 0 && board[nextSquare] == PIECES.e) {
            if (
              previousSquare >= specialMoves.side[side].rank7[0] &&
              previousSquare <= specialMoves.side[side].rank7[1]
            ) {
              for (let promotedIndex = 0; promotedIndex < 4; promotedIndex++) {
                let promotedPiece =
                  specialMoves.side[side].promoted[promotedIndex];
                addMove(
                  moveList,
                  encodeMove(
                    previousSquare,
                    nextSquare,
                    promotedPiece,
                    0,
                    0,
                    0,
                    0
                  )
                );
              }
            } else {
              addMove(
                moveList,
                encodeMove(previousSquare, nextSquare, 0, 0, 0, 0, 0)
              );
              let doubleTarget =
                previousSquare + specialMoves.side[side].doubleTarget;

              if (
                previousSquare >= specialMoves.side[side].rank2[0] &&
                previousSquare <= specialMoves.side[side].rank2[1] &&
                board[doubleTarget] == PIECES.e
              )
                addMove(
                  moveList,
                  encodeMove(previousSquare, doubleTarget, 0, 0, 1, 0, 0)
                );
            }
          }

          for (let index = 0; index < 2; index++) {
            let pawnOffset = specialMoves.side[side].offset[index];
            let nextSquare = previousSquare + pawnOffset;

            if ((nextSquare & 0x88) == 0) {
              if (
                previousSquare >= specialMoves.side[side].rank7[0] &&
                previousSquare <= specialMoves.side[side].rank7[1] &&
                board[nextSquare] >= specialMoves.side[side].capture[0] &&
                board[nextSquare] <= specialMoves.side[side].capture[1]
              ) {
                for (
                  let promotedIndex = 0;
                  promotedIndex < 4;
                  promotedIndex++
                ) {
                  let promotedPiece =
                    specialMoves.side[side].promoted[promotedIndex];
                  addMove(
                    moveList,
                    encodeMove(
                      previousSquare,
                      nextSquare,
                      promotedPiece,
                      1,
                      0,
                      0,
                      0
                    )
                  );
                }
              } else {
                if (
                  board[nextSquare] >= specialMoves.side[side].capture[0] &&
                  board[nextSquare] <= specialMoves.side[side].capture[1]
                )
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 1, 0, 0, 0)
                  );
                if (nextSquare == enpassant)
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 1, 0, 1, 0)
                  );
              }
            }
          }
        }

        // For castling
        else if (board[previousSquare] == specialMoves.side[side].king) {
          // For the king side castles
          if (castle & specialMoves.side[side].castling[0]) {
            if (
              board[specialMoves.side[side].empty[0]] == PIECES.e &&
              board[specialMoves.side[side].empty[1]] == PIECES.e
            ) {
              if (
                isSquareAttacked(
                  specialMoves.side[side].attacked[1],
                  specialMoves.side[side].by[side]
                ) == 0 &&
                isSquareAttacked(
                  specialMoves.side[side].attacked[0],
                  specialMoves.side[side].by[side]
                ) == 0
              )
                addMove(
                  moveList,
                  encodeMove(
                    specialMoves.side[side].castle[0],
                    specialMoves.side[side].castle[1],
                    0,
                    0,
                    0,
                    0,
                    1
                  )
                );
            }
          }

          // For the queen side castles
          if (castle & specialMoves.side[side].castling[1]) {
            if (
              board[specialMoves.side[side].empty[2]] == PIECES.e &&
              board[specialMoves.side[side].empty[3]] == PIECES.e &&
              board[specialMoves.side[side].empty[4]] == PIECES.e
            ) {
              if (
                isSquareAttacked(
                  specialMoves.side[side].attacked[2],
                  specialMoves.side[side].by[side]
                ) == 0 &&
                isSquareAttacked(
                  specialMoves.side[side].attacked[0],
                  specialMoves.side[side].by[side]
                ) == 0
              )
                addMove(
                  moveList,
                  encodeMove(
                    specialMoves.side[side].castle[0],
                    specialMoves.side[side].castle[2],
                    0,
                    0,
                    0,
                    0,
                    1
                  )
                );
            }
          }
        }

        // For knight and king
        for (let piece in fixedPieces) {
          if (board[previousSquare] == fixedPieces[piece].side[side]) {
            for (let index = 0; index < 8; index++) {
              let nextSquare =
                previousSquare + fixedPieces[piece].offsets[index];
              let capturedPiece = board[nextSquare];

              if ((nextSquare & 0x88) == 0) {
                if (
                  side == COLORS.white
                    ? capturedPiece == PIECES.e ||
                      (capturedPiece >= 7 && capturedPiece <= 12)
                    : capturedPiece == PIECES.e ||
                      (capturedPiece >= 1 && capturedPiece <= 6)
                ) {
                  if (capturedPiece)
                    addMove(
                      moveList,
                      encodeMove(previousSquare, nextSquare, 0, 1, 0, 0, 0)
                    );
                  else
                    addMove(
                      moveList,
                      encodeMove(previousSquare, nextSquare, 0, 0, 0, 0, 0)
                    );
                }
              }
            }
          }
        }

        // For bishop and rook
        for (let piece in dynamicPieces) {
          if (
            board[previousSquare] == dynamicPieces[piece].side[side][0] ||
            board[previousSquare] == dynamicPieces[piece].side[side][1]
          ) {
            for (var index = 0; index < 4; index++) {
              let nextSquare =
                previousSquare + dynamicPieces[piece].offsets[index];
              while (!(nextSquare & 0x88)) {
                var capturedPiece = board[nextSquare];

                if (
                  side == COLORS.white
                    ? capturedPiece >= 1 && capturedPiece <= 6
                    : capturedPiece >= 7 && capturedPiece <= 12
                )
                  break;
                if (
                  side == COLORS.white
                    ? capturedPiece >= 7 && capturedPiece <= 12
                    : capturedPiece >= 1 && capturedPiece <= 6
                ) {
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 1, 0, 0, 0)
                  );
                  break;
                }

                if (capturedPiece == PIECES.e)
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 0, 0, 0, 0)
                  );
                nextSquare += dynamicPieces[piece].offsets[index];
              }
            }
          }
        }
      }
    }
  }

  /**
   * @brief generateCaptures will be generating captures for the AI
   * @param {*} moveList is the list of moves
   */
  function generateCaptures(moveList) {
    for (let piece = PIECES.P; piece <= PIECES.k; piece++) {
      for (let pieceIndex = 0; pieceIndex < pieceList[piece]; pieceIndex++) {
        let previousSquare = pieceList.pieces[piece * 10 + pieceIndex];

        // If the piece is a pawn
        if (board[previousSquare] == specialMoves.side[side].pawn) {
          let nextSquare = previousSquare + specialMoves.side[side].target;
          for (let index = 0; index < 2; index++) {
            let pawnOffset = specialMoves.side[side].offset[index];
            let nextSquare = previousSquare + pawnOffset;

            if ((nextSquare & 0x88) == 0) {
              if (
                previousSquare >= specialMoves.side[side].rank7[0] &&
                previousSquare <= specialMoves.side[side].rank7[1] &&
                board[nextSquare] >= specialMoves.side[side].capture[0] &&
                board[nextSquare] <= specialMoves.side[side].capture[1]
              ) {
                for (
                  let promotedIndex = 0;
                  promotedIndex < 4;
                  promotedIndex++
                ) {
                  let promotedPiece =
                    specialMoves.side[side].promoted[promotedIndex];
                  addMove(
                    moveList,
                    encodeMove(
                      previousSquare,
                      nextSquare,
                      promotedPiece,
                      1,
                      0,
                      0,
                      0
                    )
                  );
                }
              } else {
                if (
                  board[nextSquare] >= specialMoves.side[side].capture[0] &&
                  board[nextSquare] <= specialMoves.side[side].capture[1]
                )
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 1, 0, 0, 0)
                  );
                if (nextSquare == enpassant)
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 1, 0, 1, 0)
                  );
              }
            }
          }
        }
        for (let piece in fixedPieces) {
          if (board[previousSquare] == fixedPieces[piece].side[side]) {
            for (let index = 0; index < 8; index++) {
              let nextSquare =
                previousSquare + fixedPieces[piece].offsets[index];
              let capturedPiece = board[nextSquare];

              if ((nextSquare & 0x88) == 0) {
                if (
                  side == COLORS.white
                    ? capturedPiece == PIECES.e ||
                      (capturedPiece >= 7 && capturedPiece <= 12)
                    : capturedPiece == PIECES.e ||
                      (capturedPiece >= 1 && capturedPiece <= 6)
                ) {
                  if (capturedPiece)
                    addMove(
                      moveList,
                      encodeMove(previousSquare, nextSquare, 0, 1, 0, 0, 0)
                    );
                }
              }
            }
          }
        }

        for (let piece in dynamicPieces) {
          if (
            board[previousSquare] == dynamicPieces[piece].side[side][0] ||
            board[previousSquare] == dynamicPieces[piece].side[side][1]
          ) {
            for (var index = 0; index < 4; index++) {
              let nextSquare =
                previousSquare + dynamicPieces[piece].offsets[index];
              while (!(nextSquare & 0x88)) {
                var capturedPiece = board[nextSquare];

                if (
                  side == COLORS.white
                    ? capturedPiece >= 1 && capturedPiece <= 6
                    : capturedPiece >= 7 && capturedPiece <= 12
                )
                  break;
                if (
                  side == COLORS.white
                    ? capturedPiece >= 7 && capturedPiece <= 12
                    : capturedPiece >= 1 && capturedPiece <= 6
                ) {
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 1, 0, 0, 0)
                  );
                  break;
                }

                nextSquare += dynamicPieces[piece].offsets[index];
              }
            }
          }
        }
      }
    }
  }

  /**
   * @brief generateLegalMoves will be generating legal moves for the AI
   * @return {Array} legalMoves is the list of legal moves
   */
  function generateLegalMoves() {
    let legalMoves = [];
    let moveList = [];

    clearSearch();
    generateMoves(moveList);

    for (let count = 0; count < moveList.length; count++) {
      if (makeMove(moveList[count].move) == 0) continue;
      legalMoves.push(moveList[count]);
      takeBack();
    }

    return legalMoves;
  }

  /**
   * @brief moveCurrentPiece will be moving the current piece
   * @param {*} piece is the piece to be moved
   * @param {*} previousSquare is the previous square of the piece
   * @param {*} nextSquare is the next square of the piece
   */
  function moveCurrentPiece(piece, previousSquare, nextSquare) {
    board[nextSquare] = board[previousSquare];
    board[previousSquare] = PIECES.e;
    hashKey ^= pieceKeys[piece * 128 + previousSquare];
    hashKey ^= pieceKeys[piece * 128 + nextSquare];

    for (let pieceIndex = 0; pieceIndex < pieceList[piece]; pieceIndex++) {
      if (pieceList.pieces[piece * 10 + pieceIndex] == previousSquare) {
        pieceList.pieces[piece * 10 + pieceIndex] = nextSquare;
        break;
      }
    }
  }

  /**
   * @brief removePiece will be taking back the move
   * @param {*} piece is the piece to be removed
   * @param {*} square is the square of the piece
   */
  function removePiece(piece, square) {
    for (let pieceIndex = 0; pieceIndex < pieceList[piece]; pieceIndex++) {
      if (pieceList.pieces[piece * 10 + pieceIndex] == square) {
        var capturedIndex = pieceIndex;
        break;
      }
    }

    pieceList[piece]--;
    pieceList.pieces[piece * 10 + capturedIndex] =
      pieceList.pieces[piece * 10 + pieceList[piece]];
  }

  /**
   * @brief addPiece will be adding the piece
   * @param {*} piece is the piece to be added
   * @param {*} square is the square of the piece
   */
  function addPiece(piece, square) {
    board[square] = piece;
    hashKey ^= pieceKeys[piece * 128 + square];
    pieceList.pieces[piece * 10 + pieceList[piece]] = square;
    pieceList[piece]++;
  }

  /**
   * @brief makeMove will be making the move
   * @param {*} move is the move to be made
   * @return {boolean} true if the move is legal, 0 if the move is illegal
   */
  function makeMove(move) {
    // Updates the plies
    searchOne++;
    gameOne++;

    // Updates the repition table
    repetitionTable[gameOne] = hashKey;

    // Parsing the moves to a string
    let previousSquare = getMoveSource(move);
    let nextSquare = getMoveTarget(move);
    let promotedPiece = getMovePromoted(move);
    let capturedPiece = board[nextSquare];

    // The movesStack board state variables
    movesStack.push({
      move: move,
      capturedPiece: 0,
      side: side,
      enpassant: enpassant,
      castle: castle,
      fifty: fifty,
      hash: hashKey,
    });

    // Moves the current piece from the source square to the target square
    moveCurrentPiece(board[previousSquare], previousSquare, nextSquare);

    // Updating the fifty move rule
    fifty++;

    // If the current piece is capturing something, this will remove the captured piece from the board
    if (getMoveCapture(move)) {
      if (capturedPiece) {
        movesStack[movesStack.length - 1].capturedPiece = capturedPiece;
        hashKey ^= pieceKeys[capturedPiece * 128 + nextSquare];
        removePiece(capturedPiece, nextSquare);
      }
      fifty = 0;
    }

    // If the piece is a pawn, assign the fifty move rule value back to 0
    else if (board[nextSquare] == PIECES.P || board[nextSquare] == PIECES.p)
      fifty = 0;

    // Updating the enpassant square
    if (enpassant != SQUARES.noEnpassant) hashKey ^= pieceKeys[enpassant];
    enpassant = SQUARES.noEnpassant;

    if (getMovePawn(move)) {
      // If the side is white and the piece is a pawn
      if (side == COLORS.white) {
        enpassant = nextSquare + 16;
        hashKey ^= pieceKeys[nextSquare + 16];
      }
      // If the side is black and the piece is a pawn
      else {
        enpassant = nextSquare - 16;
        hashKey ^= pieceKeys[nextSquare - 16];
      }
    }

    // Checking whether the move with the pawn was enpassant
    else if (getMoveEnpassant(move)) {
      // enpassant for white
      if (side == COLORS.white) {
        board[nextSquare + 16] = PIECES.e;
        hashKey ^= pieceKeys[PIECES.p * 128 + nextSquare + 16];
        removePiece(PIECES.p, nextSquare + 16);
      }
      // enpassant for black
      else {
        board[nextSquare - 16] = PIECES.e;
        hashKey ^= pieceKeys[PIECES.P * 128 + (nextSquare - 16)];
        removePiece(PIECES.P, nextSquare - 16);
      }
    }

    // If the move was a castle
    else if (getMoveCastling(move)) {
      switch (nextSquare) {
        case SQUARES.g1:
          moveCurrentPiece(PIECES.R, SQUARES.h1, SQUARES.f1);
          break;
        case SQUARES.c1:
          moveCurrentPiece(PIECES.R, SQUARES.a1, SQUARES.d1);
          break;
        case SQUARES.g8:
          moveCurrentPiece(PIECES.r, SQUARES.h8, SQUARES.f8);
          break;
        case SQUARES.c8:
          moveCurrentPiece(PIECES.r, SQUARES.a8, SQUARES.d8);
          break;
      }
    }

    if (promotedPiece) {
      // If the side that is promoting is white
      if (side == COLORS.white) {
        // Updating the hash key
        hashKey ^= pieceKeys[PIECES.P * 128 + nextSquare];
        removePiece(PIECES.P, nextSquare);
        // Remove the white pawn from the square it was last on
      }
      // If the side that is promoting is black
      else {
        // Updating the hash key
        hashKey ^= pieceKeys[PIECES.p * 128 + nextSquare];
        // Remove the black pawn from the square it was last on
        removePiece(PIECES.p, nextSquare);
      }
      // Adding the promoted piece to the ssquare the pawn was last on
      // The promoted piece will depend on the user's settings
      addPiece(promotedPiece, nextSquare);
    }

    // Here we are updating the king square
    if (board[nextSquare] == PIECES.K || board[nextSquare] == PIECES.k)
      kingSquare[side] = nextSquare;

    // Updating castle rights
    hashKey ^= castleKeys[castle];
    castle &= castlingRights[previousSquare];
    castle &= castlingRights[nextSquare];
    hashKey ^= castleKeys[castle];

    side ^= 1;

    hashKey ^= sideKey;

    if (
      isSquareAttacked(
        side == COLORS.white ? kingSquare[side ^ 1] : kingSquare[side ^ 1],
        side
      )
    ) {
      takeBack();
      return 0;
    } else return 1;
  }

  /**
   * @brief takeBack will be taking back the move
   */
  function takeBack() {
    // Updates our plies
    searchOne--;
    gameOne--;

    // Parsing the move to a string
    let moveIndex = movesStack.length - 1,
      move = movesStack[moveIndex].move,
      previousSquare = getMoveSource(move),
      nextSquare = getMoveTarget(move);

    // Moving the piece from the source square to the target square
    moveCurrentPiece(board[nextSquare], nextSquare, previousSquare);

    // Restores the captured piece
    if (getMoveCapture(move)) {
      addPiece(movesStack[moveIndex].capturedPiece, nextSquare);
    }

    // If the move was enppassant
    if (getMoveEnpassant(move)) {
      // Check if the side was white
      if (side == COLORS.white) addPiece(PIECES.P, nextSquare - 16);
      // Add a black pawn to the square that was captured
      else addPiece(PIECES.p, nextSquare + 16);
    }

    // If the move was a castle
    else if (getMoveCastling(move)) {
      // Handle the different castling moves, depending on whether it was queen side, king side, and the side that was castling
      switch (nextSquare) {
        case SQUARES.g1:
          moveCurrentPiece(PIECES.R, SQUARES.f1, SQUARES.h1);
          break;
        case SQUARES.c1:
          moveCurrentPiece(PIECES.R, SQUARES.d1, SQUARES.a1);
          break;
        case SQUARES.g8:
          moveCurrentPiece(PIECES.r, SQUARES.f8, SQUARES.h8);
          break;
        case SQUARES.c8:
          moveCurrentPiece(PIECES.r, SQUARES.d8, SQUARES.a8);
          break;
      }
    }

    // Check if the move was a promotion
    else if (getMovePromoted(move)) {
      side == COLORS.white
        ? addPiece(PIECES.p, previousSquare)
        : addPiece(PIECES.P, previousSquare);
      removePiece(getMovePromoted(move), previousSquare);
    }

    // Updating the king square
    if (board[previousSquare] == PIECES.K || board[previousSquare] == PIECES.k)
      kingSquare[side ^ 1] = previousSquare;

    side = movesStack[moveIndex].side;

    // Restoring the board state variables
    enpassant = movesStack[moveIndex].enpassant;
    castle = movesStack[moveIndex].castle;
    hashKey = movesStack[moveIndex].hash;
    fifty = movesStack[moveIndex].fifty;

    movesStack.pop();
  }

  /**
   * @brief makeNullMove will make a null move
   */
  function makeNullMove() {
    // Backing up the current board state
    movesStack.push({
      move: 0,
      capturedPiece: 0,
      side: side,
      enpassant: enpassant,
      castle: castle,
      fifty: fifty,
      hash: hashKey,
    });

    if (enpassant != SQUARES.noEnpassant) hashKey ^= pieceKeys[enpassant];
    enpassant = SQUARES.noEnpassant;
    fifty = 0;
    side ^= 1;

    hashKey ^= sideKey;
  }

  /**
   * @brief takeNullMove will take back a null move
   */
  function takeNullMove() {
    // Restoring the board state
    side = movesStack[movesStack.length - 1].side;
    enpassant = movesStack[movesStack.length - 1].enpassant;
    castle = movesStack[movesStack.length - 1].castle;
    fifty = movesStack[movesStack.length - 1].fifty;
    hashKey = movesStack[movesStack.length - 1].hash;
    movesStack.pop();
  }

  /**
   * @brief isMaterialDraw will check if the game is a draw due to insufficient material
   * @return {boolean} true if the game is a draw due to insufficient material, false otherwise
   */
  function isMaterialDraw() {
    // Check if there are any pawns for both sides
    if (pieceList[PIECES.P] == 0 && pieceList[PIECES.p] == 0) {
      // If there are no pawns, check if there are any queens and rooks for both sides
      if (
        pieceList[PIECES.R] == 0 &&
        pieceList[PIECES.r] == 0 &&
        pieceList[PIECES.Q] == 0 &&
        pieceList[PIECES.q] == 0
      ) {
        // If there aren't any, check if the number of the bishops on the board for both sides is equal to 0
        if (pieceList[PIECES.B] == 0 && pieceList[PIECES.b] == 0) {
          // If there are no bishops, check if the number of knights on the board for either side is less than 3, if it is, then return true when the function is called
          if (pieceList[PIECES.N] < 3 && pieceList[PIECES.n] < 3) return 1;
        }
        // If there are no knights, check the number of bushops on the board
        else if (pieceList[PIECES.N] == 0 && pieceList[PIECES.n] == 0) {
          // If the value of the number of bishops for any side subtracted the number of bishops for the other
          // side is less than 2, we also want to return true for the function if it is called
          if (Math.abs(pieceList[PIECES.B] - pieceList[PIECES.b]) < 2) return 1;
        }
        // If there is less than 3 knights and no bishops, or if there is 1 bishop and no knights
        else if (
          (pieceList[PIECES.N] < 3 && pieceList[PIECES.B] == 0) ||
          (pieceList[PIECES.B] == 1 && pieceList[PIECES.N] == 0)
        ) {
          // Check the number of bishops for the other side specifically we're checking if there is less than 3 knights and no bishops, or if there is 1 bishop and no knights
          if (
            (pieceList[PIECES.n] < 3 && pieceList[PIECES.b] == 0) ||
            (pieceList[PIECES.b] == 1 && pieceList[PIECES.n] == 0)
          )
            // Return true for the function when it's called
            return 1;
        }
      }
      // If there are no queens, check if there are any rooks
      else if (pieceList[PIECES.Q] == 0 && pieceList[PIECES.q] == 0) {
        // If each side has 1 rook, check if there are any knights or bishops on the board
        if (pieceList[PIECES.R] == 1 && pieceList[PIECES.r] == 1) {
          // If the number of knights and bishops for each side is less than 2, return true for the function when it's called
          if (
            pieceList[PIECES.N] + pieceList[PIECES.B] < 2 &&
            pieceList[PIECES.n] + pieceList[PIECES.b] < 2
          )
            return 1;
        }
        // If there is 1 rook for each side, check if there are any knights or bishops on the board
        else if (pieceList[PIECES.R] == 1 && pieceList[PIECES.r] == 0) {
          if (
            pieceList[PIECES.N] + pieceList[PIECES.B] == 0 &&
            (pieceList[PIECES.n] + pieceList[PIECES.b] == 1 ||
              pieceList[PIECES.n] + pieceList[PIECES.b] == 2)
          )
            // Return true if the function is called
            return 1;
        }
        // If one side has a rook but the other does not, check if there are any knights or bishops on the board
        else if (pieceList[PIECES.r] == 1 && pieceList[PIECES.R] == 0) {
          // Checking if the sum of the bishops and knights on the side with the rook are 0 and if
          // the sum of the bishops and knights on the side without the rook is 1 or 2
          if (
            pieceList[PIECES.n] + pieceList[PIECES.b] == 0 &&
            (pieceList[PIECES.N] + pieceList[PIECES.B] == 1 ||
              pieceList[PIECES.N] + pieceList[PIECES.B] == 2)
          )
            // Return true if the function is called
            return 1;
        }
      }
    }
    return 0;
  }

  /**
   * @brief getGamePhase will return the phase of the game
   * @return {number} 0 if the game is in the opening phase, 1 if the game is in the endgame phase
   */
  function getGamePhase() {
    // return endgame if there are no queens on board
    if (pieceList[PIECES.Q] == 0 || pieceList[PIECES.q] == 0) return 1;

    // Initialize phaseScore to 0
    let phaseScore = 0;
    // The next 2 for loops will be adding the score of the material for each side to the phaseScore variable
    // It will be using the values stated earlier in the file
    for (let piece = PIECES.N; piece <= PIECES.Q; piece++)
      phaseScore += pieceList[piece] * MATERIAL_WEIGHTS[piece];
    for (let piece = PIECES.n; piece <= PIECES.q; piece++)
      phaseScore += pieceList[piece] * -MATERIAL_WEIGHTS[piece];

    // phaseScore value:
    // greater than 2460, return opening
    // lower than 2460, return endgame
    return phaseScore > 2460 ? 0 : 1;
  }

  /**
   * @brief evalue will evaluate the score of the game
   * @return {number} the score of the game
   */
  function evaluate() {
    // If true, engine does not evaluate a move as the game is over
    if (isMaterialDraw()) return 0;

    // Initializing a score of 0
    let score = 0;

    // Initializing a variable called phase as the getGamePhase boolean function
    let phase = getGamePhase();

    for (let piece = PIECES.P; piece <= PIECES.k; piece++) {
      for (pieceIndex = 0; pieceIndex < pieceList[piece]; pieceIndex++) {
        let square = pieceList.pieces[piece * 10 + pieceIndex];

        // Evaluating the score of the game
        score += MATERIAL_WEIGHTS[piece];

        // Evaluating the positional score of the game
        switch (piece) {
          case PIECES.P:
            score += PST_PAWNS[square];
            break;
          case PIECES.N:
            score += PST_KNIGHTS[square];
            break;
          case PIECES.B:
            score += PST_BISHOPS[square];
            break;
          case PIECES.R:
            score += PST_ROOKS[square];
            break;
          case PIECES.Q:
            score += PST_QUEENS[square];
            break;
          case PIECES.K:
            score += PST_KINGS[phase][square];
            break;

          case PIECES.p:
            score -= PST_PAWNS[MIRRORED[square]];
            break;
          case PIECES.n:
            score -= PST_KNIGHTS[MIRRORED[square]];
            break;
          case PIECES.b:
            score -= PST_BISHOPS[MIRRORED[square]];
            break;
          case PIECES.r:
            score -= PST_ROOKS[MIRRORED[square]];
            break;
          case PIECES.q:
            score -= PST_QUEENS[MIRRORED[square]];
            break;
          case PIECES.k:
            score -= PST_KINGS[phase][MIRRORED[square]];
            break;
        }
      }
    }

    score = Math.round((score * (100 - fifty)) / 100);

    // Return the score as normal if white is playing, and negative if black is playing
    return side == COLORS.white ? score : -score;
  }

  // Search variables
  var followPV;

  // PV table (principal variation)
  var pvTable = new Array(MAX_PLY * MAX_PLY);
  var pvLength = new Array(MAX_PLY);

  // Move ordering (Heuristics)
  var deadMoves = new Array(2 * MAX_PLY);
  var polanMoves = new Array(13 * 128);

  // Repetition table
  var repetitionTable = new Array(1000);

  // Time control handling
  var timing = {
    timeSet: 0,
    stopTime: 0,
    stopped: 0,
    time: -1,
  };

  /**
   * @brief setTimeControl is a function that will set the time control
   */
  function setTimeControl(timeControl) {
    timing = timeControl;
  }

  /**
   * @brief resetTimeControl is a function that will reset the time control
   */
  function resetTimeControl() {
    timing = {
      timeSet: 0,
      stopTime: 0,
      stopped: 0,
      time: -1,
    };
  }

  /**
   * @brief clearSearch is a function that will clear the search
   */
  function clearSearch() {
    // Resetting the nodes counter back to 0
    nodes = 0;
    // Setting the time it stopped at back to 0
    timing.stopped = 0;
    // Resetting the search depth back to 0
    searchOne = 0;

    // Resetting the PV table
    for (let index = 0; index < pvTable.length; index++) pvTable[index] = 0;
    for (let index = 0; index < pvLength.length; index++) pvLength[index] = 0;
    for (let index = 0; index < deadMoves.length; index++) deadMoves[index] = 0;
    for (let index = 0; index < polanMoves.length; index++)
      polanMoves[index] = 0;
  }

  /**
   * @brief checkTime is a function that will check how long the search has been running for
   */
  function checkTime() {
    if (timing.timeSet == 1 && new Date().getTime() > timing.stopTime)
      timing.stopped = 1;
  }

  /**
   * @brief isRepition is a function that will check if the current position is a repetition
   */
  function isRepetition() {
    for (let index = 0; index < gameOne; index++)
      // Checking if the repetition table is equal to the current hash key
      if (repetitionTable[index] == hashKey) return 1;
    return 0;
  }

  /**
   * @brief sortMoves is a function that will sort the moves
   * @param {*} currentCount is the current move count
   * @param {*} moveList is the list of moves
   */
  function sortMoves(currentCount, moveList) {
    for (
      let nextCount = currentCount + 1;
      nextCount < moveList.length;
      nextCount++
    ) {
      // Checking if the score of the current move is less than the score of the next move
      if (moveList[currentCount].score < moveList[nextCount].score) {
        // Make a temporary variable tempMove the current move
        let tempMove = moveList[currentCount];
        // Swao the moves
        moveList[currentCount] = moveList[nextCount];
        moveList[nextCount] = tempMove;
      }
    }
  }

  /**
   * @brief sortPVMoves is a function that will sort the PV (principal variation) moves
   * @param {*} moveList is the list of moves
   */
  function sortPVMoves(moveList) {
    if (followPV) {
      followPV = 0;
      for (let count = 0; count < moveList.length; count++) {
        // If the movelist at the current count is equal to the PV table at the current search depth
        if (moveList[count].move == pvTable[searchOne]) {
          // Make followPV equal to 1
          followPV = 1;
          // Change the score of the current move in the list to 20000
          moveList[count].score = 20000;
          // Break out of the loop once done
          break;
        }
      }
    }
  }

  /**
   * @brief storePVMoves will be responsible for storing the PV moves
   * @param {*} move is the move to be stored
   */
  function storePVMoves(move) {
    pvTable[searchOne * 64 + searchOne] = move;
    for (
      var nextOne = searchOne + 1;
      nextOne < pvLength[searchOne + 1];
      nextOne++
    )
      pvTable[searchOne * 64 + nextOne] =
        pvTable[(searchOne + 1) * 64 + nextOne];
    pvLength[searchOne] = pvLength[searchOne + 1];
  }

  /**
   * @brief QuiescenceSearch is a recursive function that will be responsible for the Quiescence search
   * @param {*} alpha is the alpha value
   * @param {*} beta is the beta value
   * @return {number} the alpha value
   * @return {number} the beta value
   *
   */
  function QuiescenceSearch(alpha, beta) {
    pvLength[searchOne] = searchOne;
    // Increment the nodes searched by one
    nodes++;

    // If the nodes searched is equal to 2047 check the remaining time in the evaluation time
    if ((nodes & 2047) == 0) checkTime();

    // If the search depth is greater than the maximum ply return the evaluation
    if (searchOne > MAX_PLY - 1) return evaluate();

    // Creating a variable equal to the evaluation function
    let evaluation = evaluate();

    if (evaluation >= beta) return beta;

    if (evaluation > alpha) alpha = evaluation;

    // Making the moveList array
    var moveList = [];

    // Adding captures to the move list
    generateCaptures(moveList);

    // Sorting the PV moves in the move list
    sortPVMoves(moveList);

    // Looping over the moves in the move list
    for (var count = 0; count < moveList.length; count++) {
      // Sorting the moves in the move list
      sortMoves(count, moveList);

      // Creating a variable called move equal to the move in the move list
      let move = moveList[count].move;

      // If the move is equal to 0, continue
      if (makeMove(move) == 0) continue;

      // Creating a variable called score equal to the QuiescenceSearch function
      var score = -QuiescenceSearch(-beta, -alpha);

      // Taking back the move
      takeBack();

      // If the time is up, return 0 to show that the search is over
      if (timing.stopped) return 0;

      // If the score is greater than the value of alpha, store the PV moves
      // and make the value of alpha equal to the value of score
      if (score > alpha) {
        storePVMoves(move);
        alpha = score;

        // If the score is greater than or equal to the value of beta,
        // return the value of beta
        if (score >= beta) return beta;
      }
    }

    return alpha;
  }

  /**
   * @brief Negamax is a recursive function that will be responsible for the Negamax search
   * @param {*} alpha is the alpha value
   * @param {*} beta is the beta value
   * @param {*} depth is the depth of the search
   * @param {*} nullMove is the null move
   * @return {number} the alpha value if the score is less than or equal to the alpha value
   * @return {number} the beta value if the score is greater than or equal to the beta value
   */
  function Negamax(alpha, beta, depth, nullMove) {
    pvLength[searchOne] = searchOne;

    // Initializing the variables
    let score = 0,
      pvNode = beta - alpha > 1,
      futilityPruning = 0;

    // If the nodes searched is equal to 2047 check the remaining time in the evaluation time
    if ((nodes & 2047) == 0) checkTime();

    // If both the searchOne is 1 or true and the isRepition function is true or the count for the
    // fifty move rule is greater than 0, we return 0
    if ((searchOne && isRepetition()) || fifty >= 100) return 0;

    // If the depth is equal to 0, we increase the amount of nodes searched and return the QuiescenceSearch function
    if (depth == 0) {
      nodes++;
      return QuiescenceSearch(alpha, beta);
    }

    // Mate distance pruning
    if (alpha < -MATE_VALUE) alpha = -MATE_VALUE;

    if (beta > MATE_VALUE - 1) beta = MATE_VALUE - 1;

    if (alpha >= beta) return alpha;

    let legalMoves = 0,
      inCheck = isSquareAttacked(kingSquare[side], side ^ 1);

    if (inCheck) depth++;

    if (inCheck == 0 && pvNode == 0) {
      // Static evaluation for pruning purposes
      let staticEval = evaluate();

      // Evaluation Pruning
      if (depth < 3 && Math.abs(beta - 1) > -MATE_VALUE + 100) {
        let evalMargin = 120 * depth;
        if (staticEval - evalMargin >= beta) return staticEval - evalMargin;
      }

      if (nullMove) {
        // Nullmove Pruning
        if (
          searchOne &&
          depth > 2 &&
          getGamePhase() != 1 &&
          staticEval >= beta
        ) {
          makeNullMove();
          score = -Negamax(-beta, -beta + 1, depth - 1 - 2, NO_NULL);
          takeNullMove();
          if (timing.stopped) return 0;
          if (score >= beta) return beta;
        }

        // Razoring - removed as caused engine to miss moves that have a delayed but significant effect on the position
        /*
        if (depth < 4) {
          score = staticEval + 125;
          let newScore;

          if (score < beta) {
            if (depth == 1) {
              newScore = QuiescenceSearch(alpha, beta);
              return newScore > score ? newScore : score;
            }
          }

          score += 175;

          if (score < beta && depth < 3) {
            newScore = QuiescenceSearch(alpha, beta);
            if (newScore < beta) return newScore > score ? newScore : score;
          }
        }
        */
      }

      // Futility Condition
      let futilityMargin = [0, 200, 300, 500];

      if (
        depth < 4 &&
        Math.abs(alpha) < 9000 &&
        staticEval + futilityMargin[depth] <= alpha
      )
        futilityPruning = 1;
    }

    let movesSearched = 0;
    let moveList = [];
    generateMoves(moveList);

    // Sorting the PV moves
    sortPVMoves(moveList);

    // Looping over the moves
    for (let count = 0; count < moveList.length; count++) {
      sortMoves(count, moveList);
      let move = moveList[count].move;
      if (makeMove(move) == 0) continue;
      legalMoves++;

      // Futility Pruning
      if (
        futilityPruning &&
        movesSearched &&
        getMoveCapture(move) == 0 &&
        getMovePromoted(move) == 0 &&
        isSquareAttacked(kingSquare[side], side ^ 1) == 0
      ) {
        takeBack();
        continue;
      }

      if (movesSearched == 0)
        score = -Negamax(-beta, -alpha, depth - 1, DO_NULL);
      else {
        // LMR (Late Move Reductions)
        // The following is used to reduce the depth of the search if the move is not a capture
        if (
          pvNode == 0 &&
          movesSearched > 3 &&
          depth > 2 &&
          inCheck == 0 &&
          (getMoveSource(move) != getMoveSource(deadMoves[searchOne]) ||
            getMoveTarget(move) != getMoveTarget(deadMoves[searchOne])) &&
          (getMoveSource(move) !=
            getMoveSource(deadMoves[MAX_PLY + searchOne]) ||
            getMoveTarget(move) !=
              getMoveTarget(deadMoves[MAX_PLY + searchOne])) &&
          getMoveCapture(move) == 0 &&
          getMovePromoted(move) == 0
        ) {
          score = -Negamax(-alpha - 1, -alpha, depth - 2, DO_NULL);
        } else score = alpha + 1;

        // PVS (Principal Variation Search)
        if (score > alpha) {
          score = -Negamax(-alpha - 1, -alpha, depth - 1, DO_NULL);
          if (score > alpha && score < beta)
            score = -Negamax(-beta, -alpha, depth - 1, DO_NULL);
        }
      }
      takeBack();

      movesSearched++;

      if (timing.stopped) return 0;
      if (score > alpha) {
        alpha = score;
        storePVMoves(move);

        // Storing the polan moves
        if (getMoveCapture(move) == 0)
          polanMoves[board[getMoveSource(move)] * 128 + getMoveTarget(move)] +=
            depth;

        if (score >= beta) {
          // storing the dead moves
          if (getMoveCapture(move) == 0) {
            deadMoves[MAX_PLY + searchOne] = deadMoves[searchOne];
            deadMoves[searchOne] = move;
          }

          return beta;
        }
      }
    }

    // Checking whether checkmate or stalemate
    if (legalMoves == 0) {
      if (inCheck) return -MATE_VALUE + searchOne;
      else return 0;
    }

    return alpha;
  }

  /**
   * @brief searchPosition
   * @param {*} depth is the depth of the search
   */
  function searchPosition(depth) {
    let lastBestMove = 0;

    clearSearch();

    // Iterative Deepening
    for (let currentDepth = 1; currentDepth <= depth; currentDepth++) {
      lastBestMove = pvTable[0];
      followPV = 1;
      score = Negamax(-INFINITY, INFINITY, currentDepth, DO_NULL);

      // If the time is up, we stop searching
      if (
        timing.stopped ||
        (new Date().getTime() > timing.stopTime && timing.time != -1)
      )
        break;

      if (typeof document != "undefined") {
        document.getElementById("depth").innerHTML = currentDepth;
      }
    }

    let bestMove = timing.stopped ? lastBestMove : pvTable[0];
    return bestMove;
  }

  // Castling variables
  var KC = 1,
    QC = 2,
    kc = 4,
    qc = 8;

  // Decoding promoted pieces
  var promotedPieces = {
    [PIECES.Q]: "q",
    [PIECES.R]: "r",
    [PIECES.B]: "b",
    [PIECES.N]: "n",
    [PIECES.q]: "q",
    [PIECES.r]: "r",
    [PIECES.b]: "b",
    [PIECES.n]: "n",
  };

  // Encode ascii pieces
  var charPieces = {
    P: PIECES.P,
    N: PIECES.N,
    B: PIECES.B,
    R: PIECES.R,
    Q: PIECES.Q,
    K: PIECES.K,
    p: PIECES.p,
    n: PIECES.n,
    b: PIECES.b,
    r: PIECES.r,
    q: PIECES.q,
    k: PIECES.k,
  };

  /**
   * @brief setBoard sets the board position given the FEN string
   * @param {*} fen is the FEN string
   */
  function setBoard(fen) {
    resetBoard();
    var index = 0;

    // Check if the fen is empty
    if (fen == "")
      // Setting as default to avoid errors
      fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    // Parsing the board position
    for (var rank = 0; rank < 8; rank++) {
      for (var file = 0; file < 16; file++) {
        var square = rank * 16 + file;
        if ((square & 0x88) == 0) {
          if (
            (fen[index].charCodeAt() >= "a".charCodeAt() &&
              fen[index].charCodeAt() <= "z".charCodeAt()) ||
            (fen[index].charCodeAt() >= "A".charCodeAt() &&
              fen[index].charCodeAt() <= "Z".charCodeAt())
          ) {
            if (fen[index] == "K") kingSquare[COLORS.white] = square;
            else if (fen[index] == "k") kingSquare[COLORS.black] = square;
            board[square] = charPieces[fen[index]];
            index++;
          }
          if (
            fen[index].charCodeAt() >= "0".charCodeAt() &&
            fen[index].charCodeAt() <= "9".charCodeAt()
          ) {
            var offset = fen[index] - "0";
            if (!board[square]) file--;
            file += offset;
            index++;
          }
          if (fen[index] == "/") index++;
        }
      }
    }

    // Parsing side to move
    index++;
    side = fen[index] == "w" ? COLORS.white : COLORS.black;
    index += 2;

    // Parsing castling rights
    while (fen[index] != " ") {
      switch (fen[index]) {
        case "K":
          castle |= KC;
          break;
        case "Q":
          castle |= QC;
          break;
        case "k":
          castle |= kc;
          break;
        case "q":
          castle |= qc;
          break;
        case "-":
          break;
      }

      index++;
    }

    index++;

    // Parsing enpassant square
    if (fen[index] != "-") {
      var file = fen[index].charCodeAt() - "a".charCodeAt();
      var rank = 8 - (fen[index + 1].charCodeAt() - "0".charCodeAt());
      enpassant = rank * 16 + file;
    } else enpassant = SQUARES.noEnpassant;

    // Parsing 50 rule move counter
    fifty = parseInt(fen.slice(index, fen.length - 1).split(" ")[1]);

    // Parsing full move counter
    gameOne = parseInt(fen.slice(index, fen.length + 1).split(" ")[2]) * 2;

    // Generate unique position identifier
    hashKey = generateHashKey();

    initializePieceList();
  }
  function loadMoves(moves) {
    moves = moves.split(" ");

    for (let index = 0; index < moves.length; index++) {
      let move = moves[index];
      let validMove = moveFromString(move);
      if (validMove) makeMove(validMove);
    }

    searchOne = 0;
  }

  function moveToString(move) {
    if (getMovePromoted(move)) {
      return (
        COORDINATES[getMoveSource(move)] +
        COORDINATES[getMoveTarget(move)] +
        promotedPieces[getMovePromoted(move)]
      );
    } else {
      return (
        COORDINATES[getMoveSource(move)] + COORDINATES[getMoveTarget(move)]
      );
    }
  }

  // GUI VARIABLES
  if (typeof document != "undefined") {
    var LIGHT_SQUARE = "#C7C7C7";
    var DARK_SQUARE = "#71828F";
    var SELECT_COLOR = "#B4CDB6";
    var NEXT_COLOR = "#E16A55";
    var PREV_COLOR = "#E16A55";

    // Square size
    var SQUARE_WIDTH = 75;
    var SQUARE_HEIGHT = 75;

    // Overriding board appearance
    if (sizeOfBoard) {
      SQUARE_WIDTH = sizeOfBoard / 8;
      SQUARE_HEIGHT = sizeOfBoard / 8;
    }
    if (lightSquare) {
      LIGHT_SQUARE = lightSquare;
    }
    if (darkSquare) {
      DARK_SQUARE = darkSquare;
    }
    if (selectionColor) {
      SELECT_COLOR = selectionColor;
    }
    if (nextSquareColor) {
      NEXT_COLOR = nextSquareColor;
    }
    if (previousSquareColor) {
      PREV_COLOR = previousSquareColor;
    }

    var flip = 0;

    function flipBoard() {
      flip ^= 1;
    }

    /**
     * @brief drawBoard draws the board in the HTML page
     */
    function drawBoard() {
      var chessBoard = '<table align="center" cellspacing="0">';

      // The board table
      for (var row = 0; row < 8; row++) {
        chessBoard += "<tr>";
        for (var col = 0; col < 16; col++) {
          var file, rank;
          if (flip) {
            file = 16 - 1 - col;
            rank = 8 - 1 - row;
          } else {
            file = col;
            rank = row;
          }

          var square = rank * 16 + file;

          if ((square & 0x88) == 0)
            chessBoard +=
              '<td align="center" id="' +
              square +
              '" bgcolor="' +
              ((file + rank) % 2 ? DARK_SQUARE : LIGHT_SQUARE) +
              '" width="' +
              SQUARE_WIDTH +
              'px" height="' +
              SQUARE_HEIGHT +
              'px" ' +
              ' onclick="tapPiece(this.id)" ' +
              ' ondragstart="dragPiece(event, this.id)" ' +
              ' ondragover="dragOver(event, this.id)"' +
              ' ondrop="dropPiece(event, this.id)"' +
              "></td>";
        }

        chessBoard += "</tr>";
      }

      chessBoard += "</table>";
      document.getElementById("chessboard").innerHTML = chessBoard;
    }

    /**
     * @brief updateBoard updates the board
     */
    function updateBoard() {
      for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 16; col++) {
          var square = row * 16 + col;
          if ((square & 0x88) == 0) {
            var squareElement = document.getElementById(square);
            var imgHtml = "";
            if (board[square] !== 0) {
              imgHtml =
                '<img id="piece_' +
                square +
                '" style="height:' +
                (sizeOfBoard ? sizeOfBoard / 8 : 400 / 8) +
                'px;" draggable="true" src="imgs/' +
                board[square] +
                '.png">';
              squareElement.innerHTML = imgHtml;
            } else {
              squareElement.innerHTML = imgHtml;
            }
          }
        }
      }
    }

    /**
     * @brief movePiece moves a piece from the source to the target square
     * @param {*} userSource is the source square
     * @param {*} userTarget is the target square
     * @param {*} promotedPiece is the piece being promoted
     */
    function movePiece(userSource, userTarget, promotedPiece) {
      let moveString =
        COORDINATES[userSource] +
        COORDINATES[userTarget] +
        promotedPieces[promotedPiece];

      engine.loadMoves(moveString);
      drawBoard();
      updateBoard();
    }

    // Calling the two functions to render the board initially
    drawBoard();
    updateBoard();
  }

  function guiError(functionName) {
    console.error(`Error occurred in ${functionName}`);
  }

  (function initAll() {
    initRandomKeys();
    hashKey = generateHashKey();
    initializePieceList();
  })();

  return {
    // GUI constants
    SELECT_COLOR: SELECT_COLOR,
    NEXT_COLOR: NEXT_COLOR,
    PREV_COLOR: PREV_COLOR,

    // Engine constants
    START_FEN: START_FEN,

    COLOR: {
      WHITE: COLORS.white,
      BLACK: COLORS.black,
    },

    PIECE: {
      NO_PIECE: PIECES.e,
      WHITE_PAWN: PIECES.P,
      WHITE_KNIGHT: PIECES.N,
      WHITE_BISHOP: PIECES.B,
      WHITE_ROOK: PIECES.R,
      WHITE_QUEEN: PIECES.Q,
      WHITE_KING: PIECES.K,
      BLACK_PAWN: PIECES.p,
      BLACK_KNIGHT: PIECES.n,
      BLACK_BISHOP: PIECES.b,
      BLACK_ROOK: PIECES.r,
      BLACK_QUEEN: PIECES.q,
      BLACK_KING: PIECES.k,
    },

    SQUARES: {
      A8: SQUARES.a8,
      B8: SQUARES.b8,
      C8: SQUARES.c8,
      D8: SQUARES.d8,
      E8: SQUARES.e8,
      F8: SQUARES.f8,
      G8: SQUARES.g8,
      H8: SQUARES.h8,
      A7: SQUARES.a7,
      B7: SQUARES.b7,
      C7: SQUARES.c7,
      D7: SQUARES.d7,
      E7: SQUARES.e7,
      F7: SQUARES.f7,
      G7: SQUARES.g7,
      H7: SQUARES.h7,
      A6: SQUARES.a6,
      B6: SQUARES.b6,
      C6: SQUARES.c6,
      D6: SQUARES.d6,
      E6: SQUARES.e6,
      F6: SQUARES.f6,
      G6: SQUARES.g6,
      H6: SQUARES.h6,
      A5: SQUARES.a5,
      B5: SQUARES.b5,
      C5: SQUARES.c5,
      D5: SQUARES.d5,
      E5: SQUARES.e5,
      F5: SQUARES.f5,
      G5: SQUARES.g5,
      H5: SQUARES.h5,
      A4: SQUARES.a4,
      B4: SQUARES.b4,
      C4: SQUARES.c4,
      D4: SQUARES.d4,
      E4: SQUARES.e4,
      F4: SQUARES.f4,
      G4: SQUARES.g4,
      H4: SQUARES.h4,
      A3: SQUARES.a3,
      B3: SQUARES.b3,
      C3: SQUARES.c3,
      D3: SQUARES.d3,
      E3: SQUARES.e3,
      F3: SQUARES.f3,
      G3: SQUARES.g3,
      H3: SQUARES.h3,
      A2: SQUARES.a2,
      B2: SQUARES.b2,
      C2: SQUARES.c2,
      D2: SQUARES.d2,
      E2: SQUARES.e2,
      F2: SQUARES.f2,
      G2: SQUARES.g2,
      H2: SQUARES.h2,
      A1: SQUARES.a1,
      B1: SQUARES.b1,
      C1: SQUARES.c1,
      D1: SQUARES.d1,
      E1: SQUARES.e1,
      F1: SQUARES.f1,
      G1: SQUARES.g1,
      H1: SQUARES.h1,
    },

    // GUI FUNCTIONS
    drawBoard: function () {
      try {
        return drawBoard();
      } catch (e) {
        guiError(".drawBoard()");
      }
    },
    updateBoard: function () {
      try {
        return updateBoard();
      } catch (e) {
        guiError(".updateBoard()");
      }
    },
    movePiece: function (userSource, userTarget, promotedPiece) {
      try {
        movePiece(userSource, userTarget, promotedPiece);
      } catch (e) {
        guiError(".movePiece()");
      }
    },
    flipBoard: function () {
      try {
        flipBoard();
      } catch (e) {
        guiError(".flipBoard()");
      }
    },

    // BOARD METHODS
    squareToString: function (square) {
      return COORDINATES[square];
    },
    promotedToString: function (piece) {
      return promotedPieces[piece];
    },
    printBoard: function () {
      printBoard();
    },
    setBoard: function (fen) {
      setBoard(fen);
    },
    getPiece: function (square) {
      return board[square];
    },
    getSide: function () {
      return side;
    },
    getFifty: function () {
      return fifty;
    },

    // MOVE MANIPULATIION
    moveFromString: function (moveString) {
      return moveFromString(moveString);
    },
    moveToString: function (move) {
      return moveToString(move);
    },
    loadMoves: function (moves) {
      loadMoves(moves);
    },
    getMoveSource: function (move) {
      return getMoveSource(move);
    },
    getMoveTarget: function (move) {
      return getMoveTarget(move);
    },
    getMovePromoted: function (move) {
      return getMovePromoted(move);
    },
    generateLegalMoves: function () {
      return generateLegalMoves();
    },

    // TIME FUNCTIONS
    resetTimeControl: function () {
      resetTimeControl();
    },
    setTimeControl: function (timeControl) {
      setTimeControl(timeControl);
    },
    getTimeControl: function () {
      return JSON.parse(JSON.stringify(timing));
    },
    search: function (depth) {
      return searchPosition(depth);
    },

    // MISCELLANEOUS FUNCTIONS
    isMaterialDraw: function () {
      return isMaterialDraw();
    },
    takeBack: function () {
      if (movesStack.length) takeBack();
    },
    isRepetition: function () {
      return isRepetition();
    },
    inCheck: function () {
      return isSquareAttacked(kingSquare[side], side ^ 1);
    },
  };
};
