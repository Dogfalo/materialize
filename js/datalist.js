/////////////////////////////////////////////////////////////////////////
// DataList class

// Constructor
function DataList(textColumn, valueColumn, data) {
   if (!this) {

      return null;
   }
   // Validate arguments
   if (textColumn == undefined) {

      return null;
   }
   if (typeof textColumn != "string") {

      return null;
   }

   if (data == undefined) {
      data = valueColumn;
      valueColumn = textColumn;
   }

   this.onChangeCallbacks = [];
   this.valueColumn = valueColumn;
   this.textColumn = textColumn;
   this.name = "unnamed";
   this._element = null;
   // If we have an array of data row oobjects add that to the list
   if (Array.isArray(data)) {
      this.data = data;
   }
   // Otherwise the list will be empty
   else {
      this.data = [];
   }
   return this;
}

////////////////////////
// Internal functions //

// Internal ONLY!...
DataList.prototype._clearHTML = function(callback) {
   if (this._element) {
      this._element.empty();
      if (typeof callback == "function") callback();
   }
}

// Internal ONLY!...
DataList.prototype._populateHTML = function(callback) {
   if (!this._element) return;

   var list = this;
   var element = this._element;

   $.each(this.data, function(i, o) {
      var text = o[list.textColumn];
      var value = o[list.valueColumn];
      var item = $("<a>").addClass("collection-item").text(text);
      item.data().value = value;
      item.click(function() {
         element.children().removeClass("active");
         item.addClass("active");
         list.selectedValue = value;
         list.callOnChangeCallbacks();
      });
      element.append(item);
   });

   /*if (list.selectedValue) {
      element.children().filter(function(o) {
         return $(this).data().value == list.selectedValue;
      }).click();
   }*/
}


////////////////////////
// External functions //

DataList.prototype.bindToData = function() {
   var list = this;

   //defining a 'watcher' for an attribute
   watch(this, "data", function() {
      list.renderToHTML();
   });

   return this;
}

DataList.prototype.callOnChangeCallbacks = function() {
   for(var i=0; i<this.onChangeCallbacks.length; i++){
      this.onChangeCallbacks[i]();
   }

   return this;
}

DataList.prototype.clearSelection = function(){
    this.selectedValue = null;
    if(this._element){
    	this._element.find(".active").removeClass("active");
    }

    return this;
}

DataList.prototype.getElement = function(){
	if(this._element) return this._element;
	else return this.renderToHTML();
};

DataList.prototype.getSelectedText = function() {
    if(!this._element) return "";
    return this._element.find(".collection-item.active").text();
}

DataList.prototype.renderToHTML = function() {
   var list = this;

   // If the list already has an element use it!
   if (!this._element) this._element = $("<div>").addClass("collection");

   // Clear element
   this._clearHTML(function() {
      list._populateHTML();
   });

   return this._element;
}

DataList.prototype.setName = function(name) {
   this.name = name;
   return this;
}


/////////////////////////////////////////////////////////////////////////
// MultiList class

// Constructor
function MultiList(lists) {
   if (!this) {

      return null;
   }

   // Validate arguements
   if (lists != undefined) {

      // Make sure we are getting an array
      if (!Array.isArray(lists)) {

         return null;
      }

      this.onChangeCallbacks = [];
      this._index = 0;
      this.lists = lists;
   }

   this.name = "unnamed";
   this._element = null;

   return this;
}

////////////////////////
// Internal functions //

// Internal ONLY!...
MultiList.prototype._clearHeader = function(callback) {
   if (this._element_header) {
      this._element_header.empty();
      if (typeof callback == "function") callback();
   }
}

// Internal ONLY!...
MultiList.prototype._populateHeader = function(callback) {
   if (!this._element) return;

   var list = this;
   var header = this._element_header;

   $.each(this.lists, function(i, o) {
      if (i > list._index) return;

      var text;

      if (i < list._index) {
         text = o.getSelectedText() + " &#10093;";
      } else {
         text = o.name;
      }

      var item = $("<span>").html(text);

      item.click(function() {
         //alert(list._index);
         list._index = i;
         list._gotoList();
      });
      header.append(item);
   });
}

// Internal ONLY!...
MultiList.prototype._gotoList = function(index) {
   if(index == undefined) index = this._index;
   var list = this;

   this._element_lists.velocity(
    {
        translateX: ((-index*100)/this.lists.length) + "%"
    }, 
    {
        duration: 300,
        complete: function(elements) {
            list._index = index;
            list._clearHeader(function() {
                list._populateHeader();
            });
        }
    });

   
	if(typeof this.lists[index]._loadData == "function"){
		//o.showLoader();

		this.lists[index].clearSelection();
		this.lists[index]._loadData();

		var next = this.getNext();
		if(next){
			next.reset()
		}
	}
}

