import './polyfills.server.mjs';
import{a as T}from"./chunk-26CP6BCB.mjs";import{c as b,d as y}from"./chunk-X66WGXXW.mjs";import"./chunk-72LBQG5M.mjs";import{Fb as c,Gb as l,Ma as d,Nb as C,Qa as a,Sb as h,Tb as S,W as p,_ as m,hb as g,mb as u,nb as f,ob as x,pb as r,qb as o,rb as v}from"./chunk-7SHEET3U.mjs";import"./chunk-VVCT4QZE.mjs";function I(t,e){if(t&1&&(r(0,"figure",2),v(1,"img",3),r(2,"figcaption",4)(3,"p",5),c(4),o()()()),t&2){let s=e.$implicit;a(),g("src",s.image,d)("alt",s.name),a(3),l(s.name)}}var M=(()=>{let e=class e{constructor(){this._CategoriesService=p(T),this.catList=[]}ngOnInit(){this.getAllCatSub=this._CategoriesService.getAllCategories().subscribe({next:i=>{console.log(i),this.catList=i.data},error:i=>{console.log(i)}})}ngOnDestroy(){this.getAllCatSub.unsubscribe()}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["app-categories"]],standalone:!0,features:[C],decls:7,vars:3,consts:[[1,"dark:text-white","mb-8","text-5xl","w-fit","mx-auto"],[1,"grid","gap-5","sm:grid-cols-2","md:grid-cols-3"],[1,"product"],[1,"h-[300px]","w-full","object-cover",3,"src","alt"],[1,"text-center","mt-5","py-3"],[1,"text-2xl"]],template:function(n,w){n&1&&(r(0,"section")(1,"h2",0),c(2),h(3,"translate"),o(),r(4,"div",1),f(5,I,5,3,"figure",2,u),o()()),n&2&&(a(2),l(S(3,1,"navbar.Categoies")),a(3),x(w.catList))},dependencies:[y,b]});let t=e;return t})();export{M as CategoriesComponent};
