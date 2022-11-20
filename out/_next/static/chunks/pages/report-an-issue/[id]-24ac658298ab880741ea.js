(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[388],{73303:function(e,t,n){var r=n(67206),i=n(67762);e.exports=function(e,t){return e&&e.length?i(e,r(t,2)):0}},29534:function(e,t,n){"use strict";var r=n(67294),i=n(85893);t.Z=function(e){var t=e.title,n=e.name,a=e.valueInput,s=e.placeholder,o=e.onChange,c=e.onError,l=e.numberCheck,u=e.require,d=e.textarea,m=e.disabled,p=e.type,h=e.click,f=(0,r.useState)(a||""),x=f[0],v=f[1];return(0,r.useEffect)((function(){c&&(x.replace(/\s/g,"")||v(""),!x&&u?c(n):c(n,!0))}),[x]),(0,i.jsxs)("div",{className:"w-full",children:[(0,i.jsxs)("label",{className:"w-full text-[14px] uppercase",children:[t,u?"*":""]}),(0,i.jsxs)("div",{className:"".concat(m?"pointer-events-none bg-[#EFEFEF]":""," w-full h-min-[48px] mt-[12px] relative p-[11px] border ").concat(h&&!x&&u?"border-[#DA0714]":"border-mgrey"),children:[d?(0,i.jsx)("textarea",{className:"w-[96%] sm:w-[93%] h-min-[30px] text-[14px] resize-none focus:outline-none ml-[5px] ".concat(h&&!x&&u?"placeholder:text-red":""),name:n,value:x,cols:30,rows:4,placeholder:h&&!x&&u?"Required":"",spellCheck:!1,onChange:function(e){v(l&&e.target.value.length>l?e.target.value.slice(0,l):e.target.value),o(e)}}):(0,i.jsx)("input",{className:"w-[90%] sm:w-[97%] p-[0px] text-[14px] focus:outline-none ".concat(h&&!x&&u?"placeholder:text-red":"placeholder:text-mgrey"),type:p||"text",name:n,value:x,placeholder:h&&!x&&u?"Required":s||"",spellCheck:!1,onChange:function(e){v(l&&e.target.value.length>l?e.target.value.slice(0,l):e.target.value),o(e)},disabled:m}),l?(0,i.jsxs)("div",{className:"float-right text-[12px] ".concat(d?"w-[15%] sm:w-[7%] absolute bottom-[9px] right-[3px]":"w-[10%] sm:w-[3%] mt-[5px]"),children:[x.length,"/",l]}):null]})]})}},55995:function(e,t,n){"use strict";var r=n(67294),i=n(56727),a=n(25675),s=n(85893),o=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")};t.Z=function(e){var t=e.name,n=e.label,c=e.data,l=e.onChange,u=e.classes,d=void 0===u?"":u,m=e.value,p=e.error,h=e.touched,f=e.require,x=e.classesCustomSelect,v=e.typeChar,b=(0,r.useState)(),g=b[0],N=b[1];return(0,r.useEffect)((function(){if(m&&c){var e=c.find((function(e){var t;return e.name===m||(null===(t=e.value)||void 0===t?void 0:t.toString())===m}));N(e)}}),[c,m]),(0,s.jsx)("div",{children:(0,s.jsx)(i.Ri,{value:g,onChange:function(e){N(e),null===l||void 0===l||l(e)},children:function(e){var l=e.open;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(i.Ri.Label,{className:"block text-[14px] uppercase",children:[n," ",f?"*":""]}),(0,s.jsxs)("div",{className:"relative ".concat(d),children:[(0,s.jsxs)(i.Ri.Button,{className:"h-[44px] w-full bg-white text-[14px] focus-none text-left border pt-[8px] pb-[6px] px-3 ".concat(g?v||"capitalize":"text-mgrey"," ").concat(p&&h?"!border-[#DA0714]":"border-mgrey"," ").concat(x),children:[(0,s.jsx)("span",{className:"block truncate pl-[1px] leading-1.25 ".concat(p&&h?"text-red":""),children:p&&h?"Required":g?g.name:"Select"}),(0,s.jsx)("span",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:(0,s.jsx)("div",{className:"h-5 w-5 transition-transform duration-300",children:l?(0,s.jsx)(a.default,{src:"/assets/images/angle-down.svg",alt:"",width:10,height:10}):(0,s.jsx)(a.default,{src:"/assets/images/angle-up.svg",alt:"",width:10,height:10})})})]}),(0,s.jsx)(i.uT,{show:l,as:r.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,s.jsx)(i.Ri.Options,{className:"w-full max-h-60 font-helveticaNeue400 bg-white text-xs absolute border border-mgrey border-t-0 overflow-auto scrollbar-thin z-10 outline-0 focus:outline-0 z-50",children:c.map((function(e,n){return"Select"!==e.name&&(0,s.jsx)(i.Ri.Option,{className:function(e){var t=e.active;return o(t?"bg-gray-100":"","cursor-pointer select-none relative hover:bg-[#111111] hover:text-white")},value:{id:e.id?e.id:n,name:e.name,value:e.value,field:t},children:function(t){var n=t.selected;return(0,s.jsx)("span",{className:o(n?"font-medium bg-gray-100 py-2 px-3":"font-normal","py-2 px-3 block truncate",v||"capitalize"),children:e.name})}},n)}))})})]})]})}})})}},57407:function(e,t,n){"use strict";n.d(t,{E:function(){return a}});var r=n(46837),i=n(88767),a=function(){return(0,i.useMutation)((function(e){return(0,r.h)("upload/s3",{method:"post",body:e.formData})}))}},67377:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return y}});var r=n(55995),i=n(94649),a=n(9008),s=n(11163),o=n(29534),c=n(22283),l=n(9723),u=n(15861),d=n(87757),m=n.n(d),p=n(25675),h=n(67294),f=n(22887),x=n(57407),v=n(88615),b=n(85893),g=function(e){var t=e.claimPictures,n=e.onChangePhoto,r=(0,x.E)(),i=r.mutate,a=r.isLoading,s=r.isError,o=r.error,c=(0,h.useState)(""),l=c[0],d=c[1],g=function(){var e=(0,u.Z)(m().mark((function e(r){var a,s,o,c,l;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r.target.files){e.next=9;break}if(a=r.target.files[0],s=(0,v.D0)(a),o=s.isValid,c=s.message,o){e.next=6;break}return d(c),e.abrupt("return");case 6:(l=new FormData).append("files",a,a.name),i({formData:l},{onSuccess:function(e){var r=e[0].full_path;r&&(t.push("".concat(r)),n(t))}});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,b.jsxs)("div",{children:[(0,b.jsx)("input",{id:"profile-picture-input",type:"file",accept:"image/*",onChange:function(e){return g(e)},hidden:!0}),(0,b.jsxs)("div",{onClick:function(){var e;return null===(e=document.getElementById("profile-picture-input"))||void 0===e?void 0:e.click()},className:"cursor-pointer",children:[t.length>0&&t.map((function(e,t){return(0,b.jsx)(p.default,{className:"w-full block mb-2",src:e,alt:"",width:250,height:250,objectFit:"cover"},t)})),s&&(0,b.jsx)(f.Z,{message:o.message}),l&&(0,b.jsx)(f.Z,{message:l}),(0,b.jsx)("a",{className:"font-helveticaNeue500 text-sm uppercase underline block mt-5",children:"Upload attachment"}),(0,b.jsx)("span",{children:a&&"Uploading..."})]})]})},N=n(5887),j=n(46837),w=n(88767);function y(){var e,t=(0,s.useRouter)(),n=null===(e=t.query)||void 0===e?void 0:e.id,u=(0,h.useState)([]),d=u[0],m=u[1],p=(0,N.J)().isLoggedIn,x=(0,w.useMutation)((function(e){return(0,j.h)("issues",{method:"POST",body:JSON.stringify(e)})})),v=x.mutate,y=x.isLoading,E=x.isError,k=x.error,C=(0,i.TA)({enableReinitialize:!0,validationSchema:c.uD,initialValues:{problem:void 0,comment:""},onSubmit:function(e){v({problem:"".concat(e.problem),comment:"".concat(e.comment),images:d,order_package_id:n},{onSuccess:function(){t.push("/report-an-issue/submitted")}})}});return p?(0,b.jsxs)("div",{children:[(0,b.jsxs)(a.default,{children:[(0,b.jsx)("title",{children:"GanniRepeat - Report an Issue"}),(0,b.jsx)("meta",{name:"description",content:"GanniRepeat - Report an Issue"}),(0,b.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,b.jsx)("div",{className:"page-title text-center py-12",children:(0,b.jsxs)("div",{className:"container m-auto px-4 xl2:max-w-screen-xl2",children:[(0,b.jsx)("h1",{className:"text-3xl font-helveticaNeueLTCom85Heavy text-dark uppercase",children:"Report an issue with your order"}),(0,b.jsx)("div",{className:"text-sm lg:w-10/12 m-auto",children:(0,b.jsx)("p",{children:"Please provide details on the issue with your order and we will try to resolve it as soon as possible."})})]})}),(0,b.jsx)("div",{className:"reportAnIssue-sec pb-20",children:(0,b.jsx)("div",{className:"container m-auto px-4 xl2:max-w-screen-xl2",children:(0,b.jsx)("div",{className:"w-full lg:px-20",children:(0,b.jsxs)("form",{onSubmit:C.handleSubmit,children:[(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)(r.Z,{label:"Please specify the problem",name:"problem",classes:"mt-2",typeChar:"normal-case",onChange:function(e){C.setFieldValue("".concat(e.field),e.name)},data:l.Aw,error:C.errors.problem,touched:C.touched.problem,errorMessage:C.errors.problem&&C.touched.problem?C.errors.problem:""})}),(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)(o.Z,{title:"Comments",textarea:!0,name:"comment",numberCheck:1e3,placeholder:"Eg. Leather mini dress",onChange:C.handleChange})}),(0,b.jsx)("div",{className:"my-12",children:(0,b.jsx)("hr",{className:"my-7 border-t-dark"})}),(0,b.jsxs)("div",{className:"text-sm mb-12",children:[(0,b.jsx)("h3",{className:"font-helveticaNeue500 text-lg mb-4",children:"Upload attachments"}),(0,b.jsx)("p",{className:"pb-6",children:"Please provide any relevant photos or attachements to support your query. We accept JPEG, PNG and PDF files only."}),(0,b.jsx)(g,{claimPictures:d,onChangePhoto:m}),(0,b.jsx)("input",{type:"file",id:"file-01",className:"hidden"})]}),E&&(0,b.jsx)(f.Z,{message:k.message}),(0,b.jsxs)("div",{className:"mb-6 flex -mx-2",children:[(0,b.jsx)("div",{className:"w-2/4 px-2",children:(0,b.jsx)("button",{className:"font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark text-xs uppercase w-full py-4 tracking-widest",children:"Back"})}),(0,b.jsx)("div",{className:"w-2/4 px-2",children:(0,b.jsx)("button",{disabled:y,type:"submit",className:"font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-xs uppercase w-full py-4 tracking-widest",children:y?"Loading...":"Submit"})})]})]})})})})]}):null}},88615:function(e,t,n){"use strict";n.d(t,{pD:function(){return s},NM:function(){return o},RL:function(){return c},SX:function(){return l},dI:function(){return u},Mi:function(){return d},FA:function(){return m},JT:function(){return p},Pg:function(){return h},SK:function(){return f},D0:function(){return x}});n(87757);var r=n(9723),i=(n(46837),n(73303)),a=n.n(i),s=function(e,t){var n=t.find((function(t){return t.alpha2Code===e}));return null===n||void 0===n?void 0:n.name},o=function(e,t){return!t||"DKK"!==t.code&&"SEK"!==t.code&&"NOK"!==t.code?Math.ceil(2*e)/2:Math.round(e)},c=function(e){switch(e){case r.i_.SOLD:return"sold";case r.i_.CANCELLED:return"cancelled";case r.i_.RETURNED:return"returned";default:return"sold confirmed"}},l=function(e){return e.filter((function(e){return["SOLD_CONFIRMED","CANCELLED","RETURNED","PAYMENT_SENT"].includes(e.status)})).length===e.length?r.DF.COMPLETED:r.DF.PROCESSING},u=function(e){return e.tracking_number?e.status===r.Tb.TRACKED?r.Tb.TRACKED:e.status===r.Tb.DELIVERED?r.Tb.DELIVERED:r.Tb.SHIPPED:r.Tb.PENDING},d=function(e,t,n){var r,i,a=null===(r=n.currencies)||void 0===r?void 0:r.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),s=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return a&&s?a.code===s.code?Number(e.toFixed(2)):Number((e/(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},m=function(e,t,n){var r,i,a=null===(r=n.currencies)||void 0===r?void 0:r.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),s=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return a&&s?a.code===s.code?Number(e.toFixed(2)):Number((e*(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},p=function(e,t,n,r){var i,a,s=null===(i=r.currencies)||void 0===i?void 0:i.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),o=null===(a=r.currencies)||void 0===a?void 0:a.find((function(e){return e.code===n||e.symbol===n||e.id===Number(n)}));return s&&o?s.code===o.code?Number(e.toFixed(2)):Number((e*((o.rate||1)/(s.rate||1))).toFixed(2)):Number(e.toFixed(2))},h=function(e,t,n){for(var r=[],i=0;i<e;i++)r.push(t);return r.join("default"===n?"":n||" / ")},f=function(e){return a()(e,(function(e){return e.tax_fee}))},x=function(e){if(!e)return{isValid:!1,message:""};if(e.size<1024)return{isValid:!1,message:"Minimum supported file size is 1kb"};if(e.size>1e7)return{isValid:!1,message:"Maximum supported file size is 10mb"};var t=e.type.split("/"),n=["jpeg","jpg","png"];return t[1]&&n.includes(t[1])?{isValid:!0,message:""}:{isValid:!1,message:"Supported file types are ".concat(n.join(", "))}}},64384:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/report-an-issue/[id]",function(){return n(67377)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=64384,e(e.s=t);var t}));var t=e.O();_N_E=t}]);