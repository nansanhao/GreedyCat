### weui 可用项

- list
- input
- uploader**
- article
- grid
- loadmore ** 
- panel*
- actionsheet*
- picker
- toast
- navbar 
- searchbar

### weui 部分使用规范

list 块

```
.weui-cells__title
.weui-cells
	.weui-cell hover-class:weui_active
		.weui-cell__hd //可选 放icon
		.weui-cell__bd //行内文字
		.weui-cell__ft //可选 行末说明文字
		.weui-cell__ft__in-access //可选 箭头
```

开关块

```
.weui-cells
	.weui-cell .weui-cell_switch
		.weui-cell__bd  //行内文字
		.weui-cell__ft
			switch
```



文本框

```
.weui-cells
	.weui-cell .weui-cell_input
		.weui-cell__bd  //行内文字
     		input.weui-input
```



文本域

```
.weui-cells
	.weui-cell 
		.weui-cell__bd  //行内文字
			teatarea .weui-textarea
		.weui-textarea-counter
```

栅格

```
.weui-grids
	navigator .weui-grid hover-class:weui_active wx:for {{list}}
		image .weui-grid__icon
		.weui-grid__label
```

