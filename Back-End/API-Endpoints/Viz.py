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

# Get positions of nodes using spring layout with larger scale
pos = nx.spring_layout(G, scale=2)

# Draw the graph with larger node size, smaller font size, and more spacing
plt.figure(figsize=(10, 10))  # Adjust the figure size as per your preference
nx.draw(G, pos, with_labels=True, node_size=100, node_color='red', edge_color='gray', font_size=8)

# Show the graph
plt.show()
