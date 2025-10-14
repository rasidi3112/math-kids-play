import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Minus, X, Divide, CheckCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const operationData = {
  addition: {
    title: "Penjumlahan",
    icon: Plus,
    color: "from-chart-1 to-chart-1/80",
    explanation: "Penjumlahan adalah menambahkan dua angka atau lebih menjadi satu.",
    examples: [
      { problem: "2 + 3", answer: "5", explanation: "Kalau kamu punya 2 apel, lalu diberi 3 apel lagi, totalnya jadi 5 apel!" },
      { problem: "5 + 4", answer: "9", explanation: "5 permen ditambah 4 permen = 9 permen" },
      { problem: "10 + 7", answer: "17", explanation: "10 buku ditambah 7 buku = 17 buku" },
    ],
    practices: [
      { problem: "3 + 6", answer: 9 },
      { problem: "8 + 2", answer: 10 },
      { problem: "15 + 5", answer: 20 },
    ],
  },
  subtraction: {
    title: "Pengurangan",
    icon: Minus,
    color: "from-chart-2 to-chart-2/80",
    explanation: "Pengurangan adalah mengurangi atau mengambil sebagian dari angka.",
    examples: [
      { problem: "5 - 2", answer: "3", explanation: "Kalau kamu punya 5 kelereng, lalu 2 diambil, sisanya 3 kelereng!" },
      { problem: "10 - 4", answer: "6", explanation: "10 kue dikurangi 4 kue = 6 kue tersisa" },
      { problem: "15 - 8", answer: "7", explanation: "15 pensil dikurangi 8 pensil = 7 pensil tersisa" },
    ],
    practices: [
      { problem: "9 - 3", answer: 6 },
      { problem: "12 - 7", answer: 5 },
      { problem: "20 - 8", answer: 12 },
    ],
  },
  multiplication: {
    title: "Perkalian",
    icon: X,
    color: "from-chart-3 to-chart-3/80",
    explanation: "Perkalian adalah penjumlahan berulang dari angka yang sama.",
    examples: [
      { problem: "2 × 3", answer: "6", explanation: "2 ditambah 3 kali = 2 + 2 + 2 = 6" },
      { problem: "4 × 5", answer: "20", explanation: "4 ditambah 5 kali = 4 + 4 + 4 + 4 + 4 = 20" },
      { problem: "3 × 7", answer: "21", explanation: "3 ditambah 7 kali = 21" },
    ],
    practices: [
      { problem: "5 × 2", answer: 10 },
      { problem: "3 × 6", answer: 18 },
      { problem: "4 × 8", answer: 32 },
    ],
  },
  division: {
    title: "Pembagian",
    icon: Divide,
    color: "from-chart-4 to-chart-4/80",
    explanation: "Pembagian adalah membagi angka menjadi beberapa bagian yang sama.",
    examples: [
      { problem: "6 ÷ 2", answer: "3", explanation: "6 permen dibagi untuk 2 orang, masing-masing dapat 3 permen" },
      { problem: "12 ÷ 3", answer: "4", explanation: "12 apel dibagi untuk 3 orang = 4 apel per orang" },
      { problem: "20 ÷ 5", answer: "4", explanation: "20 kue dibagi untuk 5 orang = 4 kue per orang" },
    ],
    practices: [
      { problem: "8 ÷ 2", answer: 4 },
      { problem: "15 ÷ 3", answer: 5 },
      { problem: "24 ÷ 6", answer: 4 },
    ],
  },
};

export default function Learn() {
  const [, params] = useRoute("/learn/:operation");
  const operation = params?.operation as keyof typeof operationData;
  const data = operationData[operation];
  
  const [practiceAnswers, setPracticeAnswers] = useState<{ [key: number]: string }>({});
  const [practiceResults, setPracticeResults] = useState<{ [key: number]: boolean | null }>({});
  const [completedPractices, setCompletedPractices] = useState(0);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Materi tidak ditemukan</p>
      </div>
    );
  }

  const Icon = data.icon;

  const handlePracticeSubmit = (index: number) => {
    const userAnswer = parseInt(practiceAnswers[index] || "");
    const correctAnswer = data.practices[index].answer;
    const isCorrect = userAnswer === correctAnswer;
    
    setPracticeResults({ ...practiceResults, [index]: isCorrect });
    
    if (isCorrect && !practiceResults[index]) {
      setCompletedPractices(prev => prev + 1);
    }
  };

  const allPracticesCompleted = completedPractices === data.practices.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`bg-gradient-to-br ${data.color} text-white py-8 px-4`}>
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button
              variant="secondary"
              size="sm"
              className="mb-4 rounded-full hover-elevate active-elevate-2"
              data-testid="button-back-home"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-full">
              <Icon className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">{data.title}</h1>
              <p className="text-lg opacity-90 mt-1">{data.explanation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Contoh Soal
          </h2>
          <div className="grid gap-6">
            {data.examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 hover-elevate">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-center md:text-left">
                      <div className="text-4xl font-mono font-bold text-foreground mb-2">
                        {example.problem} = <span className="text-primary">{example.answer}</span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        {example.explanation}
                      </p>
                    </div>
                    <CheckCircle className="h-12 w-12 text-success" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Latihan Soal
          </h2>
          <div className="grid gap-6">
            {data.practices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="text-3xl font-mono font-bold text-foreground flex-shrink-0">
                      {practice.problem} =
                    </div>
                    <input
                      type="number"
                      value={practiceAnswers[index] || ""}
                      onChange={(e) => setPracticeAnswers({ ...practiceAnswers, [index]: e.target.value })}
                      className="w-24 px-4 py-2 text-2xl font-mono font-bold text-center border-2 border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="?"
                      data-testid={`input-practice-${index}`}
                    />
                    <Button
                      onClick={() => handlePracticeSubmit(index)}
                      disabled={!practiceAnswers[index]}
                      className="rounded-full hover-elevate active-elevate-2"
                      data-testid={`button-check-${index}`}
                    >
                      Cek Jawaban
                    </Button>
                    {practiceResults[index] !== null && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center gap-2 ${
                          practiceResults[index] ? "text-success" : "text-destructive"
                        }`}
                      >
                        {practiceResults[index] ? (
                          <>
                            <CheckCircle className="h-6 w-6" />
                            <span className="font-semibold">Benar!</span>
                          </>
                        ) : (
                          <>
                            <X className="h-6 w-6" />
                            <span className="font-semibold">Coba lagi!</span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {allPracticesCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8"
            >
              <Card className="p-8 bg-gradient-to-br from-success/20 to-success/10 border-success">
                <div className="text-center">
                  <div className="flex justify-center gap-2 mb-4">
                    <Star className="h-12 w-12 text-accent fill-accent animate-bounce-in" />
                    <Star className="h-12 w-12 text-accent fill-accent animate-bounce-in" style={{ animationDelay: "0.1s" }} />
                    <Star className="h-12 w-12 text-accent fill-accent animate-bounce-in" style={{ animationDelay: "0.2s" }} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-foreground mb-2">
                    Luar Biasa! 🎉
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Kamu sudah menguasai {data.title.toLowerCase()}!
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/">
                      <Button size="lg" className="rounded-full hover-elevate active-elevate-2" data-testid="button-back-to-home">
                        Kembali ke Beranda
                      </Button>
                    </Link>
                    <Link href="/game/quiz">
                      <Button size="lg" variant="outline" className="rounded-full hover-elevate active-elevate-2" data-testid="button-play-quiz">
                        Main Game Quiz
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
