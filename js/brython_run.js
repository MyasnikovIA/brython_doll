document.addEventListener("DOMContentLoaded", function(){
   loadScript("js/brython.min.js").then(function(){
       loadScript("js/brython_stdlib.min.js").then(function(){
               // инициализация интерпритптора Python
               brython( {   debug: 0,
                            pythonpath:['PythonScript','component'] /*путь к папке или корневой URL расположение скриптов */
                        });
       },function(error){ console.log(error); })
   },function(error){ console.log(error); })
},true);

 /**
       loadScript("/engine/classes/js/jquery.pickmeup.min.js").then(function(){
           console.log("js ready");
       },function(error){
           console.log(error);
       })

       loadCSS("/engine/classes/css/pickmeup.min.css").then(function(){
           console.log("css ready");
       },function(error){
           console.log(error);
       })
 */

    function getJsonUrl(url) {
         var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', url, false);
        // 3. Отсылаем запрос
        xhr.send();
        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
          // обработать ошибку
          alert( xhr.status + ': ' + xhr.statusText );  // пример вывода: 404: Not Found
          return {'error':xhr.status + ' : ' + xhr.statusText} ;
        } else {
          //return xhr.responseText ;
          return JSON.parse(xhr.response);
        }
    }
    function getTextUrl(url) {
         var xhr = new XMLHttpRequest();
        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', url, false);
        // 3. Отсылаем запрос
        xhr.send();
        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
          // обработать ошибку
          alert( xhr.status + ': ' + xhr.statusText );  // пример вывода: 404: Not Found
          return {'error':xhr.status + ' : ' + xhr.statusText} ;
        } else {
          return xhr.responseText ;
        }
    }
    function randomInteger(min, max) {
          // получить случайное число от (min-0.5) до (max+0.5)
          let rand = min - 0.5 + Math.random() * (max - min + 1);
          return Math.round(rand);
    }
    function copyToClipboard(text) {
          if (window.clipboardData && window.clipboardData.setData) {
              // IE specific code path to prevent textarea being shown while dialog is visible.
              return clipboardData.setData("Text", text);

          } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
              var textarea = document.createElement("textarea");
              textarea.textContent = text;
              textarea.style.position = "fixed";
              document.body.appendChild(textarea);
              textarea.select();
              try {
                  return document.execCommand("copy");
              } catch (ex) {
                  console.warn("Copy to clipboard failed.", ex);
                  return false;
              } finally {
                  document.body.removeChild(textarea);
              }
          }
    }

    window.loadScript = function(src,_timeout) {
           return new Promise(function(resolve, reject){
               if(!src){
                   reject(new TypeError("filename is missing"));
                   return;
               }

               var script=document.createElement("script"),
                   timer,
                   head=document.getElementsByTagName("head")[0];


               head.appendChild(script);

               function leanup(){
                   clearTimeout(timer);
                   timer=null;
                   script.onerror=script.onreadystatechange=script.onload=null;
               }

               function onload(){
                   leanup();
                   if(!script.onreadystatechange||(script.readyState&&script.readyState=="complete")){
                       resolve(script);
                   }
               }

               script.onerror=function(error){
                   leanup();
                   head.removeChild(script);
                   script=null;
                   reject(new Error("network"));
               };

               if (script.onreadystatechange === undefined) {
                   script.onload = onload;
               } else {
                   script.onreadystatechange = onload;
               }

               timer=setTimeout(script.onerror,_timeout||30000);
               script.setAttribute("type", "text/javascript");
               script.setAttribute("src", src);
           });
       }
     function loadCSS (src, _timeout) {
           var css = document.createElement('link'), c = 1000;
           document.getElementsByTagName('head')[0].appendChild(css);
           css.setAttribute("rel", "stylesheet");
           css.setAttribute("type", "text/css");


           return new Promise(function(resolve, reject){
               var c=(_timeout||10)*100;
               if(src) {
                   css.onerror = function (error) {
                       if(timer)clearInterval(timer);
                       timer = null;

                       reject(new Error("network"));
                   };

                   var sheet, cssRules, timer;
                   if ('sheet' in css) {
                       sheet = 'sheet';
                       cssRules = 'cssRules';
                   }
                   else {
                       sheet = 'styleSheet';
                       cssRules = 'rules';
                   }
                   timer = setInterval(function(){
                       try {
                           if (css[sheet] && css[sheet][cssRules].length) {
                               clearInterval(timer);
                               timer = null;
                               resolve(css);
                               return;
                           }
                       }catch(e){}

                       if(c--<0){
                           clearInterval(timer);
                           timer = null;
                           reject(new Error("timeout"));
                       }
                   }, 10);

                   css.setAttribute("href", src);
               }else{
                   reject(new TypeError("filename is missing"));
               }
           });
       }
       var toCamelCase = function toCamelCase(str) {
         return str.replace(/\W+(.)/g, function(match, chr) { return chr.toUpperCase(); });
       }
       var toWorldsCase = function toWorldsCase(text) {
          var result = text.replace( /([A-Z])/g, "-$1" );
          return result.toLowerCase();
       }
        function parse_query_string(query) {
            var vars = query.split("&");
            var query_string = {};
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                var key = decodeURIComponent(pair[0]);
                var value = decodeURIComponent(pair[1]);
                // If first entry with this name
                if (typeof query_string[key] === "undefined") {
                    query_string[key] = decodeURIComponent(value);
                    // If second entry with this name
                } else if (typeof query_string[key] === "string") {
                    var arr = [query_string[key], decodeURIComponent(value)];
                    query_string[key] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[key].push(decodeURIComponent(value));
                }
            }
            return query_string;
        }
