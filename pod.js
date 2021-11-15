var fs = require("fs");
var path = require("path");

module.exports =  class pod {
  
  constructor() 
  {  
    this.content = ""
  }

  PrintLog(Text)
  {
    return "Doc: "+this.Path+": "+text
  }

  copy()
  {
    let New =  new Component()
    New.SetContent(this.GetContent())
    return New;
  }
  loadContentFromFile(Path) 
  {    
    if(fs.existsSync(Path))
    {   
      console.log("Doc: "+Path+": Found")
      this.content = fs.readFileSync(Path, {encoding:'utf8', flag:'r'})
    }
    else
    {
      console.log("Doc: "+Path+": Missing")
      this.content =  undefined;
    }
  } 

  addContent(MoreContent)
  {
    this.content+=MoreContent
  }

  replaceAll(target,goal)
  {
  	this.content = this.content.replaceAll(target, goal)
  }

  setOutputPath(path_output, file, dir)
  {

    this.file = file

    this.urlDepth = dir.length

  	if(dir.length>0)
  	{
  	  this.dir = dir[0]+"/"
  	  
  	  for(let i=1;i<dir.length;i++)
  	  {
  	  	this.dir = path.join(this.dir,dir[i])
  	  }

    }
    else
    {
      this.dir = ""
    }

    this.abspath = path_output+this.dir

    if(this.dir!="")
    {
      fs.mkdirSync(this.abspath)
    }
  }

  setContent(string)
  {
  	this.content = string
    return this
  }

  getContent()
  {
    return this.content
  }

  setLinks(ForWeb)
  {
    let root_path = ""

    for(let i=0;i<this.urlDepth;i++)
    {
      root_path += "../"
    }

      this.content = this.content.replaceAll("<@root>",root_path)
      this.content = this.content.replaceAll("<@index>","index.html")
  }

  msg(text)
  {
	return "Page: "+this.id+": "+text

  }

  output()
  {
  	fs.writeFileSync(path.join(this.abspath,this.file), this.content);
  }
}