// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require sha1

String.prototype.hashCode = function(){
    /*var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;*/
  var h = 0;
  var m = 1;
  var crypt = crypto.sha.str_sha1_b(this);
  for(var i = 0; i < crypt.length; i++) {
    h += crypt[i] * m;
    m *= 256;
  }
  return h;
}

var repliesToggled = {};
function reply(id, bit_id) {
  if(id in repliesToggled) {
    repliesToggled[id].remove();
    delete repliesToggled[id];
  } else {
    var form = $('<form action="/comments" method="post" class="new_subcomment"></form>');
    form.append($('<label>Name</label><br />'));
    form.append($('<input type="text" name="comment[name]" size="30" /><br />'));
    form.append($('<label>Content</label><br />'));
    form.append($('<textarea cols="30" name="comment[content]" rows="4" /><br />'));
    form.append($('<input type="hidden" name="comment[bit_id]" value="'+bit_id+'" />'));
    form.append($('<input type="hidden" name="comment[parent_id]" value="'+id+'" />'));
    form.append($('<input name="commit" type="submit" value="Reply" />'));
    repliesToggled[id] = form;
    $('#comment' + id + ' > .comment_replyspace').append(form);
  }
}

function validateAddTag() {
  return $('.add_tag_form input[type="text"]').val().length > 0
}
var addTagDisplayed = null;
function addTag(bit_id) {
  if(addTagDisplayed != null) {
    if(validateAddTag()) {
      addTagDisplayed.submit();
      addTagDisplayed = null;
    }
  } else {
    var form = $('<form action="/tags" ' +
        'method="post" ' +
        'onsubmit="return validateAddTag()" ' +
        'class="add_tag_form"></form>');
    form.append('<input type="text" size="10" onkeyup="tagTextChanged(this)" name="tag[name]" />');
    form.append('<input type="hidden" name="tag[bit_id]" value="'+bit_id+'" />');
    addTagDisplayed = form;
    $('.add_tag').prepend(form);
    $('.add_tag_form input[type="text"]').focus();
  }
}

function tagTextChanged(inputElem) {
  chooseTagColor($(inputElem).val(), $('.add_tag')[0]);
}
function removeTag(tag_id) {
  $('#delete_tag_' + tag_id).submit();
}

/* http://24ways.org/2010/calculating-color-contrast */
function getContrastYIQ(r, g, b){
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}

function chooseTagColor(text, target) {
  var hsh = Math.abs(text.hashCode());
  var r = Math.abs((hsh & 0xFF000000) >> 24),
      g = Math.abs((hsh & 0x0000FF00) >> 8),
      b = Math.abs((hsh & 0x00FF0000) >> 16);
  target.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  //target.style.color = 'rgb(' + (256 - r) + ',' + (256 - g) + ',' + (256 - b) + ')';
  target.style.color = getContrastYIQ(r,g,b);
}
$(document).ready(function () {
  $('.tag').each(function(i, tag) {
    chooseTagColor($(tag).text(), tag);
  });
});

