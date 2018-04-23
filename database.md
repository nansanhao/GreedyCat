# 数据库文档

- 用户表:USER

  ```
  字段:
  id
  nickname
  avaterUrl:(用户头像的url)
  usrMaps:用户创建的地图					->MAP
  collectionMaps:用户收藏的地图			->MAP
  ```

  ​

- 地图表:MAP

  ```
  id
  comments						->COMMENT
  likes
  dislikes
  collections
  mapName
  description:地图简介
  coordinates:地图上的坐标				->COORDINATE
  ```

- 坐标表:COORDINATE

  ```
  id
  longitude:经度
  altitude:纬度
  description:坐标简介
  name:坐标名称
  ```

- 评论表:COMMENT

  ```
  id
  content
  ```

  ​