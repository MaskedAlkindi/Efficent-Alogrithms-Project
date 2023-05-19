// Libraries
#include <iostream>
#include <vector>
#include <list>
#include <iterator>
#include <string>
#include <fstream>
#include <sstream>
#include <math.h>

// Namespaces
using namespace std;

// Global Variables
vector<Vertex> vertices;
vector<int>::iterator ptr;

// Global Functions
float VertextoVertexDist(float SourceVID, float destVID)
{
    // GeeksforGeeks https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
    float dLat = (vertices[SourceVID].poi_latitude - vertices[destVID].poi_latitude) *
                 M_PI / 180.0;
    float dLon = (vertices[SourceVID].poi_longtitude - vertices[destVID].poi_longtitude) *
                 M_PI / 180.0;

    // convert to radians
    vertices[SourceVID].poi_latitude = (vertices[SourceVID].poi_latitude) * M_PI / 180.0;
    vertices[destVID].poi_latitude = (vertices[destVID].poi_latitude) * M_PI / 180.0;

    // apply formulae
    float a = pow(sin(dLat / 2), 2) +
              pow(sin(dLon / 2), 2) *
                  cos(vertices[SourceVID].poi_latitude) * cos(vertices[destVID].poi_latitude);
    float rad = 6371;
    float c = 2 * asin(sqrt(a));
    return rad * c;
    // GeeksforGeeks https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
}

// Classes
class Edge
{ // These are the "links" between vertices/nodes/POIs
public:
    int DestinationVertexID;
    int weight;

    // Constructors
    Edge()
    {
        // Defualt
    }
    Edge(int SourceVID, int destVID)
    {
        DestinationVertexID = destVID;
        weight = VertextoVertexDist(SourceVID, destVID);
    }

    // Functions
    // Setters
    void setEdgeValues(int SourceVID, int destVID)
    {
        DestinationVertexID = destVID;
        weight = VertextoVertexDist(SourceVID, destVID);
    }

    // Getters
    int getDestiniationVertexID()
    {
        return DestinationVertexID;
    }
    float getWeight()
    {
        return weight;
    }
};

class Vertex // Adjacency List Implementaion
{
public:
    int poi_id;
    string poi_name;
    string poi_type;
    float poi_latitude;
    float poi_longitude;
    list<Edge> edgelist;

    // Constructors
    Vertex()
    { // Defualt
        poi_id = 0;
        poi_name = "";
        poi_type = "";
        poi_latitude = 0.0;
        poi_longitude = 0.0;
    }

    Vertex(int id,
           string name,
           string type,
           float latitude,
           float longitude)
    {
        poi_id = id;
        poi_name = name;
        poi_type = type;
        poi_latitude = latitude;
        poi_longitude = longitude;
    }

    // Functions
    // Setters
    void setPOIid(int id)
    {
        poi_id = id;
    }
    void setPOIname(string name)
    {
        poi_name = name;
    }
    void setPOItype(string type)
    {
        poi_type = type;
    }
    void setPOIlatitude(float latitude)
    {
        poi_latitude = latitude;
    }
    void setPOIlongitude(float longitude)
    {
        poi_longitude = longitude;
    }

    // Getters
    int getPOIid()
    {
        return poi_id;
    }
    string getPOIname()
    {
        return poi_name;
    }
    string getPOItype()
    {
        return poi_type;
    }
    float getPOIlatitude()
    {
        return poi_latitude;
    }
    float getPOIlongitude()
    {
        return poi_longitude;
    }
    list<Edge> getEdgelist()
    {
        return edgelist;
    }
};

class Graph
{
public:
    // Functions

    void AddVertex(Vertex newVertex)
    {
        bool check = checkIfVertexExistByID(newVertex.getPOIid());
        if (check == true)
        {
            cout << "POI with id: " << newVertex.getPOIid() << "already exists";
        }
        else
        {
            vertices.push_back(newVertex);
            cout << "POI succesfully added\n\n";
        }
    }

    bool checkIfVertexExistByID(int vid)
    {
        for (int i = 0; i < (vertices.size()); i++)
        {
            if (vertices[i].getPOIid() == vid)
            {
                return true;
            }
        }
        return false;
    }

