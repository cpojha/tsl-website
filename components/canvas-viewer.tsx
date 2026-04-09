"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Monitor } from "lucide-react";
import type { SharedCanvasData, SharedNode, SharedConnection } from "@/types/canvas";

function toFlowNodes(nodes: SharedNode[]): Node[] {
  return nodes.map((node) => ({
    id: node.id,
    type: node.name,
    position: { x: node.position_x, y: node.position_y },
    data: {
      title: node.title,
      ...node.data,
    },
    style: {
      width: node.width ?? undefined,
      height: node.height ?? undefined,
      zIndex: node.z_index,
    },
  }));
}

function toFlowEdges(connections: SharedConnection[]): Edge[] {
  return connections.map((conn) => ({
    id: conn.id,
    source: conn.source_id,
    sourceHandle: conn.source_handle ?? null,
    target: conn.target_id,
    targetHandle: conn.target_handle ?? null,
  }));
}

interface CanvasViewerProps {
  canvas: SharedCanvasData;
  shareToken: string;
}

export function CanvasViewer({ canvas, shareToken }: CanvasViewerProps) {
  const initialNodes = useMemo(() => toFlowNodes(canvas.nodes), [canvas.nodes]);
  const initialEdges = useMemo(
    () => toFlowEdges(canvas.connections),
    [canvas.connections]
  );

  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="border-b px-6 py-3 flex items-center justify-between bg-white">
        <div>
          <h1 className="text-lg">{canvas.title}</h1>
          {canvas.description && (
            <p className="text-sm text-gray-500">{canvas.description}</p>
          )}
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
        <Monitor className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl text-balance text-center">
          Share canvas can be displayed on desktop only
        </h2>
        <Button asChild>
          <Link href={`invook://canvas/clone/${shareToken}`}>
            Open in Desktop App
          </Link>
        </Button>
      </div>
    </div>
  );
}
