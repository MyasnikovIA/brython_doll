document.addEventListener("DOMContentLoaded", function(){
   brython(
            {
                debug: 0,
                pythonpath:['PythonScript','component'] /*путь к папке или корневой URL расположение скриптов */
            }
   );
},true);