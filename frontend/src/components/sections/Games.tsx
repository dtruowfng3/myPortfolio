import React, { useState, useEffect } from 'react';

// Games Grid Component
const GamesGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Memory Game */}
            <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                    Memory Game
                </h3>
                <div className="flex-1">
                    <MemoryGame />
                </div>
            </div>

            {/* 2048 Game */}
            <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                    2048 Game
                </h3>
                <div className="flex-1">
                    <Game2048 />
                </div>
            </div>

            {/* Tic Tac Toe */}
            <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                    Tic Tac Toe
                </h3>
                <div className="flex-1">
                    <TicTacToe />
                </div>
            </div>
        </div>
    );
};

// Sudoku Game Component
const SudokuGame: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [time, setTime] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (gameStarted && !isComplete) {
            const timer = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameStarted, isComplete]);

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameStarted || isComplete) return;
            
            // Handle number input (1-9)
            if (e.key >= '1' && e.key <= '9') {
                const num = parseInt(e.key);
                handleNumberInput(num);
            }
            
            // Handle cell navigation with arrow keys
            if (selectedCell) {
                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault();
                        if (selectedCell.row > 0) {
                            setSelectedCell({row: selectedCell.row - 1, col: selectedCell.col});
                        }
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        if (selectedCell.row < 8) {
                            setSelectedCell({row: selectedCell.row + 1, col: selectedCell.col});
                        }
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (selectedCell.col > 0) {
                            setSelectedCell({row: selectedCell.row, col: selectedCell.col - 1});
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (selectedCell.col < 8) {
                            setSelectedCell({row: selectedCell.row, col: selectedCell.col + 1});
                        }
                        break;
                    case 'Backspace':
                    case 'Delete':
                        e.preventDefault();
                        handleNumberInput(0);
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameStarted, isComplete, selectedCell]);

    const generateRandomSudoku = () => {
        const emptyBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        
        // Fill diagonal 3x3 boxes first (easier to ensure validity)
        for (let box = 0; box < 9; box += 3) {
            fillBox(emptyBoard, box, box);
        }
        
        // Fill remaining cells
        solveSudoku(emptyBoard);
        
        // Remove some numbers to create puzzle
        const puzzle = emptyBoard.map(row => [...row]);
        const cellsToRemove = 40 + Math.floor(Math.random() * 10); // Remove 40-50 numbers
        
        let removed = 0;
        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (puzzle[row][col] !== 0) {
                puzzle[row][col] = 0;
                removed++;
            }
        }
        
        return puzzle;
    };

    const fillBox = (board: number[][], row: number, col: number) => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);
        
        let index = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[row + i][col + j] = numbers[index++];
            }
        }
    };

    const shuffleArray = (array: number[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const solveSudoku = (board: number[][]): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num) return false;
        }
        
        // Check column
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num) return false;
        }
        
        // Check 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        
        return true;
    };

    const initializeGame = () => {
        const newBoard = generateRandomSudoku();
        setBoard(newBoard);
        setTime(0);
        setGameStarted(false);
        setIsComplete(false);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const handleCellClick = (row: number, col: number) => {
        if (!gameStarted || isComplete) return;
        setSelectedCell({row, col});
    };

    const handleNumberInput = (num: number) => {
        if (!selectedCell || !gameStarted || isComplete) return;
        
        const newBoard = [...board];
        newBoard[selectedCell.row][selectedCell.col] = num;
        setBoard(newBoard);
        
        // Check if board is complete
        if (isValidSudoku(newBoard)) {
            setIsComplete(true);
            setGameStarted(false);
        }
    };

    const isValidSudoku = (board: number[][]) => {
        // First check if all cells are filled (no zeros)
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) return false;
            }
        }
        
        // Check rows
        for (let row = 0; row < 9; row++) {
            const seen = new Set();
            for (let col = 0; col < 9; col++) {
                const num = board[row][col];
                if (seen.has(num)) return false;
                seen.add(num);
            }
        }
        
        // Check columns
        for (let col = 0; col < 9; col++) {
            const seen = new Set();
            for (let row = 0; row < 9; row++) {
                const num = board[row][col];
                if (seen.has(num)) return false;
                seen.add(num);
            }
        }
        
        // Check 3x3 boxes
        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                const seen = new Set();
                for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
                    for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
                        const num = board[row][col];
                        if (seen.has(num)) return false;
                        seen.add(num);
                    }
                }
            }
        }
        
        return true;
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/20 relative">
            <div className="text-center">
                <div className="text-cyan-200 mb-4 text-sm">
                    Time: {formatTime(time)}
                </div>

                <div className="bg-slate-800 p-1 rounded-xl border-2 border-cyan-500/30 mb-3 inline-block">
                    <div className="grid grid-cols-9 gap-1">
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <button
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    className={`w-8 h-8 text-sm rounded border transition-all duration-200 flex items-center justify-center ${
                                        selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                                            ? 'bg-cyan-600 text-white border-cyan-400'
                                            : cell !== 0
                                            ? 'bg-slate-700 text-cyan-300 border-slate-600'
                                            : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
                                    }`}
                                >
                                    {cell === 0 ? '' : cell}
                                </button>
                            ))
                        )}
                    </div>
                </div>


                <div className="mt-6">
                    <button
                        onClick={initializeGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        New Game
                    </button>
                </div>

                {isComplete && (
                    <div className="text-green-400 font-bold mb-6">
                        🎉 Congratulations! You solved the Sudoku in {formatTime(time)}!
                    </div>
                )}
            </div>

            {/* Start Game Overlay */}
            {!gameStarted && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <button
                        onClick={startGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                    >
                        Start Game
                    </button>
                </div>
            )}
        </div>
    );
};

