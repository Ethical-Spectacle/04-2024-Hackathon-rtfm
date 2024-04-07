import obd
import json
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient

# AWS IoT Configuration Variables

aws_iot_endpoint = ""  # Your AWS IoT Endpoint
certificate_path = "./certificate.pem.crt"  # Path to the certificate file
private_key_path = "./private.pem.key"  # Path to the private key file
root_ca_path = "./AmazonRootCA1.pem"  # Path to the CA root certificate file
mqtt_topic = "topic/path"  # MQTT topic to publish to
unique_client_id = "testclientId"  # Unique client ID for your device

# Initialize OBD connection
connection = obd.OBD() # Make sure the RPI is connected to the OBD port

# Function to publish data to AWS IoT
def publish_to_aws(data):
    myMQTTClient = AWSIoTMQTTClient(unique_client_id)
    myMQTTClient.configureEndpoint(aws_iot_endpoint, 8883)
    myMQTTClient.configureCredentials(root_ca_path, private_key_path, certificate_path)
    myMQTTClient.connect()
    myMQTTClient.publish(mqtt_topic, json.dumps(data), 0)
    myMQTTClient.disconnect()

# Read multiple data points
commands = {
    'ENGINE_COOLANT_TEMP': obd.commands.COOLANT_TEMP,
    'ENGINE_LOAD': obd.commands.ENGINE_LOAD,
    'ENGINE_RPM': obd.commands.RPM,
    'AIR_INTAKE_TEMP': obd.commands.INTAKE_TEMP,
    'SPEED': obd.commands.SPEED,
    'THROTTLE_POSITION': obd.commands.THROTTLE_POS
}

data = {}

for name, cmd in commands.items():
    response = connection.query(cmd)
    # Some vehicles may not support all commands;
    if not response.is_null():
        data[name] = response.value.magnitude
    else:
        data[name] = 'Not Supported'

# Publishing the collected data to AWS IoT
publish_to_aws(data)
