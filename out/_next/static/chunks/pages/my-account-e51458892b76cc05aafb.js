(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4356],{73303:function(e,t,r){var n=r(67206),s=r(67762);e.exports=function(e,t){return e&&e.length?s(e,n(t,2)):0}},47302:function(e,t,r){"use strict";var n=r(73534),s=r(56581),a=r(97e3),i=r(25675),o=r(67294),l=r(82069),c=r(9113),u=r(9723),d=r(11163),f=r(80868),m=r(85893);function x(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"===typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(e,t)}(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,s=function(){};return{s:s,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,o=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){o=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(o)throw a}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}t.Z=function(e){var t,r=e.tab,h=e.profile_picture,p=(0,o.useState)(!1),v=p[0],b=p[1],g=(0,c.f)().data,N=(0,o.useState)(null),j=N[0],w=N[1],k=(0,o.useState)(0),y=k[0],_=k[1],E=(0,o.useState)([]),S=E[0],C=E[1],M=(0,f.r)().data,P=(0,n.e)().data,D=(0,s.T)(null===P||void 0===P?void 0:P.customer.data.id.toString()).data;(0,o.useEffect)((function(){M&&C(M.data)}),[M]),(0,o.useMemo)((function(){P&&w(P.customer.data)}),[P]);(0,o.useEffect)((function(){g&&_(g.unread-function(e){var t,r=0,n=x(S);try{for(n.s();!(t=n.n()).done;){var s=t.value;e.includes(s.inbox_conversation.data.id)&&u.E2.includes(s.inbox_message.data.type)&&(r+=1)}}catch(a){n.e(a)}finally{n.f()}return r}(g.reduce_conversation_unread_ids))}),[g]);var I=[{line:9,total:y}],T=function(e){var t=I.find((function(t){return t.line===e}));return t&&t.total>0?t:void 0};return(0,m.jsxs)("div",{className:"w-full m-auto flex flex-col",children:[(0,m.jsxs)("div",{className:"user-profile-block flex order-2 lg:order-1",children:[(0,m.jsx)("div",{className:"thumb mb-8 w-24",children:(0,m.jsx)(i.default,{className:"w-full",loader:a.k,src:h||(null===j||void 0===j?void 0:j.profile_picture)||"/assets/images/Default_Profile.svg",alt:"",width:96,height:96,objectFit:"cover"})}),(0,m.jsxs)("div",{className:"info mb-8 lg:mb-12 flex-1 pl-4",children:[(0,m.jsx)("div",{className:"font-helveticaNeue500 ratings flex items-center text-pink text-sm",children:D&&D.rate?(0,m.jsx)(l.Z,{rate:D.rate}):""}),(0,m.jsx)("h3",{className:"font-helveticaNeue500 text-dark uppercase text-2xl mb-1",children:(null===j||void 0===j?void 0:j.first_name)||"FirstName"}),(0,m.jsxs)("p",{className:"font-helveticaNeue500 text-dark uppercase text-xl mb-1",children:["@",(null===j||void 0===j?void 0:j.nickname)||"Username"]})]})]}),(0,m.jsxs)("div",{className:"aside-nav-wrap order-1 -mx-6 lg:mx-0 mb-8 lg:mb-0 lg:order-2",children:[(0,m.jsx)("div",{className:"account-nav-toggle-mobile bg-pink text-white lg:hidden",children:(0,m.jsxs)("div",{className:"relative bg-pink text-[14px] font-medium leading-none text-white lg:hidden uppercase pt-[25px] pb-[14px] px-[18px] cursor-pointer",onClick:function(){b(!v)},children:[null===(t=u.NP.find((function(e,t){return t+1===r&&e})))||void 0===t?void 0:t.label,(0,m.jsx)("div",{className:"".concat(v?"-rotate-45":""," absolute top-6 right-[10px] inline-block cursor-pointer transition-all float-right"),children:(0,m.jsx)(i.default,{src:"/assets/icons/plus-2.svg",alt:"",width:14,height:14})})]})}),(0,m.jsx)("div",{id:"account-nav",className:"inner bg-lightGrey lg:block px-6 lg:px-0 ".concat(v?"":"hidden"),children:u.NP.map((function(e,t){var n;return(0,m.jsxs)("div",{className:"pr-4 flex block cursor-pointer border-b text-dark border-b-dark bg-account-nav bg-no-repeat bg-right-center ".concat(r===t+1&&"text-pink border-b-pink bg-none"),onClick:function(){return d.default.push("/my-account".concat(e.path))},children:[(0,m.jsx)("div",{className:"font-helveticaNeue500 pt-7 pb-6 leading-none tracking-0 uppercase text-[18px]",children:e.label}),T(t)&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"text-pink pl-1 pt-9 pb-6 font-helveticaNeue500 text-[16px] leading-[0px] tracking-0",children:"("}),(0,m.jsx)("div",{className:"text-pink pt-[33px] pb-6 font-helveticaNeue500 text-[16px] leading-[0px] tracking-0",children:null===(n=T(t))||void 0===n?void 0:n.total}),(0,m.jsx)("div",{className:"text-pink pt-9 pb-6 font-helveticaNeue500 text-[16px] leading-[0px] tracking-0",children:")"})]})]},e.label.toString())}))})]})]})}},82069:function(e,t,r){"use strict";var n=r(67294),s=r(25675),a=r(85893);t.Z=function(e){var t=e.rate,r=e.values,i=e.size||12,o=(0,n.useState)(0),l=o[0],c=o[1],u=(0,n.useState)(!1),d=u[0],f=u[1];return(0,n.useEffect)((function(){!function(){var e=parseInt(t.toString()),r=t-e;e>0&&c(e),r>0&&f(!0)}()}),[t]),(0,a.jsxs)("div",{className:"flex",children:[function(){for(var e=[],t=0;t<5;t++)e.push("rating-".concat(t+1));return e}().map((function(e,t){return(0,a.jsx)("div",{className:"mr-[4px]",children:t<l?(0,a.jsx)(s.default,{className:"cursor-pointer",src:"/assets/icons/rating-1.svg",alt:"icon rating",width:i,height:i}):d&&t===l?(0,a.jsx)(s.default,{className:"cursor-pointer",src:"/assets/icons/rating-2.svg",alt:"icon rating",width:i,height:i}):(0,a.jsx)(s.default,{className:"cursor-pointer",src:"/assets/icons/rating-3.svg",alt:"icon rating",width:i,height:i})},e.toString())})),(0,a.jsxs)("span",{className:"text-pink ".concat(i>12?"text-[14px] pt-[1px]":"text-[12px] -mt-[2px]"),children:["(",r,")"]})]})}},56581:function(e,t,r){"use strict";r.d(t,{T:function(){return a}});var n=r(46837),s=r(88767),a=function(e){return(0,s.useQuery)("seller_info",(function(){return(0,n.h)("users/".concat(e,"/info"))}),{enabled:!!e})}},57407:function(e,t,r){"use strict";r.d(t,{E:function(){return a}});var n=r(46837),s=r(88767),a=function(){return(0,s.useMutation)((function(e){return(0,n.h)("upload/s3",{method:"post",body:e.formData})}))}},89972:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return M}});var n=r(47302),s=r(5887),a=r(73534),i=r(9008),o=r(67294),l=r(15861),c=r(87757),u=r.n(c),d=r(25675),f=r(22887),m=r(46837),x=r(88767),h=r(57407),p=r(97e3),v=r(88615),b=r(85893),g=function(e){var t=e.profilePicture,r=e.onChangePhoto,n=e.userId,s=(0,h.E)(),a=s.mutate,i=s.isLoading,c=s.isError,g=s.error,N=function(e){var t=e.userId;return(0,x.useMutation)(function(){var e=(0,l.Z)(u().mark((function e(r){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,m.h)("users/".concat(t,"/update_profile_picture"),{method:"put",body:JSON.stringify({full_path:r.full_path})});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}({userId:n}),j=N.mutate,w=N.isLoading,k=N.isError,y=N.error,_=(0,o.useState)(""),E=_[0],S=_[1],C=function(){var e=(0,l.Z)(u().mark((function e(t){var n,s,i,o,l;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.target.files){e.next=9;break}if(n=t.target.files[0],s=(0,v.D0)(n),i=s.isValid,o=s.message,i){e.next=6;break}return S(o),e.abrupt("return");case 6:(l=new FormData).append("files",n,n.name),a({formData:l},{onSuccess:function(e){var t=e[0].full_path;t&&j({full_path:t},{onSuccess:function(){r(t)}})}});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,b.jsxs)("div",{children:[(0,b.jsx)("input",{id:"profile-picture-input",type:"file",accept:"image/*",onChange:function(e){return C(e)},hidden:!0}),(0,b.jsxs)("div",{onClick:function(){var e;return null===(e=document.getElementById("profile-picture-input"))||void 0===e?void 0:e.click()},className:"cursor-pointer",children:[(0,b.jsx)(d.default,{loader:p.k,className:"w-full block mb-2",src:t||"/assets/images/Default_Profile.svg",alt:"",width:250,height:250,objectFit:"cover"}),k&&(0,b.jsx)(f.Z,{message:y.message}),c&&(0,b.jsx)(f.Z,{message:g.message}),E&&(0,b.jsx)(f.Z,{message:E}),(0,b.jsx)("a",{className:"font-helveticaNeue500 text-sm uppercase underline block",children:t?"Replace photo":"Upload photo"}),(0,b.jsx)("span",{children:(w||i)&&"Uploading..."})]})]})},N=r(22283),j=r(94649),w=r(27335),k=function(e){var t=e.profile,r=e.customer,n=e.setIsEditingProfile,s=e.setProfile,a=(0,x.useMutation)((function(e){return(0,m.h)("users/me",{method:"put",body:JSON.stringify(e)})})),i=a.mutate,o=a.isLoading,c=a.isError,d=a.error,h=(0,j.TA)({initialValues:{first_name:r.first_name,last_name:r.last_name,email:t.email,nickname:r.nickname},validationSchema:N.DE,onSubmit:function(){var e=(0,l.Z)(u().mark((function e(t){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(t,{onSuccess:function(e){s(e),n(!1)}});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()});return(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-helveticaNeue400 text-lg mb-4",children:"Profile details"}),(0,b.jsxs)("form",{onSubmit:h.handleSubmit,children:[(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)(w.Z,{name:"first_name",label:"First name",onChange:h.handleChange,value:h.values.first_name,errorMessage:h.errors.first_name&&h.touched.first_name?h.errors.first_name:""})}),(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)(w.Z,{name:"last_name",label:"Last name",onChange:h.handleChange,value:h.values.last_name,errorMessage:h.errors.last_name&&h.touched.last_name?h.errors.last_name:""})}),(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)(w.Z,{name:"email",label:"Email",onChange:h.handleChange,value:h.values.email,errorMessage:h.errors.email&&h.touched.email?h.errors.email:""})}),(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)(w.Z,{name:"nickname",label:"Username",onChange:h.handleChange,value:h.values.nickname,errorMessage:h.errors.nickname&&h.touched.nickname?h.errors.nickname:""})}),c&&(0,b.jsx)(f.Z,{message:d.message}),(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)("button",{type:"submit",className:"font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-sm uppercase w-full py-4 tracking-widest",disabled:o,children:o?"Loading...":"Save"})})]})]})},y=r(15859),_=function(e){var t=e.setIsEditingProfile,r=(0,x.useMutation)((function(e){return(0,m.h)("users/me/update-password",{method:"put",body:JSON.stringify({password:e.new_password,re_password:e.re_new_password})})})),n=r.mutate,s=r.isLoading,a=r.isError,i=r.error,o=(0,j.TA)({initialValues:{new_password:"",re_new_password:""},validationSchema:N.tQ,onSubmit:function(){var e=(0,l.Z)(u().mark((function e(r){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n(r,{onSuccess:function(){t(!1)}});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()});return(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"font-helveticaNeue400 text-lg mb-4",children:"Change password"}),(0,b.jsxs)("form",{onSubmit:o.handleSubmit,children:[(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)(y.Z,{name:"new_password",label:"New Password",onChange:o.handleChange,value:o.values.new_password,errorMessage:o.errors.new_password&&o.touched.new_password?o.errors.new_password:""})}),(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)(y.Z,{name:"re_new_password",label:"Confirm new password",onChange:o.handleChange,value:o.values.re_new_password,errorMessage:o.errors.re_new_password&&o.touched.re_new_password?o.errors.re_new_password:""})}),a&&(0,b.jsx)(f.Z,{message:i.message}),(0,b.jsx)("div",{className:"mb-6",children:(0,b.jsx)("button",{type:"submit",className:"font-helveticaNeue500 text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white text-sm uppercase w-full py-4 tracking-widest",disabled:s,children:s?"Loading...":"Save"})})]})]})},E=r(11163),S=r(31955),C=function(e){var t=e.toggleCheckCurrencyModal,r=e.active,n=(0,E.useRouter)(),s=(0,x.useMutation)((function(){return(0,m.h)("users/delete-account",{method:"delete"})})),a=s.mutate,i=s.isError,o=s.error;return(0,b.jsx)("div",{className:"overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ".concat(r?"":"hidden"),children:(0,b.jsx)("div",{className:"relative my-40 md:my-68 mx-auto w-[240px] md:w-420",children:(0,b.jsx)("div",{className:"border-0 p-8 relative flex flex-col w-full bg-white outline-none focus:outline-none",children:(0,b.jsx)("div",{className:"relative flex-auto md:px-6",children:(0,b.jsxs)("div",{className:"text-center text-sm",children:[(0,b.jsx)("p",{className:"text-[14px] md:text-[16px]",children:"Do you wish to delete/close your account?"}),i&&(0,b.jsx)(f.Z,{message:o.message}),(0,b.jsxs)("div",{className:"flex justify-center -mx-2 mt-[24px]",children:[(0,b.jsx)("div",{className:"w-2/4 px-2",children:(0,b.jsx)("button",{type:"submit",className:"text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4",onClick:function(){a(void 0,{onSuccess:function(){t(),S.Z.remove("token"),n.push("/")}})},children:"Ok"})}),(0,b.jsx)("div",{className:"w-2/4 px-2",children:(0,b.jsx)("button",{type:"submit",className:"text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4",onClick:t,children:"Cancel"})})]})]})})})})})},M=function(){var e=(0,a.e)(),t=e.data,r=e.refetch,l=(0,o.useState)(t),c=l[0],u=l[1],f=(0,s.J)().isLoggedIn,h=(0,o.useState)(),p=h[0],v=h[1],N=(0,o.useState)(),j=N[0],w=N[1],y=(0,o.useState)(!1),S=y[0],M=y[1],P=(0,o.useState)(!1),D=P[0],I=P[1],T=(0,o.useState)(!1),L=T[0],Z=T[1],F=(0,o.useState)(!1),A=F[0],R=F[1],O=(0,x.useMutation)((function(e){return(0,m.h)("customer/notification",{method:"PUT",body:JSON.stringify(e)})})).mutate;if((0,o.useEffect)((function(){t&&u(t)}),[t]),(0,o.useEffect)((function(){if(c){var e=c.customer.data;w(e),e.is_direct_mail_marketing?"1"===e.offer_email?I(!0):("2"===e.offer_email||I(!0),Z(!0)):(I(!1),Z(!1))}}),[c]),(0,o.useMemo)((function(){j&&v(j.profile_picture)}),[j]),!f)return null;return(0,b.jsxs)("div",{className:"",children:[(0,b.jsxs)(i.default,{children:[(0,b.jsx)("title",{children:"GanniRepeat - My Account - My Profile"}),(0,b.jsx)("meta",{name:"description",content:"GanniRepeat - My Account - My Profile"}),(0,b.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,b.jsx)("main",{className:"text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal",children:(0,b.jsxs)("div",{className:"flex flex-wrap lg:bg-lightGrey",children:[(0,b.jsx)("div",{className:"lg:py-12 px-6 lg:px-12 w-full lg:w-480",children:(0,b.jsx)(n.Z,{tab:1,profile_picture:p})}),(0,b.jsxs)("div",{className:"bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-auto lg:flex-1",children:[(0,b.jsx)("h3",{className:"font-helveticaNeue500 uppercase text-2xl mb-2",children:"My Account"}),(0,b.jsx)("h2",{className:"font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2",children:"My profile"}),(0,b.jsx)("div",{className:"mt-12",children:(0,b.jsx)("hr",{className:"border-t-grey my-8"})}),S&&c&&j?(0,b.jsxs)("div",{children:[(0,b.jsx)(k,{profile:c,customer:j,setIsEditingProfile:M,setProfile:u}),(0,b.jsx)("div",{className:"mt-12",children:(0,b.jsx)("hr",{className:"border-t-grey my-8"})}),(0,b.jsx)(_,{setIsEditingProfile:M})]}):(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"text-lg mb-6",children:"Here you can edit the information that will appear on your public profile."}),(0,b.jsx)("a",{onClick:function(){c&&E.default.push("/seller/".concat(c.id,"/followers"))},className:"font-helveticaNeue500 text-center leading-none pt-[16px] pb-[13px] px-3 transition-all border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark block w-full uppercase text-xs mb-6 tracking-widest cursor-pointer",children:"View my profile"}),(0,b.jsx)("h3",{className:"font-helveticaNeue400 text-lg mb-6",children:"Profile details"}),(0,b.jsxs)("div",{className:"profile-details mb-8",children:[(0,b.jsxs)("div",{className:"flex mb-2",children:[(0,b.jsx)("div",{className:"w-2/6 lg:w-28 text-sm",children:(0,b.jsx)("span",{children:"Name"})}),(0,b.jsx)("div",{className:"w-4/6 lg:w-auto uppercase font-helveticaNeue500 text-sm",children:(0,b.jsx)("span",{children:"".concat(null===j||void 0===j?void 0:j.first_name," ").concat(null===j||void 0===j?void 0:j.last_name)})})]}),(0,b.jsxs)("div",{className:"flex mb-2",children:[(0,b.jsx)("div",{className:"w-2/6 lg:w-28 text-sm",children:(0,b.jsx)("span",{children:"Username"})}),(0,b.jsx)("div",{className:"w-4/6 lg:w-auto uppercase font-helveticaNeue500 text-sm",children:(0,b.jsx)("span",{children:null===j||void 0===j?void 0:j.nickname})})]}),(0,b.jsxs)("div",{className:"flex mb-2",children:[(0,b.jsx)("div",{className:"w-2/6 lg:w-28 text-sm",children:(0,b.jsx)("span",{children:"Email address"})}),(0,b.jsx)("div",{className:"w-4/6 lg:w-auto uppercase font-helveticaNeue500 text-sm break-all",children:(0,b.jsx)("span",{children:null===c||void 0===c?void 0:c.email})})]}),(0,b.jsxs)("div",{className:"flex mb-2",children:[(0,b.jsx)("div",{className:"w-2/6 lg:w-28 text-sm",children:(0,b.jsx)("span",{children:"Password"})}),(0,b.jsx)("div",{className:"w-4/6 lg:w-auto uppercase font-helveticaNeue500 text-sm",children:(0,b.jsx)("span",{children:"********"})})]})]}),(0,b.jsx)("a",{onClick:function(){M(!0)},className:"font-helveticaNeue500 uppercase text-sm underline cursor-pointer",children:"Edit details"})]}),(0,b.jsx)("div",{className:"mt-12",children:(0,b.jsx)("hr",{className:"my-7 border-t-dark"})}),(0,b.jsx)("h3",{className:"font-helveticaNeue400 text-lg mb-6",children:"Profile photo"}),(0,b.jsx)("p",{className:"mb-6",children:"Join our community! Upload a photo of yourself to display on your seller profile and product pages."}),(0,b.jsxs)("div",{className:"mb-6",children:[(0,b.jsx)("div",{className:"w-250",children:(0,b.jsx)(g,{profilePicture:p,onChangePhoto:v,userId:Number(null===c||void 0===c?void 0:c.id)})}),(0,b.jsxs)("div",{className:"border border-pink p-3 flex items-center mb-8 lg:mb-12 mt-6",children:[(0,b.jsx)("div",{className:"w-6",children:(0,b.jsx)(d.default,{src:"/assets/images/Info.svg",alt:"info image",width:24,height:24})}),(0,b.jsx)("div",{className:"pl-4 text-sm flex-1",children:(0,b.jsx)("p",{children:"Please ensure your photo is at least 500px x 500px."})})]})]}),(0,b.jsx)("div",{className:"mt-12",children:(0,b.jsx)("hr",{className:"my-7 border-t-dark"})}),(0,b.jsx)("h3",{className:"font-helveticaNeue400 text-lg mb-6",children:"Notifications"}),(0,b.jsx)("p",{className:"mb-6",children:"Choose your communication preferences below."}),(0,b.jsx)("p",{className:"mb-4",children:"I am happy to receive emails regarding:"}),(0,b.jsxs)("div",{className:"mb-6",children:[(0,b.jsxs)("label",{className:"custom-checkbox type-lg cursor-pointer block mb-4",children:[(0,b.jsx)("input",{id:"email_1",type:"checkbox",className:"hidden",checked:D}),(0,b.jsx)("span",{className:"relative block select-none pt-1 pl-8 text-[14px] before:absolute before:top-[0px] before:left-0 before:w-[20px] before:h-[20px] before:border before:border-dark after:content-[url('/assets/icons/close.svg')] after:absolute after:top-[3px] after:left-[4px] after:text-white after:font-helveticaNeueLTCom85Heavy after:font-extrabold after:text-base after:hidden",onClick:function(){return I(!D)},children:"News and Special Offers"})]}),(0,b.jsxs)("label",{className:"custom-checkbox type-lg cursor-pointer block",children:[(0,b.jsx)("input",{type:"checkbox",className:"hidden",checked:L}),(0,b.jsx)("span",{className:"relative block pt-1 pl-8 text-[14px] before:absolute before:top-[0px] before:left-0 before:w-[20px] before:h-[20px] before:border before:border-dark after:content-[url('/assets/icons/close.svg')] after:absolute after:top-[3px] after:left-[4px] after:text-white after:font-helveticaNeueLTCom85Heavy after:font-extrabold after:text-base after:hidden",onClick:function(){return Z(!L)},children:"New activity from sellers I follow"})]}),(0,b.jsx)("p",{className:"text-[14px] pt-[24px] select-none uppercase underline cursor-pointer",onClick:function(){if(c){var e="0";D&&L?e="3":D?e="1":L&&(e="2");var t={id:c.customer.data.id,is_direct_mail_marketing:"0"!==e,offer_email:e};O(t,{onSuccess:function(){r()}})}},children:"Save changes"})]}),(0,b.jsx)("div",{className:"mt-12",children:(0,b.jsx)("hr",{className:"my-7 border-t-dark"})}),(0,b.jsx)("h3",{className:"font-helveticaNeue400 text-lg mb-6",children:"Delete account"}),(0,b.jsxs)("p",{children:["If you would like to delete your account, you can do so by clicking"," ",(0,b.jsx)("a",{className:"underline cursor-pointer",onClick:function(){return R(!A)},children:"here"}),"."]}),(0,b.jsx)("div",{className:"productfaq mt-8",children:(0,b.jsx)("div",{className:"border-2 border-green py-8",children:(0,b.jsxs)("div",{className:"container m-auto px-4 xl2:max-w-screen-xl2",children:[(0,b.jsx)("p",{className:"font-helveticaNeue500 text-green uppercase text-xs mb-2",children:"Learn more"}),(0,b.jsxs)("h2",{className:"font-helveticaNeue500 text-green uppercase text-2xl xl:text-3xl",children:["Got a question? ",(0,b.jsx)("br",{}),"read our"," ",(0,b.jsx)("a",{href:"https://ganni-customerservice.zendesk.com/hc/en-us",className:"font-helveticaNeue500 text-green uppercase text-2xl xl:text-3xl underline",target:"_blank",rel:"noopener noreferrer",children:"FAQs"})]})]})})})]})]})}),(0,b.jsx)(C,{active:A,toggleCheckCurrencyModal:function(){return R(!A)}})]})}},88615:function(e,t,r){"use strict";r.d(t,{pD:function(){return i},NM:function(){return o},RL:function(){return l},SX:function(){return c},dI:function(){return u},Mi:function(){return d},FA:function(){return f},JT:function(){return m},Pg:function(){return x},SK:function(){return h},D0:function(){return p}});r(87757);var n=r(9723),s=(r(46837),r(73303)),a=r.n(s),i=function(e,t){var r=t.find((function(t){return t.alpha2Code===e}));return null===r||void 0===r?void 0:r.name},o=function(e,t){return!t||"DKK"!==t.code&&"SEK"!==t.code&&"NOK"!==t.code?Math.ceil(2*e)/2:Math.round(e)},l=function(e){switch(e){case n.i_.SOLD:return"sold";case n.i_.CANCELLED:return"cancelled";case n.i_.RETURNED:return"returned";default:return"sold confirmed"}},c=function(e){return e.filter((function(e){return["SOLD_CONFIRMED","CANCELLED","RETURNED","PAYMENT_SENT"].includes(e.status)})).length===e.length?n.DF.COMPLETED:n.DF.PROCESSING},u=function(e){return e.tracking_number?e.status===n.Tb.TRACKED?n.Tb.TRACKED:e.status===n.Tb.DELIVERED?n.Tb.DELIVERED:n.Tb.SHIPPED:n.Tb.PENDING},d=function(e,t,r){var n,s,a=null===(n=r.currencies)||void 0===n?void 0:n.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),i=null===(s=r.currencies)||void 0===s?void 0:s.find((function(e){return"EUR"===e.code}));return a&&i?a.code===i.code?Number(e.toFixed(2)):Number((e/(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},f=function(e,t,r){var n,s,a=null===(n=r.currencies)||void 0===n?void 0:n.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),i=null===(s=r.currencies)||void 0===s?void 0:s.find((function(e){return"EUR"===e.code}));return a&&i?a.code===i.code?Number(e.toFixed(2)):Number((e*(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},m=function(e,t,r,n){var s,a,i=null===(s=n.currencies)||void 0===s?void 0:s.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),o=null===(a=n.currencies)||void 0===a?void 0:a.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)}));return i&&o?i.code===o.code?Number(e.toFixed(2)):Number((e*((o.rate||1)/(i.rate||1))).toFixed(2)):Number(e.toFixed(2))},x=function(e,t,r){for(var n=[],s=0;s<e;s++)n.push(t);return n.join("default"===r?"":r||" / ")},h=function(e){return a()(e,(function(e){return e.tax_fee}))},p=function(e){if(!e)return{isValid:!1,message:""};if(e.size<1024)return{isValid:!1,message:"Minimum supported file size is 1kb"};if(e.size>1e7)return{isValid:!1,message:"Maximum supported file size is 10mb"};var t=e.type.split("/"),r=["jpeg","jpg","png"];return t[1]&&r.includes(t[1])?{isValid:!0,message:""}:{isValid:!1,message:"Supported file types are ".concat(r.join(", "))}}},90625:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/my-account",function(){return r(89972)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=90625,e(e.s=t);var t}));var t=e.O();_N_E=t}]);