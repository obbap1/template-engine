# template-engine
Nothing serious

```html
<html>
   <head>

   </head>
   <body>
       <h3>My name is {{name}} and i am {{age}} years old.</h3>
       <script src="./index.js"></script>
       <script>
           function fillUp() {
            const parse = new Parse({name: 'paschal', age: 45});
            parse.render();
           }
           
       </script>
   </body> 
</html>
```
Should return 

```
My name is paschal and i am 45 years old.
```