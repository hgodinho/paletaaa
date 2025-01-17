import { BaseEdge, BaseVertex, BFSVertexCallback } from "./types";

export class Graph<V extends BaseVertex, E extends BaseEdge<V> = BaseEdge<V>> {
    vertices: number;

    nodes: Map<string, V>;

    adjList: Map<E["source"], E["target"][]>;

    constructor() {
        this.nodes = new Map();

        this.vertices = 0;
        this.adjList = new Map();
    }

    /**
     * Get the nodes of the graph
     * @returns an array of nodes
     */
    getNodes(): V[] {
        return Array.from(this.nodes.values());
    }

    /**
     * Get a vertex by id
     * @param id | string
     * @returns a vertex
     */
    getNode(id: V["id"]): V | undefined {
        return this.nodes.get(id);
    }

    /**
     * Update a vertex in the graph
     * @param id | string
     * @param node | V
     */
    updateVertex(id: V["id"], node: V) {
        if (!this.nodes.has(id)) {
            throw new Error("Node not found in the graph.");
        }
        this.nodes.set(id, node);
    }

    /**
     * Create a new graph instance cloned from the current graph.
     * @returns a new Graph instance
     */
    clone(): Graph<V, E> {
        const newGraph = new Graph<V, E>();
        newGraph.nodes = new Map(this.nodes); // Clone nodes
        newGraph.adjList = new Map(
            Array.from(this.adjList.entries(), ([key, value]) => [
                key,
                [...value],
            ])
        ); // Clone adjacency list deeply
        newGraph.vertices = this.vertices; // Copy vertex count
        return newGraph;
    }

    /**
     * Get the links of the graph
     * @returns an array of added links (edges) in the graph
     */
    getLinks(): E[] {
        const links: E[] = [];
        for (const [source, targets] of this.adjList.entries()) {
            for (const target of targets) {
                links.push({ source, target } as E);
            }
        }
        return links;
    }

    /**
     * Add a vertex to the graph
     * @param vertex | any
     */
    addVertex(vertex: V) {
        this.adjList.set(vertex.id, []);
        this.nodes.set(vertex.id, vertex);
        this.vertices++;
    }

    /**
     * Remove a vertex from the graph
     * @param v | any
     */
    removeVertex(id: V["id"]) {
        const neighbors = this.adjList.get(id);
        if (!neighbors) {
            throw new Error("Vertex not found in the graph.");
        }

        for (const neighbor of neighbors) {
            this.removeEdge(id, neighbor);
        }
        this.adjList.delete(id);
        this.nodes.delete(id);
        this.vertices--;
    }

    /**
     * Add a directed edge between two vertices
     * @param from | any
     * @param to | any
     */
    addDirEdge(from: E["source"], to: E["target"]) {
        const edge = this.adjList.get(from);
        if (edge) {
            edge.push(to);
        }
    }

    /**
     * Add an edge between two vertices
     * @param from | any
     * @param to | any
     */
    addEdge(from: E["source"], to: E["target"]) {
        this.addDirEdge(from, to);
        this.addDirEdge(to, from);
    }

    /**
     * Remove a directed edge between two vertices
     * @param from | any
     * @param to | any
     */
    removeDirEdge(from: E["source"], to: E["target"]) {
        this.adjList.set(
            from,
            (this.adjList.get(from) || []).filter((id: V["id"]) => {
                return id !== to;
            })
        );
    }

    /**
     * Remove an edge between two vertices
     * @param from | any
     * @param to | any
     */
    removeEdge(from: E["source"], to: E["target"]) {
        this.removeDirEdge(from, to);
        this.removeDirEdge(to, from);
    }

    /**
     * Perform BFS traversal on the graph with a callback function
     * @param startVertex | V - The starting vertex for the traversal
     * @param callback | BFSVertexCallback - A function to execute on each traversed vertex
     * @returns an array of visited vertices in BFS order
     */
    bfs<R = any>(
        startVertex: V["id"],
        callback?: BFSVertexCallback<V, R>
    ): (V["id"] | R)[] {
        if (!this.adjList.has(startVertex)) {
            throw new Error("Start vertex not found in the graph.");
        }

        const visited = new Set(); // To keep track of visited nodes
        const queue = [startVertex]; // Queue for BFS traversal
        const result = []; // To store the traversal result

        while (queue.length > 0) {
            const currentVertex = queue.shift(); // Dequeue a vertex

            if (!visited.has(currentVertex)) {
                visited.add(currentVertex); // Mark the current vertex as visited

                // Execute the callback on the current vertex
                if (
                    callback &&
                    currentVertex &&
                    this.nodes.has(currentVertex)
                ) {
                    const callbackResult = callback(
                        this.nodes.get(currentVertex) as V,
                        currentVertex
                    );
                    if (callbackResult) result.push(callbackResult);
                } else if (currentVertex) {
                    result.push(currentVertex);
                }

                // Enqueue all unvisited neighbors
                const neighbors = this.adjList.get(
                    currentVertex as E["source"]
                );

                if (!neighbors) {
                    throw new Error("Vertex not found in the graph.");
                }

                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }

        return result;
    }

    /**
     * Perform BFS traversal on the entire graph, including disconnected components.
     * @param callback | BFSVertexCallback - A function to execute on each traversed vertex
     * @returns an array of visited vertices in BFS order
     */
    bfsAll<R = any>(callback?: BFSVertexCallback<V, R>): (V["id"] | R)[] {
        const visited = new Set<V["id"]>(); // To keep track of visited nodes
        const result: (V["id"] | R)[] = []; // To store the traversal result

        // Iterate over all nodes in the graph
        for (const startVertex of this.nodes.keys()) {
            if (!visited.has(startVertex)) {
                const queue = [startVertex]; // Queue for BFS traversal

                // BFS for the current component
                while (queue.length > 0) {
                    const currentVertex = queue.shift() as V["id"];

                    if (!visited.has(currentVertex)) {
                        visited.add(currentVertex); // Mark the current vertex as visited

                        // Execute the callback on the current vertex
                        if (callback && this.nodes.has(currentVertex)) {
                            const callbackResult = callback(
                                this.nodes.get(currentVertex) as V,
                                currentVertex
                            );
                            if (callbackResult) result.push(callbackResult);
                        } else {
                            result.push(currentVertex);
                        }

                        // Enqueue all unvisited neighbors
                        const neighbors = this.adjList.get(currentVertex) || [];
                        for (const neighbor of neighbors) {
                            if (!visited.has(neighbor)) {
                                queue.push(neighbor);
                            }
                        }
                    }
                }
            }
        }

        return result;
    }

    /**
     * Log the graph
     */
    log() {
        let current = 0;
        for (const [key, value] of this.adjList.entries()) {
            console.log({ current, key, value, node: this.nodes.get(key) });
            current++;
        }
    }
}
