# A command line resume
## How to : run it

```bash
    npm install
    ./less.sh
    npm start
```

This work was made by me and [Yohann Celerien](https://github.com/Yosh971 "Yohann's github")

You can see mine > [here](https://navispeed.eu) < 

This project contain a shell like script (emulate basic programs and builtin)

### file structure

The filesystem structure is emulated thanks to ```public/directory.json```

Example, this file :
```json
{
  "name": "",
  "content": [
    {
      "name": "bin",
      "content": [
        {
          "name": "ls",
          "permission": 7,
          "desc": "list directory"
        }
      ]
    }
  ]
}
```

will give you this 
```
/
├── bin
   └─── ls
```

* ```bin``` object contain "content" property, this is a folder
* ```ls``` object doesn't contain "content" property, this is an executable

So you can type
```shell
$> /bin/ls
```

This will execute ```ls```

### Executables

```ls``` is defined in ```public/directory.json```, but is definition as a program is in 
```public/javascript/binairies.js```

This file contain a global object, named ```binairies```, and contain multiple method, each os these represent a binary,
 like ```ls```
 
 This object permit to do this
 ```js
 var ls_binary = binairies["ls"]; //Retrieve ls function
 
 ls_binary("/bin") //Is like 'ls /bin'
 ```
 
 ## Disclaimer
 
 This project is not really responsible (you can use it on mobile at your own risk)
 This project contain bugs
 This project is a web project, so it will never end :) 