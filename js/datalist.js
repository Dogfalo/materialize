'use strict';

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

DataList.prototype.callOnChangeCallbacks = function() {
   for(var i=0; i<this.onChangeCallbacks.length; i++){
      this.onChangeCallbacks[i]();
   }

   return this;
}

DataList.prototype.bindToData = function() {
   var list = this;

   //defining a 'watcher' for an attribute
   watch(this, "data", function() {
      list.renderToHTML();
   });

   return this;
}

DataList.prototype.setName = function(name) {
   this.name = name;
   return this;
}

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
   if (list.selectedValue) {
      element.children().filter(function(o) {
         return $(this).data().value == list.selectedValue;
      }).addClass("active");
   }
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

DataList.prototype.getSelectedText = function() {
   return this._element.find(".collection-item.active").text();
}

DataList.prototype.getElement  = DataList.prototype.renderToHTML;

/////////////////////////////////////////////////////////////

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

      this._index = 0;
      this.lists = lists;
   }

   this.name = "unnamed";
   this._element = null;

   return this;
}

MultiList.prototype.setName = function(name) {
   this.name = name;
   return this;
}

MultiList.prototype.renderToHTML = function() {
   var list = this;

   // If the list already has an element use it!
   if (!this._element) {
      this._element = $("<div>").addClass("card list-card");
      this._element_header = $("<div>").addClass("card-content list-header hilight-color");
      this._element_lists = $("<div>");
      this._element_lists.width(list.lists.length + "00%");

      //
      $.each(this.lists, function(i, o) {
         //debugger;
         var listElement = $(o.renderToHTML())
         $(listElement).width((100/list.lists.length) + "%");
         list._element_lists.append(listElement);
         o.onChangeCallbacks.push(
            function(){
               list._gotoNextList();
            }
         );
      });

      this._element.append(this._element_header);
      this._element.append(this._element_lists);
   }

   // Clear element
   this._clearHeader(function() {
      list._populateHeader();
   });

   return this._element;
}

// Internal ONLY!...
MultiList.prototype._gotoList = function(index) {
   if(index == undefined) index = this._index;
   var list = this;

   this._element_lists.velocity({translateX: ((-index*100)/this.lists.length) + "%"}, 300);

   this._clearHeader(function() {
      list._populateHeader();
   });
}

// Internal ONLY!...
MultiList.prototype._gotoNextList = function() {
   this._index = Math.min(this._index+1, this.lists.length-1);
   this._gotoList();
}

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
      var text;

      if (i > list._index) return;

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

MultiList.prototype.getElement = MultiList.prototype.renderToHTML;

MultiList.prototype.getSelectionAsArray = function(){
    var list = this;
    var result = [];

    $.each(this.lists, function(i, o){
        if(i>list.listIndex){
            result.push({text: "", value: ""});
        }
        else {
            result.push({text: o.getSelectedText(), value: o.selectedValue});
        }
    });

    return result;
} 
