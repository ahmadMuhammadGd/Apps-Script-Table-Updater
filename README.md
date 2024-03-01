# SQL-Merge-But-in-Vanilla-JavaScript-for-Apps-Script-Applications

to run the container in the interactive mode:
```sh
#if docker isn't added to user group
sudo docker-compose run app bash 

#if docker is added to user group
docker-compose run app bash 

```

to push changes to the cloud, enter this command inside the container
```bash
sh push.sh
```
it will ask for the appscript id
