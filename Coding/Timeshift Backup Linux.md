# Timeshift Bakup

https://dev.to/rahedmir/how-to-use-timeshift-from-command-line-in-linux-1l9b

[Cover image for How to Use Timeshift from Command Line in Linux](https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fo5skv3ho1sdd72csdn9a.png)

[![](https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fo5skv3ho1sdd72csdn9a.png)](https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fo5skv3ho1sdd72csdn9a.png)

https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fo5skv3ho1sdd72csdn9a.png

## What is Timeshift?

Timeshift is a great tool, which monitors your system & application-level changes and gives you the ability to roll back your system in the previous state, in case, you run into a problem (Similar like Windows restore point)

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--jQ1drHaj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/wif9rs60am8l5lg01fy3.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--jQ1drHaj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/wif9rs60am8l5lg01fy3.png)

https://res.cloudinary.com/practicaldev/image/fetch/s–jQ1drHaj–/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/wif9rs60am8l5lg01fy3.png

### Why should you use the Timeshift from the Command line/Terminal when you have a GUI version?

Well, using the timeshift in GUI mode is absolutely fine. Nothing to complain here. However, imagine a situation, where your video driver is broken due to some unstable update or maybe something terrible happens with your system and you are not able to use the Timeshift GUI version to rollback your system to the previous state, then you have only the Timeshift CLI option available.

## How to use Timeshift from the command line?

At first, make sure that the timeshift is installed in your system. If not, then install it using `sudo apt install timeshift`

### Creating a Restore point

Now, launch your terminal and type the following command

`sudo timeshift --create --comments "A new backup" --tags D`

[Restore Point](https://res.cloudinary.com/practicaldev/image/fetch/s--JHXkw2e0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/r56r5mely8pxuyaq4a4z.png)

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--JHXkw2e0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/r56r5mely8pxuyaq4a4z.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--JHXkw2e0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/r56r5mely8pxuyaq4a4z.png)

https://res.cloudinary.com/practicaldev/image/fetch/s–JHXkw2e0–/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/r56r5mely8pxuyaq4a4z.png

(Creating a restore point/snapshot may take several minutes, depends on the size of the files & your hardware resources)

- `comments "A new backup"`

You can write anything as a comment, it doesn’t matter that much.

- `tags D`

There are several tags, that specify what kind of backup it is.

As an example

- `tags D` stands for Daily Backup
- `tags W` stands for Weekly Backup
- `tags M` stands for Monthly Backup
- `tags O` stands for On-demand Backup

You can put any tag as your wish, after the comments

### Restoring a snapshot

`sudo timeshift --restore`

This command shows you a list of created snapshots & ask, from which snapshot you want to restore the system, you have to select the snapshot index to proceed further

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--4nQBu9NR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/9fjqisv0mjmjlnvyk7mw.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--4nQBu9NR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/9fjqisv0mjmjlnvyk7mw.png)

https://res.cloudinary.com/practicaldev/image/fetch/s–4nQBu9NR–/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/9fjqisv0mjmjlnvyk7mw.png

After that, press the Enter key to continue, when It asks about reinstalling the GRUB2 bootloader, press the ‘y’ key, then press the Enter key again & finally, press the ‘y’ key to start the system restore…

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--rgo-FVYT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/o3mnmo4tdfdb6zhwzm4j.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--rgo-FVYT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/o3mnmo4tdfdb6zhwzm4j.png)

https://res.cloudinary.com/practicaldev/image/fetch/s–rgo-FVYT–/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/o3mnmo4tdfdb6zhwzm4j.png

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--aA-M4LW5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/xfyaea6tm63ebg47pxu1.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--aA-M4LW5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/xfyaea6tm63ebg47pxu1.png)

https://res.cloudinary.com/practicaldev/image/fetch/s–aA-M4LW5–/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/xfyaea6tm63ebg47pxu1.png

At this moment, you have restored the system successfully, and the PC will take a reboot to ensure that your restoration is fully done.

(**When your PC is in the restoring phase, don’t do any work. It might interfere with the restoring process.)

### [Watch on YouTube](https://www.youtube.com/watch?v=T4mvLONfB1A)

Thanks for the reading :)

Coffee https://www.buymeacoffee.com/rahedmir