# GreedyCat（为食猫）



---

#API

---

##查询地图列表(按关键字、分类)

GET url + "/maps/mostLikes?offset=" +offset+ "&limit="+ limits

GET url + "/maps/newest?offset=" +offset+ "&limit="+ limits

GET url + "/maps/mostComments?offset=" +offset+ "&limit="+ limits

GET url + "/maps/mostLikes?offset=" +offset+ "&limit="+ limits +"&keyword=" + keyword

GET url + "/maps/newest?offset=" +offset+ "&limit="+ limits+"&keyword=" + keyword

GET url + "/maps/mostComments?offset=" +offset+ "&limit="+ limits+"&keyword=" + keyword

GET url + "/maps/mostLikes?offset=" +offset+ "&limit="+ limits +"&category=" + category

GET url + "/maps/newest?offset=" +offset+ "&limit="+ limits+"&category=" + category

GET url + "/maps/mostComments?offset=" +offset+ "&limit="+ limits+"&category=" + category

```
{
  data:{
    maps:[ //已经排序好的n个map get数据库中取出排序好后索引为 offset~offset+limits的limits个map 若有keyword则在mapname内搜索  筛选掉isPublic为false的项
      {	
        likes：number,
        dislikes：number,
        collections：number,
        mapName：string,
        description:string,
        city:string,
        locality:string,
        category: 暂定为number 后续加一个对应数字的表
      }, //其他省略
    ]
  }
}
```





GET url + "/coordinates?keyword="+keyword

```
{
  data:{
    coordinates:[ //符合关键字查找到店铺/坐标
      {	
        name：string,
        description:string,
        address:string,
      }, //其他省略
    ]
  }
}
```



---

##地图详情

GET url + "/map?id="+id

GET url +"/map/myMap?id="+mainmap

```
{
  data:{
    map:{
      likes：number,
      dislikes：number,
      collections：number,
      mapName：string,
      description:string,
      city:string,
      locality:string,
      category:number,
      coordinates:[
      	{	
          	coordinateId:string
      		longtitude:number,
      		altitude:number,
      		name:string,
        	address:string
       	},...
      ]
      comments:[
        {
        	userNmae:string
        	userAvaterUrl:string
        	content:string
        },...
      ]
    }
  }
}
```





---

##店铺详情//创建店铺

GET url +"/map/coordinate?id="+id

```
{
  data:{
    coordinate:{
      longtitude:number,
      altitude:number,
      name:string,
      address:string,
      description:string
    }
  }
}
```



POST url+“/map/newCoordinate”

```
request:
{
  data:{
    map:mapid(string)
    coordinate:{
      longtitude:number,
      altitude:number,
      name:string,
      address:string,
      description:string
    }
  }
}

respond:(未定)
```



##创建评论

POST url + "/user/:id/comment"

```json
request:
{
  data:{
    mapId:string
    comment:{
      content:string
      userId:string
      date:
    }
  }
}
```



## 点赞、踩、收藏、取消

POST url +'/map/like、dislike、collect'

```json
request:
{
  data:{
    mapId:string
    isLike/isDislike/isCollect:bool  //是否点赞
    userId：userid  //收藏才有本项
  }
}
```



---

##我的主页 

POST url+"/user/save" 上传登陆信息同时获得点赞数

```json

{
  data:{
      likes：number,
      dislikes：number,
      collections：number,
 	 }
  }
}
```



##我的地图、收藏地图列表

GET url+"/user/:id/maps"

GET url+"/user/:id/collectedMaps"

```json
res.data.data:{
    maps:[ 
      {	
        mapId:string
        likes：number,
        dislikes：number,
        collections：number,
        mapName：string,
        description:string,
        city:string,
        locality:string,
        category: 暂定为number 后续加一个对应数字的表
      }, //其他省略
    ]
  }
```

DELETE url +"/user/:id/map"

DELETE url +"/user/:id/collectedmap";

```
data:{ "mapId":string }

```







---

##新建、更新地图

POST url+“/map/myMap”  PUT url +"/map/myMap" 

```
wx.request({
  data:{
	"openId":"oHK1_4u3u76xPXjqG78PPE7DgpIw",
	"map":{
		"mapName":"日料万岁",
		"description":"werfadfsfadfsadfsssssssssssssssssssssssssssssssssssssssssssssssssss",
		"province":"湖北省",
		"city":"武汉市",
		"locality":"江汉区",
		"isPublic":true
	}
	
})

{
    "code": 0,
    "data": {
        "mapId": 3
    }
}
```



POST url +"/map/coordinate"  PUT url +"/map/coordinate" 

```
wx.request({
  data:{
  	coordinate:{
    mapId:string
    longtitude:number,
    altitude:number,
    name:string,
    address:string,
    description:string
 	}
  }
})

```



DELETE url +"/map/coordinate"

```
wx.request({
  data:{
    mapId:string,
    coordinateId:string
  }
})
```


