import uvicorn
from main import app
import json

with open("config.json") as f:
    config = json.load(f)
    
if __name__ == '__main__':
    uvicorn.run("debug_server:app", host="0.0.0.0", port=config["port"])
