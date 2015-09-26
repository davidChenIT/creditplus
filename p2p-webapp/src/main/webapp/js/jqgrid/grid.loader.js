function jqGridInclude(){       

	var pathtojsfiles = "js/src/";  // 需要修改的地方   

	// 如果不需要某些模块，将include设为false
	var modules = [
	{ include: true, incfile:'i18n/grid.locale-en.js'}, // jqGrid translation       
	 { include: true, incfile:'grid.base.js'},    // jqGrid base        
	 { include: true, incfile:'grid.common.js'},  // jqGrid common for editing 
	 { include: true, incfile:'grid.formedit.js'},       // jqGrid Form editing 
	 { include: true, incfile:'grid.inlinedit.js'},      // jqGrid inline editing 
	 { include: true, incfile:'grid.celledit.js'},       // jqGrid cell editing 
	 { include: true, incfile:'grid.subgrid.js'},        //jqGrid subgrid
	 { include: true, incfile:'grid.treegrid.js'},       //jqGrid treegrid 
	 { include: true, incfile:'grid.custom.js'},         //jqGrid custom    
	 { include: true, incfile:'grid.postext.js'},        //jqGrid postext  
	 { include: true, incfile:'grid.tbltogrid.js'},      //jqGrid table to grid 
	 { include: true, incfile:'grid.setcolumns.js'},         //jqGrid setcolumns  
	 { include: true, incfile:'grid.import.js'},             //jqGrid import 
	 { include: true, incfile:'jquery.fmatter.js'},      //jqGrid formater 
	 { include: true, incfile:'JsonXml.js'},             //xmljson utils   
	 { include: true, incfile:'jquery.searchFilter.js'}  // search Plugin  
	];   
	var filename;  
	for(var i=0;i<modules.length; i++) { 
	  if(modules[i].include === true) { 
		 filename = pathtojsfiles+modules[i].incfile; 
		 if(jQuery.browser.safari) {
			 jQuery.ajax({url:filename,dataType:'script',async:false,cache: true});
		 } else {
			 IncludeJavaScript(filename); 
		 }
	  }   
	} 

	function IncludeJavaScript(jsFile) {
		var oHead = document.getElementsByTagName('head')[0]; 
		var oScript = document.createElement('script');
		oScript.type = 'text/javascript'; 
		oScript.charset = 'utf-8'; 
		oScript.src = jsFile; 
		oHead.appendChild(oScript); 
	};

};
jqGridInclude();