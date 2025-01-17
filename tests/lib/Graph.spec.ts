import { describe, expect, it } from "vitest";

import { Graph } from "../../src/lib/graph";

describe("Graph", () => {
    describe("constructor", () => {
        it("should create a graph", () => {
            const graph = new Graph();

            expect(graph.vertices).toBe(0);
            // graph.log();
        });

        it("should create a typed graph", () => {
            const graph = new Graph<{
                id: string;
                name: string;
                age: number;
            }>();

            graph.addVertex({ id: "john", name: "John", age: 20 });
            graph.addVertex({ id: "jane", name: "Jane", age: 22 });
            graph.addVertex({ id: "doe", name: "Doe", age: 25 });

            graph.addDirEdge("john", "jane");
            expect(graph.vertices).toBe(3);
            // graph.log();
        });

        it("should clone a graph", () => {
            const graph = new Graph<{ id: string; name?: string }>();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });
            graph.addEdge("A", "B");
            graph.addEdge("A", "C");

            graph.updateVertex("A", { id: "A", name: "John" });

            const newGraph = graph.clone();
            expect(newGraph.vertices).toBe(3);
            expect(newGraph.getNode("A")).toEqual({ id: "A", name: "John" });
            graph.log();
        });
    });

    describe("addVertex", () => {
        it("should add a vertex", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            expect(graph.vertices).toBe(1);
            // graph.log();
        });

        it("should remove a vertex and its edges", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });
            graph.addEdge("A", "B");
            graph.addEdge("A", "C");
            graph.addEdge("B", "C");

            expect(graph.vertices).toBe(3);
            expect(graph.adjList.get("A")).toEqual(["B", "C"]);

            graph.removeVertex("A");

            expect(graph.vertices).toBe(2);
            expect(graph.adjList.get("A")).toBeUndefined();

            // graph.log();
        });
    });

    describe("edges", () => {
        it("should addEdge", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });
            graph.addEdge("A", "B");
            graph.addEdge("A", "C");
            graph.addDirEdge("C", "B");

            expect(graph.vertices).toBe(3);
            expect(graph.adjList.get("A")).toEqual(["B", "C"]);
            // graph.log();
        });

        it("should addDirEdge", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });
            graph.addDirEdge("A", "B");
            graph.addDirEdge("A", "C");

            expect(graph.vertices).toBe(3);
            expect(graph.adjList.get("A")).toEqual(["B", "C"]);
            // graph.log();
        });

        it("should removeDirEdge", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });

            graph.addDirEdge("A", "B");
            graph.addDirEdge("A", "C");

            expect(graph.adjList.get("A")).toEqual(["B", "C"]);

            graph.removeDirEdge("A", "C");

            expect(graph.vertices).toBe(3);
            expect(graph.adjList.get("A")).toEqual(["B"]);

            // graph.log();
        });

        it("should removeEdge", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });

            graph.addEdge("A", "B");
            graph.addEdge("A", "C");

            expect(graph.adjList.get("A")).toEqual(["B", "C"]);

            graph.removeEdge("A", "C");

            expect(graph.vertices).toBe(3);
            expect(graph.adjList.get("A")).toEqual(["B"]);

            // graph.log();
        });
    });

    describe("nodes", () => {
        it("should get all nodes", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });

            expect(graph.getNodes()).toEqual([
                { id: "A" },
                { id: "B" },
                { id: "C" },
            ]);
        });

        it("should update a node", () => {
            const graph = new Graph<{ id: string; name?: string }>();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });

            graph.updateVertex("A", { id: "A", name: "John" });

            expect(graph.getNodes()).toEqual([
                { id: "A", name: "John" },
                { id: "B" },
                { id: "C" },
            ]);

            graph.addVertex({ id: "D" });
            graph.addVertex({ id: "E" });
            graph.addVertex({ id: "F" });

            graph.updateVertex("F", { id: "F", name: "Doe" });

            expect(graph.getNodes()).toEqual([
                { id: "A", name: "John" },
                { id: "B" },
                { id: "C" },
                { id: "D" },
                { id: "E" },
                { id: "F", name: "Doe" },
            ]);
        });
    });

    describe("links", () => {
        it("should get all links", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });

            graph.addEdge("A", "B");
            graph.addEdge("A", "C");

            expect(graph.getLinks()).toEqual([
                { source: "A", target: "B" },
                { source: "A", target: "C" },
                { source: "B", target: "A" },
                { source: "C", target: "A" },
            ]);
        });
    });

    describe("bfs", () => {
        it("should traverse the graph using bfs", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });
            graph.addVertex({ id: "D" });
            graph.addVertex({ id: "E" });
            graph.addVertex({ id: "F" });

            graph.addEdge("A", "B");
            graph.addEdge("A", "C");
            graph.addEdge("B", "D");
            graph.addEdge("B", "E");
            graph.addEdge("C", "F");

            const result = graph.bfs("B");
            expect(result).toEqual(["B", "A", "D", "E", "C", "F"]);

            graph.bfs("A", function (vertex) {
                expect(vertex).toBeDefined();
                return vertex;
            });

            expect(graph.vertices).toBe(6);

            // graph.log();
        });
    });

    describe("bfsAll", () => {
        it("should traverse all the nodes, even unlinked ones", () => {
            const graph = new Graph();
            graph.addVertex({ id: "A" });
            graph.addVertex({ id: "B" });
            graph.addVertex({ id: "C" });
            graph.addVertex({ id: "D" });
            graph.addVertex({ id: "E" });
            graph.addVertex({ id: "F" });

            graph.addEdge("A", "B");
            graph.addEdge("A", "C");
            graph.addEdge("B", "D");
            graph.addEdge("B", "E");
            graph.addEdge("C", "F");

            const result = graph.bfsAll();
            expect(result).toEqual(["A", "B", "C", "D", "E", "F"]);
        });
    });
});
