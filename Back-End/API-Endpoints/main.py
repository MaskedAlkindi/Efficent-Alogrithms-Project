from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

##############################Alogrithm Code###############################################
import csv
import math


nodeDetails = {}


class nodeC:
    def __init__(self, name, type, latitude, longitude):  # class variables
        self.name = name
        self.type = type
        self.latitude = latitude
        self.longitude = longitude

    def getName(self):
        return self.name

    def getType(self):
        return self.type

    def getLatitude(self):
        return self.latitude

    def getLongitude(self):
        return self.longitude


# CC GeeksforGeeks
def haversine(lat1, lon1, lat2, lon2):
    # distance between latitudes
    # and longitudes
    dLat = (lat2 - lat1) * math.pi / 180.0
    dLon = (lon2 - lon1) * math.pi / 180.0

    # convert to radians
    lat1 = (lat1) * math.pi / 180.0
    lat2 = (lat2) * math.pi / 180.0

    # apply formulae
    a = pow(math.sin(dLat / 2), 2) + pow(math.sin(dLon / 2), 2) * math.cos(
        lat1
    ) * math.cos(lat2)
    rad = 6371
    c = 2 * math.asin(math.sqrt(a))
    return rad * c


def mod_dijk(adj: list[list[tuple]], s: int, e: int):
    s -= 1
    e -= 1
    found = False
    parent = [0 for i in range(len(adj))]
    visited = [False for i in range(len(adj))]
    distance = [9999999 for i in range(len(adj))]
    path = []

    visited[s] = True
    distance[s] = 0
    parent[s] = -1

    leftnodes = set()
    leftnodes.update({s})
    while leftnodes:
        for node, weight in adj[s]:
            if visited[node] == True:
                continue
            visited[node] = True
            leftnodes.update({node})
            overallweight = weight + distance[s]
            if overallweight < distance[node]:
                distance[node] = overallweight
                parent[node] = s
        if not found and e in leftnodes:
            found = True
        leftnodes.remove(s)
        if not leftnodes:
            break
        mx = 9999999
        for i in leftnodes:
            if distance[i] < mx:
                mx = distance[i]
                s = i
    if not found:
        return -1

    # Not dijsktra
    while parent[e] != -1:
        path.append(e + 1)
        e = parent[e]
    path.append(e + 1)
    path = path[::-1]
    return path, distance


def dijkstra(graph, start, goal):
    shortest_distance = {}
    predecessor = {}
    unseenNodes = graph
    infinity = 9999999
    path = []

    for node in unseenNodes:  # set defualt distance to infinity
        shortest_distance[node] = infinity

    shortest_distance[start] = 0
    while unseenNodes:
        minNode = None
        for node in unseenNodes:
            if minNode is None:
                minNode = node
            elif shortest_distance[node] < shortest_distance[minNode]:
                minNode = node

        for childNode, weight in graph[minNode]:
            if weight + shortest_distance[minNode] < shortest_distance[childNode]:
                shortest_distance[childNode] = weight + shortest_distance[minNode]
                predecessor[childNode] = minNode
        unseenNodes.pop(minNode)

    currentNode = goal
    while currentNode != start:
        try:
            path.insert(0, currentNode)
            currentNode = predecessor[currentNode]
        except KeyError:
            print("Path not reachable")
            break
    path.insert(0, start)
    if shortest_distance[goal] != infinity:
        print("Shortest distance is " + str(shortest_distance[goal]))
        print("And the path is " + str(path))


adj_list: list = []
nodes = []
with open("addpois.csv", "r") as file:
    csv_file = csv.DictReader(file)
    adj_list = []
    for row in csv_file:
        # print(dict(row))
        poi1 = nodeC(
            dict(row)["Name"],
            dict(row)["Type"],
            float(dict(row)["Latitude"]),
            float(dict(row)["Longitude"]),
        )
        adj_list.append([])
        nodes.append(poi1)

with open("addroads.csv") as file:
    csf_file = csv.DictReader(file)
    for row in csf_file:
        vertex1 = int(dict(row)["VertexA"]) - 1
        vertex2 = int(dict(row)["VertexB"]) - 1
        distance = haversine(
            nodes[vertex1].latitude,
            nodes[vertex1].longitude,
            nodes[vertex2].latitude,
            nodes[vertex2].longitude,
        )
        adj_list[vertex1].append((vertex2, distance))
        adj_list[vertex2].append((vertex1, distance))


###########################################################################################################
app = FastAPI()
origins = [
    "http://localhost:3000",  # React app's address
    # other origins if needed
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Item(BaseModel):
    startnode: int
    endnode: int

@app.post("/ShortestPath")
async def shortest_path(Item: Item):
    startnode = Item.startnode
    endnode = Item.endnode
    path, distance = mod_dijk(adj_list, startnode, endnode)
    
    return {"path": path}