    void addEdgeByID(int fromVertex, int toVertex)
    {
        bool check1 = checkIfVertexExistByID(fromVertex);
        bool check2 = checkIfVertexExistByID(toVertex);

        if ((check1 && check2) == true)
        {
            bool check3 = checkIfEdgeExistByID(fromVertex, toVertex);
        }
    }
    bool checkIfEdgeExistByID(int fromVertex, int toVertex)
    {
        Vertex v = getVertexByID(fromVertex);
        list<Edge> e;
        e = v.getEdgelist();

        for (auto it = e.begin(); it != e.end(); it++)
        {
            if (it->getDestiniationVertexID() == toVertex)
            {
                return true;
            }
        }
        return false;
    }
};

// Main Driver
int main()
{
    // Create graph object
    Graph navgraph;
    // Create Vertex object
    Vertex POI;
    int poi_id;
    string poi_name;
    string poi_type;
    float poi_latitude;
    float poi_longitude;

    int option;

    do
    {
        cout << "======================================\n"
             << "What operation do you want to perform?\n"
             << "Select Option number. Enter 0 to exit.\n\n"
             << "1. Add POIs\n"
             << "2. Update POIs\n"
             << "3. Delete POIs\n"
             << "4. Add Road\n"
             << "5. Update Road\n"
             << "6. Delete Road\n"
             << "7. Check if 2 POIs are Neigbors\n"
             << "8. Print All Neigbors of a POIs\n"
             << "9. Print Graph\n"
             << "10. Clear Screen\n"
             << "0. Exit Program\n"
             << "======================================\n";

        cin >> option;

        switch (option)
        {
        case 0:

            break;

        case 1:
        {
            cout << "Adding POIs from CSV File..." << endl;
            // Code Morsels https://www.youtube.com/watch?v=NFvxA-57LLA

            fstream inputFile;
            inputFile.open("addpois.csv");
            string line = "";
            getline(inputFile, line);
            while (getline(inputFile, line))
            {
                string tempString = "";

                stringstream inputString(line);

                getline(inputString, tempString, ',');
                poi_id = stoi(tempString);
                tempString = "";

                getline(inputString, poi_name, ',');
                getline(inputString, poi_type, ',');

                getline(inputString, tempString, ',');
                poi_latitude = stof(tempString);
                tempString = "";

                getline(inputString, tempString, ',');
                poi_longitude = stof(tempString);
                tempString = "";

                line = "";

                POI.setPOIid(poi_id);
                POI.setPOIname(poi_name);
                POI.setPOItype(poi_type);
                POI.setPOIlatitude(poi_latitude);
                POI.setPOIlongitude(poi_longitude);

                navgraph.AddVertex(POI);

                cout << poi_id << "\t" << poi_name << "\t" << poi_type << "\t" << poi_latitude << "\t" << poi_longitude << "\t\n";
            }

            // Code Morsels https://www.youtube.com/watch?v=NFvxA-57LLA

            // navgraph.printGraph();
            break;
        }
        case 2:
            cout << "Update Vertex Operation -" << endl;
            cout << "Enter State ID of Vertex(State) to update :";

            break;

        case 3:
            cout << "Delete Vertex Operation -" << endl;
            cout << "Enter ID of Vertex(State) to Delete : ";

            break;

        case 4:
            cout << "Add Edge Operation -" << endl;
            cout << "Enter ID of Source Vertex(State): ";

            break;

        case 5:
            cout << "Update Edge Operation -" << endl;
            cout << "Enter ID of Source Vertex(State): ";

            break;

        case 6:
            cout << "Delete Edge Operation -" << endl;
            cout << "Enter ID of Source Vertex(State): ";

            break;

        case 7:
            cout << "Check if 2 Vertices are Neigbors -" << endl;
            cout << "Enter ID of Source Vertex(State): ";

            break;

        case 8:
            cout << "Print All Neigbors of a Vertex -" << endl;
            cout << "Enter ID of Vertex(State) to fetch all Neigbors : ";

            break;

        case 9:
            cout << "Print Graph Operation -" << endl;

            break;

        default:
            cout << "Enter Proper Option number " << endl;
        }
        cout << endl;
    } while (option != 0);

    return 0;
}