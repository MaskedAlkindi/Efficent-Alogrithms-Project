import matplotlib.pyplot as plt
import networkx as nx
import pandas as pd

# Read the CSV files
pois_df = pd.read_csv('addpois.csv')
roads_df = pd.read_csv('addroads.csv')

# Create a graph
G = nx.Graph()

# Add nodes and edges to the graph
for _, row in pois_df.iterrows():
    G.add_node(row['Name'], pos=(row['Longitude'], row['Latitude']))

for _, row in roads_df.iterrows():
    # Subtract 1 because node IDs in the CSV start from 1
    node1 = pois_df.iloc[row['VertexA'] - 1]['Name']
    node2 = pois_df.iloc[row['VertexB'] - 1]['Name']
    G.add_edge(node1, node2)

# Get positions of nodes
pos = nx.get_node_attributes(G, 'pos')

# Draw the graph
nx.draw(G, pos, with_labels=True, node_size=30, node_color='blue', edge_color='gray')

# Show the graph
plt.show()
