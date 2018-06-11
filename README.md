# console.watch

## Introduction

一个chrome插件，提供“当对象的属性被修改时，控制台进断点”

## Deployment

在chrome://extensions/中,确认已开启“开发者模式”,点击“加载已解压的扩展程序”,选中本项目里的watch文件夹

![](/images/deploy.png)

## Usage

现在我们有一个对象:
var a={
	b:1,
	obj:{
		c:2
	}
}

1. 当a的b属性被修改时,控制台进断点


打开chrome控制台，输入console.watch(a,"b")

![]{/images/demo1-1.png}

输入a.b=3,可以看到控制台进断点

![]{/images/demo1-2.png}

2. 当a的任意子属性修改时，控制台进断点

打开chrome控制台，输入console.watch(a)

输入a.obj={},可以看到控制台进断点

![]{/images/demo2-1.png}