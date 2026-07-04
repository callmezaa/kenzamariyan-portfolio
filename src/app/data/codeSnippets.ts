export interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
  highlightLines?: number[];
}

export const codeSnippets: Record<string, CodeSnippet> = {
  "ContractChill — AI Contract Analyzer": {
    filename: "api/analyze-contract.ts",
    language: "typescript",
    highlightLines: [3, 4, 5, 10, 11],
    code: `import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function analyzeContract(file: File): Promise<Analysis> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const loader = new PDFLoader(file);
  const docs = await loader.load();
  const text = docs.map((d) => d.pageContent).join("\\n");

  const prompt = \`Analyze this contract and identify:
  1. High-risk clauses (unlimited liability, IP assignment, non-compete)
  2. Missing standard protections
  3. Negotiation recommendations

  Contract text:
  \${text}\`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return parseAnalysis(response.text());
}`,
  },
  "Assetra — Digital Asset Marketplace": {
    filename: "app/api/products/route.ts",
    language: "typescript",
    highlightLines: [1, 8, 9, 12],
    code: `import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12;

  let query = supabase
    .from("products")
    .select("*, profiles!inner(username, avatar_url)", { count: "exact" })
    .eq("status", "published");

  if (category) query = query.eq("category", category);

  const orderMap: Record<string, string> = {
    newest: "created_at",
    price_asc: "price",
    price_desc: "price",
    popular: "sales_count",
  };

  query = query.order(
    orderMap[sort] || "created_at",
    { ascending: sort === "price_asc" }
  );

  const from = (page - 1) * limit;
  const { data, count } = await query
    .range(from, from + limit - 1);

  return NextResponse.json({
    products: data,
    total: count,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  });
}`,
  },
  "Gotani Mobile POS Application": {
    filename: "src/sync/TransactionSync.ts",
    language: "typescript",
    highlightLines: [3, 11, 12, 19],
    code: `import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SYNC_KEY = "@offline_tx_queue";

export async function syncTransaction(tx: OfflineTransaction) {
  // Queue locally first for instant UX
  const raw = await AsyncStorage.getItem(SYNC_KEY);
  const queue: OfflineTransaction[] = raw ? JSON.parse(raw) : [];
  queue.push({ ...tx, synced: false });
  await AsyncStorage.setItem(SYNC_KEY, JSON.stringify(queue));

  // Attempt Firestore sync
  try {
    await addDoc(collection(db, "transactions"), {
      ...tx,
      syncedAt: serverTimestamp(),
    });
    // Mark as synced
    const updated = queue.filter((t) => t.id !== tx.id);
    await AsyncStorage.setItem(SYNC_KEY, JSON.stringify(updated));
  } catch {
    console.log("No connection — tx queued for later sync");
  }
}

export async function flushPendingSyncs() {
  const raw = await AsyncStorage.getItem(SYNC_KEY);
  if (!raw) return;
  const queue: OfflineTransaction[] = JSON.parse(raw);
  for (const tx of queue.filter((t) => !t.synced)) {
    await syncTransaction(tx);
  }
}`,
  },
  "Monetra — Personal Finance Tracker": {
    filename: "internal/handler/budget.go",
    language: "go",
    highlightLines: [5, 6, 15, 16],
    code: `package handler

import (
  "net/http"
  "monetra/internal/db"
  "github.com/gin-gonic/gin"
)

type BudgetSummary struct {
  TotalBudget   float64 \`json:"total_budget"\`
  TotalSpent    float64 \`json:"total_spent"\`
  Remaining     float64 \`json:"remaining"\`
  Categories    []CategoryBreakdown \`json:"categories"\`
}

func GetBudgetSummary(c *gin.Context) {
  userID := c.GetString("user_id")

  var summary BudgetSummary
  query := \`
    SELECT COALESCE(SUM(b.amount), 0),
           COALESCE(SUM(t.amount), 0)
    FROM budgets b
    LEFT JOIN transactions t
      ON t.category_id = b.category_id
      AND t.user_id = b.user_id
      AND t.date >= b.start_date
      AND t.date <= b.end_date
    WHERE b.user_id = \$1
  \`

  err := db.Pool.QueryRow(c, query, userID).
    Scan(&summary.TotalBudget, &summary.TotalSpent)
  if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
    return
  }

  summary.Remaining = summary.TotalBudget - summary.TotalSpent
  c.JSON(http.StatusOK, summary)
}`,
  },
  "NexTalk — Real-Time Messaging App": {
    filename: "internal/ws/hub.go",
    language: "go",
    highlightLines: [3, 10, 11, 20],
    code: `package ws

import (
  "sync"
  "encoding/json"
  "github.com/gorilla/websocket"
)

type Hub struct {
  mu       sync.RWMutex
  rooms    map[string]map[*Client]bool
  register chan *Client
}

func NewHub() *Hub {
  return &Hub{
    rooms:    make(map[string]map[*Client]bool),
    register: make(chan *Client, 256),
  }
}

func (h *Hub) Run() {
  for {
    select {
    case client := <-h.register:
      h.mu.Lock()
      room := client.RoomID
      if h.rooms[room] == nil {
        h.rooms[room] = make(map[*Client]bool)
      }
      h.rooms[room][client] = true
      h.mu.Unlock()

      // Notify others in room
      msg, _ := json.Marshal(map[string]string{
        "type": "user_joined",
        "id":   client.UserID,
      })
      h.broadcastToRoom(room, msg, client)
    }
  }
}`,
  },
  "InterviewOS — AI-Powered Interview Platform": {
    filename: "server/src/webrtc/room.gateway.ts",
    language: "typescript",
    highlightLines: [2, 10, 11, 18, 19],
    code: `import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("signal")
  handleSignal(
    @ConnectedSocket() client: Socket,
    payload: { roomId: string; signal: any },
  ) {
    // Relay WebRTC signal to all peers in room except sender
    client.to(payload.roomId).emit("signal", {
      from: client.id,
      signal: payload.signal,
    });
  }

  @SubscribeMessage("code:change")
  handleCodeChange(
    @ConnectedSocket() client: Socket,
    payload: { roomId: string; content: string; cursor: Position },
  ) {
    client.to(payload.roomId).emit("code:update", {
      content: payload.content,
      cursor: payload.cursor,
    });
  }

  @SubscribeMessage("transcript")
  handleTranscript(
    @ConnectedSocket() client: Socket,
    payload: { roomId: string; text: string },
  ) {
    this.server.to(payload.roomId).emit("transcript:chunk", {
      speaker: client.id,
      text: payload.text,
    });
  }
}`,
  },
};
