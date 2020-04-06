# memory-example
Good for testing large creation and deletion of backbone views and models. (Based entirely off another persons memory example project except for the fact delete does not work how they thought it does)

To run clone the file then run the following commands
```
npm install
node server.js
```

Then go to localhost:{portNum} where {portNum} is the port printed after the command is run.

Here is the test script that can be run in the browser to test its memory management:
```
for (var i = 0; i < 10000; i++) {
  $("button").click();
}
```
After loading the webpage inspect and use the memory tool along with the code to test the memory allocation. Running that script in the 
console to test its memory management on 10000 button clicks to make it easier than testing manually. If the backbone debugger is 
active you will see a large memory leak and it may take awhile to run. Where if your not using the backbone debugger the 
file page will be ever so slightly larger after running the 10000 clicks.
