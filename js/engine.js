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
  // CONSTANTS
  const white = 0;
  const black = 1;

  // PIECE ENCODING
  const P = 1,
    N = 2,
    B = 3,
    R = 4,
    Q = 5,
    K = 6;

  const p = 7,
    n = 8,
    b = 9,
    r = 10,
    q = 11,
    k = 12;

  const e = 0,
    o = 13;

  const a8 = 0,
    b8 = 1,
    c8 = 2,
    d8 = 3,
    e8 = 4,
    f8 = 5,
    g8 = 6,
    h8 = 7;

  const a7 = 16,
    b7 = 17,
    c7 = 18,
    d7 = 19,
    e7 = 20,
    f7 = 21,
    g7 = 22,
    h7 = 23;

  const a6 = 32,
    b6 = 33,
    c6 = 34,
    d6 = 35,
    e6 = 36,
    f6 = 37,
    g6 = 39,
    h6 = 40;

  const a5 = 48,
    b5 = 49,
    c5 = 50,
    d5 = 51,
    e5 = 52,
    f5 = 53,
    g5 = 54,
    h5 = 55;

  const a4 = 64,
    b4 = 65,
    c4 = 66,
    d4 = 67,
    e4 = 68,
    f4 = 69,
    g4 = 70,
    h4 = 71;

  const a3 = 80,
    b3 = 81,
    c3 = 82,
    d3 = 83,
    e3 = 84,
    f3 = 85,
    g3 = 86,
    h3 = 87;

  const a2 = 96,
    b2 = 97,
    c2 = 98,
    d2 = 99,
    e2 = 100,
    f2 = 101,
    g2 = 102,
    h2 = 103;

  const a1 = 112,
    b1 = 113,
    c1 = 114,
    d1 = 115,
    e1 = 116,
    f1 = 117,
    g1 = 118,
    h1 = 119;

  const noEnpassant = 120;

  // PIECE ARRAYS
  const coordinates = [
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

  // The FEN of the starting position
  const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 ";

  // Chess board represented by a 1D array where
  var board = [
    r,
    n,
    b,
    q,
    k,
    b,
    n,
    r,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    p,
    p,
    p,
    p,
    p,
    p,
    p,
    p,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    e,
    e,
    e,
    e,
    e,
    e,
    e,
    e,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    e,
    e,
    e,
    e,
    e,
    e,
    e,
    e,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    e,
    e,
    e,
    e,
    e,
    e,
    e,
    e,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    e,
    e,
    e,
    e,
    e,
    e,
    e,
    e,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    P,
    P,
    P,
    P,
    P,
    P,
    P,
    P,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    R,
    N,
    B,
    Q,
    K,
    B,
    N,
    R,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
  ];

  // Initializing variables for the chess board
  var side = white;
  var enpassant = noEnpassant;
  var castle = 15;
  var fifty = 0;
  var hashKey = 0;
  var kingSquare = [e1, e8];

  // The list of pieces in a chess game
  var pieceList = {
    // The piece counts
    [P]: 0,
    [N]: 0,
    [B]: 0,
    [R]: 0,
    [Q]: 0,
    [K]: 0,
    [p]: 0,
    [n]: 0,
    [b]: 0,
    [r]: 0,
    [q]: 0,
    [k]: 0,

    // The list of pieces associated with an array
    pieces: new Array(13 * 10),
  };

  // The board moves stack
  var movesStack = [];

  // Plies
  var searchOne = 0;
  var gameOne = 0;

  // Fixed random seed
  var randomState = 2304203948;

  // This function is generating random 32-bit pseudo legal numbers
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

    // This is the hash board position
    for (var square = 0; square < 128; square++) {
      if ((square & 0x88) == 0) {
        var piece = board[square];
        if (piece != e) finalKey ^= pieceKeys[piece * 128 + square];
      }
    }

    // The hash board state variables
    if (side == white) finalKey ^= sideKey;
    if (enpassant != noEnpassant) finalKey ^= pieceKeys[enpassant];
    finalKey ^= castleKeys[castle];

    return finalKey;
  }

  /**
   * @brief resetBoard resets the chess board
   */
  function resetBoard() {
    // Restting the board position requires us to loops through each file and rank
    for (var rank = 0; rank < 8; rank++) {
      for (var file = 0; file < 16; file++) {
        var square = rank * 16 + file;
        if ((square & 0x88) == 0) board[square] = e;
      }
    }

    // Here, we are resetting the board state variables
    side = -1;
    enpassant = noEnpassant;
    castle = 0;
    fifty = 0;
    hashKey = 0;
    kingSquare = [0, 0];
    movesStack = [];

    // This is ressetting the plies
    searchOne = 0;
    gameOne = 0;

    // This is reseting the repetition table
    for (let index in repetitionTable) repetitionTable[index] = 0;
  }

  /**
   * @brief initializePieceList will initialize the piece list
   */
  function initializePieceList() {
    for (var piece = P; piece <= k; piece++) pieceList[piece] = 0;

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

    // This parsing moves into a string
    var previousSquare =
      moveString[0].charCodeAt() -
      "a".charCodeAt() +
      (8 - (moveString[1].charCodeAt() - "0".charCodeAt())) * 16;
    var nextSquare =
      moveString[2].charCodeAt() -
      "a".charCodeAt() +
      (8 - (moveString[3].charCodeAt() - "0".charCodeAt())) * 16;

    // This will be checking that the move is valid
    for (var count = 0; count < moveList.length; count++) {
      var move = moveList[count].move;
      var promotedPiece = 0;

      if (
        getMoveSource(move) == previousSquare &&
        getMoveTarget(move) == nextSquare
      ) {
        // Here we will check if a piece is promoting
        promotedPiece = getMovePromoted(move);
        // If the piece is promoting we check what it is promoting to, depending on the user's settings
        if (promotedPiece) {
          // If it is promoting to a knight
          if (
            (promotedPiece == N || promotedPiece == n) &&
            moveString[4] == "n"
          )
            return move;
          // If it is promoting to a bishop
          else if (
            (promotedPiece == B || promotedPiece == b) &&
            moveString[4] == "b"
          )
            return move;
          // If it is promoting to a rook
          else if (
            (promotedPiece == R || promotedPiece == r) &&
            moveString[4] == "r"
          )
            return move;
          // If it is promoting to a queen
          else if (
            (promotedPiece == Q || promotedPiece == q) &&
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
    // If it is being attacked by pawns
    for (let index = 0; index < 2; index++) {
      let nextSquare = square + pawnDirections.offsets[side][index];
      if (
        (nextSquare & 0x88) == 0 &&
        board[nextSquare] == pawnDirections.pawn[side]
      )
        return 1;
    }

    for (let piece in jumpingPieces) {
      for (let index = 0; index < 8; index++) {
        let nextSquare = square + jumpingPieces[piece].offsets[index];
        let targetPiece = board[nextSquare];
        if ((nextSquare & 0x88) == 0)
          if (targetPiece == jumpingPieces[piece].side[side]) return 1;
      }
    }

    for (let piece in sniperPieces) {
      for (let index = 0; index < 4; index++) {
        let nextSquare = square + sniperPieces[piece].offsets[index];
        while ((nextSquare & 0x88) == 0) {
          var targetPiece = board[nextSquare];
          if (sniperPieces[piece].side[side].includes(targetPiece)) return 1;
          if (targetPiece) break;
          nextSquare += sniperPieces[piece].offsets[index];
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
    pawn: [P, p],
  };

  var jumpingPieces = {
    knight: { offsets: knightOffsets, side: [N, n] },
    king: { offsets: kingOffsets, side: [K, k] },
  };

  var sniperPieces = {
    bishop: {
      offsets: bishopOffsets,
      side: [
        [B, Q],
        [b, q],
      ],
    },
    rook: {
      offsets: rookOffsets,
      side: [
        [R, Q],
        [r, q],
      ],
    },
  };

  // This variable will hold pawn & castling mappings for both sides
  var specialMoves = {
    side: [
      {
        offset: [-17, -15],
        pawn: P,
        target: -16,
        doubleTarget: -32,
        capture: [7, 12],
        rank7: [a7, h7],
        rank2: [a2, h2],
        promoted: [Q, R, B, N],
        king: K,
        castling: [1, 2],
        empty: [f1, g1, d1, b1, c1],
        attacked: [e1, f1, d1],
        by: [black, white],
        castle: [e1, g1, c1],
      },
      {
        offset: [17, 15],
        pawn: p,
        target: 16,
        doubleTarget: 32,
        capture: [1, 6],
        rank7: [a2, h2],
        rank2: [a7, h7],
        promoted: [q, r, b, n],
        king: k,
        castling: [4, 8],
        empty: [f8, g8, d8, b8, c8],
        attacked: [e8, f8, d8],
        by: [black, white],
        castle: [e8, g8, c8],
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
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    15,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    13,
    15,
    15,
    15,
    12,
    15,
    15,
    14,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
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
      else if (deadMoves[maxPly + searchOne] == move) moveScore = 8000;
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
    for (let piece = P; piece <= k; piece++) {
      for (let pieceIndex = 0; pieceIndex < pieceList[piece]; pieceIndex++) {
        let previousSquare = pieceList.pieces[piece * 10 + pieceIndex];

        if (board[previousSquare] == specialMoves.side[side].pawn) {
          let nextSquare = previousSquare + specialMoves.side[side].target;
          if ((nextSquare & 0x88) == 0 && board[nextSquare] == e) {
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
                board[doubleTarget] == e
              )
                addMove(
                  moveList,
                  encodeMove(previousSquare, doubleTarget, 0, 0, 1, 0, 0)
                );
            }
          }

          for (let index = 0; index < 2; index++) {
            let pawn_offset = specialMoves.side[side].offset[index];
            let nextSquare = previousSquare + pawn_offset;

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

        // This will be for castling moves
        else if (board[previousSquare] == specialMoves.side[side].king) {
          // This will be for the king side castles
          if (castle & specialMoves.side[side].castling[0]) {
            if (
              board[specialMoves.side[side].empty[0]] == e &&
              board[specialMoves.side[side].empty[1]] == e
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

          // This will be for the queen side castles
          if (castle & specialMoves.side[side].castling[1]) {
            if (
              board[specialMoves.side[side].empty[2]] == e &&
              board[specialMoves.side[side].empty[3]] == e &&
              board[specialMoves.side[side].empty[4]] == e
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

        // This is for jumping pieces like the Knight and King
        for (let piece in jumpingPieces) {
          if (board[previousSquare] == jumpingPieces[piece].side[side]) {
            for (let index = 0; index < 8; index++) {
              let nextSquare =
                previousSquare + jumpingPieces[piece].offsets[index];
              let capturedPiece = board[nextSquare];

              if ((nextSquare & 0x88) == 0) {
                if (
                  side == white
                    ? capturedPiece == e ||
                      (capturedPiece >= 7 && capturedPiece <= 12)
                    : capturedPiece == e ||
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

        for (let piece in sniperPieces) {
          if (
            board[previousSquare] == sniperPieces[piece].side[side][0] ||
            board[previousSquare] == sniperPieces[piece].side[side][1]
          ) {
            for (var index = 0; index < 4; index++) {
              let nextSquare =
                previousSquare + sniperPieces[piece].offsets[index];
              while (!(nextSquare & 0x88)) {
                var capturedPiece = board[nextSquare];

                if (
                  side == white
                    ? capturedPiece >= 1 && capturedPiece <= 6
                    : capturedPiece >= 7 && capturedPiece <= 12
                )
                  break;
                if (
                  side == white
                    ? capturedPiece >= 7 && capturedPiece <= 12
                    : capturedPiece >= 1 && capturedPiece <= 6
                ) {
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 1, 0, 0, 0)
                  );
                  break;
                }

                if (capturedPiece == e)
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 0, 0, 0, 0)
                  );
                nextSquare += sniperPieces[piece].offsets[index];
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
    for (let piece = P; piece <= k; piece++) {
      for (let pieceIndex = 0; pieceIndex < pieceList[piece]; pieceIndex++) {
        let previousSquare = pieceList.pieces[piece * 10 + pieceIndex];

        // If the piece is a pawn
        if (board[previousSquare] == specialMoves.side[side].pawn) {
          let nextSquare = previousSquare + specialMoves.side[side].target;
          for (let index = 0; index < 2; index++) {
            let pawn_offset = specialMoves.side[side].offset[index];
            let nextSquare = previousSquare + pawn_offset;

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
        for (let piece in jumpingPieces) {
          if (board[previousSquare] == jumpingPieces[piece].side[side]) {
            for (let index = 0; index < 8; index++) {
              let nextSquare =
                previousSquare + jumpingPieces[piece].offsets[index];
              let capturedPiece = board[nextSquare];

              if ((nextSquare & 0x88) == 0) {
                if (
                  side == white
                    ? capturedPiece == e ||
                      (capturedPiece >= 7 && capturedPiece <= 12)
                    : capturedPiece == e ||
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

        for (let piece in sniperPieces) {
          if (
            board[previousSquare] == sniperPieces[piece].side[side][0] ||
            board[previousSquare] == sniperPieces[piece].side[side][1]
          ) {
            for (var index = 0; index < 4; index++) {
              let nextSquare =
                previousSquare + sniperPieces[piece].offsets[index];
              while (!(nextSquare & 0x88)) {
                var capturedPiece = board[nextSquare];

                if (
                  side == white
                    ? capturedPiece >= 1 && capturedPiece <= 6
                    : capturedPiece >= 7 && capturedPiece <= 12
                )
                  break;
                if (
                  side == white
                    ? capturedPiece >= 7 && capturedPiece <= 12
                    : capturedPiece >= 1 && capturedPiece <= 6
                ) {
                  addMove(
                    moveList,
                    encodeMove(previousSquare, nextSquare, 0, 1, 0, 0, 0)
                  );
                  break;
                }

                nextSquare += sniperPieces[piece].offsets[index];
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
    board[previousSquare] = e;
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
    // This updates the plies
    searchOne++;
    gameOne++;

    // This updates the repition table
    repetitionTable[gameOne] = hashKey;

    // This is parsing the moves to a string
    let previousSquare = getMoveSource(move);
    let nextSquare = getMoveTarget(move);
    let promotedPiece = getMovePromoted(move);
    let capturedPiece = board[nextSquare];

    // This is the movesStack board state variables
    movesStack.push({
      move: move,
      capturedPiece: 0,
      side: side,
      enpassant: enpassant,
      castle: castle,
      fifty: fifty,
      hash: hashKey,
    });

    // This moves the current piece from the source square to the target square
    moveCurrentPiece(board[previousSquare], previousSquare, nextSquare);

    // This is updating the fifty move rule
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
    // In the case that the piece is a pawn, this will assign the fifty move rule value back to 0
    else if (board[nextSquare] == P || board[nextSquare] == p) fifty = 0;

    // This is updating the enpassant square
    if (enpassant != noEnpassant) hashKey ^= pieceKeys[enpassant];
    enpassant = noEnpassant;

    // The follwing will handle special moves such as enpessant
    if (getMovePawn(move)) {
      // If the side is white and the piece is a pawn
      if (side == white) {
        enpassant = nextSquare + 16;
        hashKey ^= pieceKeys[nextSquare + 16];
      }
      // If the side is black and the piece is a pawn
      else {
        enpassant = nextSquare - 16;
        hashKey ^= pieceKeys[nextSquare - 16];
      }
    }
    // This is checking whether the move with the pawn was enpassant
    else if (getMoveEnpassant(move)) {
      // enpassant for white
      if (side == white) {
        board[nextSquare + 16] = e;
        hashKey ^= pieceKeys[p * 128 + nextSquare + 16];
        removePiece(p, nextSquare + 16);
      }
      // enpassant for black
      else {
        board[nextSquare - 16] = e;
        hashKey ^= pieceKeys[P * 128 + (nextSquare - 16)];
        removePiece(P, nextSquare - 16);
      }
    }
    // If the move was a castle
    else if (getMoveCastling(move)) {
      switch (nextSquare) {
        case g1:
          moveCurrentPiece(R, h1, f1);
          break;
        case c1:
          moveCurrentPiece(R, a1, d1);
          break;
        case g8:
          moveCurrentPiece(r, h8, f8);
          break;
        case c8:
          moveCurrentPiece(r, a8, d8);
          break;
      }
    }

    // This will handle promotions
    if (promotedPiece) {
      // If the side that is promoting is white
      if (side == white) {
        // Updating the hash key
        hashKey ^= pieceKeys[P * 128 + nextSquare];
        removePiece(P, nextSquare);
        // We want to remove the white pawn from the square it was last on
      }
      // If the side that is promoting is black
      else {
        // Updating the hash key
        hashKey ^= pieceKeys[p * 128 + nextSquare];
        // We want to remove the black pawn from the square it was last on
        removePiece(p, nextSquare);
      }
      // Adding the promoted piece to the ssquare the pawn was last on
      // The promoted piece will depend on the user's settings
      addPiece(promotedPiece, nextSquare);
    }

    // Here we are updating the king square
    if (board[nextSquare] == K || board[nextSquare] == k)
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
        side == white ? kingSquare[side ^ 1] : kingSquare[side ^ 1],
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
    // This updates our plies
    searchOne--;
    gameOne--;

    // Parsing the move to a string
    let moveIndex = movesStack.length - 1;
    let move = movesStack[moveIndex].move;
    let previousSquare = getMoveSource(move);
    let nextSquare = getMoveTarget(move);

    // Moving the piece from the source square to the target square
    moveCurrentPiece(board[nextSquare], nextSquare, previousSquare);

    // This restores the captured piece
    if (getMoveCapture(move)) {
      // If a piece was captured, we want to add it back to the board
      addPiece(movesStack[moveIndex].capturedPiece, nextSquare);
    }

    // This is handling special moves if a move was taken back
    // If the move was enppassant
    if (getMoveEnpassant(move)) {
      // We check if the side was white
      if (side == white) addPiece(P, nextSquare - 16);
      // If it was, we add a black pawn to the square that was captured
      else addPiece(p, nextSquare + 16);
    }
    // If the move was a castle
    else if (getMoveCastling(move)) {
      // We make a switch case to handle the different castling moves, depending on whether it was queen side, king side, and the side that was castling
      switch (nextSquare) {
        // In the case that the move was a king side castle for white
        case g1:
          moveCurrentPiece(R, f1, h1); // We move the rook back to its original square
          break;
        // In the case that the mvoe was a queen side castle for white
        case c1:
          moveCurrentPiece(R, d1, a1); // We move the rook back to its original square
          break;
        // In the case that the move was a king side castle for black
        case g8:
          moveCurrentPiece(r, f8, h8); // We move the rook back to its original square
          break;
        // In the case that the move was a queen side castle for black
        case c8:
          moveCurrentPiece(r, d8, a8); // We move the rook back to its original square
          break;
      }
    }
    // Here we check if the move was a promotion
    else if (getMovePromoted(move)) {
      // If the side was white, we add a pawn back to the square before the promotion and if it was black, we add a pawn to the square before the promotion
      side == white ? addPiece(p, previousSquare) : addPiece(P, previousSquare);
      // Then we remove the promoted piece
      removePiece(getMovePromoted(move), previousSquare);
    }

    // Here we are updating the king square
    if (board[previousSquare] == K || board[previousSquare] == k)
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
    // This is backing up the current board state
    movesStack.push({
      move: 0,
      capturedPiece: 0,
      side: side,
      enpassant: enpassant,
      castle: castle,
      fifty: fifty,
      hash: hashKey,
    });

    if (enpassant != noEnpassant) hashKey ^= pieceKeys[enpassant];
    enpassant = noEnpassant;
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

  // Simplified Evaluation Material Weights and Points
  const materialWeights = [
    0, 100, 320, 330, 500, 900, 20000, -100, -320, -330, -500, -900, -20000,
  ];

  const pstPawns = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    50,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    10,
    10,
    20,
    30,
    30,
    20,
    10,
    10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    5,
    5,
    10,
    25,
    25,
    10,
    5,
    5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    0,
    0,
    0,
    20,
    20,
    0,
    0,
    0,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    5,
    -5,
    -10,
    0,
    0,
    -10,
    -5,
    5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    5,
    10,
    10,
    -20,
    -20,
    10,
    10,
    5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
  ];

  const pstKnights = [
    -50,
    -40,
    -30,
    -30,
    -30,
    -30,
    -40,
    -50,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -40,
    -20,
    0,
    0,
    0,
    0,
    -20,
    -40,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -30,
    0,
    10,
    15,
    15,
    10,
    0,
    -30,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -30,
    5,
    15,
    20,
    20,
    15,
    5,
    -30,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -30,
    0,
    15,
    20,
    20,
    15,
    0,
    -30,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -30,
    5,
    10,
    15,
    15,
    10,
    5,
    -30,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -40,
    -20,
    0,
    5,
    5,
    0,
    -20,
    -40,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -50,
    -40,
    -30,
    -30,
    -30,
    -30,
    -40,
    -50,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
  ];

  const pstBishops = [
    -20,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -20,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    0,
    0,
    0,
    0,
    0,
    0,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    0,
    5,
    10,
    10,
    5,
    0,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    5,
    5,
    10,
    10,
    5,
    5,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    0,
    10,
    10,
    10,
    10,
    0,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    10,
    10,
    10,
    10,
    10,
    10,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    5,
    0,
    0,
    0,
    0,
    5,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -20,
    -10,
    -10,
    -10,
    -10,
    -10,
    -10,
    -20,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
  ];

  const pstRooks = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    5,
    10,
    10,
    10,
    10,
    10,
    10,
    5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -5,
    0,
    0,
    0,
    0,
    0,
    0,
    -5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    0,
    0,
    0,
    5,
    5,
    0,
    0,
    0,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
  ];

  const pstQueens = [
    -20,
    -10,
    -10,
    -5,
    -5,
    -10,
    -10,
    -20,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    0,
    0,
    0,
    0,
    0,
    0,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    0,
    5,
    5,
    5,
    5,
    0,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -5,
    0,
    5,
    5,
    5,
    5,
    0,
    -5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    0,
    0,
    5,
    5,
    5,
    5,
    0,
    -5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    5,
    5,
    5,
    5,
    5,
    0,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -10,
    0,
    5,
    0,
    0,
    0,
    0,
    -10,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    -20,
    -10,
    -10,
    -5,
    -5,
    -10,
    -10,
    -20,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
  ];

  const pstKings = [
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
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -30,
      -40,
      -40,
      -50,
      -50,
      -40,
      -40,
      -30,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -30,
      -40,
      -40,
      -50,
      -50,
      -40,
      -40,
      -30,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -30,
      -40,
      -40,
      -50,
      -50,
      -40,
      -40,
      -30,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -20,
      -30,
      -30,
      -40,
      -40,
      -30,
      -30,
      -20,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -10,
      -20,
      -20,
      -20,
      -20,
      -20,
      -20,
      -10,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      20,
      20,
      0,
      0,
      0,
      0,
      20,
      20,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      20,
      30,
      10,
      0,
      0,
      10,
      30,
      20,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
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
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -30,
      -20,
      -10,
      0,
      0,
      -10,
      -20,
      -30,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -30,
      -10,
      20,
      30,
      30,
      20,
      -10,
      -30,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -30,
      -10,
      30,
      40,
      40,
      30,
      -10,
      -30,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -30,
      -10,
      30,
      40,
      40,
      30,
      -10,
      -30,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -30,
      -10,
      20,
      30,
      30,
      20,
      -10,
      -30,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -30,
      -30,
      0,
      0,
      0,
      0,
      -30,
      -30,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      -50,
      -30,
      -30,
      -30,
      -30,
      -30,
      -30,
      -50,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
      o,
    ],
  ];

  // PST for black pieces is the same as for white pieces, but mirrored
  const mirrorSquare = [
    a1,
    b1,
    c1,
    d1,
    e1,
    f1,
    g1,
    h1,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    a2,
    b2,
    c2,
    d2,
    e2,
    f2,
    g2,
    h2,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    a3,
    b3,
    c3,
    d3,
    e3,
    f3,
    g3,
    h3,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    a4,
    b4,
    c4,
    d4,
    e4,
    f4,
    g4,
    h4,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    a5,
    b5,
    c5,
    d5,
    e5,
    f5,
    g5,
    h5,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    a6,
    b6,
    c6,
    d6,
    e6,
    f6,
    g6,
    h6,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    a7,
    b7,
    c7,
    d7,
    e7,
    f7,
    g7,
    h7,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    a8,
    b8,
    c8,
    d8,
    e8,
    f8,
    g8,
    h8,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
    o,
  ];

  /**
   * @brief isMaterialDraw will check if the game is a draw due to insufficient material
   * @return {boolean} true if the game is a draw due to insufficient material, false otherwise
   */
  function isMaterialDraw() {
    // We will first check if there are any pawns for both sides
    if (pieceList[P] == 0 && pieceList[p] == 0) {
      // If there are no pawns, we will check if there are any queens and rooks for both sides
      if (
        pieceList[R] == 0 &&
        pieceList[r] == 0 &&
        pieceList[Q] == 0 &&
        pieceList[q] == 0
      ) {
        // If there aren't any, we want to check if the number of the bishops on the board for both sides is equal to 0
        if (pieceList[B] == 0 && pieceList[b] == 0) {
          // If there are no bishops, we want to check if the number of knights on the board for either side is less than 3, if it is, then we want to return true when the function is called
          if (pieceList[N] < 3 && pieceList[n] < 3) return 1;
        }
        // If there are no knights, we want to check the number of bushops on the board
        else if (pieceList[N] == 0 && pieceList[n] == 0) {
          // If the value of the number of bishops for any side subtracted the number of bishops for the other
          // side is less than 2, (it can be either as there is an absolute value function), we also want to return true for the function
          // if it is called
          if (Math.abs(pieceList[B] - pieceList[b]) < 2) return 1;
        }
        // If there is less than 3 knights and no bishops, or if there is 1 bishop and no knights
        else if (
          (pieceList[N] < 3 && pieceList[B] == 0) ||
          (pieceList[B] == 1 && pieceList[N] == 0)
        ) {
          // We want to check the number of bishops for the other side specifically we're checking if there is less than 3 knights and no bishops, or if there is 1 bishop and no knights
          if (
            (pieceList[n] < 3 && pieceList[b] == 0) ||
            (pieceList[b] == 1 && pieceList[n] == 0)
          )
            // If these conditions are true, we want to return true for the function when it's called
            return 1;
        }
      }
      // If there are no queens, we want to check if there are any rooks
      else if (pieceList[Q] == 0 && pieceList[q] == 0) {
        // If each side has 1 rook, we want to check if there are any knights or bishops on the board
        if (pieceList[R] == 1 && pieceList[r] == 1) {
          // If the number of knights and bishops for each side is less than 2, we want to return true for the function when it's called
          if (
            pieceList[N] + pieceList[B] < 2 &&
            pieceList[n] + pieceList[b] < 2
          )
            return 1;
        }
        // If there is 1 rook for each side, we want to check if there are any knights or bishops on the board
        else if (pieceList[R] == 1 && pieceList[r] == 0) {
          if (
            pieceList[N] + pieceList[B] == 0 &&
            (pieceList[n] + pieceList[b] == 1 ||
              pieceList[n] + pieceList[b] == 2)
          )
            // If all these conditions are met true, we want to return true if the function is called
            return 1;
        }
        // If one side has a rook but the other does not, we want to check if there are any knights or bishops on the board
        else if (pieceList[r] == 1 && pieceList[R] == 0) {
          // Here we are checking if the sum of the bishops and knights on the side with the rook are 0 and if
          // the sum of the bishops and knights on the side without the rook is 1 or 2
          if (
            pieceList[n] + pieceList[b] == 0 &&
            (pieceList[N] + pieceList[B] == 1 ||
              pieceList[N] + pieceList[B] == 2)
          )
            return 1;
          // If all of these conditions are met, we want to return true if the function is called
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
    // We want to return "endgame" if there are no queens on board
    if (pieceList[Q] == 0 || pieceList[q] == 0) return 1;

    // Initialize phaseScore to 0
    let phaseScore = 0;
    // The next 2 for loops will be adding the score of the material for each side to the phaseScore variable
    // It will be using the values stated earlier in the file
    for (let piece = N; piece <= Q; piece++)
      phaseScore += pieceList[piece] * materialWeights[piece];
    for (let piece = n; piece <= q; piece++)
      phaseScore += pieceList[piece] * -materialWeights[piece];

    // If the phaseScore value is greater than 2460, we want to return "0" for opening or false
    // If the phaseScore is lower than 2460, we want to return "1" for endgame or true
    return phaseScore > 2460 ? 0 : 1;
  }

  /**
   * @brief evalue will evaluate the score of the game
   * @return {number} the score of the game
   */
  function evaluate() {
    // We will be calling the isMaterialDraw function to check if the game is a draw by insufficient material
    // If this function returns true, we return 0 or in other words tell the engine not to evaluate a move as the game is over
    if (isMaterialDraw()) return 0;
    // Initializing a score of 0
    let score = 0;
    // Initializing a variable called phase as the getGamePhase boolean function
    let phase = getGamePhase();

    // The following will be evaluating the material and positional score for each piece on the board
    for (let piece = P; piece <= k; piece++) {
      for (pieceIndex = 0; pieceIndex < pieceList[piece]; pieceIndex++) {
        let square = pieceList.pieces[piece * 10 + pieceIndex];

        // This will be evaluating the score of the game
        score += materialWeights[piece];

        // This will be evaluating the positional score of the game
        switch (piece) {
          case P:
            score += pstPawns[square];
            break;
          case N:
            score += pstKnights[square];
            break;
          case B:
            score += pstBishops[square];
            break;
          case R:
            score += pstRooks[square];
            break;
          case Q:
            score += pstQueens[square];
            break;
          case K:
            score += pstKings[phase][square];
            break;
          // The other side will be evaluated in the same way but will subtract from the total score
          case p:
            score -= pstPawns[mirrorSquare[square]];
            break;
          case n:
            score -= pstKnights[mirrorSquare[square]];
            break;
          case b:
            score -= pstBishops[mirrorSquare[square]];
            break;
          case r:
            score -= pstRooks[mirrorSquare[square]];
            break;
          case q:
            score -= pstQueens[mirrorSquare[square]];
            break;
          case k:
            score -= pstKings[phase][mirrorSquare[square]];
            break;
        }
      }
    }

    // We then round the values of the score
    score = Math.round((score * (100 - fifty)) / 100);

    // After that we return the score as normal if white is playing, and negative if black is playing
    return side == white ? score : -score;
  }

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
  const maxPly = 64;
  const infinity = 50000;
  const mateValue = 49000;
  const mateScore = 48000;
  const DO_NULL = 1;
  const NO_NULL = 0;

  // The search variables
  var followPV;

  // The PV table (principal variation)
  var pvTable = new Array(maxPly * maxPly);
  var pvLength = new Array(maxPly);
  var deadMoves = new Array(2 * maxPly);
  var polanMoves = new Array(13 * 128);

  // The Repetition table
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
        // If so, we will make a temporary variable tempMove the current move
        let tempMove = moveList[currentCount];
        // Then we will swap the moves
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
          // We make followPV equal to 1
          followPV = 1;
          // Then we change the score of the current move in the list to 20000
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
   * @brief Queiscence is a recursive function that will be responsible for the Queiscence search
   * @param {*} alpha is the alpha value
   * @param {*} beta is the beta value
   * @return {number} the alpha value
   * @return {number} the beta value
   *
   */
  function Queiscence(alpha, beta) {
    pvLength[searchOne] = searchOne;
    // Increment the nodes searched by one
    nodes++;

    // If the nodes searched is equal to 2047 we want to check the remaining time in the evaluation time
    if ((nodes & 2047) == 0) checkTime();
    // If the search depth is greater than the maximum ply we want to return the evaluation
    if (searchOne > maxPly - 1) return evaluate();

    // Creating a variable equal to the evaluation function
    let evaluation = evaluate();

    // If the evaluation is greater than or equal to the beta value, we want to return the vlaue of beta
    if (evaluation >= beta) return beta;
    // If the evaluation is greater than or equal to the alpha value, we want
    // to set the value of alpha as the value of the evaluation
    if (evaluation > alpha) alpha = evaluation;

    // Making the moveList variable equal to an empty array
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

      // If the move is equal to 0, we want to continue
      if (makeMove(move) == 0) continue;

      // Creating a variable called score equal to the Queiscence function
      var score = -Queiscence(-beta, -alpha);
      // Taking back the move
      takeBack();

      // If the time is up, we want to return 0 to show that the search is over
      if (timing.stopped == 1) return 0;

      // If the score is greater than the value of alpha, we want to store the PV moves
      // and make the value of alpha equal to the value of score
      if (score > alpha) {
        storePVMoves(move);
        alpha = score;

        // If the score is greater than or equal to the value of beta,
        // we want to return the value of beta
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
    let score = 0;
    let pvNode = beta - alpha > 1;
    let futilityPruning = 0;

    // If the nodes searched is equal to 2047 we want to check the remaining time in the evaluation time
    if ((nodes & 2047) == 0) checkTime();
    // If both the searchOne is 1 or true and the isRepition function is true or the count for the
    // fifty move rule is greater than 0, we return 0
    if ((searchOne && isRepetition()) || fifty >= 100) return 0;
    // If the depth is equal to 0, we increase the amount of nodes searched and return the Queiscence function
    if (depth == 0) {
      nodes++;
      return Queiscence(alpha, beta);
    }

    // Mate distance pruning
    // If the alpha value is less than -mateValue + searchOne, we want to set the value of alpha
    // equal to -mateValue
    if (alpha < -mateValue) alpha = -mateValue;

    // If the beta value is greater than mateValue - searchOne, we want to set the value of beta
    // equal to the mateValue - 1
    if (beta > mateValue - 1) beta = mateValue - 1;

    // If alpha is greater than or equal to beta, we want to return the value of alpha
    if (alpha >= beta) return alpha;

    // Creating a variable legal moves equal to 0
    let legalMoves = 0;

    // Creating a variable called inCheck equal to the isSquareAttacked function with the parameters
    // kingSquare[side] and side ^ 1
    let inCheck = isSquareAttacked(kingSquare[side], side ^ 1);

    // Checking the extension and if its true, increase the depth by 1
    if (inCheck) depth++;

    // If the value of inCheck is equal to 0 and the pvNode is also equal to 0
    // we create a variable called staticEval equal to the evaluate function
    if (inCheck == 0 && pvNode == 0) {
      // Static evaluation for pruning purposes
      let staticEval = evaluate();

      // Evaluation Pruning
      // If the depth is less than 3 and the absolute value of beta - 1 is greater than -mateValue + 100
      if (depth < 3 && Math.abs(beta - 1) > -mateValue + 100) {
        // We create a variable called evalMargin and set the value of it to 120 * depth
        let evalMargin = 120 * depth;
        // If the staticEval is greater than or equal to the value of beta + evalMargin, we want to return the value of staticEval
        // minus the value of evalMargin
        if (staticEval - evalMargin >= beta) return staticEval - evalMargin;
      }

      // Checking if nullMove evaluates to true
      if (nullMove) {
        // Nullmove Pruning
        if (
          searchOne &&
          depth > 2 &&
          getGamePhase() != 1 &&
          staticEval >= beta
        ) {
          // Calling the makeNullMove function if the searchOne is true and the depth if grather than 2
          // and if the getGamePhase function is not equal to 1 (in other words not the end game) and the staticEval is greater than or equal to the value of beta
          makeNullMove();
          score = -Negamax(-beta, -beta + 1, depth - 1 - 2, NO_NULL);
          takeNullMove();

          // Then we check if the time stopped and if it did we return 0
          if (timing.stopped == 1) return 0;

          // If the score is greater than or equal to the value of beta, we return the value of beta
          if (score >= beta) return beta;
        }

        // Razoring
        if (depth < 4) {
          score = staticEval + 125;
          let newScore;

          if (score < beta) {
            if (depth == 1) {
              newScore = Queiscence(alpha, beta);
              return newScore > score ? newScore : score;
            }
          }

          score += 175;

          if (score < beta && depth < 3) {
            newScore = Queiscence(alpha, beta);
            if (newScore < beta) return newScore > score ? newScore : score;
          }
        }
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
            getMoveSource(deadMoves[maxPly + searchOne]) ||
            getMoveTarget(move) !=
              getMoveTarget(deadMoves[maxPly + searchOne])) &&
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
      // Taking back the move
      takeBack();
      // Incrementing the moves searched by one
      movesSearched++;

      if (timing.stopped == 1) return 0;
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
            deadMoves[maxPly + searchOne] = deadMoves[searchOne];
            deadMoves[searchOne] = move;
          }

          return beta;
        }
      }
    }

    // Checking whether checkmate or stalemate
    if (legalMoves == 0) {
      if (inCheck) return -mateValue + searchOne;
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
      score = Negamax(-infinity, infinity, currentDepth, DO_NULL);

      // If the time is up, we stop searching
      if (
        timing.stopped == 1 ||
        (new Date().getTime() > timing.stopTime && timing.time != -1)
      )
        break;

      if (typeof document != "undefined") {
        document.getElementById("depth").innerHTML = currentDepth;
      }
    }

    let bestMove = timing.stopped == 1 ? lastBestMove : pvTable[0];
    return bestMove;
  }

  // Castling variables
  var KC = 1,
    QC = 2,
    kc = 4,
    qc = 8;

  // Decoding promoted pieces
  var promotedPieces = {
    [Q]: "q",
    [R]: "r",
    [B]: "b",
    [N]: "n",
    [q]: "q",
    [r]: "r",
    [b]: "b",
    [n]: "n",
  };

  // Encode ascii pieces
  var charPieces = {
    P: P,
    N: N,
    B: B,
    R: R,
    Q: Q,
    K: K,
    p: p,
    n: n,
    b: b,
    r: r,
    q: q,
    k: k,
  };

  /**
   * @brief setBoard sets the board position given the FEN string
   * @param {*} fen is the FEN string
   */
  function setBoard(fen) {
    resetBoard();
    var index = 0;

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
            if (fen[index] == "K") kingSquare[white] = square;
            else if (fen[index] == "k") kingSquare[black] = square;
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
    side = fen[index] == "w" ? white : black;
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
    } else enpassant = noEnpassant;

    // Parsing 50 rule move counter
    fifty = parseInt(fen.slice(index, fen.length - 1).split(" ")[1]);

    // Parsing full move counter
    gameOne = parseInt(fen.slice(index, fen.length + 1).split(" ")[2]) * 2;

    // Generate unique position identifier
    hashKey = generateHashKey();

    // Initialize the piece list
    initializePieceList();
  }

  /**
   * @brief loadMoves loads the moves
   * @param {*} moves is the string of moves
   */
  function loadMoves(moves) {
    moves = moves.split(" ");

    for (let index = 0; index < moves.length; index++) {
      let move = moves[index];
      let validMove = moveFromString(move);
      if (validMove) makeMove(validMove);
    }

    searchOne = 0;
  }

  /**
   * @brief moveToString converts a move to a string
   * @param {*} move is the move to convert
   */
  function moveToString(move) {
    if (getMovePromoted(move)) {
      return (
        coordinates[getMoveSource(move)] +
        coordinates[getMoveTarget(move)] +
        promotedPieces[getMovePromoted(move)]
      );
    } else {
      return (
        coordinates[getMoveSource(move)] + coordinates[getMoveTarget(move)]
      );
    }
  }

  // GUI VARIABLES
  if (typeof document != "undefined") {
    // Color theme
    var LIGHT_SQUARE = "#C7C7C7";
    var DARK_SQUARE = "#71828F";
    var SELECT_COLOR = "#B4CDB6";
    var NEXT_COLOR = "#E16A55";
    var PREV_COLOR = "#E16A55";

    // Square size
    var CELL_WIDTH = 75;
    var CELL_HEIGHT = 75;

    // Overriding board appearance
    if (sizeOfBoard) {
      CELL_WIDTH = sizeOfBoard / 8;
      CELL_HEIGHT = sizeOfBoard / 8;
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
              CELL_WIDTH +
              'px" height="' +
              CELL_HEIGHT +
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
          if ((square & 0x88) == 0)
            document.getElementById(square).innerHTML =
              "<img " +
              (sizeOfBoard ? sizeOfBoard / 8 : 400 / 8) +
              'px" draggable="true" src ="imgs/' +
              // Numbered Images
              board[square] +
              '.gif">';
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
        coordinates[userSource] +
        coordinates[userTarget] +
        promotedPieces[promotedPiece];

      engine.loadMoves(moveString);
      drawBoard();
      updateBoard();
    }

    // Calling the two functions to render the board initially
    drawBoard();
    updateBoard();
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
    START_FEN: startFen,

    COLOR: {
      WHITE: white,
      BLACK: black,
    },

    PIECE: {
      NO_PIECE: e,
      WHITE_PAWN: P,
      WHITE_KNIGHT: N,
      WHITE_BISHOP: B,
      WHITE_ROOK: R,
      WHITE_QUEEN: Q,
      WHITE_KING: K,
      BLACK_PAWN: p,
      BLACK_KNIGHT: n,
      BLACK_BISHOP: b,
      BLACK_ROOK: r,
      BLACK_QUEEN: q,
      BLACK_KING: k,
    },

    SQUARE: {
      A8: a8,
      B8: b8,
      C8: c8,
      D8: d8,
      E8: e8,
      F8: f8,
      G8: g8,
      H8: h8,
      A7: a7,
      B7: b7,
      C7: c7,
      D7: d7,
      E7: e7,
      F7: f7,
      G7: g7,
      H7: h7,
      A6: a6,
      B6: b6,
      C6: c6,
      D6: d6,
      E6: e6,
      F6: f6,
      G6: g6,
      H6: h6,
      A5: a5,
      B5: b5,
      C5: c5,
      D5: d5,
      E5: e5,
      F5: f5,
      G5: g5,
      H5: h5,
      A4: a4,
      B4: b4,
      C4: c4,
      D4: d4,
      E4: e4,
      F4: f4,
      G4: g4,
      H4: h4,
      A3: a3,
      B3: b3,
      C3: c3,
      D3: d3,
      E3: e3,
      F3: f3,
      G3: g3,
      H3: h3,
      A2: a2,
      B2: b2,
      C2: c2,
      D2: d2,
      E2: e2,
      F2: f2,
      G2: g2,
      H2: h2,
      A1: a1,
      B1: b1,
      C1: c1,
      D1: d1,
      E1: e1,
      F1: f1,
      G1: g1,
      H1: h1,
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
      return coordinates[square];
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

    // MISC. FUNCTIONS
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
