(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9830],{73303:function(e,r,t){var n=t(67206),i=t(67762);e.exports=function(e,r){return e&&e.length?i(e,n(r,2)):0}},57407:function(e,r,t){"use strict";t.d(r,{E:function(){return a}});var n=t(46837),i=t(88767),a=function(){return(0,i.useMutation)((function(e){return(0,n.h)("upload/s3",{method:"post",body:e.formData})}))}},28522:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return j}});var n=t(22887),i=t(27335),a=t(15861),s=t(87757),o=t.n(s),c=t(25675),d=t(67294),u=t(57407),l=t(88615),f=t(85893),m=function(e){var r=e.image,t=e.children,i=e.onChangePhoto,s=e.id,m=e.required,h=(0,u.E)(),b=h.mutate,p=h.isLoading,x=h.isError,g=h.error,v=(0,d.useState)(""),N=v[0],j=v[1],y=function(){var e=(0,a.Z)(o().mark((function e(r){var t,n,a,s,c;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r.target.files){e.next=9;break}if(t=r.target.files[0],n=(0,l.D0)(t),a=n.isValid,s=n.message,a){e.next=6;break}return j(s),e.abrupt("return");case 6:(c=new FormData).append("files",t,t.name),b({formData:c},{onSuccess:function(e){var r=e[0].full_path;r&&i(r)}});case 9:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,f.jsxs)("div",{children:[(0,f.jsx)("input",{id:s,type:"file",accept:"image/*",onChange:function(e){return y(e)},hidden:!0}),(0,f.jsxs)("div",{onClick:function(){var e;return null===(e=document.getElementById(s))||void 0===e?void 0:e.click()},className:"cursor-pointer",children:[(0,f.jsx)(c.default,{className:"w-full block mb-2",src:r||"/assets/images/input-bg.jpg",alt:"",width:250,height:250,objectFit:"cover"}),x&&(0,f.jsx)(n.Z,{message:g.message}),N&&(0,f.jsx)(n.Z,{message:N}),(0,f.jsx)("a",{className:"font-helveticaNeue500 text-xs uppercase mt-2 block ".concat(m&&"text-pink"),children:t}),(0,f.jsx)("span",{className:"text-xs",children:p&&"Uploading..."})]})]})},h=t(5887),b=t(46837),p=t(88767),x=t(22283),g=t(94649),v=t(9008),N=t(11163);function j(){var e=(0,N.useRouter)(),r=(0,d.useState)(""),t=r[0],a=r[1],s=(0,d.useState)(""),o=s[0],u=s[1],l=(0,h.J)().isLoggedIn,j=e.query.from,y=(0,p.useMutation)((function(e){return(0,b.h)("users/create-id-document",{method:"post",body:JSON.stringify({front:e.frontImage,back:e.backImage,from:e.from,birthday:e.birthday})})}),{}),k=y.mutate,E=y.isLoading,D=y.isError,w=y.error,C=(0,g.TA)({initialValues:{option:"",birthday:""},validationSchema:x.lo,onSubmit:function(r){t&&o&&k({frontImage:t,backImage:o,from:j,birthday:r.birthday},{onSuccess:function(){"bank-transfer"===j?e.push("/receive-payment/bank-confirmed"):e.push("/verify-id/submitted")}})}});return l?(0,f.jsxs)("div",{children:[(0,f.jsxs)(v.default,{children:[(0,f.jsx)("title",{children:"GanniRepeat - Verify Id"}),(0,f.jsx)("meta",{name:"description",content:"GanniRepeat - Verify Id"}),(0,f.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,f.jsx)("div",{className:"page-title text-center py-12",children:(0,f.jsxs)("div",{className:"container m-auto px-4 xl2:max-w-screen-xl2",children:[(0,f.jsx)("h1",{className:"text-3xl font-helveticaNeueLTCom85Heavy text-dark uppercase",children:"verify your id"}),(0,f.jsx)("div",{className:"text-sm lg:w-10/12 m-auto",children:(0,f.jsx)("p",{children:"We need some more information to process your bank payment"})})]})}),(0,f.jsx)("div",{className:"verifyID-sec pb-20",children:(0,f.jsx)("div",{className:"container m-auto px-4 xl2:max-w-screen-xl2",children:(0,f.jsxs)("div",{className:"w-full lg:px-20",children:[(0,f.jsx)("p",{className:"text-lg mb-4",children:"Select ID Document"}),(0,f.jsxs)("form",{action:"#",onSubmit:C.handleSubmit,children:[(0,f.jsx)("div",{className:"mb-6",children:(0,f.jsxs)("label",{className:"custom-radio cursor-pointer block",children:[(0,f.jsx)("input",{type:"radio",className:"hidden",name:"option",onChange:C.handleChange,value:"driver-id"}),(0,f.jsx)("span",{className:"relative block pl-8 before:absolute before:top-px before:left-0 before:bg-white before:border before:border-dark before:block before:w-[20px] before:h-[20px] before:rounded-full after:absolute after:top-[7px] after:left-[6px] after:hidden after:w-[8px] after:h-[8px] after:rounded-full after:bg-white text-sm ".concat(C.errors.option&&C.touched.option?"text-pink":"text-black"),children:"DRIVING LICENSE"})]})}),(0,f.jsx)("p",{children:"Use your government issues drivers license"}),(0,f.jsx)("hr",{className:"border-t-grey my-8"}),(0,f.jsx)("div",{className:"mb-6",children:(0,f.jsxs)("label",{className:"custom-radio cursor-pointer block",children:[(0,f.jsx)("input",{type:"radio",className:"hidden",name:"option",onChange:C.handleChange,value:"national-id"}),(0,f.jsx)("span",{className:"relative block pl-8 before:absolute before:top-px before:left-0 before:bg-white before:border before:border-dark before:block before:w-[20px] before:h-[20px] before:rounded-full after:absolute after:top-[7px] after:left-[6px] after:hidden after:w-[8px] after:h-[8px] after:rounded-full after:bg-white text-sm ".concat(C.errors.option&&C.touched.option?"text-pink":"text-black"),children:"NATIONAL ID CARD"})]})}),(0,f.jsx)("p",{className:"mb-8",children:"Use a government issued ID card; Photo card, Non-driver photo ID, Permanent Resident card, Certificate of Indian Status card."}),(0,f.jsx)("hr",{className:"border-t-dark my-8"}),(0,f.jsx)("p",{className:"text-lg mb-6",children:"Please confirm your birth date"}),(0,f.jsx)(i.Z,{name:"birthday",label:"Date of birth",placeholder:"DD/MM/YYYY",onChange:C.handleChange,value:C.values.birthday,errorMessage:C.errors.birthday&&C.touched.birthday?C.errors.birthday:""}),(0,f.jsx)("hr",{className:"border-t-dark my-8"}),(0,f.jsx)("p",{className:"text-lg mb-6",children:"Upload documents"}),(0,f.jsx)("p",{className:"mb-6",children:"Please upload the front and back of your ID document as photographs or scans. Ensure the entire document fits within the image and that the information is legible. We accept JPEG, PNG and PDF files only."}),(0,f.jsxs)("div",{className:"flex flex-wrap mb-12 space-x-6",children:[(0,f.jsxs)("div",{className:"w-2/4 md:w-250",children:[(0,f.jsx)("div",{className:"bg-grey mr-2 lg:mr-6 cursor-pointer"}),(0,f.jsx)(m,{onChangePhoto:a,image:t,id:"upload-front",required:C.isSubmitting&&!t,children:"UPLOAD FRONT"})]}),(0,f.jsxs)("div",{className:"w-2/4 md:w-250",children:[(0,f.jsx)("div",{className:"bg-grey lg:mr-6 cursor-pointer"}),(0,f.jsx)(m,{onChangePhoto:u,image:o,id:"back-front",required:C.isSubmitting&&!o,children:"UPLOAD BACK"})]})]}),(0,f.jsxs)("div",{className:"border border-pink p-4 flex items-center mb-8 lg:mb-12",children:[(0,f.jsx)("div",{className:"w-6",children:(0,f.jsx)(c.default,{className:"w-full",src:"/assets/images/Info.svg",alt:"",width:"100%",height:"100%"})}),(0,f.jsx)("div",{className:"pl-4 text-sm flex-1",children:(0,f.jsx)("p",{className:"mb-0",children:"We need this information in order to safely pay for a sale. This information is only used to process your payment safely."})})]}),D&&(0,f.jsx)(n.Z,{message:w.message}),(0,f.jsx)("div",{className:"mb-6",children:(0,f.jsx)("button",{type:"submit",className:"font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-xs uppercase w-full py-4 tracking-widest",disabled:E,children:E?"Loading...":"Submit"})})]})]})})})]}):null}},88615:function(e,r,t){"use strict";t.d(r,{pD:function(){return s},NM:function(){return o},RL:function(){return c},SX:function(){return d},dI:function(){return u},Mi:function(){return l},FA:function(){return f},JT:function(){return m},Pg:function(){return h},SK:function(){return b},D0:function(){return p}});t(87757);var n=t(9723),i=(t(46837),t(73303)),a=t.n(i),s=function(e,r){var t=r.find((function(r){return r.alpha2Code===e}));return null===t||void 0===t?void 0:t.name},o=function(e,r){return!r||"DKK"!==r.code&&"SEK"!==r.code&&"NOK"!==r.code?Math.ceil(2*e)/2:Math.round(e)},c=function(e){switch(e){case n.i_.SOLD:return"sold";case n.i_.CANCELLED:return"cancelled";case n.i_.RETURNED:return"returned";default:return"sold confirmed"}},d=function(e){return e.filter((function(e){return["SOLD_CONFIRMED","CANCELLED","RETURNED","PAYMENT_SENT"].includes(e.status)})).length===e.length?n.DF.COMPLETED:n.DF.PROCESSING},u=function(e){return e.tracking_number?e.status===n.Tb.TRACKED?n.Tb.TRACKED:e.status===n.Tb.DELIVERED?n.Tb.DELIVERED:n.Tb.SHIPPED:n.Tb.PENDING},l=function(e,r,t){var n,i,a=null===(n=t.currencies)||void 0===n?void 0:n.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)})),s=null===(i=t.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return a&&s?a.code===s.code?Number(e.toFixed(2)):Number((e/(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},f=function(e,r,t){var n,i,a=null===(n=t.currencies)||void 0===n?void 0:n.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)})),s=null===(i=t.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return a&&s?a.code===s.code?Number(e.toFixed(2)):Number((e*(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},m=function(e,r,t,n){var i,a,s=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)})),o=null===(a=n.currencies)||void 0===a?void 0:a.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)}));return s&&o?s.code===o.code?Number(e.toFixed(2)):Number((e*((o.rate||1)/(s.rate||1))).toFixed(2)):Number(e.toFixed(2))},h=function(e,r,t){for(var n=[],i=0;i<e;i++)n.push(r);return n.join("default"===t?"":t||" / ")},b=function(e){return a()(e,(function(e){return e.tax_fee}))},p=function(e){if(!e)return{isValid:!1,message:""};if(e.size<1024)return{isValid:!1,message:"Minimum supported file size is 1kb"};if(e.size>1e7)return{isValid:!1,message:"Maximum supported file size is 10mb"};var r=e.type.split("/"),t=["jpeg","jpg","png"];return r[1]&&t.includes(r[1])?{isValid:!0,message:""}:{isValid:!1,message:"Supported file types are ".concat(t.join(", "))}}},30196:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/verify-id",function(){return t(28522)}])}},function(e){e.O(0,[9774,2888,179],(function(){return r=30196,e(e.s=r);var r}));var r=e.O();_N_E=r}]);