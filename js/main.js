var NeoApp=angular.module("NeoApp",["ngAnimate","ngRoute","ngSanitize","ngTouch","ui.bootstrap"],function($interpolateProvider){$interpolateProvider.startSymbol("[");$interpolateProvider.endSymbol("]");});NeoApp.config(["$routeProvider",function($routeProvider,$scope,$rootScope){$routeProvider.when("/start",{templateUrl:"start",controller:"start_Ctrl"});$routeProvider.when("/menu",{templateUrl:"menu",controller:"menu_Ctrl"});$routeProvider.when("/fsticks",{templateUrl:"fsticks",controller:"fsticks_Ctrl"});$routeProvider.when("/puay",{templateUrl:"puay",controller:"puay_Ctrl"});$routeProvider.when("/SelOracle",{templateUrl:"SelOracle",controller:"SelOracle_Ctrl"});$routeProvider.when("/FAQ",{templateUrl:"FAQ",controller:"FAQ_Ctrl"});$routeProvider.otherwise({redirectTo:"/start"});}]);NeoApp.filter("checkmark",function(){return function(input){return input?"\u2713":"\u2718";};});NeoApp.filter("element",function(){return function(input,idx1,idx2){idx1=idx1||0;if(input&&input.constructor===Array){if(idx2){return input[idx1,idx2];}else{return input[idx1];};};return"";};});NeoApp.filter("string",function(){return function(input){if(input&&input.constructor===Array)return input.toString();if(input)return input;return"";};});NeoApp.filter("default",function(){return function(input,defValue){if(!input)return defValue;return input;};});NeoApp.filter("trustUrl",function($sce){return function(url){return $sce.trustAsResourceUrl(url);};});NeoApp.filter('bool',function(){return function(input,valueTrue,valueFalse){return input!==true?valueFalse:valueTrue;};});NeoApp.filter('splitLt',function(){return function(str,delimeter){var p=str.indexOf(delimeter);return(p>-1)?str.substring(0,p):str;};});NeoApp.filter('splitRt',function(){return function(str,delimeter){var p=str.indexOf(delimeter);return(p>-1)?str.substring(p+1):str;};});NeoApp.controller("NeoApp_CoreCtrl",function($scope,$rootScope,$location,$route,$modal,$window,$timeout,$interval,$http,$filter,$compile,$animate){$App=$rootScope;$App.$on("$locationChangeStart",function(event,newUrl,oldUrl){var newPg=newUrl.substr(newUrl.lastIndexOf("/")+1);var oldPg=oldUrl.substr(oldUrl.lastIndexOf("/")+1);if(newPg=="!"){event.preventDefault();};if(oldPg=="menu"){$scope.menu_pageexit();};if(newPg=="menu"){$timeout($scope.menu_pageenter);};if(newPg=="fsticks"){$timeout($scope.fsticks_pageenter);};if(newPg=="puay"){$timeout($scope.puay_pageenter);};if(newPg=="SelOracle"){$timeout($scope.SelOracle_pageenter);};if(newPg=="FAQ"){$timeout($scope.FAQ_pageenter);};});
$scope.SetError=function(msg){throw msg;};$scope.Refresh=function(){$timeout(angular.noop);};$scope.GetOrientation=function(){if($window.orientation){if(Math.abs(window.orientation)===90){return"Landscape";}else{return"Portrait";}}else{if($window.innerWidth>=$window.innerHeight){return"Landscape";}else{return"Portrait";}}};$scope.GotoPageNum=function(pgNum){if(pgNum>0&&pgNum<=$App.NAB.PageList.length){if($App.NAB.PageEnterEffect[pgNum-1]){$App.NAB._pageEffect=" animate enter-"+$App.NAB.PageEnterEffect[pgNum-1]+" exit-"+($App.NAB.PageExitEffect[pgNum-1]||"fadeOut");}else{$App.NAB._pageEffect="";}$timeout(function(){$location.path('/'+$App.NAB.PageList[pgNum-1]);});}else{$scope.SetError('Invalid page.');}};$scope.GotoPage=function(pgId){$scope.GotoPageNum($App.NAB.PageList.indexOf(pgId)+1);};$scope.GotoFirstPage=function(){$scope.GotoPageNum(1);};$scope.GotoLastPage=function(){$scope.GotoPageNum($App.NAB.PageList.length);};$scope.GotoNextPage=function(){var pgNum=$App.NAB.PageNumber;if(pgNum<$App.NAB.PageList.length){$scope.GotoPageNum(pgNum+1);return true;}return false;};$scope.GotoPrevPage=function(){var pgNum=$App.NAB.PageNumber;if(pgNum>1){$scope.GotoPageNum(pgNum-1);return true;}return false;};function makeSVG(tag,attrs){var el=document.createElementNS('http://www.w3.org/2000/svg',tag);for(var k in attrs)el.setAttribute(k,attrs[k]);return el;};$scope.DrawCircle=function DrawCircle(objId,svgName,cx,cy,circleRadio,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('circle',{'id':svgName,'VisualNEOWebName':svgName,'cx':cx,'cy':cy,'r':circleRadio,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});document.getElementById(objId).appendChild($App[svgName]);};$scope.DrawEllipse=function DrawEllipse(objId,svgName,cx,cy,rx,ry,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('ellipse',{'id':svgName,'VisualNEOWebName':svgName,'cx':cx,'cy':cy,'rx':rx,'ry':ry,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});document.getElementById(objId).appendChild($App[svgName]);};$scope.DrawRect=function DrawRect(objId,svgName,posx,posy,width,height,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('rect',{'id':svgName,'VisualNEOWebName':svgName,'x':posx,'y':posy,'width':width,'height':height,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});document.getElementById(objId).appendChild($App[svgName]);};$scope.DrawPolygon=function DrawPolygon(objId,svgName,points,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('polygon',{'id':svgName,'VisualNEOWebName':svgName,'points':points,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});document.getElementById(objId).appendChild($App[svgName]);};$scope.DrawPath=function DrawPath(objId,svgName,path,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('path',{'id':svgName,'VisualNEOWebName':svgName,'d':path,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});document.getElementById(objId).appendChild($App[svgName]);};$scope.DrawPolyLine=function DrawPolyLine(objId,svgName,points,strokeColor,strokeWidth){$App[svgName]=makeSVG('polyline',{'id':svgName,'VisualNEOWebName':svgName,'points':points,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':'none'});document.getElementById(objId).appendChild($App[svgName]);};$scope.DrawLine=function DrawLine(objId,svgName,x1,y1,x2,y2,strokeColor,strokeWidth){$App[svgName]=makeSVG('line',{'id':svgName,'VisualNEOWebName':svgName,'x1':x1,'y1':y1,'x2':x2,'y2':y2,'stroke':strokeColor,'stroke-width':strokeWidth});document.getElementById(objId).appendChild($App[svgName]);};$scope.DrawImage=function DrawImage(objId,svgName,fileName,x,y,width,height){$App[svgName]=makeSVG('image',{'id':svgName,'VisualNEOWebName':svgName,'x':x,'y':y,'width':width,'height':height,'xlink:href':''});$App[svgName].setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",""+fileName+"");document.getElementById(objId).appendChild($App[svgName]);};$scope.DrawText=function DrawText(objId,svgName,theText,posx,posy,fillColor,fontSize,fontFamily,angle){$App[svgName]=makeSVG('text',{'id':svgName,'VisualNEOWebName':svgName,'x':posx,'y':posy,'stroke-width':0,'fill':fillColor,'font-size':fontSize,'font-family':fontFamily,'transform':'rotate('+angle+' '+posx+' '+posy+')'});$App[svgName].textContent=theText;document.getElementById(objId).appendChild($App[svgName]);};$scope.DrawClear=function DrawClear(objId){var n=0;$("#"+objId).children().each(function(){if(n!=0){$(this).remove();}n++;});};$scope.OnMouseEvent=function(objId,eventName,subroutine){if(eventName=="contextmenu"){if($App.NAB[objId]){$App.NAB[objId].on(eventName,function(e){e.preventDefault();subroutine;return;});}$("#"+objId).on(eventName,function(e){e.preventDefault();subroutine;return;});}if($App.NAB[objId]){$App.NAB[objId].on(eventName,subroutine);return;}$("#"+objId).on(eventName,subroutine);};$scope.RemoveMouseEvent=function(objId,eventName){if($App.NAB[objId]){$App.NAB[objId].off(eventName);return;}$("#"+objId).off(eventName);};$scope.ShowObject=function(objId,effect,speed){if($App.NAB[objId]){$App.NAB[objId].show(speed);return;}if(!effect||effect.toLowerCase()=='none'){$App.NAB[objId+'_effect']='';}else{if(speed)effect=effect+' speed-'+speed*50;$App.NAB[objId+'_effect']='animate enter-'+effect;}$timeout(function(){var name=objId+'_hidden';if($App.NAB[name])delete $App.NAB[name];});};$scope.HideObject=function(objId,effect,speed){if($App.NAB[objId]){$App.NAB[objId].hide(speed);return;}if(!effect||effect.toLowerCase()=='none'){$App.NAB[objId+'_effect']='';}else{if(speed)effect=effect+' speed-'+speed*50;$App.NAB[objId+'_effect']='animate exit-'+effect;}$timeout(function(){$App.NAB[objId+'_hidden']=true;});};$scope.DisableObject=function(objId,value){var name=objId+'_disabled';if(value){$App.NAB[name]=value;}else{if($App.NAB[name])delete $App.NAB[name];}};$scope.SetObjectStyle=function(objId,selector,value){if($App.NAB[objId]){$App.NAB[objId].css(selector,value);return;}if($App[objId]){$("#"+objId).css(selector,value);return;}var name=objId+'_style';if(!$App.NAB[name])$App.NAB[name]={};if(value&&value.length>0){$App.NAB[name][selector]=value;}else{if($App.NAB[name][selector])delete $App.NAB[name][selector];if(jQuery.isEmptyObject($App.NAB[name]))delete $App.NAB[name];}};$scope.ClearObjectStyles=function(objId){var name=objId+'_style';if($App.NAB[name])delete $App.NAB[name];};$scope.GetObjectInfo=function(objId,info){if($App.NAB[objId]){return $App.NAB[objId].css(info);}return $("#"+objId).css(info);};$scope.SetObjectHTML=function(objId,code){if($App.NAB[objId]){$App.NAB[objId].html(code);return;}var e=document.getElementById(objId);e.innerHTML=code;$compile(e)($scope);};$scope.GetObjectHTML=function(objId){if($App.NAB[objId]){return $App.NAB[objId].html();;}return document.getElementById(objId).innerHTML;};$scope.SetObjectAttribute=function(objId,AttrName,AttrValue){if($App.NAB[objId]){$App.NAB[objId].attr(AttrName,AttrValue);return;}$("#"+objId).attr(AttrName,AttrValue);var e=document.getElementById(objId);$compile(e)($scope);};$scope.GetObjectAttribute=function(objId,AttrName){if($App.NAB[objId]){return $App.NAB[objId].attr(AttrName);}return $("#"+objId).attr(AttrName);};$scope.SetObjectText=function(objId,code){if($App.NAB[objId]){$App.NAB[objId].text(code);return;}var e=document.getElementById(objId);e.innerText=code;$compile(e)($scope);};$scope.GetObjectText=function(objId){if($App.NAB[objId]){return $App.NAB[objId].text();}return document.getElementById(objId).innerText;};$scope.DuplicateObject=function(objId,objName,containerId){if($App.NAB[objName]){$App.NAB[objName].remove();delete $App.NAB[objName];}else{$("#"+objName).remove();delete $App.NAB[objName];}if($App.NAB[objId]){$App.NAB[objName]=$App.NAB[objId].clone().appendTo("#"+containerId);}else if($App[objId]){$App.NAB[objName]=$("#"+objId).clone().appendTo("#"+containerId);$App.NAB[objName].attr("id","");}else{$App.NAB[objName]=$("#"+objId).clone().appendTo("#"+containerId);}$App.NAB[objName].attr("VisualNEOWebName",objName);$App.NAB[objName].attr("ng-style","NAB."+objName+"_style");$App.NAB[objName].attr("ng-hide","NAB."+objName+"_hidden");$App.NAB[objName].attr("ng-disabled","NAB."+objName+"_disabled");var e=document.getElementById(containerId);$compile(e)($scope);};$scope.AnimateObjectCSS=function(objId,cssData,duration,delay,easing,callbackfn){if($App.NAB[objId]){$App.NAB[objId].delay(delay).animate(cssData,duration,easing,callbackfn);}else{$("#"+objId).delay(delay).animate(cssData,duration,easing,callbackfn);}};$scope.SetObjectCSS=function(objId,cssData){if($App.NAB[objId]){$App.NAB[objId].css(cssData);}else{$("#"+objId).css(cssData);}};function fixUnit(s){var t=s.toString();var parts=t.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);return(parts[2])?t:parts[1]+'px';}$scope.SetObjectBounds=function(objId,l,t,w,h){if($App.NAB[objId]){var e=$App.NAB[objId];}else{var e=document.getElementById(objId);}if(w){w=fixUnit(w);e.style.width=w;$scope.SetObjectStyle(objId,'width',w);};if(h){h=fixUnit(h);e.style.height=h;$scope.SetObjectStyle(objId,'height',h);};if(l){l=fixUnit(l);e.style.left=l;$scope.SetObjectStyle(objId,'left',l);};if(t){t=fixUnit(t);e.style.top=t;$scope.SetObjectStyle(objId,'top',t);};};$scope.MoveObject=function(objId,left,top){if($App.NAB[objId]){$App.NAB[objId].css("left",left);$App.NAB[objId].css("top",top);}else{$scope.SetObjectBounds(objId,left,top);}};$scope.ObjectToFront=function(objId){if($App.NAB[objId]){theParent=$App.NAB[objId].parent();$App.NAB[objId].detach().appendTo(theParent);}else{theParent=$("#"+objId).parent();$("#"+objId).detach().appendTo(theParent);}};$scope.ObjectToBack=function(objId){if($App.NAB[objId]){theParent=$App.NAB[objId].parent();$App.NAB[objId].detach().prependTo(theParent);}else if($("#"+objId).parent().prop("tagName")=="svg"){theParent=$("#"+objId).parent().children().first();$("#"+objId).detach().insertAfter(theParent);}else{theParent=$("#"+objId).parent();$("#"+objId).detach().prependTo(theParent);}};$scope.SizeObject=function(objId,width,height){if($App.NAB[objId]){w=fixUnit(width);h=fixUnit(height);$App.NAB[objId].css("width",w);$App.NAB[objId].css("height",h);}else{$scope.SetObjectBounds(objId,null,null,width,height);}};$scope.RotateObject=function(objId,deg){if($App.NAB[objId]){$App.NAB[objId].css("webkitTransform","rotate("+deg+"deg)");$App.NAB[objId].css("mozTransform","rotate("+deg+"deg)");$App.NAB[objId].css("msTransform","rotate("+deg+"deg)");$App.NAB[objId].css("oTransform","rotate("+deg+"deg)");$App.NAB[objId].css("transform","rotate("+deg+"deg)");}else{var e=document.getElementById(objId);e.style.webkitTransform='rotate('+deg+'deg)';e.style.mozTransform='rotate('+deg+'deg)';e.style.msTransform='rotate('+deg+'deg)';e.style.oTransform='rotate('+deg+'deg)';e.style.transform='rotate('+deg+'deg)';};};$scope.ListBoxSort=function(objId){if($("#"+objId).children("option:selected").text()==""){$("#"+objId).children("option:selected").remove();};$("#"+objId+" option").filter(function(){return!this.value||$.trim(this.value).length==0||$.trim(this.text).length==0;}).remove();var options=$("#"+objId+" option");var arr=options.map(function(_,o){return{t:$(o).text(),v:o.value};}).get();arr.sort(function(o1,o2){return o1.t>o2.t?1:o1.t<o2.t?-1:0;});options.each(function(i,o){o.value=arr[i].v;$(o).text(arr[i].t);});if($("#"+objId).children("option:selected").text()==""){$("#"+objId).children("option:selected").remove();};};$scope.ListBoxMoveItem=function(listID,direction){var listbox=document.getElementById(listID);var selIndex=listbox.selectedIndex;if(-1==selIndex){return;}var increment=-1;if(direction=='up'){if(selIndex==1){return;}else{increment=-1;}}else{increment=1;}if((selIndex+increment)<0||(selIndex+increment)>(listbox.options.length-1)){return;}var selValue=listbox.options[selIndex].value;var selText=listbox.options[selIndex].text;listbox.options[selIndex].value=listbox.options[selIndex+increment].value
listbox.options[selIndex].text=listbox.options[selIndex+increment].text
listbox.options[selIndex+increment].value=selValue;listbox.options[selIndex+increment].text=selText;listbox.selectedIndex=selIndex+increment;};$scope.OpenDialog=function(dlgId){var modalInstance=$modal.open({templateUrl:dlgId,controller:dlgId+'_Ctrl',scope:$scope,size:'sm',backdrop:'static',animation:true});};$scope.AlertBox=function(dlgTitle,dlgMsg,dlgKind,callbackFn){var dlgKind=dlgKind||"primary";var modalInstance=$modal.open({template:'<div class="modal-dialog" ng-class="modal-sm">'+'<div class="modal-content">'+'<div class="modal-header bg-'+dlgKind+'">'+'<h4 class="modal-title">'+dlgTitle+'</h4>'+'</div>'+'<div class="modal-body">'+'<p>'+dlgMsg+'</p>'+'</div>'+'<div class="modal-footer">'+'<button class="btn btn-primary" ng-click="CloseDialog();">OK</button>'+'</div>'+'</div>'+'</div>',controller:'App_DlgCtrl',scope:$scope,size:'sm',backdrop:'static'});if(callbackFn!=undefined){modalInstance.result.then(function(){callbackFn()},function(){callbackFn()});}};$scope.MessageBox=function(dlgTitle,dlgMsg,dlgButtons,dlgKind,callbackFn){var idx;var btns=dlgButtons.split("|");var btnsHTML='';for(idx=0;idx<btns.length;idx++){btnsHTML+='<button class="btn btn-primary" ng-click="CloseDialogBtn('+idx.toString()+');">'+btns[idx]+'</button>';}var dlgKind=dlgKind||"primary";var modalInstance=$modal.open({template:'<div class="modal-dialog" ng-class="modal-sm">'+'<div class="modal-content">'+'<div class="modal-header bg-'+dlgKind+'">'+'<h4 class="modal-title">'+dlgTitle+'</h4>'+'</div>'+'<div class="modal-body">'+'<p>'+dlgMsg+'</p>'+'</div>'+'<div class="modal-footer">'+btnsHTML+'</div>'+'</div>'+'</div>',controller:'App_DlgCtrl',scope:$scope,size:'sm',backdrop:'static'});if(callbackFn){modalInstance.result.then(function(value){callbackFn(value+1)},function(){callbackFn(0)});}};$scope.SerializeForm=function(formId){var form=document.getElementById(formId);if(!form||form.nodeName!=="FORM")return;var i,j,s,field,m,q=[];for(i=0;i<form.elements.length;i++){field=form.elements[i];if(field.name==="")continue;switch(field.nodeName){case'INPUT':switch(field.type){case'text':case'hidden':case'password':case'number':q.push(field.name+"="+encodeURIComponent(field.value));break;case'checkbox':if(angular.isElement(field)){m=angular.element(field).controller('ngModel');if(m){q.push(field.name+"="+encodeURIComponent(m.$modelValue));break;}}q.push(field.name+"="+encodeURIComponent(field.checked));break;case'radio':if(field.checked){q.push(field.name+"="+encodeURIComponent(field.value));}break;case'file':break;}break;case'TEXTAREA':q.push(field.name+"="+encodeURIComponent(field.value));break;case'SELECT':switch(field.type){case'select-one':q.push(field.name+"="+encodeURIComponent(field.value));break;case'select-multiple':s='';for(j=field.options.length-1;j>=0;j=j-1){if(field.options[j].selected){s+=','+encodeURIComponent(field.options[j].value);}}if(s.length>0)q.push(field.name+"="+s.substr(1));break;}break;}}return q.join("&");};$scope.SubmitForm=function(form,url,method,submitFn,successFn,failFn){var ok=true;if(submitFn){ok=submitFn();}if(ok&&form&&url&&method){var f=$scope.SerializeForm(form);$http({method:method,url:url,data:f,responseType:"text",headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(function(response){if(successFn)successFn(response.data,response.status);},function(response){if(failFn)failFn(response.data,response.status);});}};$scope.FormSubmit=function(formulario,url){var neoApp=angular.element(document.getElementById("ng-view")).scope();var fnsubmit=neoApp[formulario+"_submit"];var fnsuccess=neoApp[formulario+"_success"];var fnfail=neoApp[formulario+"_fail"];neoApp.SubmitForm(formulario,url,'POST',fnsubmit,fnsuccess,fnfail);};$scope.FormReset=function(formulario){$("#"+formulario).trigger("reset");};$scope.SetCompVar=function(varname,varvalue){varname2="";vararray=varname.split("[");for(n=0;n<vararray.length;n++){vararray[n]=vararray[n].replace("]","");if($App[vararray[n]]!=undefined){varname2=varname2+$App[vararray[n]];}else{varname2=varname2+vararray[n];};};$App[varname2]=varvalue;};$scope.GetCompVar=function(varname,composedvar){varname2="";vararray=composedvar.split("[");for(n=0;n<vararray.length;n++){vararray[n]=vararray[n].replace("]","");if($App[vararray[n]]!=undefined){varname2=varname2+$App[vararray[n]];}else{varname2=varname2+vararray[n];};};$App[varname]=$App[varname2];};$scope.LoadGoogleFont=function(fontName){$("head").append("<link href='https://fonts.googleapis.com/css?family="+fontName+"' rel='stylesheet' type='text/css'>");};$scope.LocalFileToVar=function(inputFileName,resultVar,tipo){$App.NAB.temp=resultVar;var realInputFileName=$("#"+inputFileName).prop("for");var files=$('#'+realInputFileName).prop("files");for(var i=0,f;f=files[i];i++){var reader=new FileReader();reader.onload=(function(theFile,resultVar,callBackFunction){return function(e,resultVar){varName=$App.NAB.temp;$App[varName]=e.target.result;};})(f);if(tipo=="text"){reader.readAsText(f);}else if(tipo=="binary"){reader.readAsBinaryString(f);}else{reader.readAsArrayBuffer(f);}};};$scope.CenterApp=function(){$("body").css("position","absolute");$("body").css("top","0px");$("body").css("bottom","0px");$("body").css("left","0px");$("body").css("right","0px");$("body").css("margin","auto");};$scope.TopCenterApp=function(){$("body").css("position","absolute");$("body").css("top","0px!important");$("body").css("left","0px");$("body").css("right","0px");$("body").css("bottom","auto");$("body").css("margin","auto");};$scope.AppBackgroundColor=function(thecolor){$("html").css("background",thecolor);};$scope.AppBackgroundImage=function(imagen){ruta=$("#"+imagen).attr('src');$("html").css('background-image','url('+ruta+' )');$("html").css('background-repeat','no-repeat');$("html").css('background-position','center center');$("html").css('background-attachment','fixed');$("html").css("-webkit-background-size","cover");$("html").css("-moz-background-size","cover");$("html").css("-o-background-size","cover");$("html").css("background-size","cover");};$scope.ObjDisableSelection=function(objectname){$("#"+objectname).css("-webkit-touch-callout","none");$("#"+objectname).css("-webkit-user-select","none");$("#"+objectname).css("-khtml-user-select","none");$("#"+objectname).css("-moz-user-select","none");$("#"+objectname).css("-ms-user-select","none");$("#"+objectname).css("user-select","none");};$scope.DisableSelection=function(){$("*").css("-webkit-touch-callout","none");$("*").css("-webkit-user-select","none");$("*").css("-khtml-user-select","none");$("*").css("-moz-user-select","none");$("*").css("-ms-user-select","none");$("*").css("user-select","none");};$scope.GetUrlParameter=function(param){url=window.location.href;var queryString=url?url.split('?')[1]:window.location.search.slice(1);var obj={};if(queryString){queryString=queryString.split('#')[0];var arr=queryString.split('&');for(var i=0;i<arr.length;i++){var a=arr[i].split('=');var paramName=a[0];var paramValue=typeof(a[1])==='undefined'?true:a[1];if(typeof paramValue==='string')paramValue=paramValue;if(paramName.match(/\[(\d+)?\]$/)){var key=paramName.replace(/\[(\d+)?\]/,'');if(!obj[key])obj[key]=[];if(paramName.match(/\[\d+\]$/)){var index=/\[(\d+)\]/.exec(paramName)[1];obj[key][index]=paramValue;}else{obj[key].push(paramValue);}}else{if(!obj[paramName]){obj[paramName]=paramValue;}else if(obj[paramName]&&typeof obj[paramName]==='string'){obj[paramName]=[obj[paramName]];obj[paramName].push(paramValue);}else{obj[paramName].push(paramValue);}}}}return obj[param];};$scope.CheckInternetConnection=function(url,timeout,successFn,errorFn){$.ajax({url:url,timeout:timeout,cache:false,success:function(){if(successFn!=undefined){successFn();}},error:function(){if(errorFn!=undefined){errorFn();}},});};$scope.SetRelativePosition=function(objectname,vertical,horizontal){$("#"+objectname).css("position","absolute");if(vertical=="top"){$("#"+objectname).css("top","0px");$("#"+objectname).css("bottom","auto");}else if(vertical=="bottom"){$("#"+objectname).css("bottom","0px");$("#"+objectname).css("top","auto");}else{$("#"+objectname).css("bottom","0px");$("#"+objectname).css("top","0px");}if(horizontal=="left"){$("#"+objectname).css("left","0px");$("#"+objectname).css("right","auto");}else if(horizontal=="right"){$("#"+objectname).css("left","auto");$("#"+objectname).css("right","0px");}else{$("#"+objectname).css("left","0px");$("#"+objectname).css("right","0px");}$("#"+objectname).css("margin","auto");};$scope.WatchVar=function(varName,fn){if($App.NAB.$Watches[varName]){if($App.NAB.$Watches[varName].deRegFn)$App.NAB.$Watches[varName].deRegFn();delete $App.NAB.$Watches[varName];};if(fn){$App.NAB.$Watches[varName]={id:varName,deRegFn:undefined};$App.NAB.$Watches[varName].deRegFn=$scope.$watch(varName,function(newVal,oldVal){if(oldVal!==newVal)fn(newVal,oldVal);});};};$scope.TimerStart=function(objId,ms){if($App.NAB.$Timers[objId]){if(!angular.isDefined($App.NAB.$Timers[objId].promise)){$App.NAB.$Timers[objId].stime=Date.now();$App.NAB.$Timers[objId].promise=$interval($App.NAB.$Timers[objId].fn,ms||1000);}}else throw'A timer named "'+objId+'" does not exist.';};$scope.TimerStop=function(objId){if($App.NAB.$Timers[objId]){if(angular.isDefined($App.NAB.$Timers[objId].promise)){$interval.cancel($App.NAB.$Timers[objId].promise);$App.NAB.$Timers[objId].promise=undefined;}}else throw'A timer named "'+objId+'" does not exist.';};$scope._DeleteSound=function(sname){if($App.NAB.$Audio[sname]){$App.NAB.$Audio[sname].player.pause();delete $App.NAB.$Audio[sname].player;delete $App.NAB.$Audio[sname];return true;}return false;};$scope.PlaySound=function(fname,loop){var sname=ExtractFileName(fname).toLowerCase();if($App.NAB.$Audio[sname])throw'A sound named "'+sname+'" is already playing.';var devicePlatform=(typeof device!=='undefined'&&device.platform)?device.platform:null;if(typeof Audio!=="undefined"&&devicePlatform===null){obj={id:sname,kind:"audio",player:new Audio(fname)};obj.player.addEventListener("ended",function(){$scope._DeleteSound(sname);});}else if(devicePlatform){if(devicePlatform==='Android'){if(!IsUrl(fname))fname='/android_asset/www/'+fname;}obj={id:sname,kind:"media",player:new Media(fname,function onSuccess(){$scope._DeleteSound(sname);},function onError(e){console.log("Error playing sound: "+JSON.stringify(e));$scope._DeleteSound(sname);})};}else throw'Sound API unavailable.';$App.NAB.$Audio[sname]=obj;if(obj.kind==="audio"){obj.player.loop=loop;obj.player.play();}else obj.player.play({numberOfLoops:loop});};$scope.StopSound=function(fname){if(!fname||fname.length===0){for(var id in $App.NAB.$Audio)$scope._DeleteSound(id);}else{var sname=ExtractFileName(fname).toLowerCase();if(!$scope._DeleteSound(sname))throw'There is no playing sound named "'+sname+'"';}};$scope.CreateVideoPlayer=function(objId,fname,controls,autoplay,looping,muted){var sname=ExtractFileName(fname).toLowerCase();if(controls){addcontrols="controls";}else{addcontrols="";}if(autoplay){addautoplay="autoplay";}else{addautoplay="";}if(looping){addloop="loop";}else{addloop="";}if(muted){addmuted="muted";}else{addmuted="";}htmlstring='<video id="'+objId+'Video" width="100%" height="100%" '+addcontrols+' '+addautoplay+' '+addloop+' '+addmuted+'><source src="'+fname+'" type="video/mp4"></video>';$("#"+objId).html(htmlstring);};$scope.OnVideoEvent=function(objId,eventName,subroutine){if($App.NAB[objId+"Video"]){$App.NAB[objId+"Video"].on(eventName,subroutine);return;}$("#"+objId+"Video").on(eventName,subroutine);};$scope.CreateAudioPlayer=function(objId,fname,controls,autoplay,looping){var sname=ExtractFileName(fname).toLowerCase();if(controls){addcontrols="controls";}else{addcontrols="";}if(autoplay){addautoplay="autoplay";}else{addautoplay="";}if(looping){addloop="loop";}else{addloop="";}htmlstring='<audio id="'+objId+'Audio" width="100%" height="100%" '+addcontrols+' '+addautoplay+' '+addloop+'><source src="'+fname+'" type="audio/mp3"></audio>';$("#"+objId).html(htmlstring);};$scope.OnAudioEvent=function(objId,eventName,subroutine){if($App.NAB[objId+"Audio"]){$App.NAB[objId+"Audio"].on(eventName,subroutine);return;}$("#"+objId+"Audio").on(eventName,subroutine);};$scope.SoundBeep=function(){var snd=new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");snd.play();};(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory($)})}else if(typeof module==="object"&&typeof module.exports==="object"){exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.easing.jswing=$.easing.swing;var pow=Math.pow,sqrt=Math.sqrt,sin=Math.sin,cos=Math.cos,PI=Math.PI,c1=1.70158,c2=c1*1.525,c3=c1+1,c4=2*PI/3,c5=2*PI/4.5;function bounceOut(x){var n1=7.5625,d1=2.75;if(x<1/d1){return n1*x*x}else if(x<2/d1){return n1*(x-=1.5/d1)*x+.75}else if(x<2.5/d1){return n1*(x-=2.25/d1)*x+.9375}else{return n1*(x-=2.625/d1)*x+.984375}}$.extend($.easing,{def:"easeOutQuad",swing:function(x){return $.easing[$.easing.def](x)},easeInQuad:function(x){return x*x},easeOutQuad:function(x){return 1-(1-x)*(1-x)},easeInOutQuad:function(x){return x<.5?2*x*x:1-pow(-2*x+2,2)/2},easeInCubic:function(x){return x*x*x},easeOutCubic:function(x){return 1-pow(1-x,3)},easeInOutCubic:function(x){return x<.5?4*x*x*x:1-pow(-2*x+2,3)/2},easeInQuart:function(x){return x*x*x*x},easeOutQuart:function(x){return 1-pow(1-x,4)},easeInOutQuart:function(x){return x<.5?8*x*x*x*x:1-pow(-2*x+2,4)/2},easeInQuint:function(x){return x*x*x*x*x},easeOutQuint:function(x){return 1-pow(1-x,5)},easeInOutQuint:function(x){return x<.5?16*x*x*x*x*x:1-pow(-2*x+2,5)/2},easeInSine:function(x){return 1-cos(x*PI/2)},easeOutSine:function(x){return sin(x*PI/2)},easeInOutSine:function(x){return-(cos(PI*x)-1)/2},easeInExpo:function(x){return x===0?0:pow(2,10*x-10)},easeOutExpo:function(x){return x===1?1:1-pow(2,-10*x)},easeInOutExpo:function(x){return x===0?0:x===1?1:x<.5?pow(2,20*x-10)/2:(2-pow(2,-20*x+10))/2},easeInCirc:function(x){return 1-sqrt(1-pow(x,2))},easeOutCirc:function(x){return sqrt(1-pow(x-1,2))},easeInOutCirc:function(x){return x<.5?(1-sqrt(1-pow(2*x,2)))/2:(sqrt(1-pow(-2*x+2,2))+1)/2},easeInElastic:function(x){return x===0?0:x===1?1:-pow(2,10*x-10)*sin((x*10-10.75)*c4)},easeOutElastic:function(x){return x===0?0:x===1?1:pow(2,-10*x)*sin((x*10-.75)*c4)+1},easeInOutElastic:function(x){return x===0?0:x===1?1:x<.5?-(pow(2,20*x-10)*sin((20*x-11.125)*c5))/2:pow(2,-20*x+10)*sin((20*x-11.125)*c5)/2+1},easeInBack:function(x){return c3*x*x*x-c1*x*x},easeOutBack:function(x){return 1+c3*pow(x-1,3)+c1*pow(x-1,2)},easeInOutBack:function(x){return x<.5?pow(2*x,2)*((c2+1)*2*x-c2)/2:(pow(2*x-2,2)*((c2+1)*(x*2-2)+c2)+2)/2},easeInBounce:function(x){return 1-bounceOut(1-x)},easeOutBounce:bounceOut,easeInOutBounce:function(x){return x<.5?(1-bounceOut(1-2*x))/2:(1+bounceOut(2*x-1))/2}})});function d(c){var b,a;if(!this.length)return this;b=this[0];b.ownerDocument?a=b.ownerDocument:(a=b,b=a.documentElement);if(null==c){if(!a.exitFullscreen&&!a.webkitExitFullscreen&&!a.webkitCancelFullScreen&&!a.msExitFullscreen&&!a.mozCancelFullScreen)return null;c=!!a.fullscreenElement||!!a.msFullscreenElement||!!a.webkitIsFullScreen||!!a.mozFullScreen;return!c?c:a.fullscreenElement||a.webkitFullscreenElement||a.webkitCurrentFullScreenElement||a.msFullscreenElement||a.mozFullScreenElement||c}c?(c=b.requestFullscreen||b.webkitRequestFullscreen||b.webkitRequestFullScreen||b.msRequestFullscreen||b.mozRequestFullScreen)&&c.call(b):(c=a.exitFullscreen||a.webkitExitFullscreen||a.webkitCancelFullScreen||a.msExitFullscreen||a.mozCancelFullScreen)&&c.call(a);return this}jQuery.fn.fullScreen=d;jQuery.fn.toggleFullScreen=function(){return d.call(this,!d.call(this))};var e,f,g;e=document;e.webkitCancelFullScreen?(f="webkitfullscreenchange",g="webkitfullscreenerror"):e.msExitFullscreen?(f="MSFullscreenChange",g="MSFullscreenError"):e.mozCancelFullScreen?(f="mozfullscreenchange",g="mozfullscreenerror"):(f="fullscreenchange",g="fullscreenerror");jQuery(document).bind(f,function(){jQuery(document).trigger(new jQuery.Event("fullscreenchange"))});jQuery(document).bind(g,function(){jQuery(document).trigger(new jQuery.Event("fullscreenerror"))});$scope.EnterFullScreen=function(){$(document).fullScreen(true);};$scope.ExitFullScreen=function(){$(document).fullScreen(false);};$scope.ObjectEnterFullScreen=function(ObjId){$("#"+ObjId).fullScreen(true);};$scope.ObjectExitFullScreen=function(ObjId){$("#"+ObjId).fullScreen(false);};var neoscript;$scope.AppOnKeyDown=function(callbackFn){$("body").keydown(function(evt){neoscript=angular.element(document.getElementById("ng-view")).scope();neoscript[callbackFn](evt.which);});};(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Depricated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;return b.open("HEAD",a,!1),b.send(),200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||"object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}};f.saveAs=a.saveAs=a,"undefined"!=typeof module&&(module.exports=a)});$scope.VarToFile=function(datavar,filename){var blob=new Blob([datavar],{type:"text/plain;charset=utf-8"});saveAs(blob,filename);};!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.mexp=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d=a("./postfix_evaluator.js");d.prototype.formulaEval=function(){"use strict";for(var a,b,c,d=[],e=this.value,f=0;f<e.length;f++)1===e[f].type||3===e[f].type?d.push({value:3===e[f].type?e[f].show:e[f].value,type:1}):13===e[f].type?d.push({value:e[f].show,type:1}):0===e[f].type?d[d.length-1]={value:e[f].show+("-"!=e[f].show?"(":"")+d[d.length-1].value+("-"!=e[f].show?")":""),type:0}:7===e[f].type?d[d.length-1]={value:(1!=d[d.length-1].type?"(":"")+d[d.length-1].value+(1!=d[d.length-1].type?")":"")+e[f].show,type:7}:10===e[f].type?(a=d.pop(),b=d.pop(),"P"===e[f].show||"C"===e[f].show?d.push({value:"<sup>"+b.value+"</sup>"+e[f].show+"<sub>"+a.value+"</sub>",type:10}):d.push({value:(1!=b.type?"(":"")+b.value+(1!=b.type?")":"")+"<sup>"+a.value+"</sup>",type:1})):2===e[f].type||9===e[f].type?(a=d.pop(),b=d.pop(),d.push({value:(1!=b.type?"(":"")+b.value+(1!=b.type?")":"")+e[f].show+(1!=a.type?"(":"")+a.value+(1!=a.type?")":""),type:e[f].type})):12===e[f].type&&(a=d.pop(),b=d.pop(),c=d.pop(),d.push({value:e[f].show+"("+c.value+","+b.value+","+a.value+")",type:12}));return d[0].value},b.exports=d},{"./postfix_evaluator.js":5}],2:[function(a,b,c){function d(a,b){for(var c=0;c<a.length;c++)a[c]+=b;return a}function e(a,b,c,d){for(var e=0;e<d;e++)if(a[c+e]!==b[e])return!1;return!0}var f=a("./math_function.js"),g=["sin","cos","tan","pi","(",")","P","C","asin","acos","atan","7","8","9","int","cosh","acosh","ln","^","root","4","5","6","/","!","tanh","atanh","Mod","1","2","3","*","sinh","asinh","e","log","0",".","+","-",",","Sigma","n","Pi","pow"],h=["sin","cos","tan","&pi;","(",")","P","C","asin","acos","atan","7","8","9","Int","cosh","acosh"," ln","^","root","4","5","6","&divide;","!","tanh","atanh"," Mod ","1","2","3","&times;","sinh","asinh","e"," log","0",".","+","-",",","&Sigma;","n","&Pi;","pow"],i=[f.math.sin,f.math.cos,f.math.tan,"PI","(",")",f.math.P,f.math.C,f.math.asin,f.math.acos,f.math.atan,"7","8","9",Math.floor,f.math.cosh,f.math.acosh,Math.log,Math.pow,Math.sqrt,"4","5","6",f.math.div,f.math.fact,f.math.tanh,f.math.atanh,f.math.mod,"1","2","3",f.math.mul,f.math.sinh,f.math.asinh,"E",f.math.log,"0",".",f.math.add,f.math.sub,",",f.math.sigma,"n",f.math.Pi,Math.pow],j={0:11,1:0,2:3,3:0,4:0,5:0,6:0,7:11,8:11,9:1,10:10,11:0,12:11,13:0},k=[0,0,0,3,4,5,10,10,0,0,0,1,1,1,0,0,0,0,10,0,1,1,1,2,7,0,0,2,1,1,1,2,0,0,3,0,1,6,9,9,11,12,13,12,8],l={0:!0,1:!0,3:!0,4:!0,6:!0,8:!0,9:!0,12:!0,13:!0},m={0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0,10:!0,11:!0,12:!0,13:!0},n={0:!0,3:!0,4:!0,8:!0,12:!0,13:!0},o={},p={0:!0,1:!0,3:!0,4:!0,6:!0,8:!0,12:!0,13:!0},q={1:!0},r=[[],["1","2","3","7","8","9","4","5","6","+","-","*","/","(",")","^","!","P","C","e","0",".",",","n"],["pi","ln","Pi"],["sin","cos","tan","Del","int","Mod","log","pow"],["asin","acos","atan","cosh","root","tanh","sinh"],["acosh","atanh","asinh","Sigma"]];f.addToken=function(a){for(var b=0;b<a.length;b++){var c=a[b].token.length,d=-1;if(c<r.length)for(var e=0;e<r[c].length;e++)if(a[b].token===r[c][e]){d=g.indexOf(r[c][e]);break}d===-1?(g.push(a[b].token),k.push(a[b].type),r.length<=a[b].token.length&&(r[a[b].token.length]=[]),r[a[b].token.length].push(a[b].token),i.push(a[b].value),h.push(a[b].show)):(g[d]=a[b].token,k[d]=a[b].type,i[d]=a[b].value,h[d]=a[b].show)}},f.lex=function(a,b){"use strict";var c,s,t,u,v={value:f.math.changeSign,type:0,pre:21,show:"-"},w={value:")",show:")",type:5,pre:0},x={value:"(",type:4,pre:0,show:"("},y=[x],z=[],A=a,B=0,C=l,D=0,E=o,F="";"undefined"!=typeof b&&f.addToken(b);var G={};for(s=0;s<A.length;s++)if(" "!==A[s]){for(c="",t=A.length-s>r.length-2?r.length-1:A.length-s;t>0;t--)for(u=0;u<r[t].length;u++)e(A,r[t][u],s,t)&&(c=r[t][u],u=r[t].length,t=0);if(s+=c.length-1,""===c)throw new f.Exception("Can't understand after "+A.slice(s));var H,I=g.indexOf(c),J=c,K=k[I],L=i[I],M=j[K],N=h[I],O=y[y.length-1];for(H=z.length;H--&&0===z[H];)if([0,2,3,5,9,11,12,13].indexOf(K)!==-1){if(C[K]!==!0)throw new f.Exception(c+" is not allowed after "+F);y.push(w),C=m,E=p,d(z,-1).pop()}if(C[K]!==!0)throw new f.Exception(c+" is not allowed after "+F);if(E[K]===!0&&(K=2,L=f.math.mul,N="&times;",M=3,s-=c.length),G={value:L,type:K,pre:M,show:N},0===K)C=l,E=o,d(z,2).push(2),y.push(G),y.push(x);else if(1===K)1===O.type?(O.value+=L,d(z,1)):y.push(G),C=m,E=n;else if(2===K)C=l,E=o,d(z,2),y.push(G);else if(3===K)y.push(G),C=m,E=p;else if(4===K)B+=z.length,z=[],D++,C=l,E=o,y.push(G);else if(5===K){if(!D)throw new f.Exception("Closing parenthesis are more than opening one, wait What!!!");for(;B--;)y.push(w);B=0,D--,C=m,E=p,y.push(G)}else if(6===K){if(O.hasDec)throw new f.Exception("Two decimals are not allowed in one number");1!==O.type&&(O={value:0,type:1,pre:0},y.push(O),d(z,-1)),C=q,d(z,1),E=o,O.value+=L,O.hasDec=!0}else 7===K&&(C=m,E=p,d(z,1),y.push(G));8===K?(C=l,E=o,d(z,4).push(4),y.push(G),y.push(x)):9===K?(9===O.type?O.value===f.math.add?(O.value=L,O.show=N,d(z,1)):O.value===f.math.sub&&"-"===N&&(O.value=f.math.add,O.show="+",d(z,1)):5!==O.type&&7!==O.type&&1!==O.type&&3!==O.type&&13!==O.type?"-"===J&&(C=l,E=o,d(z,2).push(2),y.push(v),y.push(x)):(y.push(G),d(z,2)),C=l,E=o):10===K?(C=l,E=o,d(z,2),y.push(G)):11===K?(C=l,E=o,y.push(G)):12===K?(C=l,E=o,d(z,6).push(6),y.push(G),y.push(x)):13===K&&(C=m,E=p,y.push(G)),d(z,-1),F=c}for(H=z.length;H--&&0===z[H];)y.push(w),d(z,-1).pop();if(C[5]!==!0)throw new f.Exception("complete the expression");for(;D--;)y.push(w);return y.push(w),new f(y)},b.exports=f},{"./math_function.js":3}],3:[function(a,b,c){var d=function(a){this.value=a};d.math={isDegree:!0,acos:function(a){return d.math.isDegree?180/Math.PI*Math.acos(a):Math.acos(a)},add:function(a,b){return a+b},asin:function(a){return d.math.isDegree?180/Math.PI*Math.asin(a):Math.asin(a)},atan:function(a){return d.math.isDegree?180/Math.PI*Math.atan(a):Math.atan(a)},acosh:function(a){return Math.log(a+Math.sqrt(a*a-1))},asinh:function(a){return Math.log(a+Math.sqrt(a*a+1))},atanh:function(a){return Math.log((1+a)/(1-a))},C:function(a,b){var c=1,e=a-b,f=b;f<e&&(f=e,e=b);for(var g=f+1;g<=a;g++)c*=g;return c/d.math.fact(e)},changeSign:function(a){return-a},cos:function(a){return d.math.isDegree&&(a=d.math.toRadian(a)),Math.cos(a)},cosh:function(a){return(Math.pow(Math.E,a)+Math.pow(Math.E,-1*a))/2},div:function(a,b){return a/b},fact:function(a){if(a%1!==0)return"NaN";for(var b=1,c=2;c<=a;c++)b*=c;return b},inverse:function(a){return 1/a},log:function(a){return Math.log(a)/Math.log(10)},mod:function(a,b){return a%b},mul:function(a,b){return a*b},P:function(a,b){for(var c=1,d=Math.floor(a)-Math.floor(b)+1;d<=Math.floor(a);d++)c*=d;return c},Pi:function(a,b,c){for(var d=1,e=a;e<=b;e++)d*=Number(c.postfixEval({n:e}));return d},pow10x:function(a){for(var b=1;a--;)b*=10;return b},sigma:function(a,b,c){for(var d=0,e=a;e<=b;e++)d+=Number(c.postfixEval({n:e}));return d},sin:function(a){return d.math.isDegree&&(a=d.math.toRadian(a)),Math.sin(a)},sinh:function(a){return(Math.pow(Math.E,a)-Math.pow(Math.E,-1*a))/2},sub:function(a,b){return a-b},tan:function(a){return d.math.isDegree&&(a=d.math.toRadian(a)),Math.tan(a)},tanh:function(a){return d.sinha(a)/d.cosha(a)},toRadian:function(a){return a*Math.PI/180}},d.Exception=function(a){this.message=a},b.exports=d},{}],4:[function(a,b,c){var d=a("./lexer.js");d.prototype.toPostfix=function(){"use strict";for(var a,b,c,e,f,g=[],h=[{value:"(",type:4,pre:0}],i=this.value,j=1;j<i.length;j++)if(1===i[j].type||3===i[j].type||13===i[j].type)1===i[j].type&&(i[j].value=Number(i[j].value)),g.push(i[j]);else if(4===i[j].type)h.push(i[j]);else if(5===i[j].type)for(;4!==(b=h.pop()).type;)g.push(b);else if(11===i[j].type){for(;4!==(b=h.pop()).type;)g.push(b);h.push(b)}else{a=i[j],e=a.pre,f=h[h.length-1],c=f.pre;var k="Math.pow"==f.value&&"Math.pow"==a.value;if(e>c)h.push(a);else{for(;c>=e&&!k||k&&e<c;)b=h.pop(),f=h[h.length-1],g.push(b),c=f.pre,k="Math.pow"==a.value&&"Math.pow"==f.value;h.push(a)}}return new d(g)},b.exports=d},{"./lexer.js":2}],5:[function(a,b,c){var d=a("./postfix.js");d.prototype.postfixEval=function(a){"use strict";a=a||{},a.PI=Math.PI,a.E=Math.E;for(var b,c,e,f=[],g=this.value,h="undefined"!=typeof a.n,i=0;i<g.length;i++)1===g[i].type?f.push({value:g[i].value,type:1}):3===g[i].type?f.push({value:a[g[i].value],type:1}):0===g[i].type?"undefined"==typeof f[f.length-1].type?f[f.length-1].value.push(g[i]):f[f.length-1].value=g[i].value(f[f.length-1].value):7===g[i].type?"undefined"==typeof f[f.length-1].type?f[f.length-1].value.push(g[i]):f[f.length-1].value=g[i].value(f[f.length-1].value):8===g[i].type?(b=f.pop(),c=f.pop(),f.push({type:1,value:g[i].value(c.value,b.value)})):10===g[i].type?(b=f.pop(),c=f.pop(),"undefined"==typeof c.type?(c.value=c.concat(b),c.value.push(g[i]),f.push(c)):"undefined"==typeof b.type?(b.unshift(c),b.push(g[i]),f.push(b)):f.push({type:1,value:g[i].value(c.value,b.value)})):2===g[i].type||9===g[i].type?(b=f.pop(),c=f.pop(),"undefined"==typeof c.type?(console.log(c),c=c.concat(b),c.push(g[i]),f.push(c)):"undefined"==typeof b.type?(b.unshift(c),b.push(g[i]),f.push(b)):f.push({type:1,value:g[i].value(c.value,b.value)})):12===g[i].type?(b=f.pop(),"undefined"!=typeof b.type&&(b=[b]),c=f.pop(),e=f.pop(),f.push({type:1,value:g[i].value(e.value,c.value,new d(b))})):13===g[i].type&&(h?f.push({value:a[g[i].value],type:3}):f.push([g[i]]));if(f.length>1)throw new d.exception("Uncaught Syntax error");return f[0].value>1e15?"Infinity":parseFloat(f[0].value.toFixed(15))},d.eval=function(a,b,c){return"undefined"==typeof b?this.lex(a).toPostfix().postfixEval():"undefined"==typeof c?"undefined"!=typeof b.length?this.lex(a,b).toPostfix().postfixEval():this.lex(a).toPostfix().postfixEval(b):this.lex(a,b).toPostfix().postfixEval(c)},b.exports=d},{"./postfix.js":4}]},{},[1])(1)});$scope.Calculate=function(formula,decimals){var numero=mexp.eval(formula);if(decimals!=-1){potencia=Math.pow(10,decimals);numero=Math.round(numero*potencia)/potencia;}return numero;};$(document).mousemove(function(evt){var x=(evt.pageX-$('body').offset().left)+$(window).scrollLeft();var y=(evt.pageY-$('body').offset().top)+$(window).scrollTop();$App.NAB.MouseX=Math.round(x);$App.NAB.MouseY=Math.round(y);});
$App.NAB={PageList:["start","menu","fsticks","puay","SelOracle","FAQ"],PageEnterEffect:["","","","","",""],PageCount:6,PageExitEffect:["","","","","",""],PageNumber:1,PageID:"",Hour:"",Hour24:"",Minute:"",Second:"",Time:"",Time24:"",DateShort:"",DateLong:"",DateFull:"",Month:"",MonthNum:"",WeekNum:"",Day:"",DayNum:"",Year:"",ClientWidth:$window.innerWidth,ClientHeight:$window.innerHeight,WindowWidth:$window.outerWidth,WindowHeight:$window.outerHeight,Orientation:$scope.GetOrientation(),OperatingSystem:"",$Watches:{},$Timers:{},$Audio:{}};$scope.__doUpdate=function(){var Now=new Date();$App.NAB.Hour=$filter("date")(Now,"h");$App.NAB.Hour24=$filter("date")(Now,"H");$App.NAB.Minute=$filter("date")(Now,"mm");$App.NAB.Second=$filter("date")(Now,"ss");$App.NAB.Time=$filter("date")(Now,"mediumTime");$App.NAB.Time24=$filter("date")(Now,"H:mm:ss");$App.NAB.DateShort=$filter("date")(Now,"shortDate");$App.NAB.DateLong=$filter("date")(Now,"longDate");$App.NAB.DateFull=$filter("date")(Now,"fullDate");$App.NAB.Month=$filter("date")(Now,"MMMM");$App.NAB.MonthNum=$filter("date")(Now,"M");$App.NAB.WeekNum=$filter("date")(Now,"w");$App.NAB.Day=$filter("date")(Now,"EEEE");$App.NAB.DayNum=$filter("date")(Now,"d");$App.NAB.Year=$filter("date")(Now,"yyyy");};$scope.__doOrientationChange=function(){$App.NAB.Orientation=$scope.GetOrientation();};$scope.__doResize=function(){$App.NAB.ClientWidth=$window.innerWidth;$App.NAB.ClientHeight=$window.innerHeight;$App.NAB.WindowWidth=$window.outerWidth;$App.NAB.WindowHeight=$window.outerHeight;};$scope.__init=function(){angular.element($window).bind("orientationchange.app",function(){$timeout($scope.__doOrientationChange);});angular.element($window).bind("resize.app",function(){$timeout($scope.__doResize);});$interval($scope.__doUpdate,1000);$App.NAB.OperatingSystem=GetPlatform();$scope.__doUpdate();$scope.NeoApp_StartUp();};
$scope.NeoApp_StartUp = function() {slScaleAppFitWidth(320,714);
slScaleAppFitHeight(320,714);
neoGoogleFonts("Kanit::Prompt::Sarabun::Chakra Petch::Mali::Taviraj::Mitr::Sriracha::Bai Jamjuree::Noto Sans Thai::Itim::Niramit::Krub::Pridi::K2D::Athiti::Charm::Pattaya::Trirong::Chonburi::Maitree::Thasadith::KoHo::Fahkwang::Kodchasan::IBM Plex Sans Thai::Charmonman::Noto Serif Thai::IBM Plex Sans Thai Looped::Srisakdi::Noto Sans Simplified Chinese::ZCOOL XiaoWei::ZCOOL QingKe HuangYou::ZCOOL KuaiLe::Zhi Mang Xing::Liu Jian Mao Cao::Long Cang");
$scope.OnlineStatus();
$App.zTALK = 0;
$scope.SetObjectAttribute("menuFS1","src","./img/myimage.webp");
$scope.SetObjectAttribute("menuPuay1","src","./img/myimage.webp");
$scope.SetObjectAttribute("menuFC1","src","./img/myimage.webp");
$scope.HideObject("menuFS2","slideOutRight",14);
$scope.ShowObject("menuFS1","slideInRight",14);
$scope.HideObject("ImgIam","",0);
$scope.HideObject("menuPuay2","",0);
$scope.HideObject("ImgResult1","",0);
$scope.HideObject("ImgResult2","",0);
$scope.HideObject("ImgResult3","",0);
$scope.SetObjectAttribute("Image1","src","./img/myimage.webp");
$scope.HideObject("PBfsNum","",0);
$App.fs_stick = "";
$App.fs_puay = 0;
$scope.HideObject("PushButton4","",0);
$scope.HideObject("ImgPuay1","",0);
$scope.HideObject("ImgPuay2","",0);
$scope.HideObject("ImgPuay3","",0);
$scope.LoadGS();
$App.oracle = "โดยที่การไม่นำพาและการหมิ่นในคุณค่าของสิทธิมนุษยชน ๐๑๒๓๔๕๖๗๘๙";};
$scope.ClickPuay = function() {$scope.HideObject("ImgPuay1","",0);
$scope.HideObject("ImgPuay2","",0);
$scope.HideObject("ImgPuay3","",0);
if ($App.puayCount >= 3 || $App.fs_puay == 2 || $App.fs_puay == 3) {
$scope.GotoPage( "menu" );
} else {
$scope.HideObject("Img4","",0);
$scope.HideObject("Img3","",0);
$scope.HideObject("Img2","",0);
$scope.ShowObject("Img1","",0);
$scope.HideObject("Img1","bounceOutUp",14);
$App.fs_puay = RandomInt(1,4);
$timeout(function() {
$scope.PlaySound("media/puay3.mp3",false);
$scope.ShowObject("Img"+$App.fs_puay,"bounceInDown",14);
if ($App.fs_puay == 1) {
$scope.ShowObject("ImgPuay1","bounceIn",14);
};
if ($App.fs_puay == 2 || $App.fs_puay == 3) {
$scope.ShowObject("ImgPuay2","bounceIn",14);
};
if ($App.fs_puay == 4) {
$scope.ShowObject("ImgPuay3","bounceIn",14);
};
},1200);
$App.puayCount = $scope.Calculate($App.puayCount+"+1",0);
};};
$scope.OnlineStatus = function() {$App.fsOnline=navigator.onLine;
if ($App.fsOnline == true) {
$scope.ShowObject("SVGPowerOn","pulse",14);
$scope.HideObject("SVGPowerOff","pulse",14);
} else {
$scope.ShowObject("SVGPowerOff","pulse",14);
$scope.HideObject("SVGPowerOn","pulse",14);
};};
$scope.LoadGS = function() {$App.copyright = "Copyright © 2022-"+$App.NAB.Year+" ::www.zuma-ranger.com ::, All rights reserved.";
$App.GSheet1 = "1R4c0daj1PVgyhcBp4cvfDTOHrnkB0K9iqXbPOTgDGLo/edit#gid=1434656569";
$App.GSH1 = "https://docs.google.com/spreadsheets/d/"+$App.GSheet1;
neoGSheetsLoadCell($App.GSH1,"ora1","b",1,null);

neoGSheetsLoadCell($App.GSH1,"ora2","b",2,null);

neoGSheetsLoadCell($App.GSH1,"ora3","b",3,null);

neoGSheetsLoadCell($App.GSH1,"ora4","b",4,null);

neoGSheetsLoadCell($App.GSH1,"ora5","b",5,null);

neoGSheetsLoadCell($App.GSH1,"ora6","b",6,null);

neoGSheetsLoadCell($App.GSH1,"ora7","b",7,null);

neoGSheetsLoadCell($App.GSH1,"ora8","b",8,null);

neoGSheetsLoadCell($App.GSH1,"ora9","b",9,null);

neoGSheetsLoadCell($App.GSH1,"ora10","b",10,null);

neoGSheetsLoadCell($App.GSH1,"ora11","b",11,null);

neoGSheetsLoadCell($App.GSH1,"ora12","b",12,null);

neoGSheetsLoadCell($App.GSH1,"ora13","b",13,null);

neoGSheetsLoadCell($App.GSH1,"ora14","b",14,null);

neoGSheetsLoadCell($App.GSH1,"ora15","b",15,null);

neoGSheetsLoadCell($App.GSH1,"ora16","b",16,null);

neoGSheetsLoadCell($App.GSH1,"ora17","b",17,null);

neoGSheetsLoadCell($App.GSH1,"ora18","b",18,null);

neoGSheetsLoadCell($App.GSH1,"ora19","b",19,null);

neoGSheetsLoadCell($App.GSH1,"ora20","b",20,null);

neoGSheetsLoadCell($App.GSH1,"ora21","b",21,null);

neoGSheetsLoadCell($App.GSH1,"ora22","b",22,null);

neoGSheetsLoadCell($App.GSH1,"ora23","b",23,null);

neoGSheetsLoadCell($App.GSH1,"ora24","b",24,null);

neoGSheetsLoadCell($App.GSH1,"ora25","b",25,null);

neoGSheetsLoadCell($App.GSH1,"ora26","b",26,null);

neoGSheetsLoadCell($App.GSH1,"ora27","b",27,null);

neoGSheetsLoadCell($App.GSH1,"ora28","b",28,null);
};
$scope.zTALK = function() {var msg = new SpeechSynthesisUtterance();
msg.text = $App.oracle;
msg.lang = "th-TH";
window.speechSynthesis.speak(msg);};
$scope.zTALKstop = function() {window.speechSynthesis.cancel();};
$scope.Image3_click = function() {window.open("https://www.zuma-ranger.com/", "_blank");};
$scope.SVGicon1_click = function() {if ($App.NAB.PageID != "menu") {
if ($App.fs_sound == 1) {
$scope.StopSound("voice_2636.mp3");
$App.fs_sound = 0;
$scope.ShowObject("Image2","",0);
$scope.HideObject("Image1","",0);
};
$App.fs_stick = "";
$App.fs_puay = 0;
$scope.GotoPage( "menu" );
};};
$scope.SVGPowerOff_click = function() {Exit("Close App?");};
$scope.SVGPowerOn_click = function() {Exit("Close App?");};
$scope.ImgGold_click = function() {$scope.HideObject("ImgGold","",0);
$scope.GotoPage( "start" );};
$scope.ImgRed_click = function() {$scope.HideObject("ImgRed","",0);
$scope.GotoPage( "start" );};
$scope.ImgGreen_click = function() {$scope.HideObject("ImgGreen","",0);
$scope.GotoPage( "start" );};
$scope.ImgWhite_click = function() {$scope.HideObject("ImgWhite","",0);
$scope.GotoPage( "start" );};
$scope.menu_pageenter = function() {$scope.ShowObject("ImgIam","slideInRight",14);
$scope.HideObject("SVGicon1","",0);
$scope.ShowObject("SVGicon2","pulse",14);
if ($App.fs_stick != "") {
$scope.HideObject("menuFS1","slideOutLeft",14);
$scope.ShowObject("menuFS2","slideInRight",14);
$scope.ShowObject("PBfsNum","",0);
} else {
$scope.HideObject("menuFS2","slideOutRight",14);
$scope.ShowObject("menuFS1","slideInRight",14);
$scope.HideObject("PBfsNum","",0);
};
$scope.HideObject("ImgResult1","",0);
$scope.HideObject("ImgResult2","",0);
$scope.HideObject("ImgResult3","",0);
if ($App.fs_puay == 0) {
$scope.HideObject("ImgResult1","flipInX",14);
$scope.HideObject("ImgResult2","flipInX",14);
$scope.HideObject("ImgResult3","flipInX",14);
$scope.HideObject("menuPuay2","slideOutRight",14);
$scope.ShowObject("menuPuay1","slideInRight",14);
};
if ($App.fs_puay == 1) {
$scope.HideObject("menuPuay1","slideOutRight",14);
$scope.ShowObject("menuPuay2","slideInRight",14);
$scope.ShowObject("ImgResult3","flipInX",14);
};
if ($App.fs_puay == 2 || $App.fs_puay == 3) {
$scope.HideObject("menuPuay1","slideOutRight",14);
$scope.ShowObject("menuPuay2","slideInRight",14);
$scope.ShowObject("ImgResult1","flipInX",14);
};
if ($App.fs_puay == 4) {
$scope.HideObject("menuPuay1","slideOutRight",14);
$scope.ShowObject("menuPuay2","slideInRight",14);
$scope.ShowObject("ImgResult2","flipInX",14);
};};
$scope.menu_pageexit = function() {$scope.HideObject("SVGicon2","pulse",14);
$scope.ShowObject("SVGicon1","",0);
$scope.HideObject("ImgIam","fadeOutRight",0);};
$scope.fsticks_pageenter = function() {$scope.OnlineStatus();
$scope.ShowObject("SVGicon1","",0);
$scope.PlaySound("media/voice_2636.mp3",false);
$App.fs_status = "ready";
$App.fs_stick = "";
$scope.StopSound("voice_2636.mp3");};
$scope.puay_pageenter = function() {$scope.OnlineStatus();
$scope.ShowObject("SVGicon1","",0);
$App.fs_status = "ready";
if ($App.fs_stick == "") {
$scope.HideObject("PushButton4","",0);
} else {
$scope.ShowObject("PushButton4","",0);
};
$scope.PlaySound("media/puay3.mp3",false);
$scope.StopSound("puay3.mp3");
$scope.HideObject("Img4","",0);
$scope.HideObject("Img3","",0);
$scope.HideObject("Img2","",0);
$scope.ShowObject("Img1","",0);};
$scope.SelOracle_pageenter = function() {$scope.OnlineStatus();
$scope.ShowObject("SVGicon1","",0);};
$scope.FAQ_pageenter = function() {$scope.OnlineStatus();};
$App.NAB.SVGicon1_hidden=true;
$App.NAB.ImgGold_hidden=true;
$App.NAB.ImgRed_hidden=true;
$App.NAB.ImgGreen_hidden=true;
$App.NAB.ImgWhite_hidden=true;
$App.NAB.PBfsNum_hidden=true;
$App.NAB.ImgResult1_hidden=true;
$App.NAB.ImgResult2_hidden=true;
$App.NAB.ImgResult3_hidden=true;
$App.NAB.menuPuay2_hidden=true;
$App.NAB.menuFS2_hidden=true;
$App.NAB.PushButton4_hidden=true;
$App.NAB.Container6_hidden=true;
$App.NAB.Container6_disabled=true;
$App.NAB.Container10_hidden=true;
$App.NAB.Container10_disabled=true;
$App.NAB.SVGzTALK_G_hidden=true;
$App.NAB.SVGicon5G_hidden=true;
$App.NAB.SVGicon8G_hidden=true;
$App.NAB.SVGicon11G_hidden=true;
angular.element(document).ready( function(){
$scope.__init();
});
});NeoApp.controller("App_DlgCtrl",function($scope,$rootScope,$modalInstance,$filter,$window,$animate){$scope.CloseDialog=function(){$modalInstance.close();};$scope.CloseDialogBtn=function(btnNum){$modalInstance.close(btnNum);};});
function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate)func.apply(context,args);};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args);};};NeoApp.directive('timer',function(){return{restrict:'E',replace:false,transclude:false,link:function(scope,element,attributes){if(attributes.autostop){scope.$on('$destroy',function(){scope.$parent.TimerStop(attributes.id);});};if(attributes.autostart)scope.$parent.TimerStart(attributes.id,attributes.interval);}};});NeoApp.directive('slider',['$window',function($window){return{restrict:'E',replace:true,transclude:true,require:'?ngModel',scope:{value:"=ngModel",min:"=",max:"=",disabled:'=ngDisabled',onChange:"&",onChanging:"&"},compile:function(element,attributes){element.addClass('neoapp-slider');var html='';if(attributes.trackimage){html+='<img class="track-img" src="'+attributes.trackimage+'"';if(attributes.trackheight)html+=' style="height:'+attributes.trackheight+'"';html+='/>';}else{html+='<div class="track"';if(attributes.trackheight)html+=' style="height:'+attributes.trackheight+'"';html+='><div class="track-left';if(attributes.kind)html+=' track-left-'+attributes.kind;html+='"></div>';};html+='</div><button class="thumb';if(attributes.thumbimage)html+=' thumb-img';if(attributes.kind)html+=' thumb-'+attributes.kind;html+='"';if(attributes.thumbwidth||attributes.thumbimage){html+=' style="';if(attributes.thumbwidth)html+='width:'+attributes.thumbwidth;if(attributes.thumbwidth&&attributes.thumbimage)html+=';';if(attributes.thumbimage)html+="background-image:url('"+attributes.thumbimage+"')";html+='"';};html+=' ng-style="NAB.'+attributes.id+'_style"';html+=' ng-transclude></button>';element.html(html);return linkFn;}};function linkFn($scope,element,attributes,ngModel){var mouseDown=false,track=attributes.trackimage?element.find('.track-img'):element.find('.track'),thumb=element.find('.thumb'),trackLeft=element.find('.track-left'),elemLeft,vMin=isNaN(parseFloat($scope.min))?0:parseFloat($scope.min),vMax=isNaN(parseFloat($scope.max))?100:parseFloat($scope.max),xOffs,dbOnChanging=($scope.onChanging)?debounce(function(){$scope.onChanging();},100):null;if(vMax<=vMin)vMax=vMin+1;var value=isNaN(parseFloat($scope.value))?vMin:parseFloat($scope.value);function positionThumb(){var basePos=((value-vMin)/(vMax-vMin))*(track.width()-thumb.innerWidth());thumb.css('left',basePos);if(trackLeft)trackLeft.css('width',basePos);};function updateValue(){if(ngModel&&!isNaN(parseFloat($scope.value))){var v=$scope.value;value=Math.max(vMin,Math.min(Math.floor(v),vMax));$scope.value=value;}else{value=Math.max(vMin,Math.min(Math.floor(value),vMax));};positionThumb();};function mouseCoords(event){if(event.type=='touchstart'||event.type=='touchmove'||event.type=='touchend'||event.type=='touchcancel'){var touch=event.originalEvent.touches[0]||event.originalEvent.changedTouches[0];return{x:touch.pageX,y:touch.pageY};}else{return{x:event.pageX,y:event.pageY};};};thumb.on('mousedown touchstart',function(event){if(!element.attr('disabled')){mouseDown=true;elemLeft=element.position().left;xOffs=mouseCoords(event).x-thumb.position().left-elemLeft;$(document).one('mouseup touchend ontouchcancel',function(event){if($scope.onChange)$scope.onChange();mouseDown=false;return false;});return false;};});element.on('mousemove touchmove',function(event){if(mouseDown){var xPos=mouseCoords(event).x-elemLeft-xOffs;var v=((xPos/(track.width()-thumb.innerWidth()))*(vMax-vMin))+vMin;v=Math.max(vMin,Math.min(Math.floor(v),vMax));if(value!=v){value=v;positionThumb();if(ngModel){$scope.value=value;if($scope.onChanging)$scope.onChanging();$scope.$apply();};if($scope.onChanging)dbOnChanging();};return false;};});angular.element($window).on('resize.'+element.id,function(){positionThumb();});if(ngModel){$scope.$watch('value',function(){if(!mouseDown){updateValue();};});};if(angular.isObject($scope.max)){$scope.$watch('max',function(){vMax=+$scope.max||100;updateValue();});};if(angular.isObject($scope.min)){$scope.$watch('min',function(){vMin=+$scope.min||0;updateValue();});};$scope.$watch('disabled',function(newVal){element.find('*').attr('disabled',newVal||false);});$scope.$on('$destroy',function(){angular.element($window).off('resize.'+element.id);});};}]);
NeoApp.controller("start_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 1;
$App.NAB.PageID = "start";
$scope.PushGold_click = function() {$App.mSel = "gold";
$scope.ShowObject("ImgGold","",0);
$scope.HideObject("ImgRed","",0);
$scope.HideObject("ImgGreen","",0);
$scope.HideObject("ImgWhite","",0);
$scope.GotoPage( "menu" );};
$scope.PushRed_click = function() {$App.mSel = "red";
$scope.ShowObject("ImgRed","",0);
$scope.HideObject("ImgGold","",0);
$scope.HideObject("ImgGreen","",0);
$scope.HideObject("ImgWhite","",0);
$scope.GotoPage( "menu" );};
$scope.PushGreen_click = function() {$App.mSel = "green";
$scope.ShowObject("ImgGreen","",0);
$scope.HideObject("ImgRed","",0);
$scope.HideObject("ImgGold","",0);
$scope.HideObject("ImgWhite","",0);
$scope.GotoPage( "menu" );};
$scope.PushWhite_click = function() {$App.mSel = "white";
$scope.ShowObject("ImgWhite","",0);
$scope.HideObject("ImgRed","",0);
$scope.HideObject("ImgGreen","",0);
$scope.HideObject("ImgGold","",0);
$scope.GotoPage( "menu" );};
});
NeoApp.controller("menu_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 2;
$App.NAB.PageID = "menu";
$scope.menuPuay1_click = function() {$scope.HideObject("ImgPuay1","",0);
$scope.HideObject("ImgPuay2","",0);
$scope.HideObject("ImgPuay3","",0);
$App.fs_puay = 1;
$App.puayCount = 0;
$scope.GotoPage( "puay" );};
$scope.menuFC1_click = function() {if ($App.fs_stick != "") {
$scope.HideObject("SVGzTALK_G","",0);
$scope.ShowObject("SVGzTALK","",0);
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 1) {
$App.oracle = $App.ora1;
};
if ($App.fs_stick == 2) {
$App.oracle = $App.ora2;
};
if ($App.fs_stick == 3) {
$App.oracle = $App.ora3;
};
if ($App.fs_stick == 4) {
$App.oracle = $App.ora4;
};
if ($App.fs_stick == 5) {
$App.oracle = $App.ora5;
};
if ($App.fs_stick == 6) {
$App.oracle = $App.ora6;
};
if ($App.fs_stick == 7) {
$App.oracle = $App.ora7;
};
if ($App.fs_stick == 8) {
$App.oracle = $App.ora8;
};
if ($App.fs_stick == 9) {
$App.oracle = $App.ora9;
};
if ($App.fs_stick == 10) {
$App.oracle = $App.ora10;
};
if ($App.fs_stick == 11) {
$App.oracle = $App.ora11;
};
if ($App.fs_stick == 12) {
$App.oracle = $App.ora12;
};
if ($App.fs_stick == 13) {
$App.oracle = $App.ora13;
};
if ($App.fs_stick == 14) {
$App.oracle = $App.ora14;
};
if ($App.fs_stick == 15) {
$App.oracle = $App.ora15;
};
if ($App.fs_stick == 16) {
$App.oracle = $App.ora16;
};
if ($App.fs_stick == 17) {
$App.oracle = $App.ora17;
};
if ($App.fs_stick == 18) {
$App.oracle = $App.ora18;
};
if ($App.fs_stick == 19) {
$App.oracle = $App.ora19;
};
if ($App.fs_stick == 20) {
$App.oracle = $App.ora20;
};
if ($App.fs_stick == 21) {
$App.oracle = $App.ora21;
};
if ($App.fs_stick == 22) {
$App.oracle = $App.ora22;
};
if ($App.fs_stick == 23) {
$App.oracle = $App.ora23;
};
if ($App.fs_stick == 24) {
$App.oracle = $App.ora24;
};
if ($App.fs_stick == 25) {
$App.oracle = $App.ora25;
};
if ($App.fs_stick == 26) {
$App.oracle = $App.ora26;
};
if ($App.fs_stick == 27) {
$App.oracle = $App.ora27;
};
if ($App.fs_stick == 28) {
$App.oracle = $App.ora28;
};
if ($App.mSel == "gold") {
$scope.OpenDialog( "DiaFSgold" );
} else if ($App.mSel == "red") {
$scope.OpenDialog( "DiaFSred" );
} else if ($App.mSel == "green") {
$scope.OpenDialog( "DiaFSgreen" );
} else {
$scope.OpenDialog( "DiaFSwhite" );
};
} else {
$scope.GotoPage( "SelOracle" );
};};
$scope.PBfsNum_click = function() {$App.fs_stick = "";
$scope.HideObject("PBfsNum","",0);
$scope.HideObject("menuFS2","slideOutRight",14);
$scope.ShowObject("menuFS1","slideInRight",14);};
$scope.ImgResult1_click = function() {$scope.HideObject("ImgResult1","",0);
$scope.HideObject("ImgResult2","",0);
$scope.HideObject("ImgResult3","",0);
$scope.HideObject("menuPuay2","slideOutRight",14);
$scope.ShowObject("menuPuay1","slideInRight",14);};
$scope.ImgResult2_click = function() {$scope.HideObject("ImgResult1","",0);
$scope.HideObject("ImgResult2","",0);
$scope.HideObject("ImgResult3","",0);
$scope.HideObject("menuPuay2","slideOutRight",14);
$scope.ShowObject("menuPuay1","slideInRight",14);};
$scope.ImgResult3_click = function() {$scope.HideObject("ImgResult1","",0);
$scope.HideObject("ImgResult2","",0);
$scope.HideObject("ImgResult3","",0);
$scope.HideObject("menuPuay2","slideOutRight",14);
$scope.ShowObject("menuPuay1","slideInRight",14);};
$scope.menuFS1_click = function() {$App.fs_puay = 0;
$scope.HideObject("ImgPuay1","",0);
$scope.HideObject("ImgPuay2","",0);
$scope.HideObject("ImgPuay3","",0);
$scope.HideObject("ImgResult1","flipInX",14);
$scope.HideObject("ImgResult2","flipInX",14);
$scope.HideObject("ImgResult3","flipInX",14);
$scope.HideObject("menuPuay2","slideOutRight",14);
$scope.ShowObject("menuPuay1","slideInRight",14);
$scope.GotoPage( "fsticks" );};
$scope.menuPuay2_click = function() {$scope.HideObject("ImgPuay1","",0);
$scope.HideObject("ImgPuay2","",0);
$scope.HideObject("ImgPuay3","",0);
$App.fs_puay = 1;
$App.puayCount = 0;
$scope.GotoPage( "puay" );};
$scope.menuFS2_click = function() {$App.fs_puay = 0;
$scope.HideObject("ImgPuay1","",0);
$scope.HideObject("ImgPuay2","",0);
$scope.HideObject("ImgPuay3","",0);
$scope.HideObject("ImgResult1","flipInX",14);
$scope.HideObject("ImgResult2","flipInX",14);
$scope.HideObject("ImgResult3","flipInX",14);
$scope.HideObject("menuPuay2","slideOutRight",14);
$scope.ShowObject("menuPuay1","slideInRight",14);
$scope.GotoPage( "fsticks" );};
$scope.ImgIam_click = function() {$scope.OpenDialog( "Dona" );};
$scope.SVGicon2_click = function() {$scope.GotoPage( "FAQ" );};
});
NeoApp.controller("fsticks_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 3;
$App.NAB.PageID = "fsticks";
$scope.Image1_click = function() {if ($App.fs_status == "shaking") {
$App.fs_status = "stop";
$scope.ShowObject("Image2","",0);
$scope.HideObject("Image1","",0);
$scope.StopSound("voice_2636.mp3");
$App.fs_sound = 0;
$App.fs_status = "ready";
$App.fs_stick = "";
$App.fs_puay = 0;
$App.fs_stick = RandomInt(1,28);
$timeout(function() {
$scope.GotoPage( "menu" );
},1000);
};};
$scope.Image2_click = function() {if ($App.fs_status == "ready") {
$scope.PlaySound("media/voice_2636.mp3",true);
$App.fs_sound = 1;
$App.fs_status = "shaking";
$scope.ShowObject("Image1","",0);
$scope.HideObject("Image2","",0);
neoDeviceVibrate(1000);
};};
$scope.Image2_dblclick = function() {if ($App.fs_vdo == "false") {
$scope.PlaySound("media/voice_2636.mp3",true);
$App.fs_vdo = "true";
$scope.HideObject("Container1","shake",14);
$scope.ShowObject("Container1","shake",14);
$scope.ShowObject("Image1","",0);
$scope.HideObject("Image2","",0);
} else {
$App.fs_vdo = "false";
$scope.ShowObject("Image2","",0);
$scope.HideObject("Image1","",0);
$scope.StopSound("voice_2636.mp3");
$App.fs_stick = "";
$App.fs_stick = RandomInt(1,32);
$timeout(function() {
$scope.GotoPage( "NewPage1" );
},1000);
};};
});
NeoApp.controller("puay_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 4;
$App.NAB.PageID = "puay";
$scope.Img4_click = function() {$scope.ClickPuay();};
$scope.Img3_click = function() {$scope.ClickPuay();};
$scope.Img2_click = function() {$scope.ClickPuay();};
$scope.Img1_click = function() {$scope.ClickPuay();};
$scope.PushButton4_click = function() {$scope.GotoPage( "menu" );};
});
NeoApp.controller("SelOracle_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 5;
$App.NAB.PageID = "SelOracle";
$scope.OraBtn1_click = function() {$App.ora_num = 1;
$App.oracle = $App.ora1;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn2_click = function() {$App.ora_num = 2;
$App.oracle = $App.ora2;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn3_click = function() {$App.ora_num = 3;
$App.oracle = $App.ora3;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn4_click = function() {$App.ora_num = 4;
$App.oracle = $App.ora4;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn5_click = function() {$App.ora_num = 5;
$App.oracle = $App.ora5;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn6_click = function() {$App.ora_num = 6;
$App.oracle = $App.ora6;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn7_click = function() {$App.ora_num = 7;
$App.oracle = $App.ora7;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn8_click = function() {$App.ora_num = 8;
$App.oracle = $App.ora8;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn9_click = function() {$App.ora_num = 9;
$App.oracle = $App.ora9;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn10_click = function() {$App.ora_num = 10;
$App.oracle = $App.ora10;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn11_click = function() {$App.ora_num = 11;
$App.oracle = $App.ora11;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn12_click = function() {$App.ora_num = 12;
$App.oracle = $App.ora12;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn19_click = function() {$App.ora_num = 19;
$App.oracle = $App.ora19;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn20_click = function() {$App.ora_num = 20;
$App.oracle = $App.ora20;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn21_click = function() {$App.ora_num = 21;
$App.oracle = $App.ora21;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn22_click = function() {$App.ora_num = 22;
$App.oracle = $App.ora22;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn23_click = function() {$App.ora_num = 23;
$App.oracle = $App.ora23;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn24_click = function() {$App.ora_num = 24;
$App.oracle = $App.ora24;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn13_click = function() {$App.ora_num = 13;
$App.oracle = $App.ora13;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn14_click = function() {$App.ora_num = 14;
$App.oracle = $App.ora14;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn15_click = function() {$App.ora_num = 15;
$App.oracle = $App.ora15;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn16_click = function() {$App.ora_num = 16;
$App.oracle = $App.ora16;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn17_click = function() {$App.ora_num = 17;
$App.oracle = $App.ora17;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn18_click = function() {$App.ora_num = 18;
$App.oracle = $App.ora18;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn25_click = function() {$App.ora_num = 25;
$App.oracle = $App.ora25;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn26_click = function() {$App.ora_num = 26;
$App.oracle = $App.ora26;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn27_click = function() {$App.ora_num = 27;
$App.oracle = $App.ora27;
$scope.OpenDialog( "DiaFS2" );};
$scope.OraBtn28_click = function() {$App.ora_num = 28;
$App.oracle = $App.ora28;
$scope.OpenDialog( "DiaFS2" );};
});
NeoApp.controller("FAQ_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 6;
$App.NAB.PageID = "FAQ";
$scope.SVGiconQRShare_click = function() {$scope.OpenDialog( "DiaShare" );};
$scope.PBdetail_click = function() {$scope.OpenDialog( "Dona" );};
});
NeoApp.controller("DiaFSgold_Ctrl", function($scope,$rootScope,$modalInstance,$filter,$window) {
 $scope.CloseDialog = function() {
  $modalInstance.close();
 };
$scope.SVGexit_click = function() {$App.zTALK = 0;
$scope.HideObject("SVGzTALK_G","",0);
$scope.ShowObject("SVGzTALK","",0);
$scope.zTALKstop();
$scope.CloseDialog();};
$scope.SVGzTALK_click = function() {if ($App.zTALK == 1) {
$App.zTALK = 0;
$scope.HideObject("SVGzTALK_G","",0);
$scope.ShowObject("SVGzTALK","",0);
$scope.zTALKstop();
} else {
$App.zTALK = 1;
$scope.HideObject("SVGzTALK","",0);
$scope.ShowObject("SVGzTALK_G","",0);
$scope.zTALK();
};};
$scope.SVGzTALK_G_click = function() {if ($App.zTALK == 1) {
$App.zTALK = 0;
$scope.HideObject("SVGzTALK_G","",0);
$scope.ShowObject("SVGzTALK","",0);
$scope.zTALKstop();
} else {
$App.zTALK = 1;
$scope.HideObject("SVGzTALK","",0);
$scope.ShowObject("SVGzTALK_G","",0);
$scope.zTALK();
};};
$scope.DiaFSpic_click = function() {$App.zTALK = 0;
$scope.HideObject("SVGzTALK_G","",0);
$scope.ShowObject("SVGzTALK","",0);
$scope.zTALKstop();
$scope.OpenDialog( "Dona" );};
});
NeoApp.controller("DiaFSred_Ctrl", function($scope,$rootScope,$modalInstance,$filter,$window) {
 $scope.CloseDialog = function() {
  $modalInstance.close();
 };
$scope.SVGicon3_click = function() {$App.zTALK = 0;
$scope.HideObject("SVGicon5G","",0);
$scope.ShowObject("SVGicon4","",0);
$scope.zTALKstop();
$scope.CloseDialog();};
$scope.SVGicon4_click = function() {if ($App.zTALK == 1) {
$App.zTALK = 0;
$scope.HideObject("SVGicon5G","",0);
$scope.ShowObject("SVGicon4","",0);
$scope.zTALKstop();
} else {
$App.zTALK = 1;
$scope.HideObject("SVGicon4","",0);
$scope.ShowObject("SVGicon5G","",0);
$scope.zTALK();
};};
$scope.SVGicon5G_click = function() {if ($App.zTALK == 1) {
$App.zTALK = 0;
$scope.HideObject("SVGicon5G","",0);
$scope.ShowObject("SVGicon4","",0);
$scope.zTALKstop();
} else {
$App.zTALK = 1;
$scope.HideObject("SVGicon4","",0);
$scope.ShowObject("SVGicon5G","",0);
$scope.zTALK();
};};
$scope.Image12_click = function() {$App.zTALK = 0;
$scope.HideObject("SVGzTALK_G","",0);
$scope.ShowObject("SVGzTALK","",0);
$scope.zTALKstop();
$scope.OpenDialog( "Dona" );};
});
NeoApp.controller("DiaFSgreen_Ctrl", function($scope,$rootScope,$modalInstance,$filter,$window) {
 $scope.CloseDialog = function() {
  $modalInstance.close();
 };
$scope.SVGicon6_click = function() {$App.zTALK = 0;
$scope.HideObject("SVGicon8G","",0);
$scope.ShowObject("SVGicon7","",0);
$scope.zTALKstop();
$scope.CloseDialog();};
$scope.SVGicon7_click = function() {if ($App.zTALK == 1) {
$App.zTALK = 0;
$scope.HideObject("SVGicon8G","",0);
$scope.ShowObject("SVGicon7","",0);
$scope.zTALKstop();
} else {
$App.zTALK = 1;
$scope.HideObject("SVGicon7","",0);
$scope.ShowObject("SVGicon8G","",0);
$scope.zTALK();
};};
$scope.SVGicon8G_click = function() {if ($App.zTALK == 1) {
$App.zTALK = 0;
$scope.HideObject("SVGicon8G","",0);
$scope.ShowObject("SVGicon7","",0);
$scope.zTALKstop();
} else {
$App.zTALK = 1;
$scope.HideObject("SVGicon7","",0);
$scope.ShowObject("SVGicon8G","",0);
$scope.zTALK();
};};
$scope.Image14_click = function() {$App.zTALK = 0;
$scope.HideObject("SVGzTALK_G","",0);
$scope.ShowObject("SVGzTALK","",0);
$scope.zTALKstop();
$scope.OpenDialog( "Dona" );};
});
NeoApp.controller("DiaFSwhite_Ctrl", function($scope,$rootScope,$modalInstance,$filter,$window) {
 $scope.CloseDialog = function() {
  $modalInstance.close();
 };
$scope.SVGicon9_click = function() {$App.zTALK = 0;
$scope.HideObject("SVGicon11G","",0);
$scope.ShowObject("SVGicon10","",0);
$scope.zTALKstop();
$scope.CloseDialog();};
$scope.SVGicon10_click = function() {if ($App.zTALK == 1) {
$App.zTALK = 0;
$scope.HideObject("SVGicon11G","",0);
$scope.ShowObject("SVGicon10","",0);
$scope.zTALKstop();
} else {
$App.zTALK = 1;
$scope.HideObject("SVGicon10","",0);
$scope.ShowObject("SVGicon11G","",0);
$scope.zTALK();
};};
$scope.SVGicon11G_click = function() {if ($App.zTALK == 1) {
$App.zTALK = 0;
$scope.HideObject("SVGicon11G","",0);
$scope.ShowObject("SVGicon10","",0);
$scope.zTALKstop();
} else {
$App.zTALK = 1;
$scope.HideObject("SVGicon10","",0);
$scope.ShowObject("SVGicon11G","",0);
$scope.zTALK();
};};
$scope.Image16_click = function() {$App.zTALK = 0;
$scope.HideObject("SVGzTALK_G","",0);
$scope.ShowObject("SVGzTALK","",0);
$scope.zTALKstop();
$scope.OpenDialog( "Dona" );};
});
NeoApp.controller("DiaFS2_Ctrl", function($scope,$rootScope,$modalInstance,$filter,$window) {
 $scope.CloseDialog = function() {
  $modalInstance.close();
 };
$scope.Ora_SVGicon2_click = function() {$scope.CloseDialog();};
});
NeoApp.controller("Dona_Ctrl", function($scope,$rootScope,$modalInstance,$filter,$window) {
 $scope.CloseDialog = function() {
  $modalInstance.close();
 };
$scope.SVGexit2_click = function() {$scope.CloseDialog();};
$scope.Image8_click = function() {window.open("https://www.buymeacoffee.com/zuma.ranger", "_blank");};
$scope.ImgLINE_click = function() {window.open("https://line.me/ti/p/6fRe0G8bq4", "_blank");};
$scope.Image17_click = function() {window.open("mailto:zuma.ranger@gmail.com", "_blank");};
$scope.Image18_click = function() {window.open("tel:0918072601", "_blank");};
});
NeoApp.controller("DiaShare_Ctrl", function($scope,$rootScope,$modalInstance,$filter,$window) {
 $scope.CloseDialog = function() {
  $modalInstance.close();
 };
$scope.Image9_click = function() {$scope.CloseDialog();};
});
function slParseInt(cadena){return parseInt(cadena);}function slParseFloat(cadena){return parseFloat(cadena);}function slTalk(texto,lang){if('speechSynthesis'in window){var speech=new SpeechSynthesisUtterance(texto);if(lang==""){speech.lang=lang;}else{speech.lang='en-US';}window.speechSynthesis.speak(speech);}}function slSubmitForm(formulario,url){var neoApp=angular.element(document.getElementById("ng-view")).scope();neoApp.SubmitForm(formulario,url,'POST',neoApp.Form1_submit,neoApp.Form1_success,neoApp.Form1_fail);}function slCenterApp(ancho,alto){$("body").css("width",ancho+"px");$("body").css("height",alto+"px");$("body").css("position","absolute");$("body").css("top","0px");$("body").css("bottom","0px");$("body").css("left","0px");$("body").css("right","0px");$("body").css("margin","auto");}function slAppBackgroundColor(color){$("body").css("background-color",color);}function slAppBackgroundImage(url){$("body").css("background-image","url('"+url+"')");$("body").css("background-repeat","no-repeat");$("body").css("background-size","cover");}function slPageRoundedCorners(page,radius){$("#"+page).css("border-radius",radius+"px");}function slPageShadow(page,horizontal,vertical,theblur,thecolor){$("#"+page).css("box-shadow",horizontal+"px "+vertical+"px "+theblur+"px "+thecolor);}function slPageSetZoom(page,thezoom){$("#"+page).css("transform","scale("+thezoom+","+thezoom+")");}function slAppSetZoom(thezoom){$("html").css("transform-origin","0 0");$("html").css("transform","scale("+thezoom+","+thezoom+")");}function slAppSetZoom2(thezoom){$("html").css("transform-origin","50% 50%");$("html").css("transform","scale("+thezoom+","+thezoom+")");}function slPageSetRotation(page,angle){$("#"+page).css("transform","rotate("+angle+"deg)");}function slScaleAppFitWidthTop(ancho,alto){factor1=window.innerWidth/ancho;slCenterAppTop3(ancho,alto,factor1);slAppSetZoom(factor1);window.onresize=function(){factor1=window.innerWidth/ancho;slCenterAppTop3(ancho,alto,factor1);slAppSetZoom(factor1);}}function slScaleAppFitWidth(ancho,alto){factor1=window.innerWidth/ancho;slCenterAppTop(ancho,alto,factor1);slAppSetZoom(factor1);window.onresize=function(){factor1=window.innerWidth/ancho;slCenterAppTop(ancho,alto,factor1);slAppSetZoom(factor1);}}function slScaleAppFitHeight(ancho,alto){factor1=window.innerHeight/alto;slCenterAppTop2(ancho,alto,factor1);slAppSetZoom(factor1);window.onresize=function(){factor1=window.innerHeight/alto;slCenterAppTop2(ancho,alto,factor1);slAppSetZoom(factor1);}}function slScaleAppFit(ancho,alto){factor1=window.innerHeight/alto;factor2=window.innerWidth/ancho;if(factor1<factor2){slCenterAppTop2(ancho,alto,factor1);slAppSetZoom(factor1);}else{slCenterAppTop(ancho,alto,factor2);slAppSetZoom(factor2);}window.onresize=function(){factor1=window.innerHeight/alto;factor2=window.innerWidth/ancho;if(factor1<factor2){slCenterAppTop2(ancho,alto,factor1);slAppSetZoom(factor1);}else{slCenterAppTop(ancho,alto,factor2);slAppSetZoom(factor2);}}}function slCenterAppTop(ancho,alto,factor){altura=parseInt((alto*factor)/2);posicion=(window.innerHeight/2)-altura;$("html").css("width",ancho+"px");$("html").css("height",alto+"px");$("html").css("position","absolute");$("html").css("top",posicion+"px");$("html").css("left","0px");$("html").css("margin","0px");$("html").css("overflow-x","hidden");$("html").css("overflow-y","auto");}function slCenterAppTop2(ancho,alto,factor){anchura=parseInt((ancho*factor)/2);posicion=(window.innerWidth/2)-anchura;$("html").css("width",ancho+"px");$("html").css("height",alto+"px");$("html").css("position","absolute");$("html").css("top","0px");$("html").css("bottom","0px");$("html").css("left",posicion+"px");$("html").css("margin","0px");$("html").css("overflow-x","hidden");$("html").css("overflow-y","auto");}function slCenterAppTop3(ancho,alto,factor){altura=parseInt((alto*factor)/2);posicion=(window.innerHeight/2)-altura;$("html").css("width",ancho+"px");$("html").css("height",alto+"px");$("html").css("position","absolute");$("html").css("top","0px");$("html").css("left","0px");$("html").css("margin","0px");$("html").css("overflow-x","hidden");$("html").css("overflow-y","auto");}function slScaleAppLetterBox(ancho,alto){factor1=window.innerHeight/alto;factor2=window.innerWidth/ancho;if(factor1<factor2){slCenterAppTop2(ancho,alto,factor1);slAppSetZoom(factor1);}else{slCenterAppTop(ancho,alto,factor2);slAppSetZoom(factor2);}window.onresize=function(){factor1=window.innerHeight/alto;factor2=window.innerWidth/ancho;if(factor1<factor2){slCenterAppTop2(ancho,alto,factor1);slAppSetZoom(factor1);}else{slCenterAppTop(ancho,alto,factor2);slAppSetZoom(factor2);}}}function slScaleAppLetterBoxMax(ancho,alto){factor1=window.innerHeight/alto;factor2=window.innerWidth/ancho;if(factor1<factor2){if(factor1>1){factor1=1;slCenterApp(ancho,alto);}else{slCenterAppTop2(ancho,alto,factor1);}slAppSetZoom(factor1);}else{if(factor2>1){factor2=1;slCenterApp(ancho,alto);}else{slCenterAppTop(ancho,alto,factor2);}slAppSetZoom(factor2);}window.onresize=function(){factor1=window.innerHeight/alto;factor2=window.innerWidth/ancho;if(factor1<factor2){if(factor1>1){factor1=1;slCenterApp(ancho,alto);}else{slCenterAppTop2(ancho,alto,factor1);}slAppSetZoom(factor1);}else{if(factor2>1){factor2=1;slCenterApp(ancho,alto);}else{slCenterAppTop(ancho,alto,factor2);}slAppSetZoom(factor2);}}}function slScaleAppDeform(ancho,alto){slCenterApp(ancho,alto);factor1=window.innerWidth/ancho;factor2=window.innerHeight/alto;$("html").css("transform-origin","0% 0%");$("html").css("transform","scale("+factor1+","+factor2+")");$("html").css("width",ancho+"px");$("html").css("height",alto+"px");$("html").css("position","absolute");$("html").css("top","0px");$("html").css("left","0px");$("html").css("margin","0px");$("html").css("overflow-x","hidden");$("html").css("overflow-y","auto");window.onresize=function(){factor1=window.innerWidth/ancho;factor2=window.innerHeight/alto;$("html").css("transform","scale("+factor1+","+factor2+")");$("html").css("width",ancho+"px");$("html").css("height",alto+"px");$("html").css("position","absolute");$("html").css("top","0px");$("html").css("left","0px");$("html").css("margin","0px");$("html").css("overflow-x","hidden");$("html").css("overflow-y","auto");}}function slScaleAppOriginalSize(ancho,alto){slCenterApp(ancho,alto);factor1=1;factor2=1;$("html").css("transform-origin","50% 50%");$("html").css("transform","scale("+factor1+","+factor2+")");window.onresize=function(){factor1=1;factor2=1;$("html").css("transform","scale("+factor1+","+factor2+")");}}function slRequestFullScreen(){var body=document.documentElement;if(body.requestFullscreen){body.requestFullscreen();}else if(body.webkitrequestFullscreen){body.webkitrequestFullscreen();}else if(body.mozrequestFullscreen){body.mozrequestFullscreen();}else if(body.msrequestFullscreen){body.msrequestFullscreen();}}function slChangeInputType(inputObject,newType,initValue){var oldInput=$("#"+inputObject);var newInput=oldInput.clone();newInput.attr("type",newType);newInput.attr("value",initValue);newInput.attr("id","new"+inputObject);newInput.insertBefore(oldInput);oldInput.remove();newInput.attr("id",inputObject);}function slInputTypeRange(inputObject,minValue,maxValue){newType="range";var oldInput=$("#"+inputObject);var newInput=oldInput.clone();newInput.attr("type",newType);newInput.attr("min",minValue);newInput.attr("max",maxValue);newInput.attr("value",minValue);newInput.attr("id","new"+inputObject);newInput.insertBefore(oldInput);oldInput.remove();newInput.attr("id",inputObject);}function slChangeMetaViewport(newMeta){$('head').remove('<meta name="viewport" content="width=device-width, initial-scale=1"/>');$('head').append(newMeta);}function slLoadJS(url){$.getScript(url);}function slLoadCSS(url){$('<link rel="stylesheet" type="text/css" href="'+url+'" >').appendTo("head");}function slLoadHTML(containerId,url){$("#"+containerId).load(url);}function slSetHTMLCode(containerId,code){$("#"+containerId).html(code);}function slGetHTMLCode(containerId){var mivar=$("#"+containerId).html();return mivar;}function slSetCSSProperty(containerId,property,propertyValue){$("#"+containerId).css(property,propertyValue);}function slLoadGoogleFont(fontName){$("head").append("<link href='https://fonts.googleapis.com/css?family="+fontName+"' rel='stylesheet' type='text/css'>");}function slOpenModal(containerId){$("#"+containerId).addClass("modal");$("#"+containerId).addClass("fade");NeoApp=angular.element(document.getElementById("ng-view")).scope();NeoApp.ShowObject(containerId,"",0);$("#"+containerId).modal("show");}function slCloseModal(containerId){$("#"+containerId).modal("hide");NeoApp=angular.element(document.getElementById("ng-view")).scope();setTimeout(function(){NeoApp.HideObject(containerId,"",0);},200);}function slFixBootStrapTabs(){$('.nav-tabs a').click(function(e){e.preventDefault();$(this).tab('show');});}function slInitTabs(containerId){initialHTML=$('#'+containerId).html();$('#'+containerId).html("<ul style='display:none' class='nav nav-tabs'><li><a data-toggle='tab' href='#tab1'></a></li><li><a data-toggle='tab' href='#tab2'></a></li><li><a data-toggle='tab' href='#tab3'></a></li><li><a data-toggle='tab' href='#tab4'></a></li><li><a data-toggle='tab' href='#tab5'></a></li><li><a data-toggle='tab' href='#tab6'></a></li><li><a data-toggle='tab' href='#tab7'></a></li><li><a data-toggle='tab' href='#tab8'></a></li><li><a data-toggle='tab' href='#tab9'></a></li><li><a data-toggle='tab' href='#tab10'></a></li></ul><div id='"+containerId+"tabs'>"+initialHTML+"</div>");$("#"+containerId+'tabs').addClass("tab-content");$("#"+containerId+'tabs').find('div').addClass("tab-pane");$("#"+containerId+'tabs').find('div').addClass("fade");slFixBootStrapTabs();}function slShowTab(containerId){$('.nav-tabs a[href="#'+containerId+'"]').tab('show');}
function neoGoogleFonts(theFonts){fontsArray=theFonts.split("::");WebFont.load({google:{families:fontsArray}});}
function neoDeviceVibrate(milliseconds){navigator.vibrate(milliseconds);};function neoDeviceGetInfo(deviceType,deviceOS,deviceOrientation,theBrowserName){if(device.desktop()){$App[deviceType]="Desktop";}else if(device.mobile()){$App[deviceType]="Mobile";}else if(device.tablet()){$App[deviceType]="Tablet";}else{$App[deviceType]="Unknow";};if(device.ios()){$App[deviceOS]="iOS";}else if(device.android()){$App[deviceOS]="Android";}else if(device.blackberry()){$App[deviceOS]="BlackBerry";}else if(device.television()){$App[deviceOS]="Television";}else if(device.windows()){$App[deviceOS]="Windows";}else if(device.windowsPhone()){$App[deviceOS]="Windows Phone";}else{$App[deviceOS]="Unknow";};if(device.landscape()){$App[deviceOrientation]="Landscape";}else if(device.portrait()){$App[deviceOrientation]="Portrait";}else{$App[deviceOrientation]="Unknow";};$App[theBrowserName]=getBrowserName();};function getBrowserName(){if((window.opr&&window.opr.addons)||window.opera||navigator.userAgent.indexOf(' OPR/')>=0){return'Opera';}if(typeof InstallTrigger!=='undefined'){return'Firefox';}if(/constructor/i.test(window.HTMLElement)||(function(p){return p.toString()==='[object SafariRemoteNotification]';})(!window['safari'])){return'Safari';}if(false||document.documentMode){return'Internet Explorer';}if(!(document.documentMode)&&window.StyleMedia){return'Microsoft Edge';}if(window.chrome){return'Chrome';}return'Unknow';}
function neoGSheetsLoad(gsheets,theArray,sqlquery,subroutine){$App[theArray]=new Array();sheetrock({url:gsheets,query:sqlquery,fetchSize:0,reset:true,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoad error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else{for(n=0;n<response.rows.length;n++){$App[theArray][n]=new Object();for(i=0;i<response.rows[n].cellsArray.length;i++){etiqueta=response.rows[n].labels[i];$App[theArray][n][etiqueta]=response.rows[n].cellsArray[i];}}if(subroutine){subroutine(error,options,response);}}}});};function neoGSheetsLoadColumn(gsheets,theArray,columnLetter,subroutine){$App[theArray]=new Array();columnLetter=columnLetter.toUpperCase();sheetrock({url:gsheets,query:"select "+columnLetter,fetchSize:0,reset:true,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoadColumn error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else{for(n=1;n<response.rows.length;n++){$App[theArray][n-1]=response.rows[n].cellsArray[0];}if(subroutine){subroutine(error,options,response);}}}});};function neoGSheetsLoadCell(gsheets,myVar,columnLetter,rowNumber,subroutine){rowNumber--;columnLetter=columnLetter.toUpperCase();sheetrock({url:gsheets,query:"select "+columnLetter,fetchSize:0,reset:true,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoadCell error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else{$App[myVar]=response.rows[rowNumber].cellsArray[0];if(subroutine){subroutine(error,options,response);}}}});};function neoGSheetsLoadAsTable(objId,gsheets,sqlquery,subroutine){$('#'+objId).html('<table id="'+objId+'neoGSheets" class="table table-striped"></table>');$('#'+objId+'neoGSheets').sheetrock({url:gsheets,fetchSize:0,reset:true,query:sqlquery,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoadAsTable error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else if(subroutine){subroutine(error,options,response);}}});};function neoGSheetsLoadByName(gsheets,theArray,fieldPrefix,sqlquery,subroutine){console.log("neoGSheetsLoadByName - ");sheetrock({url:gsheets,query:"select *",fetchSize:1,reset:true,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoadByName error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else{columnIDStr1="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,";columnIDStr2="AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP,AQ,AR,AS,AT,AU,AV,AW,AX,AY,AZ,";columnIDStr3="BA,BB,BC,BD,BE,BF,BG,BH,BI,BJ,BK,BL,BM,BN,BO,BP,BQ,BR,BS,BT,BU,BV,BW,BX,BY,BZ";columnIDStr=columnIDStr1+columnIDStr2+columnIDStr3;columnIDArray=columnIDStr.split(",");for(i=0;i<response.rows[0].cellsArray.length;i++){columnID=columnIDArray[i];fieldName=response.rows[0].labels[i];console.log("neoGSheetsLoadByName column for field "+fieldName+" is "+columnID);var regexstring=fieldPrefix+fieldName;var regexp=new RegExp(regexstring,"g");sqlquery=sqlquery.replace(regexp,columnID);}console.log("neoGSheetsLoadByName sqlquery: "+sqlquery);neoGSheetsLoad(gsheets,theArray,sqlquery,subroutine);}}});};
