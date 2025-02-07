import { describe, it, expect } from "vitest";

import { act, renderHook } from "@testing-library/react";

import { useGraph } from "../../src/lib/graph/useGraph";

describe("useGraph", () => {
    it("should initialize with empty graph", () => {
        const { result } = renderHook(() => useGraph());

        expect(result.current.graph.vertices).toBe(0);
        expect(result.current.graph.nodes.size).toBe(0);
        expect(result.current.graph.edges.size).toBe(0);
    });

    it("should initialize with custom state", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 1,
                nodes: [{ id: "A" }],
                edges: [{ source: "A", targets: [] }],
            })
        );

        expect(result.current.graph.vertices).toBe(1);
        expect(result.current.graph.nodes.size).toBe(1);
        expect(result.current.graph.edges.size).toBe(1);
    });

    it("should add a vertex", () => {
        const { result } = renderHook(() => useGraph());

        act(() => {
            result.current.addVertex({ id: "A" });
        });

        expect(result.current.graph.vertices).toBe(1);
        expect(result.current.graph.nodes.size).toBe(1);
        expect(result.current.graph.edges.size).toBe(1);
    });

    it("should addVertices", () => {
        const { result } = renderHook(() => useGraph());

        act(() => {
            result.current.addVertices([{ id: "A" }, { id: "B" }]);
        });

        expect(result.current.graph.vertices).toBe(2);
        expect(result.current.graph.nodes.size).toBe(2);
        expect(result.current.graph.edges.size).toBe(2);
    });

    it("should remove a vertex", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: [] },
                    { source: "B", targets: ["A"] },
                ],
            })
        );

        act(() => {
            result.current.removeVertex("A");
        });

        expect(result.current.graph.vertices).toBe(1);
        expect(result.current.graph.nodes.size).toBe(1);
        expect(result.current.graph.edges.size).toBe(1);
        expect(result.current.graph.edges.get("B")?.size).toBe(0);
    });

    it("should remove vertices", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 3,
                nodes: [{ id: "A" }, { id: "B" }, { id: "C" }],
                edges: [
                    { source: "A", targets: [] },
                    { source: "B", targets: [] },
                    { source: "C", targets: ["A", "B"] },
                ],
            })
        );

        act(() => {
            result.current.removeVertices(["A", "B"]);
        });

        expect(result.current.graph.vertices).toBe(1);
        expect(result.current.graph.nodes.size).toBe(1);
        expect(result.current.graph.edges.size).toBe(1);
        expect(result.current.graph.edges.get("C")?.size).toBe(0);
    });

    it("should update vertex", () => {
        const { result } = renderHook(() =>
            useGraph<
                { id: string; label: string; var: boolean },
                { source: string; target: string }
            >({
                vertices: 1,
                nodes: [{ id: "A", label: "A", var: true }],
                edges: [{ source: "A", targets: [] }],
            })
        );

        act(() => {
            result.current.updateVertex({ id: "A", label: "B" });
        });

        const node = result.current.graph.nodes.get("A");

        expect(node?.label).toBe("B");
        expect(node?.var).toBeTruthy();
    });

    it("should update vertices", () => {
        const { result } = renderHook(() =>
            useGraph<
                { id: string; label: string; var: boolean },
                { source: string; target: string }
            >({
                vertices: 1,
                nodes: [{ id: "A", label: "A", var: true }],
                edges: [{ source: "A", targets: [] }],
            })
        );

        act(() => {
            result.current.updateVertices(
                new Map([["A", { id: "A", label: "B", var: false }]])
            );
        });

        const node = result.current.graph.nodes.get("A");

        expect(node?.label).toBe("B");
        expect(node?.var).toBeFalsy();
    });

    it("should add an edge", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: [] },
                    { source: "B", targets: [] },
                ],
            })
        );

        act(() => {
            result.current.addEdge({ source: "A", target: "B" });
        });

        expect(result.current.graph.edges.get("A")?.has("B")).toBeTruthy();
        expect(result.current.graph.edges.get("B")?.has("A")).toBeTruthy();
    });

    it("should add a directed edge", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: [] },
                    { source: "B", targets: [] },
                ],
            })
        );

        act(() => {
            result.current.addDirEdge({ source: "A", target: "B" });
        });

        expect(result.current.graph.edges.get("A")?.has("B")).toBeTruthy();
        expect(result.current.graph.edges.get("B")?.has("A")).toBeFalsy();
    });

    it("should add edges", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: [] },
                    { source: "B", targets: [] },
                ],
            })
        );

        act(() => {
            result.current.addEdges([
                { source: "A", target: "B" },
                { source: "B", target: "A" },
            ]);
        });

        expect(result.current.graph.edges.get("A")?.has("B")).toBeTruthy();
        expect(result.current.graph.edges.get("B")?.has("A")).toBeTruthy();
    });

    it("should add directed edges", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: [] },
                    { source: "B", targets: [] },
                ],
            })
        );

        act(() => {
            result.current.addDirEdges([{ source: "A", target: "B" }]);
        });

        expect(result.current.graph.edges.get("A")?.has("B")).toBeTruthy();
        expect(result.current.graph.edges.get("B")?.has("A")).toBeFalsy();
    });

    it("should removeDirEdge", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: ["B"] },
                    { source: "B", targets: [] },
                ],
            })
        );

        act(() => {
            result.current.removeDirEdge({ source: "A", target: "B" });
        });

        expect(result.current.graph.edges.get("A")?.has("B")).toBeFalsy();
    });

    it("should removeEdge", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: ["B"] },
                    { source: "B", targets: ["A"] },
                ],
            })
        );

        act(() => {
            result.current.removeEdge({ source: "A", target: "B" });
        });

        expect(result.current.graph.edges.get("A")?.has("B")).toBeFalsy();
        expect(result.current.graph.edges.get("B")?.has("A")).toBeFalsy();
    });

    it("should check if haveEdges", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: ["B"] },
                    { source: "B", targets: ["A"] },
                ],
            })
        );

        expect(result.current.haveEdges()).toBeTruthy();
    });

    it("should check if isDirEdge", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: ["B"] },
                    { source: "B", targets: [] },
                ],
            })
        );

        expect(result.current.isDirEdge("A", "B")).toBeTruthy();
        expect(result.current.isDirEdge("B", "A")).toBeFalsy();
    });

    it("should check if graph has vertex", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 1,
                nodes: [{ id: "A" }],
                edges: [{ source: "A", targets: [] }],
            })
        );

        expect(result.current.hasVertex("A")).toBeTruthy();
    });

    it("should get vertex", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 1,
                nodes: [{ id: "A" }],
                edges: [{ source: "A", targets: [] }],
            })
        );

        expect(result.current.getVertex("A")).toEqual({ id: "A" });
    });

    it("should getNodeEdges", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: ["B"] },
                    { source: "B", targets: ["A"] },
                ],
            })
        );

        expect(result.current.getNodeEdges("A")).toEqual([
            { source: "A", target: "B" },
        ]);
    });

    it("should getEdges", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: ["B"] },
                    { source: "B", targets: ["A"] },
                ],
            })
        );

        expect(result.current.getEdges()).toEqual([
            { source: "A", target: "B" },
            { source: "B", target: "A" },
        ]);
    });

    it("should getVertices", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: ["B"] },
                    { source: "B", targets: ["A"] },
                ],
            })
        );

        expect(result.current.getVertices()).toEqual([
            { id: "A" },
            { id: "B" },
        ]);
    });

    it("should toJSON", () => {
        const { result } = renderHook(() =>
            useGraph({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: ["B"] },
                    { source: "B", targets: ["A"] },
                ],
            })
        );
        const json = result.current.toJSON();

        expect(json.vertices).toBe(2);
        expect(json.nodes).toEqual([{ id: "A" }, { id: "B" }]);

        expect(json.edges).toHaveLength(2);
        expect(json.edges).toContainEqual({ source: "A", targets: ["B"] });
        expect(json.edges).toContainEqual({ source: "B", targets: ["A"] });
    });

    it("should fromJSON", () => {
        const { result } = renderHook(() => useGraph());

        act(() => {
            result.current.fromJSON({
                vertices: 2,
                nodes: [{ id: "A" }, { id: "B" }],
                edges: [
                    { source: "A", targets: ["B"] },
                    { source: "B", targets: ["A"] },
                ],
            });
        });

        expect(result.current.graph.vertices).toBe(2);
        expect(result.current.graph.nodes.size).toBe(2);
        expect(result.current.graph.edges.size).toBe(2);
    });
});
