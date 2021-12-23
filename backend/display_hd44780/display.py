from RPLCD.i2c import CharLCD
import paho.mqtt.client as paho
import json

import logging
logging.basicConfig(level=logging.DEBUG,
                    format='Display(%(threadName)-10s) %(message)s',
                    )





class Database():
    def __init__(self):
        self._lcd = CharLCD('PCF8574', 0x27, backlight_enabled=True, charmap='A02')


    def _on_message(self, client, userdata, message):
        logging.debug("Write message " + str(message.payload.decode("utf-8")))

        msg = json.loads(message.payload.decode("utf-8"))
        
        print (msg)
        l = "\rLoad: %000.1f" % msg["loadcurrent"]
        t = "Time: " + str(msg["time"])
        self._lcd.write_string(l)
        #self._lcd.cursor_pos = (2, 0)
        #self._lcd.clear()


    def _record_data(self, hostname="localhost",port=1883):
        logging.debug("Start recording data from mqtt to database")
        self._client= paho.Client("client-001")  # FIXME
        self._client.on_message=self._on_message
        self._client.connect(hostname,port,60)#connect

        # FIXME: subscribe to all?
        
        self._client.subscribe("hangboard/sensor/load/loadstatus")
        #self._client.subscribe("hangboard/sensor/sensorstatus")
        #self._client.subscribe("hangboard/sensor/lastexercise")
        #self._client.subscribe("hangboard/workout/userstatistics")
        #self._client.subscribe("hangboard/workout/upcoming")

        self._client.loop_forever()


if __name__ == "__main__":
    d = Database()
    d._record_data(hostname="raspi-hangboard")        