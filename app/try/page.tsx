"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type Game = "Pong" | "Snake";

interface GameDef {
  title: string;
  description: string;
  snippet: { line: string; comment: string }[];
  // draws a static placeholder shape on the canvas as proof it executes
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
}

const GAMES: Record<Game, GameDef> = {
  Pong: {
    title: "Pong",
    description: "The classic two-paddle ball game. Bouncing physics in ~50 lines.",
    snippet: [
      { line: "const canvas = document.getElementById('game');", comment: "// grab the canvas element" },
      { line: "const ctx = canvas.getContext('2d');", comment: "// 2D drawing context" },
      { line: "const ball = { x: 200, y: 150, vx: 3, vy: 2 };", comment: "// ball position + velocity" },
      { line: "const paddle = { y: 130, h: 40, w: 8 };", comment: "// player paddle dimensions" },
      { line: "function draw() {", comment: "// called ~60 times per second" },
      { line: "  ctx.clearRect(0, 0, canvas.width, canvas.height);", comment: "// wipe previous frame" },
      { line: "  ball.x += ball.vx; ball.y += ball.vy;", comment: "// move ball each frame" },
      { line: "  if (ball.y < 0 || ball.y > canvas.height) ball.vy *= -1;", comment: "// bounce off top/bottom" },
      { line: "  ctx.fillRect(ball.x, ball.y, 10, 10);", comment: "// draw ball as a square" },
      { line: "  requestAnimationFrame(draw); }", comment: "// schedule next frame" },
    ],
    draw(ctx, w, h) {
      // Court background
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, w, h);

      // Centre line
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ball
      ctx.fillStyle = "#f9fafb";
      ctx.fillRect(w / 2 - 6, h / 2 - 6, 12, 12);

      // Paddles
      ctx.fillStyle = "#4ade80";
      ctx.fillRect(16, h / 2 - 28, 10, 56);
      ctx.fillStyle = "#f9fafb";
      ctx.fillRect(w - 26, h / 2 - 28, 10, 56);

      // Label
      ctx.fillStyle = "#6b7280";
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.fillText("placeholder — click Run to execute", w / 2, h - 10);
    },
  },
  Snake: {
    title: "Snake",
    description: "Grow your snake by eating apples. Grid-based movement, pure JS.",
    snippet: [
      { line: "const GRID = 20;", comment: "// each cell is 20 × 20 px" },
      { line: "let snake = [{ x: 5, y: 5 }];", comment: "// snake is an array of cells" },
      { line: "let apple = { x: 10, y: 8 };", comment: "// random target cell" },
      { line: "let dir = { x: 1, y: 0 };", comment: "// moving right to start" },
      { line: "function step() {", comment: "// advances one tick" },
      { line: "  const head = { x: snake[0].x + dir.x,", comment: "// compute next head" },
      { line: "                  y: snake[0].y + dir.y };", comment: "//   position" },
      { line: "  snake.unshift(head);", comment: "// grow from the front" },
      { line: "  if (head.x !== apple.x || head.y !== apple.y)", comment: "// didn't eat apple?" },
      { line: "    snake.pop();", comment: "// remove tail to keep length" },
    ],
    draw(ctx, w, h) {
      const G = 20;
      const cols = Math.floor(w / G);
      const rows = Math.floor(h / G);

      // Background
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = "#1f2937";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * G, 0);
        ctx.lineTo(x * G, rows * G);
        ctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * G);
        ctx.lineTo(cols * G, y * G);
        ctx.stroke();
      }

      // Snake body
      const body = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
        { x: 2, y: 5 },
      ];
      body.forEach(({ x, y }, i) => {
        ctx.fillStyle = i === 0 ? "#4ade80" : "#16a34a";
        ctx.fillRect(x * G + 1, y * G + 1, G - 2, G - 2);
      });

      // Apple
      ctx.fillStyle = "#f87171";
      ctx.beginPath();
      ctx.arc(10 * G + G / 2, 8 * G + G / 2, G / 2 - 2, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = "#6b7280";
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.fillText("placeholder — click Run to execute", w / 2, rows * G - 6);
    },
  },
};

const GAME_KEYS: Game[] = ["Pong", "Snake"];

export default function TryPage() {
  const [game, setGame] = useState<Game>("Pong");
  const [ran, setRan] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleRun() {
    setRan(true);
    // Use setTimeout so the canvas mounts before we draw
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      GAMES[game].draw(ctx, canvas.width, canvas.height);
    }, 0);
  }

  function handleGameChange(g: Game) {
    setGame(g);
    setRan(false);
  }

  const { snippet, description } = GAMES[game];

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
          Codegarden
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
              Project preview
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              Pick a game, read the code, run it.
            </h1>
          </div>
          <div className="flex gap-2">
            {GAME_KEYS.map((g) => (
              <button
                key={g}
                onClick={() => handleGameChange(g)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  game === g
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-neutral-300 text-neutral-700 hover:border-neutral-900"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-6 text-neutral-600">{description}</p>

        {/* Annotated snippet */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-400">
              {game.toLowerCase()}.js — starter snippet
            </span>
            <span className="text-xs text-neutral-500">{snippet.length} lines</span>
          </div>
          <div className="space-y-1 font-mono text-xs">
            {snippet.map(({ line, comment }, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-5 shrink-0 select-none text-right text-neutral-600">
                  {i + 1}
                </span>
                <span className="text-green-300">{line}</span>
                <span className="ml-auto shrink-0 text-neutral-500 hidden sm:inline">
                  {comment}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Run button + canvas */}
        <div className="mt-6">
          {!ran ? (
            <button
              onClick={handleRun}
              className="rounded-full bg-green-600 px-8 py-3.5 font-medium text-white transition hover:bg-green-700"
            >
              Run →
            </button>
          ) : (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
                  Executed
                </span>
                <button
                  onClick={() => handleGameChange(game)}
                  className="ml-auto text-xs text-neutral-400 underline hover:text-neutral-600"
                >
                  Reset
                </button>
              </div>
              <canvas
                ref={canvasRef}
                width={560}
                height={300}
                className="w-full rounded-2xl border border-neutral-200"
              />
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-neutral-400">
          This is a v0 preview. The canvas renders a static placeholder — no real game loop yet.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          to build the real thing with your AI tutor.
        </p>
      </div>
    </div>
  );
}
