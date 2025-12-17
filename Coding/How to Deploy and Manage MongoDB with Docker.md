# How to Deploy and Manage MongoDB with Docker

[https://phoenixnap.com/kb/docker-mongodb](https://phoenixnap.com/kb/docker-mongodb)

Introduction

MongoDB is a practical NoSQL database solution. It does not use a fixed data structure, making it scalable and ideal for managing dynamic workloads. MongoDB is well suited for distributed environments, such as Docker containers.

Using Docker and an official MongoDB container image can significantly shorten and simplify the database deployment process.

This tutorial will show you **how to deploy a MongoDB instance on a Docker container**.

[![](https://www.notion.soHow%20to%20Deploy%20and%20Manage%20MongoDB%20with%20Docker%2085b4c79b0ea840febfd38fc121661629/using-mongodb-on-docker-install.png)](https://www.notion.soHow%20to%20Deploy%20and%20Manage%20MongoDB%20with%20Docker%2085b4c79b0ea840febfd38fc121661629/using-mongodb-on-docker-install.png)

How%20to%20Deploy%20and%20Manage%20MongoDB%20with%20Docker%2085b4c79b0ea840febfd38fc121661629/using-mongodb-on-docker-install.png

Prerequisites

- A user with **sudo** privileges
- Access to a command line
- A running Docker instance

## Download MongoDB Image for Docker

Follow the step-by-step instructions below to download the latest official MongoDB image for Docker.

1. Your Docker service needs to be active and running. You can quickly check the current status by entering the following command in your terminal:

```Plain
sudo service docker status
```

In this example, the Docker service is active and running.

1. Proceed to download the latest official Docker image for the MongoDB database:

```Plain
sudo docker pull mongo
```

The image indicates that the system used the `**latest**` tag by default.

To download a specific version of MongoDB, use the same command appended with the version tag. For example:

```Plain
sudo docker pull mongo:4.2.2
```

1. List the images in your Docker repository with the following command:

```Plain
sudo docker images
```

The interface confirms that the MongoDB image is now available.

## Deploy MongoDB Container

By default, MongoDB stores data in the **/data/db** directory within the Docker container. To remedy this, mount a directory from the underlying host system to the container running the MongoDB database. This way, data is stored on your host system and is not going to be erased if a container instance fails.

1. Create a **/mongodata** directory on the host system:

```Plain
sudo mkdir -p /mongodata
```

1. Start the Docker container with the `**run**` command using the mongo image. The **/data/db** directory in the container is mounted as **/mongodata** on the host. Additionally, this command changes the name of the container to _mongodb_:

```Plain
sudo docker run -it -v mongodata:/data/db --name mongodb -d mongo
```

- `**it**` – Provides an interactive shell to the Docker container.
- `**v**` – Use this option to attach the /**mongodata** host volume to the **/data/db** container volume.
- `**d**` – Starts the container as a background process.
- `**name**` – Name of the container.

1. Once the MongoDB server starts running in a container, check the status by typing:

```Plain
sudo docker ps
```

The default port number is **27017**_**,**_ as can be seen in the output_**.**_

1. Optionally you can specify the MongoDB port explicitly:

```Plain
sudo docker run -it -v mongodata:/data/db -p 27017:27017 --name mongodb -d mongo
```

1. Always check the [Docker log](https://phoenixnap.com/kb/docker-container-logs) to see the chain of events after making changes:

```Plain
sudo docker logs mongodb
```

The logs provide a wealth of useful information.

## Start Interactive Docker Terminal (Bash Shell) to Manage MongoDB Database

1. The container is currently running in **detached mode**. Connect to the container using the interactive terminal instead:

```Plain
sudo docker exec -it mongodb bash
```

1. Start the MongoDB shell by typing `**mongo**` in the interactive terminal.

The MongoDB shell launches and theprompt is ready to accept your commands.

1. Instead of just typing `**mongo**`, you can additionally define a specific host and port by typing:

```Plain
mongo -host localhost -port 27017
```

With the MongoDB shell, you can now create a database, add collections or manage individual documents.

### How to Exit MongoDB and Interactive Shell

Type `**exit**` to leave the MongoDB shell and then `**exit**` once again to leave the Interactive shell.

As an alternative, you can type `**quit()**` or use **Ctrl-C** to exit the shell.

## Stopping and Restarting MongoDB Database

The `**docker stop**` command is a short and clear command that [stops running container instances](https://phoenixnap.com/kb/how-to-list-start-stop-docker-containers):

```Plain
sudo docker stop mongodb
```

Inspect the list of running Docker containers by typing:

```Plain
sudo docker ps
```

Containers are started by using the `**docker start**` command:

```Plain
sudo docker start mongodb
```

The list of running containers now confirms that the MongoDB database has been initiated once again:

```Plain
sudo docker ps
```

Conclusion

You now know how to install MongoDB on a Docker container, and you have learned how to access the MongoDB shell to manage databases.

Use Docker to streamline MongoDB database deployment across multiple servers and scale your operations quickly and efficiently.