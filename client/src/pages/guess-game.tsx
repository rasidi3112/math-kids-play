import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Operation = "addition" | "subtraction" | "multiplication" | "division";

interface GameState {
  num1: number;
  num2: number;
  operation: Operation;
  correctAnswer: number;
  userGuess: string;
  attempts: number;
  score: number;
  round: number;
  feedback: "too_low" | "too_high" | "correct" | null;
}

const operationSymbols = {
  addition: "+",
  subtraction: "-",
  multiplication: "×",
  division: "÷",
};

const operationNames = {
  addition: "Penjumlahan",
  subtraction: "Pengurangan",
  multiplication: "Perkalian",
  division: "Pembagian",
};

const generateProblem = (operation: Operation) => {
  let num1: number, num2: number, correctAnswer: number;

  switch (operation) {
    case "addition":
      num1 = Math.floor(Math.random() * 30) + 1;
      num2 = Math.floor(Math.random() * 30) + 1;
      correctAnswer = num1 + num2;
      break;
    case "subtraction":
      num1 = Math.floor(Math.random() * 40) + 20;
      num2 = Math.floor(Math.random() * num1);
      correctAnswer = num1 - num2;
      break;
    case "multiplication":
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      correctAnswer = num1 * num2;
      break;
    case "division":
      num2 = Math.floor(Math.random() * 12) + 1;
      correctAnswer = Math.floor(Math.random() * 12) + 1;
      num1 = num2 * correctAnswer;
      break;
  }

  return { num1, num2, correctAnswer };
};

