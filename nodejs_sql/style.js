let navbar = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>

body {
    font-family:Arial,sans-serif;
    margin:2%;
    padding:10px;
    font-size:12px;
    text-align:center;
}

h1 {
    margin:0px;
    margin-bottom:12px;
    text-align:center;
    font-size:28px;
}

table {
    border-collapse: collapse;   
    margin-left:auto; 
    margin-right:auto;
} 

td, th {
    padding:8px;
    border-style:solid
}

ul.topnav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  margin-bottom: 20px;
}

ul.topnav li {float: left;}

ul.topnav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

ul.topnav li a:hover:not(.active) {background-color: #111;}

ul.topnav li a.active {background-color: #04AA6D;}

ul.topnav li.right {float: right;}

@media screen and (max-width: 600px) {
  ul.topnav li.right, 
  ul.topnav li {float: none;}
}

label {
  font-weight: bold;
}

input[type=text], select {
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 50%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>`

let navlist = `<ul class="topnav">
<li><a class="active" href="/tables">Database Tables</a></li>
<li><a href="/form">Add</a></li>
<li class="right"><a href="/about">About</a></li>
</ul>
`

module.exports = { navbar, navlist };