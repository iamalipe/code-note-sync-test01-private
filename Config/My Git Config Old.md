# My Git Config

git config –global [user.name](http://user.name/) “Abhiseck”

git config –global user.email “Abhiseck@outlook.com”

git config –global credential.useHttpPath true

to open config file

git config –global -e

ssh-keygen -t rsa -b 4096 -C “iamalipe”

Enter file in which to save the key (C:\Users\Abhiseck/.ssh/id_rsa): C:\Users\Abhiseck/.ssh/personal_key

Enter passphrase: alipe

±–[RSA 4096]—-+

|o .o.=_o.E_=o |

|o. B==o.o+= |

|… + O++ =. |

|o . B = o. . |

| o . + +S. |

|. o . . |

|.o o |

|. o . |

| … |

±—[SHA256]—–+

ssh-keygen -t rsa -b 4096 -C “abhiseck-scrobits”

Enter file in which to save the key (C:\Users\Abhiseck/.ssh/id_rsa): C:\Users\Abhiseck/.ssh/scrobits_key

Enter passphrase: scrobits

±–[RSA 4096]—-+

| … … |

| .o .o . . |

| …o+= o o |

| .oo*= + o |

| oEo*=oS o |

| + .o=oo o |

|+ … +o. . |

|+ . +.+o o |

| . o=++= |

±—[SHA256]—–+

# Personal iamalipe Github

Host personal

HostName [github.com](http://github.com/)

User git

IdentityFile ~/.ssh/personal_key

IdentitiesOnly yes

# Work abhiseck scrobits Github

Host scrobits

HostName [github.com](http://github.com/)

User git

IdentityFile ~/.ssh/scrobits_key

IdentitiesOnly yes

# add a new remote

> git remote add origin personal:User/UserRepo.git

# an existing remote repository

> git remote set-url origin personal:asasdasdad/asbdasbdn.git