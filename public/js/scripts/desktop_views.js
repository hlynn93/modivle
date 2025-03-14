/*global define:true */
define(['jquery','underscore','backbone', 'desktop_ich'],
function($,_,Backbone,ich){

var v = {};
/*
MAIN
*/
v.MainView = Backbone.View.extend({
	el: "#main_container",
	initialize: function(options){
		this.user = options.user;
		this.modules = options.modules;
		_.bindAll(this, 'render', 'moduleselected');
	},
	render: function(){
		this.modulesview = new v.ModulesView({collection: this.modules}).render();
		this.contentview = new v.ContentView({user: this.user}).render();
		return this;
	},
	events: {
		"moduleselected" : "moduleselected"
	},
	moduleselected: function(e, module){
		this.modulesview.active(module.get('code'));
		this.contentview.changemodule(module);

		//trigger route.
		if (e){
			var currentview = this.contentview.currentview;
			this.$el.trigger("navigateto", [module.get('code'), currentview]);
		}
	}
});
v.ModulesView = Backbone.View.extend({
	el: "#leftbar",
	initialize: function(){
		this.collection.on('reset', this.render, this);
		// this.collection.on('add', this.render, this);
	},
	render: function(){
		this.views = [];
		var fragment = document.createDocumentFragment();
		_.each(this.collection.models, function(module){
			var x = new v.ModuleView({model: module});
			this.views.push(x);
			fragment.appendChild(x.render().el);
		},this);
		this.$el.html(fragment);

		if (this.activemod){
			this.active(this.activemod);
		}
		
		// resize leftbar and container.
		this.$el.css({width: "auto"});
		var leftbar_width = this.$el.width();

		// account for font-weight increase in active modules.
		leftbar_width += 10;
		$("#content").width(960 - leftbar_width);
		
		return this;
	},
	active: function(modcode){
		//keep ref to active mod;
		this.activemod = modcode;

		this.$(".active").removeClass("active");
		_.each(this.views, function(view){
			if (view.model.get("code") === modcode){
				view.active();
			}
		}, this);
	},
	highlight: function(index){
		this.$(".highlight").removeClass("highlight");
		this.views[index].$el.addClass("highlight");
	}
});
v.ModuleView = Backbone.View.extend({
	className: "moduleview",
	initialize: function(){
	},
	render: function(){
		this.$el.html(ich.moduleview(this.model.toJSON()));
		return this;
	},
	events: {
		"click" : "moduleselected"
	},
	moduleselected: function(){
		this.$el.trigger('moduleselected', this.model);
	},
	active: function(){
		this.$el.addClass("active");
	}
});
v.ContentView = Backbone.View.extend({
	el: "#content",
	initialize: function(options){
		this.user = options.user;
		this.module = null;
		this.defaultview = "announcements";
		this.currentview = this.defaultview;
		_.bindAll(this, 'render','changemodule','changeview');
	},
	render: function(){
		if (this.module === null) {
			//show home page

		} else {
			//only called once.
			this.$el.html(ich.contentview());
			this.contentnav = new v.ContentNavView({
				view: this.defaultview
			}).render();

			this.contentcontainer = new v.ContentContainerView({
				user: this.user,
				module : this.module,
				view : this.defaultview
			}).render();
		}
		return this;
	},
	changemodule: function(module){
		if (this.module === null){
			//only called the first time.
			this.module = module;
			this.render();
		} else {
			//subsequently...
			this.module = module;
			this.contentcontainer.changemodule(this.module);
		}
	},
	changeview: function(e, view){
		this.currentview = view;
		this.contentcontainer.changeview(view);
		this.contentnav.changeview(view);

		if (e) {
			this.navigate();
		}
	},
	navigate: function(e){
		var args = Array.prototype.slice.call(arguments, 1);
		
		args.unshift(this.module.get('code'), this.currentview);
		this.$el.trigger("navigateto", args);
	},
	events: {
		"changeview" : "changeview",
		"navigate" : "navigate"
	}
});
v.ContentNavView = Backbone.View.extend({
	el: "#tabs",
	initialize: function(options){
		this.views = ["announcements", "workbin", "forum"];
		this.children = [];
		this.currentview = options.view;
	},
	render: function(){
		var fragment = document.createDocumentFragment();
		_.each(this.views, function(view){
			var x = new v.ContentNavItemView({name: view});
			this.children.push(x);
			fragment.appendChild(x.render().el);
		},this);
		this.$el.html(fragment);
		this.changeview(this.currentview);
		return this;
	},
	changeview: function(view){
		_.each(this.children, function(navitem){
			if (navitem.name === view){
				navitem.active();
			} else {
				navitem.inactive();
			}
		}, this);
	}
});
v.ContentNavItemView = Backbone.View.extend({
	tagName: "div",
	className: "tab",
	initialize: function(options){
		this.name = options.name;
	},
	render: function(){
		this.$el.html(this.name);
		return this;
	},
	events: {
		"click" : "changeview"
	},
	changeview: function(){
		if (!this.$el.hasClass("active")){
			this.$el.trigger("changeview", this.name);
		}
	},
	active: function(){
		this.$el.addClass("active");
	},
	inactive: function(){
		this.$el.removeClass("active");
	}
});
v.ContentContainerView = Backbone.View.extend({
	el: "#tabcontent",
	initialize: function(options){
		this.user = options.user;
		this.module = options.module;
		this.currentview = options.view;
		this.viewobj = {};
	},
	render: function(){
		var Backboneview = this.view(this.currentview);
		this.viewobj = new Backboneview({
			user: this.user,
			model: this.module
		});
		this.$el.html(this.viewobj.render().el);
		return this;
	},
	view: function(view){
		if (view === "workbin"){
			return v.WorkbinView;
		} else if (view === "announcements"){
			return v.AnnouncementsView;
		} else if (view === "forum"){
			return v.ForumView;
		}
	},
	changemodule: function(module){
		this.module = module;
		this.render();
	},
	changeview: function(view){
		this.currentview = view;
		this.render();
	}
});
/*
BREADCRUMBS
*/
v.Breadcrumb = Backbone.View.extend({
	className: 'breadcrumb',
	initialize: function(options){
		this.type = options.type;
	},
	render: function(){
		//ignore threads
		if (this.model.type === "thread"){
			return this;
		}

		if (this.model.parent){
			this.$el.html(ich.breadcrumb(this.model.toJSON()));
		} else {
			this.$el.html(ich.breadcrumbicon({type: this.model.type}));
		}
		this.$el.addClass(this.type);
		return this;
	},
	events: {
		"click": "drilldown"
	},
	drilldown: function(){
		if (this.type === "parent"){
			this.$el.trigger('drilldown', this.model);
		}
	}
});
v.Breadcrumbs = Backbone.View.extend({
	initialize: function(){},
	render: function(){
		var current = this.model.parent;
		
		if (!current) {
			this.$el.hide();
			return this;
		}

		while (current){
			var x = new v.Breadcrumb({model: current, type: "parent"});
			this.$el.prepend(x.render().el);
			current = current.parent;
		}

		//add current folder
		var currentfolder = new v.Breadcrumb({model: this.model, type: "current"});
		this.$el.append(currentfolder.render().el);
		this.$el.addClass("breadcrumbs");
		return this;
	}
});
/*
FORUM
*/
v.ForumView = Backbone.View.extend({
	id: "forumcontainer",
	initialize: function(options){
		this.user = options.user;
		this.currentitem = this.model.fetchforums().forum;
	},
	render: function(){
		this.$el.html(ich.forumview());
		this.breadcrumbs = new v.Breadcrumbs({model: this.currentitem, el: this.$('#forumheader')});
		this.breadcrumbs.render();
		
		//immediately jump into single header forums.
		//TODO
		if (this.currentitem.type === "forum"){
			this.headingsview = new v.ForumItemsView({model: this.currentitem});
			this.$("#forumcontents").html(this.headingsview.render().el);

			if (this.currentitem.items.models.length === 1) {
				var child = this.currentitem.items.models[0];
				this.drilldown("drilldown", child);
			}

		} else if (this.currentitem.type === "heading"){
			var threadsview = new v.ForumThreadsView({model: this.currentitem});
			this.$("#forumcontents").html(threadsview.render().el);
		} else if (this.currentitem.type === "thread"){
			var singlethreadview = new v.ForumSingleThreadView({model: this.currentitem});
			this.$(".tabcontents").html(singlethreadview.render().el);
		}
		return this;
	},
	events: {
		"drilldown": "drilldown"
	},
	drilldown: function(e, model){
		this.currentitem = model;
		this.render();

		if (e) {
			var path = [],
			current = this.currentitem;
			//only want the path up to workbin-1
			while (current.parent) {
				var name = current.get('path');
				path.unshift(name);
				
				current = current.parent;
			}
			this.$el.trigger("navigate", path);
		}
	}
});
v.ForumItemsView = Backbone.View.extend({
	initialize: function(){
		this.model.items.on("reset", this.render, this);
	},
	render: function(){
		if (this.model.items.isloading()){
			this.$el.html(ich.inforow({text:"loading..."}));
		} else if (this.model.items.models.length === 0){
			this.$el.html(ich.inforow({text:"no headings"}));
		} else {
			var fragment = document.createDocumentFragment();
			_.each(this.model.items.models, function(heading){
				var x = new v.ForumItemView({model: heading});
				fragment.appendChild(x.render().el);
			});
			this.$el.html(fragment);
		}
		return this;
	}
});
v.ForumThreadsView = Backbone.View.extend({
	initialize: function(){
		this.model.update();
		this.model.threads.on("reset", this.render, this);
	},
	render: function(){
		if (this.model.threads.isloading()){
			this.$el.html(ich.inforow({text:"loading..."}));
		} else if (this.model.threads.models.length === 0){
			this.$el.html(ich.inforow({text:"zero threads :("}));
		} else {
			var fragment = document.createDocumentFragment();
			_.each(this.model.threads.models, function(thread){
				var x = new v.ForumItemView({model: thread});
				fragment.appendChild(x.render().el);
			});
			this.$el.html(fragment);
		}
		return this;
	}
});
v.ForumItemView = Backbone.View.extend({
	className: "tabrow itemview",
	initialize: function(){
	},
	render: function(){
		if (this.model.type === "heading"){
			this.$el.html(ich.forumheadingview(this.model.toJSON()));
		} else if (this.model.type === "thread"){
			this.$el.html(ich.forumthreadview(this.model.toJSON()));
		} else if (this.model.type === "forum"){
			this.$el.html(ich.forumforumview(this.model.toJSON()));
		}
		return this;
	},
	events: {
		"click" : "drilldown"
	},
	drilldown: function(){
		this.$el.trigger("drilldown", this.model);
	}
});
//FORUM SINGLE THREAD VIEW
v.ForumSingleThreadView = Backbone.View.extend({
	id: "forumsinglethreadview",
	initialize: function(){
		this.model.fetch();
		this.model.on("reset", this.render, this);
	},
	render: function(){
		//this post.
		var root;
		if (this.model.isloading()) {
			root = new v.ForumSingleThreadThreadView({
				model: this.model,
				root: true,
				loading: true
			});
			this.$el.html(root.render().el);
		} else {
			root = new v.ForumSingleThreadThreadView({
				model: this.model,
				root: true
			});
			this.$el.html(root.render().el);
		}
		return this;
	}
});
v.ForumSingleThreadThreadView = Backbone.View.extend({
	className: "tabpost forumpost",
	initialize: function(options){
		this.root = options.root;
		this.loading = options.loading;
	},
	render: function(){
		this.$el.html(ich.forumpost(this.model.toJSON()));
		if (this.loading) {
			this.$el.append(ich.inforow({text: "loading entire thread..."}));
		} else {
			if (this.model.threads.length !== 0) {
				var $subthreadContainer = this.$("#" + this.model.id);
				_.each(this.model.threads, function(subthread){
					var x = new v.ForumSingleThreadThreadView({model: subthread});
					$subthreadContainer.append(x.render().el);
				});
			}
			if (this.root) {
				this.$el.append(ich.inforow({text: "end of thread."}));
			}
		}
		return this;
	}
});

/*
ANNOUNCEMENTS
*/
v.AnnouncementsView = Backbone.View.extend({
	className: "announcementsview",
	tagName: "div",
	initialize: function(options){
		this.user = options.user;
		this.announcements = this.model.fetchannouncements().announcements;
		this.announcements.on('change', this.render, this);
	},
	render: function(){
		if (this.announcements.isloading()){
			this.$el.html(ich.inforow({text:"loading..."}));
		} else if (this.announcements.models.length === 0){
			//no announcements
			this.$el.html(ich.inforow({text:"no announcements."}));
		} else {
			var fragment = document.createDocumentFragment();
			_.each(this.announcements.models, function(announcement){
				var x = new v.AnnouncementView({model: announcement});
				fragment.appendChild(x.render().el);
			},this);
			this.$el.html(fragment);
		}
		return this;
	}
});
v.AnnouncementView = Backbone.View.extend({
	tagName: 'div',
	className: 'announcementview tabpost',
	initialize: function(options){

	},
	render: function(){
		this.$el.html(ich.announcementview(this.model.toJSON()));
		return this;
	}
});

/*
WORKBIN
*/
v.WorkbinView = Backbone.View.extend({
	initialize: function(options){
		this.user = options.user;
		this.currentitem = this.model.fetchworkbin().workbin;
		this.currentitem.on('all', this.render, this);
	},
	render: function(){
		//mainframe
		this.$el.html(ich.workbinview());
		//render breadcrumbs
		this.breadcrumbs = new v.Breadcrumbs({model: this.currentitem, el: this.$('#workbinheading')});
		this.breadcrumbs.render();
		if (typeof this.currentitem.get('id') !== 'undefined'){
			if(this.currentitem.items.models.length === 0){
				//empty folder
				this.$('#filescontainer').html(ich.emptyfolder());
			} else {
				//files and folders
				var fragment = document.createDocumentFragment();
				//reverse models to show latest files at the top.
				this.elems = [];
				_.each(this.currentitem.items.models, function(item){
					var x;
					if (item.get("type") === 'document'){
						x = new v.FileView({model: item});
					} else if (item.get("type") === 'folder'){
						x = new v.FolderView({model: item});
					}
					this.elems.push(x);
					fragment.appendChild(x.render().el);
				},this);
				this.$('#filescontainer').html(fragment);
			}
		} else {
			//loading folder
			this.$('#filescontainer').html(ich.loadingfolder());
		}
		return this;
	},
	events: {
		"drilldown": "drilldown",
		"downloadfile" : "downloadfile"
	},
	drilldown: function(e, model){
		this.currentitem = model;
		this.render();

		if (e) {
			var path = [],
			current = this.currentitem;
			//only want the path up to workbin-1
			while (current.parent) {
				var name = current.get('path');
				path.unshift(name);
				current = current.parent;
			}
			this.$el.trigger("navigate", path);
		}
	},
	downloadfile: function(e, file){
		this.user.file(file.id);
		setTimeout(function(){
			if (file.isnotdled()){
				file.dled();
			}
		}, 500);
	},
	highlight: function(index){
		this.$(".highlight").removeClass("highlight");
		this.elems[index].$el.addClass("highlight");
	}
});
v.FileView = Backbone.View.extend({
	className: 'tabrow itemview fileview',
	initialize: function(){
		this.model.on("change", this.render, this);
	},
	render: function(){
		this.$el.html(ich.itemview(this.model.toJSON()));
		this.itemicon();

		if (this.model.isnotdled()){
			this.$(".rowicon").append("<div class='notification'>1</div>");
		}

		return this;
	},
	itemicon: function(){
		var type = this.model.get("filetype");
		var fileTypes = {
			zip : "zip",
			doc : "doc",
			docx : "doc", // Redirect docx to doc's icon.
			pdf : "pdf",
			ppt : "ppt",
			pptx : "ppt", // Redirect pptx to ppt's icon.
			xls : "xls",
			xlsx : "xlsx",
			acc : "acc",
			avi : "avi",
			bmp : "bmp",
			c : "c",
			cpp : "cpp",
			dmg : "dmg",
			exe : "exe",
			flv : "flv",
			gif : "gif",
			h : "h",
			html : "html",
			ics : "ics",
			java : "java",
			jpg : "jpg",
			key : "key",
			mp3 : "mp3",
			mid : "mid",
			mp4 : "mp4",
			mpg : "mpg",
			php : "php",
			png : "png",
			psd : "psd",
			py : "py",
			qt : "qt",
			rar : "rar",
			rb : "rb",
			rtf :  "rtf",
			sql : "sql",
			tiff : "tiff",
			txt : "txt",
			wav : "wav",
			xml : "xml"
		};

		var defaultfile = "_blank";
		var bg = _.has(fileTypes, type) ? fileTypes[type] : defaultfile;

		bg = "url(/img/filetypes/" + bg + ".png)";
		this.$('.rowicon').css("background-image", bg);
	},
	events: {
		"click" : "downloadfile"
	},
	downloadfile: function(){
		this.$el.trigger('downloadfile', this.model);
	}
});
v.FolderView = Backbone.View.extend({
	className: 'tabrow itemview folderview',
	initialize: function(){
		this.model.on("change", this.render, this);
		_.bindAll(this,'drilldown');
	},
	render: function(){
		this.$el.html(ich.itemview(this.model.toJSON()));
		
		var number = this.model.hasnewfiles();
		if (number){
			//cap number at 10.
			number = number > 10 ? "10+" : number;
			this.$(".rowicon").append("<div class='notification'>"+ number +"</div>");
		}
		return this;
	},
	events: {
		"click" : "drilldown"
	},
	drilldown: function(){
		this.$el.trigger('drilldown', this.model);
	}
});

return v;
});