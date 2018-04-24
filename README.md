# GreedyCat（为食猫）



---

#API

domain name: https://614651643.weishimao.xyz

global url = 'https://614651643.weishimao.xyz'

---

##查询地图 、 店铺列表

GET url + "/maps/mostLikes?offset=" +offset+ "&limit="+ limits

GET url + "/maps/newest?offset=" +offset+ "&limit="+ limits

GET url + "/maps/mostComments?offset=" +offset+ "&limit="+ limits

GET url + "/maps/mostLikes?offset=" +offset+ "&limit="+ limits +"&keyword=" + keyword

GET url + "/maps/newest?offset=" +offset+ "&limit="+ limits+"&keyword=" + keyword

GET url + "/maps/mostComments?offset=" +offset+ "&limit="+ limits+"&keyword=" + keyword

GET url + "/coordinates?keyword="+keyword

---

##地图、店铺详情、评论

GET url +"/map/myMap?id="+id

GET url + "/map?id="+id

GET url +"/map/coordinate?id="+id

POST url + "/user/:id/comment"

---

##我的主页 我的地图、收藏地图

GET url+"/user/:id/infomation"

GET url+"/user/:id/maps"

DELETE url +"/user/:id/maps?mapId="+id

GET url+"/user/:id/collectionmaps"

DELETE url +"/user/:id/collectionmaps?mapId="+id



---

##新建、更新地图

POST url+“/map/newMap”

POST url +"/map/newCoordinate"

PATCH url+“/map/newMap”

PATCH url +"/map/newCoordinate"

DELETE url +"/map?mapId="+mapid +"&coordinateId="+coordinateId