export default function GuessGame() {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    num1: 0,
    num2: 0,
    operation: "addition",
    correctAnswer: 0,
    userGuess: "",
    attempts: 0,
    score: 0,
    round: 1,
    feedback: null,
  });

  const startGame = (operation: Operation) => {
    const problem = generateProblem(operation);
    setSelectedOperation(operation);
    setGameState({
      ...problem,
      operation,
      userGuess: "",
      attempts: 0,
      score: 0,
      round: 1,
      feedback: null,
    });
    setGameStarted(true);
    setGameEnded(false);
  };

  const handleGuess = () => {
    const guess = parseInt(gameState.userGuess);
    if (isNaN(guess)) return;

    const newAttempts = gameState.attempts + 1;

    if (guess === gameState.correctAnswer) {
      const points = Math.max(30 - newAttempts * 5, 5);
      const newScore = gameState.score + points;

      if (gameState.round < 5) {
        const problem = generateProblem(gameState.operation);
        setTimeout(() => {
          setGameState({
            ...problem,
            operation: gameState.operation,
            userGuess: "",
            attempts: 0,
            score: newScore,
            round: gameState.round + 1,
            feedback: null,
          });
        }, 1500);
      } else {
        setTimeout(() => {
          setGameEnded(true);
        }, 1500);
      }

      setGameState({
        ...gameState,
        attempts: newAttempts,
        score: newScore,
        feedback: "correct",
      });
    } else if (guess < gameState.correctAnswer) {
      setGameState({
        ...gameState,
        attempts: newAttempts,
        userGuess: "",
        feedback: "too_low",
      });
    } else {
      setGameState({
        ...gameState,
        attempts: newAttempts,
        userGuess: "",
        feedback: "too_high",
      });
    }
  };

  const resetGame = () => {
    setSelectedOperation(null);
    setGameStarted(false);
    setGameEnded(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="mb-8 rounded-full hover-elevate active-elevate-2"
              data-testid="button-back-home"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold text-foreground mb-4">
              Tebak Angka 🎯
            </h1>
            <p className="text-xl text-muted-foreground">
              Tebak hasil perhitungan dengan petunjuk!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(["addition", "subtraction", "multiplication", "division"] as Operation[]).map((op) => (
              <motion.div
                key={op}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="p-8 cursor-pointer hover-elevate active-elevate-2 transition-all"
                  onClick={() => startGame(op)}
                  data-testid={`button-start-${op}`}
                >
                  <div className="text-center">
                    <div className="text-5xl font-display font-bold text-secondary mb-4">
                      {operationSymbols[op]}
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      {operationNames[op]}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    const stars = gameState.score >= 100 ? 3 : gameState.score >= 60 ? 2 : gameState.score >= 30 ? 1 : 0;

    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-12 text-center bg-gradient-to-br from-secondary/10 to-primary/10">
              <Trophy className="h-24 w-24 text-accent mx-auto mb-6 animate-bounce-in" />
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Game Selesai!
              </h2>
              <div className="text-6xl font-display font-bold text-secondary mb-6">
                {gameState.score} Poin
              </div>
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-12 w-12 ${
                      i < stars ? "text-accent fill-accent" : "text-muted"
                    } animate-bounce-in`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <p className="text-xl text-muted-foreground mb-8">
                {stars === 3 && "Sempurna! Kamu ahli menebak! 🌟"}
                {stars === 2 && "Bagus! Terus tingkatkan! 👏"}
                {stars === 1 && "Cukup baik! Latihan lagi ya! 💪"}
                {stars === 0 && "Jangan menyerah! Coba lagi! 🚀"}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={resetGame}
                  className="rounded-full hover-elevate active-elevate-2"
                  data-testid="button-play-again"
                >
                  Main Lagi
                </Button>
                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full hover-elevate active-elevate-2"
                    data-testid="button-back-to-home"
                  >
                    Kembali ke Beranda
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Sparkles className="h-6 w-6 text-secondary" />
            <span className="text-xl font-display font-bold text-foreground">
              Round {gameState.round}/5
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Trophy className="h-6 w-6 text-accent" />
            <span className="text-xl font-display font-bold text-foreground">
              {gameState.score} poin
            </span>
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={gameState.round}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-12 mb-8 bg-gradient-to-br from-secondary/5 to-primary/5">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-mono font-bold text-foreground mb-4">
                  {gameState.num1} {operationSymbols[gameState.operation]} {gameState.num2} = ?
                </div>
                <p className="text-lg text-muted-foreground">
                  Percobaan: {gameState.attempts}
                </p>
              </div>
            </Card>

            {/* Input and Feedback */}
            <div className="max-w-md mx-auto">
              <div className="flex gap-4 mb-6">
                <input
                  type="number"
                  value={gameState.userGuess}
                  onChange={(e) => setGameState({ ...gameState, userGuess: e.target.value })}
                  onKeyPress={(e) => e.key === "Enter" && handleGuess()}
                  className="flex-1 px-6 py-4 text-3xl font-mono font-bold text-center border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="?"
                  data-testid="input-guess"
                />
                <Button
                  size="lg"
                  onClick={handleGuess}
                  disabled={!gameState.userGuess}
                  className="px-8 rounded-xl hover-elevate active-elevate-2"
                  data-testid="button-guess"
                >
                  Tebak
                </Button>
              </div>

              <AnimatePresence>
                {gameState.feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    {gameState.feedback === "correct" && (
                      <Card className="p-6 bg-success text-success-foreground">
                        <div className="flex items-center justify-center gap-3">
                          <Star className="h-8 w-8 fill-current" />
                          <span className="text-2xl font-display font-bold">
                            Benar! 🎉
                          </span>
                        </div>
                      </Card>
                    )}
                    {gameState.feedback === "too_low" && (
                      <Card className="p-6 bg-primary/20">
                        <span className="text-xl font-display font-semibold text-foreground">
                          ⬆️ Tebakanmu terlalu kecil!
                        </span>
                      </Card>
                    )}
                    {gameState.feedback === "too_high" && (
                      <Card className="p-6 bg-primary/20">
                        <span className="text-xl font-display font-semibold text-foreground">
                          ⬇️ Tebakanmu terlalu besar!
                        </span>
                      </Card>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