// Tic Tac Toe (X O) Game Component
const TicTacToe: React.FC = () => {
    const emptyBoard: (null | 'X' | 'O')[] = Array(9).fill(null);
    const [squares, setSquares] = useState<(null | 'X' | 'O')[]>(emptyBoard);
    const [xIsNext, setXIsNext] = useState(true);
    // Track turn order per player to enforce max 3 marks rule
    const [xQueue, setXQueue] = useState<number[]>([]);
    const [oQueue, setOQueue] = useState<number[]>([]);
    const [gameStarted, setGameStarted] = useState(false);

    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(Boolean);

    const handleClick = (index: number) => {
        if (!gameStarted || squares[index] || winner) return;
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = 'X';
            // enqueue and enforce max length 3
            const newQueue = [...xQueue, index];
            if (newQueue.length > 3) {
                const oldest = newQueue.shift() as number;
                nextSquares[oldest] = null;
            }
            setXQueue(newQueue);
        } else {
            nextSquares[index] = 'O';
            const newQueue = [...oQueue, index];
            if (newQueue.length > 3) {
                const oldest = newQueue.shift() as number;
                nextSquares[oldest] = null;
            }
            setOQueue(newQueue);
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setSquares(emptyBoard);
        setXIsNext(true);
        setXQueue([]);
        setOQueue([]);
        setGameStarted(false);
    };

    return (
        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/20 relative">
            <div className="text-center mb-4 text-cyan-200 font-semibold">
                {winner ? `Winner: ${winner}` : isDraw ? 'Draw!' : `Turn: ${xIsNext ? 'X' : 'O'}`}
            </div>
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto my-9">
                {squares.map((val, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleClick(idx)}
                        className={`h-20 w-20 md:h-24 md:w-24 rounded-lg border-2 flex items-center justify-center text-3xl font-black transition-colors
                            ${val === 'X' ? 'bg-cyan-600/20 border-cyan-400 text-cyan-300' : val === 'O' ? 'bg-purple-600/20 border-purple-400 text-purple-300' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
                    >
                        {val}
                    </button>
                ))}
            </div>
            <div className="text-center mt-6">
                <button onClick={resetGame} className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors">
                    New Game
                </button>
            </div>

            {/* Start / Result Overlay */}
            {!gameStarted && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <div className="text-center space-y-4">
                        {(winner || isDraw) && (
                            <div className="text-cyan-200 font-semibold">
                                {winner ? `Winner: ${winner}` : 'Draw!'}
                            </div>
                        )}
                        <button
                            onClick={() => setGameStarted(true)}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                        >
                            {winner || isDraw ? 'Play Again' : 'Start Game'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

function calculateWinner(sq: (null | 'X' | 'O')[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
        if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    }
    return null;
}

// Memory Game Component - Enhanced
const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<(string | null)[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [bestTime, setBestTime] = useState<number>(0);

    const symbols = ['🍎', '🍊', '🍌', '🍇', '🍓', '🍑', '🥝', '🍍', '🥭', '🍒', '🍋', '🍉', '🍅', '🥕', '🌽', '🥔', '🍄', '🥜', '🍯', '🧀', '🥚', '🍞', '🥖', '🥨', '🧈', '🥞', '🧇', '🍳', '🥓', '🍖', '🍗', '🥩'];

    const isGameComplete = matched.length === cards.length;

    useEffect(() => {
        if (gameStarted && !isGameComplete) {
            const timer = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameStarted, isGameComplete]);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const cardCount = 24; // 6x8 grid - 24 pairs (48 cards total)
        const selectedSymbols = symbols.slice(0, cardCount);
        const gameCards = [...selectedSymbols, ...selectedSymbols].sort(() => Math.random() - 0.5);
        setCards(gameCards);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setTime(0);
        setGameStarted(false);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const handleCardClick = (index: number) => {
        if (!gameStarted || flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(prev => prev + 1);
            const [first, second] = newFlipped;
            
            if (cards[first] === cards[second]) {
                setMatched(prev => [...prev, first, second]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    useEffect(() => {
        if (isGameComplete && time > 0) {
            setBestTime(prev => prev === 0 ? time : Math.min(prev, time));
            // Stop the timer when game is complete
            setGameStarted(false);
        }
    }, [isGameComplete, time]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };


    return (
        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/20 relative">
            <div className="text-center">
                <div className="text-cyan-200 mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>Moves: {moves}</div>
                    <div>Time: {formatTime(time)}</div>
                    <div>Matched: {matched.length / 2} / 24</div>
                    <div>Best: {bestTime > 0 ? formatTime(bestTime) : '--:--'}</div>
                </div>

                <div className="grid grid-cols-8 gap-1 mb-6 justify-center w-full max-w-md mx-auto">
                    {cards.map((card, index) => (
                        <button
                            key={index}
                            className={`w-10 h-12 text-sm rounded-md transition-all duration-300 flex items-center justify-center ${
                                flipped.includes(index) || matched.includes(index)
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                            }`}
                            onClick={() => handleCardClick(index)}
                        >
                            {flipped.includes(index) || matched.includes(index) ? card : '?'}
                        </button>
                    ))}
                </div>

                {isGameComplete && (
                    <div className="text-green-400 font-bold mb-6">
                        🎉 Congratulations! You won in {moves} moves and {formatTime(time)}!
                    </div>
                )}
                
                <div className="mt-6">
                    <button
                        onClick={initializeGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        New Game
                    </button>
                </div>
            </div>

            {/* Start Game Overlay */}
            {!gameStarted && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <button
                        onClick={startGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                    >
                        Start Game
                    </button>
                </div>
            )}
        </div>
    );
};

// 2048 Game Component
const Game2048: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        setWon(false);
        setGameStarted(false);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const exitGame = () => {
        setGameStarted(false);
    };

    const addRandomTile = (board: number[][]) => {
        const emptyCells: {row: number, col: number}[] = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) {
                    emptyCells.push({row, col});
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const moveLeft = (board: number[][]) => {
        const newBoard = board.map(row => {
            const filtered = row.filter(cell => cell !== 0);
            const merged = [];
            for (let i = 0; i < filtered.length; i++) {
                if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                    merged.push(filtered[i] * 2);
                    setScore(prev => prev + filtered[i] * 2);
                    if (filtered[i] * 2 === 2048) setWon(true);
                    i++;
                } else {
                    merged.push(filtered[i]);
                }
            }
            while (merged.length < 4) merged.push(0);
            return merged;
        });
        return newBoard;
    };

    const moveRight = (board: number[][]) => {
        return board.map(row => {
            const filtered = row.filter(cell => cell !== 0).reverse();
            const merged = [];
            for (let i = 0; i < filtered.length; i++) {
                if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                    merged.push(filtered[i] * 2);
                    setScore(prev => prev + filtered[i] * 2);
                    if (filtered[i] * 2 === 2048) setWon(true);
                    i++;
                } else {
                    merged.push(filtered[i]);
                }
            }
            while (merged.length < 4) merged.push(0);
            return merged.reverse();
        });
    };

    const moveUp = (board: number[][]) => {
        const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
        const moved = moveLeft(transposed);
        return moved[0].map((_, colIndex) => moved.map(row => row[colIndex]));
    };

    const moveDown = (board: number[][]) => {
        const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
        const moved = moveRight(transposed);
        return moved[0].map((_, colIndex) => moved.map(row => row[colIndex]));
    };

    const handleMove = (direction: 'left' | 'right' | 'up' | 'down') => {
        if (gameOver || !gameStarted) return;

        let newBoard: number[][];
        switch (direction) {
            case 'left':
                newBoard = moveLeft(board);
                break;
            case 'right':
                newBoard = moveRight(board);
                break;
            case 'up':
                newBoard = moveUp(board);
                break;
            case 'down':
                newBoard = moveDown(board);
                break;
            default:
                return;
        }

        if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
            addRandomTile(newBoard);
            setBoard(newBoard);
            setBestScore(prev => Math.max(prev, score));
        }

        // Check game over
        if (!canMove(newBoard)) {
            setGameOver(true);
        }
    };

    const canMove = (board: number[][]) => {
        // Check for empty cells
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) return true;
            }
        }

        // Check for possible merges
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const current = board[row][col];
                if (
                    (row < 3 && board[row + 1][col] === current) ||
                    (col < 3 && board[row][col + 1] === current)
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    const getTileColor = (value: number) => {
        const colors: {[key: number]: string} = {
            0: 'bg-slate-700',
            2: 'bg-slate-600',
            4: 'bg-slate-500',
            8: 'bg-orange-500',
            16: 'bg-orange-400',
            32: 'bg-orange-300',
            64: 'bg-yellow-500',
            128: 'bg-yellow-400',
            256: 'bg-yellow-300',
            512: 'bg-yellow-200',
            1024: 'bg-yellow-100',
            2048: 'bg-cyan-500'
        };
        return colors[value] || 'bg-cyan-400';
    };

    const getTextColor = (value: number) => {
        return value <= 4 ? 'text-slate-200' : 'text-slate-900';
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Only handle arrow keys when game is started and not over
            if (gameOver || !gameStarted) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('right');
                    break;
                case 'ArrowUp':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('down');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [board, gameOver, gameStarted]);

    return (
        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/20 relative">
            <div className="text-center">
                <div className="text-cyan-200 mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>Score: {score}</div>
                    <div>Best: {bestScore}</div>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border-2 border-cyan-500/30 mt-6 inline-block">
                    <div className="grid grid-cols-4 gap-1">
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-200 ${getTileColor(cell)} ${getTextColor(cell)} ${
                                        cell !== 0 ? 'shadow-lg transform hover:scale-105' : ''
                                    }`}
                                >
                                    {cell === 0 ? '' : cell}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {won && !gameOver && (
                    <div className="text-green-400 font-bold mb-2">
                        🎉 You reached 2048! Keep going!
                    </div>
                )}

                {/* Game over message moved to overlay */}


                <div className="mt-10">
                    <button
                        onClick={initializeGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        New Game
                    </button>
                </div>
            </div>

            {/* Start / Game Over Overlay */}
            {(!gameStarted || gameOver) && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <div className="text-center space-y-4">
                        {gameOver && (
                            <div className="text-red-400 font-bold">
                                Game Over! Final Score: {score}
                            </div>
                        )}
                        <div className="flex items-center justify-center gap-3">
                            {!gameOver && (
                                <button
                                    onClick={startGame}
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                                >
                                    Start Game
                                </button>
                            )}
                            {gameOver && (
                                <button
                                    onClick={initializeGame}
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                                >
                                    New Game
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Games: React.FC = () => {
    return (
        <section id="games" className="py-12 bg-slate-950">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="relative flex flex-col items-center justify-center mb-12 mt-20">
                    <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
                        <div
                            style={{
                                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                            }}
                            className="absolute inset-auto right-1/2 h-32 overflow-visible w-48 sm:w-64 md:w-80 lg:w-[20rem] mt-7 bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
                        >
                            <div className="absolute w-[100%] left-0 bg-slate-950 h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                            <div className="absolute w-20 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                        </div>
                        <div
                            style={{
                                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                            }}
                            className="absolute inset-auto left-1/2 h-32 w-48 sm:w-64 md:w-80 lg:w-[20rem] mt-7 bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
                        >
                            <div className="absolute w-20 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                            <div className="absolute w-[100%] right-0 bg-slate-950 h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                        </div>
                        <div className="absolute top-1/2 h-24 w-48 sm:w-64 md:w-80 lg:w-[20rem] translate-y-6 bg-slate-950 blur-2xl"></div>
                        <div className="absolute top-1/2 z-50 h-24 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                        <div className="absolute inset-auto z-50 h-18 w-[18rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
                        <div className="absolute inset-auto z-30 h-18 w-40 -translate-y-[3rem] rounded-full bg-cyan-400 blur-2xl"></div>
                        <div className="absolute inset-auto z-50 h-0.5 w-48 sm:w-64 md:w-80 lg:w-[20rem] -translate-y-[3.5rem] mt-2.5 bg-cyan-400"></div>
                        <div className="absolute inset-auto z-10 h-22 w-full -translate-y-[6rem] bg-slate-950"></div>
                    </div>
                </div>

                <div className="relative z-50">
                    <GamesGrid />
                </div>
            </div>
        </section>
    );
};

export default Games;
