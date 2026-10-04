const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const ROOT=__dirname, DATA=path.join(ROOT,'data'), PUB=path.join(ROOT,'public');
fs.mkdirSync(DATA,{recursive:true}); const DB=path.join(DATA,'db.json');
function load(){try{return JSON.parse(fs.readFileSync(DB,'utf8'))}catch{return {cards:[],models:[],settings:{brand:'灵库'}}}}
function save(d){fs.writeFileSync(DB,JSON.stringify(d,null,2),'utf8')}
function json(res,obj,status=200){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(obj))}
function body(req){return new Promise((ok,bad)=>{let x='';req.on('data',c=>x+=c);req.on('end',()=>{try{ok(x?JSON.parse(x):{})}catch(e){bad(e)}})})}
function analyze(text,type='text'){const clean=(text||'').replace(/\s+/g,' ').trim(); const title=clean.slice(0,28)||(type==='url'?'网页收藏':'未命名收藏'); const sentences=clean.split(/[。！？!?]/).filter(Boolean); return {title,one_liner:(sentences[0]||clean).slice(0,100),core_points:sentences.slice(0,5),key_knowledge:clean.slice(0,900),actionable:sentences.filter(s=>/可以|应该|方法|步骤|建议|需要/.test(s)).slice(0,4),why_save:'已由测试版规则引擎完成初步提炼；配置AI模型后可重新智能整理。',category:type==='url'?'网页资料':'知识笔记',tags:[type==='url'?'链接':'文字','待AI优化']}}
const server=http.createServer(async(req,res)=>{try{
 const u=new URL(req.url,'http://localhost');
 if(req.method==='GET'&&u.pathname==='/api/cards'){let d=load();let q=(u.searchParams.get('q')||'').toLowerCase();let cards=d.cards.filter(c=>!q||JSON.stringify(c).toLowerCase().includes(q));return json(res,{cards});}
 if(req.method==='POST'&&u.pathname==='/api/cards'){let b=await body(req),d=load();let a=analyze(b.content,b.type);let c={id:crypto.randomUUID(),type:b.type||'text',source:b.source||'',raw:b.content||'',note:b.note||'',created_at:new Date().toISOString(),...a};d.cards.unshift(c);save(d);return json(res,{card:c},201)}
 if(req.method==='PUT'&&u.pathname.startsWith('/api/cards/')){let id=u.pathname.split('/').pop(),b=await body(req),d=load(),i=d.cards.findIndex(x=>x.id===id);if(i<0)return json(res,{error:'not found'},404);d.cards[i]={...d.cards[i],...b,updated_at:new Date().toISOString()};save(d);return json(res,{card:d.cards[i]})}
 if(req.method==='DELETE'&&u.pathname.startsWith('/api/cards/')){let id=u.pathname.split('/').pop(),d=load();d.cards=d.cards.filter(x=>x.id!==id);save(d);return json(res,{ok:true})}
 if(req.method==='GET'&&u.pathname==='/api/models')return json(res,load().models);
 if(req.method==='POST'&&u.pathname==='/api/models'){let b=await body(req),d=load();let m={id:crypto.randomUUID(),enabled:true,provider:b.provider||'',model:b.model||'',base_url:b.base_url||'',has_api_key:Boolean(b.api_key),note:'v0.1 预览版不保存真实 API Key'};d.models.push(m);save(d);return json(res,m,201)}
 let file=u.pathname==='/'?'index.html':u.pathname.slice(1);let p=path.normalize(path.join(PUB,file));if(!p.startsWith(PUB)||!fs.existsSync(p)){res.writeHead(404);return res.end('Not found')}let ext=path.extname(p),ct={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript; charset=utf-8'}[ext]||'application/octet-stream';res.writeHead(200,{'Content-Type':ct});fs.createReadStream(p).pipe(res)
}catch(e){json(res,{error:e.message},500)}});
server.listen(process.env.PORT||8787,()=>console.log('灵库 running: http://localhost:'+(process.env.PORT||8787)));
