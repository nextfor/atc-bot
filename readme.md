# Getting started

First you'll need [Node](https://nodejs.org/en/) and [Git](https://git-scm.com/) as a requirement to get started. 
To run the bot, you will also need a Discord Bot token to link the code to the correct bot. I'll let you search on Google how to create a Discord Bot token.

Once you installed everything, create a file named .env with the following content :
```
TOKEN=<yourbottoken>
```
Now set your channel id if you want only one channel to accept the bot (in resources.json) :
```
"atcChannel": <your channel id>
```
>Note, left blank if you don't want to apply any restriction  

Then, install dependencies with this command in the root folder :
```
npm i
```
And now you can launch it with 
```
npm start
```