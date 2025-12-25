Basics of Computers - Functions of OS

# Basics of Computers - Functions of OS

As you know, operating system is responsible for functioning of the computer system. To do that it carries out these three broad categories of activities −

- **Essential functions** − Ensures optimum and effective utilization of resources
- **Monitoring functions** − Monitors and collects information related to system performance
- **Service functions** − Provides services to users

Let us look at some of the most important functions associated with these activities.

## Processor management

Managing a computer’s CPU to ensure its optimum utilization is called **processor management**. Managing processor basically involves allocating processor time to the tasks that need to be completed. This is called **job scheduling**. Jobs must be scheduled in such a way that −

- There is maximum utilization of CPU
- Turnaround time, i.e. time required to complete each job, is minimum
- Waiting time is minimum
- Each job gets the fastest possible response time
- Maximum throughput is achieved, where throughput is the average time taken to complete each task

There are two methods of job scheduling done by operating systems −

- Preemptive scheduling
- Non-Preemptive scheduling

[![](https://i.imgur.com/RI8Ngyk.jpg)](https://i.imgur.com/RI8Ngyk.jpg)

## Preemptive Scheduling

In this type of scheduling, next job to be done by the processor can be scheduled before the current job completes. If a job of higher priority comes up, the processor can be forced to release the current job and take up the next job. There are two scheduling techniques that use pre-emptive scheduling −

- **Round robin scheduling** − A small unit of time called **time slice** is defined and each program gets only one time slice at a time. If it is not completed during that time, it must join the job queue at the end and wait till all programs have got one time slice. The advantage here is that all programs get equal opportunity. The downside is that if a program completes execution before the time slice is over, CPU is idle for the rest of the duration.
- **Response ratio scheduling** − Response ratio is defined as
    
    `\frac{Elapsed \: Time}{Execution \: time \: received}`$$\frac{Elapsed\ Time}{Execution\ time\ received}$$ExecutiontimereceivedElapsedTime
    
    A job with shorter response time gets higher priority. So a larger program may have to wait even if it was requested earlier than the shorter program. This improves throughput of the CPU.
    

## Non-preemptive Scheduling

In this type of scheduling, job scheduling decisions are taken only after the current job completes. A job is never interrupted to give precedence to higher priority jobs. Scheduling techniques that use non-preemptive scheduling are −

- **First come first serve scheduling** − This is the simplest technique where the first program to throw up a request is completed first.
- **Shortest job next scheduling** − Here the job that needs least amount of time for execution is scheduled next.
- **Deadline scheduling** − The job with the earliest deadline is scheduled for execution next.

## Memory Management

Process of regulating computer memory and using optimization techniques to enhance overall system performance is called **memory management**. Memory space is very important in modern computing environment, so memory management is an important role of operating systems.

As you know, computers have two types of memory – **primary** and **secondary**. Primary memory is **fast but expensive** and secondary memory is **cheap but slower**. OS has to strike a balance between the two to ensure that system performance is not hurt due to very less primary memory or system costs do not shoot up due to too much primary memory.

Input and output data, user instructions and data interim to program execution need to be stored, accessed and retrieved efficiently for high system performance. Once a program request is accepted, OS allocates it primary and secondary storage areas as per requirement. Once execution is completed, the memory space allocated to it is freed. OS uses many storage management techniques to keep a track of all storage spaces that are allocated or free.

## Contiguous Storage Allocation

This is the simplest storage space allocation technique where contiguous memory locations are assigned to each program. OS has to estimate the amount of memory required for the complete process before allocation.

## Non-contiguous Storage Allocation

As the name suggests, program and associated data need not be stored in contiguous locations. The program is divided into smaller components and each component is stored in a separate location. A table keeps a record of where each component of the program is stored. When the processor needs to access any component, OS provides access using this allocation table.

In a real-life scenario primary memory space might not be sufficient to store the whole program. In that case, OS takes the help of **Virtual Storage** technique, where program is physically stored in secondary memory but appears to be stored in primary memory. This introduces a miniscule time lag in accessing the program components. There are two approaches to virtual storages −

- **Program paging** − A program is broken down into fixed size **page** and stored in the secondary memory. The pages are given **logical address or virtual address** from 0 to n. A **page table** maps the logical addresses to the physical addresses, which is used to retrieve the pages when required.
- **Program segmentation** − A program is broken down into logical units called **segments**, assigned logical address from 0 to n and stored in secondary memory. A **segment table** is used to load segments from secondary memory to primary memory.

Operating systems typically use a combination of page and program segmentation to optimize memory usage. A large program segment may be broken into pages or more than one small segments may be stored as a single page.

## File Management

Data and information is stored on computers in form of files. Managing file system to enable users to keep their data safely and correctly is an important function of operating systems. Managing file systems by OS is called **file management**. File management is required to provide tools for these file related activities −

- Creating new files for storing data
- Updating
- Sharing
- Securing data through passwords and encryption
- Recovery in case of system failure

## Device Management

The process of implementation, operation and maintenance of a device by operating system is called **device management**. Operating system uses a utility software called **device driver** as interface to the device.

When many processes access the devices or request access to the devices, the OS manages the devices in a way that efficiently shares the devices among all processes. Processes access devices through **system call interface**, a programming interface provided by the OS.