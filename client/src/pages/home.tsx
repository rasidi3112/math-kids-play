import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus, X, Divide, Trophy, Star, Gamepad2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const operations = [
  {
    id: "addition",
    title: "Penjumlahan",
    icon: Plus,
    color: "from-chart-1 to-chart-1/80",
    description: "Belajar menambah angka",
  },
  {
    id: "subtraction",
    title: "Pengurangan",
    icon: Minus,
    color: "from-chart-2 to-chart-2/80",
    description: "Belajar mengurangi angka",
  },
  {
    id: "multiplication",
    title: "Perkalian",
    icon: X,
    color: "from-chart-3 to-chart-3/80",
    description: "Belajar mengalikan angka",
  },
  {
    id: "division",
    title: "Pembagian",
    icon: Divide,
    color: "from-chart-4 to-chart-4/80",
    description: "Belajar membagi angka",
  },
];

const games = [
  {
    id: "quiz",
    title: "Kuis Matematika",
    icon: BookOpen,
    color: "bg-primary",
    description: "Jawab soal dengan cepat!",
  },
  {
    id: "guess",
    title: "Tebak Angka",
    icon: Trophy,
    color: "bg-secondary",
    description: "Tebak hasil perhitungan!",
  },
  {
    id: "dragdrop",
    title: "Cocokkan Jawaban",
    icon: Gamepad2,
    color: "bg-success",
    description: "Drag & drop yang benar!",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl font-display text-primary">+</div>
          <div className="absolute top-32 right-20 text-6xl font-display text-secondary">×</div>
          <div className="absolute bottom-20 left-1/4 text-6xl font-display text-chart-3">−</div>
          <div className="absolute bottom-32 right-1/3 text-6xl font-display text-accent">÷</div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4">
              Math Fun Learning
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Belajar Matematika Jadi Menyenangkan! 🎉
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full hover-elevate active-elevate-2"
                data-testid="button-start-learning"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Mulai Belajar
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-full hover-elevate active-elevate-2"
                data-testid="button-play-games"
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                Main Game
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Modules Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Pilih Materi Belajar
            </h2>
            <p className="text-lg text-muted-foreground">
              Pilih topik yang ingin kamu pelajari!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operations.map((op, index) => (
              <motion.div
                key={op.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/learn/${op.id}`}>
                  <Card className={`p-6 bg-gradient-to-br ${op.color} text-white hover-elevate active-elevate-2 cursor-pointer transition-all h-full`} data-testid={`card-learn-${op.id}`}>
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="p-4 bg-white/20 rounded-full">
                        <op.icon className="h-12 w-12" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-semibold mb-2">
                          {op.title}
                        </h3>
                        <p className="text-sm opacity-90">{op.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Game Seru
            </h2>
            <p className="text-lg text-muted-foreground">
              Asah kemampuan matematika dengan game yang menyenangkan!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/game/${game.id}`}>
                  <Card className={`p-8 ${game.color} text-white hover-elevate active-elevate-2 cursor-pointer transition-all h-full`} data-testid={`card-game-${game.id}`}>
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="p-4 bg-white/20 rounded-full">
                        <game.icon className="h-16 w-16" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-semibold mb-2">
                          {game.title}
                        </h3>
                        <p className="text-sm opacity-90">{game.description}</p>
                      </div>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="mt-2 rounded-full hover-elevate active-elevate-2"
                        data-testid={`button-play-${game.id}`}
                      >
                        Main Sekarang
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/progress">
            <Card className="p-8 bg-gradient-to-br from-accent/20 to-accent/10 hover-elevate active-elevate-2 cursor-pointer" data-testid="card-view-progress">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-accent rounded-full">
                    <Trophy className="h-12 w-12 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                      Lihat Progressmu
                    </h3>
                    <p className="text-muted-foreground">
                      Cek pencapaian dan badge yang sudah kamu dapatkan!
                    </p>
                  </div>
                </div>
                <Button size="lg" className="rounded-full hover-elevate active-elevate-2" data-testid="button-view-progress">
                  <Star className="mr-2 h-5 w-5" />
                  Lihat Progress
                </Button>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-br from-primary/10 to-secondary/10 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-display font-semibold text-foreground mb-4">
            Tim Pengembang
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              "Zaenul Amri",
              "Silmi Altofunnisa",
              "Layya Laily Pebriani",
              "Zahra Aji Dwi Rizki",
              "Sopian Hasanah" // ✅ tambahan nama baru
            ].map((name, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 bg-card rounded-md border border-card-border"
              >
                <p className="font-medium text-foreground">{name}</p>
              </motion.div>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-display font-semibold">
            <Star className="h-5 w-5" />
            UIN MATARAM 2025
            <Star className="h-5 w-5" />
          </div>
        </div>
      </footer>
    </div>
  );
}
