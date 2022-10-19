import{c as a}from"./@ckeditor.245690c7.js";import{r as g}from"./react.94f0f2be.js";var m={},f=`
.react-spinner-material {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 10px solid #333;
  box-sizing: border-box;
  -webkit-animation: rsm-sweep 1s linear alternate infinite, rsm-rotate 0.8s linear infinite;
          animation: rsm-sweep 1s linear alternate infinite, rsm-rotate 0.8s linear infinite;
}

@keyframes rsm-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rsm-rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes rsm-sweep {
  0% {
    -webkit-clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
    clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
  }
  50% {
    -webkit-clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 50% 50%, 100% 0%, 100% 0%, 0% 0%);
    clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 50% 50%, 100% 0%, 100% 0%, 0% 0%);
  }
  100% {
    -webkit-clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 50% 50%, 100% 100%, 100% 0%, 0% 0%);
    clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 50% 50%, 100% 100%, 100% 0%, 0% 0%);
  }
}

@-webkit-keyframes rsm-sweep {
  0% {
    -webkit-clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
  }
  50% {
    -webkit-clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 50% 50%, 100% 0%, 100% 0%, 0% 0%);
  }
  100% {
    -webkit-clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 50% 50%, 100% 100%, 100% 0%, 0% 0%);
  }
}
`,c="spinner_id_style";(function(){if(!(typeof window>"u")&&!document.getElementById(c)){var e=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.id=c,n.type="text/css",n.styleSheet?n.styleSheet.cssText=f:n.appendChild(document.createTextNode(f)),e&&e.appendChild(n)}})();var o=a&&a.__assign||function(){return o=Object.assign||function(e){for(var n,r=1,t=arguments.length;r<t;r++){n=arguments[r];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},o.apply(this,arguments)},v=a&&a.__rest||function(e,n){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(e);i<t.length;i++)n.indexOf(t[i])<0&&(r[t[i]]=e[t[i]]);return r},h=a&&a.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var r in e)Object.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n.default=e,n};Object.defineProperty(m,"__esModule",{value:!0});var w=h(g.exports),_=function(e){var n=e.visible,r=n===void 0?!0:n,t=e.color,i=t===void 0?"#333333":t,l=e.stroke,d=l===void 0?5:l,s=e.radius,p=s===void 0?40:s,u=e.className,y=e.style,b=v(e,["visible","color","stroke","radius","className","style"]);return r?w.createElement("div",o({},b,{className:["react-spinner-material",u].join(" "),style:o({width:p,height:p,borderColor:i,borderWidth:d},y)})):null},x=m.default=_;export{x as _};
