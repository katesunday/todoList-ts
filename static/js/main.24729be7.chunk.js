(this["webpackJsonptodolist-ts"]=this["webpackJsonptodolist-ts"]||[]).push([[0],{55:function(e,t,a){},77:function(e,t,a){e.exports=a(90)},82:function(e,t,a){},90:function(e,t,a){"use strict";a.r(t);var n,l=a(0),i=a.n(l),o=a(22),r=a.n(o),c=(a(82),a(55),a(13)),s=a(127),d=a(133),u=function(e){var t=Object(l.useState)(""),a=Object(c.a)(t,2),n=a[0],o=a[1],r=Object(l.useState)(!1),u=Object(c.a)(r,2),m=u[0],f=u[1],T=m?i.a.createElement("div",{style:{color:"red",fontSize:"14px"}},"Title is required*"):null,p=m?"error":"";return i.a.createElement("div",null,i.a.createElement(s.a,{id:"outlined-basic",label:p,variant:"outlined",value:n,onChange:function(e){o(e.currentTarget.value),f(!1)},onKeyPress:function(t){"Enter"===t.key&&(e.addTask(n),o(""))},className:p,size:"small",error:!!p}),i.a.createElement(d.a,{onClick:function(){var t=n.trim();t?e.addTask(t):f(!0),o("")},variant:"contained",sx:{maxWidth:"40px",maxHeight:"40px",minWidth:"40px",minHeight:"40px"}},"+"),T)},m=function(e){var t=Object(l.useState)(!1),a=Object(c.a)(t,2),n=a[0],o=a[1],r=Object(l.useState)(e.oldTitle),d=Object(c.a)(r,2),u=d[0],m=d[1];return n?i.a.createElement(s.a,{id:"outlined-basic",label:"Outlined",variant:"outlined",value:u,onChange:function(e){m(e.currentTarget.value)},autoFocus:!0,onBlur:function(){e.callBack(u),o(!1)},size:"small"}):i.a.createElement("span",{onClick:function(){o(!0)},className:e.nameOfClass},e.oldTitle)},f=a(134),T=a(124),p=function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("h3",null,i.a.createElement(m,{oldTitle:e.title,nameOfClass:"title",callBack:function(t){e.updateTodoListTitle(e.todolistID,t)}}),i.a.createElement(f.a,{"aria-label":"delete",onClick:function(){e.removeTodoList(e.todolistID)}},i.a.createElement(T.a,null)),i.a.createElement("div",{className:"headerFilter"},e.filter)),i.a.createElement(u,{addTask:function(t){e.addTask(e.todolistID,t)}}))},D=function(e){var t="task ".concat(e.isDone?"completedTask":"");return i.a.createElement("li",null,i.a.createElement("input",{type:"checkbox",onChange:function(t){e.changeTaskStatus(e.todolistID,e.id,t.currentTarget.checked)},checked:e.isDone}),i.a.createElement(m,{oldTitle:e.title,nameOfClass:t,callBack:function(t){return function(t){e.updateTask(e.todolistID,e.id,t)}(t)}}),i.a.createElement(f.a,{"aria-label":"delete",onClick:function(){e.removeTask(e.todolistID,e.id)}},i.a.createElement(T.a,null)))},O=function(e){var t=function(t,a){return function(){e.changeFilter(t,a)}};return i.a.createElement("div",null,i.a.createElement(d.a,{variant:"all"===e.filter?"outlined":"contained",color:"secondary",onClick:t(e.todolistID,"all")},"All"),i.a.createElement(d.a,{variant:"active"===e.filter?"outlined":"contained",color:"success",onClick:t(e.todolistID,"active")},"Active"),i.a.createElement(d.a,{variant:"completed"===e.filter?"outlined":"contained",color:"error",onClick:t(e.todolistID,"completed")},"Completed"))},E=function(e){var t=e.tasks.map((function(t){return i.a.createElement(D,Object.assign({key:t.id},t,{removeTask:e.removeTask,changeTaskStatus:e.changeTaskStatus,todolistID:e.todolistID,updateTask:e.updateTask}))})),a=i.a.createElement("span",{style:{fontSize:"14px"}},"Task list is empty. Change filter or add task."),n=t.length?i.a.createElement("ul",null,t):a;return i.a.createElement(i.a.Fragment,null,n,i.a.createElement(O,{changeFilter:e.changeFilter,filter:e.filter,todolistID:e.todolistID}))},b=function(e){return i.a.createElement("div",{className:"App"},i.a.createElement("div",null,i.a.createElement(p,{title:e.title,addTask:e.addTask,filter:e.filter,todolistID:e.todolistID,updateTodoListTitle:e.updateTodoListTitle,removeTodoList:e.removeTodoList}),i.a.createElement(E,{tasks:e.tasks,removeTask:e.removeTask,changeFilter:e.changeFilter,filter:e.filter,changeTaskStatus:e.changeTaskStatus,todolistID:e.todolistID,updateTask:e.updateTask})))},k=a(129),v=a(16),I=a(14),j=a(4),y=Object(k.a)(),h=Object(k.a)(),g=(n={},Object(j.a)(n,y,[{id:Object(k.a)(),title:"HTML&CSS",isDone:!0},{id:Object(k.a)(),title:"JS",isDone:!0},{id:Object(k.a)(),title:"ReactJS",isDone:!1},{id:Object(k.a)(),title:"Rest API",isDone:!1},{id:Object(k.a)(),title:"GraphQL",isDone:!1}]),Object(j.a)(n,h,[{id:Object(k.a)(),title:"Milk",isDone:!0},{id:Object(k.a)(),title:"Juice",isDone:!0},{id:Object(k.a)(),title:"blabla",isDone:!1},{id:Object(k.a)(),title:"smth else",isDone:!1},{id:Object(k.a)(),title:"bananas",isDone:!1}]),n),S=[{id:y,title:"What to learn",filter:"all"},{id:h,title:"What to buy",filter:"all"}],A=function(e){return{type:"REMOVE-TODOLIST",payload:{todolistID:e}}},L=a(135),C=a(136),x=a(137),w=a(138),F=a(126);function N(){return l.createElement(L.a,{sx:{flexGrow:1}},l.createElement(C.a,{position:"static"},l.createElement(x.a,null,l.createElement(f.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2}},l.createElement(F.a,null)),l.createElement(w.a,{variant:"h6",component:"div",sx:{flexGrow:1}},"News"),l.createElement(d.a,{color:"inherit"},"Login"))))}var K=a(139),R=a(131),W=a(132),G=a(31);var H=function(){var e=Object(G.b)(),t=Object(G.c)((function(e){return e.todolists})),a=Object(G.c)((function(e){return e.tasks})),n=function(t,a){e(function(e,t){return{type:"CHANGE-FILTER",payload:{todolistID:e,value:t}}}(t,a))},l=function(t,a){e(function(e,t){return{type:"REMOVE-TASKS",todolistID:e,taskID:t}}(t,a))},o=function(t,a){var n=Object(k.a)();e(function(e,t,a){return{type:"ADD-TASKS",payload:{todolistID:e,title:t,newID:a}}}(t,a,n))},r=function(t,a,n){e(function(e,t,a){return{type:"CHANGE-TASK-STATUS",payload:{todolistID:e,taskID:t,isDone:a}}}(t,a,n))},c=function(t){e(A(t)),delete a[t],e(A(t))},s=function(t,a,n){e(function(e,t,a){return{type:"UPDATE-TASK",payload:{todolistID:e,taskID:t,updateTitle:a}}}(t,a,n))},d=function(t,a){e(function(e,t){return{type:"UPDATE-TODOLIST-TITLE",payload:{todolistID:e,title:t}}}(t,a))};return i.a.createElement("div",null,i.a.createElement(N,null),i.a.createElement(K.a,{fixed:!0},i.a.createElement(R.a,{container:!0,style:{padding:"20px"}},i.a.createElement(u,{addTask:function(t){var a=Object(k.a)();e(function(e,t){return{type:"ADD-NEW-TODOLIST",payload:{title:e,newID:t}}}(t,a))}})),i.a.createElement(R.a,{container:!0,spacing:3},t.map((function(e){var t=a[e.id];return"active"===e.filter&&(t=a[e.id].filter((function(e){return!1===e.isDone}))),"completed"===e.filter&&(t=a[e.id].filter((function(e){return!0===e.isDone}))),i.a.createElement(R.a,{item:!0},i.a.createElement(W.a,{elevation:6,style:{padding:"10px"}},i.a.createElement(b,{key:e.id,todolistID:e.id,title:e.title,tasks:t,removeTask:l,changeFilter:n,addTask:o,filter:e.filter,changeTaskStatus:r,updateTask:s,updateTodoListTitle:d,removeTodoList:c})))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var M=a(49),B=Object(M.a)({todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD-NEW-TODOLIST":var a={id:t.payload.newID,title:t.payload.title,filter:"all"};return[a].concat(Object(I.a)(e));case"CHANGE-FILTER":return e.map((function(e){return e.id===t.payload.todolistID?Object(v.a)(Object(v.a)({},e),{},{filter:t.payload.value}):e}));case"UPDATE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.payload.todolistID?Object(v.a)(Object(v.a)({},e),{},{title:t.payload.title}):e}));case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.payload.todolistID}));default:return e}},tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASKS":return Object(v.a)(Object(v.a)({},e),{},Object(j.a)({},t.todolistID,e[t.todolistID].filter((function(e){return e.id!==t.taskID}))));case"ADD-TASKS":var a={id:t.payload.newID,title:t.payload.title,isDone:!1};return Object(v.a)(Object(v.a)({},e),{},Object(j.a)({},t.payload.todolistID,[a].concat(Object(I.a)(e[t.payload.todolistID]))));case"CHANGE-TASK-STATUS":return Object(v.a)(Object(v.a)({},e),{},Object(j.a)({},t.payload.todolistID,e[t.payload.todolistID].map((function(e){return e.id===t.payload.taskID?Object(v.a)(Object(v.a)({},e),{},{isDone:t.payload.isDone}):e}))));case"UPDATE-TASK":return Object(v.a)(Object(v.a)({},e),{},Object(j.a)({},t.payload.todolistID,e[t.payload.todolistID].map((function(e){return e.id===t.payload.taskID?Object(v.a)(Object(v.a)({},e),{},{title:t.payload.updateTitle}):e}))));case"ADD-NEW-TODOLIST":return Object(v.a)(Object(v.a)({},e),{},Object(j.a)({},t.payload.newID,[]));case"REMOVE-TODOLIST":var n=Object(v.a)({},e);return delete n[t.payload.todolistID],n;default:return e}}}),P=Object(M.b)(B);r.a.render(i.a.createElement(G.a,{store:P},i.a.createElement(H,null)," "),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[77,1,2]]]);
//# sourceMappingURL=main.24729be7.chunk.js.map