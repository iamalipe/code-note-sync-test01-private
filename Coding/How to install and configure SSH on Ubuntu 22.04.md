# How to install and configure SSH on Ubuntu 22.04

[https://hostman.com/tutorials/how-to-install-and-configure-ssh-on-ubuntu-22-04/](https://hostman.com/tutorials/how-to-install-and-configure-ssh-on-ubuntu-22-04/)

SSH is a network protocol that provides a secure connection between a client and a server. All communication is encrypted, preventing theft of data transmitted over the network and other remote network attacks.

Let’s say you have ordered a cloud server from Hostman. You will need SSH installed and configured to connect to and administer the server.

The guide below will describe how to install SSH on Ubuntu 22.04 and configure it.

## Step 1: Prepare Ubuntu

The first thing you need to do before you start installing SSH on Ubuntu is to update all `apt` packages to the latest versions. To do this, use the following command:

```Plain
sudo apt update && sudo apt upgrade
```

## Step 2: Install SSH on Ubuntu

OpenSSH is not pre-installed on the system, so let’s install it manually. To do this, type in the terminal:

```Plain
sudo apt install openssh-server
```

The installation of all the necessary components will begin. Answer “Yes” to all the system prompts.

After the installation is complete, go to the next step to start the service.

## Step 3: Start SSH

Now you need to enable the service you just installed using the command below:

```Plain
sudo systemctl enable --now ssh
```

On successful startup, you will see the following system message.

The `--now` key helps you launch the service and simultaneously set it to start when the system boots.

To verify that the service is enabled and running successfully, type:

```Plain
sudo systemctl status ssh
```

The output should contain the `Active: active (running)` line, which indicates that the service is successfully running.

If you want to disable the service, execute:

```Plain
sudo systemctl disable ssh
```

It disables the service and prevents it from starting at boot.

## Step 4: Configure the firewall

Before connecting to the server via SSH, check the firewall to ensure it is configured correctly.

In our case, we have the UFW installed, so we will use the following command:

```Plain
sudo ufw status
```

In the output, you should see that SSH traffic is allowed. If you don’t have it listed, you need to allow incoming SSH connections. This command will help with this:

```Plain
sudo ufw allow ssh
```

## Step 5: Connect to the server

Once you complete all the previous steps, you can log into the server using the SSH protocol.

To do this, you will need the server’s IP address or domain name and the name of a user created on the server.

In the terminal line, enter the command:

```Plain
ssh username@IP_address
```

Or:

```Plain
ssh username@domain
```

> Important: To successfully connect to a remote server, SSH must be installed and configured on the remote server and the user’s computer from which you make the connection.

## Cloud Servers from 1$

1 x 3.2 GHz CPU, 1 GB RAM, 25 GB SSD

## Step 6: Configure SSH

Having completed the previous five steps, you can already connect to the server remotely. However, you can further increase the connection’s security by changing the default connection port to another or changing the password authentication to key authentication. These and other changes require editing the SSH configuration file.

The main OpenSSH server settings are stored in the main configuration file `sshd_config` (location: `/etc/ssh`). Before you start editing, you should create a backup of this file:

```Plain
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.initial
```

If you get any errors after editing the configuration file, you can restore the original file without problems.

After creating the backup, you can proceed to edit the configuration file. To do this, open it using the `nano` editor:

```Plain
sudo nano /etc/ssh/sshd_config
```

In the file, change the port to a more secure one. It is best to set values from the dynamic range of ports (49152 - 65535) and use different numbers for additional security. For example, let’s change the port value to 49532. To do this, we uncomment the corresponding line in the file and change the port as shown in the screenshot below.

`4fd580df 7710 49f3 Ba88 5f79663f289e`

[https://content.hostman.com/assets/f2f4fc03-c7de-4238-b35d-15dcc2972786?width=718&height=465](https://content.hostman.com/assets/f2f4fc03-c7de-4238-b35d-15dcc2972786?width=718&height=465)

In addition to this setting, we recommend changing the password authentication mode to a more secure key authentication mode. To do this, uncomment the corresponding line and make sure the value is “Yes”, as shown in the screenshot.

`B78f6db1 010f 48a7 A5ff Ce4e6f665691`

[https://content.hostman.com/assets/ecd8711b-767f-4985-8f20-1d885532bd79?width=711&height=408](https://content.hostman.com/assets/ecd8711b-767f-4985-8f20-1d885532bd79?width=711&height=408)

Now, let’s prohibit logging on to the server as a superuser by changing the corresponding line as shown in the picture below.

`B06df4a0 5d22 4c7a Ba90 47fabd8d0bf5`

[https://content.hostman.com/assets/89508e84-93c5-4ddb-857d-51cf48b00dc8?width=708&height=374](https://content.hostman.com/assets/89508e84-93c5-4ddb-857d-51cf48b00dc8?width=708&height=374)

There are other settings you can configure to increase the server security:

- `UseDNS` checks if the hostname matches its IP address. The value “Yes” enables this parameter.
- `PermitEmptyPasswords` prohibits using empty passwords for authentication if the value is “No.”
- `MaxAuthTries` limits the number of unsuccessful attempts to connect to the server within one communication session.
- `AllowUsers` and `AllowGroups` are responsible for the list of users and groups allowed to access the server:

```Plain
# AllowUsers User1, User2, User3
# AllowGroups Group1, Group2, Group3
```

- `Login GraceTime` sets the time provided for successful authorization. We recommend reducing the value of this parameter by four times.
- `ClientAliveInterval` limits the time of user inactivity. After exceeding the specified limit, the user is disconnected.

After making all the changes in the main configuration file, save them and close the editor.

Restart the service to make the changes take effect:

```Plain
sudo systemctl restart ssh
```

If you have changed the port in the configuration file, you should connect using the new port:

```Plain
ssh -p port_number username@IP_address
```

Or:

```Plain
ssh -p port_number_port_username@domain
```

## Conclusion

This article presents a step-by-step guide on installing and configuring SSH in Ubuntu 22.04 and describes how to edit the main configuration file to improve security. We hope this guide helps you to set up a secure remote connection to your Ubuntu server.