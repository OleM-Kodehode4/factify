import express from "express";
import Fact from "../models/Fact.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Hent alle facts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const facts = await Fact.findAll();
    res.json(facts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hent tilfeldig fact
router.get("/random", authMiddleware, async (req, res) => {
  try {
    const facts = await Fact.findAll();
    if (facts.length === 0)
      return res.status(404).json({ message: "No facts found." });

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    res.json(randomFact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hent fact med ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const fact = await Fact.findByPk(req.params.id);
    if (!fact) return res.status(404).json({ message: "Fact not found." });

    res.json(fact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Opprett ny fact
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { fact } = req.body;
    if (!fact)
      return res.status(400).json({ message: "Fact text is required." });

    const newFact = await Fact.create({ fact });
    res.status(201).json(newFact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
