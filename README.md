# Chess-Engine

![Sample Game Image](https://user-images.githubusercontent.com/78674944/209627773-6a2f4a19-2230-494c-8e25-6377d3531de1.png)


![Chess Engine playing moves](https://user-images.githubusercontent.com/78674944/212571533-b32af74b-257d-47ce-9990-2a9a81a03e23.gif)

## About

A chess engine based on the Negamax algorithm with up to 10th depth game analysis. 
The GUI includes undoing moves, flipping and resetting the board, under promotions, and custom board positions and evaluation times.

## Libraries and Tools Used
- [Bootstrap](https://getbootstrap.com/) for GUI buttons. 

## Algorithms and Optimization Techniques Used
- Negamax algorithm with alpha-beta pruning for finding the optimal move efficiently.
- Iterative deepening for exploring the most promising moves first and making the best use of the available search time.
- Piece-square tables for evaluating the relative value of pieces on the board, guiding the search algorithm towards better moves.
- Move ordering using the MVV-LVA heuristic for prioritizing moves that capture high-value pieces and reducing the search space.
- Principal variation search for improving the efficiency of the search process by searching only the most promising lines of play.
- Quiescence search for ensuring that the evaluation of the position is stable by extending the search to positions where there are no - captures or checks.
- Zobrist hashing for storing the game state in a compact and efficient way, allowing for quick comparisons and detection of repetitions.

## Possible Improvements
- Switching programming languages
- Using a more detailed evaluation method (ex. use of opening tables)
- Transposition Tables
- Replacing [Simplified Evaluation](https://www.chessprogramming.org/Simplified_Evaluation_Function) with [PeSTO's Evaluation Function](https://www.chessprogramming.org/PeSTO%27s_Evaluation_Function)

## License
See [License](https://github.com/JaehyeongPark06/Chess-Engine/blob/main/LICENSE)

#### You can play against it [here](https://jaehyeong-chess-engine.netlify.app/)


