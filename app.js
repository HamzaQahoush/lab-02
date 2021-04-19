'use strict';

let allPhotos=[];
function ShowPhoto (images){
  this.image_url=images.image_url;
  this.title=images.title;
  this.description=images.description;
  this.keyword=images.keyword;
  this.horns=images.horns;
  allPhotos.push(this);
}

//render function;
ShowPhoto.prototype.render=function(){
  let newTemplate = $('#photo-template').clone();

  newTemplate.find('h2').text(this.title);
  newTemplate.find('img').attr('src', this.image_url);
  newTemplate.find('.description').text(this.description);
  newTemplate.find('.keyword').text(this.keyword);
  newTemplate.find('.horns').text(this.horns);
  $('select').append(`<option value='${this.keyword}'>${this.keyword}</option>`);

  $('main').append(newTemplate);
  newTemplate.removeAttr('id');

};




ShowPhoto.prototype.select = function () {
  let newTemplate =$('#photo-template').clone();
  $('main').append(newTemplate);
  newTemplate.find('h2').text(this.title);
  newTemplate.find('img').attr('src', this.image_url);
  newTemplate.find('.description').text(this.description);
  newTemplate.find('.keyword').text(this.keyword);
  newTemplate.find('.horns').text(this.horns);
  $('select').append(`<option value='${this.keyword}'>${this.keyword}</option>`);


  newTemplate.removeAttr('id');

};

$('select').change(function () {
  let keyWords = $('select option:selected').val();
  if (keyWords === 'default') {

    $('section').attr('id','photo-template');
    display();
  } else {


    $('section').attr('id','photo-template');
    getDataKey(keyWords);

  }
});


function getDataKey(key) {

  const ajaxSetting = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-1.json', ajaxSetting).then(data => {
    let selectedKey;
    data.forEach(item => {
      if(item.keyword===key){
        selectedKey = new ShowPhoto(item);

        selectedKey.select();
      }

    });
  });
}


// set the configuration for the Ajax request
function display(){
  var ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };


  $.ajax('/data/page-1.json' , ajaxSettings).then(data=>{

    data.forEach(element => {
      let newPhoto= new ShowPhoto(element);
      newPhoto.render();
    });

  });
}
$('document').ready(display);