// Internal ONLY!...
MultiList.prototype._gotoNextList = function() {
   var index = Math.min(this._index+1, this.lists.length-1);

   if(index != this._index) this._gotoList(index);
}


////////////////////////
// External functions //

MultiList.prototype.callOnChangeCallbacks = function() {
   for(var i=0; i<this.onChangeCallbacks.length; i++){
      this.onChangeCallbacks[i]();
   }

   return this;
}

MultiList.prototype.getElement = function(){
	if(this._element) return _element;
	else return this.renderToHTML();
};

MultiList.prototype.getNext = function(){
    if(!this._element) return null;

    var nextElement = this._element.parent().next().find(".multilist:first");
    if(!nextElement.length) return null;

    var nextMultilist = nextElement.data().srcObject;
    if(!nextMultilist) return null;

    return nextMultilist;
}

MultiList.prototype.getPrevious = function(){
    if(!this._element) return null;

    var nextElement = this._element.parent().prev().find(".multilist:first");
    if(!nextElement.length) return null;

    var nextMultilist = nextElement.data().srcObject;
    if(!nextMultilist) return null;

    return nextMultilist;
}

MultiList.prototype.getSelectionAsArray = function(){
    var list = this;
    var result = [];

    $.each(this.lists, function(i, o){
        if(i>list._index){
            result.push({text: "", value: ""});
        }
        else {
        	var value = "";
        	if(o._element && o._element.find(".active").length) value =  o.selectedValue;
            result.push({text: o.getSelectedText(), value: value});
        }
    });

    return result;
}

MultiList.prototype.getSelectionPrev2CurrentAsArray = function(){
    var prev = this;
    var result = {};

    do{
       result[prev.name] = prev.getSelectionAsArray();
       prev = prev.getPrevious();
    }while(prev)

    return result;
}

MultiList.prototype.hideLoader = function() {
    if(!this._element) return this;
   
   this._element_preloader.fadeOut();
   this._element_loader.fadeOut();

   return this;
}

MultiList.prototype.renderToHTML = function() {
   var list = this;

   // If the list already has an element use it!
   if (!this._element) {
      this._element = $("<div>").addClass("card list-card multilist");
      this._element.data().srcObject = this;

      this._element_loader = $("<div>").addClass("loader");
      this._element_loader.hide();
      
      this._element_header = $("<div>").addClass("card-content list-header hilight-color");
      
      this._element_preloader = $("<div class='progress'><div class='indeterminate'></div></div>");
      this._element_preloader.hide();
      
      this._element_lists = $("<div>");
      this._element_lists.width(list.lists.length + "00%");

      //
      $.each(this.lists, function(i, o) {
         //debugger;
         var listElement = $(o.renderToHTML())
         $(listElement).width((100/list.lists.length) + "%");
         list._element_lists.append(listElement);
         o.onChangeCallbacks = 
         [function(){
               list._gotoNextList();
               list.callOnChangeCallbacks();
         }].concat(o.onChangeCallbacks);
      });

      this._element.append(this._element_loader);
      this._element.append(this._element_header);
      this._element.append(this._element_preloader);
      this._element.append(this._element_lists);
      //this.hideLoader();
   }

   // Clear element
   this._clearHeader(function() {
      list._populateHeader();
   });

   return this._element;
}

MultiList.prototype.reset = function(){
	$.each(this.lists, function(i, o){
		o.clearSelection();
		o.renderToHTML();
	});

    this._gotoList(0);
    this.callOnChangeCallbacks();

    return this;
}

MultiList.prototype.setName = function(name) {
   this.name = name;
   return this;
}

MultiList.prototype.showLoader = function() {
    if(!this._element) return this;
   
   this._element_preloader.fadeIn();
   this._element_loader.fadeIn();

   return this;
}

/////////////////////////////////////////////////////////////////////////
// MegaList class aka Selectron

// Constructor
function MegaList(lists) {
   if (!this) {

      return null;
   }

   // Validate arguements
   if (lists != undefined) {

      // Make sure we are getting an array
      if (!Array.isArray(lists)) {

         return null;
      }

      this.onChangeCallbacks = [];
      this.multilists = lists;
   }

   this.name = "unnamed";
   this._element = null;

   return this;
}

MegaList.prototype.renderToHTML = function() {
	if (!this._element) {
		this._element = $("<div>").addClass("megalist");

		var columnWidth = 100/this.multilists.length;
      var list = this;

		$.each(this.multilists, function(i, o){
			var column = $("<div>").addClass("megalist-col");
			column.width(columnWidth + "%");
         column.append(o.renderToHTML());
         column.mousedown(function(){
            list._activeList = o;
            //Materialize.toast("column clicked : " + i, 8000);
         });
			list._element.append(column);
		});

		this._activeList = this.multilists[0];
	}

	return this._element;
}

MegaList.prototype.getSelection = function(){
	if(!this._activeList) return {};
    return this._activeList.getSelectionPrev2CurrentAsArray();
}