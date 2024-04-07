# Communication with AWS IOT
This python file will be uploaded on an intermediary device like a smartphone/Raspbeerry-pi to communicate with out AWS IOT cloud server and then do further analysis on it.

# Running instructions
1) Connect hardware device(RASPBERRY PI) to obd port(of a vehicle).
2) Upload the sendData.py & requirements.txt to the RPI
3) Update the location of the python file in the start.sh
4) Make the shell script executable:
```bash
chmod +x /path/to/your/start_script.sh
```
3) In your RPI's terminal, do the following:
```bash
crontab -e
``` 
You can choose any terminal - nano or vim

In the file, write the following:

```bash
@reboot /bin/bash /path/to/your/start_script.sh &
```

Replace /path/to/your/start_script.py everywhere with the actual path to your shell script

