import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Network, Search, Plus, RefreshCw, Terminal, Sparkles, Play, ShieldAlert, Cpu } from 'lucide-react';
import { KNOWLEDGE_GRAPH_NODES } from '../data/portfolioData';
import { KnowledgeNode } from '../types';

export const KnowledgeGraphSandbox: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [nodes, setNodes] = useState<KnowledgeNode[]>(() =>
    KNOWLEDGE_GRAPH_NODES.map((n, i) => ({
      ...n,
      x: 100 + (i % 3) * 220 + Math.random() * 40,
      y: 100 + Math.floor(i / 3) * 160 + Math.random() * 40,
      vx: 0,
      vy: 0,
    }))
  );

  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(nodes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mcpStreamLogs, setMcpStreamLogs] = useState<string[]>([
    '[MCP Server] Listening on stdio & SSE transport (port 3001)...',
    '[MCP Event] Directory watch active: /workspace (200ms debounce)',
    '[MCP Response] SSE stream initialized with 9 active graph nodes',
  ]);

  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [isAddingNode, setIsAddingNode] = useState(false);

  // Drag state
  const draggedNodeRef = useRef<KnowledgeNode | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Physics animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const updatePhysicsAndDraw = () => {
      // 1. Force physics simulation step (Spring embedder)
      setNodes((prevNodes) => {
        const nextNodes = prevNodes.map((n) => ({ ...n }));
        const repulsionStrength = 2200;
        const springLength = 140;
        const damping = 0.85;

        // Repulsion between all node pairs
        for (let i = 0; i < nextNodes.length; i++) {
          for (let j = i + 1; j < nextNodes.length; j++) {
            const n1 = nextNodes[i];
            const n2 = nextNodes[j];
            const dx = (n2.x || 0) - (n1.x || 0);
            const dy = (n2.y || 0) - (n1.y || 0);
            const distSq = dx * dx + dy * dy + 0.1;
            const dist = Math.sqrt(distSq);

            if (dist < 400) {
              const force = repulsionStrength / distSq;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;

              if (draggedNodeRef.current?.id !== n1.id) {
                n1.vx = (n1.vx || 0) - fx;
                n1.vy = (n1.vy || 0) - fy;
              }
              if (draggedNodeRef.current?.id !== n2.id) {
                n2.vx = (n2.vx || 0) + fx;
                n2.vy = (n2.vy || 0) + fy;
              }
            }
          }
        }

        // Attraction along connections
        for (const n1 of nextNodes) {
          for (const connId of n1.connections) {
            const n2 = nextNodes.find((x) => x.id === connId);
            if (n2) {
              const dx = (n2.x || 0) - (n1.x || 0);
              const dy = (n2.y || 0) - (n1.y || 0);
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              const displacement = dist - springLength;
              const force = displacement * 0.03;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;

              if (draggedNodeRef.current?.id !== n1.id) {
                n1.vx = (n1.vx || 0) + fx;
                n1.vy = (n1.vy || 0) + fy;
              }
              if (draggedNodeRef.current?.id !== n2.id) {
                n2.vx = (n2.vx || 0) - fx;
                n2.vy = (n2.vy || 0) - fy;
              }
            }
          }
        }

        // Apply velocities and bounds
        const padding = 50;
        const width = canvas.width;
        const height = canvas.height;

        return nextNodes.map((n) => {
          if (draggedNodeRef.current?.id === n.id) {
            n.x = mousePosRef.current.x;
            n.y = mousePosRef.current.y;
            n.vx = 0;
            n.vy = 0;
            return n;
          }

          let nx = (n.x || 0) + (n.vx || 0);
          let ny = (n.y || 0) + (n.vy || 0);

          nx = Math.max(padding, Math.min(width - padding, nx));
          ny = Math.max(padding, Math.min(height - padding, ny));

          return {
            ...n,
            x: nx,
            y: ny,
            vx: (n.vx || 0) * damping,
            vy: (n.vy || 0) * damping,
          };
        });
      });

      // 2. Render on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Edges
      nodes.forEach((node) => {
        if (!node.x || !node.y) return;
        node.connections.forEach((targetId) => {
          const target = nodes.find((n) => n.id === targetId);
          if (target && target.x && target.y) {
            const isSelected =
              selectedNode?.id === node.id || selectedNode?.id === target.id;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = isSelected
              ? 'rgba(56, 189, 248, 0.8)'
              : 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = isSelected ? 2 : 1;
            ctx.stroke();
          }
        });
      });

      // Draw Nodes
      nodes.forEach((node) => {
        if (!node.x || !node.y) return;
        const isSelected = selectedNode?.id === node.id;
        const isMatch =
          searchQuery &&
          node.label.toLowerCase().includes(searchQuery.toLowerCase());

        let color = '#38BDF8';
        if (node.type === 'model') color = '#818CF8';
        if (node.type === 'mcp') color = '#34D399';
        if (node.type === 'tool') color = '#FBBF24';

        // Outer glow circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, isSelected ? 22 : 16, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? 'rgba(56, 189, 248, 0.25)'
          : 'rgba(15, 23, 42, 0.8)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, isSelected ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = isMatch ? '#F43F5E' : color;
        ctx.fill();
        ctx.strokeStyle = '#0B0F17';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node Label
        ctx.font = isSelected ? 'bold 12px "JetBrains Mono"' : '11px "Plus Jakarta Sans"';
        ctx.fillStyle = isSelected ? '#FFFFFF' : '#94A3B8';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + (isSelected ? 28 : 22));
      });

      animId = requestAnimationFrame(updatePhysicsAndDraw);
    };

    animId = requestAnimationFrame(updatePhysicsAndDraw);

    return () => cancelAnimationFrame(animId);
  }, [nodes, selectedNode, searchQuery]);

  // Handle canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = Math.max(480, rect.height);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Canvas Mouse Interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const clicked = nodes.find((n) => {
      if (!n.x || !n.y) return false;
      const dx = n.x - clickX;
      const dy = n.y - clickY;
      return Math.sqrt(dx * dx + dy * dy) < 20;
    });

    if (clicked) {
      setSelectedNode(clicked);
      draggedNodeRef.current = clicked;
      mousePosRef.current = { x: clickX, y: clickY };

      // Push MCP log
      setMcpStreamLogs((prev) => [
        `[MCP stdio] Selected node: "${clicked.label}" (${clicked.type})`,
        ...prev.slice(0, 5),
      ]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (draggedNodeRef.current) {
      mousePosRef.current = { x, y };
    }
  };

  const handleMouseUp = () => {
    draggedNodeRef.current = null;
  };

  // Add custom node function
  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeLabel.trim()) return;

    const newNode: KnowledgeNode = {
      id: String(Date.now()),
      label: newNodeLabel.trim(),
      type: 'concept',
      x: 300 + (Math.random() - 0.5) * 100,
      y: 240 + (Math.random() - 0.5) * 100,
      vx: 0,
      vy: 0,
      connections: selectedNode ? [selectedNode.id] : ['1'],
      details: `Custom workspace node created live in browser at ${new Date().toLocaleTimeString()}`,
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedNode(newNode);
    setNewNodeLabel('');
    setIsAddingNode(false);

    setMcpStreamLogs((prev) => [
      `[MCP SSE Stream] Created graph node #${newNode.id}: "${newNode.label}"`,
      ...prev.slice(0, 5),
    ]);
  };

  return (
    <section id="graph" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            AI Knowledge Graph <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">& MCP Server</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Experience Aryan’s custom 60 FPS HTML5 Canvas force-directed graph engine. Drag nodes, create connections, and watch live Model Context Protocol (MCP) telemetry.
          </p>
        </div>

        {/* Sandbox Frame Container */}
        <div className="rounded-2xl bg-slate-900/90 border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 backdrop-blur-xl">
          
          {/* Main Canvas Area */}
          <div className="lg:col-span-8 relative min-h-[500px] bg-[#070A10] flex flex-col justify-between p-4">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 z-10">
              <div className="relative flex-1 max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workspace nodes..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingNode(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Node</span>
                </button>

                <button
                  onClick={() => {
                    setNodes(
                      KNOWLEDGE_GRAPH_NODES.map((n, i) => ({
                        ...n,
                        x: 100 + (i % 3) * 220 + Math.random() * 40,
                        y: 100 + Math.floor(i / 3) * 160 + Math.random() * 40,
                        vx: 0,
                        vy: 0,
                      }))
                    );
                  }}
                  className="p-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
                  title="Reset Physics Layout"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Canvas Element */}
            <div className="relative w-full h-full min-h-[420px] my-2 cursor-grab active:cursor-grabbing">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="w-full h-full block rounded-xl border border-white/5 bg-dots-pattern"
              />
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Engine: Custom TypeScript Force (0 Dependencies)</span>
              </div>
              <div>60 FPS • {nodes.length} Workspace Nodes</div>
            </div>
          </div>

          {/* Right Sidebar: Selected Node Specs & MCP Telemetry */}
          <div className="lg:col-span-4 bg-slate-950/80 border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-between space-y-6">
            
            {/* Selected Node Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Node Inspector</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400">
                  ID #{selectedNode?.id}
                </span>
              </div>

              {selectedNode ? (
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white font-['Outfit']">{selectedNode.label}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">Type:</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                      {selectedNode.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/5">
                    {selectedNode.details}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-mono text-slate-400">Graph Connections ({selectedNode.connections.length}):</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.connections.map((cId) => {
                        const targetNode = nodes.find((n) => n.id === cId);
                        return (
                          <span
                            key={cId}
                            className="px-2 py-1 rounded bg-slate-900 border border-white/10 text-[10px] font-mono text-slate-300"
                          >
                            → {targetNode ? targetNode.label : `Node #${cId}`}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">Click any node on the graph to inspect properties.</p>
              )}
            </div>

            {/* MCP Telemetry Stream Logs */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Native MCP Protocol Stream</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">SSE Active</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1 h-36 overflow-y-auto leading-relaxed">
                {mcpStreamLogs.map((log, i) => (
                  <div key={i} className="text-slate-400 hover:text-cyan-200 transition-colors">
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal to add node */}
        {isAddingNode && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full space-y-4">
              <h3 className="text-lg font-bold text-white font-['Outfit']">Add Custom Workspace Node</h3>
              <p className="text-xs text-slate-400">
                This node will be inserted into the force graph and connected to the current node.
              </p>
              <form onSubmit={handleAddNode} className="space-y-4">
                <input
                  type="text"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                  placeholder="e.g. rust_sidecar.rs or ollama_rag.ts"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  autoFocus
                />
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingNode(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                  >
                    Inject Node
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
