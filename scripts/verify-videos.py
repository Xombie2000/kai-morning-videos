import pathlib,json,urllib.request,urllib.parse,concurrent.futures,datetime,re
root=pathlib.Path(__file__).resolve().parent.parent
rows=json.loads((root/'schedule.json').read_text()); urls=list(dict.fromkeys(re.findall(r'href="(https://www.youtube.com/watch\?v=[\w-]+)"',(root/'index.html').read_text())))
def audit(url):
 try:
  with urllib.request.urlopen('https://www.youtube.com/oembed?url='+urllib.parse.quote(url,safe='')+'&format=json',timeout=30) as r: data=json.load(r)
  return dict(url=url,status='metadata verified',title=data['title'],author=data['author_name'])
 except Exception as e:return dict(url=url,status='unverified',error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:results=list(pool.map(audit,urls))
(root/'video-audit.json').write_text(json.dumps({'checked':'2026-10-22','method':'YouTube oEmbed metadata (title and channel); not a full playback review','videos':results},ensure_ascii=False,indent=2)+'\n')
for r in results:print(r)
assert all(r['status']=='metadata verified' for r in results)
