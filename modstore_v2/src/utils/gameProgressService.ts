import { useState, useEffect } from 'react';

// Define types for the game progress tracking
export interface GameProgress {
  gameId: string;
  completionPercentage: number;
  startedAt: string;
  lastPlayedAt: string;
  achievements: Achievement[];
  levelInfo: LevelInfo;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt?: string;
  iconUrl?: string;
}

export interface LevelInfo {
  currentLevel: number;
  maxLevel: number;
  currentExp: number;
  expToNextLevel: number;
}

// Mock local storage key for persistence
const GAME_PROGRESS_STORAGE_KEY = 'modstore_game_progress';

// A custom hook for working with game progress
export function useGameProgress() {
  const [gameProgress, setGameProgress] = useState<Record<string, GameProgress>>({});
  const [loaded, setLoaded] = useState(false);

  // Load progress from local storage on initial mount
  useEffect(() => {
    const loadProgress = () => {
      try {
        const storedProgress = localStorage.getItem(GAME_PROGRESS_STORAGE_KEY);
        if (storedProgress) {
          setGameProgress(JSON.parse(storedProgress));
        }
        setLoaded(true);
      } catch (error) {
        console.error('Failed to load game progress:', error);
        setLoaded(true);
      }
    };

    loadProgress();
  }, []);

  // Save progress to local storage whenever it changes
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(GAME_PROGRESS_STORAGE_KEY, JSON.stringify(gameProgress));
      } catch (error) {
        console.error('Failed to save game progress:', error);
      }
    }
  }, [gameProgress, loaded]);

  // Initialize progress for a new game
  const initializeGameProgress = (gameId: string, gameName: string) => {
    if (!gameProgress[gameId]) {
      const now = new Date().toISOString();

      setGameProgress(prev => ({
        ...prev,
        [gameId]: {
          gameId,
          completionPercentage: 0,
          startedAt: now,
          lastPlayedAt: now,
          achievements: [],
          levelInfo: {
            currentLevel: 1,
            maxLevel: 100,
            currentExp: 0,
            expToNextLevel: 1000
          }
        }
      }));

      return true;
    }

    return false;
  };

  // Update game progress
  const updateGameProgress = (gameId: string, updates: Partial<GameProgress>) => {
    if (gameProgress[gameId]) {
      setGameProgress(prev => ({
        ...prev,
        [gameId]: {
          ...prev[gameId],
          ...updates,
          lastPlayedAt: new Date().toISOString()
        }
      }));

      return true;
    }

    return false;
  };

  // Update level info
  const updateLevelInfo = (gameId: string, levelUpdates: Partial<LevelInfo>) => {
    if (gameProgress[gameId]) {
      setGameProgress(prev => ({
        ...prev,
        [gameId]: {
          ...prev[gameId],
          levelInfo: {
            ...prev[gameId].levelInfo,
            ...levelUpdates
          },
          lastPlayedAt: new Date().toISOString()
        }
      }));

      return true;
    }

    return false;
  };

  // Add achievement
  const unlockAchievement = (gameId: string, achievement: Achievement) => {
    if (gameProgress[gameId]) {
      // Check if achievement is already unlocked
      const achievementExists = gameProgress[gameId].achievements.some(a => a.id === achievement.id);

      if (!achievementExists) {
        setGameProgress(prev => ({
          ...prev,
          [gameId]: {
            ...prev[gameId],
            achievements: [
              ...prev[gameId].achievements,
              {
                ...achievement,
                unlockedAt: new Date().toISOString()
              }
            ],
            lastPlayedAt: new Date().toISOString()
          }
        }));

        return true;
      }
    }

    return false;
  };

  // Get progress for a specific game
  const getGameProgressById = (gameId: string): GameProgress | null => {
    return gameProgress[gameId] || null;
  };

  // Check if progress exists for a game
  const hasGameProgress = (gameId: string): boolean => {
    return !!gameProgress[gameId];
  };

  // Get all games with progress
  const getAllGameProgresses = (): GameProgress[] => {
    return Object.values(gameProgress);
  };

  // Calculate experience points from playtime
  const addExperiencePoints = (gameId: string, expPoints: number) => {
    if (gameProgress[gameId]) {
      const { levelInfo } = gameProgress[gameId];
      let { currentExp, currentLevel, expToNextLevel, maxLevel } = levelInfo;

      // Add experience points
      currentExp += expPoints;

      // Check for level up
      let leveledUp = false;
      while (currentExp >= expToNextLevel && currentLevel < maxLevel) {
        currentExp -= expToNextLevel;
        currentLevel++;
        expToNextLevel = Math.floor(expToNextLevel * 1.2); // Increase exp needed for next level
        leveledUp = true;
      }

      // Update level info
      updateLevelInfo(gameId, {
        currentExp,
        currentLevel,
        expToNextLevel
      });

      return leveledUp;
    }

    return false;
  };

  // Clear progress for a specific game
  const resetGameProgress = (gameId: string) => {
    if (gameProgress[gameId]) {
      setGameProgress(prev => {
        const newState = { ...prev };
        delete newState[gameId];
        return newState;
      });

      return true;
    }

    return false;
  };

  // Clear all progress
  const resetAllProgress = () => {
    setGameProgress({});
    return true;
  };

  return {
    gameProgress,
    loaded,
    initializeGameProgress,
    updateGameProgress,
    updateLevelInfo,
    unlockAchievement,
    getGameProgressById,
    hasGameProgress,
    getAllGameProgresses,
    addExperiencePoints,
    resetGameProgress,
    resetAllProgress
  };
}
