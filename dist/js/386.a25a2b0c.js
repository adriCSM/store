"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[386],{2386:function(e,t,a){a.r(t),a.d(t,{default:function(){return b}});var l=a(3396),s=a(7139),n=a(7771),r=a(870),i=a(9752),o=a(1888),c=a(3289),u=a(2900);const d={class:"py-4 mx-2"},m=(0,l._)("div",{class:"text-subtitle-1 text-medium-emphasis"},"Email address",-1);function p(e,t,a,p,f,k){const v=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("div",d,[(0,l.Wm)(i._,{class:"mx-auto pa-12 pb-8",elevation:"8","max-width":"448",rounded:"lg"},{default:(0,l.w5)((()=>[p.error?((0,l.wg)(),(0,l.j4)(n.w,{key:0,variant:"outlined",color:"error",elevation:"2",prominent:"",border:"start",class:"message text-red d-flex text-capitalize justify-center"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(p.error),1)])),_:1})):(0,l.kq)("",!0),p.success?((0,l.wg)(),(0,l.j4)(n.w,{key:1,variant:"outlined",color:"success",elevation:"2",prominent:"",border:"start",class:"message text-red d-flex text-capitalize justify-center"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(p.success),1)])),_:1})):(0,l.kq)("",!0),m,(0,l.Wm)(u.h,{modelValue:p.email,"onUpdate:modelValue":t[0]||(t[0]=e=>p.email=e),density:"compact",type:"email",placeholder:"Email address","prepend-inner-icon":"mdi-email-outline",variant:"outlined"},null,8,["modelValue"]),(0,l.Wm)(r.T,{block:"",class:"mb-8",color:"blue",size:"large",variant:"tonal",onClick:p.send},{default:(0,l.w5)((()=>[(0,l.Uk)(" Get link ")])),_:1},8,["onClick"]),(0,l.Wm)(o.Z,{class:"text-center"},{default:(0,l.w5)((()=>[(0,l.Wm)(v,{class:"text-blue text-decoration-none",to:"login",rel:"noopener noreferrer"},{default:(0,l.w5)((()=>[(0,l.Wm)(c.t,{icon:"mdi-chevron-left"}),(0,l.Uk)(" Back to log in ")])),_:1})])),_:1})])),_:1})])}var f=a(4870),k=a(4161),v={name:"HelloWorld",data:()=>({visible:!1}),setup(){const e=(0,f.iH)(),t=(0,f.iH)(),a=(0,f.iH)(),l=async()=>{await k.Z.post("/email",{email:e.value}).then((e=>{t.value=e.data.message,setTimeout((()=>{t.value=""}),6e4)})).catch((e=>{a.value=e.response.data.message}))};return{email:e,send:l,error:a,success:t}}},w=a(89);const x=(0,w.Z)(v,[["render",p]]);var b=x}}]);
//# sourceMappingURL=386.a25a2b0c.js.map