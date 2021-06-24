# Post Request Server
Small client/server demo to showcase the creation, sending and reading of post requests, made using Node.js and express


### How to use
- clone using ``git clone https://github.com/mosamo/Post-Request-Server.git``
- Navigate to project directory
- install express using ``npm install express`` (install node.js first if it is not on your machine)
- start the server using ``node .`` or ``node index.js``
- connect to ``http://localhost:8080/``
- create a post request using the interface and receive JSON Object result

_(you can also create a post request directly using insomnia or similiar software)_

## 

#### Accepted Post Request Body Examples
``{
    "data": ["001", "002", "002", "001"]
}``

``{
    "data": ["001", "002", 6, "man"]
}`` _*: accepted, but false indexes (2 and 3) are sanitized_
#### Rejected Post Request Body Examples

``
{
    "data": ["001", "00 6
}``

``
{
    "data": ["001", man ]
}``

``
{
    "dattaa": ["001", "002" ]
}``
