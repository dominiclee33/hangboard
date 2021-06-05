#!/bin/bash

# Only for OSX
python3 -m venv venv
source venv/bin/activate

# Startup exercises task
cd exercises
python3 -m pip install -r requirements.txt
python3 exercises.py --host 0.0.0.0 --port 4321 &
PID_EXERCISES=$!
cd ..

# Gyroscope
cd hardware/gyroscope
#python3 -m pip install -r requirements.txt
#python3 sensor_zlagboard.py --host 0.0.0.0 --port 4323 &
cd ../..


# Board
cd boards
python3 -m pip install -r requirements.txt
python3 boards.py --host 0.0.0.0 --port 4324 &
PID_BOARDS=$!
cd ..

# Mesh
cd backend-mesh
python3 -m pip install -r requirements.txt
python3 mesh.py --socket_exercise ws://127.0.0.1:4321  --socket_gyroscope ws://10.101.40.81:4323 &
PID_MESH=$!
cd ..

# Webinterface
cd hangboard-web
python3 -m pip install -r requirements.txt
python3 main.py --host 0.0.0.0 --port 8080 
cd ..

kill $PID_MESH
kill $PID_BOARDS
kill $PID_EXERCISES

