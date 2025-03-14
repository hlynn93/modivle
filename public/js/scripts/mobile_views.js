/*global define:true */
define(['jquery','underscore','backbone', 'mobile_ich'],
function($,_,Backbone,ich){

var v = {};
v.tappedevent = function(start,callback,context){
    start.call(context);
    setTimeout(function(){
        callback.call(context);
    }, 300);
};

/*
MAIN
*/
v.MainView = Backbone.View.extend({
    el: "#container",
    initialize: function(options){
        this.user = options.user;
        this.modules = options.modules;
        _.bindAll(this, 'render', 'moduleselected');
    },
    render: function(){
        this.header = new v.HeaderView();
        this.modulesview = new v.ModulesView({collection: this.modules}).render();
        this.$("#main").html(this.modulesview.el);
        return this;
    },
    events: {
        "moduleselected" : "moduleselected"
    },
    moduleselected: function(e, module){
        this.header.modulepage(module.get("code"));
        this.singlemoduleview = new v.SingleModuleView({
            model: module,
            user: this.user
        });
        this.$("#main").html(this.singlemoduleview.render().el);

        //trigger route.
        if (e){
            this.$el.trigger("navigateto", module.get('code'));
        }
    },
    home: function(){
        this.header.home();
        this.$("#main").html(this.modulesview.render().el);
    }
});
v.HeaderView = Backbone.View.extend({
    el: "header",
    home: function(){
        this.$el.html(ich.headerhome());
    },
    modulepage: function(code){
        this.$el.html(ich.singlemoduleheader({code : code}));
    }
});
v.ModulesView = Backbone.View.extend({
    initialize: function(){
        this.collection.on('reset', this.render, this);
    },
    render: function(){
        var fragment = document.createDocumentFragment();
        _.each(this.collection.models, function(module){
            var x = new v.ModuleView({model: module});
            fragment.appendChild(x.render().el);
        },this);
        this.$el.html(fragment);
        return this;
    }
});

v.RowView = Backbone.View.extend({
    events: {
        "touchstart": "feedback",
        "touchend": "feedback",
        "touchmove": "feedback"
    },
    feedback: function(e) {
        var that = this;
        if (e.type === "touchend") {
            setTimeout(function(){
                that.$el.removeClass("tapped");
            }, 300);
        } else if (e.type === "touchstart") {
            this.$el.addClass("tapped");
        } else if (e.type === "touchmove") {
            this.$el.removeClass("tapped");
        }
 
    }
});

v.ModuleView = v.RowView.extend({
    tagName: "div",
    className: "module row",
    initialize: function(){
        _.bindAll(this, "feedback");
    },
    render: function(){
        this.$el.html(ich.moduleview(this.model.toJSON()));
        return this;
    },
    events: function(){
        return _.extend({},v.RowView.prototype.events, {
            "singleTap" : "moduleselected",
        });
    },
    moduleselected: function(){
        this.$el.trigger("moduleselected", this.model);
    }
});


/*
SINGLE MODULE VIEW
*/
v.SingleModuleView = Backbone.View.extend({
    initialize: function(options){
        this.currentview = "announcements";
        this.user = options.user;
    },
    render: function(){
        this.nav = new v.SingleModuleNav({current: this.currentview});
        this.$el.append(this.nav.render().el);

        var Viewobj = this.view(this.currentview);
        this.content = new Viewobj({
            model: this.model,
            user: this.user
        });
        this.$el.append(this.content.render().el);

        return this;
    },
    view : function(view){
        if (view === "announcements"){
            return v.AnnouncmentsView;
        } else if (view === "workbin"){
            return v.WorkbinView;
        } else if (view === "forum"){
            return v.ForumView;
        }
    },
    events: {
        "changeview" : "changeview",
        "navigate" : "navigate"
    },
    changeview: function(e, view){
        this.currentview = view;
        this.nav.active(this.currentview);

        this.content.remove();
        var Viewobj = this.view(this.currentview);
        this.content = new Viewobj({
            model: this.model,
            user: this.user
        });
        this.$el.append(this.content.render().el);

        if (e) {
            this.navigate();
        }
    },
    navigate: function(e){
        var args = Array.prototype.slice.call(arguments, 1);
        
        args.unshift(this.model.get('code'), this.currentview);
        this.$el.trigger("navigateto", args);
    }
});
v.SingleModuleNav = Backbone.View.extend({
    id: "tabs",
    initialize: function(options){
        this.current = options.current;
        this.tabs = ["announcements","workbin", "forum"];
        _.bindAll(this,"render");
    },
    render: function(){
        var fragment = document.createDocumentFragment();
        this.subviews = [];
        _.each(this.tabs, function(tab){
            var x = new v.SingleModuleNavTab({name: tab});
            this.subviews.push(x);
            fragment.appendChild(x.render().el);
        },this);
        this.active(this.current);
        this.$el.html(fragment);
        return this;
    },
    active: function(current){
        _.each(this.subviews, function(view){
            if (view.name === current){
                view.active();
            } else {
                view.inactive();
            }
        },this);
    }
});
v.SingleModuleNavTab = Backbone.View.extend({
    className: "tab",
    initialize: function(options){
        this.name = options.name;
    },
    render: function(){
        this.$el.html(this.name);
        return this;
    },
    active: function(){
        this.$el.addClass("active");
    },
    inactive: function(){
        this.$el.removeClass("active");
    },
    events: {
        "singleTap" : "changeview"
    },
    changeview: function(){
        if (!this.$el.hasClass("active")){
            this.$el.trigger("changeview", this.name);
        }
    }
});

/*
NAV VIEW
*/
v.NavView = Backbone.View.extend({
    className: "navview",
    initialize: function(options){
        if (options.type){
            this.type = options.type;
        }
    },
    render: function(){
        var current = this.model.parent;
        
        if (this.type === "announcements"){
            this.$el.html(ich.navview({name: "Announcements"}));
            return this;
        }

        if (!current) {
            this.$el.hide();
            return this;
        }

        this.$el.html(ich.navview(this.model.toJSON()));
        return this;
    },
    events: {
        "singleTap .back" : "back",
        "touchstart": "feedback",
        "touchend": "feedback",
        "touchmove": "feedback"
    },
    feedback: function(e) {
        var that = this;
        if (e.type === "touchend") {
            setTimeout(function(){
                that.$(".back").removeClass("tapped");
            }, 300);
        } else if (e.type === "touchstart") {
            this.$(".back").addClass("tapped");
        } else if (e.type === "touchmove") {
            this.$(".back").removeClass("tapped");
        }
    },
    back: function(){
        // this.$(".back").addClass("tapped");
        this.$el.trigger("drilldown", this.model.parent);
    }
});
/*
ANNOUNCEMENTS
*/
v.AnnouncmentsView = Backbone.View.extend({
    className: "announcementsview",
    initialize: function(options){
        this.user = options.user;
        this.announcements = this.model.fetchannouncements().announcements;
        this.currentitem = this.announcements;
        this.announcements.on('all', this.render, this);
    },
    render: function(){
        this.$el.html(ich.announcementsview());
        if (this.currentitem === this.announcements){
            if (this.announcements.isloading()){
                this.$(".contents").html(ich.infoview({text:"loading..."}));
            } else if (this.announcements.models.length === 0){
                //no announcements
                this.$(".contents").html(ich.infoview({text:"no announcements."}));
            } else {
                var fragment = document.createDocumentFragment();
                _.each(this.announcements.models, function(announcement){
                    var x = new v.AnnouncementView({model: announcement});
                    fragment.appendChild(x.render().el);
                },this);
                this.$(".contents").html(fragment);
            }
        } else {
            this.nav = new v.NavView({
                model: this.currentitem,
                type: "announcements"
            });
            this.$(".nav").html(this.nav.render().el);
            this.$(".contents").html(ich.announcementpost(this.currentitem.toJSON()));
        }
        return this;
    },
    events : {
        "drilldown" : "drilldown"
    },
    drilldown: function(e, model){
        this.currentitem = model || this.announcements;
        this.render();

        if (e) {
            var path = [];
            this.$el.trigger("navigate", path);
        }
    }
});
v.AnnouncementView = v.RowView.extend({
    tagName: "div",
    className: "row announcement",
    initialize: function(){

    },
    render: function(){
        this.$el.html(ich.announcementlist(this.model.toJSON()));
        return this;
    },
    events: function(){
        return _.extend({},v.RowView.prototype.events, {
            "singleTap" : "drilldown"
        });
    },
    drilldown: function(){
        this.$el.trigger('drilldown', this.model);
    }
});
/*
WORKBIN
*/
v.WorkbinView = Backbone.View.extend({
    className: "workbinview",
    initialize: function(options){
        this.user = options.user;
        this.currentitem = this.model.fetchworkbin().workbin;
        this.currentitem.on('all', this.render, this);
    },
    render: function(){
        this.$el.html(ich.workbinview());
        if (typeof this.currentitem.get('id') !== 'undefined'){
            if (this.currentitem.items.models.length === 0){
                this.$(".contents").html(ich.infoview({text : "this folder is empty."}));
            } else {
                //files and folders
                var fragment = document.createDocumentFragment();
                _.each(this.currentitem.items.models, function(item){
                    var x;
                    if (item.get("type") === 'document'){
                        x = new v.FileView({model: item});
                        fragment.appendChild(x.render().el);
                    } else if (item.get("type") === 'folder'){
                        x = new v.FolderView({model: item});
                        fragment.appendChild(x.render().el);
                    }
                },this);
                this.$(".contents").html(fragment);
            }
            this.nav = new v.NavView({model : this.currentitem});
            this.$(".nav").html(this.nav.render().el);
        } else {
            //loading folder...
            this.$(".contents").html(ich.infoview({text : "loading..."}));
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
    }
});
v.FileView = v.RowView.extend({
    className: 'row fileview',
    render: function(){
        this.$el.html(ich.workbinitemview(this.model.toJSON()));
        this.itemicon();
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
        this.$('.icon').css("background-image", bg);
    },
    events: function(){
        return _.extend({},v.RowView.prototype.events, {
            "singleTap" : "downloadfile"
        });
    },
    downloadfile: function(){
        this.$el.trigger('downloadfile', this.model);
    }
});
v.FolderView = v.RowView.extend({
    className: 'row folderview',
    initialize: function(){
        _.bindAll(this,'drilldown');
    },
    render: function(){
        this.$el.html(ich.workbinitemview(this.model.toJSON()));
        return this;
    },
    events: function() {
        return _.extend({},v.RowView.prototype.events, {
            "singleTap" : "drilldown"
        });
    },
    drilldown: function(){
        this.$el.trigger('drilldown', this.model);
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
        this.nav = new v.NavView({model : this.currentitem});
        this.$(".nav").html(this.nav.render().el);
        
        //immediately jump into single header forums.
        //TODO

        if (this.currentitem.type === "forum"){
            this.headingsview = new v.ForumItemsView({model: this.currentitem});
            this.$(".contents").html(this.headingsview.render().el);
        } else if (this.currentitem.type === "heading"){
            var threadsview = new v.ForumThreadsView({model: this.currentitem});
            this.$(".contents").html(threadsview.render().el);
        } else if (this.currentitem.type === "thread"){
            var singlethreadview = new v.ForumSingleThreadView({model: this.currentitem});
            this.$(".contents").html(singlethreadview.render().el);
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
            this.$el.html(ich.infoview({text:"loading..."}));
        } else if (this.model.items.models.length === 0){
            this.$el.html(ich.infoview({text:"no headings"}));
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
    className: 'threadview',
    initialize: function(){
        this.model.update();
        this.model.threads.on("reset", this.render, this);
    },
    render: function(){
        if (this.model.threads.isloading()){
            this.$el.html(ich.infoview({text:"loading..."}));
        } else if (this.model.threads.models.length === 0){
            this.$el.html(ich.infoview({text:"zero threads :("}));
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
v.ForumItemView = v.RowView.extend({
    className: "row",
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
    events: function(){
        return _.extend({},v.RowView.prototype.events, {
            "singleTap" : "drilldown"
        });
    },
    drilldown: function(){
        this.$el.trigger("drilldown", this.model);
    }
});
//FORUM SINGLE THREAD VIEW
v.ForumSingleThreadView = Backbone.View.extend({
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
    className: "post forumpost",
    initialize: function(options){
        this.root = options.root;
        this.loading = options.loading;
    },
    render: function(){
        this.$el.html(ich.forumpost(this.model.toJSON()));
        if (this.loading) {
            this.$el.append(ich.infoview({text: "loading entire thread..."}));
        } else {
            if (this.model.threads.length !== 0) {
                // TODO(michael): Figure out a way around this. currently we
                // prepend the id of the subthread with an x character because of this:
                // http://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
                var $subthreadContainer = this.$("#x" + this.model.id);
                _.each(this.model.threads, function(subthread){
                    var x = new v.ForumSingleThreadThreadView({model: subthread});
                    $subthreadContainer.append(x.render().el);
                });
            }
            if (this.root) {
                this.$el.append(ich.infoview({text: "end of thread."}));
            }
        }
        return this;
    }
});
return v;
});
