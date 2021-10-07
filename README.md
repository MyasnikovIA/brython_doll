# brython_doll
Библиотека позволяет писать Python скрипты в вашем браузер (Flask).


Пимер использования Python в HTML коде:
```
<!doctype html>
<html>
    <head>
        <script type="text/javascript" src="js/brython_run.js"></script>
    </head>
    <body>
        <canvas width="500" height="500" id="clock"></canvas>
        <script type="text/python" >
            import show_source
            import clock1
            import uuid
            print(uuid.uuid4());
            
            # ajax запрос 
            from browser import ajax
            def on_complete(req):
                print(req.text)
            ajax.get("json/test.json", blocking=True, oncomplete=on_complete)
                        
        </script>
    </body>
</html>
```