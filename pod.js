var fs = require("fs");
var path = require("path");

module.exports =  class pod {
  
  constructor() 
  {  
    this.Content = ""
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
      this.Content = fs.readFileSync(Path, {encoding:'utf8', flag:'r'})
    }
    else
    {
      console.log("Doc: "+Path+": Missing")
      this.Content =  undefined;
    }
  } 

  addContent(MoreContent)
  {
    this.Content+=MoreContent
  }

  replaceAll(target,goal)
  {
  	this.Content = this.Content.replaceAll(target, goal)
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
  	this.Content = string
    return this
  }

  getContent()
  {
    return this.Content
  }

  setLinks(ForWeb)
  {
    let root_path = ""

    for(let i=0;i<this.urlDepth;i++)
    {
      root_path += "../"
    }

      this.Content = this.Content.replaceAll("<@root>",root_path)
      this.Content = this.Content.replaceAll("<@index>","index.html")
  }

  msg(text)
  {
	return "Page: "+this.id+": "+text

  }

  output()
  {
  	fs.writeFileSync(path.join(this.abspath,this.file), this.Content);
  }
}