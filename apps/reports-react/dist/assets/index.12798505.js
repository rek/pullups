var Ze=Object.defineProperty,Xe=Object.defineProperties;var et=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var oe=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;var ae=(e,r,n)=>r in e?Ze(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n,_=(e,r)=>{for(var n in r||(r={}))oe.call(r,n)&&ae(e,n,r[n]);if(P)for(var n of P(r))se.call(r,n)&&ae(e,n,r[n]);return e},R=(e,r)=>Xe(e,et(r));var G=(e,r)=>{var n={};for(var s in e)oe.call(e,s)&&r.indexOf(s)<0&&(n[s]=e[s]);if(e!=null&&P)for(var s of P(e))r.indexOf(s)<0&&se.call(e,s)&&(n[s]=e[s]);return n};import{u as tt,r as h,c as nt,T as rt,C as he,m as pe,a as at,b as J,R as l,A as ot,d as Y,e as st,I as U,f as lt,B as ye,g as N,D as it,h as ct,i as ut,j as le,L as ie,k as ce,l as ue,n as de,o as dt,s as F,M as ft,p as mt,q as S,t as gt,v as ht,w as pt,x as yt,y as Et,P as vt,z as bt,E as wt,F as H,G as xt,H as kt,J as _t,K as Tt,N as St,O as Lt,_ as Ct,Q as Ee,S as Z,U as I,V as M,W as w,X as ve,Y as Rt,Z as $t,$ as Dt,a0 as At,a1 as be,a2 as we,a3 as xe,a4 as ke,a5 as V,a6 as _e,a7 as It,a8 as Ft,a9 as Mt,aa as Te,ab as Pt,ac as Ut,ad as fe,ae as j,af as Se,ag as Bt,ah as Le,ai as Ce,aj as Ot,ak as D,al as Nt,am as Wt,an as Gt,ao as Yt,ap as Ht,aq as Vt,ar as Qt,as as Re,at as jt,au as zt,av as Kt,aw as qt,ax as Jt,ay as Zt,az as Xt,aA as T,aB as en,aC as tn,aD as nn}from"./vendor.d2b30430.js";const rn=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerpolicy&&(t.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?t.credentials="include":o.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(o){if(o.ep)return;o.ep=!0;const t=n(o);fetch(o.href,t)}};rn();const an=({children:e})=>{const r=tt("(prefers-color-scheme: dark)"),n=h.exports.useMemo(()=>nt({palette:{type:r?"dark":"light",primary:{main:"#00897b"},secondary:{main:"#ccc"}}}),[r]);return h.exports.createElement(rt,{theme:n},h.exports.createElement(he,null),e)},$=240,X=pe(e=>({root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:`calc(100% - ${$}px)`,marginLeft:$,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:e.spacing(2)},hide:{display:"none"},drawer:{width:$,flexShrink:0},drawerPaper:{width:$},drawerHeader:R(_({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{justifyContent:"flex-end"}),content:{flexGrow:1,padding:e.spacing(3),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginLeft:-$},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0},table:{minWidth:650},menuItem:{}})),on=({title:e,leftPages:r,renderTopBarRight:n,children:s})=>{const o=X(),t=at(),i=J(),[c,d]=l.useState(!1),a=()=>{d(!0)},u=()=>{d(!1)},f=()=>{console.log("open")},m=(g="")=>()=>{i.push(`/${g.toLowerCase().replace(" ","")}`)};return l.createElement("div",{className:o.root},l.createElement(he,null),l.createElement(ot,{position:"fixed",className:Y(o.appBar,{[o.appBarShift]:c})},l.createElement(st,null,l.createElement(U,{color:"inherit","aria-label":"open drawer",onClick:a,edge:"start",className:Y(o.menuButton,c&&o.hide)},l.createElement(lt,null)),l.createElement(ye,{display:"flex",flexGrow:1},l.createElement(N,{variant:"h6",noWrap:!0},e)),n&&n({handleClick:f}))),l.createElement(it,{className:o.drawer,variant:"persistent",anchor:"left",open:c,classes:{paper:o.drawerPaper}},l.createElement("div",{className:o.drawerHeader},l.createElement(U,{onClick:u},t.direction==="ltr"?l.createElement(ct,null):l.createElement(ut,null))),l.createElement(le,null),l.createElement(ie,null,r.map(({name:g,icon:p})=>{const k=p||(()=>l.createElement("div",null,"?"));return l.createElement(ce,{button:!0,key:g,onClick:m(g)},l.createElement(ue,null,l.createElement(k,null)),l.createElement(de,{primary:g}))})),l.createElement(le,null),l.createElement(ie,null,["Settings"].map(g=>l.createElement(ce,{button:!0,key:g,onClick:m(g)},l.createElement(ue,null,l.createElement(dt,null)),l.createElement(de,{primary:g}))))),l.createElement("main",{className:Y(o.content,{[o.contentShift]:c})},l.createElement("div",{className:o.drawerHeader}),s))},sn=F.div`
  margin-right: 10px;
  margin-top: 5px;
`,ln=({actions:e,row:r}={actions:[],row:-1})=>{const[n,s]=l.useState(null),o=X(),t=c=>{c.stopPropagation(),s(c.currentTarget)},i=c=>{c&&"stopPropagation"in c&&c.stopPropagation(),s(null)};return l.createElement(l.Fragment,null,l.createElement(ft,{anchorEl:n,keepMounted:!0,open:Boolean(n),onClose:i},e.map(({renderIcon:c,action:d,name:a})=>l.createElement(mt,{key:`action-${a}`,onClick:u=>{u.stopPropagation(),d(r),i()},className:o.menuItem},l.createElement(l.Fragment,null,c&&l.createElement(sn,null,c&&c()),a)))),l.createElement(S,{align:"right",style:{width:"20px"}},l.createElement(gt,{"aria-controls":"user-session-menu","aria-haspopup":"true",onClick:t},l.createElement(ht,null))))},Q=pt(e=>yt({head:{backgroundColor:"#555",color:e.palette.common.white},body:{fontSize:14}}))(S),cn=pe({rowRoot:{"& > *":{borderBottom:"unset"},"&:hover":{backgroundColor:"#777"}}}),ee=({columns:e,data:r,handleRowClick:n,actions:s=[],options:o={expandable:!1}})=>{const t=X(),{rowRoot:i}=cn(),[c,d]=l.useState({}),a=f=>{if(n)return()=>n(f)},u=f=>{d(R(_({},c),{[f]:c[f]===void 0?!0:!c[f]}))};return l.createElement(Et,{component:vt},l.createElement(bt,{className:t.table,"aria-label":"simple table"},l.createElement(wt,null,l.createElement(H,null,o.expandable&&l.createElement(Q,{align:"right"}),e.map(({name:f,align:m})=>l.createElement(Q,{key:`head-cell-${f}`,align:m},f)),s&&l.createElement(Q,{align:"right"},"Action"))),l.createElement(xt,null,r.map((f,m)=>l.createElement(l.Fragment,{key:`row-${m}`},l.createElement(H,{className:i,onClick:a(m)},l.createElement(l.Fragment,null,o.expandable&&l.createElement(S,null,l.createElement(U,{"aria-label":"expand row",size:"small",onClick:()=>u(m)},c[m]?l.createElement(kt,null):l.createElement(_t,null))),f.map((g,p)=>p===0?l.createElement(S,{key:`cell-${g.id||p}`,component:"th",scope:"row"},g.data):l.createElement(S,{key:`cell-${g.id||p}`,align:"right"},g.data)),l.createElement(ln,{key:`actions-${m}`,row:m,actions:s}))),o.expandable&&l.createElement(H,{key:`row-expand-${m}`},l.createElement(S,{style:{paddingBottom:0,paddingTop:0},colSpan:6},l.createElement(Tt,{in:c[m],timeout:"auto",unmountOnExit:!0},l.createElement(ye,{margin:1},o.expandableContent&&o.expandableContent(f,m))))))))))},E=()=>h.exports.createElement(St,null),C=({title:e,children:r})=>h.exports.createElement(N,{variant:"h5",component:"h2",gutterBottom:!0},e,r),L=({children:e})=>h.exports.createElement(N,{paragraph:!0},e),un=({children:e,title:r,label:n})=>e?h.exports.createElement(Lt,{title:r,"aria-label":n},e):null,dn=({title:e})=>h.exports.createElement(N,{variant:"h6",component:"h4",gutterBottom:!0},e),fn=F.div`
  display: flex;
  justify-content: space-between;
`,mn=F.div`
  display: flex;
`;var gn=Ct;function hn(e,r,n){var s=e.length;return n=n===void 0?s:n,!r&&n>=s?e:gn(e,r,n)}var pn=hn,yn="\\ud800-\\udfff",En="\\u0300-\\u036f",vn="\\ufe20-\\ufe2f",bn="\\u20d0-\\u20ff",wn=En+vn+bn,xn="\\ufe0e\\ufe0f",kn="\\u200d",_n=RegExp("["+kn+yn+wn+xn+"]");function Tn(e){return _n.test(e)}var $e=Tn;function Sn(e){return e.split("")}var Ln=Sn,De="\\ud800-\\udfff",Cn="\\u0300-\\u036f",Rn="\\ufe20-\\ufe2f",$n="\\u20d0-\\u20ff",Dn=Cn+Rn+$n,An="\\ufe0e\\ufe0f",In="["+De+"]",z="["+Dn+"]",K="\\ud83c[\\udffb-\\udfff]",Fn="(?:"+z+"|"+K+")",Ae="[^"+De+"]",Ie="(?:\\ud83c[\\udde6-\\uddff]){2}",Fe="[\\ud800-\\udbff][\\udc00-\\udfff]",Mn="\\u200d",Me=Fn+"?",Pe="["+An+"]?",Pn="(?:"+Mn+"(?:"+[Ae,Ie,Fe].join("|")+")"+Pe+Me+")*",Un=Pe+Me+Pn,Bn="(?:"+[Ae+z+"?",z,Ie,Fe,In].join("|")+")",On=RegExp(K+"(?="+K+")|"+Bn+Un,"g");function Nn(e){return e.match(On)||[]}var Wn=Nn,Gn=Ln,Yn=$e,Hn=Wn;function Vn(e){return Yn(e)?Hn(e):Gn(e)}var Qn=Vn,jn=pn,zn=$e,Kn=Qn,qn=Ee;function Jn(e){return function(r){r=qn(r);var n=zn(r)?Kn(r):void 0,s=n?n[0]:r.charAt(0),o=n?jn(n,1).join(""):r.slice(1);return s[e]()+o}}var Zn=Jn,Xn=Zn,er=Xn("toUpperCase"),tr=er,nr=Ee,rr=tr;function ar(e){return rr(nr(e).toLowerCase())}var or=ar;const sr=({name:e})=>l.createElement(C,{title:`User: ${or(e)||"unknown"}`}),lr={apiKey:"AIzaSyDYZiCFbyl5nJRrIkTovfzRtED6wZI8z_k",authDomain:"pullups-4eb8a.firebaseapp.com",projectId:"pullups-4eb8a",storageBucket:"pullups-4eb8a.appspot.com",messagingSenderId:"386867108595",appId:"1:386867108595:web:d71bb3d993ed9dbc1d3586",measurementId:"G-ZKSJGD9GBQ"},ir=Z.initializeApp(lr),cr="rekarnar+test@gmail.com",ur="rekarnar+test@gmail.com",y=ir.firestore(),dr=Z.auth().signInWithEmailAndPassword(cr,ur).catch(e=>{var r=e.code,n=e.message;throw console.log("errorCode",r),console.log("errorMessage",n),e});Z.analytics();const te="users",ne="logs",fr=({user:e})=>{const[r,n]=l.useState();return l.useEffect(()=>{y.collection(te).doc(e).collection(ne).onSnapshot(function(s){const o=[];s.docs.forEach(t=>{const i=t.data();o.push({_id:t.id,data:i.logs,start:"",type:"",weight:i.weight,isProcessed:i.processed,duration:i.duration,created:{seconds:i.created?new Date(i.created).getTime():-1,date:i.created?I(i.created).format("D ddd MMM YYYY HH:mm:ss"):"Unknown"},user:e||""})}),n(o)})},[]),r},mr=e=>M(n=>y.collection(te).doc(e).collection(ne).doc(n).delete()),gr=e=>M((n,s=!0)=>y.collection(te).doc(e).collection(ne).doc(n).set({processed:s},{merge:!0})),Ue="user",Be=(e,r)=>({id:r.id,name:e,displayName:r.displayName,active:r.active,weight:r.weight,weightLastUpdated:r.weightLastUpdated}),Oe=e=>{const{isLoading:r,error:n,data:s}=w([Ue,e],()=>y.collection(x).doc(e).get().then(function(o){const t=o.data();return console.log("Found user data:",t),t?Be(e,t):{id:-1,name:"",active:!1}}).catch(function(o){return console.log("Error getting documents: ",o),{id:-1,name:"",active:!1}}),{cacheTime:1/0,staleTime:1/0});return{isLoading:r,error:n,data:s}},hr=e=>{const r=ve();return M(i=>{var c=i,{weight:s,weightLastUpdated:o}=c,t=G(c,["weight","weightLastUpdated"]);return y.collection(x).doc(e).update({weight:s,weightLastUpdated:o})},{onSuccess:(s,o)=>{r.setQueryData([Ue,e],o)}})},pr="users",x="users",yr=()=>{const{isLoading:e,error:r,data:n}=w(pr,()=>y.collection(x).where("active","==",!0).get().then(function(s){const o=[];return s.forEach(function(t){const i=t.data();o.push(Be(t.id,i))}),o}).catch(function(s){return console.log("Error getting documents: ",s),[]}),{cacheTime:1/0,staleTime:1/0});return{isLoading:e,error:r,data:n}},Ne="reports",We="reports",Er=(e,r)=>{const{isLoading:n,error:s,data:o}=w([Ne,e],()=>y.collection(We).doc(e).collection(r).get().then(function(t){return t.docs}));return{isLoading:n,error:s,data:o}},Ge=e=>{const{isLoading:r,error:n,data:s}=w([Ne,e],()=>y.collection(x).doc(e).collection(We).get().then(function(o){const t=[];return o.docs.forEach(function(i){t.push(i.data())}),t}).catch(function(o){console.log("Error getting documents: ",o)}));return{isLoading:r,error:n,data:s}},Ye="settings",He="settings",vr=()=>{const e=ve();return M(n=>y.collection(He).doc("state").set(n),{onSuccess:()=>{e.invalidateQueries(Ye)}})},Ve=()=>{const{isLoading:e,error:r,data:n}=w(Ye,()=>y.collection(He).doc("state").get().then(function(s){return s.data()}).catch(function(s){return console.log("Error getting documents: ",s),{active:""}}),{cacheTime:1/0,staleTime:1/0});return{isLoading:e,error:r,data:n}},br="processedLogs",wr="processedLog",re="processedLogs",xr=(e,r)=>M(s=>y.collection(x).doc(e).collection(re).add(s),{onSuccess:(s,o)=>r&&r(o)}),B=[],kr=e=>{const{isLoading:r,error:n,data:s}=w([br,e],()=>y.collection(x).doc(e).collection(re).get().then(function(o){const t=[];return o.docs.forEach(function(i){t.push(i.data())}),t||B}).catch(function(o){return console.log("Error getting documents: ",o),B}),{cacheTime:1/0,staleTime:1/0});return{isLoading:r,error:n,data:s}},_r=(e,r)=>{const{isLoading:n,error:s,data:o}=w([wr,e,r],()=>y.collection(x).doc(e).collection(re).where("logId","==",r).get().then(function(t){const i=[];return t.docs.forEach(function(c){i.push(c.data())}),i||B}).catch(function(t){return console.log("Error getting documents: ",t),B}),{enabled:r!==""});return{isLoading:n,error:s,data:o}},Qe=e=>{let r=[];return e&&e.items.length>0&&(r=e.items.flatMap(n=>n.markers||[])||[]),r},Tr=({handleClick:e})=>{const{data:r}=Ve();return r?h.exports.createElement("div",{onClick:e},h.exports.createElement(un,{title:r.active,label:"add"},h.exports.createElement(U,null,h.exports.createElement(Rt,{color:"secondary"})))):null},Sr=({children:e})=>{const r=({handleClick:n})=>l.createElement(Tr,{handleClick:n});return l.createElement(on,{title:"Pullup tracking system v1",leftPages:[{name:"Home",icon:$t},{name:"Users",icon:Dt}],renderTopBarRight:r},e)},Lr=({data:e})=>l.createElement(Cr,{data:e}),Cr=({data:e})=>e?l.createElement(At,{offset:25,colorScale:["tomato","orange","gold"]},e.map(r=>l.createElement(be,{data:r}))):l.createElement("div",null,"Loading..."),Rr=()=>{const[e]=l.useState([]),{data:r}=Er("adam","weight");return console.log("reportData",r),l.useEffect(()=>{},[]),l.createElement(Lr,{data:e})},$r=()=>l.createElement(l.Fragment,null,l.createElement(L,null,"Overview"),l.createElement("div",null,l.createElement(Rr,null))),Dr=()=>l.createElement(L,null,"There are no settings yet."),A={green:"#37ba2f",grey:"#999999",blueGrey50:"#ECEFF1",blueGrey300:"#90A4AE",blueGrey700:"#455A64",redDark:"#82312c",red:"#ba372f"},Ar=({data:e,medianLine:r,maxDomain:n,markers:s})=>{if(!e)return l.createElement(E,null);const o=_({},we.grayscale),t=1,i=e.length,c=!!(r&&i>0);return l.createElement("div",{style:{padding:"20px",backgroundColor:"#777"}},l.createElement(xe,{theme:o,height:200,width:1e3,padding:{top:5,bottom:0,left:100,right:40},containerComponent:l.createElement(ke,{responsive:!1})},s&&s.map((d,a)=>l.createElement(V,{key:`group-line-${a}`,style:{data:{stroke:d.stroke||A.grey},parent:{border:"1px dotted #ccc"}},data:[{x:d.x,y:0},{x:d.x,y:n}]})),l.createElement(V,{data:e,interpolation:"natural",domain:{y:[0,n||1]},labels:({datum:d})=>`${d.y} (${d.x})`,labelComponent:l.createElement(_e,null)}),c&&l.createElement(V,{style:{data:{stroke:"#c43a31"},parent:{border:"1px dotted #ccc"}},data:[{x:t,y:r},{x:i,y:r}]})))},Ir=({user:e,logId:r})=>e==="adam"?95:e==="anette"?67:e==="j"?72:-1,Fr=({value:e,total:r})=>{if(!e)return null;const n=e/r;return l.createElement(l.Fragment,null,l.createElement("div",null,"Duration: ",e/1e3,"s"),l.createElement("div",null,"Calculated interval: ",n.toFixed(2),"ms"))},Mr=({log:e})=>e.duration!==void 0?l.createElement(l.Fragment,null,l.createElement(C,null,"Raw stats:"),l.createElement(Fr,{value:e.duration,total:e.data.length})):null,Pr=({data:e,user:r,logId:n,extras:s})=>{const[o,t]=l.useState([]),[i,c]=l.useState(1),{data:d}=_r(r,n||""),a=g=>{const p=g.data.map((v,k)=>({x:k,y:v}));t(p)};if(l.useEffect(()=>{if(e){a(e);const g=It(e.data);g&&c(g*1.1)}},[e]),!e)return l.createElement(E,null);let u=d&&d.length>0?d[0].weight:-1;u===-1&&n&&(u=Ir({user:r,logId:n}));let f=s||[],m=[];return d&&d.length>0&&(m=d.flatMap(g=>Qe(g.report))),m&&m.length>0&&(f=m),console.log("Processed log for line:",d),l.createElement(l.Fragment,null,l.createElement(Ar,{data:o,medianLine:u,maxDomain:i,markers:f}),d&&l.createElement(Ur,{logs:d,first:f[0]}),l.createElement(Mr,{log:e}))},Ur=({logs:e,first:r})=>(console.log("first",r),console.log("logs",e),l.createElement("div",null,l.createElement(C,null,"Stats:"),l.createElement("div",null,e.length===0&&"This log has not been processed."),e.map(n=>{const s=n.weight||0,t=(r&&r.y||0)/s;return l.createElement(l.Fragment,null,l.createElement(L,{key:n.logId},"Processed average weight found: ",n.weight.toFixed(2)),l.createElement(L,{key:`${n.logId}_power`},"Power: ",Number(t).toFixed(2)," "))}))),Br=e=>e?I(e).format("ddd D/MM/YY ha"):"",Or=()=>{const{data:e}=yr(),{data:r}=Ve(),n=vr(),s=J();if(!e||!r)return l.createElement(E,null);if(e.length===0)return l.createElement(L,null,"No users yet.");const o=[{name:"Name",align:"left"},{name:"Weight",align:"right"},{name:"Weight updated",align:"right"}],t=e.map(a=>[{data:a.displayName?a.displayName:a.name},{data:a.weight?a.weight.toFixed(2):""},{data:Br(a.weightLastUpdated)}]),i=a=>{s.push(`user/${e[a].name}/totals`)},c=[{name:"View Logs",action:a=>{s.push(`user/${e[a].name}/logs`)},renderIcon:()=>l.createElement(Ft,null)},{name:"Manage reports",action:a=>{s.push(`user/${e[a].name}/reports`)},renderIcon:()=>l.createElement(Mt,null)},{name:"Set active",action:a=>{console.log(e[a].name),n.mutate({active:e[a].name})},renderIcon:()=>l.createElement(Te,null)}],d=r?r.active:"";return l.createElement(l.Fragment,null,l.createElement(fn,null,l.createElement(C,{title:"All users"}),l.createElement(L,null,"Active user: ",d)),l.createElement(ee,{actions:c,columns:o,data:t,handleRowClick:i}))},Nr=({data:e,yLabel:r,tooltip:n})=>{if(!e)return l.createElement(E,null);const s={width:350,height:350,padding:50},o=8,d={fontFamily:"'Helvetica Neue', 'Helvetica', sans-serif",fontSize:12,letterSpacing:"normal",padding:o,fill:A.blueGrey700,stroke:"transparent",strokeWidth:0};R(_({},we.grayscale),{bar:Pt({style:{data:{fill:A.blueGrey700,padding:o,strokeWidth:0},labels:d}},s)});const a=16,u={data:{fill:({datum:p})=>Number(I(p.x).format("H"))>12?A.redDark:A.red},labels:{fontSize:10,fill:"#000"}},m=((Ut(e,"y")||{x:1,y:1}).y||1)*1.2,g={padding:"60px",backgroundColor:"#777"};return l.createElement("div",{style:g},l.createElement(xe,{height:200,width:500,domainPadding:{x:5},padding:{top:5,bottom:50,left:100,right:40},containerComponent:l.createElement(ke,{responsive:!1})},l.createElement(be,{data:e,style:u,alignment:"start",maxDomain:m,barWidth:a,labelComponent:l.createElement(_e,{flyoutWidth:200,flyoutHeight:50}),labels:({datum:p})=>n?n(p):[]}),l.createElement(fe,{crossAxis:!0,tickCount:2,label:"",tickFormat:p=>I(p).format("D/MM/YY"),style:{tickLabels:{fontSize:12},axisLabel:{padding:30,border:"1px solid",fontSize:13,fontStyle:"italic"}}}),l.createElement(fe,{dependentAxis:!0,label:r,tickFormat:p=>p.toFixed(0),style:{tickLabels:{fontSize:13},axisLabel:{padding:59,fontSize:13,fontStyle:"italic"}}})))},Wr=({data:e})=>l.createElement(Nr,{data:e,yLabel:"Weight (kg)",tooltip:r=>{const n=[`Date: ${I(r.x).format("ddd D/MM/YY ha")}`];return r.y&&n.unshift(`Weight: ${r.y.toFixed(1)} kgs`),n}});F.div`
  margin-bottom: 40px;
`;const Gr=({user:e,report:r})=>{const{data:n,isLoading:s}=kr(e);if(s)return l.createElement(E,null);if(!n||n.length===0)return l.createElement("div",null,"Missing data for this report");const t=n.map(d=>{var a=d,{created:i}=a,c=G(a,["created"]);const u=j(c,r.fields[0]);return{x:i,y:u}});return l.createElement("div",null,l.createElement(dn,{title:r.name}),r.type==="BarWeight"&&l.createElement(Wr,{data:t}))},je=({children:e})=>{const{id:r}=Se(),{data:n,isLoading:s}=Oe(r);return s?l.createElement(E,null):n?l.createElement(l.Fragment,null,e&&e({user:n})):l.createElement("div",null,"This users data is missing: ",r)},Yr=({user:e})=>{const{data:r,isLoading:n}=Ge(e);return n?l.createElement(E,null):r?l.createElement(l.Fragment,null,r.map(s=>l.createElement(Gr,{key:s.name,user:e,report:s}))):l.createElement("div",null,"This user has no reports configured: ",e)},Hr=()=>l.createElement(je,null,({user:e})=>l.createElement(l.Fragment,null,l.createElement(C,{title:`User: ${e.name||"unknown"}`}),l.createElement(Yr,{user:e.name}))),Vr=()=>{const e=J(),r=()=>{e.goBack()};return h.exports.createElement("div",{onClick:r},h.exports.createElement(Bt,null))},Qr=F.div`
  margin-top: 3px;
  cursor: pointer;
  padding-right: 5px;
`,jr=({children:e})=>l.createElement(mn,null,l.createElement(Qr,null,l.createElement(Vr,null)),e);var q=globalThis&&globalThis.__assign||function(){return q=Object.assign||function(e){for(var r,n=1,s=arguments.length;n<s;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},q.apply(this,arguments)},zr=globalThis&&globalThis.__awaiter||function(e,r,n,s){function o(t){return t instanceof n?t:new n(function(i){i(t)})}return new(n||(n=Promise))(function(t,i){function c(u){try{a(s.next(u))}catch(f){i(f)}}function d(u){try{a(s.throw(u))}catch(f){i(f)}}function a(u){u.done?t(u.value):o(u.value).then(c,d)}a((s=s.apply(e,r||[])).next())})},Kr=globalThis&&globalThis.__generator||function(e,r){var n={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},s,o,t,i;return i={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function c(a){return function(u){return d([a,u])}}function d(a){if(s)throw new TypeError("Generator is already executing.");for(;n;)try{if(s=1,o&&(t=a[0]&2?o.return:a[0]?o.throw||((t=o.return)&&t.call(o),0):o.next)&&!(t=t.call(o,a[1])).done)return t;switch(o=0,t&&(a=[a[0]&2,t.value]),a[0]){case 0:case 1:t=a;break;case 4:return n.label++,{value:a[1],done:!1};case 5:n.label++,o=a[1],a=[0];continue;case 7:a=n.ops.pop(),n.trys.pop();continue;default:if(t=n.trys,!(t=t.length>0&&t[t.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!t||a[1]>t[0]&&a[1]<t[3])){n.label=a[1];break}if(a[0]===6&&n.label<t[1]){n.label=t[1],t=a;break}if(t&&n.label<t[2]){n.label=t[2],n.ops.push(a);break}t[2]&&n.ops.pop(),n.trys.pop();continue}a=r.call(e,n)}catch(u){a=[6,u],o=0}finally{s=t=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}},qr=function(e,r){return r===void 0&&(r={}),zr(void 0,void 0,void 0,function(){var n;return Kr(this,function(s){switch(s.label){case 0:return[4,Le(q({minPeakDistance:10},r)).fromArray(e)];case 1:return n=s.sent(),[2,n]}})})},Jr=function(e){var r=Ce(e)||0,n=e.map(function(s){return s*-1+r});return n},Zr=globalThis&&globalThis.__awaiter||function(e,r,n,s){function o(t){return t instanceof n?t:new n(function(i){i(t)})}return new(n||(n=Promise))(function(t,i){function c(u){try{a(s.next(u))}catch(f){i(f)}}function d(u){try{a(s.throw(u))}catch(f){i(f)}}function a(u){u.done?t(u.value):o(u.value).then(c,d)}a((s=s.apply(e,r||[])).next())})},Xr=globalThis&&globalThis.__generator||function(e,r){var n={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},s,o,t,i;return i={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function c(a){return function(u){return d([a,u])}}function d(a){if(s)throw new TypeError("Generator is already executing.");for(;n;)try{if(s=1,o&&(t=a[0]&2?o.return:a[0]?o.throw||((t=o.return)&&t.call(o),0):o.next)&&!(t=t.call(o,a[1])).done)return t;switch(o=0,t&&(a=[a[0]&2,t.value]),a[0]){case 0:case 1:t=a;break;case 4:return n.label++,{value:a[1],done:!1};case 5:n.label++,o=a[1],a=[0];continue;case 7:a=n.ops.pop(),n.trys.pop();continue;default:if(t=n.trys,!(t=t.length>0&&t[t.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!t||a[1]>t[0]&&a[1]<t[3])){n.label=a[1];break}if(a[0]===6&&n.label<t[1]){n.label=t[1],t=a;break}if(t&&n.label<t[2]){n.label=t[2],n.ops.push(a);break}t[2]&&n.ops.pop(),n.trys.pop();continue}a=r.call(e,n)}catch(u){a=[6,u],o=0}finally{s=t=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}},ea=function(e){return Zr(void 0,void 0,void 0,function(){var r,n,s;return Xr(this,function(o){switch(o.label){case 0:return r=Jr(e),[4,Le({minPeakDistance:10}).fromArray(r)];case 1:return n=o.sent(),s=n.map(function(t){return{x:t.x,y:e[t.x]}}),[2,s]}})})},ta=function(e,r){return e===void 0&&(e=[]),r===void 0&&(r=1),!((Ce(e)||0)-(Ot(e)||0)>r)},na=function(e,r){e===void 0&&(e=[]),r===void 0&&(r=1);var n=D(e),s=e.some(function(o){var t=n-o,i=t>=0,c=t;i||(c=t*-1);var d=c>r;return d});return!s},ra=globalThis&&globalThis.__spreadArray||function(e,r,n){if(n||arguments.length===2)for(var s=0,o=r.length,t;s<o;s++)(t||!(s in r))&&(t||(t=Array.prototype.slice.call(r,0,s)),t[s]=r[s]);return e.concat(t||Array.prototype.slice.call(r))},ze=function(e,r,n){r===void 0&&(r=3);var s=[],o=[],t=[],i=!1;return e.forEach(function(c,d){t.push(c),!(t.length<r)&&(na(t,n)&&ta(t)?i?o.push(t[r-1]):(o=o.concat(t),i=!0):(i&&(s.push({start:d-o.length,end:d-1,data:ra([],o,!0)}),i=!1),o=[]),t.shift())}),s},aa=function(e,r,n){n===void 0&&(n=0);var s=[];return e.slice(r).some(function(o,t){var i=o+n>e[r+t-1];return i?(s.push(o),!1):!0}),s},oa=function(e,r){r===void 0&&(r=3);var n=Wt(e,r);return Nt(n)/r},sa=function(e,r,n){var s=n===void 0?{}:n,o=s.deviation,t=o===void 0?0:o,i=s.returnValue,c=i===void 0?!1:i,d=Gt(e,r),a=-1,u=2,f=[];return Yt(d,function(m,g){if(a===-1)if(f.length>u){var p=oa(f,u);m>p+t?a=g:f.push(m)}else f.push(m)}),c?Ht(f):a},la=function(e){var r=!0;return e||(r=!1),e===-1&&(r=!1),r},Ke=function(e,r,n){return n===void 0&&(n=.9),r>e*n},ia=globalThis&&globalThis.__awaiter||function(e,r,n,s){function o(t){return t instanceof n?t:new n(function(i){i(t)})}return new(n||(n=Promise))(function(t,i){function c(u){try{a(s.next(u))}catch(f){i(f)}}function d(u){try{a(s.throw(u))}catch(f){i(f)}}function a(u){u.done?t(u.value):o(u.value).then(c,d)}a((s=s.apply(e,r||[])).next())})},ca=globalThis&&globalThis.__generator||function(e,r){var n={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},s,o,t,i;return i={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function c(a){return function(u){return d([a,u])}}function d(a){if(s)throw new TypeError("Generator is already executing.");for(;n;)try{if(s=1,o&&(t=a[0]&2?o.return:a[0]?o.throw||((t=o.return)&&t.call(o),0):o.next)&&!(t=t.call(o,a[1])).done)return t;switch(o=0,t&&(a=[a[0]&2,t.value]),a[0]){case 0:case 1:t=a;break;case 4:return n.label++,{value:a[1],done:!1};case 5:n.label++,o=a[1],a=[0];continue;case 7:a=n.ops.pop(),n.trys.pop();continue;default:if(t=n.trys,!(t=t.length>0&&t[t.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!t||a[1]>t[0]&&a[1]<t[3])){n.label=a[1];break}if(a[0]===6&&n.label<t[1]){n.label=t[1],t=a;break}if(t&&n.label<t[2]){n.label=t[2],n.ops.push(a);break}t[2]&&n.ops.pop(),n.trys.pop();continue}a=r.call(e,n)}catch(u){a=[6,u],o=0}finally{s=t=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}},ua=globalThis&&globalThis.__spreadArray||function(e,r,n){if(n||arguments.length===2)for(var s=0,o=r.length,t;s<o;s++)(t||!(s in r))&&(t||(t=Array.prototype.slice.call(r,0,s)),t[s]=r[s]);return e.concat(t||Array.prototype.slice.call(r))},da=function(e,r){var n=r.bodyWeight,s=r.devation;return ia(void 0,void 0,void 0,function(){var o,t,i;return ca(this,function(c){switch(c.label){case 0:return[4,qr(e)];case 1:return o=c.sent(),[4,ea(e)];case 2:return t=c.sent(),i=ua([],t,!0),i[0].x===0&&i.shift(),i[i.length-1].x===e.length-1&&i.pop(),la(n)&&(i=i.filter(function(d){var a=Ke(n,d.y||0,s);return!a})),[2,{dips:i,peaks:o}]}})})},fa=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r]},ma=function(e,r){var n=r.bodyWeight,s=r.deviation,o=s===void 0?.9:s,t=r.minLength,i=t===void 0?3:t,c=r.flatLineAllowedDeviation,d=[],a=ze(e,5,c);return fa("Detected flats:",a,{minLength:i}),a.filter(function(u){return u.data.length>i}).forEach(function(u){var f=aa(e,u.end);f[0]>n*o&&d.push(f)}),d},ga=globalThis&&globalThis.__spreadArray||function(e,r,n){if(n||arguments.length===2)for(var s=0,o=r.length,t;s<o;s++)(t||!(s in r))&&(t||(t=Array.prototype.slice.call(r,0,s)),t[s]=r[s]);return e.concat(t||Array.prototype.slice.call(r))},qe=function(e){var r=ze(ga([],e,!0),5),n=D(e);if(r.length>0)if(r.length===1){var s=r[0],o=D(s.data);return o}else{var t=0,i=Vt(r,[function(d){return-d.data.length}]),c=i.find(function(d){return D(d.data)>n*.9});return c&&(t=D(c.data)),t}else return 0},ha=globalThis&&globalThis.__awaiter||function(e,r,n,s){function o(t){return t instanceof n?t:new n(function(i){i(t)})}return new(n||(n=Promise))(function(t,i){function c(u){try{a(s.next(u))}catch(f){i(f)}}function d(u){try{a(s.throw(u))}catch(f){i(f)}}function a(u){u.done?t(u.value):o(u.value).then(c,d)}a((s=s.apply(e,r||[])).next())})},pa=globalThis&&globalThis.__generator||function(e,r){var n={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},s,o,t,i;return i={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function c(a){return function(u){return d([a,u])}}function d(a){if(s)throw new TypeError("Generator is already executing.");for(;n;)try{if(s=1,o&&(t=a[0]&2?o.return:a[0]?o.throw||((t=o.return)&&t.call(o),0):o.next)&&!(t=t.call(o,a[1])).done)return t;switch(o=0,t&&(a=[a[0]&2,t.value]),a[0]){case 0:case 1:t=a;break;case 4:return n.label++,{value:a[1],done:!1};case 5:n.label++,o=a[1],a=[0];continue;case 7:a=n.ops.pop(),n.trys.pop();continue;default:if(t=n.trys,!(t=t.length>0&&t[t.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!t||a[1]>t[0]&&a[1]<t[3])){n.label=a[1];break}if(a[0]===6&&n.label<t[1]){n.label=t[1],t=a;break}if(t&&n.label<t[2]){n.label=t[2],n.ops.push(a);break}t[2]&&n.ops.pop(),n.trys.pop();continue}a=r.call(e,n)}catch(u){a=[6,u],o=0}finally{s=t=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}},ya=function(e,r){return ha(void 0,void 0,void 0,function(){var n,s,o,t,i;return pa(this,function(c){switch(c.label){case 0:return n=r||qe(e),console.log("Body weight found:",n),s=ma(e,{bodyWeight:n,minLength:4}),o={count:s.length,data:s},[4,da(e,{bodyWeight:n,devation:.8})];case 1:return t=c.sent(),i={count:t.dips.length,data:t},[2,{algo1:o,algo2:i}]}})})},O;(function(e){e.start="start",e.peak="peak",e.dip="dip"})(O||(O={}));var Ea=function(e,r,n){var s=[e[n],r[n],e[n+1]],o=Qt(s);return o.length===3?o:[]},b=globalThis&&globalThis.__assign||function(){return b=Object.assign||function(e){for(var r,n=1,s=arguments.length;n<s;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},b.apply(this,arguments)},va=globalThis&&globalThis.__awaiter||function(e,r,n,s){function o(t){return t instanceof n?t:new n(function(i){i(t)})}return new(n||(n=Promise))(function(t,i){function c(u){try{a(s.next(u))}catch(f){i(f)}}function d(u){try{a(s.throw(u))}catch(f){i(f)}}function a(u){u.done?t(u.value):o(u.value).then(c,d)}a((s=s.apply(e,r||[])).next())})},ba=globalThis&&globalThis.__generator||function(e,r){var n={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},s,o,t,i;return i={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function c(a){return function(u){return d([a,u])}}function d(a){if(s)throw new TypeError("Generator is already executing.");for(;n;)try{if(s=1,o&&(t=a[0]&2?o.return:a[0]?o.throw||((t=o.return)&&t.call(o),0):o.next)&&!(t=t.call(o,a[1])).done)return t;switch(o=0,t&&(a=[a[0]&2,t.value]),a[0]){case 0:case 1:t=a;break;case 4:return n.label++,{value:a[1],done:!1};case 5:n.label++,o=a[1],a=[0];continue;case 7:a=n.ops.pop(),n.trys.pop();continue;default:if(t=n.trys,!(t=t.length>0&&t[t.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!t||a[1]>t[0]&&a[1]<t[3])){n.label=a[1];break}if(a[0]===6&&n.label<t[1]){n.label=t[1],t=a;break}if(t&&n.label<t[2]){n.label=t[2],n.ops.push(a);break}t[2]&&n.ops.pop(),n.trys.pop();continue}a=r.call(e,n)}catch(u){a=[6,u],o=0}finally{s=t=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}},wa=globalThis&&globalThis.__spreadArray||function(e,r,n){if(n||arguments.length===2)for(var s=0,o=r.length,t;s<o;s++)(t||!(s in r))&&(t||(t=Array.prototype.slice.call(r,0,s)),t[s]=r[s]);return e.concat(t||Array.prototype.slice.call(r))},me={green:"#37ba2f",red:"#ba372f"},ge=function(e,r){return va(void 0,void 0,void 0,function(){var n,s,o,t,i,c,d,a,u;return ba(this,function(f){switch(f.label){case 0:return n=qe(wa([],e,!0)),[4,ya(e,n||r)];case 1:s=f.sent(),o=s.algo2.data.dips.map(function(m){return b(b({},m),{stroke:me.green,type:O.dip})}),t=s.algo2.data.peaks.map(function(m){return b(b({},m),{stroke:me.red,type:O.peak})}).filter(function(m){if(n>0){var g=(m.y||0)<n,p=Ke(m.y||0,n),v=!p&&!g;return v}else return!0}),i=!0,c=0,d=[];do a=Ea(t,o,c),a.length>0?(d.push(a),c+=1):i=!1;while(i);return console.log("All marker groups:",d),u=d.map(function(m){return{confidence:0,markers:m}}).filter(function(m){return m.markers&&m.markers.length>0}).map(function(m,g){if(g>1)return m;var p=-1,v=m.markers.find(function(Je){return Je.type==="peak"});if(v){var k=sa(e,v.x);if(k){var W=e.slice(k+1,v.x+1);p=W[W.length-1]-W[0]}}return b(b({},m),{pressureChange:p})}),console.log("[Process Log] results:",u),[2,{report:{items:u,pullupCount:u.length},weight:n}]}})})};const xa=({user:e})=>{const r=fr({user:e.name}),n=hr(e.name),s=gr(e.name),o=xr(e.name,f=>{s.mutate(f.logId)}),t=mr(e.name),[i,c]=l.useState();if(!r)return l.createElement(E,null);console.log("[User Logs] All session data: ",r),console.log("[User Logs] User:",e);let d=[];const a=[{name:"Date",align:"left"},{name:"Processed",align:"right"}];r.sort((f,m)=>{const g=j(f,"created.seconds");return j(m,"created.seconds")-g}),d=r.reduce((f,m)=>{if(!m.data||!m.created)return f;const g=[{data:m.created.date},{data:m.isProcessed?"Yes":"No"}];return[...f,g]},d);const u=[{name:"Delete",action:async f=>{t.mutate(r[f]._id)},renderIcon:()=>l.createElement(Re,null)},{name:"Transfer",action:async f=>{console.log("Transfer log:",d[f])},renderIcon:()=>l.createElement("div",null,"T")},{name:"Test",action:async f=>{const m=r[f];console.log("RAW",m.data),console.log("========== Result: =============");const g=await ge(m.data,e.weight);if(console.log("Processing result:",g),g.report.items.length>0){const p=Qe(g.report);c(p)}console.log("================================")},renderIcon:()=>l.createElement(jt,null)},{name:"Process",renderIcon:()=>l.createElement(Te,null),action:async f=>{const m=r[f];if(m.isProcessed){console.warn("Cannot double process!");return}const g=await ge(m.data,e.weight);console.log("[User Logs] Processing result:",g),o.mutate({format:1,logId:m._id,created:m.created.seconds,processed:+new Date,weight:g.weight,report:g.report}),g.weight&&m.created.seconds>(e.weightLastUpdated||0)&&n.mutate(R(_({},e),{weight:g.weight,weightLastUpdated:m.created.seconds})),c(g.report.items[0].markers)}}];return l.createElement(ee,{actions:u,columns:a,data:d,options:{expandable:!0,expandableContent:(f,m)=>{const g=r[m];return l.createElement(Pr,{user:g.user,logId:g._id,data:g,extras:i})}}})},ka=()=>{const{id:e}=Se(),{data:r,isLoading:n}=Oe(e);return n?h.exports.createElement(E,null):r?h.exports.createElement(h.exports.Fragment,null,h.exports.createElement(jr,null,h.exports.createElement(sr,{name:r.name})),h.exports.createElement(xa,{user:r})):h.exports.createElement("div",null,"This users data is missing: ",e)},_a=({user:e})=>{const{data:r}=Ge(e);if(!r||r.length===0)return l.createElement("div",null,"This user has no reports configured: ",e);const n=[{name:"Name",align:"left"},{name:"Type",align:"right"},{name:"Fields",align:"right"}],s=r.map(t=>[{data:t.name},{data:t.type},{data:t.fields.join(",")}]),o=[{name:"Delete",action:async t=>{console.log("NOT IMPLEMENTED",t)},renderIcon:()=>l.createElement(Re,null)},{name:"Edit",action:async t=>{console.log("NOT IMPLEMENTED",t)},renderIcon:()=>l.createElement(zt,null)}];return l.createElement(l.Fragment,null,l.createElement(C,null,"Reports for: ",e),l.createElement(ee,{columns:n,data:s,actions:o}))},Ta=()=>l.createElement(je,null,({user:e})=>l.createElement(_a,{user:e.name})),Sa=new Kt,La=()=>{const[e,r]=h.exports.useState(!0);return h.exports.useEffect(()=>{dr.then(()=>{r(!1)}).catch(n=>{console.log("Firebase error:",n)})},[]),e?h.exports.createElement(E,null):h.exports.createElement(qt,null,h.exports.createElement(Jt,{client:Sa},h.exports.createElement(Zt,null,h.exports.createElement(an,null,h.exports.createElement(Sr,null,h.exports.createElement(Xt,null,h.exports.createElement(T,{path:"/users"},h.exports.createElement(Or,null)),h.exports.createElement(T,{path:"/user/:id/totals"},h.exports.createElement(Hr,null)),h.exports.createElement(T,{path:"/user/:id/logs"},h.exports.createElement(ka,null)),h.exports.createElement(T,{path:"/user/:id/reports"},h.exports.createElement(Ta,null)),h.exports.createElement(T,{path:"/settings"},h.exports.createElement(Dr,null)),h.exports.createElement(T,{path:"/home"},h.exports.createElement($r,null)),h.exports.createElement(en,{path:"/",to:"/home"}))))),h.exports.createElement(tn.exports.ReactQueryDevtools,{initialIsOpen:!1})))};nn.render(l.createElement(La,null),document.getElementById("root"));
