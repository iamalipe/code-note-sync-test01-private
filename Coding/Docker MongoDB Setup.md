# Docker MongoDB Setup

[https://phoenixnap.com/kb/docker-mongodb](https://phoenixnap.com/kb/docker-mongodb)

**Check MongoDB running or not**

`sudo service docker status`

**Proceed to download the latest official Docker image for the MongoDB database**

`sudo docker pull mongo`

**List the images in your Docker**

`sudo docker images`

_**Deploy MongoDB Container**_

**Create a /mongodata directory on the host system**

`sudo mkdir -p /mongodata`