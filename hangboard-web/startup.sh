#!/bin/bash
python3 -m venv venv
source venv/bin/activate
#python3 main.py --host 10.101.101.14 --port 8080
python3 main.py --host 127.0.0.1 --port 8080
