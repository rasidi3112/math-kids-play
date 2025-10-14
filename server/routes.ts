import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserProgressSchema,
  insertGameScoreSchema,
  insertAchievementSchema,
  insertLearningProgressSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User Progress Routes
  app.get("/api/progress/:studentName", async (req, res) => {
    try {
      const { studentName } = req.params;
      const progress = await storage.getUserProgress(studentName);
      
      if (!progress) {
        return res.json({
          studentName,
          totalPoints: 0,
          level: 1,
        });
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const validatedData = insertUserProgressSchema.parse(req.body);
      const progress = await storage.createOrUpdateUserProgress(validatedData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Invalid progress data" });
    }
  });

  // Game Scores Routes
  app.get("/api/scores/:studentName", async (req, res) => {
    try {
      const { studentName } = req.params;
      const scores = await storage.getGameScores(studentName);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: "Failed to get game scores" });
    }
  });

  app.get("/api/scores/:studentName/:gameType", async (req, res) => {
    try {
      const { studentName, gameType } = req.params;
      const scores = await storage.getGameScoresByType(studentName, gameType);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: "Failed to get game scores" });
    }
  });

  app.post("/api/scores", async (req, res) => {
    try {
      const validatedData = insertGameScoreSchema.parse(req.body);
      const score = await storage.addGameScore(validatedData);
      res.json(score);
    } catch (error) {
      res.status(400).json({ error: "Invalid score data" });
    }
  });

  // Achievements Routes
  app.get("/api/achievements/:studentName", async (req, res) => {
    try {
      const { studentName } = req.params;
      const achievements = await storage.getAchievements(studentName);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Failed to get achievements" });
    }
  });

  app.post("/api/achievements", async (req, res) => {
    try {
      const validatedData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.addAchievement(validatedData);
      res.json(achievement);
    } catch (error) {
      res.status(400).json({ error: "Invalid achievement data" });
    }
  });

  // Learning Progress Routes
  app.get("/api/learning/:studentName", async (req, res) => {
    try {
      const { studentName } = req.params;
      const progress = await storage.getLearningProgress(studentName);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to get learning progress" });
    }
  });

  app.get("/api/learning/:studentName/:operation", async (req, res) => {
    try {
      const { studentName, operation } = req.params;
      const progress = await storage.getLearningProgressByOperation(studentName, operation);
      
      if (!progress) {
        return res.json({
          studentName,
          operation,
          completed: 0,
          starsEarned: 0,
        });
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to get learning progress" });
    }
  });

  app.post("/api/learning", async (req, res) => {
    try {
      const validatedData = insertLearningProgressSchema.parse(req.body);
      const progress = await storage.updateLearningProgress(validatedData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Invalid learning progress data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
